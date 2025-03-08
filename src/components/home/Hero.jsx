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
              Software Engineer II at GM Financial
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-apple-gray-600 max-w-3xl mx-auto"
          >
            Building innovative software solutions from Dallas, TX
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
        </div>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-apple-gray-50 to-white -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-apple-blue-500/5 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute top-[400px] left-1/4 w-[300px] h-[300px] bg-apple-gray-50 rounded-full blur-2xl opacity-30 -z-10"></div>
      <div className="absolute top-[200px] right-1/4 w-[400px] h-[400px] bg-apple-blue-500/5 rounded-full blur-2xl opacity-30 -z-10"></div>
      
      {/* Animated geometric shapes */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-40 right-16 w-32 h-32 bg-apple-blue-500/20 rounded-xl blur-xl -z-10"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-20 left-16 w-24 h-24 bg-apple-blue-500/20 rounded-full blur-xl -z-10"
      ></motion.div>
    </section>
  );
};

export default Hero;
