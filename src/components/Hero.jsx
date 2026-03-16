import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Star, ShieldCheck, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);

  const sectionStyle = {
    position: 'relative',
    height: '100vh',
    minHeight: '800px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
    overflow: 'hidden'
  };

  const containerStyle = {
    maxWidth: '1000px',
    textAlign: 'center',
    color: '#1e293b',
    zIndex: 2,
    paddingTop: '80px' // Adjust for fixed navbar
  };

  const headlineStyle = {
    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
    fontWeight: '900',
    lineHeight: '1.1',
    letterSpacing: '-2px',
    marginBottom: '24px',
    textShadow: '0 0 30px rgba(255, 255, 255, 0.8)'
  };

  const subheadlineStyle = {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    fontWeight: '500',
    maxWidth: '700px',
    margin: '0 auto 40px',
    lineHeight: '1.8',
    opacity: 0.95,
    textShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
  };

  const btnContainerStyle = {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  };

  const primaryBtnStyle = {
    backgroundColor: '#f97316',
    color: '#7f1d1d',
    padding: '18px 36px',
    borderRadius: '100px',
    fontSize: '1rem',
    fontWeight: '800',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(249, 115, 22, 0.3)',
    border: 'none',
    cursor: 'pointer'
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 24px',
    backgroundColor: '#fff7ed',
    backdropFilter: 'blur(12px)',
    border: '1px solid #fed7aa',
    borderRadius: '100px',
    color: '#f97316',
    fontSize: '0.875rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
  };

  const trustContainerStyle = {
    display: 'flex',
    gap: '32px',
    justifyContent: 'center',
    marginTop: '60px',
    flexWrap: 'wrap'
  };

  const trustItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.95rem',
    fontWeight: '600',
    color: '#475569',
    textShadow: 'none'
  };

  return (
    <>
      <Helmet>
        <title>Aerotech Solution | Professional Appliance Restoration & HVAC Services USA</title>
        <meta name="description" content="Aerotech Solution provides elite repair and restoration for premium appliances, HVAC, and laundry systems across the USA. Factory-certified technicians for all major brands. Same-day service available." />
        <meta name="keywords" content="appliance repair USA, HVAC solutions, furnace restoration, refrigerator repair, washer dryer service, oven stove repair, microwave repair, water heater service, Aerotech Solution" />
        <link rel="canonical" href="https://www.aerotechservice.com/" />
        <meta property="og:title" content="Aerotech Solution | Professional Appliance Restoration & HVAC Services USA" />
        <meta property="og:description" content="Nationwide premium appliance restoration. From HVAC calibration to kitchen system solutions, we bring your home back to factory standards with certified technicians." />
        <meta property="og:url" content="https://www.aerotechservice.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.aerotechservice.com/banner-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aerotech Solution | Elite Appliance & HVAC Services" />
        <meta name="twitter:description" content="24/7 residential appliance repair across USA. Certified parts, professional dispatch, same-day availability for emergencies." />
        <meta name="twitter:image" content="https://www.aerotechservice.com/banner-image.jpeg" />
      </Helmet>
      <section id="home" style={sectionStyle}>
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.4) 100%), url("/banner-image.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            y
          }}
        />
        <div style={containerStyle}>
          <div style={badgeStyle}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#f97316', borderRadius: '50%', boxShadow: '0 0 10px #f97316' }}></span>
            Certified Master Technicians
          </div>

          <h1 style={headlineStyle}>
            Elite Appliance Care for Your Modern Home.
          </h1>

          <p style={subheadlineStyle}>
            We specialize in high-end restoration for refrigerators, washers, ovens, and luxury kitchen suites. 24/7 priority support with OEM parts and master craftsmanship.
          </p>

          <div style={btnContainerStyle}>
            <button
              style={primaryBtnStyle}
              onClick={() => {
                navigate('/contact');
                window.scrollTo(0, 0);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ea580c';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(249, 115, 22, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f97316';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(249, 115, 22, 0.3)';
              }}
            >
              Get Emergency Repair
              <ChevronRight size={20} />
            </button>
          </div>

          <div style={trustContainerStyle}>
            <div style={trustItemStyle}>
              <Star size={18} fill="#fbbf24" color="#fbbf24" />
              5-Star Rated Service
            </div>
            <div style={{ width: '1px', height: '20px', backgroundColor: '#cbd5e1' }}></div>
            <div style={trustItemStyle}>
              <ShieldCheck size={18} color="#22c55e" />
              Licensed & Insured
            </div>
            <div style={{ width: '1px', height: '20px', backgroundColor: '#cbd5e1' }}></div>
            <div style={trustItemStyle}>
              <Clock size={18} color="#22c55e" />
              Same-Day Availability
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default Hero;
