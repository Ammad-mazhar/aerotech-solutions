import React from 'react';
import {
  ShieldCheck,
  Settings,
  Zap,
  Award,
  Clock,
  Wrench,
  UserCheck,
  Target,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const AboutPage = () => {
  // Design Tokens
  const colors = {
    navy: '#0f172a',
    blue: '#3b82f6',
    lightBlue: '#eff6ff',
    slate: '#475569',
    lightSlate: '#f8fafc',
    white: '#ffffff',
    border: 'rgba(15, 23, 42, 0.08)'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
  };

  // Section Styles
  const sectionSpacing = {
    padding: 'clamp(60px, 10vw, 120px) 0'
  };

  const headlineStyle = {
    fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
    fontWeight: '900',
    color: colors.navy,
    lineHeight: '1.1',
    letterSpacing: '-2px',
    marginBottom: '24px'
  };

  const sublineStyle = {
    fontSize: '1.25rem',
    color: colors.slate,
    lineHeight: '1.6',
    maxWidth: '800px',
    marginBottom: '40px'
  };

  const cardStyle = {
    background: colors.white,
    borderRadius: '24px',
    border: `1px solid ${colors.border}`,
    padding: '40px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 10px 20px -3px rgba(0, 0, 0, 0.03)',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  const iconCircleStyle = {
    width: '60px',
    height: '60px',
    backgroundColor: colors.lightBlue,
    color: colors.blue,
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px'
  };

  return (
    <div style={{ backgroundColor: colors.white, overflow: 'hidden' }}>
      {/* 1. HERO SECTION */}
      <section style={{ ...sectionSpacing, position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '40%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>

        <div style={containerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '80px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1.2', minWidth: '320px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: colors.lightBlue,
                color: colors.blue,
                padding: '8px 16px',
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: '700',
                marginBottom: '24px'
              }}>
                <Sparkles size={16} />
                SINCE 2008
              </div>
              <h1 style={headlineStyle}>
                The Gold Standard in <span style={{ color: colors.blue }}>Appliance Restoration.</span>
              </h1>
              <p style={sublineStyle}>
                Since 2008, Aerotech Service has set the benchmark for elite appliance care. We combine factory-certified technical expertise with white-glove service to restore not just your appliances, but the rhythm of your home. Trusted by over 50,000 homeowners, we are the region's premier choice for protecting your valuable home investments. We understand that a broken appliance disrupts your life, which is why we offer flexible scheduling and rapid response times to get you back on track. Our technicians are not only skilled in the latest technologies but are also trained to provide a courteous and clean service experience. From the initial diagnostic to the final quality check, we ensure every step of the process meets our rigorous standards of excellence.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '600', color: colors.navy }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#22c55e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={14} />
                  </div>
                  Licensed & Insured
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '600', color: colors.navy }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#22c55e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={14} />
                  </div>
                  Factory Certified
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR MISSION & VISION */}
      <section style={{ backgroundColor: colors.lightSlate, ...sectionSpacing }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: colors.navy, marginBottom: '20px' }}>Our Mission & DNA</h2>
            <p style={{ ...sublineStyle, margin: '0 auto' }}>
              We exist to provide peace of mind through technical mastery and uncompromising transparency.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div style={cardStyle}>
              <div style={iconCircleStyle}><Target size={32} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: colors.navy, marginBottom: '20px' }}>Our Mission</h3>
              <p style={{ color: colors.slate, lineHeight: '1.8', fontSize: '1.05rem' }}>
                To set the industry benchmark for appliance repair by combining white-glove service with factory-grade technical precision. We believe every customer deserves a home that functions flawlessly, and we treat every repair as a commitment to that promise.
              </p>
            </div>
            <div style={cardStyle}>
              <div style={iconCircleStyle}><Zap size={32} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: colors.navy, marginBottom: '20px' }}>Our Vision</h3>
              <p style={{ color: colors.slate, lineHeight: '1.8', fontSize: '1.05rem' }}>
                To become the premier concierge-level appliance service in the Midwest, known not just for "fixing things," but for providing a seamless, stress-free experience from the moment a problem arises until it is perfectly resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNICAL STANDARDS (TRUST SECTION) */}
      <section style={sectionSpacing}>
        <div style={containerStyle}>
          <div style={{ display: 'flex', gap: '80px', alignItems: 'center', flexWrap: 'wrap-reverse' }}>
            <div style={{ flex: '1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', minWidth: '320px' }}>
              <div style={{ ...cardStyle, padding: '30px', background: colors.lightSlate }}>
                <div style={{ ...iconCircleStyle, backgroundColor: colors.white }}><Settings size={26} /></div>
                <h4 style={{ fontWeight: '800', marginBottom: '12px' }}>OEM Parts Only</h4>
                <p style={{ fontSize: '14px', color: colors.slate }}>We never compromise. Every replacement uses original equipment manufacturer parts.</p>
              </div>
              <div style={{ ...cardStyle, padding: '30px', background: colors.lightSlate }}>
                <div style={{ ...iconCircleStyle, backgroundColor: colors.white }}><Wrench size={26} /></div>
                <h4 style={{ fontWeight: '800', marginBottom: '12px' }}>Precision Tools</h4>
                <p style={{ fontSize: '14px', color: colors.slate }}>Advanced digital diagnostic equipment for pinpoint accuracy.</p>
              </div>
              <div style={{ ...cardStyle, padding: '30px', background: colors.lightSlate }}>
                <div style={{ ...iconCircleStyle, backgroundColor: colors.white }}><UserCheck size={26} /></div>
                <h4 style={{ fontWeight: '800', marginBottom: '12px' }}>Expert Team</h4>
                <p style={{ fontSize: '14px', color: colors.slate }}>Technicians must pass rigorous background checks and certifications.</p>
              </div>
              <div style={{ ...cardStyle, padding: '30px', background: colors.lightSlate }}>
                <div style={{ ...iconCircleStyle, backgroundColor: colors.white }}><Clock size={26} /></div>
                <h4 style={{ fontWeight: '800', marginBottom: '12px' }}>24/7 Response</h4>
                <p style={{ fontSize: '14px', color: colors.slate }}>Emergency failures don't follow office hours—neither do we.</p>
              </div>
            </div>

            <div style={{ flex: '1', minWidth: '320px' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: colors.navy, marginBottom: '24px' }}>Uncompromising <span style={{ color: colors.blue }}>Technical Standards.</span></h2>
              <p style={{ ...pStyle, color: colors.slate, marginBottom: '32px' }}>
                At Aerotech Service, we believe that appliance repair is a science, not a guessing game. Our technicians arrive in fully-stocked "mobile workshops" equipped with over 200 of the most common high-failure components.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Real-time digital status tracking for every repair.',
                  'Comprehensive 21-point safety inspection with every visit.',
                  '90-Day Unconditional Warranty on labor and parts.',
                  'Environmentally conscious disposal of old components.'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', fontWeight: '600', color: colors.navy }}>
                    <ChevronRight size={18} color={colors.blue} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES CAROUSEL STYLE SECTION */}
      <section style={{ backgroundColor: colors.lightBlue, color: colors.navy, ...sectionSpacing }}>
        <div style={containerStyle}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '20px' }}>Our Core Pillars</h2>
            <p style={{ fontSize: '1.125rem', color: colors.slate, maxWidth: '600px', margin: '0 auto' }}>
              The values that guide every single interaction we have with our clients.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              {
                icon: <ShieldCheck size={32} />,
                title: 'Integrity First',
                desc: 'If a machine isn’t worth fixing, we tell you. We value long-term trust over short-term profit.'
              },
              {
                icon: <Award size={32} />,
                title: 'Quality Obsessed',
                desc: 'We don’t believe in "good enough." Every repair must return the appliance to factory specifications.'
              },
              {
                icon: <Zap size={32} />,
                title: 'Rapid Solution',
                desc: 'We understand the stress of broken appliances. Our workflow is optimized for speed and efficiency.'
              }
            ].map((value, idx) => (
              <div key={idx} style={{
                padding: '40px',
                borderRadius: '24px',
                backgroundColor: colors.white,
                border: `1px solid ${colors.border}`,
                transition: 'transform 0.3s'
              }}>
                <div style={{ color: colors.blue, marginBottom: '24px' }}>{value.icon}</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '16px' }}>{value.title}</h3>
                <p style={{ color: colors.slate, lineHeight: '1.6' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section style={{ ...sectionSpacing }}>
        <div style={containerStyle}>
          <div style={{
            background: `linear-gradient(135deg, ${colors.blue} 0%, #1d4ed8 100%)`,
            borderRadius: '40px',
            padding: '80px 40px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Abstract Background Shapes */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(50px)' }}></div>
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '300px', height: '300px', background: 'rgba(0,0,0,0.1)', borderRadius: '50%', filter: 'blur(50px)' }}></div>

            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '900', marginBottom: '24px', position: 'relative', color: 'white' }}>
              Experience the Aerotech Service Difference.
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto 40px', position: 'relative' }}>
              Join over 50,000 satisfied homeowners who trust us with their most valuable home investments.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <button style={{
                padding: '18px 40px',
                backgroundColor: colors.white,
                color: colors.blue,
                borderRadius: '16px',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.1rem',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                transition: 'all 0.3s'
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onClick={() => window.location.href = '/contact'}
              >
                Schedule Online
              </button>
              <button style={{
                padding: '18px 40px',
                backgroundColor: 'transparent',
                color: colors.white,
                borderRadius: '16px',
                fontWeight: '800',
                border: `2px solid ${colors.white}`,
                cursor: 'pointer',
                fontSize: '1.1rem',
                transition: 'all 0.3s'
              }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={() => window.location.href = 'tel:6309435120'}
              >
                Call (630) 943-5120
              </button>
            </div>
          </div >
        </div >
      </section >
    </div >
  );
};

const pStyle = {
  fontSize: '1.125rem',
  lineHeight: '1.8'
};

export default AboutPage;
