import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
    return (
        <>
          <Helmet>
            <title>Page Not Found - 404 | Aerotech Solution</title>
            <meta name="description" content="The page you are looking for cannot be found. Aerotech Solution professional appliance repair services. Return to home for repair scheduling." />
            <meta name="keywords" content="404 error, page not found, appliance repair home" />
            <link rel="canonical" href="https://aerotechsolutioninc.com/" />
            <meta property="og:title" content="404 | Page Not Found | Aerotech Solution" />
            <meta property="og:description" content="Page not found. Visit our home page for appliance repair services." />
            <meta property="og:url" content="https://aerotechsolutioninc.com/" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://aerotechsolutioninc.com/banner-image.jpeg" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="404 - Page Not Found" />
            <meta name="twitter:description" content="Return to Aerotech Solution home for professional appliance repair services." />
            <meta name="twitter:image" content="https://aerotechsolutioninc.com/banner-image.jpeg" />
          </Helmet>
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: '#052e16',
            fontFamily: "'Inter', sans-serif",
            textAlign: 'center'
          }}>
            <div style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#fef2f2',
                color: '#ef4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px'
            }}>
                <AlertCircle size={64} />
            </div>

            <h1 style={{
                fontSize: '4rem',
                fontWeight: '900',
                color: '#ffffff',
                marginBottom: '16px',
                letterSpacing: '-2px'
            }}>404</h1>

            <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#ffffff',
                marginBottom: '16px'
            }}>Oops! This page doesn't exist</h2>

            <p style={{
                fontSize: '1.125rem',
                color: '#a7f3d0',
                maxWidth: '500px',
                marginBottom: '40px',
                lineHeight: '1.6'
            }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <Link
                to="/"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 32px',
                    backgroundColor: '#f97316',
                    color: '#7f1d1d',
                    borderRadius: '14px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.2)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ea580c';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f97316';
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
            >
                <Home size={20} />
                Back to Home
            </Link>
          </div>
        </>
    );
};

export default NotFound;
