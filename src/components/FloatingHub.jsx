import React, { useState, useEffect } from 'react';

const FloatingHub = () => {
  const [isPulse, setIsPulse] = useState(false);

  const phoneNumber = "16309435120";

  // Pulse effect logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulse(true);
      setTimeout(() => setIsPulse(false), 2000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-hub">
      <style>{`
        .floating-hub {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
        }

        .hub-main-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          color: #ffffff;
          position: relative;
          text-decoration: none;
        }

        .hub-main-btn:hover {
          transform: scale(1.05);
          background: rgba(37, 99, 235, 1);
        }

        .hub-pulse {
          animation: pulse-animation 2s infinite;
        }

        @keyframes pulse-animation {
          0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(37, 99, 235, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }

        .hub-get-in-touch {
          background: rgba(37, 99, 235, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          white-space: nowrap;
          margin-bottom: -0.5rem; /* Position it closer to the button */
          opacity: 1;
          transform: translateX(0);
          transition: all 0.3s ease;
        }
      `}</style>

      <a
        href={`tel:${phoneNumber}`}
        className={`hub-main-btn ${isPulse ? 'hub-pulse' : ''}`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </a>

      <div className="hub-get-in-touch">
        Get in touch
      </div>
    </div>
  );
};

export default FloatingHub;