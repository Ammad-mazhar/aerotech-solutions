import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { canonicalUrl, routePath, breadcrumbSchema } from '../utils/seo';
import Breadcrumb from './Breadcrumb';

const breadcrumbTrail = [
  { label: 'Home', path: '/' },
  { label: 'FAQ', path: '/faq' }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [breadcrumbSchema(breadcrumbTrail)]
};

const FAQPage = () => {
  return (
    <>
      <Helmet>
        <title>Aerotech Solution | FAQ - Appliance Repair Frequently Asked Questions</title>
        <meta name="description" content="Common questions about Aerotech Solution appliance repair services, warranty, service call fees, appointment scheduling, and commercial service answered." />
        <meta name="keywords" content="appliance repair FAQ, Aerotech Solution questions, repair warranty, service call fee, same day service" />
        <link rel="canonical" href={canonicalUrl('/faq')} />
        <meta property="og:title" content="FAQ | Aerotech Solution Appliance Repair" />
        <meta property="og:description" content="Find answers to frequently asked questions about our repair services, warranties, and scheduling. Have more questions? Contact us directly." />
        <meta property="og:url" content={canonicalUrl('/faq')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aerotechsolutioninc.com/banner-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aerotech Solution FAQ | Appliance Repair Questions" />
        <meta name="twitter:description" content="Appliance repair FAQs: warranty, service fees, scheduling, and more. Get answers before booking your service." />
        <meta name="twitter:image" content="https://aerotechsolutioninc.com/banner-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <section className="faq-page">
        <style>{`
          .faq-page {
            padding: 5rem 0;
            background-color: #052e16;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            min-height: 60vh;
          }
          .faq-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 1.5rem;
          }
          .faq-header {
            text-align: center;
            margin-bottom: 4rem;
          }
          .faq-header h1 {
            font-size: 3rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 1.5rem;
            letter-spacing: -0.025em;
          }
          .faq-header p {
            font-size: 1.25rem;
            color: #a7f3d0;
            max-width: 700px;
            margin: 0 auto;
          }
          .faq-grid {
            display: grid;
            gap: 2rem;
          }
          .faq-item {
            background-color: #ffffff;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
          }
          .faq-question {
            font-size: 1.25rem;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 1rem;
          }
          .faq-answer {
            font-size: 1.1rem;
            color: #475569;
            line-height: 1.7;
          }
          .faq-cta {
            text-align: center;
            margin-top: 4rem;
          }
          .faq-cta h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 1rem;
          }
          .cta-button {
            display: inline-block;
            background-color: #f97316;
            color: #7f1d1d;
            padding: 0.875rem 2rem;
            border-radius: 0.5rem;
            font-weight: 600;
            text-decoration: none;
            transition: background-color 0.2s;
          }
          .cta-button:hover {
            background-color: #ea580c;
          }
        `}</style>
        <div className="faq-container">
          <Breadcrumb items={breadcrumbTrail} />

          <div className="faq-header">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about our appliance repair services.</p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">What types of appliances do you repair?</h3>
              <p className="faq-answer">
                We repair all major household appliances including refrigerators, washers, dryers, ovens, stoves, dishwashers, microwaves, and cooktops. We service most major brands and models.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Do you offer a warranty on your repairs?</h3>
              <p className="faq-answer">
                Yes, we stand behind our work. We offer a comprehensive warranty on both parts and labor for all repairs. The specific terms may vary depending on the repair, but your satisfaction is our priority.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">How quickly can you come out for a repair?</h3>
              <p className="faq-answer">
                We understand the inconvenience of a broken appliance. We strive to offer same-day or next-day service whenever possible. You can check our availability and book an appointment online instantly.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Is there a service call fee?</h3>
              <p className="faq-answer">
                Diagnostic fee to the technician for a home visit to determine the problem. If you elect to make the repair this fee is usually waived or credited toward the repair price, however.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Do you service commercial appliances?</h3>
              <p className="faq-answer">
                Our primary focus is on residential appliance repair. However, we may be able to assist with certain light commercial units. Please contact us directly to discuss your specific needs.
              </p>
            </div>
          </div>

          <div className="faq-cta">
            <h3>Still have questions?</h3>
            <p style={{marginBottom: '2rem', color: '#475569'}}>Our team is happy to help.</p>
            <Link to={routePath('/contact')} className="cta-button">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
