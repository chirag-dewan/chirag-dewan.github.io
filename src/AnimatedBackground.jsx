import React, { useEffect } from 'react';

const AnimatedBackground = () => {
  useEffect(() => {
    const container = document.createElement('div');
    container.className = 'binary-rain-container';
    document.body.prepend(container);

    const columns = 25;
    for (let i = 0; i < columns; i++) {
      const stream = document.createElement('div');
      stream.className = 'binary-stream';
      stream.style.left = `${i * 4}%`;
      stream.style.animationDelay = `${Math.random() * 2}s`;

      for (let j = 0; j < 30; j++) {
        const char = document.createElement('span');
        char.className = 'binary-char';
        char.textContent = Math.random() > 0.5 ? '1' : '0';
        char.style.animationDelay = `${j * 0.1}s`;
        stream.appendChild(char);
      }

      container.appendChild(stream);
    }

    return () => {
      container.remove();
    };
  }, []);

  return null;
};

export default AnimatedBackground;
