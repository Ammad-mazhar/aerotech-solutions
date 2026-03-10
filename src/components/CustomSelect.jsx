import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ options, value, onChange, placeholder, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = searchTerm
        ? options.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : options;

    const selectedOption = options.find(opt => opt.value === value);

    const displayValue = isOpen ? searchTerm : (selectedOption ? selectedOption.label : '');

    const containerStyle = {
        position: 'relative',
        width: '100%',
        fontFamily: "'Inter', sans-serif"
    };

    const selectBoxStyle = {
        width: '100%',
        padding: '0',
        backgroundColor: '#ffffff',
        border: `1px solid ${error ? '#ef4444' : isOpen ? '#f97316' : '#cbd5e1'}`,
        borderRadius: '12px',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.2s ease',
        boxShadow: isOpen ? '0 0 0 4px rgba(249, 115, 22, 0.1)' : 'none',
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
        backgroundColor: isSelected ? '#fff7ed' : isHovered ? '#f8fafc' : 'transparent',
        color: isSelected ? '#f97316' : '#0f172a',
        fontWeight: isSelected ? '600' : '500',
        fontSize: '0.95rem',
        cursor: 'pointer',
        transition: 'all 0.1s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    });

    return (
        <div style={containerStyle} ref={containerRef}>
            <div
                style={selectBoxStyle}
            >
                <input
                    ref={inputRef}
                    style={{
                        width: '100%',
                        padding: '14px 18px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        fontSize: '1rem',
                        color: '#0f172a',
                        outline: 'none',
                        cursor: 'pointer'
                    }}
                    value={displayValue}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                />
                <ChevronDown
                    size={18}
                    style={{
                        transition: 'transform 0.3s ease',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: isOpen ? '#f97316' : '#64748b'
                    }}
                    onClick={() => {
                        setIsOpen(!isOpen);
                        inputRef.current?.focus();
                    }}
                />
            </div>

            {isOpen && (
                <div style={dropdownStyle}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                style={optionStyle(false, value === option.value)}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    onChange(option.value);
                                    setIsOpen(false);
                                    setSearchTerm('');
                                }}
                            >
                                {option.label}
                                {value === option.value && (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '12px 18px', color: '#64748b' }}>No results found</div>
                    )}
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
