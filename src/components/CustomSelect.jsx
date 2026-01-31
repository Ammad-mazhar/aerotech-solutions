import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ options, value, onChange, placeholder, label, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    const containerStyle = {
        position: 'relative',
        width: '100%',
        fontFamily: "'Inter', sans-serif"
    };

    const selectBoxStyle = {
        width: '100%',
        padding: '14px 18px',
        backgroundColor: '#ffffff',
        border: `1px solid ${error ? '#ef4444' : isOpen ? '#2563eb' : '#cbd5e1'}`,
        borderRadius: '12px',
        fontSize: '1rem',
        color: selectedOption ? '#0f172a' : '#94a3b8',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'between',
        transition: 'all 0.2s ease',
        boxShadow: isOpen ? '0 0 0 4px rgba(37, 99, 235, 0.1)' : 'none',
        outline: 'none'
    };

    const dropdownStyle = {
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: '0',
        width: '100%',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        maxHeight: '260px',
        overflowY: 'auto',
        animation: 'slideUp 0.2s ease-out'
    };

    const optionStyle = (isHovered, isSelected) => ({
        padding: '12px 18px',
        backgroundColor: isSelected ? '#eff6ff' : isHovered ? '#f8fafc' : 'transparent',
        color: isSelected ? '#2563eb' : '#475569',
        fontWeight: isSelected ? '600' : '500',
        fontSize: '0.95rem',
        cursor: 'pointer',
        transition: 'all 0.1s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'between'
    });

    return (
        <div style={containerStyle} ref={containerRef}>
            <div
                style={selectBoxStyle}
                onClick={() => setIsOpen(!isOpen)}
                tabIndex="0"
                onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
            >
                <span style={{ flex: 1 }}>{selectedOption ? selectedOption.label : placeholder}</span>
                <ChevronDown
                    size={18}
                    style={{
                        transition: 'transform 0.3s ease',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: isOpen ? '#2563eb' : '#64748b'
                    }}
                />
            </div>

            {isOpen && (
                <div style={dropdownStyle}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            style={optionStyle(false, value === option.value)}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = value === option.value ? '#eff6ff' : '#f8fafc';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = value === option.value ? '#eff6ff' : 'transparent';
                            }}
                        >
                            {option.label}
                            {value === option.value && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};

export default CustomSelect;
