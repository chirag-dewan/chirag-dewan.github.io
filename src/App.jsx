import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Resume from './pages/Resume.jsx';
import Experience from './pages/Experience.jsx';

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen w-full bg-black text-white font-mono">
        <AnimatedBackground />
        
        {/* Header (outside of main content flow) */}
        <header className="flex items-center justify-between px-6 py-4 glass sticky top-0 z-50">
          <Link to="/" className="text-xl font-bold gradient-animate bg-clip-text text-transparent">CD.</Link>
          <nav className="flex gap-6">
            <Link to="/" className="nav-link hover:text-pink-500 transition-colors">About</Link>
            <Link to="/experience" className="nav-link hover:text-pink-500 transition-colors">Experience</Link>
            <Link to="/projects" className="nav-link hover:text-pink-500 transition-colors">Projects</Link>
            <Link to="/resume" className="nav-link hover:text-pink-500 transition-colors">Resume</Link>
            <a href="https://github.com/chirag-dewan" target="_blank" rel="noreferrer" className="nav-link hover:text-pink-500 transition-colors">GitHub</a>
          </nav>
        </header>
        
        {/* Main content */}
        <main className="w-full mx-auto transition-all duration-300">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
