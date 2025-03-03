import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Import components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AdvancedBackground from './components/EnhancedBackground'; // Import the new enhanced background
import AnimatedHero from './components/AnimatedHero';
import InteractiveTerminal from './components/InteractiveTerminal';
import ProjectShowcase from './components/ProjectShowcase';
import SkillGlobe from './components/InteractiveSkillGlobe';
import SkillHexagon from './components/SkillHexagon';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactSection from './components/ContactSection';
import ProjectCards from './components/ProjectCards';
import BlogCards from './components/BlogCards';

// Import pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Resume from './pages/Resume';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import NotFound from './pages/NotFound';

// Import styles
import './index.scss';

// Page transition wrapper
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Main app content with router
const AppContent = () => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full text-white font-sans animated-gradient-bg">
      {/* Use the Advanced Background for all pages now */}
      <AdvancedBackground />
      
      <Navigation />
      
      <main className="w-full mx-auto relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route 
              path="/" 
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } 
            />
            <Route 
              path="/experience" 
              element={
                <PageTransition>
                  <Experience />
                </PageTransition>
              } 
            />
            <Route 
              path="/projects" 
              element={
                <PageTransition>
                  <Projects />
                </PageTransition>
              } 
            />
            <Route 
              path="/projects/:projectId" 
              element={
                <PageTransition>
                  <ProjectDetail />
                </PageTransition>
              } 
            />
            <Route 
              path="/blog" 
              element={
                <PageTransition>
                  <Blog />
                </PageTransition>
              } 
            />
            <Route 
              path="/blog/:postId" 
              element={
                <PageTransition>
                  <BlogPost />
                </PageTransition>
              } 
            />
            <Route 
              path="/resume" 
              element={
                <PageTransition>
                  <Resume />
                </PageTransition>
              }
            />
            <Route 
              path="*" 
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

// Root component with router provider
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
