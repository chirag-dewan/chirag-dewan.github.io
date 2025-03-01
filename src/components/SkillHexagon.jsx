import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HexagonGrid = ({ skills }) => {
  // To store the positions of hexagons
  const [hexPositions, setHexPositions] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Calculate hexagon positions
  useEffect(() => {
    const numSkills = skills.length;
    const radius = Math.min(window.innerWidth * 0.25, 300); // Responsive radius
    const positions = [];
    
    // Central hex
    positions.push({ x: 0, y: 0 });
    
    // First ring - 6 hexagons
    const firstRingCount = Math.min(6, numSkills - 1);
    for (let i = 0; i < firstRingCount; i++) {
      const angle = (Math.PI / 3) * i;
      positions.push({
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
      });
    }
    
    // Second ring if needed - 12 hexagons
    if (numSkills > 7) {
      const secondRingCount = Math.min(12, numSkills - 7);
      const secondRadius = radius * 1.75;
      for (let i = 0; i < secondRingCount; i++) {
        const angle = (Math.PI / 6) * i;
        positions.push({
          x: secondRadius * Math.cos(angle),
          y: secondRadius * Math.sin(angle)
        });
      }
    }
    
    setHexPositions(positions.slice(0, numSkills));
  }, [skills]);
  
  // Function to calculate gradient based on skill level
  const getGradient = (level) => {
    if (level >= 90) return 'from-pink-500 to-purple-500';
    if (level >= 80) return 'from-purple-500 to-indigo-500';
    if (level >= 70) return 'from-blue-500 to-cyan-500';
    return 'from-green-500 to-emerald-500';
  };
  
  // Function to calculate size based on skill level
  const getHexSize = (level) => {
    // Base size for reference (will be scaled based on level)
    const baseSize = Math.min(window.innerWidth / 12, 70);
    return baseSize * (0.8 + (level / 100) * 0.4); // Scale between 80% and 120% of base size
  };
  
  return (
    <div className="w-full py-10">
      <div className="relative flex items-center justify-center mx-auto" style={{ height: '60vh', maxHeight: '600px', minHeight: '400px' }}>
        {hexPositions.map((position, index) => {
          const skill = skills[index];
          const hexSize = getHexSize(skill.level);
          const isCenter = index === 0;
          const gradient = getGradient(skill.level);
          
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0, rotate: -30 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: 0,
                x: position.x,
                y: position.y,
                transition: { 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }
              }}
              whileHover={{ 
                scale: 1.15,
                zIndex: 10, 
                transition: { duration: 0.2 }
              }}
              className="absolute"
              style={{ marginLeft: -hexSize / 2, marginTop: -hexSize / 2 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Hexagon Container */}
              <div 
                className={`hex-container flex items-center justify-center ${hoveredIndex === index ? 'z-10' : 'z-0'}`}
                style={{ 
                  width: `${hexSize}px`, 
                  height: `${hexSize * 1.1547}px` // Hexagon height ratio
                }}
              >
                {/* Hexagon Background */}
                <div 
                  className={`hex-bg absolute inset-0 bg-gradient-to-br ${gradient} opacity-${isCenter ? '90' : '70'}`}
                ></div>
                
                {/* Hexagon Content */}
                <div className="hex-content relative z-10 flex flex-col items-center justify-center text-center p-2">
                  <div className="text-2xl mb-1">{skill.icon}</div>
                  <div className="text-white text-xs font-bold overflow-hidden text-ellipsis">
                    {skill.name}
                  </div>
                  
                  {/* Only show level indicator for hovered hexagon */}
                  {hoveredIndex === index && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-1 w-12 h-1 bg-white/30 rounded-full overflow-hidden"
                    >
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="h-full bg-white"
                      ></motion.div>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Skill details popup on hover */}
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900/90 backdrop-blur-sm p-3 rounded-lg shadow-lg w-48 z-20 border border-gray-700"
                  style={{ top: hexSize * 0.6 }}
                >
                  <div className="text-center mb-2">
                    <span className="text-lg font-bold">{skill.name}</span>
                    <div className="flex items-center justify-center gap-1">
                      <div className="text-pink-400 text-sm">{skill.level}%</div>
                      <div className="text-gray-400 text-xs">
                        {skill.level >= 90 ? 'Expert' : 
                         skill.level >= 80 ? 'Advanced' : 
                         skill.level >= 70 ? 'Intermediate' : 'Familiar'}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300">{skill.description}</p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      
      {/* CSS for hexagon shape */}
      <style jsx>{`
        .hex-container {
          position: relative;
        }
        
        .hex-bg {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        .hex-content {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
  );
};

const SkillHexagon = ({ skillData }) => {
  // Process skill data to get a mix of skills from different categories
  const [selectedSkills, setSelectedSkills] = useState([]);
  
  useEffect(() => {
    if (!skillData) return;
    
    // Function to get top skills from each category
    const getTopSkills = () => {
      // Get categories (excluding certifications and certRoadmap)
      const categories = Object.keys(skillData).filter(
        key => key !== 'certifications' && key !== 'certRoadmap'
      );
      
      // Prepare an array to hold all skills
      let allSkills = [];
      
      // Add the top 3 skills from each category
      categories.forEach(category => {
        const categorySkills = skillData[category]
          .sort((a, b) => b.level - a.level)
          .slice(0, 3)
          .map(skill => ({ ...skill, category }));
        
        allSkills = [...allSkills, ...categorySkills];
      });
      
      // Sort all skills by level and take top 19 (1 central + 6 inner ring + 12 outer ring)
      return allSkills
        .sort((a, b) => b.level - a.level)
        .slice(0, 19);
    };
    
    setSelectedSkills(getTopSkills());
  }, [skillData]);
  
  return (
    <div className="py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
          Core Competencies
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          A visual representation of my key skills and technologies, with larger hexagons indicating higher proficiency levels.
        </p>
      </div>
      
      {selectedSkills.length > 0 && <HexagonGrid skills={selectedSkills} />}
    </div>
  );
};

export default SkillHexagon;
