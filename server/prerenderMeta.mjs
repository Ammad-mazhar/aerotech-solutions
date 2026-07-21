// Post-build static prerendering of <head> metadata for every indexable route.
//
// This is a pure client-side SPA (react-helmet-async only rewrites <head> after
// the JS bundle loads and React mounts), so the single dist/index.html Vite
// produces would otherwise be served — with the HOMEPAGE's title/canonical/og
// tags — for every route. Crawlers and bots that don't fully execute JS (and
// even ones that do, before hydration) would see the wrong metadata for every
// non-home page.
//
// This script takes the already-built dist/index.html as a template and writes
// a real, distinct dist/<route>/index.html for every route, with the correct
// title, meta description, canonical, Open Graph, Twitter, and JSON-LD already
// baked into the raw HTML. Static hosts (Netlify, Cloudflare Pages, Vercel, etc.)
// serve an exact-matching file before falling back to the SPA rewrite rule in
// _redirects, so this works without needing a full SSR framework.
//
// Values are pulled from the same data files (servicesData.js, serviceSeoContent.js,
// blogsData.js, blogSeoContent.js) that drive the client-side Helmet tags, so the
// prerendered HTML and the post-hydration HTML never drift apart.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { servicesData } from '../src/data/servicesData.js';
import { serviceSeoContent } from '../src/data/serviceSeoContent.js';
import { blogsData } from '../src/data/blogsData.js';
import { blogSeoContent } from '../src/data/blogSeoContent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '../dist');
const BASE_URL = 'https://aerotechsolutioninc.com';

const NAP = {
    name: 'Aerotech Solution Inc',
    telephone: '+1-630-943-5120',
    email: 'aerotechsolutions@gmail.com',
    streetAddress: '206 Far Hills Dr',
    addressLocality: 'Bolingbrook',
    addressRegion: 'IL',
    postalCode: '60440',
    addressCountry: 'US'
};

const escapeAttr = (str) => String(str).replace(/"/g, '&quot;');

function serviceStructuredData(id, service, seo) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "LocalBusiness",
                "name": NAP.name,
                "image": `${BASE_URL}${service.image || '/banner-image.jpg'}`,
                "telephone": NAP.telephone,
                "email": NAP.email,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": NAP.streetAddress,
                    "addressLocality": NAP.addressLocality,
                    "addressRegion": NAP.addressRegion,
                    "postalCode": NAP.postalCode,
                    "addressCountry": NAP.addressCountry
                },
                "url": `${BASE_URL}/services/${id}`
            },
            {
                "@type": "Service",
                "serviceType": `${service.title} Repair`,
                "provider": { "@type": "LocalBusiness", "name": NAP.name, "telephone": NAP.telephone },
                "areaServed": { "@type": "City", "name": "Bolingbrook, IL" },
                "description": seo ? seo.metaDescription : service.description
            },
            ...(seo ? [{
                "@type": "FAQPage",
                "mainEntity": seo.faqs.map((f) => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": { "@type": "Answer", "text": f.a }
                }))
            }] : [])
        ]
    };
}

function blogStructuredData(post, extra) {
    const graph = [
        {
            "@type": "Article",
            "headline": post.title,
            "description": extra ? extra.metaDescription : post.paragraphs[0].slice(0, 160),
            "image": `${BASE_URL}${post.image}`,
            "datePublished": post.date,
            "author": { "@type": "Organization", "name": NAP.name },
            "publisher": {
                "@type": "Organization",
                "name": NAP.name,
                "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo/logo 2.png` }
            },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/blogs/${post.id}` }
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blogs` },
                { "@type": "ListItem", "position": 3, "name": post.title, "item": `${BASE_URL}/blogs/${post.id}` }
            ]
        }
    ];
    if (extra) {
        graph.splice(1, 0, {
            "@type": "FAQPage",
            "mainEntity": extra.faqs.map((f) => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
        });
    }
    return { "@context": "https://schema.org", "@graph": graph };
}

function renderPage(template, { route, title, description, ogTitle, ogDescription, ogImage, structuredData }) {
    const canonicalUrl = `${BASE_URL}${route}`;
    const t = escapeAttr(title);
    const d = escapeAttr(description);
    const ot = escapeAttr(ogTitle || title);
    const od = escapeAttr(ogDescription || description);

    let html = template;
    html = html.replace(/<title>.*?<\/title>/s, `<title>${title}</title>`);
    html = html.replace(/<meta name="title" content=".*?">/, `<meta name="title" content="${t}">`);
    html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${d}">`);
    html = html.replace(/<meta property="og:url" content=".*?">/, `<meta property="og:url" content="${canonicalUrl}">`);
    html = html.replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${ot}">`);
    html = html.replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${od}">`);
    html = html.replace(/<meta property="og:image" content=".*?">/, `<meta property="og:image" content="${ogImage}">`);
    html = html.replace(/<meta property="twitter:url" content=".*?">/, `<meta property="twitter:url" content="${canonicalUrl}">`);
    html = html.replace(/<meta property="twitter:title" content=".*?">/, `<meta property="twitter:title" content="${ot}">`);
    html = html.replace(/<meta property="twitter:description" content=".*?">/, `<meta property="twitter:description" content="${od}">`);
    html = html.replace(/<meta property="twitter:image" content=".*?">/, `<meta property="twitter:image" content="${ogImage}">`);
    html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);

    if (structuredData) {
        const scriptTag = `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>\n</head>`;
        html = html.replace('</head>', scriptTag);
    }
    return html;
}

function writeRoute(route, html) {
    const outDir = path.join(DIST_DIR, route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
}

const prerender = () => {
    const templatePath = path.join(DIST_DIR, 'index.html');
    if (!fs.existsSync(templatePath)) {
        console.error('prerenderMeta: dist/index.html not found — run vite build first.');
        process.exit(1);
    }
    const template = fs.readFileSync(templatePath, 'utf-8');

    const defaultImage = `${BASE_URL}/banner-image.jpeg`;
    let count = 0;

    // Static pages (home is already correct in dist/index.html — skip it)
    const staticPages = [
        {
            route: '/about',
            title: 'Aerotech Solution | About Us - Elite Appliance Repair Since 2008',
            description: "Learn about Aerotech Solution's 15+ years of excellence in premium appliance restoration. Factory-certified technicians, OEM parts, 90-day warranty, and nationwide service for refrigerators, HVAC, ovens and more.",
            ogTitle: "Aerotech Solution | About - Midwest's Premier Appliance Service",
            ogDescription: 'Since 2008, trusted by 50,000+ homeowners for elite appliance restoration. Licensed, insured, OEM parts, 24/7 emergency response across USA.',
            ogImage: `${BASE_URL}/about-us.jpg`
        },
        {
            route: '/contact',
            title: 'Aerotech Solution | Contact Us - Appliance Repair Service Request',
            description: 'Contact Aerotech Solution for emergency appliance repair. Schedule service online or call (630) 943-5120. Nationwide coverage with same-day availability for refrigerators, HVAC, washers and more.',
            ogTitle: 'Contact Aerotech Solution | 24/7 Appliance Service',
            ogDescription: 'Get fast response from factory-certified technicians. Licensed & insured, OEM parts, 90-day warranty. Nationwide service areas.',
            ogImage: defaultImage
        },
        {
            route: '/service-areas',
            title: 'Aerotech Solution | Service Areas - Nationwide Appliance Repair Coverage',
            description: 'Aerotech Solution provides professional appliance repair services across USA. Chicago suburbs, Midwest, Northeast, South, West Coast coverage with local technicians.',
            ogTitle: 'Aerotech Solution Service Areas | Nationwide Coverage',
            ogDescription: 'From Chicago to nationwide, find certified local technicians for appliance repair. Major metro areas and suburbs served with OEM parts and warranty.',
            ogImage: `${BASE_URL}/Washer Repair.jpg`
        },
        {
            route: '/privacy-policy',
            title: 'Aerotech Solution | Privacy Policy - Appliance Repair Data Protection',
            description: 'Aerotech Solution Privacy Policy explains how we collect, use, and protect your personal information during appliance repair services. Your privacy is our priority.',
            ogTitle: 'Privacy Policy | Aerotech Solution',
            ogDescription: 'Read our privacy policy. We do not sell your data and use information only for service delivery and communication.',
            ogImage: defaultImage
        },
        {
            route: '/faq',
            title: 'Aerotech Solution | FAQ - Appliance Repair Frequently Asked Questions',
            description: 'Common questions about Aerotech Solution appliance repair services, warranty, service call fees, appointment scheduling, and commercial service answered.',
            ogTitle: 'FAQ | Aerotech Solution Appliance Repair',
            ogDescription: 'Find answers to frequently asked questions about our repair services, warranties, and scheduling. Have more questions? Contact us directly.',
            ogImage: defaultImage
        },
        {
            route: '/terms-of-service',
            title: 'Aerotech Solution | Terms of Service - Appliance Repair Service Terms',
            description: 'Aerotech Solution Terms of Service for appliance repair. Includes appointment policy, payments, warranty details, and cancellation terms for residential service.',
            ogTitle: 'Terms of Service | Aerotech Solution',
            ogDescription: 'Review our service terms including payments, appointments, warranty, and cancellation policy before booking repair service.',
            ogImage: defaultImage
        },
        {
            route: '/book-service',
            title: 'Book Appliance Repair Service | Aerotech Solution',
            description: 'Book professional appliance repair online. Schedule a certified technician for your refrigerator, washer, dryer, HVAC, or other home appliance.',
            ogTitle: 'Book Appliance Repair Service | Aerotech Solution',
            ogDescription: 'Schedule a certified technician online for fast, reliable appliance repair.',
            ogImage: defaultImage
        },
        {
            route: '/blogs',
            title: 'Aerotech Solution | Blog - Appliance Repair Tips & Guides',
            description: 'Expert appliance repair tips and guides from Aerotech Solution covering refrigerators, ovens, washers, dryers, HVAC, and more. Learn what to check before you call a technician.',
            ogTitle: 'Aerotech Solution Blog | Appliance Repair Tips & Guides',
            ogDescription: 'Expert tips and guides for every major home appliance, written by certified Aerotech Solution technicians.',
            ogImage: defaultImage
        }
    ];

    staticPages.forEach((page) => {
        writeRoute(page.route, renderPage(template, page));
        count++;
    });

    // Service pages — derived from servicesData.js / serviceSeoContent.js
    Object.entries(servicesData).forEach(([id, service]) => {
        const seo = serviceSeoContent[id];
        writeRoute(`/services/${id}`, renderPage(template, {
            route: `/services/${id}`,
            title: seo ? seo.metaTitle : `${service.title} Repair | Aerotech Solution`,
            description: seo ? seo.metaDescription : service.description,
            ogImage: `${BASE_URL}${service.image || '/banner-image.jpg'}`,
            structuredData: serviceStructuredData(id, service, seo)
        }));
        count++;
    });

    // Blog posts — derived from blogsData.js / blogSeoContent.js
    blogsData.forEach((post) => {
        const extra = blogSeoContent[post.id];
        writeRoute(`/blogs/${post.id}`, renderPage(template, {
            route: `/blogs/${post.id}`,
            title: extra ? extra.metaTitle : `${post.title} | Aerotech Solution Blog`,
            description: extra ? extra.metaDescription : post.paragraphs[0].slice(0, 160),
            ogImage: `${BASE_URL}${post.image}`,
            structuredData: blogStructuredData(post, extra)
        }));
        count++;
    });

    console.log(`prerenderMeta: wrote ${count} static route(s) with page-specific <head> metadata to dist/`);
};

prerender();
