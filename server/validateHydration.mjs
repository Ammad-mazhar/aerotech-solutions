// Local-only hydration regression check: loads every prerendered route from
// dist/ through a plain Node static file server (deliberately NOT `serve -s`
// or any other SPA-fallback server — this project prerenders a real static
// file per route, and an SPA-fallback server rewrites every URL to
// dist/index.html regardless of whether a matching file exists, which
// silently serves the wrong page's markup at every other route and produces
// a real-looking but entirely artificial React hydration mismatch. This
// server instead mirrors the project's actual Netlify _redirects rule
// (serve the exact file if present, else dist/404.html with a genuine 404
// status) so what this script observes matches what production serves.
//
// Not wired into `vite build` / Netlify's build command: it needs a real
// Chromium instance (via Playwright, already a devDependency), which isn't
// available in Netlify's build environment. Run manually after a build:
//   npm run build && npm run validate:hydration

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PORT = 4193;
const NAV_TIMEOUT = 15000;
const SETTLE_MS = 400;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8',
};

function contentTypeFor(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

function startServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');

    const asFile = path.join(DIST_DIR, safePath);
    const asIndex = path.join(DIST_DIR, safePath, 'index.html');
    const notFoundFile = path.join(DIST_DIR, '404.html');

    let target = null;
    if (fs.existsSync(asFile) && fs.statSync(asFile).isFile()) {
      target = asFile;
    } else if (fs.existsSync(asIndex)) {
      target = asIndex;
    }

    if (target) {
      res.writeHead(200, { 'Content-Type': contentTypeFor(target) });
      fs.createReadStream(target).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      if (fs.existsSync(notFoundFile)) {
        fs.createReadStream(notFoundFile).pipe(res);
      } else {
        res.end('404 Not Found');
      }
    }
  });
  return new Promise((resolve) => {
    server.listen(PORT, () => resolve(server));
  });
}

function readSitemapRoutes() {
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error(`validate:hydration: ${sitemapPath} not found — run \`npm run build\` first.`);
    process.exit(1);
  }
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  return urls.map((u) => new URL(u).pathname);
}

async function testRoute(browser, base, route) {
  console.log(`Testing: ${base}${route}`);
  let context, page;
  const pageErrors = [];
  const consoleErrors = [];
  try {
    context = await browser.newContext();
    page = await context.newPage();
    page.on('pageerror', (e) => pageErrors.push(e.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    let status = null;
    try {
      const resp = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT });
      status = resp ? resp.status() : null;
    } catch (navErr) {
      return { route, ok: false, reason: `navigation error: ${navErr.message}` };
    }

    try {
      await page.waitForSelector('main, #root', { timeout: NAV_TIMEOUT });
    } catch (selErr) {
      return { route, ok: false, reason: `main/#root not found: ${selErr.message}` };
    }

    await page.waitForTimeout(SETTLE_MS);

    const all = [...pageErrors, ...consoleErrors];
    const has418 = all.some((e) => e.includes('418'));
    const hasRecoverable = all.some((e) => /recoverable/i.test(e));
    const hasHydration = all.some((e) => /hydrat/i.test(e));
    const hasUncaught = pageErrors.length > 0;

    if (has418 || hasRecoverable || hasHydration || hasUncaught) {
      return {
        route,
        ok: false,
        reason: `has418=${has418} recoverable=${hasRecoverable} hydrationMsg=${hasHydration} pageErrors=${JSON.stringify(pageErrors)}`,
      };
    }

    return { route, ok: true, status };
  } catch (err) {
    return { route, ok: false, reason: `unexpected error: ${err.message}` };
  } finally {
    if (page) await page.close().catch(() => {});
    if (context) await context.close().catch(() => {});
  }
}

async function main() {
  const routes = readSitemapRoutes();
  const server = await startServer();
  const base = `http://localhost:${PORT}`;
  let browser;
  const failures = [];

  try {
    browser = await chromium.launch();
    for (const route of routes) {
      const result = await testRoute(browser, base, route);
      if (result.ok) {
        console.log(`Passed: ${base}${route}`);
      } else {
        console.log(`Failed: ${base}${route} — ${result.reason}`);
        failures.push(result);
      }
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
    server.close();
  }

  console.log(`\n${routes.length - failures.length}/${routes.length} routes passed.`);
  if (failures.length) {
    console.log('\nFailing routes:');
    for (const f of failures) console.log(`  ${f.route} — ${f.reason}`);
    process.exit(1);
  }
  process.exit(0);
}

main();
