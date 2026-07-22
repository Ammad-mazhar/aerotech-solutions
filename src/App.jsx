import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Keep these as normal imports (always visible on every page)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingHub from './components/FloatingHub';
import ScrollToTop from './components/ScrollToTop';

// Lazy load all pages
const Hero = lazy(() => import('./components/Hero'));
const Stats = lazy(() => import('./components/Stats'));
const Partners = lazy(() => import('./components/Partners'));
const Services = lazy(() => import('./components/Services'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const Contact = lazy(() => import('./components/Contact'));
const ServiceAreasPage = lazy(() => import('./components/ServiceAreasPage'));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage'));
const FAQPage = lazy(() => import('./components/FAQPage'));
const BlogsPage = lazy(() => import('./components/BlogsPage'));
const BlogDetail = lazy(() => import('./components/BlogDetail'));
const TermsOfServicePage = lazy(() => import('./components/TermsOfServicePage'));
const BookingForm = lazy(() => import('./components/BookingForm'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const ServiceDetail = lazy(() => import('./components/ServiceDetail'));
const NotFound = lazy(() => import('./components/NotFound'));

// Exported separately (not just inlined in App below) so server/prerenderApp.mjs
// can render this exact routed-content tree on its own via src/entry-server.jsx,
// with no other DOM ancestor in the same render pass. That's a real, empirically-
// confirmed requirement, not a stylistic choice: React's streaming SSR renderer
// only emits a route's fully-resolved lazy content inline when the Suspense
// boundary is rendered at the root of its own render call; nested one level
// inside a real host element (e.g. the <div className="App"> below), it instead
// emits its normal fallback-then-out-of-order-replacement stream segments,
// which only resolve into final content via an inline <script> a live browser
// executes — meaningless (and visible as leftover "Loading..." markup) in a
// static file with no browser attached. Rendering this piece in isolation for
// SSR sidesteps that entirely, while the client (main.jsx) still renders the
// exact same nested structure it always has.
export function AppRoutes() {
  return (
    <Suspense fallback={<div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
      color: '#fff',
      fontSize: '1.2rem'
    }}>Loading...</div>}>
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Stats />
            <Partners />
            <Services />
            <Testimonials />
          </>
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service-areas" element={<ServiceAreasPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/book-service" element={<BookingForm />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <AppRoutes />
        <FloatingHub />
        <Footer />
      </div>
    </>
  );
}

export default App;
