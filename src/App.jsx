import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Resume from './pages/Resume';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gradient-to-b from-[#0A0A0A] to-[#1F1F1F] text-white font-mono">
        {/* Navbar */}
        <header className="flex items-center justify-between px-6 py-4 glass sticky top-0 z-50">
          <div className="text-xl font-bold heading-glow">CD.</div>
          <nav className="space-x-4 text-sm">
            <Link
              to="/"
              className="bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition hover-pulse"
            >
              About
            </Link>
            <Link
              to="/projects"
              className="bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition hover-pulse"
            >
              Projects
            </Link>
            <Link
              to="/resume"
              className="bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition hover-pulse"
            >
              Resume
            </Link>
            <a
              href="https://github.com/chirag-dewan"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition hover-pulse"
            >
              GitHub
            </a>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </Router>
  );
}
