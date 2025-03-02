import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// [Previous HexagonGrid component remains the same]

const SkillHexagon = ({ skillData }) => {
  // State for skill details panel
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  
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
        return getAllSkills().slice(0, 15); // Limit to 15 skills for all category
      }
      return skillData[category] || [];
    };
    
    setSelectedSkills(getCategorySkills(activeCategory));
  }, [skillData, activeCategory]);
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Skills', icon: '💡' },
    { id: 'languages', name: 'Languages', icon: '🐍' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'cloud', name: 'Cloud', icon: '☁️' },
    { id: 'datascience', name: 'Data Science', icon: '📊' }
  ];
  
  return (
    <div className="py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
          Core Competencies
        </h2>
        
        <p className="text-gray-300 max-w-2xl mx-auto">
          A visual representation of my key skills and technologies, with larger hexagons
          indicating higher proficiency levels.
        </p>
        
        {/* Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeCategory === category.id ? 
                'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/20' : 
                'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main hexagon grid */}
        <div className="md:col-span-2">
          {selectedSkills.length > 0 && (
            <HexagonGrid 
              skills={selectedSkills} 
              onSkillSelected={(skill) => setSelectedSkill(skill)}
            />
          )}
        </div>
        
        {/* Skill details panel */}
        <div className="md:col-span-1">
          <div className="glass-card rounded-xl p-6 h-full">
            {selectedSkill ? (
              <div className="flex flex-col h-full">
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
                  
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
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
              </div>
            ) : (
              <div className="flex flex-col h-full justify-center items-center text-center">
                <div className="text-6xl mb-6">👈</div>
                <h3 className="text-xl font-bold text-white mb-4">Skill Details</h3>
                <p className="text-gray-400">
                  Select any hexagon to view detailed information about the skill.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillHexagon;
