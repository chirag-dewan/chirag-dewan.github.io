import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import FuturisticInterface from './components/FuturisticInterface';
import SecurityBackground from './components/SecurityBackground';

// Import styles
import './index.scss';

const App = () => {
  return (
    <>
      {/* Security-themed animated background */}
      <SecurityBackground />
      
      {/* Scanlines effect overlay for CRT feel */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10" 
           style={{ 
             background: 'linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%)', 
             backgroundSize: '100% 4px' 
           }}>
      </div>
      
      {/* Router is required for any internal navigation */}
      <Router>
        {/* Main cybersecurity dashboard interface */}
        <FuturisticInterface />
      </Router>
    </>
  );
};

export default App;
