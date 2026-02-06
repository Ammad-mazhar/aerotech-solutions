const fs = require('fs');
const path = require('path');

// Domain configuration
const BASE_URL = 'https://www.aerotechservice.com';

// Static routes from your Navbar and Router
const staticPaths = [
    '/',
    '/about',
    '/contact',
    '/services',
    '/service-areas',
    '/faq',
    '/book-service'
];

// Service IDs extracted from servicesData.js
const serviceIds = [
    'refrigerator-repair',
    'washer-repair',
    'oven-stove-repair',
    'cooktop-repair',
    'microwave-repair',
    'dryer-repair',
    'garbage-disposal',
    'hvac-repair',
    'furnace-repair',
    'water-heater-repair'
];

const generateSitemap = () => {
    const date = new Date().toISOString().split('T')[0];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static paths
    staticPaths.forEach(route => {
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}${route}</loc>\n`;
        xml += `    <lastmod>${date}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n`;
        xml += '  </url>\n';
    });

    // Add service paths
    serviceIds.forEach(id => {
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}/services/${id}</loc>\n`;
        xml += `    <lastmod>${date}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>0.9</priority>\n';
        xml += '  </url>\n';
    });

    xml += '</urlset>';

    const outputPath = path.join(__dirname, '../public/sitemap.xml');

    fs.writeFileSync(outputPath, xml);
    console.log(`Sitemap generated successfully at ${outputPath}`);
};

generateSitemap();