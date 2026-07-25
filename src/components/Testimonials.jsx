import React from 'react';

// Factual service-standards cards — replaces the previous testimonials
// section, which used three customer names/quotes that were not genuine.
// No invented reviews, anonymous quotes, or fabricated customer statements
// are used here; every statement below is a verified operational fact.
const serviceStandards = [
  {
    id: 1,
    title: "Approved ZIP Coverage",
    content: "All nine services are available across 379 approved ZIP codes in Chicagoland and surrounding Illinois communities."
  },
  {
    id: 2,
    title: "Service Hours",
    content: "Support is available Monday through Saturday, 9:00 AM–5:00 PM Central Time. Closed Sunday."
  },
  {
    id: 3,
    title: "Parts Support",
    content: "Technicians carry commonly used replacement parts. Model-specific or additional required parts can be sourced after diagnosis."
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <style>{`
        .testimonials-section {
          padding: 5rem 0;
          background-color: #052e16;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .testimonials-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .testimonials-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .testimonials-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
        }
        .testimonials-header p {
          font-size: 1.125rem;
          color: #d1d5db;
          max-width: 48rem;
          margin: 0 auto;
          line-height: 1.75;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
          gap: 2.5rem;
        }
        .testimonial-card {
          background-color: #052e16;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
          border: 1px solid #052e16;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        }
        .standard-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.75rem;
        }
        .standard-content {
          color: #d1d5db;
          margin: 0;
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .testimonials-header h2 {
            font-size: 2rem;
          }
        }
      `}</style>
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>Service Standards</h2>
          <p>What you can expect when scheduling service with Aerotech Solution.</p>
        </div>
        <div className="testimonials-grid">
          {serviceStandards.map((item) => (
            <div key={item.id} className="testimonial-card">
              <h3 className="standard-title">{item.title}</h3>
              <p className="standard-content">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
