import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { servicesData } from '../src/data/servicesData.js';
import { blogsData } from '../src/data/blogsData.js';
import { canonicalUrl } from '../src/utils/seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Static routes that actually exist in src/App.jsx (excludes the "*" 404 catch-all).
// Exported so server/prerenderApp.mjs can reuse this exact list instead of
// maintaining a second, separately-hardcoded copy of the same route paths.
export const staticPaths = [
    { path: '/', priority: '1.0' },
    { path: '/about', priority: '0.8' },
    { path: '/contact', priority: '0.8' },
    { path: '/service-areas', priority: '0.8' },
    { path: '/faq', priority: '0.8' },
    { path: '/book-service', priority: '0.8' },
    { path: '/services', priority: '0.9' },
    { path: '/blogs', priority: '0.8' },
    { path: '/privacy-policy', priority: '0.4' },
    { path: '/terms-of-service', priority: '0.4' }
];

export const generateSitemap = () => {
    const date = new Date().toISOString().split('T')[0];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    const addUrl = (route, priority) => {
        xml += '  <url>\n';
        xml += `    <loc>${canonicalUrl(route)}</loc>\n`;
        xml += `    <lastmod>${date}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += `    <priority>${priority}</priority>\n`;
        xml += '  </url>\n';
    };

    // Static pages
    staticPaths.forEach(({ path: route, priority }) => addUrl(route, priority));

    // Service pages — derived from servicesData.js, so new services are picked up automatically
    Object.keys(servicesData).forEach((id) => addUrl(`/services/${id}`, '0.9'));

    // Blog posts — derived from blogsData.js, so new posts are picked up automatically
    blogsData.forEach((post) => addUrl(`/blogs/${post.id}`, '0.7'));

    xml += '</urlset>';

    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, xml);
    console.log(`Sitemap generated successfully at ${outputPath} (${staticPaths.length + Object.keys(servicesData).length + blogsData.length} URLs)`);
};

// Only run automatically when this file is executed directly (`node
// server/generateSitemap.mjs`) — not when server/prerenderApp.mjs imports it
// purely to reuse the `staticPaths` list.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    generateSitemap();
}
