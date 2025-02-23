import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const columns = 50;
    const fontSize = 14;
    const columnWidth = window.innerWidth / columns;

    // Clear existing content
    container.innerHTML = '';

    // Create columns
    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.className = 'binary-column';
      column.style.left = `${columnWidth * i}px`;
      column.style.fontSize = `${fontSize}px`;
      column.style.animationDuration = `${Math.random() * 2 + 2}s`;
      
      // Generate random binary string
      const binaryString = Array(30)
        .fill()
        .map(() => Math.random() > 0.5 ? '1' : '0')
        .join('');
      
      column.textContent = binaryString;
      container.appendChild(column);
    }

    // Cleanup
    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="binary-rain-container" />;
};

export default AnimatedBackground;
