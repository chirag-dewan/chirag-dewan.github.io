import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Resume from './pages/Resume.jsx';
import Experience from './pages/Experience.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';

// Navigation progress indicator
const NavigationProgress = () => {
  const [progress, setProgress] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setProgress(true);
    const timer = setTimeout(() => setProgress(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className={`fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 z-50 transition-opacity duration-300 ${
      progress ? 'opacity-100' : 'opacity-0'
    }`}></div>
  );
};

// Enhanced Navigation Component
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
        className={`text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent transition-all duration-300 ${
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
          <Link to="/" className={`pb-2 border-b-2 border-transparent ${location.pathname === '/' ? 'text-pink-500 border-pink-500' : 'text-white'}`}>
            About
          </Link>
          <Link to="/experience" className={`pb-2 border-b-2 border-transparent ${location.pathname === '/experience' ? 'text-pink-500 border-pink-500' : 'text-white'}`}>
            Experience
          </Link>
          <Link to="/projects" className={`pb-2 border-b-2 border-transparent ${location.pathname.includes('/projects') ? 'text-pink-500 border-pink-500' : 'text-white'}`}>
            Projects
          </Link>
          <Link to="/blog" className={`pb-2 border-b-2 border-transparent ${location.pathname.includes('/blog') ? 'text-pink-500 border-pink-500' : 'text-white'}`}>
            Blog
          </Link>
          <Link to="/resume" className={`pb-2 border-b-2 border-transparent ${location.pathname === '/resume' ? 'text-pink-500 border-pink-500' : 'text-white'}`}>
            Resume
          </Link>
          <a 
            href="https://github.com/chirag-dewan" 
            target="_blank" 
            rel="noreferrer" 
            className="pb-2 border-b-2 border-transparent text-white hover:text-pink-500"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Add animation when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-mono">
      <AnimatedBackground />
      <NavigationProgress />
      
      {/* Using the Enhanced Navigation Component */}
      <EnhancedNavigation />
      
      {/* Main content with route transition animation */}
      <main className="w-full mx-auto animate-fadeIn">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

// 404 Page
function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">404</h1>
      <h2 className="text-2xl mb-6">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-lg">The page you're looking for doesn't exist or has been moved.</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-lg hover:scale-105 transition-all"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
