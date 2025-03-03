import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EnhancedProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Category-based styling
  const getCategoryStyle = (category) => {
    switch (category) {
      case 'security':
        return {
          gradient: 'from-pink-500/20 to-pink-500/5',
          border: 'border-pink-500/20',
          text: 'text-pink-400',
          icon: '🔒'
        };
      case 'analysis':
        return {
          gradient: 'from-blue-500/20 to-blue-500/5',
          border: 'border-blue-500/20',
          text: 'text-blue-400',
          icon: '📊'
        };
      case 'ml':
        return {
          gradient: 'from-purple-500/20 to-purple-500/5',
          border: 'border-purple-500/20',
          text: 'text-purple-400',
          icon: '🧠'
        };
      default:
        return {
          gradient: 'from-gray-500/20 to-gray-500/5',
          border: 'border-gray-500/20',
          text: 'text-gray-400',
          icon: '💻'
        };
    }
  };
  
  const categoryStyle = getCategoryStyle(project.category);
  
  // Language color mapping for visual representation
  const getLanguageColor = (language) => {
    const colorMap = {
      'Python': '#3776AB',
      'C': '#A8B9CC',
      'C++': '#00599C',
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'HTML': '#E34F26',
      'CSS': '#1572B6',
      'React': '#61DAFB',
      'Docker': '#2496ED',
      'Bash': '#4EAA25',
      'YARA': '#EB4C36',
      'TensorFlow': '#FF6F00',
      'Keras': '#D00000',
      'Pandas': '#150458',
      'NumPy': '#013243',
      'Jupyter': '#F37626',
      'Makefile': '#427819',
      'Shell': '#89E051'
    };
    
    return colorMap[language] || '#9CA3AF';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative rounded-xl overflow-hidden h-full transition-all duration-500 bg-gradient-to-br ${categoryStyle.gradient} group shadow-lg`}>
        {/* Top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500/50 to-purple-500/50`}></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Category indicator */}
        <div className="absolute top-4 right-4 z-10 flex items-center">
          <span className={`w-2 h-2 rounded-full mr-2 ${isHovered ? 'animate-pulse' : ''}`} style={{ backgroundColor: getLanguageColor(project.languages[0]?.name || 'Python') }}></span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryStyle.text} bg-black/30 backdrop-blur-sm border ${categoryStyle.border}`}>
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
        </div>
        
        {/* Content */}
        <div className="relative z-10 p-6 backdrop-blur-sm bg-black/60 h-full flex flex-col">
          {/* Project icon */}
          <div className="mb-4 text-4xl">
            {categoryStyle.icon}
          </div>
          
          <h3 className={`text-2xl font-bold mb-3 ${categoryStyle.text} transition-all duration-300 group-hover:text-white`}>
            {project.name}
          </h3>
          
          <p className="text-gray-300 mb-6 line-clamp-3">{project.summary}</p>
          
          {/* Languages */}
          <div className="mb-6 mt-auto">
            <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2">Built with</h4>
            <div className="flex flex-wrap gap-2">
              {project.languages.map((lang) => (
                <div 
                  key={lang.name} 
                  className="flex items-center text-xs bg-black/30 rounded-full px-2 py-1"
                >
                  <span 
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ 
                      backgroundColor: getLanguageColor(lang.name)
                    }}
                  />
                  <span className="text-gray-300">{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          
          {/* View details button */}
          <div className="relative">
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ 
                scaleX: isHovered ? 1 : 0, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.3 }}
            />
            <div className="flex justify-between items-center">
              <motion.div 
                className="flex items-center text-sm font-medium text-white group"
                animate={{ x: isHovered ? 10 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span>View Details</span>
                <svg 
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.div>
              
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${categoryStyle.text} bg-black/50 border ${categoryStyle.border}`}
                animate={{ 
                  rotate: isHovered ? 90 : 0,
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Floating particles */}
        {isHovered && (
          <>
            <div className="absolute top-1/4 right-1/4 w-12 h-12 rounded-full bg-pink-500/10 animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/5 w-8 h-8 rounded-full bg-purple-500/10 animate-pulse"></div>
            <div className="absolute top-1/2 right-1/3 w-6 h-6 rounded-full bg-blue-500/10 animate-pulse"></div>
          </>
        )}
        
        {/* Hover overlay with gradient */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom right, rgba(0,0,0,0), rgba(236,72,153,0.05))'
          }}
        ></div>
      </div>
    </motion.div>
  );
};

export default EnhancedProjectCard;
