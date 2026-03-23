import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Wrench,
    ClipboardCheck,
    ChevronRight,
    AlertCircle
} from 'lucide-react';
import { servicesData, brands as defaultBrands } from '../data/servicesData';

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const service = servicesData[id];

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
                    <link rel="canonical" href="https://www.aerotechservice.com/services" />
                </Helmet>
                <div style={{ textAlign: 'center', padding: '150px 20px', minHeight: '80vh', fontFamily: "'Inter', sans-serif" }}>
                    <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#991b1b', padding: '24px', borderRadius: '16px', maxWidth: '500px', margin: '0 auto' }}>
                        <AlertCircle size={48} style={{ marginBottom: '16px' }} />
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px' }}>Service Not Found</h2>
                        <p style={{ marginBottom: '24px' }}>We couldn't find the details for service: <strong>{id}</strong></p>
                        <button
                            onClick={() => navigate('/')}
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
        color: '#7f1d1d',
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

    return (
        <>
            <Helmet>
                <title>{service.title} Repair | Aerotech Solution - Professional Service</title>
                <meta name="description" content={`${service.title} repair services by Aerotech Solution. Expert diagnostics, OEM parts, 90-day warranty. Same-day service available nationwide USA.`} />
                <meta name="keywords" content={`${service.title.toLowerCase()} repair, ${id.replace('-repair', '')} service, appliance repair ${service.title}`} />
                <link rel="canonical" href={`https://www.aerotechservice.com/services/${id}`} />
                <meta property="og:title" content={`${service.title} Repair | Aerotech Solution`} />
                <meta property="og:description" content={service.description && service.description.substring(0, 160)} />
                <meta property="og:url" content={`https://www.aerotechservice.com/services/${id}`} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://www.aerotechservice.com${service.image || '/banner-image.jpg'}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${service.title} Repair Services`} />
                <meta name="twitter:description" content={service.description && service.description.substring(0, 160)} />
                <meta name="twitter:image" content={`https://www.aerotechservice.com${service.image || '/banner-image.jpg'}`} />
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
                                {service.title}
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

                    {/* Pricing & CTA Section */}
                    <div style={{ padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <button
                            style={ctaButtonStyle}
                            onClick={() => {
                                navigate('/contact', { state: { applianceType: service.title } });
                                window.scrollTo(0, 0);
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                                e.currentTarget.style.background = '#2563eb';
                                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.background = '#3b82f6';
                                e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(59, 130, 246, 0.4)';
                            }}
                        >
                            Schedule This Service
                            <ChevronRight size={28} />
                        </button>

                        <p style={{ marginTop: '32px', color: '#94a3b8', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}>
                            <ClipboardCheck size={20} /> Professional Dispatch • Licensed Technicians • Certified Parts
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceDetail;
