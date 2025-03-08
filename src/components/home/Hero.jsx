import React from 'react';

const Hero = () => {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-24 relative overflow-hidden">
      <div className="container-apple">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading-xl text-apple-gray-900 animate-fade-in-up">
            <span className="block">Chirag Dewan</span>
            <span className="block text-apple-gray-600 mt-3 text-3xl sm:text-4xl md:text-5xl">
              Software Engineer II
            </span>
          </h1>
          <p className="mt-6 text-xl text-apple-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Pioneering advanced security solutions through innovative research and cutting-edge technology
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
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
          </div>
        </div>
      </div>
      
      {/* Decorative elements inspired by Apple's design */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-apple-gray-50 to-white -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-apple-gray-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute top-[400px] left-1/4 w-[300px] h-[300px] bg-apple-gray-50 rounded-full blur-2xl opacity-30 -z-10"></div>
      <div className="absolute top-[200px] right-1/4 w-[400px] h-[400px] bg-apple-gray-50 rounded-full blur-2xl opacity-30 -z-10"></div>
      
      {/* Apple-style scrolldown indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-sm" style={{ animationDelay: '1s' }}>
        <span className="text-sm text-apple-gray-500 mb-2">Scroll to discover</span>
        <i className="fas fa-chevron-down text-apple-gray-400"></i>
      </div>
    </section>
  );
};

export default Hero;
