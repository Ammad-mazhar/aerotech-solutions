import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { servicesData } from '../src/data/servicesData.js';
import { blogsData } from '../src/data/blogsData.js';
import { canonicalUrl } from '../src/utils/seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Indexable static routes that actually exist in src/App.jsx. This list is
// deliberately separate from whatever server/prerenderApp.mjs writes to
// dist/ — prerenderApp.mjs also generates dist/404.html (for Netlify's
// custom error response), but 404 is a non-indexable, non-route page and
// must never appear here. Nothing in this file scans dist/ and dumps every
// generated *.html into the sitemap; only routes explicitly listed below (or
// derived from servicesData.js / blogsData.js) are considered indexable.
export const staticPaths = [
    { path: '/' },
    { path: '/about' },
    { path: '/contact' },
    { path: '/service-areas' },
    { path: '/faq' },
    { path: '/book-service' },
    { path: '/services' },
    { path: '/blogs' },
    { path: '/privacy-policy' },
    { path: '/terms-of-service' }
];

// blogsData.js stores a real, source-controlled publish date per post
// (the same date shown to visitors on the page itself), so it's used as
// <lastmod> for blog posts. No other data file tracks any per-page
// last-updated date, so <lastmod> is omitted for everything else rather
// than being stamped with the current build/deploy time — Google expects
// lastmod to reflect a meaningful content change, not when the site was
// last built.
function toIsoDate(dateStr) {
    const parsed = new Date(dateStr);
    if (Number.isNaN(parsed.getTime())) return null;
    // Format from the LOCAL date components rather than .toISOString()
    // (which converts to UTC first): a build machine ahead of UTC would
    // otherwise shift e.g. "July 2, 2026" back to "2026-07-01".
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const generateSitemap = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    const addUrl = (route, lastmod) => {
        xml += '  <url>\n';
        xml += `    <loc>${canonicalUrl(route)}</loc>\n`;
        if (lastmod) {
            xml += `    <lastmod>${lastmod}</lastmod>\n`;
        }
        xml += '  </url>\n';
    };

    // Static pages — no tracked update date, so no <lastmod>.
    staticPaths.forEach(({ path: route }) => addUrl(route));

    // Service pages — derived from servicesData.js, so new services are
    // picked up automatically. No tracked update date, so no <lastmod>.
    Object.keys(servicesData).forEach((id) => addUrl(`/services/${id}`));

    // Blog posts — derived from blogsData.js, so new posts are picked up
    // automatically. Uses each post's own stored publish date as <lastmod>.
    blogsData.forEach((post) => addUrl(`/blogs/${post.id}`, toIsoDate(post.date)));

    xml += '</urlset>';

    // Written directly into dist/ (the actual Netlify publish directory) —
    // never into public/. Writing to public/ first and copying it into dist/
    // afterward left a window where Vite's own automatic public/-to-dist/
    // copy (which runs as part of the main build, before this closeBundle
    // step) could shadow the fresh file with whatever stale sitemap.xml
    // happened to be tracked in public/. There is no longer a public/
    // sitemap.xml at all, so that copy has nothing to shadow this with.
    const distDir = path.join(__dirname, '../dist');
    fs.mkdirSync(distDir, { recursive: true });
    const outputPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(outputPath, xml);
    const total = staticPaths.length + Object.keys(servicesData).length + blogsData.length;
    console.log(`Final sitemap generated at dist/sitemap.xml: ${total} URLs`);
};

// Only run automatically when this file is executed directly (`node
// server/generateSitemap.mjs`) — not when server/prerenderApp.mjs imports it
// purely to reuse the `staticPaths` list.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    generateSitemap();
}
