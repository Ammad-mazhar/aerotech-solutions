import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Wrench, HelpCircle, BookOpen, Navigation2, ChevronRight } from 'lucide-react';
import { getPublishedLocation, locationsData } from '../data/locationsData';
import { getApprovedZipsForCity, getApprovedCountiesForCity } from '../data/serviceAreaZipCodes';
import { servicesData } from '../data/servicesData';
import { blogsData } from '../data/blogsData';
import { canonicalUrl, routePath, breadcrumbSchema } from '../utils/seo';
import Breadcrumb from './Breadcrumb';
import NotFound from './NotFound';

// Not React.lazy()-wrapped, for the same reason as ServiceAreaZipChecker in
// ServiceAreasPage.jsx: LocationDetail is already its own lazy-loaded route
// (see App.jsx), so a plain import here still keeps locationsData.js and
// serviceAreaZipCodes.js out of the homepage/global bundle — they only load
// with this route's own chunk. Nesting a second React.lazy()+Suspense one
// level inside an already-lazy route risks the "Loading..." fallback
// leaking into the prerendered HTML (see src/entry-server.jsx's comments on
// why only the outermost Suspense of a render resolves cleanly).

const LocationDetail = () => {
  const { citySlug } = useParams();
  const location = getPublishedLocation(citySlug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [citySlug]);

  // Unknown or unpublished slugs get the same Not Found experience and
  // noindex metadata as any other 404 — no canonical is ever generated for
  // a slug that isn't a real, published location. Note: this component
  // itself never needs to render a "not found" state for a *prerendered*
  // route, since server/prerenderApp.mjs only prerenders published slugs to
  // begin with; this branch only matters for the live client-rendered app.
  if (!location) {
    return <NotFound />;
  }

  const zips = getApprovedZipsForCity(location.city);
  const counties = getApprovedCountiesForCity(location.city);

  const breadcrumbTrail = [
    { label: 'Home', path: '/' },
    { label: 'Service Areas', path: '/service-areas' },
    { label: `${location.city}, Illinois`, path: `/service-areas/${location.slug}` }
  ];

  const nearbyLocations = (location.nearbyCitySlugs || [])
    .map((slug) => getPublishedLocation(slug))
    .filter(Boolean);

  const relatedBlogPosts = (location.relatedBlogSlugs || [])
    .map((slug) => blogsData.find((p) => p.id === slug))
    .filter(Boolean);

  const businessNAP = {
    name: 'Aerotech Solution Inc',
    telephone: '+1-630-943-5120'
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbSchema(breadcrumbTrail),
      {
        "@type": "Service",
        "serviceType": `Appliance Repair in ${location.city}, IL`,
        "provider": {
          "@type": "LocalBusiness",
          "name": businessNAP.name,
          "telephone": businessNAP.telephone
        },
        "areaServed": {
          "@type": "City",
          "name": `${location.city}, IL`
        },
        "description": location.metaDescription
      },
      // FAQPage schema is safe to include here because every question below
      // is rendered as real, visible content in the FAQ section further
      // down this same page — never a headless/hidden duplicate of it.
      {
        "@type": "FAQPage",
        "mainEntity": location.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  const sectionStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '64px 20px 0'
  };

  const headingStyle = {
    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: '24px',
    letterSpacing: '-0.02em',
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  };

  const paraStyle = {
    color: '#d1d5db',
    fontSize: '1.1rem',
    lineHeight: '1.8',
    marginBottom: '20px'
  };

  const whiteCardStyle = {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '28px 32px',
    marginBottom: '20px',
    border: '1px solid rgba(15, 23, 42, 0.06)'
  };

  const cardTitleStyle = {
    fontSize: '1.15rem',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '8px'
  };

  const cardTextStyle = {
    fontSize: '1rem',
    color: '#475569',
    lineHeight: '1.7',
    margin: 0
  };

  const pillLinkStyle = {
    padding: '12px 24px',
    backgroundColor: '#064e3b',
    border: '1px solid rgba(34, 197, 94, 0.2)',
    borderRadius: '100px',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '1rem',
    textDecoration: 'none',
    transition: 'all 0.2s ease'
  };

  return (
    <>
      <Helmet>
        <title>{location.metaTitle}</title>
        <meta name="description" content={location.metaDescription} />
        <link rel="canonical" href={canonicalUrl(`/service-areas/${location.slug}`)} />
        <meta property="og:title" content={location.metaTitle} />
        <meta property="og:description" content={location.metaDescription} />
        <meta property="og:url" content={canonicalUrl(`/service-areas/${location.slug}`)} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aerotechsolutioninc.com/washer-repair.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={location.metaTitle} />
        <meta name="twitter:description" content={location.metaDescription} />
        <meta name="twitter:image" content="https://aerotechsolutioninc.com/washer-repair.webp" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div style={{ backgroundColor: '#052e16', paddingBottom: '100px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 20px 0' }}>
          <Breadcrumb items={breadcrumbTrail} />
        </div>

        {/* Header */}
        <div style={{ padding: '40px 20px 0', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.03em', margin: '0 0 24px 0', lineHeight: 1.1 }}>
            {location.h1}
          </h1>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {location.introduction.map((para, i) => (
              <p key={i} style={{ ...paraStyle, fontSize: '1.2rem', textAlign: 'left' }}>{para}</p>
            ))}
          </div>
          <Link
            to={routePath('/book-service')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '18px 36px',
              background: '#f97316',
              color: '#7f1d1d',
              fontSize: '1.1rem',
              fontWeight: '900',
              borderRadius: '100px',
              textDecoration: 'none',
              marginTop: '12px',
              boxShadow: '0 20px 40px -12px rgba(249, 115, 22, 0.4)'
            }}
          >
            Book a Service
            <ChevronRight size={20} />
          </Link>
        </div>

        {/* Approved ZIP-code coverage */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <MapPin color="#f97316" size={30} />
            Approved ZIP Codes in {location.city}
          </h2>
          <p style={paraStyle}>
            Service availability is limited to the approved ZIP codes listed below. We do not yet claim
            coverage across every ZIP code in {location.city} — if your address isn't listed, contact us to
            ask whether special availability is possible.
          </p>
          <div style={whiteCardStyle}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
              {zips.map((zip) => (
                <span key={zip} style={{ padding: '8px 18px', backgroundColor: '#052e16', color: '#a7f3d0', borderRadius: '100px', fontWeight: '700', fontSize: '0.95rem' }}>
                  {zip}
                </span>
              ))}
            </div>
            <p style={{ ...cardTextStyle, margin: 0 }}>
              Covering {counties.length === 1 ? 'a portion of' : 'portions of'} {counties.join(', ')} County{counties.length > 1 ? 'ies' : ''} within {location.city}.
            </p>
          </div>
        </div>

        {/* City-specific repair emphasis */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <Wrench color="#f97316" size={30} />
            {location.city} Repair Services
          </h2>
          {location.serviceHighlights.map((highlight) => {
            const service = servicesData[highlight.slug];
            if (!service) return null;
            return (
              <div key={highlight.slug} style={whiteCardStyle}>
                <h3 style={cardTitleStyle}>{service.title} Repair</h3>
                <p style={cardTextStyle}>{highlight.blurb}</p>
                <Link
                  to={routePath(`/services/${highlight.slug}`)}
                  style={{ display: 'inline-block', marginTop: '12px', color: '#ea580c', fontWeight: '700', textDecoration: 'underline' }}
                >
                  Visit our {service.title} Repair page
                </Link>
              </div>
            );
          })}
        </div>

        {/* Full appliance & HVAC service list */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <Wrench color="#f97316" size={30} />
            All Appliance &amp; HVAC Services in {location.city}
          </h2>
          <p style={paraStyle}>
            Every service below is available within our approved {location.city} ZIP codes.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {location.availableServiceSlugs.map((slug) => {
              const service = servicesData[slug];
              if (!service) return null;
              return (
                <Link key={slug} to={routePath(`/services/${slug}`)} style={pillLinkStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f97316'; e.currentTarget.style.color = '#7f1d1d'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#064e3b'; e.currentTarget.style.color = '#ffffff'; }}
                >
                  {service.title} Repair
                </Link>
              );
            })}
          </div>
        </div>

        {/* Related resources */}
        {relatedBlogPosts.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>
              <BookOpen color="#f97316" size={30} />
              Related Resources
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '20px' }}>
              {relatedBlogPosts.map((post) => (
                <Link key={post.id} to={routePath(`/blogs/${post.id}`)} style={{ ...whiteCardStyle, display: 'block', marginBottom: 0, textDecoration: 'none' }}>
                  <h3 style={cardTitleStyle}>{post.title}</h3>
                  <p style={cardTextStyle}>{post.paragraphs[0].slice(0, 140)}...</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Nearby approved locations */}
        {nearbyLocations.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>
              <Navigation2 color="#f97316" size={30} />
              Nearby Approved Service Areas
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {nearbyLocations.map((nearby) => (
                <Link key={nearby.slug} to={routePath(`/service-areas/${nearby.slug}`)} style={pillLinkStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f97316'; e.currentTarget.style.color = '#7f1d1d'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#064e3b'; e.currentTarget.style.color = '#ffffff'; }}
                >
                  Appliance Repair in {nearby.city}, IL
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        <div style={sectionStyle}>
          <h2 style={headingStyle}>
            <HelpCircle color="#f97316" size={30} />
            Frequently Asked Questions
          </h2>
          {location.faqs.map((faq, i) => (
            <div key={i} style={whiteCardStyle}>
              <h3 style={cardTitleStyle}>{faq.q}</h3>
              <p style={cardTextStyle}>{faq.a}</p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div style={{ ...sectionStyle, textAlign: 'center' }}>
          <div style={{ background: '#f97316', borderRadius: '32px', padding: '56px 40px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: '900', color: '#7f1d1d', marginBottom: '16px' }}>
              Ready to Book Service in {location.city}?
            </h2>
            <p style={{ color: '#7f1d1d', fontSize: '1.1rem', marginBottom: '28px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Book online, or contact us if you'd like to confirm ZIP code coverage first.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to={routePath('/book-service')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '18px 36px', background: '#ea580c', color: '#800000', fontSize: '1.1rem', fontWeight: '900', borderRadius: '100px', textDecoration: 'none' }}
              >
                Book Your Repair
                <ChevronRight size={22} />
              </Link>
              <Link
                to={routePath('/service-areas')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '18px 36px', background: 'transparent', border: '2px solid #7f1d1d', color: '#7f1d1d', fontSize: '1.1rem', fontWeight: '900', borderRadius: '100px', textDecoration: 'none' }}
              >
                View All Service Areas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationDetail;
