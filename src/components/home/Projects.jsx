import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const ProjectCard = ({ project, index, inView }) => {
  return (
    <div 
      className="card hoverable overflow-hidden h-full flex flex-col"
      style={{ 
        transitionDelay: inView ? `${index * 0.1}s` : '0s',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease'
      }}
    >
      {/* Project image/icon placeholder */}
      <div className="h-48 bg-apple-gray-100 flex items-center justify-center">
        <span className="text-5xl">
          {project.category === 'security' ? '🔒' : 
           project.category === 'analysis' ? '📊' :
           project.category === 'ml' ? '🧠' : '💻'}
        </span>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-apple-gray-900">{project.name}</h3>
          <span className="px-2 py-1 bg-apple-gray-100 text-apple-gray-700 rounded-full text-xs">
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
        </div>
        
        <p className="mt-3 text-apple-gray-600 flex-grow">{project.summary}</p>
        
        {/* Languages */}
        <div className="mt-6 space-y-2">
          {project.languages.map(lang => (
            <div key={lang.name} className="flex items-center">
              <span className="w-24 text-sm text-apple-gray-700">{lang.name}</span>
              <div className="skill-bar flex-1">
                <div 
                  className="skill-progress" 
                  style={{ width: `${lang.percentage}%` }}
                ></div>
              </div>
              <span className="ml-3 text-xs text-apple-gray-500">{lang.percentage}%</span>
            </div>
          ))}
        </div>
        
        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-apple-gray-100 text-apple-gray-700 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* View on GitHub link */}
        <div className="mt-6">
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-apple-blue-500 hover:text-apple-blue-600 transition-colors"
          >
            View on GitHub
            <i className="fas fa-external-link-alt ml-2 text-xs"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Project categories
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'security', name: 'Security Tools' },
    { id: 'analysis', name: 'Analysis' },
    { id: 'ml', name: 'Machine Learning' }
  ];

  const projects = [
    {
      id: "packet-prowler",
      name: "Packet Prowler",
      summary: "A C-based network packet sniffer leveraging libpcap for real-time traffic capture and detailed protocol analysis.",
      description: "Developed from scratch to provide lightweight yet powerful packet analysis capabilities. Supports multiple interfaces, BPF filtering, and custom output formats for integration with other security tools.",
      category: "security",
      languages: [
        { name: "C", percentage: 85 },
        { name: "Makefile", percentage: 10 },
        { name: "Shell", percentage: 5 }
      ],
      tags: ["C", "Networking", "Security", "Analysis"],
      github: "https://github.com/chirag-dewan/Packet-Prowler"
    },
    {
      id: "algorithmic-trading-test",
      name: "Algorithmic Trading Test",
      summary: "A Python-based trading strategy that predicts next-day High/Low values using candlestick patterns and rolling indicators.",
      description: "Combines technical analysis with machine learning to predict price movements. Uses historical data patterns and technical indicators to generate trading signals with configurable risk parameters.",
      category: "analysis",
      languages: [
        { name: "Python", percentage: 90 },
        { name: "Jupyter", percentage: 10 }
      ],
      tags: ["Python", "ML", "Finance", "Analysis"],
      github: "https://github.com/chirag-dewan/Algorithmic-Trading-Test-HighLow"
    },
    {
      id: "malware-analysis-tool",
      name: "Malware Analysis Tool",
      summary: "A modular Python framework unifying static, behavioral, memory, and network forensics with machine learning classification.",
      description: "Comprehensive malware analysis suite built with security and isolation in mind. Features Docker containerization for safe execution and integrates with YARA and other analysis tools for multi-layered detection.",
      category: "security",
      languages: [
        { name: "Python", percentage: 75 },
        { name: "Docker", percentage: 15 },
        { name: "YARA", percentage: 10 }
      ],
      tags: ["Python", "Security", "ML", "Docker"],
      github: "https://github.com/chirag-dewan/malware-analysis-tool"
    },
    {
      id: "ids-project",
      name: "ML-Based Intrusion Detection System",
      summary: "An intelligent IDS leveraging machine learning to detect network intrusions with high accuracy using synthetic and real-world datasets.",
      description: "Next-generation intrusion detection combining signature and anomaly-based approaches. Uses ensemble learning methods to minimize false positives while maintaining high detection rates for novel attacks.",
      category: "ml",
      languages: [
        { name: "Python", percentage: 80 },
        { name: "TensorFlow", percentage: 15 },
        { name: "Bash", percentage: 5 }
      ],
      tags: ["Python", "ML", "Security", "Network"],
      github: "https://github.com/chirag-dewan/IDS-MachineLearningTest"
    }
  ];

  // Filter projects based on selected category
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="section bg-white">
      <div className="container-apple">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="heading-md text-apple-gray-900">Featured Projects</h2>
          <p className="mt-4 text-lg text-apple-gray-600 max-w-3xl mx-auto">
            A showcase of my work in cybersecurity, machine learning, and software development
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-apple-gray-900 text-white shadow-apple-sm'
                  : 'bg-white text-apple-gray-700 hover:bg-apple-gray-100 border border-apple-gray-200'
              }`}
              style={{ 
                transitionDelay: inView ? `${index * 0.1}s` : '0s',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <div 
          className="mt-16 bg-apple-gray-50 rounded-apple-xl p-8 text-center"
          style={{ 
            transitionDelay: inView ? '0.6s' : '0s',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease'
          }}
        >
          <h3 className="text-2xl font-display font-bold text-apple-gray-900 mb-4">Explore More Projects</h3>
          <p className="text-lg text-apple-gray-600 max-w-2xl mx-auto mb-8">
            These highlighted projects represent my focused work in cybersecurity and analysis. Visit my GitHub to discover more projects, contributions, and code experiments.
          </p>
          <a 
            href="https://github.com/chirag-dewan" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
          >
            <i className="fab fa-github mr-2"></i>
            Visit GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
