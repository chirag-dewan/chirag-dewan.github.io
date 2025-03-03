import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EnhancedHeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  const [activeParticles, setActiveParticles] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  
  const fullText = "Cyber Research Scientist";
  
  // Typing animation effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, Math.random() * 50 + 70); // Randomize typing speed slightly for realism
      
      return () => clearTimeout(timeout);
    } else {
      setTypewriterComplete(true);
    }
  }, [typedText, fullText]);
  
  // Cursor blink effect
  useEffect(() => {
    if (typewriterComplete) {
      const blinkInterval = setInterval(() => {
        setCursorVisible(prev => !prev);
      }, 500);
      
      return () => clearInterval(blinkInterval);
    }
  }, [typewriterComplete]);
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
      
      // Create new particle at mouse position with random properties
      if (Math.random() > 0.92) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 5 + 2,
          color: getRandomColor(),
          duration: Math.random() * 2 + 1,
          xMovement: (Math.random() - 0.5) * 100,
          yMovement: (Math.random() - 0.5) * 100 - 50 // Bias upward
        };
        
        setActiveParticles(prev => [...prev, newParticle]);
        
        // Remove particle after animation completes
        setTimeout(() => {
          setActiveParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, newParticle.duration * 1000);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Get random color for particles
  const getRandomColor = () => {
    const colors = [
      'rgba(236, 72, 153, 0.7)', // pink
      'rgba(168, 85, 247, 0.7)', // purple
      'rgba(59, 130, 246, 0.7)',  // blue
      'rgba(16, 185, 129, 0.7)'   // green
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black bg-opacity-80 z-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>
        
        {/* Large gradient orbs that move with mouse */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-3xl"
          style={{ 
            top: '15%', 
            right: '10%',
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
          style={{ 
            bottom: '10%', 
            left: '15%',
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        ></div>
      </div>
      
      {/* Dynamic particles following cursor */}
      {activeParticles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full pointer-events-none z-10"
          style={{ 
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ 
            opacity: 0,
            scale: 0,
            x: particle.xMovement,
            y: particle.yMovement
          }}
          transition={{ 
            duration: particle.duration,
            ease: "easeOut"
          }}
        />
      ))}
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* 3D Card */}
          <motion.div
            className="w-full p-1 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="bg-black/95 backdrop-blur-lg rounded-xl p-12 md:p-16 relative overflow-hidden flex flex-col items-center">
              {/* Main content */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-bold mb-6 tracking-tight text-white"
              >
                <span className="bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                  Chirag Dewan
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-10 mb-8 relative"
              >
                <span className="text-2xl md:text-3xl text-gray-300 inline-block">
                  {typedText}
                  {!typewriterComplete && (
                    <span className={`inline-block w-1 h-8 ml-1 bg-pink-500 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
                  )}
                  {typewriterComplete && cursorVisible && (
                    <span className="inline-block w-1 h-8 ml-1 bg-pink-500"></span>
                  )}
                </span>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12"
              >
                Pioneering advanced security solutions through innovative research and cutting-edge technology.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex flex-wrap justify-center gap-6 mt-6"
              >
                <motion.a 
                  href="#projects" 
                  className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-lg font-medium text-white shadow-lg shadow-pink-500/20 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">View Projects</span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-20">
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white to-transparent transform -skew-x-20 translate-x-full group-hover:animate-shine"></span>
                  </span>
                </motion.a>
                
                <motion.a 
                  href="#contact" 
                  className="px-8 py-4 bg-transparent border border-white/20 rounded-full text-lg font-medium text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Me
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
            className="w-8 h-14 rounded-full border-2 border-white/30 flex items-start justify-center p-1"
          >
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="w-1.5 h-3 bg-pink-500 rounded-full"
            />
          </motion.div>
          <p className="mt-2 text-gray-400 text-sm">Scroll Down</p>
        </motion.div>
      </div>
      
      {/* Tech shape decorations - floating hexagons */}
      {[...Array(15)].map((_, index) => {
        const size = Math.random() * 30 + 10;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * 0.1 + 0.05;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 10;
        
        return (
          <div 
            key={index}
            className="absolute pointer-events-none"
            style={{
              top: `${y}%`,
              left: `${x}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              animation: `float ${animationDuration}s ease-in-out infinite`,
              animationDelay: `${animationDelay}s`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="white" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default EnhancedHeroSection;
