import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      {Array.from({ length: 25 }).map((_, i) => (
        <div 
          key={i} 
          className="binary-stream"
          style={{
            left: `${i * 4}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          {Array.from({ length: 30 }).map((_, j) => (
            <span 
              key={j}
              className="binary-char"
              style={{ animationDelay: `${j * 0.1}s` }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
