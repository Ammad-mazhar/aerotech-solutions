import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#000000', // Black
    color: '#ffffff',
    padding: '100px 20px 40px',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    borderTop: '4px solid #22c55e', // Green Accent Bar
    position: 'relative',
    overflow: 'hidden'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '60px',
    marginBottom: '80px'
  };

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };

  const headingStyle = {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '-0.5px',
    marginBottom: '8px'
  };

  const linkListStyle = {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const linkStyle = {
    color: '#94a3b8', // slate-400
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const contactItemStyle = {
    display: 'flex',
    gap: '12px',
    color: '#94a3b8',
    fontSize: '0.95rem',
    lineHeight: '1.6'
  };

  const socialIconStyle = {
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '1px solid rgba(255,255,255,0.1)'
  };

  const bottomBarStyle = {
    paddingTop: '40px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px'
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.color = '#22c55e';
    e.currentTarget.style.transform = 'translateX(5px)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.color = '#94a3b8';
    e.currentTarget.style.transform = 'translateX(0)';
  };

  return (
    <footer style={footerStyle}>
      {/* Subtle background decoration */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)', zIndex: 0 }}></div>

      <div style={containerStyle}>
        <div style={gridStyle}>
          {/* Company Column */}
          <div style={columnStyle}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src="/logo/logo 2.jpg" 
                alt="Aerotech Solution" 
                style={{ width: '45px', height: 'auto', borderRadius: '12px' }}
              />
              <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#ffffff', letterSpacing: '-1px' }}>AEROTECH SOLUTION</span>
            </Link>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.8', margin: 0 }}>
              Restoring comfort to your home through elite appliance craftsmanship. Factory-trained master technicians available 24/7 for essential and luxury brands.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <div
                  key={i}
                  style={socialIconStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#22c55e'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.color = '#ffffff'; }}
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Solutions Column */}
          <div style={columnStyle}>
            <h4 style={headingStyle}>Solutions</h4>
            <ul style={linkListStyle}>
              {['Refrigerator', 'Washer & Dryer', 'Oven & Stove', 'Luxury Restoration', 'Quick Diagnostics'].map((item) => (
                <li key={item}>
                  <a
                    href="/#services"
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ChevronRight size={14} /> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div style={columnStyle}>
            <h4 style={headingStyle}>Company</h4>
            <ul style={linkListStyle}>
              {['About Us', 'Contact Us', 'Service Areas', 'FAQ', 'Expert Team'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'About Us' ? '/about' : item === 'Service Areas' ? '/service-areas' : item === 'FAQ' ? '/faq' : '/contact'}
                    style={linkStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ChevronRight size={14} /> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div style={columnStyle}>
            <h4 style={headingStyle}>Emergency Port</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={contactItemStyle}>
                <Phone size={20} style={{ color: '#22c55e' }} />
                <div>
                  <span style={{ display: 'block', fontWeight: '700', color: '#ffffff' }}>630 943 5120</span>
                  <span style={{ fontSize: '0.85rem' }}>24/7 Priority Support</span>
                </div>
              </div>
              <div style={contactItemStyle}>
                <Mail size={20} style={{ color: '#22c55e' }} />
                <div>
                  <span style={{ display: 'block', fontWeight: '700', color: '#ffffff' }}>aerotechsolutions@gmail.com</span>
                  <span style={{ fontSize: '0.85rem' }}>Official Correspondence</span>
                </div>
              </div>
              <div style={contactItemStyle}>
                <MapPin size={20} style={{ color: '#22c55e' }} />
                <div>
                  <span style={{ display: 'block', fontWeight: '700', color: '#ffffff' }}>Bolingbrook, IL</span>
                  <span style={{ fontSize: '0.85rem' }}>Serving Greater Chicago land</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={bottomBarStyle}>
          <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>
            &copy; {new Date().getFullYear()} Aerotech Solution Inc. Engineering Excellence in Home Service.
          </p>
          <div style={{ display: 'flex', gap: '32px' }}>
            <Link to="/privacy-policy" style={{ ...linkStyle, gap: '0' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>Privacy</Link>
            <Link to="/terms-of-service" style={{ ...linkStyle, gap: '0' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>Terms</Link>
            <Link to="/faq" style={{ ...linkStyle, gap: '0' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
