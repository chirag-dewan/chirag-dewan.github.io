import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const HexagonGrid = ({ skills, onSkillSelected }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  // Calculate optimal layout for hexagons
  const calculateGridPositions = () => {
    const radiusFactors = [0, 1, 1.8, 2.6, 3.4, 4.2]; // Distance factors for each ring
    const positions = [];
    let currentRing = 0;
    let skillsPlaced = 0;
    
    // Place center hexagon
    if (skillsPlaced < skills.length) {
      positions.push({ 
        x: 0, 
        y: 0, 
        ring: currentRing,
        scale: 1.2, // Center is bigger
        delay: 0,
        skill: skills[skillsPlaced] 
      });
      skillsPlaced++;
    }
    
    // Place remaining hexagons in rings
    while (skillsPlaced < skills.length) {
      currentRing++;
      
      // Calculate number of hexagons in current ring
      // Each ring can fit 6 * ring hexagons
      const hexagonsInRing = Math.min(6 * currentRing, skills.length - skillsPlaced);
      
      if (hexagonsInRing <= 0) break;
      
      // Place hexagons evenly around the ring
      for (let i = 0; i < hexagonsInRing; i++) {
        if (skillsPlaced >= skills.length) break;
        
        const angle = (2 * Math.PI * i) / hexagonsInRing;
        const radius = radiusFactors[currentRing] || 5;
        
        // Calculate position based on angle and radius
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        // Calculate scale based on ring (closer rings are larger)
        const ringScale = 1 - (currentRing * 0.1);
        const scale = Math.max(0.7, ringScale);
        
        positions.push({ 
          x, 
          y, 
          ring: currentRing,
          scale,
          delay: 0.1 + (currentRing * 0.05) + (i * 0.02),
          skill: skills[skillsPlaced] 
        });
        
        skillsPlaced++;
      }
    }
    
    return positions;
  };
  
  const gridPositions = calculateGridPositions();
  
  // Function to calculate gradient based on skill level and category
  const getGradientStyle = (skill) => {
    const category = skill.category || 'default';
    
    const gradients = {
      'language': { from: '#EC4899', to: '#D946EF' },  // Pink to fuchsia
      'security': { from: '#A855F7', to: '#8B5CF6' },  // Purple to violet
      'cloud': { from: '#3B82F6', to: '#6366F1' },     // Blue to indigo
      'datascience': { from: '#10B981', to: '#059669' }, // Emerald to green
      'default': { from: '#6D28D9', to: '#4F46E5' }    // Purple to indigo
    };
    
    const colors = gradients[category] || gradients.default;
    return {
      background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
      boxShadow: `0 0 20px rgba(${category === 'language' ? '236, 72, 153' : 
                                    category === 'security' ? '168, 85, 247' : 
                                    category === 'cloud' ? '59, 130, 246' : 
                                    category === 'datascience' ? '16, 185, 129' : 
                                    '109, 40, 217'}, 0.3)`
    };
  };
  
  // Handle skill selection
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    if (onSkillSelected) {
      onSkillSelected(skill);
    }
  };
  
  // Animations for staggered grid appearance
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
  
  const hexVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -30
    },
    visible: (custom) => ({
      opacity: 1,
      scale: custom.scale,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: custom.delay,
        duration: 0.8
      }
    })
  };
  
  // Calculate hexagon size (in rem)
  const baseHexSize = 5; // 5rem base size
  
  return (
    <motion.div
      ref={gridRef}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="w-full min-h-[600px] py-8 relative flex items-center justify-center"
    >
      {/* Hexagons */}
      <div 
        className="relative w-full h-[600px] flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {gridPositions.map((position, index) => {
          const skill = position.skill;
          const isHovered = hoveredSkill === skill.name;
          const isSelected = selectedSkill && selectedSkill.name === skill.name;
          
          // Calculate size based on skill level (higher level = larger hexagon)
          const sizeScale = 1 + ((skill.level - 70) / 100); // Scale from 0.9 to 1.3 based on skill level
          const finalSize = baseHexSize * position.scale * sizeScale;
          
          // Get gradient colors
          const gradientStyle = getGradientStyle(skill);
          
          return (
            <motion.div
              key={skill.name}
              custom={position}
              variants={hexVariants}
              className="absolute transform-gpu"
              style={{ 
                left: '50%', 
                top: '50%',
                x: `calc(${position.x}rem - 50%)`,
                y: `calc(${position.y}rem - 50%)`,
                zIndex: isHovered ? 10 : isSelected ? 5 : 1
              }}
            >
              <motion.div 
                className="relative cursor-pointer"
                whileHover={{ 
                  scale: 1.15,
                  zIndex: 20,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={() => handleSkillClick(skill)}
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Hexagon with 3D effect */}
                <motion.div 
                  className="hex relative flex items-center justify-center will-change-transform"
                  style={{
                    width: `${finalSize}rem`,
                    height: `${finalSize * 0.866}rem`,
                    ...gradientStyle,
                    transformStyle: "preserve-3d",
                    transform: isHovered ? 'translateZ(10px) rotateX(10deg)' : 'translateZ(0) rotateX(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                  animate={{
                    boxShadow: isHovered ? `0 10px 30px rgba(${
                      skill.category === 'language' ? '236, 72, 153' : 
                      skill.category === 'security' ? '168, 85, 247' : 
                      skill.category === 'cloud' ? '59, 130, 246' : 
                      skill.category === 'datascience' ? '16, 185, 129' : 
                      '109, 40, 217'}, 0.5)` : gradientStyle.boxShadow
                  }}
                >
                  <div className="flex flex-col items-center justify-center text-center z-10 p-2">
                    <motion.div 
                      className="text-2xl mb-1"
                      animate={{
                        scale: isHovered ? 1.2 : 1,
                        y: isHovered ? -5 : 0
                      }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {skill.icon}
                    </motion.div>
                    
                    <motion.div 
                      className="text-white text-sm font-bold"
                      animate={{
                        scale: isHovered ? 1.1 : 1
                      }}
                    >
                      {skill.name}
                    </motion.div>
                    
                    {/* Skill level indicator */}
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0,
                        height: isHovered ? 'auto' : 0
                      }}
                      className="mt-1 w-16 overflow-hidden"
                    >
                      <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: isHovered ? `${skill.level}%` : '0%' }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="h-full bg-white"
                        ></motion.div>
                      </div>
                      <div className="text-xs mt-1 text-white/80">{skill.level}%</div>
                    </motion.div>
                  </div>
                </motion.div>
                
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
                      background: `linear-gradient(135deg, ${gradientStyle.background.split(',')[1]}, ${gradientStyle.background.split(',')[2].replace(')', '')})`,
                      width: `${finalSize}rem`, 
                      height: `${finalSize * 0.866}rem`,
                    }}
                  />
                )}
                
                {/* Skill details popup on hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 transform -translate-x-1/2 mt-4 bg-gray-900/90 backdrop-blur-md p-4 rounded-lg shadow-lg w-64 z-30 border border-gray-700"
                    style={{ top: `${finalSize * 0.866}rem` }}
                  >
                    <div className="text-center mb-4">
                      <span className="text-xl font-bold text-white">{skill.name}</span>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <div className="text-pink-400 text-sm font-mono">{skill.level}%</div>
                        <div className="text-gray-400 text-xs ml-2">
                          {skill.level >= 90 ? 'Expert' : 
                          skill.level >= 80 ? 'Advanced' : 
                          skill.level >= 70 ? 'Intermediate' : 'Familiar'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-800 h-2 rounded-full mb-3">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: gradientStyle.background }}
                      ></motion.div>
                    </div>
                    
                    <p className="text-sm text-gray-300">{skill.description}</p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 px-3 py-1 text-xs border border-gray-700 rounded-full text-gray-300 hover:bg-gray-800 w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSkillClick(skill);
                      }}
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Connected lines between hexagons */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <g>
          {gridPositions.map((pos1, i) => (
            // Connect to nearby hexagons
            gridPositions.slice(i + 1).map((pos2, j) => {
              // Calculate distance between hexagons
              const dx = pos1.x - pos2.x;
              const dy = pos1.y - pos2.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              // Only connect if they're close enough
              if (distance < 3) {
                // Calculate opacity based on distance
                const opacity = 0.1 * (1 - distance / 3);
                
                // Calculate center positions
                const x1 = 50 + pos1.x * 16; // Convert rem to percentage for SVG
                const y1 = 50 + pos1.y * 16;
                const x2 = 50 + pos2.x * 16;
                const y2 = 50 + pos2.y * 16;
                
                return (
                  <motion.line
                    key={`line-${i}-${j}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isInView ? opacity : 0 }}
                    transition={{ delay: Math.max(pos1.delay, pos2.delay) + 0.3 }}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="url(#skillGradient)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    className="animate-dash"
                  />
                );
              }
              return null;
            }).filter(Boolean)
          ))}
        </g>
        <defs>
          <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* CSS for hexagon shape and animations */}
      <style jsx>{`
        .hex {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: 20;
          }
        }
        
        .animate-dash {
          animation: dash 20s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

const SkillHexagon = ({ skillData }) => {
  // State for skill details panel
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const detailsRef = useRef(null);
  
  // Process skill data to get skills for the selected category
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
      
      // Sort by level descending
      return allSkills.sort((a, b) => b.level - a.level);
    };
    
    const getCategorySkills = (category) => {
      if (category === 'all') {
        return getAllSkills().slice(0, 15); // Limit to 15 skills for all categories
      }
      return skillData[category] || [];
    };
    
    setSelectedSkills(getCategorySkills(activeCategory));
  }, [skillData, activeCategory]);
  
  // Handle skill selection
  const handleSkillSelected = (skill) => {
    // Scroll to details section if on mobile
    if (detailsRef.current && window.innerWidth < 768) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    setSelectedSkill(skill);
  };
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Skills', icon: '💡' },
    { id: 'languages', name: 'Languages', icon: '🐍' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'cloud', name: 'Cloud', icon: '☁️' },
    { id: 'datascience', name: 'Data Science', icon: '📊' }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="py-12 px-4">
      <motion.div 
        className="text-center mb-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold gradient-text mb-6"
          variants={itemVariants}
        >
          Core Competencies
        </motion.h2>
        
        <motion.p 
          className="text-gray-300 max-w-2xl mx-auto mb-10"
          variants={itemVariants}
        >
          A visual representation of my key skills and technologies, with larger hexagons
          indicating higher proficiency levels.
        </motion.p>
        
        {/* Category filter buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-8"
          variants={itemVariants}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === category.id ? 
                'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/20' : 
                'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(236, 72, 153, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
              custom={index * 0.1}
            >
              <span>{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main hexagon grid */}
        <div className="md:col-span-2">
          {selectedSkills.length > 0 && (
            <HexagonGrid 
              skills={selectedSkills} 
              onSkillSelected={handleSkillSelected}
            />
          )}
        </div>
        
        {/* Skill details panel */}
        <div className="md:col-span-1" ref={detailsRef}>
          <motion.div 
            className="glass-card rounded-xl p-6 h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              height: selectedSkill ? 'auto' : '100%'
            }}
            transition={{ 
              duration: 0.5,
              layout: { type: "spring", damping: 30, stiffness: 500 }
            }}
            layout
          >
            {selectedSkill ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                      <span>{selectedSkill.icon}</span>
                      {selectedSkill.name}
                    </h3>
                    <div className="text-gray-400 text-sm">
                      {selectedSkill.category.charAt(0).toUpperCase() + selectedSkill.category.slice(1)}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedSkill(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </div>
                
                {/* Skill proficiency meter */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 text-sm">Proficiency</span>
                    <span className="text-white font-bold">{selectedSkill.level}%</span>
                  </div>
                  
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ 
                        background: `linear-gradient(to right, 
                          ${selectedSkill.category === 'language' ? '#EC4899' : 
                           selectedSkill.category === 'security' ? '#A855F7' : 
                           selectedSkill.category === 'cloud' ? '#3B82F6' : 
                           selectedSkill.category === 'datascience' ? '#10B981' : 
                           '#6D28D9'}, 
                          ${selectedSkill.category === 'language' ? '#D946EF' : 
                           selectedSkill.category === 'security' ? '#8B5CF6' : 
                           selectedSkill.category === 'cloud' ? '#6366F1' : 
                           selectedSkill.category === 'datascience' ? '#059669' : 
                           '#4F46E5'})`
                      }}
                    ></motion.div>
                  </div>
                  
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Advanced</span>
                    <span>Expert</span>
                  </div>
                </div>
                
                {/* Skill description */}
                <div className="mb-6">
                  <h4 className="text-sm uppercase text-gray-400 mb-2">About this skill</h4>
                  <p className="text-gray-300">{selectedSkill.description}</p>
                </div>
                
                {/* Projects related to this skill */}
                <div className="mt-auto">
                  <h4 className="text-sm uppercase text-gray-400 mb-2">Related Projects</h4>
                  <div className="space-y-2">
                    {selectedSkill.category === 'language' && selectedSkill.name === 'Python' && (
                      <>
                        <a href="#malware-analysis-tool" className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                          <div className="font-medium text-white">Malware Analysis Tool</div>
                          <div className="text-sm text-gray-400">Python-based framework for malware analysis</div>
                        </a>
                        <a href="#ids-project" className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                          <div className="font-medium text-white">ML-Based IDS</div>
                          <div className="text-sm text-gray-400">Machine learning for intrusion detection</div>
                        </a>
                      </>
                    )}
                    
                    {selectedSkill.category === 'language' && selectedSkill.name === 'C/C++' && (
                      <a href="#packet-prowler" className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                        <div className="font-medium text-white">Packet Prowler</div>
                        <div className="text-sm text-gray-400">C-based network packet analyzer</div>
                      </a>
                    )}
                    
                    {selectedSkill.category === 'security' && (
                      <a href="#projects" className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                        <div className="font-medium text-white">Security Projects</div>
                        <div className="text-sm text-gray-400">View all security-related projects</div>
                      </a>
                    )}
                    
                    {selectedSkill.category === 'cloud' && (
                      <a href="#projects" className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                        <div className="font-medium text-white">Cloud Infrastructure Projects</div>
                        <div className="text-sm text-gray-400">View all cloud-related projects</div>
                      </a>
                    )}
                    
                    {selectedSkill.category === 'datascience' && (
                      <a href="#ids-project" className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
                        <div className="font-medium text-white">ML-Based IDS</div>
                        <div className="text-sm text-gray-400">Machine learning for intrusion detection</div>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col h-full justify-center items-center text-center"
              >
                <div className="text-6xl mb-6">👈</div>
                <h3 className="text-xl font-bold text-white mb-4">Skill Details</h3>
                <p className="text-gray-400">
                  Select any hexagon to view detailed information about the skill.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SkillHexagon;
