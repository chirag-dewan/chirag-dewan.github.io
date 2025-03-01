import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Import components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ParticleNetwork from './components/ParticleNetwork';

// Import pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Resume from './pages/Resume';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
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
    <div className="relative min-h-screen w-full bg-black text-white font-sans enhanced-bg">
      <ParticleNetwork />
      
      <Navigation />
      
      <main className="w-full mx-auto">
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
              path="/contact" 
              element={
                <PageTransition>
                  <Contact />
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
