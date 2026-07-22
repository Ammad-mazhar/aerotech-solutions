// Post-generation guard rail: reads the final dist/sitemap.xml (never
// public/sitemap.xml, which no longer exists) and fails the build — a
// non-zero exit here makes the execSync call in vite.config.js throw,
// which fails `vite build` itself — unless every check below passes. This
// exists to catch regressions in server/generateSitemap.mjs (e.g. the 404
// page leaking back in, trailing slashes being dropped, or a duplicate URL)
// before a broken sitemap ever reaches a deploy.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP_PATH = path.join(__dirname, '../dist/sitemap.xml');
const EXPECTED_URL_COUNT = 28;
const SITE_ORIGIN = 'https://aerotechsolutioninc.com';

const failures = [];
const fail = (message) => failures.push(message);

function validate() {
    if (!fs.existsSync(SITEMAP_PATH)) {
        fail(`dist/sitemap.xml not found at ${SITEMAP_PATH} — run the build first.`);
        return;
    }

    const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');

    // --- Well-formedness (enough to catch a truncated or malformed write,
    // not a full general-purpose XML validator) ---
    if (!/^<\?xml version="1\.0" encoding="UTF-8"\?>/.test(xml.trim())) {
        fail('Missing or malformed XML declaration.');
    }
    const urlsetOpen = (xml.match(/<urlset[ >]/g) || []).length;
    const urlsetClose = (xml.match(/<\/urlset>/g) || []).length;
    if (urlsetOpen !== 1 || urlsetClose !== 1) {
        fail(`Expected exactly one <urlset>...</urlset> pair, found ${urlsetOpen} open / ${urlsetClose} close.`);
    }
    const urlOpen = (xml.match(/<url>/g) || []).length;
    const urlClose = (xml.match(/<\/url>/g) || []).length;
    if (urlOpen !== urlClose) {
        fail(`Unbalanced <url> tags: ${urlOpen} open vs ${urlClose} close.`);
    }

    const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

    // --- Count ---
    if (locs.length !== EXPECTED_URL_COUNT) {
        fail(`Expected exactly ${EXPECTED_URL_COUNT} URLs, found ${locs.length}.`);
    }

    // --- No 404 ---
    const has404 = locs.some((u) => u.includes('404'));
    if (has404) {
        fail('Sitemap contains a URL referencing 404 — the 404 page must never be indexable.');
    }

    // --- Trailing slash on every non-home URL ---
    const missingSlash = locs.filter((u) => u !== `${SITE_ORIGIN}/` && !u.endsWith('/'));
    if (missingSlash.length > 0) {
        fail(`URLs missing a trailing slash: ${missingSlash.join(', ')}`);
    }

    // --- No changefreq / priority ---
    if (/<changefreq>/.test(xml)) {
        fail('Sitemap contains <changefreq> — Google ignores this field; it should not be emitted.');
    }
    if (/<priority>/.test(xml)) {
        fail('Sitemap contains <priority> — Google ignores this field; it should not be emitted.');
    }

    // --- No duplicate URLs ---
    const seen = new Set();
    const dupes = new Set();
    for (const u of locs) {
        if (seen.has(u)) dupes.add(u);
        seen.add(u);
    }
    if (dupes.size > 0) {
        fail(`Duplicate URLs found: ${[...dupes].join(', ')}`);
    }

    // --- Correct domain only (catches old-domain and www variants) ---
    const wrongDomain = locs.filter((u) => !u.startsWith(`${SITE_ORIGIN}/`));
    if (wrongDomain.length > 0) {
        fail(`URLs with incorrect domain: ${wrongDomain.join(', ')}`);
    }
}

validate();

if (failures.length > 0) {
    console.error(`Final sitemap validation FAILED (${failures.length} issue(s)):`);
    failures.forEach((f) => console.error(` - ${f}`));
    process.exit(1);
}

console.log('Final sitemap validation passed');
