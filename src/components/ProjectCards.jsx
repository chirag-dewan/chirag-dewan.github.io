import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Background patterns based on project category
  const getPatternClass = (category) => {
    switch(category) {
      case 'security':
        return 'bg-[radial-gradient(ellipse_at_top_right,rgba(236,72,153,0.1),transparent_70%)]';
      case 'analysis':
        return 'bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.1),transparent_70%)]';
      case 'ml':
        return 'bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.1),transparent_70%)]';
      default:
        return '';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Link
        to={`/projects/${project.id}`}
        className={`block h-full glass-card rounded-xl overflow-hidden transition-all duration-500 ${getPatternClass(project.category)}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card header */}
        <div className="relative overflow-hidden">
          {/* Category indicator */}
          <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-medium ${
            project.category === 'security' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' :
            project.category === 'analysis' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
            project.category === 'ml' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
            'bg-gray-500/20 text-gray-300 border border-gray-500/30'
          }`}>
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </div>
          
          {/* Project icon/image */}
          <div className="h-48 flex items-center justify-center p-6 bg-gradient-to-br from-gray-900 to-black">
            <div className={`text-7xl ${
              isHovered ? 'scale-110 transform' : ''
            } transition-transform duration-500`}>
              {project.category === 'security' ? '🔒' : 
               project.category === 'analysis' ? '📊' :
               project.category === 'ml' ? '🧠' : '💻'}
            </div>
            
            {/* Animated background dots */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white"
                  style={{ 
                    top: `${Math.random() * 100}%`, 
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.25
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Card content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-pink-400 transition-colors">
            {project.name}
          </h3>
          
          <p className="text-gray-300 mb-4 line-clamp-3">{project.summary}</p>
          
          {/* Technologies */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.languages.slice(0, 3).map((lang) => (
                <div 
                  key={lang.name} 
                  className="flex items-center text-xs"
                >
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
                  {lang.name}
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
          </div>
          
          {/* View details button */}
          <div className="flex justify-end mt-2">
            <span className="inline-flex items-center text-sm font-medium text-pink-400 group">
              View Details
              <svg 
                className={`w-4 h-4 ml-1 ${isHovered ? 'translate-x-1' : ''} transition-transform duration-300`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectsGrid = ({ projects, filter = 'all' }) => {
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter || project.tags.includes(filter));
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredProjects.map((project, index) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          index={index}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;
