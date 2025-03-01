import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectShowcase = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const showcaseRef = useRef(null);
  const isInView = useInView(showcaseRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  const handleNext = () => {
    setDirection('right');
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };
  
  const handlePrev = () => {
    setDirection('left');
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const slideVariants = {
    enter: (direction) => ({
      x: direction === 'right' ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    exit: (direction) => ({
      x: direction === 'right' ? -500 : 500,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    })
  };
  
  const currentProject = projects[activeIndex];
  
  // Tags for the current project
  const getTagClass = (index) => {
    const colors = [
      'bg-pink-500/20 text-pink-300 border-pink-500/30',
      'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'bg-green-500/20 text-green-300 border-green-500/30',
      'bg-amber-500/20 text-amber-300 border-amber-500/30'
    ];
    return colors[index % colors.length];
  };
  
  return (
    <motion.section
      ref={showcaseRef}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="py-20 px-4 overflow-hidden relative"
    >
      {/* Background gradient blobs */}
      <div className="absolute -top-40 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto">
        <motion.div variants={childVariants}>
          <h2 className="text-4xl md:text-5xl font-bold text-center gradient-text mb-16">
            Featured Projects
          </h2>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-8"
            variants={childVariants}
          >
            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 'right' : 'left');
                    setActiveIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex 
                      ? 'bg-pink-500 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Previous project"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                aria-label="Next project"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </motion.div>
          
          <div className="relative overflow-hidden">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid md:grid-cols-2 gap-10 items-center glass-card p-10 rounded-xl backdrop-blur-lg border border-white/10"
            >
              {/* Project Visual */}
              <div className="relative h-[300px] overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                {/* Project icon/visual */}
                <div className="text-9xl opacity-50">
                  {currentProject.category === 'security' ? '🔒' : 
                   currentProject.category === 'analysis' ? '📊' :
                   currentProject.category === 'ml' ? '🧠' : '💻'}
                </div>
                
                {/* Animated code snippets in background */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                  <pre className="text-xs font-mono text-green-400 p-4">
                    {`// ${currentProject.name} 
function analyze() {
  const data = fetchSecureData();
  return processVulnerabilities(data);
}

// Secure implementation
class SecurityModule {
  constructor() {
    this.initialized = true;
    this.patterns = [];
  }
  
  detectAnomaly(packet) {
    return this.patterns.some(
      pattern => pattern.test(packet)
    );
  }
}`}
                  </pre>
                </div>
                
                {/* Category label */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-pink-500/30 text-pink-200 border border-pink-500/40">
                  {currentProject.category.charAt(0).toUpperCase() + currentProject.category.slice(1)}
                </div>
              </div>
              
              {/* Project Info */}
              <div>
                <h3 className="text-3xl font-bold mb-4 gradient-text">{currentProject.name}</h3>
                <p className="text-gray-300 mb-6">{currentProject.description}</p>
                
                {/* Technologies used */}
                <div className="mb-6">
                  <h4 className="text-sm uppercase text-gray-400 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.languages.map((lang, idx) => (
                      <div key={idx} className="flex items-center">
                        <span 
                          className="w-2 h-2 rounded-full mr-1"
                          style={{ 
                            background: `${
                              lang.name === 'Python' ? '#3776AB' :
                              lang.name === 'C' || lang.name === 'C++' ? '#A8B9CC' :
                              lang.name === 'JavaScript' ? '#F7DF1E' :
                              lang.name === 'Docker' ? '#2496ED' :
                              lang.name === 'YARA' ? '#EB4C36' :
                              lang.name === 'TensorFlow' ? '#FF6F00' :
                              lang.name === 'Rust' ? '#DEA584' :
                              lang.name === 'Bash' ? '#4EAA25' :
                              '#9CA3AF'
                            }`
                          }}
                        />
                        <span className="text-sm mr-4">{lang.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="mb-8">
                  <h4 className="text-sm uppercase text-gray-400 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.tags.map((tag, idx) => (
                      <span 
                        key={tag} 
                        className={`px-3 py-1 rounded-full text-xs border ${getTagClass(idx)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* CTA */}
                <Link
                  to={`/projects/${currentProject.id}`}
                  className="button-neo inline-flex items-center"
                >
                  View Project Details
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Project Counter */}
          <motion.div 
            variants={childVariants}
            className="mt-6 text-right text-gray-400"
          >
            <span className="text-pink-500 font-mono">{activeIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{projects.length}</span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectShowcase;
