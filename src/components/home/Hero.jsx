import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 relative overflow-hidden">
      <div className="container-apple">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="heading-xl text-apple-gray-900"
          >
            <span className="block">Chirag Dewan</span>
            <span className="block text-apple-gray-600 mt-3 text-3xl sm:text-4xl md:text-5xl">
              Software Engineer II
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-apple-gray-600 max-w-3xl mx-auto"
          >
            Crafting robust security solutions at the intersection of research and cutting-edge technology
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#projects"
              className="btn-primary"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="btn-secondary"
            >
              Contact Me
            </a>
          </motion.div>
          
          {/* Dark-themed story narrative */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 p-6 bg-apple-gray-900 rounded-apple-lg text-white max-w-2xl mx-auto shadow-apple-lg"
          >
            <p className="text-apple-gray-200 italic">
              "In a digital landscape filled with vulnerabilities, I hunt for the gaps that others miss. 
              Every line of code tells a story—and sometimes, that story reveals a critical weakness."
            </p>
            <div className="mt-4 text-sm text-apple-gray-400 text-right">
              — The Security Engineer's Manifesto
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements inspired by Apple's design */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-apple-gray-50 to-white -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-apple-gray-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute top-[400px] left-1/4 w-[300px] h-[300px] bg-apple-gray-50 rounded-full blur-2xl opacity-30 -z-10"></div>
      <div className="absolute top-[200px] right-1/4 w-[400px] h-[400px] bg-apple-gray-50 rounded-full blur-2xl opacity-30 -z-10"></div>
    </section>
  );
};

export default Hero;
