import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfServicePage = () => {
  return (
    <>
      <Helmet>
        <title>Aerotech Solution | Terms of Service - Appliance Repair Service Terms</title>
        <meta name="description" content="Aerotech Solution Terms of Service for appliance repair. Includes appointment policy, payments, warranty details, and cancellation terms for residential service." />
        <meta name="keywords" content="Aerotech Solution terms of service, appliance repair terms, service warranty terms, repair cancellation policy" />
        <link rel="canonical" href="https://aerotechsolutioninc.com/terms-of-service" />
        <meta property="og:title" content="Terms of Service | Aerotech Solution" />
        <meta property="og:description" content="Review our service terms including payments, appointments, warranty, and cancellation policy before booking repair service." />
        <meta property="og:url" content="https://aerotechsolutioninc.com/terms-of-service" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aerotechsolutioninc.com/banner-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aerotech Solution Terms & Conditions" />
        <meta name="twitter:description" content="Important service terms for appliance repair. Know our policies on appointments, payments, and warranties." />
        <meta name="twitter:image" content="https://aerotechsolutioninc.com/banner-image.jpeg" />
      </Helmet>
    <section className="terms-page">
      <style>{`
        .terms-page {
          padding: 5rem 0;
          background-color: #052e16;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          min-height: 60vh;
        }
        .terms-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .terms-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .terms-header h1 {
          font-size: 3rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
        }
        .terms-header p {
          font-size: 1.25rem;
          color: #a7f3d0;
          line-height: 1.75;
        }
        .terms-content {
          color: #e2e8f0;
          line-height: 1.8;
        }
        .terms-content h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
        }
        .terms-content p {
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }
      `}</style>
      <div className="terms-container">
        <div className="terms-header">
          <h1>Terms of Service</h1>
          <p>Last updated: January 1, 2024</p>
        </div>

        <div className="terms-content">
          <p>
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Aerotech Solution website and services operated by Aerotech Solution Inc ("us", "we", or "our").
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
          </p>

          <h2>2. Service Description</h2>
          <p>
            Aerotech Solution provides home appliance repair services. We reserve the right to refuse service to anyone for any reason at any time. We may also modify or discontinue our services without notice at any time.
          </p>

          <h2>3. Appointments and Cancellations</h2>
          <p>
            When you book an appointment, you agree to provide accurate and complete information. Cancellations must be made at least 24 hours in advance. Late cancellations or missed appointments may be subject to a cancellation fee.
          </p>

          <h2>4. Payments</h2>
          <p>
            Payment is due upon completion of the service. We accept major credit cards, checks, and cash. All prices are subject to change without notice. Estimates provided are valid for 30 days.
          </p>

          <h2>5. Warranty</h2>
          <p>
            We provide a warranty on our repairs as specified on your invoice. This warranty covers the specific parts replaced and labor performed. It does not cover other issues that may arise with the appliance unrelated to our repair.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Aerotech Solution, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </p>

          <h2>8. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:<br />
            Email: aerotechsolutions@gmail.com<br />
            Phone: 630 943 5120<br />
            Address: 206 Far Hills Dr, Bolingbrook, IL 60440
          </p>
      </div>
      </div>
    </section>
    </>
  );
};

export default TermsOfServicePage;
