import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedHero = ({ name, title, description }) => {
  const canvasRef = useRef(null);
  
  // Canvas animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Handle window resize
    window.addEventListener('resize', setCanvasDimensions);
    setCanvasDimensions();
    
    // Particles setup
    const particlesArray = [];
    const numberOfParticles = Math.min(100, window.innerWidth / 15); // Responsive
    
    // Mouse position tracking for interactivity
    const mouse = {
      x: null,
      y: null,
      radius: 150
    };
    
    window.addEventListener('mousemove', (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.color = this.getRandomColor();
      }
      
      getRandomColor() {
        // Color palette for cybersecurity theme
        const colors = [
          'rgba(236, 72, 153, 0.7)', // Pink
          'rgba(168, 85, 247, 0.7)', // Purple
          'rgba(59, 130, 246, 0.7)', // Blue
          'rgba(20, 184, 166, 0.5)' // Teal
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      
      update() {
        // Calculate distance between particle and mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        
        // Set movement based on distance
        const maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        if (force < 0) force = 0;
        
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;
        
        // Movement effect based on mouse position
        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Return to original position with elastic effect
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY;
            this.y -= dy / 10;
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
          
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = `rgba(236, 72, 153, ${opacityValue})`;
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
      window.removeEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
      });
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
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
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    }
  };
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full -z-10"
      />
      
      {/* Gradient overlays for depth */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-0"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-0"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="mb-4"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 tracking-tight gradient-text text-glow"
          >
            {name || "Chirag Dewan"}
          </motion.h1>
        </motion.div>
        
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="h-16 mb-8"
        >
          <span className="text-2xl md:text-3xl text-gray-300 inline-block">
            {title || "Cyber Research Scientist"}
          </span>
        </motion.div>
        
        <motion.p
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl text-gray-400 italic mb-16 max-w-3xl mx-auto"
        >
          {description || "In the realm of cybersecurity, continuous learning isn't just a choice – it's the foundation of excellence."}
        </motion.p>
        
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="flex flex-wrap justify-center gap-6 mt-8"
        >
          <a href="#projects" className="button-neo px-8 py-4 text-lg font-medium relative overflow-hidden group">
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
          </a>
          
          <a href="#contact" className="px-8 py-4 bg-transparent border border-white/30 rounded-full text-lg font-medium hover:bg-white/10 hover:border-white/50 transition-all">
            Contact Me
          </a>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
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
              className="w-1.5 h-3 bg-white/60 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedHero;
