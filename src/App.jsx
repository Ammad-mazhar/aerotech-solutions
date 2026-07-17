import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
const ServiceDetail = lazy(() => import('./components/ServiceDetail'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
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
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <FloatingHub />
        <Footer />
      </div>
    </Router>
  );
}

export default App;