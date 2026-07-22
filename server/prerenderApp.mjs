// Full static-body prerendering: renders the real <App /> tree (header, nav,
// H1, paragraphs, FAQ, internal links, CTAs, footer — everything) to HTML at
// build time and writes a complete dist/<route>/index.html for every real,
// indexable route. This replaces the old server/prerenderMeta.mjs, which only
// ever rewrote <head> tags and left <div id="root"></div> empty.
//
// Route-specific <title>/description/canonical/og/twitter/JSON-LD are taken
// directly from each page's own <Helmet> output captured during this same
// render pass (via react-helmet-async's HelmetProvider context) — there is no
// second, separately-hardcoded metadata table to keep in sync anymore.
//
// Route list is derived entirely from src/App.jsx's own route table (indirectly,
// by rendering it) plus the same data files that already drive the sitemap
// (servicesData.js, blogsData.js) and the same `staticPaths` list
// generateSitemap.mjs uses — so a new service or blog post added to those data
// files is automatically picked up here with no separate route list to edit.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import { servicesData } from '../src/data/servicesData.js';
import { blogsData } from '../src/data/blogsData.js';
import { staticPaths } from './generateSitemap.mjs';
import { routePath } from '../src/utils/seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const HEAD_MARKER_RE = /<!-- HELMET_HEAD_START[\s\S]*?HELMET_HEAD_END -->/;
const ROOT_DIV_RE = /<div id="root"><\/div>/;

function buildPage(template, { head, body }) {
    let page = template.replace(HEAD_MARKER_RE, `<!-- HELMET_HEAD_START -->\n  ${head}\n  <!-- HELMET_HEAD_END -->`);
    page = page.replace(ROOT_DIV_RE, `<div id="root">${body}</div>`);
    return page;
}

function writeRoute(outputRoute, html) {
    if (outputRoute === '/') {
        fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
        return;
    }
    const outDir = path.join(DIST_DIR, outputRoute.replace(/^\//, '').replace(/\/$/, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
}

async function prerender() {
    const templatePath = path.join(DIST_DIR, 'index.html');
    if (!fs.existsSync(templatePath)) {
        console.error('prerenderApp: dist/index.html not found — run vite build first.');
        process.exit(1);
    }
    const template = fs.readFileSync(templatePath, 'utf-8');

    // Vite dev-server pipeline (module transform + on-demand resolution only —
    // no browser, no HTTP listener) used purely to load & execute
    // src/entry-server.jsx under Node for this one-off build step, then closed.
    const vite = await createServer({
        root: ROOT_DIR,
        server: { middlewareMode: true, hmr: false },
        appType: 'custom',
        logLevel: 'warn'
    });

    try {
        const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');

        // Router "location" (for route matching) vs. output directory / file
        // path (for the trailing-slash-aware dist/ layout) are deliberately
        // separate: components read canonical URLs from useParams()+seo.js
        // helpers, never from the router's current location, so the location
        // string itself doesn't need to carry a trailing slash.
        const routes = [
            ...staticPaths.map(({ path: p }) => ({ location: p, outputRoute: routePath(p) })),
            ...Object.keys(servicesData).map((id) => ({
                location: `/services/${id}`,
                outputRoute: routePath(`/services/${id}`)
            })),
            ...blogsData.map((post) => ({
                location: `/blogs/${post.id}`,
                outputRoute: routePath(`/blogs/${post.id}`)
            })),
            // 404 probe: any nonexistent path, so React Router falls through
            // to the "*" NotFound route. Written to dist/404.html separately
            // below, not into a real route directory.
            { location: '/__aerotech_404_probe__', outputRoute: null }
        ];

        // Each page component is React.lazy()-loaded, and a lazy component's
        // internal "resolved" cache is a one-time, process-lifetime thing tied
        // to that specific lazy() call (a module-level singleton in App.jsx,
        // reused for every route render below). The very first time any given
        // lazy component is rendered, React must suspend and stream a
        // fallback-then-replacement pair — there is no live browser here to
        // apply that replacement, so the raw fallback markup would otherwise
        // leak into the static file. Rendering every route once up front
        // resolves every lazy component's promise exactly once; the second,
        // real pass then finds each one already fulfilled and renders its
        // real content synchronously on the first attempt, with no
        // fallback/streaming artifacts in the captured HTML.
        for (const { location } of routes) {
            await render(location);
        }

        let count = 0;
        for (const { location, outputRoute } of routes) {
            const result = await render(location);
            if (outputRoute === null) {
                fs.writeFileSync(path.join(DIST_DIR, '404.html'), buildPage(template, result));
            } else {
                writeRoute(outputRoute, buildPage(template, result));
                count++;
            }
        }

        console.log(`prerenderApp: wrote ${count} fully-prerendered route(s) (+ 404.html) to dist/`);
    } finally {
        await vite.close();
    }
}

prerender().catch((err) => {
    console.error('prerenderApp failed:', err);
    process.exit(1);
});
