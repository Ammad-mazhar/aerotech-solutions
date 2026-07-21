import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Wrench,
    ClipboardCheck,
    ChevronRight,
    AlertCircle,
    ShieldCheck,
    HelpCircle,
    Repeat,
    Sparkles,
    MapPin,
    Flame,
    Layers,
    Building2,
    BookOpen
} from 'lucide-react';
import { servicesData, servicesList, brands as defaultBrands } from '../data/servicesData';
import { serviceSeoContent } from '../data/serviceSeoContent';
import { blogsData } from '../data/blogsData';
import { canonicalUrl, routePath } from '../utils/seo';

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const service = servicesData[id];
    const seo = serviceSeoContent[id];
    const relatedServices = servicesList.filter((s) => s.id !== id).slice(0, 6);
    const matchingBlogPost = blogsData.find((p) => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
            <>
                <Helmet>
                    <title>Service Not Found | Aerotech Solution</title>
                    <meta name="description" content="The requested service page could not be found. Return to our main services page for available appliance repair options." />
                    <meta name="keywords" content="service not found, appliance repair 404" />
                    <link rel="canonical" href={canonicalUrl('/')} />
                </Helmet>
                <div style={{ textAlign: 'center', padding: '150px 20px', minHeight: '80vh', fontFamily: "'Inter', sans-serif" }}>
                    <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#991b1b', padding: '24px', borderRadius: '16px', maxWidth: '500px', margin: '0 auto' }}>
                        <AlertCircle size={48} style={{ marginBottom: '16px' }} />
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px' }}>Service Not Found</h2>
                        <p style={{ marginBottom: '24px' }}>We couldn't find the details for service: <strong>{id}</strong></p>
                        <button
                            onClick={() => navigate(routePath('/'))}
                            style={{ padding: '12px 24px', background: '#3b82f6', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '700' }}
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const Icon = service.icon || AlertCircle;

    const waterHeaterBrands = [
        "A. O. Smith", "Bradford White", "Rheem", "Rinnai", "Bosch", "American Standard"
    ];

    const hvacFurnaceBrands = [
        "Carrier", "Trane", "Rheem", "Goodman", "Lennox", "York"
    ];

    const garbageDisposalBrands = [
        "Amana", "InSinkErator", "KitchenAid", "Moen", "Whirlpool", "Waste King", "GE", "Frigidaire", "Everbilt", "American Standard", "Waste Maid"
    ];

    const brands = id === 'water-heater-repair' ? waterHeaterBrands : (id === 'hvac-furnace-repair' || id === 'hvac-repair' ? hvacFurnaceBrands : (id === 'garbage-disposal' ? garbageDisposalBrands : defaultBrands));

    const sectionStyle = {
        padding: '80px 20px',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        backgroundColor: '#052e16'
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto'
    };

    // Use specific banner if available, otherwise default to home page banner
    const bannerImage = service.bannerImage || "/banner-image.jpg";

    // Always use banner layout styles
    const heroSectionStyle = {
        padding: 'clamp(80px, 12vw, 150px) 20px',
        minHeight: '100vh',
        background: `linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 100%), url('${bannerImage}') center/cover no-repeat`,
        borderRadius: '0',
        marginTop: '0',
        marginLeft: '-20px',
        marginRight: '-20px',
        width: 'calc(100% + 40px)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        border: 'none',
        boxShadow: 'none',
        position: 'relative',
        overflow: 'hidden'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '40px',
        marginTop: '60px'
    };

    const cardStyle = {
        background: '#f97316',
        padding: '40px',
        borderRadius: '32px',
        border: '1px solid rgba(127, 29, 29, 0.3)',
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.04)',
        transition: 'transform 0.3s ease'
    };

    const stepStyle = {
        display: 'flex',
        gap: '24px',
        marginBottom: '32px'
    };

    const stepNumberStyle = {
        width: '44px',
        height: '44px',
        background: '#f97316',
        color: '#7f1d1d',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '900',
        flexShrink: 0,
        boxShadow: '0 8px 16px -4px rgba(249, 115, 22, 0.3)'
    };

    const brandsSectionStyle = {
        marginTop: '80px',
        textAlign: 'center'
    };

    const brandsGridStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '12px',
        marginTop: '32px'
    };

    const brandChipStyle = {
        padding: '10px 24px',
        backgroundColor: '#064e3b',
        border: '1px solid rgba(34, 197, 94, 0.2)',
        borderRadius: '100px',
        color: '#a7f3d0',
        fontWeight: '600',
        fontSize: '0.95rem',
        transition: 'all 0.2s ease',
        cursor: 'default'
    };

    const ctaButtonStyle = {
        padding: '24px 48px',
        background: '#f97316',
        color: '#800000',
        fontSize: '1.25rem',
        fontWeight: '900',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        marginTop: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: '0 20px 40px -12px rgba(249, 115, 22, 0.4)'
    };

    // ─── New SEO section styles (additive only — no existing style objects above are modified) ───
    const seoSectionStyle = {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '80px 0 0'
    };

    const seoHeadingStyle = {
        fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
        fontWeight: '900',
        color: '#ffffff',
        marginBottom: '24px',
        letterSpacing: '-0.02em',
        display: 'flex',
        alignItems: 'center',
        gap: '14px'
    };

    const seoParaStyle = {
        color: '#d1d5db',
        fontSize: '1.1rem',
        lineHeight: '1.8',
        marginBottom: '20px'
    };

    const whiteInfoCardStyle = {
        background: '#ffffff',
        borderRadius: '20px',
        padding: '28px 32px',
        marginBottom: '20px',
        border: '1px solid rgba(15, 23, 42, 0.06)'
    };

    const infoCardTitleStyle = {
        fontSize: '1.15rem',
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: '8px'
    };

    const infoCardTextStyle = {
        fontSize: '1rem',
        color: '#475569',
        lineHeight: '1.7',
        margin: 0
    };

    // JSON-LD structured data: LocalBusiness + Service + FAQPage
    const businessNAP = {
        name: 'Aerotech Solution Inc',
        telephone: '+1-630-943-5120',
        email: 'aerotechsolutions@gmail.com',
        streetAddress: '206 Far Hills Dr',
        addressLocality: 'Bolingbrook',
        addressRegion: 'IL',
        postalCode: '60440',
        addressCountry: 'US'
    };

    const structuredData = seo ? {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "LocalBusiness",
                "name": businessNAP.name,
                "image": `https://aerotechsolutioninc.com${service.image || '/banner-image.jpg'}`,
                "telephone": businessNAP.telephone,
                "email": businessNAP.email,
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": businessNAP.streetAddress,
                    "addressLocality": businessNAP.addressLocality,
                    "addressRegion": businessNAP.addressRegion,
                    "postalCode": businessNAP.postalCode,
                    "addressCountry": businessNAP.addressCountry
                },
                "url": canonicalUrl(`/services/${id}`)
            },
            {
                "@type": "Service",
                "serviceType": `${service.title} Repair`,
                "provider": {
                    "@type": "LocalBusiness",
                    "name": businessNAP.name,
                    "telephone": businessNAP.telephone
                },
                "areaServed": {
                    "@type": "City",
                    "name": "Bolingbrook, IL"
                },
                "description": seo.metaDescription
            },
            {
                "@type": "FAQPage",
                "mainEntity": seo.faqs.map((f) => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.a
                    }
                }))
            }
        ]
    } : null;

    return (
        <>
            <Helmet>
                <title>{seo ? seo.metaTitle : `${service.title} Repair | Aerotech Solution - Professional Service`}</title>
                <meta name="description" content={seo ? seo.metaDescription : `${service.title} repair services by Aerotech Solution. Expert diagnostics, OEM parts, 90-day warranty. Same-day service available nationwide USA.`} />
                <meta name="keywords" content={seo && seo.metaKeywords ? seo.metaKeywords : `${service.title.toLowerCase()} repair, ${id.replace('-repair', '')} service, appliance repair ${service.title}`} />
                <link rel="canonical" href={canonicalUrl(`/services/${id}`)} />
                <meta property="og:title" content={seo ? seo.metaTitle : `${service.title} Repair | Aerotech Solution`} />
                <meta property="og:description" content={seo ? seo.metaDescription : (service.description && service.description.substring(0, 160))} />
                <meta property="og:url" content={canonicalUrl(`/services/${id}`)} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://aerotechsolutioninc.com${service.image || '/banner-image.jpg'}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seo ? seo.metaTitle : `${service.title} Repair Services`} />
                <meta name="twitter:description" content={seo ? seo.metaDescription : (service.description && service.description.substring(0, 160))} />
                <meta name="twitter:image" content={`https://aerotechsolutioninc.com${service.image || '/banner-image.jpg'}`} />
                {structuredData && (
                    <script type="application/ld+json">
                        {JSON.stringify(structuredData)}
                    </script>
                )}
            </Helmet>
            <div style={{ backgroundColor: '#052e16', paddingBottom: '100px' }}>
                {/* Hero Section */}
                <section style={{
                    ...heroSectionStyle,
                    // If strictly fully width like home page
                    width: '100%',
                    maxWidth: '100%',
                    margin: 0,
                    // Adjust for fixed navbar if sticking to top
                    paddingTop: '80px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    // Full viewport height for banner
                    minHeight: '100vh',
                    borderRadius: 0,
                }}>
                    <div style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '32px',
                        position: 'relative',
                        zIndex: 1
                    }}>

                        <div>
                            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.04em', margin: '0 0 16px 0', lineHeight: 1 }}>
                                {(seo && seo.h1Override) || service.title}
                            </h1>
                            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '800px', lineHeight: '1.6', margin: '0 auto 24px auto', fontWeight: '500' }}>
                                {service.description}
                            </p>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                <span style={{ padding: '6px 16px', background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', borderRadius: '100px', fontSize: '14px', fontWeight: '700', backdropFilter: 'blur(10px)' }}>Factory Certified</span>
                                <span style={{ padding: '6px 16px', background: 'rgba(255, 255, 255, 0.2)', color: '#ffffff', borderRadius: '100px', fontSize: '14px', fontWeight: '700', backdropFilter: 'blur(10px)' }}>90-Day Warranty</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Introduction (new SEO section — inserted, does not alter Brands section below) */}
                {seo && (
                    <div style={{ padding: '80px 20px 0' }}>
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <MapPin color="#f97316" size={30} />
                                {service.title} Repair in Bolingbrook &amp; the Chicago Suburbs
                            </h2>
                            {seo.introExpanded.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    </div>
                )}

                {/* Brands Section */}
                <div style={{ background: '#052e16', padding: '60px 20px', borderBottom: '1px solid rgba(34, 197, 94, 0.2)' }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '0.875rem', fontWeight: '800', color: '#a7f3d0', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '32px' }}>
                            Supported Brands
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px 40px' }}>
                            {brands.map((brand, i) => (
                                <span key={i} style={{ fontSize: '1.125rem', fontWeight: '600', color: '#ffffff' }}>
                                    {brand}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Signs You Need Professional Repair (new SEO section) */}
                {seo && (
                    <div style={{ padding: '80px 20px 0' }}>
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <AlertCircle color="#f97316" size={30} />
                                Signs You Need Professional {service.title} Repair
                            </h2>
                            <p style={seoParaStyle}>
                                Not every issue means your appliance is done for, but catching these warning signs early usually means a simpler, less expensive repair.
                            </p>
                            {seo.signsOfRepair.map((sign, i) => (
                                <div key={i} style={whiteInfoCardStyle}>
                                    <h3 style={infoCardTitleStyle}>{sign.title}</h3>
                                    <p style={infoCardTextStyle}>{sign.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div style={containerStyle}>
                    {/* Technical Details Grid */}
                    <div style={gridStyle}>
                        {/* Common Issues */}
                        <div style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#7f1d1d', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '14px' }}><AlertCircle color="#7f1d1d" size={24} /></div>
                                Common Issues
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {(service.problems || []).map((problem, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', color: '#7f1d1d', fontSize: '1.1rem', fontWeight: '500' }}>
                                        <div style={{ width: '8px', height: '8px', background: '#7f1d1d', borderRadius: '50%', flexShrink: 0 }}></div>
                                        {problem}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* How We Restore It */}
                        <div style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#7f1d1d', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '14px' }}><Wrench color="#7f1d1d" size={24} /></div>
                                Our Restoration Process
                            </h3>
                            <div style={stepStyle}>
                                <div style={stepNumberStyle}>01</div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px 0', fontWeight: '800', fontSize: '1.1rem', color: '#7f1d1d' }}>Multi-point Inspection</h4>
                                    <p style={{ margin: 0, color: '#7f1d1d', lineHeight: '1.5' }}>Our Factory-certified Technicians perform comprehensive Electrical Diagnostics to pinpoint secondary failures.</p>
                                </div>
                            </div>
                            <div style={stepStyle}>
                                <div style={stepNumberStyle}>02</div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px 0', fontWeight: '800', fontSize: '1.1rem', color: '#7f1d1d' }}>Fixed Quotation</h4>
                                    <p style={{ margin: 0, color: '#7f1d1d', lineHeight: '1.5' }}>Standardized blue-book rates. No hourly surprises. Ever.</p>
                                </div>
                            </div>
                            <div style={stepStyle}>
                                <div style={stepNumberStyle}>03</div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px 0', fontWeight: '800', fontSize: '1.1rem', color: '#7f1d1d' }}>Precision Repair</h4>
                                    <p style={{ margin: 0, color: '#7f1d1d', lineHeight: '1.5' }}>Using only OEM Parts (Original Equipment Manufacturer) to restore factory performance.</p>
                                </div>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#7f1d1d', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '14px' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M22 4L12 14.01L9 11.01" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                Why Choose Us
                            </h3>
                            <p style={{ color: '#7f1d1d', fontSize: '1.1rem', lineHeight: '1.7', fontWeight: '500' }}>
                                {service.whyChooseUs || "Experience the Aerotech difference with our factory-certified technicians and commitment to excellence."}
                            </p>
                        </div>
                    </div>

                    {/* Common Problems We Fix (new SEO section) */}
                    {seo && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Wrench color="#f97316" size={30} />
                                Common {service.title} Problems We Fix
                            </h2>
                            <p style={seoParaStyle}>
                                Here's a closer look at the specific issues our technicians diagnose and repair most often for this appliance.
                            </p>
                            {seo.commonProblems.map((problem, i) => (
                                <div key={i} style={whiteInfoCardStyle}>
                                    <h3 style={infoCardTitleStyle}>{problem.title}</h3>
                                    <p style={infoCardTextStyle}>{problem.text}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Air Conditioning (optional per-service section — currently only present for hvac-furnace-repair) */}
                    {seo && seo.acSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Sparkles color="#f97316" size={30} />
                                Air Conditioning &amp; AC Repair
                            </h2>
                            {seo.acSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Furnace & Heating (optional per-service section — currently only present for hvac-furnace-repair) */}
                    {seo && seo.furnaceHeatingSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Flame color="#f97316" size={30} />
                                Furnace &amp; Heating Repair
                            </h2>
                            {seo.furnaceHeatingSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Tune-Ups (optional per-service section — currently only present for hvac-furnace-repair) */}
                    {seo && seo.tuneUpSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <ShieldCheck color="#f97316" size={30} />
                                HVAC Tune-Ups &amp; Maintenance
                            </h2>
                            {seo.tuneUpSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Ductwork (optional per-service section — currently only present for hvac-furnace-repair) */}
                    {seo && seo.ductSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Layers color="#f97316" size={30} />
                                HVAC Duct Repair
                            </h2>
                            {seo.ductSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
                                <Link to={routePath('/services/water-heater-repair')} style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Visit our Water Heater Repair page
                                </Link>
                                <a href="/#services" style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Browse all appliance repair services
                                </a>
                                <Link to={routePath(`/blogs/${id}`)} style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Read our HVAC repair guide
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Cooling System (optional per-service section — currently only present for refrigerator-repair) */}
                    {seo && seo.coolingSystemSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Sparkles color="#f97316" size={30} />
                                Refrigerator Cooling-System Repair
                            </h2>
                            {seo.coolingSystemSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Freezer & Frost (optional per-service section — currently only present for refrigerator-repair) */}
                    {seo && seo.freezerFrostSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <AlertCircle color="#f97316" size={30} />
                                Freezer &amp; Frost Problems
                            </h2>
                            {seo.freezerFrostSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Ice Maker & Water Dispenser (optional per-service section — currently only present for refrigerator-repair) */}
                    {seo && seo.iceMakerSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Layers color="#f97316" size={30} />
                                Ice Maker &amp; Water Dispenser Repair
                            </h2>
                            {seo.iceMakerSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Built-In & Premium (optional per-service section — currently only present for refrigerator-repair) */}
                    {seo && seo.builtInPremiumSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <ShieldCheck color="#f97316" size={30} />
                                Built-In &amp; Premium Refrigerator Repair
                            </h2>
                            {seo.builtInPremiumSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
                                <a href="/#services" style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Browse all appliance repair services
                                </a>
                                <Link to={routePath(`/blogs/${id}`)} style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Read our refrigerator repair guide
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Residential (optional per-service section — currently only present for dishwasher-repair) */}
                    {seo && seo.residentialSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <ShieldCheck color="#f97316" size={30} />
                                Residential {service.title} Repair
                            </h2>
                            {seo.residentialSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
                                <Link to={routePath('/services/garbage-disposal')} style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Visit our Garbage Disposal Repair page
                                </Link>
                                <a href="/#services" style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Browse all appliance repair services
                                </a>
                                <Link to={routePath(`/blogs/${id}`)} style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Read our dishwasher repair guide
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Gas Oven (optional per-service section — currently only present for oven-stove-cooktop-repair) */}
                    {seo && seo.gasOvenSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Flame color="#f97316" size={30} />
                                Gas Oven Repair
                            </h2>
                            {seo.gasOvenSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Electric Oven (optional per-service section — currently only present for oven-stove-cooktop-repair) */}
                    {seo && seo.electricOvenSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Sparkles color="#f97316" size={30} />
                                Electric Oven Repair
                            </h2>
                            {seo.electricOvenSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Wall, Double & Convection Oven (optional per-service section — currently only present for oven-stove-cooktop-repair) */}
                    {seo && seo.wallDoubleConvectionSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Layers color="#f97316" size={30} />
                                Wall, Double &amp; Convection Oven Repair
                            </h2>
                            {seo.wallDoubleConvectionSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
                                <Link to={routePath('/services/microwave-repair')} style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Visit our Microwave Repair page
                                </Link>
                                <a href="/#services" style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Browse all appliance repair services
                                </a>
                                <Link to={routePath(`/blogs/${id}`)} style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Read our oven repair guide
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Control Board, Panel, Door & Glass (optional per-service section — currently only present for oven-stove-cooktop-repair) */}
                    {seo && seo.controlPanelSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <HelpCircle color="#f97316" size={30} />
                                Control Board, Panel, Door &amp; Glass Problems
                            </h2>
                            {seo.controlPanelSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Gas & Electric (optional per-service section — currently present for dryer-repair and water-heater-repair) */}
                    {seo && seo.gasElectricSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Flame color="#f97316" size={30} />
                                Gas and Electric {service.title} Repair
                            </h2>
                            {seo.gasElectricSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Tankless (optional per-service section — currently only present for water-heater-repair) */}
                    {seo && seo.tanklessSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Sparkles color="#f97316" size={30} />
                                Tankless {service.title} Repair &amp; Service
                            </h2>
                            {seo.tanklessSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Emergency (optional per-service section — currently only present for water-heater-repair) */}
                    {seo && seo.emergencySection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <AlertCircle color="#f97316" size={30} />
                                Emergency {service.title} Repair
                            </h2>
                            {seo.emergencySection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Maintenance (optional per-service section — currently only present for water-heater-repair) */}
                    {seo && seo.maintenanceSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Wrench color="#f97316" size={30} />
                                {service.title} Maintenance Services
                            </h2>
                            {seo.maintenanceSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Stackable & Washer-Dryer Combo (optional per-service section — currently only present for dryer-repair) */}
                    {seo && seo.stackableComboSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Layers color="#f97316" size={30} />
                                Stackable &amp; Washer-Dryer Combo Unit Repair
                            </h2>
                            {seo.stackableComboSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
                                <Link to={routePath('/services/washer-repair')} style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Visit our Washer Repair page
                                </Link>
                                <a href="/#services" style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Browse all appliance repair services
                                </a>
                                <Link to={routePath(`/blogs/${id}`)} style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Read our dryer repair guide
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Commercial (optional per-service section — currently only present for dryer-repair) */}
                    {seo && seo.commercialSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Building2 color="#f97316" size={30} />
                                Commercial {service.title} Repair
                            </h2>
                            {seo.commercialSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Brands We Repair (new SEO section — spotlights brands already listed in Supported Brands above; adds no new brand names) */}
                    {seo && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <ShieldCheck color="#f97316" size={30} />
                                Brands We Repair
                            </h2>
                            <p style={seoParaStyle}>
                                Our technicians work across every brand listed in Supported Brands above. Here's our experience with a few of the ones we service most often.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                                {seo.brandSpotlight.map((b, i) => (
                                    <div key={i} style={{ ...whiteInfoCardStyle, marginBottom: 0 }}>
                                        <h3 style={infoCardTitleStyle}>{b.brand}</h3>
                                        <p style={infoCardTextStyle}>{b.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Diagnosis & Repair Process (optional per-service section — currently only present for dishwasher-repair) */}
                    {seo && seo.diagnosisProcessSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Wrench color="#f97316" size={30} />
                                Our {service.title} Diagnosis &amp; Repair Process
                            </h2>
                            {seo.diagnosisProcessSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Installation (optional per-service section — currently present for microwave-repair and garbage-disposal) */}
                    {seo && seo.installationSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Layers color="#f97316" size={30} />
                                {service.title} Installation Services
                            </h2>
                            {seo.installationSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                        </div>
                    )}

                    {/* Technician vs. Plumber (optional per-service section — currently present for garbage-disposal and water-heater-repair) */}
                    {seo && seo.technicianVsPlumberSection && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <HelpCircle color="#f97316" size={30} />
                                When an Appliance Technician or Plumber May Be Needed
                            </h2>
                            {seo.technicianVsPlumberSection.map((para, i) => (
                                <p key={i} style={seoParaStyle}>{para}</p>
                            ))}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
                                {seo.relatedServiceLink && (
                                    <Link to={seo.relatedServiceLink.to} style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                        {seo.relatedServiceLink.label}
                                    </Link>
                                )}
                                <a href="/#services" style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    Browse all appliance repair services
                                </a>
                                <Link to={routePath(`/blogs/${id}`)} style={{ color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}>
                                    {seo.blogGuideLabel || `Read our ${service.title.toLowerCase()} repair guide`}
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Repair vs Replacement (new SEO section) */}
                    {seo && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Repeat color="#f97316" size={30} />
                                Repair vs. Replacement: Which Makes Sense?
                            </h2>
                            <p style={seoParaStyle}>{seo.repairVsReplacement.intro}</p>
                            <div style={whiteInfoCardStyle}>
                                <h3 style={infoCardTitleStyle}>What to consider</h3>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                    {seo.repairVsReplacement.bullets.map((bullet, i) => (
                                        <li key={i} style={{ ...infoCardTextStyle, marginBottom: '10px' }}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Preventive Maintenance Tips (new SEO section) */}
                    {seo && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <Sparkles color="#f97316" size={30} />
                                Preventive Maintenance Tips
                            </h2>
                            <div style={whiteInfoCardStyle}>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                    {seo.maintenanceTips.map((tip, i) => (
                                        <li key={i} style={{ ...infoCardTextStyle, marginBottom: '14px' }}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Why Choose Our Company, expanded (new SEO section — does not alter the existing "Why Choose Us" card above) */}
                    {seo && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <ShieldCheck color="#f97316" size={30} />
                                Why Homeowners Choose Aerotech Solution
                            </h2>
                            <p style={seoParaStyle}>{seo.whyChooseUsExpanded}</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
                                {["Factory-Certified Technicians", "OEM Parts", "Workmanship Warranty", "Transparent Pricing", "Experienced Technicians"].map((trust, i) => (
                                    <span key={i} style={{ padding: '10px 20px', backgroundColor: '#064e3b', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '100px', color: '#a7f3d0', fontWeight: '600', fontSize: '0.9rem' }}>
                                        {trust}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Frequently Asked Questions (new SEO section) */}
                    {seo && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <HelpCircle color="#f97316" size={30} />
                                Frequently Asked Questions
                            </h2>
                            {seo.faqs.map((faq, i) => (
                                <div key={i} style={whiteInfoCardStyle}>
                                    <h3 style={infoCardTitleStyle}>{faq.q}</h3>
                                    <p style={infoCardTextStyle}>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Related Services (new internal linking section) */}
                    {seo && relatedServices.length > 0 && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <ClipboardCheck color="#f97316" size={30} />
                                Related Appliance Repair Services
                            </h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                {relatedServices.map((related) => (
                                    <Link
                                        key={related.id}
                                        to={routePath(`/services/${related.id}`)}
                                        style={{
                                            padding: '12px 24px',
                                            backgroundColor: '#064e3b',
                                            border: '1px solid rgba(34, 197, 94, 0.2)',
                                            borderRadius: '100px',
                                            color: '#ffffff',
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            textDecoration: 'none',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f97316'; e.currentTarget.style.color = '#7f1d1d'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#064e3b'; e.currentTarget.style.color = '#ffffff'; }}
                                    >
                                        {related.title} Repair
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Helpful Resources (new — links to the matching blog guide for this service) */}
                    {matchingBlogPost && (
                        <div style={seoSectionStyle}>
                            <h2 style={seoHeadingStyle}>
                                <BookOpen color="#f97316" size={30} />
                                Helpful {service.title} Resources
                            </h2>
                            <div style={whiteInfoCardStyle}>
                                <h3 style={infoCardTitleStyle}>{matchingBlogPost.title}</h3>
                                <p style={infoCardTextStyle}>
                                    {matchingBlogPost.paragraphs[0].slice(0, 180)}...
                                </p>
                                <Link
                                    to={routePath(`/blogs/${id}`)}
                                    style={{ display: 'inline-block', marginTop: '14px', color: '#f97316', fontWeight: '700', textDecoration: 'underline' }}
                                >
                                    Read our full {service.title.toLowerCase()} repair guide
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Secondary CTA banner (new — supports, does not replace, the existing CTA section below) */}
                    {seo && (
                        <div style={{ ...seoSectionStyle, textAlign: 'center' }}>
                            <div style={{ background: '#f97316', borderRadius: '32px', padding: '56px 40px' }}>
                                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: '900', color: '#7f1d1d', marginBottom: '16px' }}>
                                    Need {service.title} Repair Near Bolingbrook Today?
                                </h2>
                                <p style={{ color: '#7f1d1d', fontSize: '1.1rem', marginBottom: '28px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                                    Book online in minutes, or call our team directly for same-day availability.
                                </p>
                                <Link
                                    to={routePath('/book-service')}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '18px 36px',
                                        background: '#ea580c',
                                        color: '#800000',
                                        fontSize: '1.1rem',
                                        fontWeight: '900',
                                        borderRadius: '100px',
                                        textDecoration: 'none',
                                        transition: 'background-color 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c2410c'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
                                >
                                    Book Your Repair
                                    <ChevronRight size={22} />
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Pricing & CTA Section */}
                    <div style={{ padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <button
                            style={ctaButtonStyle}
                            onClick={() => {
                                navigate(routePath('/contact'), { state: { applianceType: service.title } });
                                window.scrollTo(0, 0);
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                e.currentTarget.style.background = '#ea580c';
                                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(249, 115, 22, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.background = '#f97316';
                                e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(249, 115, 22, 0.4)';
                            }}
                        >
                            Schedule This Service
                            <ChevronRight size={28} />
                        </button>

                        <p style={{ marginTop: '32px', color: 'f97316', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}>
                            <ClipboardCheck size={20} /> Professional Dispatch • Licensed Technicians • Certified Parts
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceDetail;
