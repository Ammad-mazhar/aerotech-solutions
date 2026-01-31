import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      content: "Aerotech Service saved the day! My refrigerator stopped working right before a big family dinner. They came out the same day and fixed it quickly. Highly recommended!",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Small Business Owner",
      content: "Professional, punctual, and knowledgeable. The technician explained exactly what was wrong with our washer and fixed it for a fair price. Will definitely use them again.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Resident",
      content: "I was impressed by their transparency. No hidden fees, and they gave me a quote before starting the work. My oven works perfectly now.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <style>{`
        .testimonials-section {
          padding: 5rem 0;
          background-color: #ffffff;
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
          color: #0f172a;
          margin-bottom: 1rem;
        }
        .testimonials-header p {
          font-size: 1.125rem;
          color: #6b7280;
          max-width: 48rem;
          margin: 0 auto;
          line-height: 1.75;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
        }
        .testimonial-card {
          background-color: #f8fafc;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .testimonial-rating {
          color: #f59e0b; /* Amber/Gold */
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        .testimonial-content {
          color: #374151;
          font-style: italic;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          flex-grow: 1;
        }
        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: auto;
        }
        .author-avatar {
          width: 48px;
          height: 48px;
          background-color: #2563eb;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.25rem;
        }
        .author-info h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
        }
        .author-info span {
          font-size: 0.875rem;
          color: #6b7280;
        }
        @media (max-width: 768px) {
          .testimonials-header h2 {
            font-size: 2rem;
          }
        }
      `}</style>
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>What Our Customers Say</h2>
          <p>Don't just take our word for it. Here's what our satisfied customers have to say about our appliance repair services.</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {'★'.repeat(testimonial.rating)}
              </div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;