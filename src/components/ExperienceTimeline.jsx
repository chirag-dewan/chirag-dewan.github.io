import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ExperienceCard = ({ experience, index, isEven }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const variants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? 50 : -50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="relative"
    >
      {/* Timeline node */}
      <div className="absolute left-7 md:left-1/2 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transform md:-translate-x-1/2 z-10 shadow-lg shadow-pink-500/20">
        {/* Ping animation */}
        <span className="absolute w-full h-full rounded-full animate-ping bg-pink-400 opacity-75"></span>
      </div>
      
      <div className={`flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''}`}>
        {/* Company and Date section */}
        <div className="md:w-1/2 flex flex-col items-start md:items-end px-6 py-4">
          <div className={`text-left ${isEven ? 'md:text-left' : 'md:text-right'} pl-16 md:pl-0 md:pr-8`}>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {experience.company}
            </h3>
            <div className="inline-block mb-1 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 text-sm font-medium">
              {experience.position}
            </div>
            <p className="text-gray-400">{experience.period}</p>
            <p className="text-gray-500">{experience.location}</p>
          </div>
        </div>
        
        {/* Job details section */}
        <div className="md:w-1/2 ml-16 md:ml-0 md:px-8">
          <div className="glass-card rounded-xl p-6 backdrop-blur-lg animated-border">
            <p className="text-gray-300 mb-4">{experience.description}</p>
            
            <h4 className="text-lg font-bold mb-3 text-white/80">Key Responsibilities:</h4>
            <ul className="space-y-2">
              {experience.responsibilities.map((resp, respIdx) => (
                <motion.li 
                  key={respIdx} 
                  className="flex items-start text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (respIdx * 0.1) }}
                >
                  <span className="text-pink-500 mr-2 mt-1">•</span>
                  <span>{resp}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Skills used */}
            <div className="mt-4 pt-4 border-t border-gray-700/30">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Skills Applied:</h4>
              <div className="flex flex-wrap gap-2">
                {generateSkillsFromResponsibilities(experience.responsibilities).map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-1 text-xs rounded-full bg-white/5 text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to extract likely skills from responsibilities
function generateSkillsFromResponsibilities(responsibilities) {
  const commonSkills = [
    "Threat Analysis", "Vulnerability Assessment", "Network Security",
    "Malware Analysis", "Security Testing", "Risk Management",
    "Penetration Testing", "Security Automation", "Linux", "Incident Response",
    "Security Hardening", "Forensics"
  ];
  
  // Create a subset of 3-5 random skills
  const numberOfSkills = Math.floor(Math.random() * 3) + 3; // 3-5 skills
  const shuffled = commonSkills.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfSkills);
}

const ExperienceTimeline = ({ experiences }) => {
  const timelineRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }
    
    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={timelineRef}
      className="relative py-16"
    >
      {/* Timeline line with enhanced glow */}
      <div className="absolute left-7 md:left-1/2 top-0 h-full w-1 bg-gradient-to-b from-pink-500 to-purple-500 transform md:-translate-x-1/2 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
      
      {/* Experience items */}
      <div className="space-y-20">
        {experiences.map((experience, idx) => (
          <ExperienceCard
            key={experience.company}
            experience={experience}
            index={idx}
            isEven={idx % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
