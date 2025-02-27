import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Projects() {
  // Animation tracking
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef({});
  
  // Category filter state
  const [activeFilter, setActiveFilter] = useState('all');

  // Register section for animation
  const registerSection = (id, ref) => {
    if (ref && !sectionsRef.current[id]) {
      sectionsRef.current[id] = ref;
    }
  };

  // Setup intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionsRef.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Project categories
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'security', name: 'Security Tools' },
    { id: 'analysis', name: 'Analysis' },
    { id: 'ml', name: 'Machine Learning' }
  ];

  // Enhanced project data with more details
  const personalProjects = [
    {
      id: "packet-prowler",
      name: "Packet Prowler",
      summary: "A C-based network packet sniffer leveraging libpcap for real-time traffic capture and detailed protocol analysis.",
      description: "Developed from scratch to provide lightweight yet powerful packet analysis capabilities. Supports multiple interfaces, BPF filtering, and custom output formats for integration with other security tools.",
      demoLink: "#",
      tags: ["C", "Networking", "Security", "Analysis"],
      category: "security",
      languages: [
        { name: "C", percentage: 85 },
        { name: "Makefile", percentage: 10 },
        { name: "Shell", percentage: 5 }
      ],
      features: [
        "Live packet capture across network interfaces",
        "Protocol filtering (TCP, UDP, ICMP, etc.)",
        "Deep packet inspection capabilities",
        "Extensible modular architecture"
      ],
      challenge: "Implementing efficient memory management for high-throughput network environments while maintaining low CPU overhead."
    },
    {
      id: "algorithmic-trading-test-highlow",
      name: "Algorithmic Trading Test HighLow",
      summary: "A Python-based trading strategy that predicts next-day High/Low values using candlestick patterns and rolling indicators.",
      description: "Combines technical analysis with machine learning to predict price movements. Uses historical data patterns and technical indicators to generate trading signals with configurable risk parameters.",
      demoLink: "#",
      tags: ["Python", "ML", "Finance", "Analysis"],
      category: "analysis",
      languages: [
        { name: "Python", percentage: 90 },
        { name: "Jupyter", percentage: 10 }
      ],
      features: [
        "Candlestick pattern recognition engine",
        "Dynamic data fetching via yfinance API",
        "Adaptive retraining based on market conditions",
        "Backtesting framework with performance metrics"
      ],
      challenge: "Balancing model complexity against overfitting while maintaining reasonable execution speed for real-time market analysis."
    },
    {
      id: "malware-research-tool",
      name: "Malware Analysis Tool",
      summary: "A modular Python framework unifying static, behavioral, memory, and network forensics with machine learning classification.",
      description: "Comprehensive malware analysis suite built with security and isolation in mind. Features Docker containerization for safe execution and integrates with YARA and other analysis tools for multi-layered detection.",
      demoLink: "#",
      tags: ["Python", "Security", "ML", "Docker"],
      category: "security",
      languages: [
        { name: "Python", percentage: 75 },
        { name: "Docker", percentage: 15 },
        { name: "YARA", percentage: 10 }
      ],
      features: [
        "Multi-sandbox malware detonation environment",
        "Static, dynamic, and memory forensics integration",
        "ML-based malware family classification",
        "Comprehensive threat reporting"
      ],
      challenge: "Creating a secure isolation framework that prevents malware escape while still collecting comprehensive behavioral telemetry."
    },
    {
      id: "ids-project",
      name: "ML-Based Intrusion Detection System",
      summary: "An intelligent IDS leveraging machine learning to detect network intrusions with high accuracy using synthetic and real-world datasets.",
      description: "Next-generation intrusion detection combining signature and anomaly-based approaches. Uses ensemble learning methods to minimize false positives while maintaining high detection rates for novel attacks.",
      demoLink: "#",
      tags: ["Python", "ML", "Security", "Network"],
      category: "ml",
      languages: [
        { name: "Python", percentage: 80 },
        { name: "TensorFlow", percentage: 15 },
        { name: "Bash", percentage: 5 }
      ],
      features: [
        "Real-time traffic analysis and classification",
        "Ensemble model approach (Random Forest, Gradient Boosting)",
        "Anomaly detection for zero-day threats",
        "Tunable sensitivity with explainable results"
      ],
      challenge: "Training models on heavily imbalanced datasets while ensuring detection of rare but critical attack patterns."
    }
  ];

  // Filter projects based on selected category
  const filteredProjects = activeFilter === 'all' 
    ? personalProjects 
    : personalProjects.filter(project => project.category === activeFilter || project.tags.includes(activeFilter));

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section 
        id="projects-hero" 
        ref={el => registerSection('projects-hero', el)} 
        className="text-center mb-20"
      >
        <div className={`transition-all duration-700 ${isVisible['projects-hero'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Project Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            A collection of projects showcasing expertise in cybersecurity, machine learning, and network analysis.
          </p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === category.id 
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium shadow-lg' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section 
        id="projects-grid"
        ref={el => registerSection('projects-grid', el)}
        className="mb-20"
      >
        <div className={`grid md:grid-cols-2 gap-10 transition-all duration-700 ${
          isVisible['projects-grid'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          {filteredProjects.map((project, idx) => (
            <Link
              to={`/projects/${project.id}`}
              key={project.id}
              className="glass rounded-xl border border-white/10 hover:border-pink-500/30 overflow-hidden transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl group"
              style={{ 
                transitionDelay: `${idx * 0.1}s`,
                background: 'linear-gradient(to bottom right, rgba(255,255,255,0.03), rgba(255,255,255,0.01))'
              }}
            >
              {/* Project Header */}
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-pink-900/20 to-purple-900/20">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-pink-400 transition-colors">{project.name}</h3>
                <p className="text-gray-300">{project.summary}</p>
              </div>
              
              {/* Project Details */}
              <div className="p-6">
                {/* Languages */}
                <div className="mb-6">
                  <h4 className="text-sm text-gray-400 mb-3">Technologies Used</h4>
                  <div className="space-y-2">
                    {project.languages.map(lang => (
                      <div key={lang.name} className="flex items-center">
                        <span className="w-20 text-sm">{lang.name}</span>
                        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden ml-2">
                          <div 
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                            style={{ width: `${lang.percentage}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs text-gray-400">{lang.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Technical Challenge */}
                <div className="mb-6">
                  <h4 className="text-sm text-gray-400 mb-1">Key Challenge</h4>
                  <p className="text-sm text-gray-300">{project.challenge}</p>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 rounded-full text-xs bg-pink-500/10 text-pink-400 border border-pink-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* View Details Button */}
                <div className="mt-6 text-right">
                  <span className="inline-flex items-center gap-2 text-pink-500 group-hover:text-pink-400 transition-colors">
                    View Details
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* GitHub CTA */}
      <section 
        id="github-cta"
        ref={el => registerSection('github-cta', el)}
      >
        <div className={`transition-all duration-700 ${
          isVisible['github-cta'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="glass p-10 rounded-xl border border-white/10 text-center mb-12 bg-gradient-to-br from-black to-pink-950/10">
            <h3 className="text-2xl font-bold mb-4">Explore More Projects</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              These highlighted projects represent my focused work in cybersecurity and analysis. Visit my GitHub to discover more projects, contributions, and code experiments.
            </p>
            <a 
              href="https://github.com/chirag-dewan" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-lg hover:scale-105 transition-all shadow-lg shadow-pink-900/20"
            >
              Visit GitHub Profile
            </a>
          </div>
        </div>
      </section>
      
      {/* Skills Showcase */}
      <section 
        id="skills-showcase"
        ref={el => registerSection('skills-showcase', el)}
        className="mb-12"
      >
        <div className={`transition-all duration-700 ${
          isVisible['skills-showcase'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h2 className="text-2xl font-bold mb-8 inline-block relative">
            Core Technical Skills
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass p-5 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300 hover:shadow-lg text-center">
              <div className="font-bold text-xl mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Security</div>
              <p className="text-gray-300 text-sm">Advanced vulnerability research and penetration testing methodologies</p>
            </div>
            
            <div className="glass p-5 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300 hover:shadow-lg text-center">
              <div className="font-bold text-xl mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Low-Level Programming</div>
              <p className="text-gray-300 text-sm">System-level development in C/C++ with focus on performance and memory management</p>
            </div>
            
            <div className="glass p-5 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300 hover:shadow-lg text-center">
              <div className="font-bold text-xl mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Machine Learning</div>
              <p className="text-gray-300 text-sm">Applied ML for security applications with focus on anomaly detection</p>
            </div>
            
            <div className="glass p-5 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300 hover:shadow-lg text-center">
              <div className="font-bold text-xl mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Analysis</div>
              <p className="text-gray-300 text-sm">Advanced data analysis and visualization techniques for complex datasets</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
