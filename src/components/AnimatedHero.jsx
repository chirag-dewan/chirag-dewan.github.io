import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';

const AnimatedHero = ({ name, title, description }) => {
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
  
  // Initialize viewport size
  useEffect(() => {
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
    
    return () => {
      window.removeEventListener('resize', updateViewportSize);
    };
  }, []);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Dynamic type effect for subtitle
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const words = [
      "Software Development Engineer II",
      "Security Specialist",
      "Full-Stack Developer",
      "Cloud Solutions Architect"
    ];
    
    const currentWord = words[currentWordIndex];
    
    const typeSpeed = isDeleting ? 50 : 150;
    const pauseDelay = 1500;
    const delayAfterComplete = 3000;
    
    const type = () => {
      setDisplayText(currentWord.substring(0, isDeleting ? displayText.length - 1 : displayText.length + 1));
      
      if (!isDeleting && displayText === currentWord) {
        // Word completely typed
        setTimeout(() => setIsDeleting(true), delayAfterComplete);
      } else if (isDeleting && displayText === '') {
        // Word completely deleted
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      } else {
        // Continue typing or deleting
        const typingTimer = setTimeout(type, typeSpeed);
        return () => clearTimeout(typingTimer);
      }
    };
    
    const timer = setTimeout(type, isDeleting || displayText.length === 0 ? typeSpeed : pauseDelay);
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex]);
  
  // Canvas animation effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', setCanvasDimensions);
    setCanvasDimensions();
    
    // Particles setup
    const particlesArray = [];
    const numberOfParticles = Math.min(150, window.innerWidth / 10); // Responsive
    
    // Enhanced particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.color = this.getRandomColor();
        this.velocity = {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2
        };
        this.opacity = Math.max(0.2, Math.random());
      }
      
      getRandomColor() {
        // Color palette for cybersecurity theme
        const colors = [
          'rgba(236, 72, 153, 1)', // Pink
          'rgba(168, 85, 247, 1)', // Purple
          'rgba(59, 130, 246, 1)',  // Blue
          'rgba(20, 184, 166, 1)'  // Teal
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace('1)', `${this.opacity})`);
        ctx.fill();
      }
      
      update() {
        // Calculate distance between particle and mouse
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        
        // Mouse repulsion radius
        const mouseRadius = 150;
        
        // Set movement based on distance
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius * 0.6;
          this.x -= forceDirectionX * force;
          this.y -= forceDirectionY * force;
          this.opacity = Math.min(1, this.opacity + 0.02);
        } else {
          // Natural movement
          this.x += this.velocity.x;
          this.y += this.velocity.y;
          this.opacity = Math.max(0.2, this.opacity - 0.002);
          
          // Screen boundaries
          if (this.x > canvas.width || this.x < 0) {
            this.velocity.x *= -1;
          }
          
          if (this.y > canvas.height || this.y < 0) {
            this.velocity.y *= -1;
          }
        }
        
        this.draw();
      }
    }
    
    // Initialize particles
    const init = () => {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    // Connect particles with lines
    const connect = () => {
      let opacityValue = 1;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const distance = 
            ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
            ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          
          const maxDistance = (canvas.width / 7) * (canvas.height / 7);
          
          if (distance < maxDistance) {
            opacityValue = 1 - (distance / maxDistance);
            const gradient = ctx.createLinearGradient(
              particlesArray[a].x, 
              particlesArray[a].y, 
              particlesArray[b].x, 
              particlesArray[b].y
            );
            
            // Extract colors from particles for line gradient
            const colorA = particlesArray[a].color;
            const colorB = particlesArray[b].color;
            
            gradient.addColorStop(0, colorA.replace('1)', `${opacityValue * 0.3})`));
            gradient.addColorStop(1, colorB.replace('1)', `${opacityValue * 0.3})`));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach(particle => {
        particle.update();
      });
      
      connect();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);
  
  // Custom cursor effect
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      borderRadius: '50%',
      border: '2px solid rgba(236, 72, 153, 0.7)',
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 500,
        duration: 0.01
      }
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: 'rgba(236, 72, 153, 0.15)',
      border: '2px solid rgba(236, 72, 153, 0.7)',
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 500,
        duration: 0.01
      }
    },
    text: {
      x: mousePosition.x - 60,
      y: mousePosition.y - 60,
      height: 120,
      width: 120,
      backgroundColor: 'rgba(236, 72, 153, 0.8)',
      mixBlendMode: 'difference',
      border: 'none',
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 500,
        duration: 0.01
      }
    }
  };
  
  // Text animation variants
  const textVariants = {
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
  
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const descriptionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.9,
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px -10px rgba(236, 72, 153, 0.7)",
      transition: {
        duration: 0.3
      }
    }
  };
  
  // Split name into characters for letter animation
  const nameLetters = name ? name.split('') : ["C", "h", "i", "r", "a", "g", " ", "D", "e", "w", "a", "n"];
  
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + (i * 0.05),
        duration: 0.6,
        ease: [0.6, 0.01, -0.05, 0.9]
      }
    }),
    hover: {
      y: -15,
      color: "#EC4899",
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  };
  
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
      
      {/* Gradient overlays for depth */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-0"></div>
      
      {/* Custom cursor */}
      <motion.div
        className="custom-cursor fixed z-50 pointer-events-none hidden md:block"
        variants={cursorVariants}
        animate={cursorText ? "text" : isHovered ? "hover" : "default"}
      >
        {cursorText && (
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
            {cursorText}
          </span>
        )}
      </motion.div>
      
      {/* Content container */}
      <motion.div 
        className="container mx-auto px-4 z-10 text-center"
        style={{ opacity }}
      >
        <motion.div className="mb-4 overflow-hidden">
          <motion.h1 className="text-6xl md:text-8xl font-bold tracking-tight inline-flex">
            {nameLetters.map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="inline-block transition-colors duration-300"
                style={{
                  display: 'inline-block',
                  textShadow: '0 0 15px rgba(236, 72, 153, 0.3)'
                }}
                onMouseEnter={() => setCursorText(letter)}
                onMouseLeave={() => setCursorText(null)}
              >
                {letter === " " ? <span>&nbsp;</span> : letter}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>
        
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
              {displayText}
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
        
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-6 mt-8"
        >
          <motion.a 
            href="#projects" 
            className="button-neo px-8 py-4 text-lg font-medium relative overflow-hidden group"
            whileHover="hover"
            variants={buttonVariants}
            onMouseEnter={() => {
              setIsHovered(true);
              setCursorText("View");
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setCursorText(null);
            }}
          >
            <span className="relative z-10 flex items-center">
              View Projects
              <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
          </motion.a>
          
          <motion.a 
            href="#contact" 
            className="px-8 py-4 bg-transparent border border-white/30 rounded-full text-lg font-medium hover:bg-white/10 hover:border-white/50 transition-all"
            whileHover="hover"
            variants={buttonVariants}
            onMouseEnter={() => {
              setIsHovered(true);
              setCursorText("Contact");
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setCursorText(null);
            }}
          >
            Contact Me
          </motion.a>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-8 h-14 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="w-1.5 h-3 bg-pink-500 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
      
      {/* CSS for custom cursor */}
      <style jsx>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedHero;
