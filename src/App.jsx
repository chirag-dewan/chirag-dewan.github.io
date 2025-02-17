import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Resume from './pages/Resume.jsx';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-black text-white font-mono">
        {/* Example minimal nav (glass effect optional) */}
        <header className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="text-xl font-bold">CD.</div>
          <nav className="space-x-4 text-sm">
            <Link to="/" className="bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition">
              About
            </Link>
            <Link to="/projects" className="bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition">
              Projects
            </Link>
            <Link to="/resume" className="bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition">
              Resume
            </Link>
            <a
              href="https://github.com/chirag-dewan"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition"
            >
              GitHub
            </a>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </Router>
  );
}
