import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const ServiceAreasPage = () => {
  return (
    <>
      <Helmet>
        <title>Aerotech Solution | Service Areas - Nationwide Appliance Repair Coverage</title>
        <meta name="description" content="Aerotech Solution provides professional appliance repair services across USA. Chicago suburbs, Midwest, Northeast, South, West Coast coverage with local technicians." />
        <meta name="keywords" content="appliance repair service areas, Chicago appliance repair, nationwide HVAC service, Bolingbrook repair service, US appliance coverage" />
        <link rel="canonical" href="https://aerotechsolutioninc.com/service-areas" />
        <meta property="og:title" content="Aerotech Solution Service Areas | Nationwide Coverage" />
        <meta property="og:description" content="From Chicago to nationwide, find certified local technicians for appliance repair. Major metro areas and suburbs served with OEM parts and warranty." />
        <meta property="og:url" content="https://aerotechsolutioninc.com/service-areas" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aerotechsolutioninc.com/Washer Repair.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Service Areas | Aerotech Solution Appliance Repair" />
        <meta name="twitter:description" content="Nationwide coverage with local expert technicians. Chicago, Northeast, South, West Coast. Licensed & insured service you can trust." />
        <meta name="twitter:image" content="https://aerotechsolutioninc.com/Washer Repair.jpg" />
      </Helmet>
      <section className="service-areas-page">
        <style>{`
          .service-areas-page {
            padding: 5rem 0;
            background-color: #052e16;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            min-height: 60vh;
          }
          .sa-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 1.5rem;
            text-align: center;
          }
          .sa-header h1 {
            font-size: 3rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 1.5rem;
            letter-spacing: -0.025em;
          }
          .sa-header p {
            font-size: 1.25rem;
            color: #a7f3d0;
            max-width: 700px;
            margin: 0 auto 4rem;
            line-height: 1.75;
          }
          .coverage-map {
            background-color: #064e3b;
            border-radius: 1rem;
            padding: 4rem 2rem;
            border: 1px solid rgba(34, 197, 94, 0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .coverage-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
          }
          .coverage-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 1rem;
          }
          .coverage-desc {
            font-size: 1.1rem;
            color: #a7f3d0;
            max-width: 500px;
            margin-bottom: 2rem;
          }
          .cta-button {
            display: inline-block;
            background-color: #f97316;
            color: #7f1d1d;
            padding: 0.875rem 2rem;
            border-radius: 0.5rem;
            font-weight: 600;
            text-decoration: none;
            transition: background-color 0.2s;
          }
          .cta-button:hover {
            background-color: #ea580c;
          }
          .sa-content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            margin: 5rem 0;
            align-items: center;
          }
          .sa-image img {
            width: 100%;
            height: auto;
            border-radius: 1rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            object-fit: cover;
          }
          .sa-text h2 {
            font-size: 2rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 1rem;
          }
          .sa-text p {
            font-size: 1.1rem;
            color: #a7f3d0;
            line-height: 1.7;
            margin-bottom: 1.5rem;
          }
          .regions-section {
            margin-top: 5rem;
          }
          .regions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
          }
          .region-card {
            background-color: #064e3b;
            padding: 2rem;
            border-radius: 0.75rem;
            border: 1px solid rgba(34, 197, 94, 0.2);
            transition: transform 0.2s;
          }
          .region-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }
          .region-card h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 1rem;
            border-bottom: 2px solid #f97316;
            padding-bottom: 0.5rem;
            display: inline-block;
          }
          .region-card ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .region-card li {
            color: #a7f3d0;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
          }
          .region-card li::before {
            content: "✓";
            color: #f97316;
            margin-right: 0.5rem;
            font-weight: bold;
          }
          @media (max-width: 768px) {
            .sa-content-grid {
              grid-template-columns: 1fr;
              gap: 2rem;
            }
            .sa-image {
              order: -1;
            }
          }
        `}</style>
        <div className="sa-container">
          <div className="sa-header">
            <h1>Service Areas</h1>
            <p>
              We are proud to extend our professional appliance repair services across the entire United States.
              Wherever you call home, Aerotech Solution is ready to serve you.
            </p>
          </div>

          <div className="coverage-map">
            <div className="coverage-icon">🇺🇸</div>
            <h2 className="coverage-title">Nationwide Coverage</h2>
            <p className="coverage-desc">
              We have a network of certified technicians across the East Coast to the West Coast, promising quality repair service available at all times. We provide our services all over the US.
            </p>
            <Link to="/book-service" className="cta-button">
              Find a Technician Near You
            </Link>
          </div>

          <div className="sa-content-grid">
            <div className="sa-text">
              <h2>Local Technicians, National Standards</h2>
              <p style={{ marginBottom: '2rem' }}>
               We provide service throughout the country but we know the value of local service.
                Our techs live and work in your communities and know:
                our local needs, whilst meeting national, strict quality standards..
              </p>
              <p>
                The unique combination provides the benefits of a friendly, reliable neighborhood guy and the resources, training and warranty of a national company. Our team always receives extensive training to ensure we are at the forefront of appliance technology.
              </p>
              <p>
               Our team is ready for any kitchen disaster, laundry day meltdown or other emergency.
                to have all major home appliances repaired. We come to you with the workshop,
                Completely stocked with parts and tools for the job, gets done first time.
              </p>
            </div>
            <div className="sa-image">
              <img src="/Washer Repair.jpg" alt="Nationwide Appliance Repair and Emergency Appliance Restoration" />
            </div>
          </div>

          <div className="regions-section">
            <h2 style={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>Serving Major Regions</h2>
            <p style={{ textAlign: 'center', color: '#a7f3d0', maxWidth: '700px', margin: '0 auto 3rem' }}>
              Our network covers metropolitan areas and surrounding suburbs across the country.
            </p>
            <div className="regions-grid">
              <div className="region-card">
                <h3>Northeast</h3>
                <ul>
                  <li>New York & Tri-State Area</li>
                  <li>Boston & New England</li>
                  <li>Philadelphia Metro</li>
                  <li>Washington D.C.</li>
                </ul>
              </div>
              <div className="region-card">
                <h3>Midwest</h3>
                <ul>
                  <li>Chicago & Suburbs</li>
                  <li>Detroit Metro</li>
                  <li>Minneapolis-St. Paul</li>
                  <li>Columbus & Cleveland</li>
                </ul>
              </div>
              <div className="region-card">
                <h3>South</h3>
                <ul>
                  <li>Dallas-Fort Worth</li>
                  <li>Houston & Austin</li>
                  <li>Atlanta Metro</li>
                  <li>Miami & Orlando</li>
                </ul>
              </div>
              <div className="region-card">
                <h3>West</h3>
                <ul>
                  <li>Los Angeles & SoCal</li>
                  <li>San Francisco Bay Area</li>
                  <li>Seattle & Portland</li>
                  <li>Phoenix Metro</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceAreasPage;
