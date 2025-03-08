import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
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

  const handleLinkClick = (e, href) => {
    // Check if it's a smooth scroll anchor link and we're on the homepage
    if (href.startsWith('#') && location.pathname === '/') {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({
        behavior: 'smooth'
      });
      setMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect shadow-apple-sm' : 'bg-white'
      }`}
    >
      <div className="container-apple">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-display font-semibold text-apple-gray-900">
              Chirag Dewan
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
            <a
              href="/#experience"
              className="nav-link"
              onClick={(e) => handleLinkClick(e, '#experience')}
            >
              Experience
            </a>
            <a
              href="/#skills"
              className="nav-link"
              onClick={(e) => handleLinkClick(e, '#skills')}
            >
              Skills
            </a>
            <a
              href="/#projects"
              className="nav-link"
              onClick={(e) => handleLinkClick(e, '#projects')}
            >
              Projects
            </a>
            <NavLink 
              to="/blog" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Blog
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Contact
            </NavLink>
            
            {/* GitHub Link */}
            <a
              href="https://github.com/chirag-dewan"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-apple-gray-600 hover:text-apple-gray-900 transition-colors"
              aria-label="GitHub profile"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden flex items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'} text-xl text-apple-gray-900`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-effect border-t border-apple-gray-200 animate-fade-in-down">
          <div className="container-apple py-4 space-y-3">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `block py-2 text-base ${isActive ? 'text-apple-gray-900 font-medium' : 'text-apple-gray-600'}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <a
              href="/#experience"
              className="block py-2 text-base text-apple-gray-600"
              onClick={(e) => handleLinkClick(e, '#experience')}
            >
              Experience
            </a>
            <a
              href="/#skills"
              className="block py-2 text-base text-apple-gray-600"
              onClick={(e) => handleLinkClick(e, '#skills')}
            >
              Skills
            </a>
            <a
              href="/#projects"
              className="block py-2 text-base text-apple-gray-600"
              onClick={(e) => handleLinkClick(e, '#projects')}
            >
              Projects
            </a>
            <NavLink
              to="/blog"
              className={({ isActive }) => 
                `block py-2 text-base ${isActive ? 'text-apple-gray-900 font-medium' : 'text-apple-gray-600'}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => 
                `block py-2 text-base ${isActive ? 'text-apple-gray-900 font-medium' : 'text-apple-gray-600'}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>
            
            {/* Social Links for Mobile */}
            <div className="pt-4 border-t border-apple-gray-200 flex space-x-6">
              <a
                href="https://github.com/chirag-dewan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors"
                aria-label="GitHub profile"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/cdewan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors"
                aria-label="LinkedIn profile"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
