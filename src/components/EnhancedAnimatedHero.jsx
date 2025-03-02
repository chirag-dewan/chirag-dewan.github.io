import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EnhancedHeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [typewriterComplete, setTypewriterComplete] = useState(false);
  
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
  
  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get mouse position relative to the window
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
      
      // Update cursor position with a smoother motion
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation variants
  const nameVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const descriptionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2,
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.5)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {/* Large gradient orbs that float around slowly */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-3xl"
          style={{ 
            top: '10%', 
            right: '15%',
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"
          style={{ 
            bottom: '20%', 
            left: '10%',
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        ></div>
        
        {/* Binary code raining in the background */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="absolute text-pink-400/30 text-sm font-mono"
              style={{
                left: `${index * 5}%`,
                top: `-${Math.random() * 100}%`,
                animation: `binaryFall ${Math.random() * 8 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{ marginBottom: '0.5rem' }}>
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23fff' stroke-width='0.3'%3E%3Cpath d='M30 30h60v60H30z'/%3E%3Cpath d='M30 30h-30v60h30z'/%3E%3Cpath d='M30 30v-30h60v30'/%3E%3Cpath d='M30 30v-30h-30v30'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
      
      {/* 3D Card with light effects */}
      <div 
        className="relative z-10 max-w-5xl w-full mx-auto px-6"
        style={{ perspective: '1500px' }}
      >
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Card container with 3D transform */}
          <motion.div
            className="w-full p-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: isHovered 
                ? `rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`
                : 'rotateY(0deg) rotateX(0deg)',
              transition: 'transform 0.3s ease-out'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Card inner content */}
            <div className="bg-gray-900/95 backdrop-blur-lg rounded-xl p-12 md:p-20 relative overflow-hidden">
              {/* Light effect that follows cursor */}
              {isHovered && (
                <div 
                  className="absolute pointer-events-none w-96 h-96 rounded-full opacity-20"
                  style={{
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, rgba(236, 72, 153, 0) 70%)',
                    left: cursorPosition.x - 192,
                    top: cursorPosition.y - 192,
                    transform: 'translate(-50%, -50%)'
                  }}
                ></div>
              )}
              
              {/* Content */}
              <div className="text-center relative z-10">
                <motion.h1
                  variants={nameVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-6xl md:text-8xl font-bold mb-6 tracking-tight gradient-text text-glow"
                >
                  Chirag Dewan
                </motion.h1>
                
                <motion.div
                  variants={descriptionVariants}
                  initial="hidden"
                  animate="visible"
                  className="h-10 mb-8 relative"
                >
                  <span className="text-2xl md:text-3xl text-gray-300 inline-block">
                    {typedText}
                    {!typewriterComplete && (
                      <span className="inline-block w-1 h-8 ml-1 bg-pink-500 animate-pulse"></span>
                    )}
                  </span>
                </motion.div>
                
                <motion.p
                  variants={descriptionVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-xl md:text-2xl text-gray-300 italic mb-16 max-w-3xl mx-auto"
                >
                  Pioneering advanced security solutions through innovative research and cutting-edge technology.
                </motion.p>
                
                <motion.div
                  className="flex flex-wrap justify-center gap-6 mt-10"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        delayChildren: 1.2,
                        staggerChildren: 0.2
                      }
                    }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.a 
                    href="#projects" 
                    className="button-neo px-8 py-4 text-lg font-medium relative overflow-hidden group"
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    View Projects
                    <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20">
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-white transform -skew-x-20 translate-x-full group-hover:animate-shine"></span>
                    </span>
                  </motion.a>
                  
                  <motion.a 
                    href="#contact" 
                    className="px-8 py-4 bg-transparent border border-white/30 rounded-full text-lg font-medium hover:bg-white/10 hover:border-white/50 transition-all"
                    variants={buttonVariants}
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        duration: 0.2
                      }
                    }}
                  >
                    Contact Me
                  </motion.a>
                </motion.div>
              </div>
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
    </div>
  );
};

export default EnhancedHeroSection;
