import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomSelect from './CustomSelect';

// Input sanitization helper
const sanitizeInput = (value) => (value ? value.replace(/<[^>]*>?/gm, '') : '');

const schema = yup.object({
  name: yup.string().transform(sanitizeInput).required('Full Name is required'),
  email: yup.string().required('Email Address is required').email('Please enter a valid email address'),
  phone: yup.string().matches(/^\d{10}$/, { message: 'Please enter a valid 10-digit phone number', excludeEmptyString: true }),
  subject: yup.string().required('Please select a subject'),
  message: yup.string().transform(sanitizeInput).required('Message is required').min(10, 'Message must be at least 10 characters long'),
  honeypot: yup.string().max(0, 'Spam detected')
});

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const location = useLocation();

  const { register, handleSubmit, formState: { errors, isValid }, reset, setValue, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      subject: ''
    }
  });

  const serviceOptions = [
    { value: 'refrigerator', label: 'Refrigerator' },
    { value: 'washer', label: 'Washer & Dryer' },
    { value: 'oven', label: 'Oven & Stove' },
    { value: 'microwave', label: 'Microwave' },
    { value: 'disposal', label: 'Garbage Disposal' },
    { value: 'hvac', label: 'HVAC' },
    { value: 'furnace', label: 'Furnace' },
    { value: 'water-heater', label: 'Water Heater' },
    { value: 'emergency', label: 'Emergency Request' },
    { value: 'other', label: 'Other Inquiry' }
  ];

  useEffect(() => {
    if (location.state?.applianceType) {
      const type = location.state.applianceType.toLowerCase();
      if (type.includes('refrigerator')) setValue('subject', 'refrigerator', { shouldValidate: true });
      else if (type.includes('washer') || type.includes('dryer')) setValue('subject', 'washer', { shouldValidate: true });
      else if (type.includes('oven') || type.includes('stove') || type.includes('cooktop')) setValue('subject', 'oven', { shouldValidate: true });
      else if (type.includes('furnace')) setValue('subject', 'furnace', { shouldValidate: true });
      else if (type.includes('water heater')) setValue('subject', 'water-heater', { shouldValidate: true });
    }
  }, [location.state, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5002';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowSuccess(true);
        reset();
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubmitError(errorData.message || 'Server Error: System currently unavailable. Please call us directly.');
      }
    } catch (error) {
      setSubmitError('Server Error: Please try again later or call (630) 943-5120.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionStyle = {
    padding: '100px 20px',
    backgroundColor: '#ffffff',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    minHeight: '100vh'
  };

  const wrapperStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '40px',
    background: '#ffffff',
    borderRadius: '30px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    maxWidth: '1200px',
    margin: '60px auto 0'
  };

  const infoSideStyle = {
    backgroundColor: '#f8fafc',
    padding: 'clamp(30px, 5vw, 60px)',
    display: 'flex',
    flexDirection: 'column'
  };

  const formSideStyle = {
    padding: 'clamp(30px, 5vw, 60px)',
    backgroundColor: '#ffffff'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '8px'
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '14px 18px',
    border: `1px solid ${hasError ? '#ef4444' : '#cbd5e1'}`,
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.2s',
    backgroundColor: hasError ? '#fef2f2' : '#ffffff',
    outline: 'none',
    fontFamily: 'inherit',
    color: '#000000'
  });

  const buttonStyle = {
    width: '100%',
    padding: '16px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '700',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  };

  const spinnerStyle = {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderRadius: '50%',
    borderTopColor: '#fff',
    animation: 'spin 1s ease-in-out infinite'
  };

  const mapContainerStyle = {
    maxWidth: '1200px',
    margin: '80px auto 0',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
    border: '1px solid rgba(15, 23, 42, 0.08)',
    height: '500px'
  };

  return (
    <section id="contact" style={sectionStyle}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#0f172a', marginBottom: '16px', letterSpacing: '-1px' }}>Get in Touch</h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
          Have a question or need an emergency repair? Our executive team is here to restore your comfort.
        </p>
      </div>

      <div style={wrapperStyle}>
        <div style={infoSideStyle}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '40px' }}>Office Information</h2>

          {[
            { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title: 'Email', detail: 'aerotechsolutions@gmail.com' },
            { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', title: 'Phone', detail: '630 943 5120' },
            { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', title: 'Address', detail: '206 Far Hills Dr, Bolingbrook, IL 60440' },
            { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Hours', detail: 'Mon - Fri: 9:00 AM - 6:00 PM' }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#ffffff', color: '#2563eb', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{item.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={formSideStyle}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '40px' }}>Send Us a Message</h2>

          {showSuccess && (
            <div style={{ padding: '16px', backgroundColor: '#ecfdf5', border: '1px solid #10b981', color: '#065f46', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span style={{ fontWeight: '600' }}>Message sent successfully. We will contact you soon.</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="name" style={labelStyle}>Full Name *</label>
              <input
                type="text"
                id="name"
                style={inputStyle(errors.name)}
                {...register('name')}
                placeholder="Enter your name"
              />
              {errors.name && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>{errors.name.message}</div>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div>
                <label htmlFor="email" style={labelStyle}>Email Address *</label>
                <input
                  type="email"
                  id="email"
                  style={inputStyle(errors.email)}
                  {...register('email')}
                  placeholder="name@email.com"
                />
                {errors.email && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>{errors.email.message}</div>}
              </div>
              <div>
                <label htmlFor="phone" style={labelStyle}>Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  style={inputStyle(errors.phone)}
                  {...register('phone')}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>{errors.phone.message}</div>}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="subject" style={labelStyle}>Service Type *</label>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    options={serviceOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select a service"
                    error={errors.subject}
                  />
                )}
              />
              {errors.subject && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>{errors.subject.message}</div>}
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label htmlFor="message" style={labelStyle}>Details *</label>
              <textarea
                id="message"
                style={{ ...inputStyle(errors.message), minHeight: '120px', resize: 'vertical' }}
                {...register('message')}
                placeholder="How can we help you today?"
              />
              {errors.message && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>{errors.message.message}</div>}
            </div>

            <input type="text" {...register('honeypot')} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

            {submitError && <div style={{ padding: '12px', backgroundColor: '#fef2f2', color: '#b91c1c', borderRadius: '10px', marginBottom: '20px', fontSize: '0.875rem', textAlign: 'center', border: '1px solid #fee2e2' }}>{submitError}</div>}

            <button
              type="submit"
              style={{
                ...buttonStyle,
                backgroundColor: isSubmitting || !isValid ? '#94a3b8' : '#2563eb',
                cursor: isSubmitting || !isValid ? 'not-allowed' : 'pointer',
                color: '#ffffff'
              }}
              disabled={isSubmitting || !isValid}
              onMouseEnter={(e) => !isSubmitting && isValid && (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              onMouseLeave={(e) => !isSubmitting && isValid && (e.currentTarget.style.backgroundColor = '#2563eb')}
            >
              {isSubmitting ? (
                <>
                  <div style={spinnerStyle}></div>
                  <span>Sending Request...</span>
                </>
              ) : 'Submit Service Request'}
            </button>
          </form>
        </div>
      </div>

      <div style={mapContainerStyle} className="map-container">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          className="map-frame"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=206%20Far%20Hills%20Dr%2C%20Bolingbrook%2C%20IL%2060440&t=&z=15&ie=UTF8&iwloc=&output=embed"
          title="Office Location"
        ></iframe>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=206+Far+Hills+Dr,+Bolingbrook,+IL+60440"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            borderRadius: '100px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1rem',
            boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1d4ed8';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 15px 25px -5px rgba(37, 99, 235, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#2563eb';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(37, 99, 235, 0.3)';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
          </svg>
          Get Directions
        </a>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        #name::placeholder,
        #email::placeholder,
        #phone::placeholder,
        #message::placeholder {
          color: #64748b;
          opacity: 1;
        }
        #name:focus,
        #email:focus,
        #phone:focus,
        #message:focus {
          border-color: #2563eb;
        }
        .map-frame {
          filter: grayscale(100%);
          transition: filter 0.5s ease;
        }
        .map-container:hover .map-frame {
          filter: grayscale(0%);
        }
      `}</style>
    </section>
  );
}
