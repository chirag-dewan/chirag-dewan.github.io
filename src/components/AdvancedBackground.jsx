import React, { useEffect, useRef } from 'react';

const AdvancedBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set initial dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reinitialize particles when resize
      initParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Set up mouse tracking
    const mouse = {
      x: undefined,
      y: undefined,
      radius: 150
    };
    
    // Handle mouse movement
    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Particle collection
    let particles = [];
    
    // Calculate number of particles based on screen size
    const getParticleCount = () => {
      const baseCount = 70;
      const screenFactor = Math.min(window.innerWidth, window.innerHeight) / 1000;
      return Math.floor(baseCount * screenFactor) + 50;
    };
    
    // Particle class with enhanced behavior
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.density = Math.random() * 30 + 10;
        this.angle = Math.random() * 360;
        this.speed = Math.random() * 0.2 + 0.1;
        this.uniqueColor = this.getRandomColor();
        
        // Add slight movement even when not interacting with mouse
        this.amplitude = Math.random() * 2 + 1;
        this.period = Math.random() * 0.2 + 0.1;
        this.timeOffset = Math.random() * 100;
      }
      
      getRandomColor() {
        // Create a palette of cybersecurity-themed colors
        const colors = [
          {r: 236, g: 72, b: 153, a: 0.7},  // Pink
          {r: 168, g: 85, b: 247, a: 0.7},  // Purple
          {r: 59, g: 130, b: 246, a: 0.5},  // Blue
          {r: 20, g: 184, b: 166, a: 0.5}   // Teal
        ];
        
        const selectedColor = colors[Math.floor(Math.random() * colors.length)];
        return `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, ${selectedColor.a})`;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.uniqueColor;
        ctx.fill();
      }
      
      update(time) {
        // Mouse interaction logic
        if (mouse.x !== undefined && mouse.y !== undefined) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Repulsion effect when mouse is near
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            
            this.x -= forceDirectionX * force * this.density * 0.05;
            this.y -= forceDirectionY * force * this.density * 0.05;
          } else {
            // Gentle autonomous movement using sinusoidal patterns
            const t = time * 0.001 + this.timeOffset;
            
            // Circular motion around base position
            const offsetX = Math.cos(t * this.period) * this.amplitude;
            const offsetY = Math.sin(t * this.period) * this.amplitude;
            
            this.x = this.baseX + offsetX;
            this.y = this.baseY + offsetY;
            
            // Gradually return to base position if pushed too far by mouse
            const distFromBase = Math.sqrt(
              Math.pow(this.x - this.baseX, 2) + 
              Math.pow(this.y - this.baseY, 2)
            );
            
            if (distFromBase > 50) {
              this.x += (this.baseX - this.x) * 0.01;
              this.y += (this.baseY - this.y) * 0.01;
            }
          }
        }
        
        this.draw();
      }
    }
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      const particleCount = getParticleCount();
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    
    // Draw connections between particles
    const connectParticles = (time) => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Adjust connection distance based on screen size
          const maxDistance = Math.min(canvas.width, canvas.height) / 8;
          
          if (distance < maxDistance) {
            // Calculate connection opacity based on distance
            const opacity = 1 - (distance / maxDistance);
            
            // Create gradient for line
            const gradient = ctx.createLinearGradient(
              particles[a].x, 
              particles[a].y, 
              particles[b].x, 
              particles[b].y
            );
            
            // Pulsing effect for connections
            const pulse = (Math.sin(time * 0.001) + 1) * 0.1 + 0.1;
            
            // Extract colors from particle unique colors for the gradient
            const colorA = particles[a].uniqueColor;
            const colorB = particles[b].uniqueColor;
            
            gradient.addColorStop(0, colorA.replace(/[^,]+(?=\))/, opacity * pulse));
            gradient.addColorStop(1, colorB.replace(/[^,]+(?=\))/, opacity * pulse));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop with time parameter
    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      particles.forEach(particle => {
        particle.update(time);
      });
      
      // Connect particles
      connectParticles(time);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    initParticles();
    animate(0);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 pointer-events-none" 
      style={{ 
        background: 'linear-gradient(135deg, #050505, #0a0a0a 50%, #0c0c0c)',
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%'
      }}
    />
  );
};

export default AdvancedBackground;
