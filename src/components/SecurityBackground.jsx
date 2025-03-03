import React, { useEffect, useRef } from 'react';

const SecurityBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create a grid of points
    const gridStep = 40;
    const points = [];
    
    const initializeGrid = () => {
      points.length = 0;
      const rows = Math.ceil(canvas.height / gridStep);
      const cols = Math.ceil(canvas.width / gridStep);
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          // Add some randomness to grid positions
          const x = j * gridStep + (Math.random() * 10 - 5);
          const y = i * gridStep + (Math.random() * 10 - 5);
          
          // Point properties
          points.push({
            x,
            y,
            radius: Math.random() * 1.5 + 0.5,
            color: getRandomColor(0.5),
            connectedPoints: [],
            velocity: {
              x: (Math.random() - 0.5) * 0.3,
              y: (Math.random() - 0.5) * 0.3
            },
            pulseTime: Math.random() * 2 * Math.PI, // Random start phase
            pulseSpeed: 0.05 + Math.random() * 0.05
          });
        }
      }
      
      // Calculate connections between points
      for (const point of points) {
        for (const otherPoint of points) {
          if (point === otherPoint) continue;
          
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Connect close points
          if (distance < gridStep * 1.5) {
            point.connectedPoints.push({
              point: otherPoint,
              distance
            });
          }
        }
      }
    };
    
    // Generate a random color in rgba format
    function getRandomColor(alpha = 1) {
      // Cybersecurity color palette
      const colors = [
        { r: 6, g: 182, b: 212 },   // Cyan
        { r: 219, g: 39, b: 119 },  // Pink
        { r: 124, g: 58, b: 237 },  // Purple
        { r: 56, g: 189, b: 248 }   // Light blue
      ];
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
    }
    
    // Initialize grid
    initializeGrid();
    
    // Track mouse position
    const mouse = {
      x: undefined,
      y: undefined,
      radius: 150
    };
    
    function handleMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Elegant dark background with slight gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      gradient.addColorStop(0, '#0f172a');  // Slate 900
      gradient.addColorStop(1, '#020617');  // Slate 950
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw hexagon grid pattern
      drawHexagonGrid();
      
      // Draw connections first
      ctx.globalAlpha = 0.3;
      for (const point of points) {
        for (const connection of point.connectedPoints) {
          const otherPoint = connection.point;
          const distance = connection.distance;
          
          const maxDistance = gridStep * 1.5;
          const opacity = Math.max(0, (maxDistance - distance) / maxDistance) * 0.5;
          
          ctx.beginPath();
          ctx.strokeStyle = point.color;
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 0.5;
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(otherPoint.x, otherPoint.y);
          ctx.stroke();
        }
      }
      
      // Then draw points
      ctx.globalAlpha = 1;
      for (const point of points) {
        // Update position with slight movement
        point.x += point.velocity.x;
        point.y += point.velocity.y;
        
        // Boundary check with bounce
        if (point.x < 0 || point.x > canvas.width) {
          point.velocity.x *= -1;
        }
        if (point.y < 0 || point.y > canvas.height) {
          point.velocity.y *= -1;
        }
        
        // Mouse interaction - repel points
        if (mouse.x && mouse.y) {
          const dx = mouse.x - point.x;
          const dy = mouse.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;
            
            // Push away from mouse
            point.x -= Math.cos(angle) * force * 3;
            point.y -= Math.sin(angle) * force * 3;
          }
        }
        
        // Pulse effect
        point.pulseTime += point.pulseSpeed;
        const pulseFactor = 0.5 + 0.5 * Math.sin(point.pulseTime);
        const currentRadius = point.radius * (0.8 + pulseFactor * 0.4);
        
        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();
      }
      
      // Draw active data flows
      drawDataFlows();
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    // Draw subtle hexagon grid background
    function drawHexagonGrid() {
      const hexSize = 30;
      const hexWidth = hexSize * Math.sqrt(3);
      const hexHeight = hexSize * 2;
      
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.03)';
      ctx.lineWidth = 1;
      
      const rows = Math.ceil(canvas.height / (hexHeight * 0.75)) + 1;
      const cols = Math.ceil(canvas.width / hexWidth) + 1;
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const x = j * hexWidth + ((i % 2) * hexWidth / 2);
          const y = i * (hexHeight * 0.75);
          
          drawHexagon(x, y, hexSize);
        }
      }
    }
    
    // Helper to draw a single hexagon
    function drawHexagon(x, y, size) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = 2 * Math.PI / 6 * i - Math.PI / 6;
        const xPos = x + size * Math.cos(angle);
        const yPos = y + size * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(xPos, yPos);
        } else {
          ctx.lineTo(xPos, yPos);
        }
      }
      ctx.closePath();
      ctx.stroke();
    }
    
    // Draw animated data flow lines
    function drawDataFlows() {
      // Number of flows based on canvas size
      const flowCount = Math.floor(canvas.width / 300);
      
      for (let i = 0; i < flowCount; i++) {
        // Get time-based position
        const time = performance.now() * 0.001;
        const speed = 0.2 + (i * 0.05);
        const progress = (time * speed) % 1;
        
        // Calculate flow path
        const startX = i * (canvas.width / flowCount) + canvas.width / (flowCount * 2);
        const amplitude = canvas.height / 6;
        const frequency = 2 + i;
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 + i * 0.05})`;
        ctx.lineWidth = 1;
        
        // Draw sine wave path
        for (let x = 0; x < canvas.width; x += 5) {
          const relativeX = x / canvas.width;
          const y = canvas.height / 2 + 
                   Math.sin((relativeX * frequency + time) * Math.PI * 2) * amplitude;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
        
        // Draw data packet
        const packetX = startX + (canvas.width * progress);
        const packetY = canvas.height / 2 + 
                      Math.sin((progress * frequency + time) * Math.PI * 2) * amplitude;
        
        ctx.beginPath();
        ctx.arc(packetX, packetY, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, 0.7)`;
        ctx.fill();
      }
    }
    
    // Start animation
    animate();
    
    // Cleanup
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
      style={{ backgroundColor: '#0f172a' }}
    />
  );
};

export default SecurityBackground;
