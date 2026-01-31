import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check } from 'lucide-react';
import { servicesList } from '../data/servicesData';

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  const navigate = useNavigate();
  const anchorId = service.id.split('-')[0];

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '24px',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 10px 20px -3px rgba(0, 0, 0, 0.03)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'pointer',
    height: '100%',
    flexGrow: 0
  };

  const imageContainerStyle = {
    width: '100%',
    height: '240px',
    overflow: 'hidden',
    position: 'relative'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  const cardContentStyle = {
    padding: '32px',
    paddingTop: '48px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    position: 'relative'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: '#1e40af',
    background: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(10px)',
    padding: '6px 16px',
    borderRadius: '12px',
    fontWeight: '800',
    zIndex: 2,
    border: '1px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)'
  };

  const iconCircleStyle = {
    width: '68px',
    height: '68px',
    backgroundColor: '#ffffff',
    color: '#2563eb',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-48px',
    marginLeft: '24px',
    position: 'relative',
    zIndex: 3,
    boxShadow: '0 12px 24px -6px rgba(15, 23, 42, 0.12)',
    border: '6px solid #ffffff',
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '900',
    letterSpacing: '-0.025em',
    color: '#0f172a',
    marginBottom: '12px'
  };

  const featureListStyle = {
    margin: '12px 0 28px 0',
    padding: '0',
    listStyle: 'none'
  };

  const featureItemStyle = {
    fontSize: '14px',
    color: '#475569',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '10px',
    fontWeight: '500'
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    marginTop: 'auto'
  };

  const primaryButtonStyle = {
    width: '100%',
    padding: '16px',
    background: '#0f172a',
    color: '#ffffff',
    borderRadius: '16px',
    fontWeight: '800',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    boxShadow: '0 8px 16px -4px rgba(15, 23, 42, 0.15)'
  };

  return (
    <div
      id={anchorId}
      style={cardStyle}
      className="service-card"
      onClick={() => {
        navigate(`/services/${service.id}`);
        window.scrollTo(0, 0);
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-14px)';
        e.currentTarget.style.boxShadow = '0 40px 80px -20px rgba(15, 23, 42, 0.15)';
        e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.3)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1.1)';
        const icon = e.currentTarget.querySelector('.icon-wrap');
        if (icon) {
          icon.style.transform = 'translateY(-6px) scale(1.05)';
          icon.style.color = '#1d4ed8';
          icon.style.boxShadow = '0 20px 30px -10px rgba(37, 99, 235, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 10px 20px -3px rgba(0, 0, 0, 0.03)';
        e.currentTarget.style.borderColor = 'rgba(15, 23, 42, 0.08)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
        const icon = e.currentTarget.querySelector('.icon-wrap');
        if (icon) {
          icon.style.transform = 'translateY(0) scale(1)';
          icon.style.color = '#2563eb';
          icon.style.boxShadow = '0 12px 24px -6px rgba(15, 23, 42, 0.12)';
        }
      }}
    >
      <div style={badgeStyle}>Elite Tier</div>

      <div style={imageContainerStyle}>
        <img src={service.image} alt={service.title} style={imageStyle} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(15,23,42,0.05))' }}></div>
      </div>

      <div style={iconCircleStyle} className="icon-wrap">
        <Icon size={32} strokeWidth={2} />
      </div>

      <div style={cardContentStyle}>
        <h3 style={titleStyle}>
          {service.title}
        </h3>

        <ul style={featureListStyle}>
          {service.features.map((feature, i) => (
            <li key={i} style={featureItemStyle}>
              <div style={{ background: '#eff6ff', padding: '5px', borderRadius: '8px', display: 'flex' }}>
                <Check size={14} color="#2563eb" strokeWidth={4} />
              </div>
              {feature}
            </li>
          ))}
        </ul>

        <div style={buttonContainerStyle}>
          <div
            style={{
              color: '#1d4ed8',
              fontWeight: '800',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease',
              width: 'fit-content'
            }}
            className="learn-more-link"
          >
            Learn More
            <ChevronRight size={18} className="chevron" style={{ transition: 'transform 0.3s ease' }} />
          </div>

          <button
            style={primaryButtonStyle}
            onClick={(e) => {
              e.stopPropagation();
              navigate('/contact', { state: { applianceType: service.title } });
              window.scrollTo(0, 0);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1e293b';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(15, 23, 42, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#0f172a';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(15, 23, 42, 0.15)';
            }}
          >
            Book Now
            <ChevronRight size={20} style={{ marginLeft: '4px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const sectionWrapperStyle = {
    padding: '100px 20px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '80px'
  };

  const gridContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '60px 0',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  return (
    <section id="services" style={sectionWrapperStyle}>
      <div style={headerStyle}>
        <span style={{ color: '#2563eb', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>Elite Restoration</span>
        <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#0f172a', margin: '10px 0', letterSpacing: '-1px' }}>
          Executive Appliance Care
        </h2>
        <div style={{ width: '100px', height: '5px', backgroundColor: '#3b82f6', margin: '20px auto', borderRadius: '10px' }}></div>
      </div>

      <div style={gridContainerStyle}>
        {servicesList.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
      <style>{`
        .service-card {
          width: 100%;
          margin: 15px 0;
          min-width: 280px;
        }
        @media (min-width: 768px) {
          .service-card {
            width: 45%;
            margin: 15px;
          }
        }
        @media (min-width: 1200px) {
          .service-card {
            width: 30%;
            margin: 15px;
            min-width: 350px;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
