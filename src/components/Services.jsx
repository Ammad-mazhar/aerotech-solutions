import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { servicesList, brands } from '../data/servicesData';

const ServiceFeature = ({ service, index }) => {
  const navigate = useNavigate();
  const isEven = index % 2 === 0;

  return (
    <div style={{
      display: 'flex',
      flexDirection: isEven ? 'row' : 'row-reverse',
      alignItems: 'center',
      minHeight: '80vh',
      width: '100%',
      backgroundColor: '#052e16',
      overflow: 'hidden'
    }} className="feature-section">

      {/* Image Side */}
      <div style={{ flex: 1, height: '80vh', position: 'relative' }}>
        <img
          src={service.image}
          alt={service.alt || service.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.2)',
          mixBlendMode: 'multiply'
        }}></div>
      </div>

      {/* Text Side */}
      <div style={{
        flex: 1,
        padding: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'left'
      }}>
        <span style={{
          fontSize: '14px',
          fontWeight: '800',
          color: '#22c55e',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          marginBottom: '20px'
        }}>
        </span>
        <h2 style={{
          fontSize: '4rem',
          fontWeight: '900',
          color: '#ffffff',
          lineHeight: '1',
          marginBottom: '30px',
          letterSpacing: '-2px'
        }}>
          {service.title}
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          lineHeight: '1.8',
          maxWidth: '500px',
          marginBottom: '40px'
        }}>
          {service.description || "Precision engineered maintenance for high-performance domestic infrastructure."}
        </p>

        <button
          onClick={() => navigate(`/services/${service.id}`)}
          style={{
            width: 'fit-content',
            padding: '20px 40px',
            background: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '0px', // Sharp corners look more "engineered"
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            cursor: 'pointer',
            transition: '0.3s'
          }}
          className="btn-impact"
        >
          Learn more <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section id="services">
      {/* Hero Header */}
      <div style={{
        padding: '120px 40px',
        textAlign: 'center',
        backgroundColor: '#052e16',
        color: 'white'
      }}>
        <h1 style={{ fontSize: '1rem', letterSpacing: '8px', textTransform: 'uppercase', color: '#22c55e' }}>
          Aerotech Solution
        </h1>
        <p style={{ fontSize: '3rem', fontWeight: '900', marginTop: '20px' }}>
          Engineering Excellence.
        </p>
      </div>

      {/* Brands Marquee */}
      <div style={{ background: '#052e16', padding: '24px 0', borderBottom: '1px solid #065f46', overflow: 'hidden', display: 'flex' }}>
        <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 60s linear infinite', gap: '48px', paddingLeft: '24px' }}>
          {[...brands, ...brands].map((brand, i) => (
            <span key={i} style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              opacity: 0.8
            }}>
              {brand}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
      </div>

      {/* Feature Blocks */}
      {servicesList.map((service, index) => (
        <ServiceFeature key={index} service={service} index={index} />
      ))}

      <style>{`
        .btn-impact:hover {
          background: #22c55e !important;
          transform: translateX(10px);
        }
        @media (max-width: 1024px) {
          .feature-section { flex-direction: column !important; }
          .feature-section > div { width: 100% !important; flex: none !important; height: auto !important; }
          .feature-section > div:first-child { height: 400px !important; }
          .feature-section > div:last-child { padding: 40px !important; }
        }
      `}</style>
    </section>
  );
};

export default Services;