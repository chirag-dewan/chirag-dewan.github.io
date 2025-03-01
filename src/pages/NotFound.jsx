import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <h1 className="text-8xl sm:text-9xl font-bold gradient-text text-glow mb-4">404</h1>
        
        {/* Decorative glitch effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-8xl sm:text-9xl font-bold opacity-20 text-white blur-sm">404</h1>
        </div>
        
        <div className="absolute -inset-10 bg-pink-500/5 rounded-full blur-3xl"></div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-white">Page Not Found</h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto">
          The page you're looking for doesn't exist or has been moved to another location.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="button-neo px-8 py-4 rounded-full text-lg hover:scale-105 transition-all flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-7-7v14"></path>
            </svg>
            Back to Homepage
          </Link>
          
          <Link 
            to="/projects" 
            className="px-8 py-4 bg-transparent border border-white/30 rounded-full text-lg hover:bg-white/10 hover:border-white/50 transition-all flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
            </svg>
            View Projects
          </Link>
        </div>
      </motion.div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Binary code elements scattered in background */}
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="absolute text-gray-700/20 text-xs sm:text-sm font-mono"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotFound;
