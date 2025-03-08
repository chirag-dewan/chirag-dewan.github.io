import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const canvasRef = useRef(null);
  
  // Digital matrix effect for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Binary/hex characters for cybersecurity theme
    const characters = "01アセキュリティエンジニア10SECURITY0110";
    const charArray = characters.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array to track the y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start above the canvas for staggered effect
    }
    
    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = "rgba(0, 10, 30, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Character style
      ctx.fillStyle = "#0a3bce30"; // Light blue with transparency
      ctx.font = `${fontSize}px monospace`;
      
      // Loop over each column
      for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Draw the character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        // Move the drop down
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0; // Reset to top
        }
        drops[i]++;
      }
    };
    
    const interval = setInterval(draw, 60);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-32 relative overflow-hidden">
      {/* Cybersecurity-themed matrix background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10 opacity-30"
      />
      
      <div className="container-apple relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-6 px-4 py-2 bg-white/80 backdrop-blur-lg rounded-full shadow-apple-sm">
                <span className="text-sm font-medium text-apple-gray-600">Cyber Research Engineer I at RTX BBN</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="heading-xl text-apple-gray-900 leading-tight"
            >
              <span className="block">Chirag Dewan</span>
              <motion.span 
                className="block text-apple-blue-500 mt-3 text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-apple-blue-500 to-blue-700"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
              >
                Security Researcher & Engineer
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-xl text-apple-gray-600 max-w-3xl mx-auto"
            >
              Specializing in vulnerability discovery, reverse engineering, and securing critical infrastructure systems
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <motion.a
                href="#projects"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </div>
          
          {/* Expertise badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-20 flex justify-center"
          >
            <div className="inline-flex flex-wrap justify-center items-center gap-6 sm:gap-8 px-8 py-4 bg-white/80 backdrop-blur-lg rounded-full shadow-apple">
              <motion.span 
                className="text-sm font-medium text-apple-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                Areas of Expertise:
              </motion.span>
              
              {[
                { icon: "shield-alt", name: "Vulnerability Research" },
                { icon: "bug", name: "Exploit Development" },
                { icon: "microchip", name: "Reverse Engineering" },
                { icon: "code", name: "Secure Coding" },
                { icon: "network-wired", name: "SCADA Security" }
              ].map((tech, index) => (
                <motion.div 
                  key={tech.name}
                  className="flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + (index * 0.1) }}
                >
                  <i className={`fas fa-${tech.icon} text-lg text-apple-gray-700 mr-2`}></i>
                  <span className="text-apple-gray-700 font-medium text-sm hidden sm:inline">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Cybersecurity element */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none"
      >
        <div className="w-full max-w-5xl h-20 bg-gradient-to-r from-transparent via-apple-blue-500/10 to-transparent"></div>
      </motion.div>
      
      {/* Animated lock icon */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-40 left-1/2 transform -translate-x-1/2 text-8xl text-apple-blue-500 opacity-10"
      >
        <i className="fas fa-lock"></i>
      </motion.div>
    </section>
  );
};

export default Hero;
