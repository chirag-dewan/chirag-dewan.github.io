import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
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
  
  // Navigation items
  const navItems = [
    { path: '/', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
    { path: '/resume', label: 'Resume' }
  ];

  // Check if path matches (including partial matches for nested routes)
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Navigation Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 z-50"
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: location.pathname === '/' ? 0.1 : 1,
          transition: { duration: 0.5, ease: "easeInOut" }
        }}
        style={{ transformOrigin: "0% 50%" }}
      />
      
      <header 
        className={`flex items-center justify-between px-6 py-4 glass sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? 'py-3 bg-opacity-95 backdrop-blur-lg shadow-lg' : 'py-4 bg-opacity-70'
        }`}
      >
        {/* Logo */}
        <Link 
          to="/" 
          className={`relative text-xl font-bold transition-all duration-300 ${
            scrolled ? 'scale-90' : 'scale-100'
          }`}
        >
          <span className="gradient-text font-mono">CD.</span>
          {/* Subtle glow effect behind the logo */}
          <div className="absolute -inset-2 bg-pink-500/10 rounded-full blur-xl -z-10 opacity-50"></div>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 focus:outline-none w-10 h-10 flex items-center justify-center" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <motion.span 
              className="absolute h-0.5 w-full bg-white transform transition-all duration-300"
              animate={{ 
                top: menuOpen ? '0.5rem' : 0,
                rotate: menuOpen ? 45 : 0,
              }}
            />
            <motion.span 
              className="absolute h-0.5 bg-white transform transition-all duration-300 top-2"
              animate={{ 
                opacity: menuOpen ? 0 : 1,
                width: menuOpen ? 0 : '100%'
              }}
            />
            <motion.span 
              className="absolute h-0.5 w-full bg-white transform transition-all duration-300"
              animate={{ 
                top: menuOpen ? '0.5rem' : '1rem',
                rotate: menuOpen ? -45 : 0
              }}
            />
          </div>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`nav-link relative py-2 transition-colors duration-300 ${
                isActive(item.path) ? 'text-pink-500' : 'text-white hover:text-pink-500'
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 w-full"
                  layoutId="activeNav"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
          
          {/* GitHub Link */}
          <a 
            href="https://github.com/chirag-dewan" 
            target="_blank" 
            rel="noreferrer" 
            className="nav-link relative py-2 text-white hover:text-pink-500 transition-colors duration-300 flex items-center gap-1"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </nav>
        
        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center z-30 md:hidden"
            >
              <nav className="flex flex-col items-center gap-8 text-2xl">
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.indexOf(item) * 0.1 }}
                  >
                    <Link 
                      to={item.path} 
                      className={`block py-2 px-4 ${
                        isActive(item.path) 
                          ? 'text-pink-500 border-b-2 border-pink-500' 
                          : 'text-white border-b-2 border-transparent'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <a 
                    href="https://github.com/chirag-dewan" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 py-2 px-4 text-white border-b-2 border-transparent"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                </motion.div>
              </nav>
              
              {/* Social Links in Mobile Menu */}
              <motion.div 
                className="mt-12 flex gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a 
                  href="https://linkedin.com/in/cdewan" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a 
                  href="mailto:chirag0728@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navigation;
