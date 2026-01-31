import React from 'react';

const TermsOfServicePage = () => {
  return (
    <section className="terms-page">
      <style>{`
        .terms-page {
          padding: 5rem 0;
          background-color: #ffffff;
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
          color: #0f172a;
          margin-bottom: 1.5rem;
          letter-spacing: -0.025em;
        }
        .terms-header p {
          font-size: 1.25rem;
          color: #475569;
          line-height: 1.75;
        }
        .terms-content {
          color: #334155;
          line-height: 1.8;
        }
        .terms-content h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #0f172a;
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
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Aerotech Service website and services operated by Aerotech Service Inc ("us", "we", or "our").
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
          </p>

          <h2>2. Service Description</h2>
          <p>
            Aerotech Service provides home appliance repair services. We reserve the right to refuse service to anyone for any reason at any time. We may also modify or discontinue our services without notice at any time.
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
            In no event shall Aerotech Service, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </p>

          <h2>8. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsOfServicePage;