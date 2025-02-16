import React from 'react';

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Binary rain effect */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-500 text-xs font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `binaryFall 5s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            01
          </div>
        ))}
      </div>
    </div>
  );
}
