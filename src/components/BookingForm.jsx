import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomSelect from './CustomSelect';
import { brands } from '../data/servicesData';

// Input sanitization helper to prevent XSS
const sanitizeInput = (value) => (value ? value.replace(/<[^>]*>?/gm, '') : '');

const schema = yup.object({
  applianceType: yup.string().required('Please select an appliance type'),
  customApplianceType: yup.string().when('applianceType', {
    is: 'Other',
    then: (schema) => schema.transform(sanitizeInput).required('Please specify the appliance type'),
    otherwise: (schema) => schema.notRequired(),
  }),
  brand: yup.string().required('Please select a brand'),
  customBrand: yup.string().when('brand', {
    is: 'Other',
    then: (schema) => schema.transform(sanitizeInput).required('Please specify the brand'),
    otherwise: (schema) => schema.notRequired(),
  }),
  problemDescription: yup.string()
    .transform(sanitizeInput)
    .required('Please describe the problem')
    .min(10, 'Description must be at least 10 characters'),
  urgency: yup.string().required('Please select urgency level'),
  name: yup.string().transform(sanitizeInput).required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  phone: yup.string().required('Phone number is required').matches(/^\d{10}$/, 'Phone number must be 10 digits'),
  address: yup.string().transform(sanitizeInput).required('Address is required'),
  zipCode: yup.string().required('ZIP code is required').matches(/^\d{5}$/, 'ZIP code must be 5 digits'),
  preferredDate: yup.date()
    .required('Please select a preferred date')
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Date cannot be in the past'),
  honeypot: yup.string().max(0, 'Spam detected')
});

const applianceOptions = [
  { value: 'Refrigerator', label: 'Refrigerator' },
  { value: 'Oven, Stove & Cooktop', label: 'Oven, Stove & Cooktop' },
  { value: 'Dryer', label: 'Dryer' },
  { value: 'Washer', label: 'Washer' },
  { value: 'Microwave', label: 'Microwave' },
  { value: 'Dishwasher', label: 'Dishwasher' },
  { value: 'HVAC & Furnace', label: 'HVAC & Furnace' },
  { value: 'Garbage Disposal', label: 'Garbage Disposal' },
  { value: 'Water Heater', label: 'Water Heater' },
  { value: 'Other', label: 'Other' }
];

const brandOptions = brands.map(brand => ({ value: brand, label: brand }));
brandOptions.push({ value: 'Other', label: 'Other' });

export default function BookingForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [submitError, setSubmitError] = useState('');

  const { register, handleSubmit, formState: { errors, isValid }, setValue, watch, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      urgency: 'standard'
    }
  });

  // Register the date picker field to ensure validation works
  useEffect(() => {
    register('preferredDate');
  }, [register]);

  const preferredDate = watch('preferredDate');
  const applianceType = watch('applianceType');
  const brand = watch('brand');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5002';
      const response = await fetch(`${apiUrl}/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setBookingReference(result.reference);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setBookingReference('');
        }, 5000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubmitError(errorData.message || 'Failed to submit booking. Please try again.');
      }
    } catch (error) {
      setSubmitError('Unable to connect to server. Please ensure the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors) => {
    setSubmitError('Please fix the errors in the form before submitting.');
  };

  return (
    <section className="booking-form-wrapper">
      <style>{`
        .booking-form-wrapper {
          padding: 4rem 1.5rem;
          background-color: #052e16;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        .booking-form-container {
          max-width: 800px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .booking-header {
          background-color: #f8fafc;
          padding: 2.5rem;
          text-align: center;
          color: white;
        }
        .booking-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        .booking-header p {
          color: #64748b;
        }
        .booking-form {
          padding: 2.5rem;
        }
        .form-section {
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e2e8f0;
        }
        .form-section:last-child {
          border-bottom: none;
        }
        .form-section h3 {
          font-size: 1.25rem;
          color: #0f172a;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        .form-group input, .form-group select, .form-group textarea, .date-picker {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #cbd5e1;
          border-radius: 0.375rem;
          font-size: 1rem;
          transition: all 0.2s;
          color: #0f172a;
          background-color: #ffffff;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
        }
        .error {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.375rem;
          display: block;
        }
        .urgency-toggle {
          display: flex;
          gap: 1rem;
        }
        .toggle-option {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }
        .submit-btn {
          width: 100%;
          padding: 1rem;
          background-color: #f97316;
          color: white;
          border: none;
          border-radius: 0.375rem;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .submit-btn:hover:not(:disabled) {
          background-color: #ea580c;
        }
        .submit-btn:disabled {
          background-color: #fdba74;
          cursor: not-allowed;
        }
        .spinner {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
          margin-right: 0.5rem;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .success-state {
          padding: 4rem 2rem;
          text-align: center;
        }
        .success-icon {
          font-size: 4rem;
          color: #10b981;
          margin-bottom: 1rem;
        }
        .security-badge {
          text-align: center;
          margin-top: 1.5rem;
          color: #64748b;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .submit-error {
          background-color: #fee2e2;
          border: 1px solid #ef4444;
          color: #b91c1c;
          padding: 0.75rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 0.875rem;
        }
        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <div className="booking-form-container">
        <div className="booking-header">
          <h1>Book Your Service</h1>
          <p>Schedule professional appliance repair service</p>
        </div>

        {showSuccess ? (
          <div className="success-state">
            <div className="success-icon">✓</div>
            <h2>Booking Confirmed!</h2>
            <p>Thank you for choosing Aerotech Solution. Your service has been scheduled.</p>
            <div className="booking-reference">
              <strong>Booking Reference:</strong> {bookingReference}
            </div>
            <p>You will receive a confirmation email shortly with all the details.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit, onError)} className="booking-form" noValidate>
            {/* Appliance Info Section */}
            <div className="form-section">
              <h3>Appliance Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="applianceType">Appliance Type *</label>
                  <Controller
                    name="applianceType"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        options={applianceOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select appliance type"
                        error={errors.applianceType}
                      />
                    )}
                  />
                  {applianceType === 'Other' && (
                    <input
                      type="text"
                      placeholder="Please specify appliance type"
                      {...register('customApplianceType')}
                      style={{ marginTop: '0.5rem' }}
                    />
                  )}
                  {errors.applianceType && <span id="applianceType-error" className="error">{errors.applianceType.message}</span>}
                  {errors.customApplianceType && <span className="error" role="alert">{errors.customApplianceType.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="brand">Brand *</label>
                  <Controller
                    name="brand"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        options={brandOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select brand"
                        error={errors.brand}
                      />
                    )}
                  />
                  {brand === 'Other' && (
                    <input
                      type="text"
                      placeholder="Please specify brand"
                      {...register('customBrand')}
                      style={{ marginTop: '0.5rem' }}
                    />
                  )}
                  {errors.brand && <span className="error" role="alert">{errors.brand.message}</span>}
                  {errors.customBrand && <span className="error" role="alert">{errors.customBrand.message}</span>}
                </div>
              </div>
            </div>

            {/* Issue Details Section */}
            <div className="form-section">
              <h3>Issue Details</h3>
              <div className="form-group">
                <label htmlFor="problemDescription">Describe the Problem *</label>
                <textarea
                  id="problemDescription"
                  {...register('problemDescription')}
                  placeholder="Please provide details about the issue you're experiencing..."
                  rows="4"
                  aria-invalid={errors.problemDescription ? "true" : "false"}
                />
                {errors.problemDescription && <span className="error" role="alert">{errors.problemDescription.message}</span>}
              </div>

              <div className="form-group">
                <label>Urgency Level *</label>
                <div className="urgency-toggle">
                  <label className="toggle-option">
                    <input
                      type="radio"
                      value="standard"
                      {...register('urgency')}
                    />
                    <span className="toggle-label">Standard Service</span>
                  </label>
                  <label className="toggle-option">
                    <input
                      type="radio"
                      value="emergency"
                      {...register('urgency')}
                    />
                    <span className="toggle-label">Emergency Service</span>
                  </label>
                </div>
                {errors.urgency && <span className="error" role="alert">{errors.urgency.message}</span>}
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    placeholder="Enter your full name"
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && <span className="error" role="alert">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    placeholder="your@email.com"
                    inputMode="email"
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <span className="error" role="alert">{errors.email.message}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  {...register('address')}
                  placeholder="123 Main St, Anytown"
                  aria-invalid={errors.address ? "true" : "false"}
                />
                {errors.address && <span className="error" role="alert">{errors.address.message}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    placeholder="1234567890"
                    inputMode="tel"
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && <span className="error" role="alert">{errors.phone.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    {...register('zipCode')}
                    placeholder="12345"
                    inputMode="numeric"
                    aria-invalid={errors.zipCode ? "true" : "false"}
                  />
                  {errors.zipCode && <span className="error" role="alert">{errors.zipCode.message}</span>}
                </div>
              </div>
            </div>

            {/* Scheduling Section */}
            <div className="form-section">
              <h3>Preferred Service Date</h3>
              <div className="form-group">
                <label htmlFor="preferredDate">Select Date *</label>
                <DatePicker
                  selected={preferredDate}
                  onChange={(date) => setValue('preferredDate', date, { shouldValidate: true })}
                  minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Click to select a date"
                  className="date-picker"
                />
                {errors.preferredDate && <span className="error" role="alert">{errors.preferredDate.message}</span>}
              </div>
            </div>

            {/* Honeypot field */}
            <input
              type="text"
              {...register('honeypot')}
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />

            {submitError && (
              <div className="submit-error" style={{ color: '#b91c1c', backgroundColor: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', textAlign: 'center', border: '1px solid #ef4444' }}>
                {submitError}
              </div>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting || !isValid}
              style={{
                backgroundColor: isSubmitting || !isValid ? '#94a3b8' : '#f97316',
                cursor: isSubmitting || !isValid ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting && <span className="spinner"></span>}
              {isSubmitting ? 'Processing...' : 'Book Service'}
            </button>

            <div className="security-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
              Secure & Encrypted
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
