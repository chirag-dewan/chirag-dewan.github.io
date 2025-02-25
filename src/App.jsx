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
      
      {/* Header (outside of main content flow) */}
      <header className={`flex items-center justify-between px-6 py-4 glass sticky top-0 z-50 transition-all duration-300 ${
        isHomePage ? 'bg-opacity-70' : 'bg-opacity-90'
      }`}>
        <Link to="/" className="text-xl font-bold gradient-animate bg-clip-text text-transparent">CD.</Link>
        <nav className="flex gap-6">
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
      </header>
      
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
