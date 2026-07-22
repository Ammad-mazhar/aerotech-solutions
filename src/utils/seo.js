// Single source of truth for how internal route paths and canonical URLs are
// formatted across the whole site — sitemap generation, prerendered <head>
// metadata, JSON-LD, and internal navigation links should all be built from
// these helpers rather than constructing URLs by hand in each file. That way
// the trailing-slash convention below applies automatically to every new
// service page, blog post, or location page without needing to patch each
// page individually.
//
// Convention: every indexable route ends with a trailing slash EXCEPT the
// homepage, which is exactly "/". This matches how Netlify serves the
// prerendered dist/<route>/index.html directory structure (a request for
// "/foo" 301-redirects to "/foo/", which is the version that actually
// returns 200), so the canonical URL is made to match the URL that's really
// served, rather than the one that redirects away from itself.

export const SITE_URL = 'https://aerotechsolutioninc.com';

/**
 * Normalizes an internal route path so it always ends in exactly one
 * trailing slash, except the homepage ("/" or ""), which stays "/".
 * Idempotent — safe to call on a path that already has a trailing slash.
 */
export function withTrailingSlash(path) {
    if (!path || path === '/') return '/';
    const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
    const stripped = withLeadingSlash.replace(/\/+$/, '');
    return stripped === '' ? '/' : `${stripped}/`;
}

/** Full canonical URL (https://aerotechsolutioninc.com/...) for an internal route path. */
export function canonicalUrl(path) {
    return `${SITE_URL}${withTrailingSlash(path)}`;
}

/** Route path for use in <Link to="..."> / navigate(...) — same trailing-slash convention as canonicalUrl. */
export function routePath(path) {
    return withTrailingSlash(path);
}

/**
 * Builds a schema.org BreadcrumbList object from an ordered list of
 * { label, path } items (Home first, current page last) — the same shape
 * <Breadcrumb> (src/components/Breadcrumb.jsx) takes, so a page defines its
 * trail once and passes it to both, guaranteeing the visible breadcrumb and
 * the structured data can never drift out of sync. Returns the bare
 * "@type": "BreadcrumbList" object; wrap it in an "@graph" array alongside
 * other schema types, or spread `{ "@context": "https://schema.org", ...breadcrumbSchema(items) }`
 * for a standalone script tag on pages with no other structured data.
 */
export function breadcrumbSchema(items) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            item: canonicalUrl(item.path)
        }))
    };
}
