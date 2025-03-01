import React, { useEffect, useRef } from 'react';

const ParticleNetwork = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Resize handler for responsive canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Particle properties
    const particlesArray = [];
    const numberOfParticles = Math.min(100, window.innerWidth / 20); // Responsive number of particles
    
    // Mouse position tracking for interactivity
    const mouse = {
      x: null,
      y: null,
      radius: 150
    };
    
    window.addEventListener('mousemove', function(event) {
      mouse.x = event.x;
      mouse.y = event.y;
    });
    
    // Create particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(${Math.floor(Math.random() * 80) + 200}, ${Math.floor(Math.random() * 50) + 50}, ${Math.floor(Math.random() * 100) + 150}, ${Math.random() * 0.5 + 0.2})`;
      }
      
      update() {
        // Movement
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Boundary check with wrap-around
        if (this.x > canvas.width) {
          this.x = 0;
        } else if (this.x < 0) {
          this.x = canvas.width;
        }
        
        if (this.y > canvas.height) {
          this.y = 0;
        } else if (this.y < 0) {
          this.y = canvas.height;
        }
        
        // Mouse interaction - particles are pushed away from cursor
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          
          const directionX = forceDirectionX * force * 1.5;
          const directionY = forceDirectionY * force * 1.5;
          
          this.speedX -= directionX * 0.01;
          this.speedY -= directionY * 0.01;
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Initialize particles
    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    // Connect particles with lines when they are close enough
    function connect() {
      let opacityValue = 1;
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only connect particles within a certain distance
          const maxDistance = canvas.width < 768 ? 100 : 150; // Responsive connection distance
          
          if (distance < maxDistance) {
            opacityValue = 1 - (distance / maxDistance);
            
            // Create a gradient for the line color
            const gradient = ctx.createLinearGradient(
              particlesArray[a].x, 
              particlesArray[a].y, 
              particlesArray[b].x, 
              particlesArray[b].y
            );
            
            gradient.addColorStop(0, `rgba(236, 72, 153, ${opacityValue * 0.3})`); // Pink
            gradient.addColorStop(1, `rgba(168, 85, 247, ${opacityValue * 0.3})`); // Purple
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      connect();
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    init();
    animate();
    
    // Cleanup function to prevent memory leaks
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
      });
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none bg-transparent"
    />
  );
};

export default ParticleNetwork;
