import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: '#ffffff',
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
                color: '#0f172a',
                marginBottom: '16px',
                letterSpacing: '-2px'
            }}>404</h1>

            <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '16px'
            }}>Oops! This page doesn't exist</h2>

            <p style={{
                fontSize: '1.125rem',
                color: '#64748b',
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
                    color: '#ffffff',
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
    );
};

export default NotFound;
