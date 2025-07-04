import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black bg-opacity-90 backdrop-blur-sm border-b border-green-400 shadow-lg' : 'bg-black bg-opacity-70'
      }`}
    >
      <div className="container-apple">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-mono font-semibold text-green-400 relative"
            >
              Chirag Dewan
              <motion.span 
                layoutId="underline"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-400"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: location.pathname === '/' ? 1 : 0, width: location.pathname === '/' ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => `text-green-400 hover:text-cyan-400 transition-colors font-mono relative ${isActive ? 'text-cyan-400 font-medium' : ''}`}
            >
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <motion.span 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </>
              )}
            </NavLink>
            <NavLink 
              to="/blog" 
              className={({ isActive }) => `text-green-400 hover:text-cyan-400 transition-colors font-mono relative ${isActive ? 'text-cyan-400 font-medium' : ''}`}
            >
              {({ isActive }) => (
                <>
                  Blog
                  {isActive && (
                    <motion.span 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </>
              )}
            </NavLink>
            <a
              href="https://github.com/chirag-dewan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-cyan-400 transition-colors font-mono"
            >
              GitHub
            </a>
            
            {/* GitHub Link with Icon */}
            <a
              href="https://github.com/chirag-dewan"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-green-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub profile"
            >
              <motion.i 
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="fab fa-github text-xl"
              ></motion.i>
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="md:hidden flex items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'} text-xl text-green-400`}></i>
          </motion.button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="md:hidden bg-black bg-opacity-95 backdrop-blur-sm border-t border-green-400"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-apple py-4 space-y-4">
              <NavLink
                to="/"
                className={({ isActive }) => 
                  `block py-2 text-base font-mono ${isActive ? 'text-cyan-400 font-medium' : 'text-green-400'}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) => 
                  `block py-2 text-base font-mono ${isActive ? 'text-cyan-400 font-medium' : 'text-green-400'}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </NavLink>
              <a
                href="https://github.com/chirag-dewan"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-base font-mono text-green-400"
                onClick={() => setMenuOpen(false)}
              >
                GitHub
              </a>
              
              {/* Social Links for Mobile */}
              <div className="pt-4 border-t border-green-400 flex space-x-6">
                <a
                  href="https://github.com/chirag-dewan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-cyan-400 transition-colors"
                  aria-label="GitHub profile"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/cdewan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-cyan-400 transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
