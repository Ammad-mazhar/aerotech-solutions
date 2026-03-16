import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Aerotech Solution | Privacy Policy - Appliance Repair Data Protection</title>
        <meta name="description" content="Aerotech Solution Privacy Policy explains how we collect, use, and protect your personal information during appliance repair services. Your privacy is our priority." />
        <meta name="keywords" content="Aerotech Solution privacy policy, appliance repair privacy, data protection, service privacy terms" />
        <link rel="canonical" href="https://www.aerotechservice.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | Aerotech Solution" />
        <meta property="og:description" content="Read our privacy policy. We do not sell your data and use information only for service delivery and communication." />
        <meta property="og:url" content="https://www.aerotechservice.com/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.aerotechservice.com/banner-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aerotech Solution Privacy Policy" />
        <meta name="twitter:description" content="Committed to protecting your privacy during appliance repair services. Secure data handling guaranteed." />
        <meta name="twitter:image" content="https://www.aerotechservice.com/banner-image.jpeg" />
      </Helmet>
      <section className="policy-page">
        <style>{`
          .policy-page {
            padding: 5rem 0;
            background-color: #052e16;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            min-height: 60vh;
          }
          .policy-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 0 1.5rem;
          }
          .policy-header {
            text-align: center;
            margin-bottom: 4rem;
          }
          .policy-header h1 {
            font-size: 3rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 1.5rem;
            letter-spacing: -0.025em;
          }
          .policy-header p {
            font-size: 1.25rem;
            color: #a7f3d0;
            line-height: 1.75;
          }
          .policy-content {
            color: #e2e8f0;
            line-height: 1.8;
          }
          .policy-content h2 {
            font-size: 1.8rem;
            font-weight: 700;
            color: #ffffff;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
          }
          .policy-content p {
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
          }
          .policy-content ul {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
          }
          .policy-content li {
            margin-bottom: 0.75rem;
            font-size: 1.1rem;
          }
        `}</style>
        <div className="policy-container">
          <div className="policy-header">
            <h1>Privacy Policy</h1>
            <p>Last updated: January 1, 2024</p>
          </div>

          <div className="policy-content">
            <p>
              At Aerotech Solution, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website and services.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Personal identification information (Name, email address, phone number, etc.)</li>
              <li>Service address and location details</li>
              <li>Appliance details and service history</li>
              <li>Payment information (processed securely by our payment providers)</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our appliance repair services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Communicate with you about products, services, offers, and events</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
            </p>

            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:<br />
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

export default PrivacyPolicyPage;
