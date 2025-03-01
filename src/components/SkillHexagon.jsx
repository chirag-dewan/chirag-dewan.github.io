import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HexagonGrid = ({ skills }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  // Calculate hexagon positions in a more visually appealing layout
  const calculateHexPositions = () => {
    // Define a specific order for prominent skills to be more centrally located
    const centerSkills = ['Python', 'Ghidra', 'C/C++', 'AWS'];
    
    // Sort skills to put important ones in center positions
    const sortedSkills = [...skills].sort((a, b) => {
      const aIndex = centerSkills.indexOf(a.name);
      const bIndex = centerSkills.indexOf(b.name);
      
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return b.level - a.level; // Otherwise sort by skill level
    });
    
    return sortedSkills;
  };

  const sortedSkills = calculateHexPositions();
  
  // Function to calculate gradient based on skill level and category
  const getGradient = (skill) => {
    const category = skill.category || 'default';
    
    const gradients = {
      'language': { from: '#EC4899', to: '#D946EF' },  // Pink to fuchsia
      'security': { from: '#A855F7', to: '#8B5CF6' },  // Purple to violet
      'cloud': { from: '#3B82F6', to: '#6366F1' },     // Blue to indigo
      'datascience': { from: '#10B981', to: '#059669' }, // Emerald to green
      'default': { from: '#6D28D9', to: '#4F46E5' }    // Purple to indigo
    };
    
    const colors = gradients[category] || gradients.default;
    return `linear-gradient(135deg, ${colors.from}, ${colors.to})`;
  };
  
  return (
    <div className="w-full min-h-[500px] py-8 relative flex items-center justify-center">
      {/* Floating hexagons */}
      <div className="flex flex-wrap justify-center items-center max-w-4xl mx-auto gap-8 py-8">
        {sortedSkills.map((skill, index) => {
          // Calculate size based on skill level (higher level = larger hexagon)
          const size = 80 + (skill.level * 0.4);
          const isHovered = hoveredSkill === skill.name;
          
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 0.5, 
                  delay: index * 0.05,
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
              className="relative"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Hexagon */}
              <div 
                className="hex relative flex items-center justify-center" 
                style={{ 
                  width: `${size}px`, 
                  height: `${size * 0.866}px`,
                  background: getGradient(skill),
                  transition: "all 0.3s ease"
                }}
              >
                <div className="flex flex-col items-center justify-center text-center z-10 p-2">
                  <div className="text-2xl mb-1">{skill.icon}</div>
                  <div className="text-white text-sm font-bold">{skill.name}</div>
                  
                  {/* Show level indicator on hover */}
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-1 w-12 h-1 bg-white/30 rounded-full overflow-hidden"
                    >
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-white"
                      ></motion.div>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Pulse effect on hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ 
                    opacity: [0, 0.2, 0],
                    scale: [1, 1.4, 1.8]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  className="absolute inset-0 hex"
                  style={{ 
                    background: getGradient(skill),
                    width: `${size}px`, 
                    height: `${size * 0.866}px`,
                  }}
                />
              )}
              
              {/* Skill details popup on hover */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 transform -translate-x-1/2 mt-4 bg-gray-900/90 backdrop-blur-md p-3 rounded-lg shadow-lg w-48 z-20 border border-gray-700"
                  style={{ top: `${size * 0.866}px` }}
                >
                  <div className="text-center mb-2">
                    <span className="text-lg font-bold text-white">{skill.name}</span>
                    <div className="flex items-center justify-center gap-1">
                      <div className="text-pink-400 text-sm font-mono">{skill.level}%</div>
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
        .hex {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
      `}</style>
    </div>
  );
};

const SkillHexagon = ({ skillData }) => {
  // Process skill data to get a mix of skills from different categories
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  
  useEffect(() => {
    if (!skillData) return;
    
    const getAllSkills = () => {
      // Get categories (excluding certifications and certRoadmap)
      const categories = Object.keys(skillData).filter(
        key => key !== 'certifications' && key !== 'certRoadmap'
      );
      
      // Prepare an array to hold all skills
      let allSkills = [];
      
      // Add skills from each category
      categories.forEach(category => {
        const categorySkills = skillData[category]
          .map(skill => ({ ...skill, category }));
        
        allSkills = [...allSkills, ...categorySkills];
      });
      
      return allSkills;
    };
    
    const getCategorySkills = (category) => {
      if (category === 'all') {
        return getAllSkills().slice(0, 12); // Limit to 12 skills for all categories
      }
      return skillData[category] || [];
    };
    
    setSelectedSkills(getCategorySkills(activeCategory));
  }, [skillData, activeCategory]);
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'languages', name: 'Languages' },
    { id: 'security', name: 'Security' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'datascience', name: 'Data Science' }
  ];
  
  return (
    <div className="py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
          Core Competencies
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          A visual representation of my key skills and technologies, with larger hexagons
          indicating higher proficiency levels.
        </p>
        
        {/* Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id ? 
                'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/20' : 
                'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {selectedSkills.length > 0 && <HexagonGrid skills={selectedSkills} />}
    </div>
  );
};

export default SkillHexagon;
