import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const serviceItems = [
    { name: 'Refrigerator', path: '/services/refrigerator-repair' },
    { name: 'Oven, Stove & Cooktop', path: '/services/oven-stove-cooktop-repair' },
    { name: 'Dryer', path: '/services/dryer-repair' },
    { name: 'Washer', path: '/services/washer-repair' },
    { name: 'Microwave', path: '/services/microwave-repair' },
    { name: 'Dishwasher', path: '/services/dishwasher-repair' },
    { name: 'HVAC & Furnace', path: '/services/hvac-furnace-repair' },
    { name: 'Garbage Disposal', path: '/services/garbage-disposal' },
    { name: 'Water Heater', path: '/services/water-heater-repair' },
  ];

  const searchableItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Services', path: '/#services' },
    ...serviceItems,
    { name: 'Service Areas', path: '/service-areas' },
    { name: 'FAQ', path: '/faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const brandMarquee = "Aerotech Solution • ".repeat(10);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filtered = searchableItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (path) => {
    if (path.startsWith('/#')) {
      if (window.location.pathname === '/' && path.startsWith('/#')) {
        const elementId = path.substring(2);
        const element = document.getElementById(elementId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const elementId = path.substring(2);
          const element = document.getElementById(elementId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(path);
    }
    setSearchQuery('');
    setSearchResults([]);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] border-b transition-all duration-300 font-['Inter'] ${isScrolled
        ? 'py-4 bg-[#f97316]/90 backdrop-blur-md border-white/10 shadow-lg'
        : 'py-6 bg-[#f97316]/95 backdrop-blur-md border-transparent'
        }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 no-underline group" onClick={() => window.scrollTo(0, 0)}>
          <img 
            src="/logo/logo.png" 
            alt="Aerotech Solution" 
            style={{ height: '4rem', width: 'auto' }}
          />
          <h1 className="text-lg md:text-2xl font-extrabold text-white m-0 tracking-tight">Aerotech Solution</h1>
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 bg-none border-none cursor-pointer group"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''} bg-white group-hover:bg-orange-400`}></span>
          <span className={`block w-6 h-0.5 transition-all ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'} bg-white group-hover:bg-orange-400`}></span>
          <span className={`block w-6 h-0.5 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''} bg-white group-hover:bg-orange-400`}></span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
          <li><Link to="/" className="text-slate-200 font-medium no-underline transition-colors hover:text-orange-400">Home</Link></li>

          <li
            className="relative cursor-pointer group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); handleResultClick('/#services'); }}
              className="text-slate-200 font-semibold no-underline hover:text-orange-400 flex items-center gap-1.5 transition-colors"
            >
              Services
              <span className={`text-[0.6em] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-orange-400' : 'opacity-50'}`}>▼</span>
            </a>

            {isDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[220px] z-[100] animate-[dropdownSlideUp_0.2s_ease-out_forwards]">
                <div className="bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-slate-100 py-2 overflow-hidden">
                  {serviceItems.map((item, index) => (
                    <div
                      key={item.name}
                      onClick={() => handleResultClick(item.path)}
                      className={`px-5 py-2.5 text-slate-700 text-sm font-medium cursor-pointer transition-all hover:bg-slate-50 hover:text-orange-600 ${index !== serviceItems.length - 1 ? 'border-b border-slate-100' : ''}`}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>

          <li><Link to="/about" className="text-slate-200 font-medium no-underline transition-colors hover:text-orange-400">About</Link></li>
          <li><Link to="/contact" className="text-slate-200 font-medium no-underline transition-colors hover:text-orange-400">Contact</Link></li>

          <li className="relative flex items-center ms-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border border-slate-700 rounded-full text-sm outline-none w-[160px] transition-all bg-slate-900/50 text-white focus:w-[220px] focus:border-orange-500 focus:bg-slate-900"
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full right-0 w-full mt-2 bg-[#7f1d1d] border border-slate-700 rounded-xl shadow-2xl max-h-[300px] overflow-y-auto">
                {searchResults.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 cursor-pointer text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-orange-400"
                    onClick={() => handleResultClick(item.path)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>

        <Link
          to="/book-service"
          className="hidden md:inline-block bg-[#052e16] text-white px-6 py-2.5 rounded-full font-bold no-underline transition-all hover:-translate-y-0.5 hover:bg-[#064e3b] shadow-lg shadow-green-900/20"
        >
          Book Service
        </Link>
      </div>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1001] md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 w-[85%] max-w-[350px] h-full bg-[#f97316] text-white z-[1002] transition-transform duration-300 shadow-2xl p-6 flex flex-col md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold text-slate-400">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Mobile Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search services..."
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:border-orange-500 outline-none placeholder-slate-500"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl max-h-[200px] overflow-y-auto z-50">
              {searchResults.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-3 cursor-pointer text-sm text-slate-300 border-b border-slate-700/50 last:border-none hover:bg-slate-700 hover:text-orange-400"
                  onClick={() => handleResultClick(item.path)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <ul className="list-none p-0 space-y-4 flex-grow overflow-y-auto">
          {/* Main Navigation */}
          <li>
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold no-underline text-white block hover:text-orange-400 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold no-underline text-white block hover:text-orange-400 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold no-underline text-white block hover:text-orange-400 transition-colors"
            >
              Services
            </Link>
            <div className="pl-4 mt-2 space-y-3 border-l border-white/10 ml-1">
              {serviceItems.map((service) => (
                <div
                  key={service.name}
                  onClick={() => handleResultClick(service.path)}
                  className="text-base text-slate-400 block cursor-pointer hover:text-orange-400 py-1"
                >
                  {service.name}
                </div>
              ))}
            </div>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold no-underline text-white block hover:text-orange-400 transition-colors"
            >
              Contact
            </Link>
          </li>

          {/* Divider */}
          <li className="border-t border-white/10 pt-4 mt-2">
            <Link
              to="/service-areas"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-semibold no-underline text-slate-300 block hover:text-orange-400 transition-colors"
            >
              Service Areas
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-semibold no-underline text-slate-300 block hover:text-orange-400 transition-colors"
            >
              FAQ
            </Link>
          </li>
        </ul>

        <div className="mt-auto pt-6 border-t border-white/10">
          <Link
            to="/book-service"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full bg-[#052e16] text-white text-center py-3 rounded-xl font-bold mb-6 hover:bg-[#064e3b] transition-colors shadow-lg shadow-green-900/20"
          >
            Book Service
          </Link>

          <div className="w-full overflow-hidden relative">
            <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase mx-4">{brandMarquee}</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase mx-4">{brandMarquee}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes dropdownSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
