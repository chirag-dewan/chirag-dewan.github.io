import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const EnhancedNavigation = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`flex items-center justify-between px-6 py-4 glass sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-opacity-95 backdrop-blur-lg shadow-lg' : 'py-4 bg-opacity-70'
      }`}
    >
      <Link 
        to="/" 
        className={`text-xl font-bold gradient-animate bg-clip-text text-transparent transition-all duration-300 ${
          scrolled ? 'scale-90' : 'scale-100'
        }`}
      >
        CD.
      </Link>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden z-50 focus:outline-none" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-5">
          <span 
            className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ${
              menuOpen ? 'rotate-45 top-2' : 'top-0'
            }`}
          />
          <span 
            className={`absolute h-0.5 bg-white transform transition-all duration-300 ${
              menuOpen ? 'w-0 opacity-0' : 'w-full opacity-100 top-2'
            }`}
          />
          <span 
            className={`absolute h-0.5 w-full bg-white transform transition-all duration-300 ${
              menuOpen ? '-rotate-45 top-2' : 'top-4'
            }`}
          />
        </div>
      </button>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6">
        <Link to="/" className={`nav-link transition-colors ${location.pathname === '/' ? 'text-pink-500' : 'hover:text-pink-500'}`}>
          About
        </Link>
        <Link to="/experience" className={`nav-link transition-colors ${location.pathname === '/experience' ? 'text-pink-500' : 'hover:text-pink-500'}`}>
          Experience
        </Link>
        <Link to="/projects" className={`nav-link transition-colors ${location.pathname.includes('/projects') ? 'text-pink-500' : 'hover:text-pink-500'}`}>
          Projects
        </Link>
        <Link to="/blog" className={`nav-link transition-colors ${location.pathname.includes('/blog') ? 'text-pink-500' : 'hover:text-pink-500'}`}>
          Blog
        </Link>
        <Link to="/resume" className={`nav-link transition-colors ${location.pathname === '/resume' ? 'text-pink-500' : 'hover:text-pink-500'}`}>
          Resume
        </Link>
        <a 
          href="https://github.com/chirag-dewan" 
          target="_blank" 
          rel="noreferrer" 
          className="nav-link hover:text-pink-500 transition-colors"
        >
          GitHub
        </a>
      </nav>
      
      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center z-40 transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } md:hidden`}
      >
        <nav className="flex flex-col items-center gap-6 text-2xl">
          <Link to="/" className={`nav-link-mobile pb-2 ${location.pathname === '/' ? 'text-pink-500' : 'text-white'}`}>
            About
          </Link>
          <Link to="/experience" className={`nav-link-mobile pb-2 ${location.pathname === '/experience' ? 'text-pink-500' : 'text-white'}`}>
            Experience
          </Link>
          <Link to="/projects" className={`nav-link-mobile pb-2 ${location.pathname.includes('/projects') ? 'text-pink-500' : 'text-white'}`}>
            Projects
          </Link>
          <Link to="/blog" className={`nav-link-mobile pb-2 ${location.pathname.includes('/blog') ? 'text-pink-500' : 'text-white'}`}>
            Blog
          </Link>
          <Link to="/resume" className={`nav-link-mobile pb-2 ${location.pathname === '/resume' ? 'text-pink-500' : 'text-white'}`}>
            Resume
          </Link>
          <a 
            href="https://github.com/chirag-dewan" 
            target="_blank" 
            rel="noreferrer" 
            className="nav-link-mobile pb-2 text-white hover:text-pink-500"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};

export default EnhancedNavigation;
