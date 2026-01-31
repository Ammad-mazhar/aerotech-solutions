import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Wrench,
    ClipboardCheck,
    ChevronRight,
    AlertCircle
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Prioritize centralized data using the ID from params
    const service = servicesData[id];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return (
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
        );
    }

    const Icon = service.icon || AlertCircle;

    const brands = [
        "Whirlpool", "Maytag", "GE", "Samsung", "LG", "Kenmore",
        "Frigidaire", "Bosch", "KitchenAid", "JennAir", "Electrolux",
        "Amana", "Hotpoint", "Admiral", "Roper", "Viking",
        "Sub-Zero", "Wolf", "Thermador", "Miele"
    ];

    const sectionStyle = {
        padding: '80px 20px',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        backgroundColor: '#ffffff'
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto'
    };

    const heroSectionStyle = {
        padding: 'clamp(60px, 8vw, 100px) 20px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)',
        borderRadius: '48px',
        marginTop: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
        border: '1px solid rgba(15, 23, 42, 0.05)',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.05)',
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
        background: '#ffffff',
        padding: '40px',
        borderRadius: '32px',
        border: '1px solid #f1f5f9',
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
        background: '#3b82f6',
        color: 'white',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '900',
        flexShrink: 0,
        boxShadow: '0 8px 16px -4px rgba(59, 130, 246, 0.3)'
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
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '100px',
        color: '#475569',
        fontWeight: '600',
        fontSize: '0.95rem',
        transition: 'all 0.2s ease',
        cursor: 'default'
    };

    const ctaButtonStyle = {
        padding: '24px 48px',
        background: '#3b82f6',
        color: 'white',
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
        boxShadow: '0 20px 40px -12px rgba(59, 130, 246, 0.4)'
    };

    return (
        <div style={{ backgroundColor: '#ffffff', paddingBottom: '100px' }}>
            <div style={containerStyle}>
                {/* Hero Section */}
                <section style={heroSectionStyle}>
                    {/* Background Decorative Element */}
                    <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', border: '40px solid rgba(59, 130, 246, 0.03)' }}></div>

                    <div style={{
                        background: '#ffffff',
                        padding: '24px',
                        borderRadius: '24px',
                        color: '#3b82f6',
                        boxShadow: '0 12px 24px -6px rgba(15, 23, 42, 0.12)',
                        border: '1px solid rgba(15, 23, 42, 0.05)'
                    }}>
                        <Icon size={56} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.04em', margin: '0 0 16px 0', lineHeight: 1 }}>
                            {service.title}
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '800px', lineHeight: '1.6', margin: '0 0 24px 0', fontWeight: '500' }}>
                            {service.description}
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <span style={{ padding: '6px 16px', background: '#dcfce7', color: '#166534', borderRadius: '100px', fontSize: '14px', fontWeight: '700' }}>Factory Certified</span>
                            <span style={{ padding: '6px 16px', background: '#dcfce7', color: '#166534', borderRadius: '100px', fontSize: '14px', fontWeight: '700' }}>90-Day Warranty</span>
                        </div>
                    </div>
                </section>

                {/* Technical Details Grid */}
                <div style={gridStyle}>
                    {/* Common Issues */}
                    <div style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0f172a', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ background: '#fef2f2', padding: '12px', borderRadius: '14px' }}><AlertCircle color="#ef4444" size={24} /></div>
                            Common Issues
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {(service.problems || []).map((problem, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', color: '#475569', fontSize: '1.1rem', fontWeight: '500' }}>
                                    <div style={{ width: '8px', height: '8px', background: '#e2e8f0', borderRadius: '50%', flexShrink: 0 }}></div>
                                    {problem}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* How We Restore It */}
                    <div style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: '#0f172a', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '14px' }}><Wrench color="#3b82f6" size={24} /></div>
                            Our Restoration Process
                        </h3>
                        <div style={stepStyle}>
                            <div style={stepNumberStyle}>01</div>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontWeight: '800', fontSize: '1.1rem', color: '#0f172a' }}>Multi-Point Diagnostic</h4>
                                <p style={{ margin: 0, color: '#64748b', lineHeight: '1.5' }}>Pinpointing secondary failures before they cause future issues.</p>
                            </div>
                        </div>
                        <div style={stepStyle}>
                            <div style={stepNumberStyle}>02</div>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontWeight: '800', fontSize: '1.1rem', color: '#0f172a' }}>Fixed Quotation</h4>
                                <p style={{ margin: 0, color: '#64748b', lineHeight: '1.5' }}>Standardized blue-book rates. No hourly surprises. Ever.</p>
                            </div>
                        </div>
                        <div style={stepStyle}>
                            <div style={stepNumberStyle}>03</div>
                            <div>
                                <h4 style={{ margin: '0 0 4px 0', fontWeight: '800', fontSize: '1.1rem', color: '#0f172a' }}>Precision Repair</h4>
                                <p style={{ margin: 0, color: '#64748b', lineHeight: '1.5' }}>Using only OEM components to restore factory performance.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brands Section */}
                <section style={brandsSectionStyle}>
                    <h3 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a', marginBottom: '16px' }}>
                        We Service All Major Brands
                    </h3>
                    <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#475569', maxWidth: '800px', margin: '0 auto' }}>
                        Our certified technicians are experts in repairing every major manufacturer, ensuring your {service.title} is back to factory standards regardless of the brand. We stay updated with the latest manufacturer training and service bulletins to provide authorized-quality repairs for both legacy models and the newest smart appliances.
                    </p>
                    <div style={brandsGridStyle}>
                        {brands.map((brand, index) => (
                            <div
                                key={index}
                                style={brandChipStyle}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#eff6ff';
                                    e.currentTarget.style.borderColor = '#bfdbfe';
                                    e.currentTarget.style.color = '#3b82f6';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f8fafc';
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                    e.currentTarget.style.color = '#475569';
                                }}
                            >
                                {brand}
                            </div>
                        ))}
                    </div>
                </section>

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
    );
};

export default ServiceDetail;
