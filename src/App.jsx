import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutPage from './components/AboutPage';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import BookingForm from './components/BookingForm';
import ServiceAreasPage from './components/ServiceAreasPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import FAQPage from './components/FAQPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import FloatingHub from './components/FloatingHub';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';
import ServiceDetail from './components/ServiceDetail';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Services />
              <Testimonials />
            </>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service-areas" element={<ServiceAreasPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/book-service" element={<BookingForm />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingHub />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
