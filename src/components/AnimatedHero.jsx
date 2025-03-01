import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';

const AnimatedHero = ({ name, subtitle, description }) => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState(null);
  const canvasRef = useRef(null);
  
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // Rest of the existing code remains the same...

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
      />
      
      {/* Content container */}
      <motion.div 
        className="container mx-auto px-4 z-10 text-center"
        style={{ opacity }}
      >
        {/* Existing name and letter animation code */}
        
        <motion.div
          style={{ y: titleY }}
          className="h-16 mb-8 overflow-hidden"
        >
          <motion.div 
            className="relative h-full flex items-center justify-center"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.span className="text-2xl md:text-3xl text-gray-300 inline-block relative">
              {subtitle}
              <motion.span
                className="inline-block w-0.5 h-6 bg-pink-500 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              ></motion.span>
            </motion.span>
          </motion.div>
        </motion.div>
        
        <motion.p
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl text-gray-400 italic mb-16 max-w-3xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {description || "In the realm of cybersecurity, continuous learning isn't just a choice – it's the foundation of excellence."}
        </motion.p>
        
        {/* Rest of the existing code remains the same... */}
      </motion.div>
    </div>
  );
};

export default AnimatedHero;
