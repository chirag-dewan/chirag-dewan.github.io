import React, { useEffect, useRef } from 'react';

const EnhancedBackground = () => {
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
      
      // Reinitialize nodes when resize
      initializeNodes();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse tracking
    const mouse = {
      x: undefined,
      y: undefined,
      radius: canvas.width < 768 ? 60 : 100,
      active: false
    };
    
    // Handle mouse events
    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };
    
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
        mouse.active = true;
      }
    };
    
    const handleTouchEnd = () => {
      mouse.active = false;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    
    // Node collection
    let nodes = [];
    
    // Calculate number of nodes based on screen size
    const getNodeCount = () => {
      const baseCount = 60;
      const screenSize = Math.min(window.innerWidth, window.innerHeight);
      return Math.max(30, Math.min(100, Math.floor(baseCount * (screenSize / 1000))));
    };
    
    // Color theme - cybersecurity inspired
    const colors = {
      primary: { r: 236, g: 72, b: 153 },    // Pink
      secondary: { r: 168, g: 85, b: 247 },  // Purple
      tertiary: { r: 59, g: 130, b: 246 },   // Blue
      quaternary: { r: 20, g: 184, b: 166 }  // Teal
    };
    
    // Node class with enhanced behavior
    class Node {
      constructor(x, y) {
        // Position
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        
        // Visual properties
        this.size = Math.random() * 3 + 1;
        this.color = this.getRandomColor(0.4);
        this.shadowColor = this.getRandomColor(0.1);
        this.shadowBlur = Math.random() * 15 + 5;
        
        // Movement properties
        this.speed = Math.random() * 0.2 + 0.05;
        this.direction = Math.random() * Math.PI * 2;
        this.moveRange = Math.random() * 2 + 1;
        this.noiseOffset = Math.random() * 1000;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseSize = this.size * (Math.random() * 0.3 + 0.1);
        this.pulsePhase = Math.random() * Math.PI * 2;
        
        // Connection properties
        this.connectionStrength = Math.random() * 0.5 + 0.5;
        this.maxConnections = Math.floor(Math.random() * 3) + 2;
        this.connectRadius = Math.random() * 100 + 75;
      }
      
      // Get a random color from our theme
      getRandomColor(alpha = 1) {
        const colorKeys = Object.keys(colors);
        const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        const color = colors[colorKey];
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
      }
      
      // Update node position and appearance
      update(time) {
        // Gentle independent movement using noise-like pattern
        const t = time * 0.001;
        const moveX = Math.cos(t * this.speed + this.noiseOffset) * this.moveRange;
        const moveY = Math.sin(t * this.speed + this.noiseOffset) * this.moveRange;
        
        this.x = this.baseX + moveX;
        this.y = this.baseY + moveY;
        
        // Pulse size
        const pulse = Math.sin(t * this.pulseSpeed + this.pulsePhase);
        const currentSize = this.size + pulse * this.pulseSize;
        
        // Handle mouse interaction
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply repulsion effect
          if (distance < mouse.radius) {
            const forceDirection = { 
              x: dx / distance,
              y: dy / distance 
            };
            const force = (mouse.radius - distance) / mouse.radius;
            const repulsion = 5;
            
            this.x -= forceDirection.x * force * repulsion;
            this.y -= forceDirection.y * force * repulsion;
          }
        }
        
        // Boundary checks - wrap around
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        // Draw node
        ctx.shadowColor = this.shadowColor;
        ctx.shadowBlur = this.shadowBlur;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      // Connect to nearby nodes
      connectNodes(nodes, time) {
        let connectionsCount = 0;
        
        for (const node of nodes) {
          // Skip self-connection and limit number of connections
          if (node === this || connectionsCount >= this.maxConnections) continue;
          
          const dx = this.x - node.x;
          const dy = this.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < this.connectRadius) {
            connectionsCount++;
            
            // Calculate opacity based on distance
            const opacity = (1 - distance / this.connectRadius) * 0.5 * this.connectionStrength;
            
            // Pulse effect for connection lines
            const t = time * 0.001;
            const pulse = (Math.sin(t + this.pulsePhase) + 1) * 0.1 + 0.1;
            
            // Create gradient for connection
            const gradient = ctx.createLinearGradient(this.x, this.y, node.x, node.y);
            gradient.addColorStop(0, this.color.replace(/[^,]+(?=\))/, opacity * pulse));
            gradient.addColorStop(1, node.color.replace(/[^,]+(?=\))/, opacity * pulse));
            
            // Draw connection
            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Initialize nodes with improved distribution
    const initializeNodes = () => {
      nodes = [];
      const nodeCount = getNodeCount();
      
      // Create a more even distribution using grid-based approach
      const gridSize = Math.sqrt(nodeCount);
      const cellWidth = canvas.width / gridSize;
      const cellHeight = canvas.height / gridSize;
      
      for (let i = 0; i < nodeCount; i++) {
        // Calculate grid position
        const gridX = i % gridSize;
        const gridY = Math.floor(i / gridSize);
        
        // Base position at cell center with some randomness
        const x = (gridX + 0.5) * cellWidth + (Math.random() - 0.5) * cellWidth * 0.8;
        const y = (gridY + 0.5) * cellHeight + (Math.random() - 0.5) * cellHeight * 0.8;
        
        nodes.push(new Node(x, y));
      }
    };
    
    // Initialize nodes
    initializeNodes();
    
    // Animation loop
    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw a subtle gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(13, 13, 13, 1)');
      gradient.addColorStop(1, 'rgba(5, 5, 5, 1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // First draw all node connections
      for (const node of nodes) {
        node.connectNodes(nodes, timestamp);
      }
      
      // Then draw all nodes on top
      for (const node of nodes) {
        node.update(timestamp);
      }
      
      // Continue animation loop
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate(0);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none w-full h-full"
      style={{ background: '#050505' }}
    />
  );
};

export default EnhancedBackground;
