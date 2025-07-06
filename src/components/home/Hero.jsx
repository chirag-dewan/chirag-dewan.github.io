import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Hero = () => {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollY } = useScroll();
  const isInView = useInView(heroRef, { once: true });
  
  // Parallax effects
  const yParallax = useTransform(scrollY, [0, 800], [0, -200]);
  const opacityParallax = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Mouse tracking for interactive elements
  const handleMouseMove = useCallback((e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
      });
    }
  }, []);

  // Enhanced matrix effect with better performance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    
    // Enhanced character set for cybersecurity theme
    const characters = "01アセキュリティエンジニア10SECURITY0110HACKDEFENDPROTECT";
    const charArray = characters.split('');
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Optimized drops system
    const drops = Array.from({ length: columns }, () => ({
      y: Math.random() * -100,
      speed: Math.random() * 0.5 + 0.3,
      opacity: Math.random() * 0.3 + 0.1
    }));
    
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    
    const draw = (currentTime) => {
      if (currentTime - lastTime < frameInterval) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      
      lastTime = currentTime;
      
      // Create trail effect with better performance
      ctx.fillStyle = "rgba(0, 10, 30, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Dynamic gradient based on scroll position
      const scrollProgress = Math.min(window.scrollY / 500, 1);
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, `rgba(10, 59, 206, ${0.15 + scrollProgress * 0.1})`);
      gradient.addColorStop(0.5, `rgba(64, 113, 227, ${0.25 + scrollProgress * 0.15})`);
      gradient.addColorStop(1, `rgba(10, 59, 206, ${0.15 + scrollProgress * 0.1})`);
      
      ctx.fillStyle = gradient;
      ctx.font = `${fontSize}px 'SF Mono', monospace`;
      
      // Render drops with improved performance
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        ctx.globalAlpha = drop.opacity;
        ctx.fillText(char, i * fontSize, drop.y * fontSize);
        
        // Update drop position
        if (drop.y * fontSize > canvas.height && Math.random() > 0.975) {
          drop.y = 0;
          drop.speed = Math.random() * 0.5 + 0.3;
          drop.opacity = Math.random() * 0.3 + 0.1;
        }
        drop.y += drop.speed;
      }
      
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };
    
    animationId = requestAnimationFrame(draw);
    
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced background effects */}
      <motion.canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: opacityParallax }}
      />
      
      {/* Interactive floating elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)`
        }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 bg-blue-500/20 rounded-full blur-sm`}
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
            }}
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: i * 0.5 }}
          />
        ))}
      </motion.div>

      {/* Main content */}
      <motion.div 
        className="container-apple relative z-10"
        style={{ y: yParallax }}
      >
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Status badges with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <motion.div 
              className="group px-6 py-3 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                <i className="fas fa-shield-alt mr-2 text-blue-500"></i>
                Cyber Research Engineer I at RTX BBN
              </span>
            </motion.div>
            <motion.div 
              className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-semibold text-white">
                <i className="fas fa-code mr-2"></i>
                SWE II at GM Financial (Starting Soon)
              </span>
            </motion.div>
          </motion.div>
          
          {/* Enhanced title with typing effect */}
          <div className="space-y-4">
            <motion.h1 
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight"
            >
              <span className="block text-gray-900">Chirag Dewan</span>
            </motion.h1>
            
            <motion.div
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative"
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold">
                <motion.span 
                  className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Security Researcher
                </motion.span>
                <motion.span 
                  className="block text-gray-700 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  & Engineer
                </motion.span>
              </h2>
            </motion.div>
          </div>
          
          {/* Enhanced description */}
          <motion.p 
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-8 text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Specializing in{' '}
            <motion.span 
              className="font-semibold text-blue-600"
              whileHover={{ scale: 1.05 }}
            >
              vulnerability discovery
            </motion.span>
            ,{' '}
            <motion.span 
              className="font-semibold text-purple-600"
              whileHover={{ scale: 1.05 }}
            >
              reverse engineering
            </motion.span>
            , and securing critical infrastructure systems
          </motion.p>
          
          {/* Enhanced action buttons */}
          <motion.div 
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center">
                View Projects
                <motion.i 
                  className="fas fa-arrow-right ml-2"
                  animate={isHovered ? { x: 5 } : { x: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 font-semibold rounded-full border border-gray-200 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center">
                <i className="fas fa-download mr-2"></i>
                Download Resume
              </span>
            </motion.a>
          </motion.div>
          
          {/* Enhanced expertise showcase */}
          <motion.div 
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-20"
          >
            <p className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wider">
              Areas of Expertise
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
              {[
                { icon: "shield-alt", name: "Vulnerability Research", color: "text-red-500" },
                { icon: "bug", name: "Exploit Development", color: "text-orange-500" },
                { icon: "microchip", name: "Reverse Engineering", color: "text-purple-500" },
                { icon: "code", name: "Secure Coding", color: "text-green-500" },
                { icon: "network-wired", name: "SCADA Security", color: "text-blue-500" }
              ].map((tech, index) => (
                <motion.div 
                  key={tech.name}
                  className="group flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + (index * 0.1), duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.i 
                    className={`fas fa-${tech.icon} text-2xl ${tech.color} mb-2`}
                    whileHover={{ rotate: 10, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors text-center">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.button
          type="button"
          aria-label="Scroll to experience section"
          className="w-6 h-10 border-2 border-gray-400 rounded-full p-1 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            document.querySelector('#experience')?.scrollIntoView({
              behavior: 'smooth'
            });
          }}
        >
          <motion.div
            className="w-1 h-3 bg-gray-600 rounded-full mx-auto"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
        <p className="text-sm text-gray-500 mt-2 text-center">Scroll to explore</p>
      </motion.div>

      {/* Dynamic background gradients */}
      <motion.div
        className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, delay: 5 }}
      />
    </section>
  );
};

export default Hero;
