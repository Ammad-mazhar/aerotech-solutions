import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { routePath } from '../utils/seo';
import { isApprovedServiceZip, getServiceAreaForZip } from '../data/serviceAreaZipCodes';

// Every entry in serviceAreaByZip currently stores the two-letter state
// abbreviation (all "IL" today). Spelled out here only for the sentence this
// component renders, so the dataset itself doesn't need a redundant field.
const STATE_NAMES = { IL: 'Illinois' };

// Lightweight, no-API ZIP-code availability checker. Renders entirely on the
// client (this is the one piece of /service-areas/ that legitimately needs
// JavaScript — everything else on that page is static, prerendered content),
// but the ~379-entry dataset it depends on only loads when this component is
// mounted, via the lazy import in ServiceAreasPage.jsx.
const ServiceAreaZipChecker = () => {
  const [zip, setZip] = useState('');
  const [result, setResult] = useState(null); // null | { covered: boolean, zip: string, area: {...} | null }

  const handleChange = (e) => {
    // Strip anything that isn't a digit, cap at 5 characters. This can only
    // ever narrow what the user typed, never reject/clear it outright, so
    // there's nothing to "silently block" before submit.
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZip(digitsOnly);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (zip.length !== 5) {
      setResult({ invalid: true });
      return;
    }
    const area = getServiceAreaForZip(zip);
    setResult({ invalid: false, covered: isApprovedServiceZip(zip), zip, area });
  };

  return (
    <div className="zip-checker">
      <style>{`
        .zip-checker {
          background-color: #064e3b;
          border-radius: 1rem;
          padding: 2.5rem 2rem;
          border: 1px solid rgba(34, 197, 94, 0.2);
          max-width: 560px;
          margin: 0 auto;
        }
        .zip-checker-form {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          align-items: flex-end;
          justify-content: center;
        }
        .zip-checker-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          text-align: left;
        }
        .zip-checker-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
        }
        .zip-checker-input {
          width: 160px;
          padding: 0.75rem 1rem;
          border: 1px solid #cbd5e1;
          border-radius: 0.375rem;
          font-size: 1.1rem;
          letter-spacing: 0.05em;
          color: #0f172a;
          background-color: #ffffff;
        }
        .zip-checker-input:focus {
          outline: none;
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.25);
        }
        .zip-checker-submit {
          padding: 0.75rem 1.75rem;
          background-color: #f97316;
          color: #7f1d1d;
          border: none;
          border-radius: 0.5rem;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .zip-checker-submit:hover {
          background-color: #ea580c;
        }
        .zip-checker-result {
          margin-top: 1.5rem;
          padding: 1.25rem 1.5rem;
          border-radius: 0.75rem;
          font-size: 1.05rem;
          line-height: 1.6;
        }
        .zip-checker-result.covered {
          background-color: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.35);
          color: #d1fae5;
        }
        .zip-checker-result.not-covered {
          background-color: rgba(148, 163, 184, 0.12);
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: #e2e8f0;
        }
        .zip-checker-result.invalid {
          background-color: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fecaca;
        }
        .zip-checker-cta {
          display: inline-block;
          margin-top: 1rem;
          background-color: #f97316;
          color: #7f1d1d;
          padding: 0.625rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 700;
          text-decoration: none;
          transition: background-color 0.2s;
        }
        .zip-checker-cta:hover {
          background-color: #ea580c;
        }
        .zip-checker-link {
          color: #f97316;
          font-weight: 600;
          text-decoration: underline;
        }
        @media (max-width: 480px) {
          .zip-checker-form {
            flex-direction: column;
            align-items: stretch;
          }
          .zip-checker-input {
            width: 100%;
          }
        }
      `}</style>

      <form className="zip-checker-form" onSubmit={handleSubmit} noValidate>
        <div className="zip-checker-field">
          <label htmlFor="service-area-zip" className="zip-checker-label">
            Check your ZIP code
          </label>
          <input
            id="service-area-zip"
            name="serviceAreaZip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="e.g. 60440"
            value={zip}
            onChange={handleChange}
            className="zip-checker-input"
            aria-describedby="service-area-zip-result"
          />
        </div>
        <button type="submit" className="zip-checker-submit">
          Check Availability
        </button>
      </form>

      <div id="service-area-zip-result" aria-live="polite">
        {result && result.invalid && (
          <div className="zip-checker-result invalid">
            Please enter a valid 5-digit ZIP code.
          </div>
        )}

        {result && !result.invalid && result.covered && (
          <div className="zip-checker-result covered">
            We provide service in ZIP code {result.zip} — {result.area.city}, {STATE_NAMES[result.area.state] || result.area.state}.{' '}
            <Link to={routePath('/book-service')} className="zip-checker-cta">
              Book Service
            </Link>
          </div>
        )}

        {result && !result.invalid && !result.covered && (
          <div className="zip-checker-result not-covered">
            ZIP code {result.zip} is not currently listed in our standard service area.
            Contact us to confirm whether special availability is possible.{' '}
            <Link to={routePath('/contact')} className="zip-checker-link">
              Contact us
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceAreaZipChecker;
