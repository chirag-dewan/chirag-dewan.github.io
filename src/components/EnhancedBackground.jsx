import React, { useEffect, useRef } from 'react';

const EnhancedBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas to full window size
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Handle window resize
    window.addEventListener('resize', setCanvasDimensions);
    setCanvasDimensions();
    
    // Particles setup
    const particlesArray = [];
    const numberOfParticles = Math.min(100, window.innerWidth / 15); // Responsive particle count
    
    // Mouse position tracking for interactivity
    const mouse = {
      x: undefined,
      y: undefined,
      radius: 150
    };
    
    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.color = this.getRandomColor();
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      
      getRandomColor() {
        // Color palette for cybersecurity theme
        const colors = [
          'rgba(236, 72, 153, 0.7)', // Pink
          'rgba(168, 85, 247, 0.7)', // Purple
          'rgba(59, 130, 246, 0.5)', // Blue
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
        if (mouse.x !== undefined && mouse.y !== undefined) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            
            // Apply force based on distance
            this.x -= forceDirectionX * force * this.density * 0.6;
            this.y -= forceDirectionY * force * this.density * 0.6;
          } else {
            // Gentle autonomous movement even without mouse interaction
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Boundary check with slight bounce effect
            if (this.x > canvas.width || this.x < 0) {
              this.speedX = -this.speedX * 0.8;
            }
            if (this.y > canvas.height || this.y < 0) {
              this.speedY = -this.speedY * 0.8;
            }
            
            // Gradual return to original position when away from mouse
            if (Math.abs(this.x - this.baseX) > 50 || Math.abs(this.y - this.baseY) > 50) {
              this.x += (this.baseX - this.x) * 0.01;
              this.y += (this.baseY - this.y) * 0.01;
            }
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
    
    // Connect particles with lines when they are close
    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only connect particles within a certain distance
          const connectionDistance = (canvas.width / 7);
          
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            
            // Create a gradient for the line
            const gradient = ctx.createLinearGradient(
              particlesArray[a].x, 
              particlesArray[a].y, 
              particlesArray[b].x, 
              particlesArray[b].y
            );
            
            gradient.addColorStop(0, `rgba(236, 72, 153, ${opacity * 0.5})`); // Pink
            gradient.addColorStop(1, `rgba(168, 85, 247, ${opacity * 0.5})`); // Purple
            
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
    
    // Initialize and start animation
    init();
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        background: 'linear-gradient(to bottom, #050505, #0a0a0a)'
      }}
    />
  );
};

export default EnhancedBackground;
