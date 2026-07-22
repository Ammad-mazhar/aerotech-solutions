// Build-time SSR entry, used only by server/prerenderApp.mjs (via Vite's
// `ssrLoadModule`) to render each real route to a complete HTML string.
//
// Navbar, the routed page content (AppRoutes), FloatingHub, and Footer are
// each rendered in their OWN separate render call here, then concatenated —
// not rendered together as one <App /> tree like the client does. This is a
// deliberate, empirically-verified workaround: React's streaming SSR renderer
// (renderToPipeableStream) only inlines a route's fully-resolved React.lazy()
// content directly when its Suspense boundary is the root of its own render
// call. Nested one level inside a real host element — exactly how <App />
// nests <AppRoutes /> inside <div className="App">, which is unchanged for
// the client — it instead emits the normal fallback-then-out-of-order-
// replacement stream segments, whose resolution only happens via an inline
// <script> a live browser executes. That's meaningless in a static file with
// no browser attached, and shows up as leftover "Loading..." markup. The
// client (main.jsx) still renders the exact same nested <App /> structure it
// always has; only this build-time-only render path is restructured.
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { renderToPipeableStream } from 'react-dom/server';
import { Writable } from 'node:stream';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingHub from './components/FloatingHub.jsx';
import { AppRoutes } from './App.jsx';

// renderToPipeableStream (not renderToString) is required because AppRoutes'
// page components are React.lazy()-loaded: renderToString is synchronous and
// would only ever emit the Suspense fallback ("Loading..."), never the real
// content. onAllReady fires only once every lazy component and Suspense
// boundary has fully resolved, which is what a finished static file needs.
function renderToStringAsync(element) {
    return new Promise((resolve, reject) => {
        let html = '';
        const writable = new Writable({
            write(chunk, _encoding, callback) {
                html += chunk.toString();
                callback();
            }
        });
        writable.on('finish', () => resolve(html));
        writable.on('error', reject);

        const { pipe } = renderToPipeableStream(element, {
            onAllReady() {
                pipe(writable);
            },
            onError(error) {
                reject(error);
            }
        });
    });
}

// React 19's server renderer automatically hoists any <title>/<meta>/<link>
// element found anywhere in a render (including the image preload hints it
// generates for <img> tags — Navbar and Footer each render a logo <img>) to
// the very front of that render's stream, since there's no literal <head>
// boundary in a body-only fragment — and the client does the exact same
// hoisting for those three tag types on hydration, so pulling them out here
// to place in <head> matches what the client will do with them too.
//
// <script> (react-helmet-async's JSON-LD) is deliberately left INLINE, not
// extracted: unlike title/meta/link, the client does NOT hoist <script>
// children of <Helmet> — it hydrates them as a real, visible child of #root,
// exactly where they're rendered in the component tree. Moving it to <head>
// here previously caused a real hydration mismatch (React error #418) on
// every route with a <Helmet><script>...JSON-LD scripts, because the server
// HTML no longer had that child where the client expected to find it. JSON-LD
// is fully valid for search engines wherever it sits in the document, so
// leaving it in body (matching the client) is correct, not just a workaround.
const LEADING_HEAD_TAGS_RE = /^(?:\s*(?:<title\b[^>]*>[^<]*<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>))+/;

function extractHeadTags(rawHtml) {
    const headParts = [];
    let body = rawHtml;

    const leadingMatch = body.match(LEADING_HEAD_TAGS_RE);
    if (leadingMatch) {
        headParts.push(leadingMatch[0]);
        body = body.slice(leadingMatch[0].length);
    }

    return { head: headParts.join(''), body };
}

export async function render(location) {
    const helmetContext = {};

    const navbarRaw = await renderToStringAsync(
        <StaticRouter location={location}><Navbar /></StaticRouter>
    );
    const routesRaw = await renderToStringAsync(
        <HelmetProvider context={helmetContext}>
            <StaticRouter location={location}><AppRoutes /></StaticRouter>
        </HelmetProvider>
    );
    const floatingHubRaw = await renderToStringAsync(<FloatingHub />);
    const footerRaw = await renderToStringAsync(
        <StaticRouter location={location}><Footer /></StaticRouter>
    );

    const navbar = extractHeadTags(navbarRaw);
    const routes = extractHeadTags(routesRaw);
    const floatingHub = extractHeadTags(floatingHubRaw);
    const footer = extractHeadTags(footerRaw);

    return {
        head: navbar.head + routes.head + floatingHub.head + footer.head,
        body: `<div class="App">${navbar.body}${routes.body}${floatingHub.body}${footer.body}</div>`
    };
}
