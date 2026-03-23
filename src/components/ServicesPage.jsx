import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { servicesList } from '../data/servicesData';

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Expert Appliance Repair Services | Aerotech Solution</title>
        <meta name="description" content="Browse all appliance repair services offered by Aerotech Solution. We service refrigerators, ovens, washers, dryers, HVAC, and more." />
        <link rel="canonical" href="https://www.aerotechsolution.com/services" />
      </Helmet>
      <div style={{
        backgroundColor: '#052e16',
        color: 'white',
        minHeight: '100vh',
        padding: '120px 24px 60px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>Our Services</h1>
            <p style={{ fontSize: '1.1rem', color: '#cbd5e1' }}>
              Comprehensive repair solutions for all your home appliances.
            </p>
          </header>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {servicesList.map(service => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    backgroundColor: '#0c4a2b',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '32px',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {Icon && <Icon style={{ height: '48px', width: '48px', color: '#f97316', margin: '0 auto 16px' }} />}
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '12px' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#a7f3d0', minHeight: '40px' }}>
                    {service.problems.slice(0, 2).join(', ')}...
                  </p>
                  <span style={{
                    marginTop: '16px',
                    display: 'inline-block',
                    fontWeight: '600',
                    color: '#f97316',
                  }}>
                    Learn More &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;