import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedDivider = ({ delay = 0, color = "blue" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        width: ['0%', '100%', '40%'],
        opacity: [0, 1, 1],
        transition: { duration: 1.5, delay }
      });
    }
  }, [inView, controls, delay]);

  return (
    <div className="flex justify-center items-center py-20 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute w-full">
        <div className="absolute left-1/4 -translate-x-1/2 w-20 h-20 bg-blue-500/5 rounded-full blur-xl"></div>
        <div className="absolute right-1/4 translate-x-1/2 w-16 h-16 bg-purple-500/5 rounded-full blur-xl"></div>
      </div>
      
      {/* Main divider */}
      <motion.div
        ref={ref}
        animate={controls}
        initial={{ width: '0%', opacity: 0 }}
        className={`h-px ${color === 'blue' ? 'bg-apple-blue-500' : 'bg-white'}`}
      />
      
      {/* Decorative elements */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.6 }}
        className={`absolute w-4 h-4 rounded-full ${color === 'blue' ? 'bg-apple-blue-500/30' : 'bg-white/30'}`}
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.8 }}
        className={`absolute w-2 h-2 rounded-full ${color === 'blue' ? 'bg-apple-blue-500' : 'bg-white'}`}
      />
    </div>
  );
};

export default AnimatedDivider;
