import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { servicesList } from '../data/servicesData';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/services?search=${searchQuery}`);
      setSearchResults([]);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      const results = servicesList.filter(service => 
        service.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 9999,
        backgroundColor: '#052e16',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <nav style={{
          width: '100%',
          padding: '0 40px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>

          {/* LEFT: Logo + Brand */}
          <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            flexShrink: 0,
          }}>
            <img
              src="/logo/logo 2.png"
              alt="Aerotech Solution"
              style={{
                height: '60px',
                width: '60px',
                objectFit: 'contain',
                borderRadius: '50%',
              }}
            />
            <span style={{
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '1.5rem',
              whiteSpace: 'nowrap',
            }}>
              Aerotech Solution
            </span>
          </Link>

          {/* CENTER: Nav Links */}
          <ul className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}>
            {/* Home */}
            <li>
              <Link to="/" style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#f97316'}
                onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
              >
                Home
              </Link>
            </li>

            {/* Services Dropdown */}
            <li style={{ position: 'relative' }}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button style={{
                color: isServicesOpen ? '#f97316' : '#ffffff',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: 0,
                transition: 'color 0.2s',
              }}>
                Services
                <span style={{
                  fontSize: '0.7rem',
                  transition: 'transform 0.2s',
                  transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>▼</span>
              </button>

              {/* Dropdown Menu */}
              {isServicesOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                  minWidth: '220px',
                  padding: '8px 0',
                  marginTop: '8px',
                  zIndex: 10000,
                }}>
                  {servicesList.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      style={{
                        display: 'block',
                        padding: '10px 20px',
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        fontSize: '1rem',
                        fontWeight: '500',
                        transition: 'background-color 0.15s, color 0.15s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#fff7ed';
                        e.currentTarget.style.color = '#f97316';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#1a1a1a';
                      }}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* About */}
            <li>
              <Link to="/about" style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#f97316'}
                onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
              >
                About
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link to="/contact" style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#f97316'}
                onMouseLeave={e => e.currentTarget.style.color = '#ffffff'}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* RIGHT: Search + Book Service */}
          <div className="desktop-actions" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearch}
                style={{
                  backgroundColor: '#1a3a2a',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '999px',
                  padding: '8px 14px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  width: '150px',
                  outline: 'none',
                }}
              />
              {searchQuery && searchResults.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  width: '260px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  zIndex: 10001,
                  overflow: 'hidden',
                }}>
                  {searchResults.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        borderBottom: '1px solid #f3f4f6',
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f973161a'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/book-service" style={{
              backgroundColor: '#f97316',
              color: '#800000',
              padding: '8px 20px',
              borderRadius: '999px',
              fontWeight: '700',
              fontSize: '1rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#ea580c'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f97316'}
            >
              Book Service
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-hamburger"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'none',
            }}
          >
            <svg width="28" height="28" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
              {isMobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            backgroundColor: '#052e16',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '16px 24px 24px',
          }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{
                  display: 'block', color: '#ffffff', textDecoration: 'none',
                  padding: '14px 0', fontWeight: '600', fontSize: '1rem',
                }}>Home</Link>
              </li>

              {/* Mobile Services Dropdown */}
              <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', color: '#ffffff', background: 'none', border: 'none',
                    padding: '14px 0', fontWeight: '600', fontSize: '1rem', cursor: 'pointer',
                  }}
                >
                  Services
                  <span style={{
                    fontSize: '0.7rem',
                    transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                  }}>▼</span>
                </button>
                {isServicesOpen && (
                  <div style={{ paddingBottom: '8px' }}>
                    {servicesList.map((service) => (
                      <Link
                        key={service.id}
                        to={`/services/${service.id}`}
                        onClick={() => { setIsMobileMenuOpen(false); setIsServicesOpen(false); }}
                        style={{
                          display: 'block', color: '#a7f3d0', textDecoration: 'none',
                          padding: '8px 16px', fontSize: '0.9rem', fontWeight: '500',
                        }}
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>

              <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} style={{
                  display: 'block', color: '#ffffff', textDecoration: 'none',
                  padding: '14px 0', fontWeight: '600', fontSize: '1rem',
                }}>About</Link>
              </li>
              <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} style={{
                  display: 'block', color: '#ffffff', textDecoration: 'none',
                  padding: '14px 0', fontWeight: '600', fontSize: '1rem',
                }}>Contact</Link>
              </li>
            </ul>

            <input
              type="text"
              placeholder="Search..."
              style={{
                backgroundColor: '#1a2e1e',
                border: 'none',
                borderRadius: '999px',
                padding: '10px 20px',
                color: '#ffffff',
                fontSize: '0.875rem',
                width: '160px',
                outline: 'none',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)',
              }}
            />
            <Link
              to="/book-service"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'block', marginTop: '12px',
                backgroundColor: '#f97316', color: '#ffffff',
                padding: '14px', borderRadius: '999px',
                fontWeight: '700', fontSize: '1rem',
                textDecoration: 'none', textAlign: 'center',
              }}
            >
              Book Service
            </Link>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-actions { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-hamburger { display: none !important; }
        }
      `}</style>

      <div style={{ height: '64px' }} />
    </>
  );
};

export default Navbar;