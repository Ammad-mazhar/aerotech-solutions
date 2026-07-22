import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronRight, ClipboardCheck, Wrench, ShieldCheck } from 'lucide-react';
import { servicesList } from '../data/servicesData';
import { canonicalUrl, routePath, breadcrumbSchema } from '../utils/seo';
import Breadcrumb from './Breadcrumb';

const breadcrumbTrail = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' }
];

// Short, unique one-line description per service — deliberately distinct from
// each service page's own longer `description` field (not copied from it),
// grounded in the same `problems` each service page already lists.
const cardDescriptions = {
  'refrigerator-repair': "Fast, reliable repairs for refrigerators that won't cool, leak, or run constantly — including ice maker issues.",
  'oven-stove-cooktop-repair': "Repairs for ovens, stoves, and cooktops that won't heat evenly, ignite, or hold temperature.",
  'dryer-repair': "Get your dryer drying safely again — heating, drum, and vent issues fixed by trained technicians.",
  'washer-repair': "Solutions for washers that won't drain, spin, or stop leaking, restoring your laundry routine.",
  'microwave-repair': "Safe diagnosis and repair for microwaves that won't heat, spin, or respond to the touchpad.",
  'dishwasher-repair': "Repairs for dishwashers that won't drain, clean properly, or keep water where it belongs.",
  'hvac-furnace-repair': "Heating and cooling repairs for furnaces, air conditioners, and uneven home temperatures.",
  'garbage-disposal': "Jam removal, leak repair, and installation help for disposals that hum, leak, or won't turn on.",
  'water-heater-repair': "Restore hot water quickly with tank and tankless water heater diagnosis and repair."
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [breadcrumbSchema(breadcrumbTrail)]
};

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Appliance Repair &amp; HVAC Services | Aero Tech Solutions</title>
        <meta name="description" content="Browse all appliance, HVAC, and water heater repair services from Aero Tech Solutions — refrigerators, washers, dryers, ovens, and more, by factory-certified technicians." />
        <meta name="keywords" content="appliance repair services, HVAC repair, water heater repair, refrigerator repair, washer dryer repair, oven stove repair, Aerotech Solution" />
        <link rel="canonical" href={canonicalUrl('/services')} />
        <meta property="og:title" content="Appliance Repair & HVAC Services | Aero Tech Solutions" />
        <meta property="og:description" content="Browse all appliance, HVAC, and water heater repair services from Aero Tech Solutions, performed by factory-certified technicians." />
        <meta property="og:url" content={canonicalUrl('/services')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aerotechsolutioninc.com/banner-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Appliance Repair & HVAC Services | Aero Tech Solutions" />
        <meta name="twitter:description" content="Browse all appliance, HVAC, and water heater repair services from Aero Tech Solutions." />
        <meta name="twitter:image" content="https://aerotechsolutioninc.com/banner-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <section className="services-hub-page">
        <style>{`
          .services-hub-page {
            padding: 5rem 0;
            background-color: #052e16;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            min-height: 60vh;
          }
          .services-hub-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
          }
          .services-hub-header {
            text-align: center;
            margin-bottom: 3rem;
          }
          .services-hub-header h1 {
            font-size: clamp(2rem, 4.5vw, 3rem);
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 1.5rem;
            letter-spacing: -0.025em;
          }
          .services-hub-header p {
            font-size: 1.15rem;
            color: #a7f3d0;
            max-width: 760px;
            margin: 0 auto;
            line-height: 1.7;
          }
          .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
          }
          .service-hub-card {
            background-color: #ffffff;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }
          .service-hub-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.25);
          }
          .service-hub-card-image {
            position: relative;
          }
          .service-hub-card-image img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            display: block;
          }
          .service-hub-card-body {
            padding: 1.75rem;
            display: flex;
            flex-direction: column;
            flex: 1;
          }
          .service-hub-card-title {
            font-size: 1.3rem;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 0.75rem;
            letter-spacing: -0.02em;
            line-height: 1.35;
          }
          .service-hub-card-excerpt {
            font-size: 0.975rem;
            color: #475569;
            line-height: 1.65;
            margin-bottom: 1.25rem;
            flex: 1;
          }
          .service-hub-card-link {
            font-weight: 700;
            color: #f97316;
            font-size: 0.95rem;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
          }
          .services-hub-process {
            margin-bottom: 4rem;
          }
          .services-hub-process h2 {
            font-size: clamp(1.5rem, 3vw, 2rem);
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 2rem;
            text-align: center;
          }
          .services-hub-process-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1.5rem;
          }
          .services-hub-process-card {
            background-color: #ffffff;
            border-radius: 1rem;
            padding: 1.75rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
          }
          .services-hub-process-card svg {
            color: #f97316;
            margin-bottom: 0.85rem;
          }
          .services-hub-process-card h3 {
            font-size: 1.1rem;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 0.5rem;
          }
          .services-hub-process-card p {
            font-size: 0.95rem;
            color: #475569;
            line-height: 1.6;
            margin: 0;
          }
          .services-hub-cta {
            text-align: center;
          }
          .services-hub-cta-banner {
            background-color: #f97316;
            border-radius: 2rem;
            padding: 3.5rem 2.5rem;
          }
          .services-hub-cta-banner h2 {
            font-size: clamp(1.5rem, 3vw, 2.25rem);
            font-weight: 900;
            color: #7f1d1d;
            margin-bottom: 1rem;
          }
          .services-hub-cta-banner p {
            color: #7f1d1d;
            font-size: 1.1rem;
            margin: 0 auto 1.75rem;
            max-width: 600px;
          }
          .services-hub-cta-button {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1.1rem 2.25rem;
            background-color: #ea580c;
            color: #800000;
            font-size: 1.1rem;
            font-weight: 900;
            border-radius: 999px;
            text-decoration: none;
            transition: background-color 0.2s;
          }
          .services-hub-cta-button:hover {
            background-color: #c2410c;
          }
        `}</style>
        <div className="services-hub-container">
          <Breadcrumb items={breadcrumbTrail} />

          <div className="services-hub-header">
            <h1>Appliance Repair, HVAC &amp; Water Heater Services</h1>
            <p>
              Aero Tech Solutions repairs the major appliances and systems that keep a home running — kitchen and
              laundry appliances, heating and cooling, and water heaters. Every service below is handled by
              factory-certified technicians using OEM parts, with a fixed quote provided before any repair begins.
            </p>
          </div>

          <div className="services-grid">
            {servicesList.map((service) => (
              <Link
                className="service-hub-card"
                key={service.id}
                to={routePath(`/services/${service.id}`)}
              >
                {service.image && (
                  <div className="service-hub-card-image">
                    <img src={service.image} alt={service.alt || `${service.title} repair service`} loading="lazy" />
                  </div>
                )}
                <div className="service-hub-card-body">
                  <h2 className="service-hub-card-title">{service.title} Repair</h2>
                  <p className="service-hub-card-excerpt">
                    {cardDescriptions[service.id] || service.description}
                  </p>
                  <span className="service-hub-card-link">
                    Explore {service.title} Repair <ChevronRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="services-hub-process">
            <h2>How We Handle Every Repair</h2>
            <div className="services-hub-process-grid">
              <div className="services-hub-process-card">
                <ClipboardCheck size={28} />
                <h3>Multi-Point Inspection</h3>
                <p>Factory-certified technicians perform a full diagnostic to pinpoint the actual cause, not just the symptom.</p>
              </div>
              <div className="services-hub-process-card">
                <Wrench size={28} />
                <h3>Fixed Quotation</h3>
                <p>You get a clear, upfront price after diagnosis — no hourly surprises once the repair begins.</p>
              </div>
              <div className="services-hub-process-card">
                <ShieldCheck size={28} />
                <h3>Precision Repair</h3>
                <p>Repairs use OEM parts to restore factory performance, backed by a workmanship warranty.</p>
              </div>
            </div>
          </div>

          <div className="services-hub-cta">
            <div className="services-hub-cta-banner">
              <h2>Not Sure Which Service You Need?</h2>
              <p>Tell us what's going on and our team will point you to the right repair — or book directly online.</p>
              <Link to={routePath('/book-service')} className="services-hub-cta-button">
                Book Your Repair <ChevronRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
