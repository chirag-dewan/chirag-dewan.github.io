import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const canvasRef = useRef(null);
  
  // Particle animation background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(64, 113, 227, ${Math.random() * 0.3})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.size > 0.2) this.size -= 0.01;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      // Draw connecting lines between nearby particles
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(64, 113, 227, ${0.1 * (1 - distance/100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-32 relative overflow-hidden">
      {/* Particle animation background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10"
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
                <span className="text-sm font-medium text-apple-gray-600">Software Engineer II at GM Financial</span>
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
                className="block text-apple-blue-500 mt-3 text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-apple-blue-500 to-apple-blue-600"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
              >
                Building Digital Solutions
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-xl text-apple-gray-600 max-w-3xl mx-auto"
            >
              Dallas-based software engineer specializing in scalable solutions that combine technical excellence with exceptional user experiences
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
          
          {/* Tech stack */}
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
                Tech Stack:
              </motion.span>
              
              {[
                { icon: "fab fa-react", name: "React" },
                { icon: "fab fa-java", name: "Java" },
                { icon: "fab fa-js-square", name: "JavaScript" },
                { icon: "fab fa-python", name: "Python" },
                { icon: "fab fa-aws", name: "AWS" }
              ].map((tech, index) => (
                <motion.div 
                  key={tech.name}
                  className="flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + (index * 0.1) }}
                >
                  <i className={`${tech.icon} text-lg text-apple-gray-700 mr-2`}></i>
                  <span className="text-apple-gray-700 font-medium text-sm hidden sm:inline">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative gradient shapes */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-apple-blue-500/10 rounded-full filter blur-3xl opacity-50 -z-5"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-tr from-apple-blue-500/10 to-apple-green/10 rounded-full filter blur-3xl opacity-40 -z-5"></div>
    </section>
  );
};

export default Hero;
