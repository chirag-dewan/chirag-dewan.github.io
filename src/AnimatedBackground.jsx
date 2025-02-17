import React from 'react';

export default function AnimatedBackground() {
  return (
    <div className="binary-rain-container">
      {Array.from({ length: 30 }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        return (
          <div
            key={i}
            className="binary-rain-drop"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
            }}
          >
            01
          </div>
        );
      })}
    </div>
  );
}
