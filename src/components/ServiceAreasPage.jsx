import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { canonicalUrl, routePath, breadcrumbSchema } from '../utils/seo';
import Breadcrumb from './Breadcrumb';
import ServiceAreaZipChecker from './ServiceAreaZipChecker';
import { locationsData, publishedLocationSlugs } from '../data/locationsData';

// Not React.lazy()-wrapped: ServiceAreasPage.jsx is already its own
// lazy-loaded route (see App.jsx), so a plain static import here still keeps
// the ~379-entry ZIP dataset out of the homepage/global bundle — it only
// loads with this page's own chunk. A *nested* React.lazy()+Suspense inside
// an already-lazy route risks the exact "Loading..." fallback leaking into
// the prerendered HTML that src/entry-server.jsx's comments document (only
// the outermost Suspense of a render gets resolved cleanly); a static import
// avoids that risk entirely since the checker has no SEO-relevant content of
// its own to prerender in the first place.

// Every county actually present in service-area-zips.csv (11 total) — do not
// add a county here unless it appears in that file.
const approvedCounties = ['Cook', 'DuPage', 'Will', 'Kane', 'Lake', 'Kendall', 'Grundy', 'DeKalb', 'McHenry', 'Kankakee', 'LaSalle'];

// Short, complete-sentence descriptions for the Featured Service Areas cards
// below — deliberately hardcoded here rather than truncating
// location.introduction (which is written as full paragraphs, not
// card-length blurbs) so no card description is ever cut off mid-sentence.
const featuredAreaBlurbs = {
  'bolingbrook-il': 'Aerotech Solution is headquartered in Bolingbrook and repairs appliances and HVAC systems in our approved 60440 and 60490 ZIP codes.',
  'naperville-il': 'We repair furnaces, HVAC systems, dishwashers, ovens and refrigerators in our approved Naperville ZIP codes.',
  'aurora-il': 'We repair furnaces, HVAC systems, refrigerators, dryers and microwaves in our approved Aurora ZIP codes.'
};

const breadcrumbTrail = [
  { label: 'Home', path: '/' },
  { label: 'Service Areas', path: '/service-areas' }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [breadcrumbSchema(breadcrumbTrail)]
};

const ServiceAreasPage = () => {
  return (
    <>
      <Helmet>
        <title>Appliance Repair Service Areas in Illinois | Aerotech Solution</title>
        <meta name="description" content="Check appliance, HVAC and water heater repair availability across selected ZIP codes in Chicagoland and surrounding Illinois communities." />
        <meta name="keywords" content="appliance repair service areas, Chicagoland appliance repair, Illinois HVAC service, Bolingbrook repair service, approved ZIP code coverage" />
        <link rel="canonical" href={canonicalUrl('/service-areas')} />
        <meta property="og:title" content="Appliance Repair Service Areas in Illinois | Aerotech Solution" />
        <meta property="og:description" content="Check appliance, HVAC and water heater repair availability across selected ZIP codes in Chicagoland and surrounding Illinois communities." />
        <meta property="og:url" content={canonicalUrl('/service-areas')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aerotechsolutioninc.com/washer-repair.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Appliance Repair Service Areas in Illinois | Aerotech Solution" />
        <meta name="twitter:description" content="Check appliance, HVAC and water heater repair availability across selected ZIP codes in Chicagoland and surrounding Illinois communities." />
        <meta name="twitter:image" content="https://aerotechsolutioninc.com/washer-repair.webp" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
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
            max-width: 560px;
            margin: 0 auto 2rem;
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
          .zip-section {
            margin-top: 5rem;
          }
          .featured-areas-section {
            margin-top: 5rem;
          }
          .featured-areas-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
          }
          .featured-area-card {
            display: block;
            background-color: #064e3b;
            padding: 1.75rem;
            border-radius: 1rem;
            border: 1px solid rgba(34, 197, 94, 0.2);
            text-decoration: none;
            text-align: left;
            transition: border-color 0.2s;
          }
          .featured-area-card:hover {
            border-color: #f97316;
          }
          .featured-area-card h3 {
            color: #ffffff;
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0 0 0.5rem;
          }
          .featured-area-card p {
            color: #a7f3d0;
            font-size: 0.95rem;
            line-height: 1.6;
            margin: 0;
          }
          .counties-section {
            margin-top: 5rem;
          }
          .counties-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr));
            gap: 1rem;
            margin-top: 2rem;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
          }
          .county-pill {
            background-color: #064e3b;
            padding: 1rem 1.25rem;
            border-radius: 0.75rem;
            border: 1px solid rgba(34, 197, 94, 0.2);
            color: #ffffff;
            font-weight: 600;
          }
          .sa-final-cta {
            margin-top: 4rem;
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
          <Breadcrumb items={breadcrumbTrail} />

          <div className="sa-header">
            <h1>Appliance Repair Service Areas</h1>
            <p>
              Aerotech Solution serves selected ZIP codes across Chicagoland and surrounding Illinois
              communities. Service availability is based on ZIP code — use the checker below to confirm
              coverage at your address.
            </p>
          </div>

          <div className="coverage-map">
            <h2 className="coverage-title">Serving Chicagoland and Surrounding Illinois Communities</h2>
            <p className="coverage-desc">
              Our technicians cover a defined set of approved ZIP codes across the Chicago suburbs and
              nearby Illinois communities, radiating out from our Bolingbrook base. If your ZIP code isn't
              yet on the approved list, reach out — we can confirm whether special availability is possible.
            </p>
            <Link to={routePath('/book-service')} className="cta-button">
              Book a Service
            </Link>
          </div>

          <div className="zip-section">
            <ServiceAreaZipChecker />
          </div>

          <div className="sa-content-grid">
            <div className="sa-text">
              <h2>Local Technicians Who Know Chicagoland</h2>
              <p style={{ marginBottom: '2rem' }}>
                We dispatch technicians directly to each of our approved ZIP codes across Chicagoland and
                surrounding Illinois communities.
              </p>
              <p>
                We repair refrigerators, washers, dryers, ovens, HVAC systems, water heaters and more — the
                same services are available in every approved ZIP code, regardless of which one you're in.
              </p>
            </div>
            <div className="sa-image">
              <img src="/washer-repair.webp" alt="Technician repairing a washing machine" width={540} height={360} loading="lazy" />
            </div>
          </div>

          <div className="counties-section">
            <h2 style={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>
              Counties Containing Our Approved ZIP Codes
            </h2>
            <p style={{ textAlign: 'center', color: '#a7f3d0', maxWidth: '700px', margin: '0 auto' }}>
              Our approved service area spans {approvedCounties.length} Illinois counties. Coverage within
              each county is limited to specific approved ZIP codes — check yours above.
            </p>
            <div className="counties-grid">
              {approvedCounties.map((county) => (
                <div className="county-pill" key={county}>{county} County</div>
              ))}
            </div>
          </div>

          <div className="featured-areas-section">
            <h2 style={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' }}>
              Featured Service Areas
            </h2>
            <p style={{ textAlign: 'center', color: '#a7f3d0', maxWidth: '700px', margin: '0 auto' }}>
              Dedicated coverage details, approved ZIP codes, and available services for a few of our
              most-requested cities.
            </p>
            <div className="featured-areas-grid">
              {publishedLocationSlugs.map((slug) => {
                const location = locationsData[slug];
                return (
                  <Link key={slug} to={routePath(`/service-areas/${slug}`)} className="featured-area-card">
                    <h3>{location.city}, IL</h3>
                    <p>{featuredAreaBlurbs[slug] || location.metaDescription}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="sa-final-cta">
            <p style={{ color: '#a7f3d0', marginBottom: '1.5rem' }}>
              Not sure if we cover your address, or have a question before booking?
            </p>
            <Link to={routePath('/contact')} className="cta-button">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceAreasPage;
