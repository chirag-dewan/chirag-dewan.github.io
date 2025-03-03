import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillsShowcase = ({ skills, title = "Technical Skills" }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();
  
  // Set initial active category
  useEffect(() => {
    if (skills && skills.length > 0 && !activeCategory) {
      setActiveCategory(skills[0].category);
    }
  }, [skills, activeCategory]);
  
  // Animate when in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  // No skills provided
  if (!skills || skills.length === 0) {
    return <div>No skills data available</div>;
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Get skills for active category
  const activeSkills = skills.find(cat => cat.category === activeCategory)?.skills || [];
  
  // Get skill level color
  const getSkillLevelColor = (level) => {
    if (level >= 90) return 'bg-gradient-to-r from-pink-500 to-purple-500';
    if (level >= 80) return 'bg-gradient-to-r from-purple-500 to-blue-500';
    if (level >= 70) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    return 'bg-gradient-to-r from-cyan-500 to-teal-500';
  };
  
  // Skill level label
  const getSkillLevelLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Proficient';
    if (level >= 60) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="py-12 px-4"
    >
      <motion.h2 
        variants={itemVariants}
        className="text-3xl md:text-4xl font-bold text-center mb-8"
      >
        <span className="bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h2>
      
      {/* Category tabs */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {skills.map((category) => (
          <button
            key={category.category}
            onClick={() => setActiveCategory(category.category)}
            className={`px-5 py-2 rounded-full transition-all duration-300 ${
              activeCategory === category.category 
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/20' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            {category.category}
          </button>
        ))}
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Skills grid */}
        <div className="md:col-span-2">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {activeSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                custom={index}
                className={`p-4 rounded-xl transition-all duration-300 cursor-pointer backdrop-blur-sm bg-black/60 border border-white/10 hover:border-pink-500/20 ${
                  activeSkill?.name === skill.name ? 'border-pink-500/50 shadow-lg shadow-pink-500/10' : ''
                }`}
                onClick={() => setActiveSkill(skill)}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.15)' 
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{skill.icon}</div>
                  <div>
                    <h3 className="text-white font-medium">{skill.name}</h3>
                    <div className="text-xs text-gray-400 mt-1">{getSkillLevelLabel(skill.level)}</div>
                  </div>
                </div>
                
                {/* Skill bar */}
                <div className="h-1.5 bg-gray-800/50 rounded-full mb-2 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${getSkillLevelColor(skill.level)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-400 mb-4">
                  <span>0%</span>
                  <span>{skill.level}%</span>
                </div>
                
                <p className="text-gray-400 text-sm line-clamp-2">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Skill detail panel */}
        <motion.div 
          variants={itemVariants}
          className="relative rounded-xl overflow-hidden backdrop-blur-md h-full bg-gradient-to-br from-gray-900/80 to-black/80 border border-white/10"
        >
          {activeSkill ? (
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="text-6xl mr-4">{activeSkill.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{activeSkill.name}</h3>
                    <div className="text-sm text-pink-400 bg-pink-500/10 px-2 py-1 rounded-full inline-flex border border-pink-500/20">
                      {getSkillLevelLabel(activeSkill.level)} ({activeSkill.level}%)
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setActiveSkill(null)}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              {/* Skill description */}
              <div className="mb-6">
                <p className="text-gray-300">{activeSkill.description}</p>
              </div>
              
              {/* Skill level visualization */}
              <div className="mb-6">
                <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Proficiency Level</h4>
                <div className="h-2.5 bg-gray-800 rounded-full mb-3 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${getSkillLevelColor(activeSkill.level)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${activeSkill.level}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                
                <div className="grid grid-cols-5 text-xs">
                  <div className="text-center">
                    <div className="mb-1 w-1 h-2 bg-gray-600 mx-auto"></div>
                    <span className="text-gray-500">20%</span>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 w-1 h-2 bg-gray-600 mx-auto"></div>
                    <span className="text-gray-500">40%</span>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 w-1 h-2 bg-gray-600 mx-auto"></div>
                    <span className="text-gray-500">60%</span>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 w-1 h-2 bg-gray-600 mx-auto"></div>
                    <span className="text-gray-500">80%</span>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 w-1 h-2 bg-gray-600 mx-auto"></div>
                    <span className="text-gray-500">100%</span>
                  </div>
                </div>
              </div>
              
              {/* Related projects */}
              {activeSkill.projects && activeSkill.projects.length > 0 && (
                <div className="mt-auto">
                  <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Related Projects</h4>
                  <div className="space-y-2">
                    {activeSkill.projects.map(project => (
                      <div key={project} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="font-medium text-white">{project}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 h-full flex flex-col items-center justify-center text-center">
              <div className="text-6xl mb-6">👈</div>
              <h3 className="text-xl font-bold text-white mb-4">Skill Details</h3>
              <p className="text-gray-400">
                Select any skill to view detailed information.
              </p>
            </div>
          )}
          
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillsShowcase;
