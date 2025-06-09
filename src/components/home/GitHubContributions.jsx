import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import GitHubCalendar from 'react-github-calendar';

const GitHubContributions = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [contributionData, setContributionData] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Enhanced repositories with more detailed information
  const repositories = [
    {
      id: 'packet-prowler',
      name: "Packet Prowler",
      description: "Advanced network packet sniffer with real-time analysis capabilities",
      longDescription: "A high-performance C-based network packet sniffer that leverages libpcap for comprehensive traffic analysis. Features include multi-interface support, Berkeley Packet Filter (BPF) integration, and modular output formats for seamless integration with security analysis workflows.",
      language: "C",
      languageColor: "#555555",
      technologies: ["libpcap", "BPF", "Network Analysis", "Real-time Processing"],
      features: [
        "Multi-interface packet capture",
        "Advanced filtering with BPF",
        "Real-time protocol analysis",
        "Custom output formats (JSON, XML, CSV)",
        "Integration with security tools",
        "Low-latency processing"
      ],
      metrics: {
        stars: 32,
        forks: 14,
        issues: 3,
        commits: 127,
        contributors: 2
      },
      lastUpdated: "2 days ago",
      status: "Active",
      category: "Security Tools"
    },
    {
      id: 'malware-analysis',
      name: "Malware Analysis Framework",
      description: "Comprehensive malware analysis platform with ML-powered detection",
      longDescription: "A sophisticated Python-based framework that unifies static analysis, behavioral monitoring, memory forensics, and network analysis. Incorporates machine learning algorithms for automated threat classification and anomaly detection.",
      language: "Python",
      languageColor: "#3776ab",
      technologies: ["YARA", "Docker", "TensorFlow", "Static Analysis", "Dynamic Analysis"],
      features: [
        "Multi-stage analysis pipeline",
        "YARA rule integration",
        "Sandboxed execution environment",
        "ML-based threat classification",
        "Memory dump analysis",
        "Network behavior monitoring"
      ],
      metrics: {
        stars: 45,
        forks: 12,
        issues: 5,
        commits: 203,
        contributors: 3
      },
      lastUpdated: "1 week ago",
      status: "Active",
      category: "Security Research"
    },
    {
      id: 'ml-ids',
      name: "Machine Learning IDS",
      description: "Intelligent Intrusion Detection System with ensemble learning",
      longDescription: "Next-generation intrusion detection system that combines signature-based and anomaly-based approaches using ensemble machine learning. Features comprehensive feature engineering and adaptive learning capabilities.",
      language: "Python",
      languageColor: "#3776ab",
      technologies: ["Scikit-learn", "Pandas", "Feature Engineering", "Ensemble Methods"],
      features: [
        "Hybrid detection approach",
        "Real-time threat classification",
        "Adaptive learning algorithms",
        "False positive reduction",
        "Scalable architecture",
        "Comprehensive reporting"
      ],
      metrics: {
        stars: 38,
        forks: 9,
        issues: 2,
        commits: 156,
        contributors: 1
      },
      lastUpdated: "3 days ago",
      status: "Active",
      category: "Machine Learning"
    },
    {
      id: 'vulnerability-scanner',
      name: "Vulnerability Assessment Scanner",
      description: "Automated vulnerability discovery and exploitation framework",
      longDescription: "A comprehensive vulnerability assessment platform that automates the discovery, analysis, and exploitation of security vulnerabilities in network infrastructure and applications.",
      language: "Python",
      languageColor: "#3776ab",
      technologies: ["Nmap", "OpenVAS", "Custom Exploits", "Automation"],
      features: [
        "Automated vulnerability scanning",
        "Custom exploit modules",
        "Report generation",
        "Integration with popular scanners",
        "Risk assessment algorithms",
        "Remediation suggestions"
      ],
      metrics: {
        stars: 28,
        forks: 7,
        issues: 1,
        commits: 89,
        contributors: 1
      },
      lastUpdated: "1 week ago",
      status: "Maintenance",
      category: "Security Tools"
    }
  ];

  // GitHub statistics
  const githubStats = [
    { 
      label: "Total Repositories", 
      value: "15+", 
      icon: "code-branch",
      color: "text-blue-500",
      change: "+3 this month"
    },
    { 
      label: "Total Commits", 
      value: "680+", 
      icon: "code-commit",
      color: "text-green-500",
      change: "+45 this week"
    },
    { 
      label: "Pull Requests", 
      value: "52+", 
      icon: "git-pull-request",
      color: "text-purple-500",
      change: "+8 this month"
    },
    { 
      label: "Stars Received", 
      value: "143+", 
      icon: "star",
      color: "text-yellow-500",
      change: "+12 this month"
    },
  ];

  // Custom theme for the GitHub calendar
  const calendarTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  // Tab content
  const tabContent = {
    overview: 'Overview',
    repositories: 'Repositories',
    contributions: 'Contributions',
    technologies: 'Technologies'
  };

  // Technology categories
  const technologies = {
    "Security & Analysis": [
      { name: "YARA", level: 90, description: "Malware detection and classification" },
      { name: "IDA Pro / Ghidra", level: 85, description: "Reverse engineering and binary analysis" },
      { name: "Wireshark", level: 88, description: "Network protocol analysis" },
      { name: "Metasploit", level: 82, description: "Penetration testing framework" }
    ],
    "Programming Languages": [
      { name: "Python", level: 95, description: "Primary language for security tools and analysis" },
      { name: "C/C++", level: 85, description: "Systems programming and performance-critical applications" },
      { name: "Rust", level: 80, description: "Memory-safe systems programming" },
      { name: "JavaScript", level: 75, description: "Web applications and automation scripts" }
    ],
    "Machine Learning": [
      { name: "TensorFlow", level: 82, description: "Deep learning for threat detection" },
      { name: "Scikit-learn", level: 88, description: "Classical ML algorithms and preprocessing" },
      { name: "Pandas/NumPy", level: 90, description: "Data manipulation and numerical computing" },
      { name: "Jupyter", level: 85, description: "Interactive data analysis and prototyping" }
    ],
    "DevOps & Infrastructure": [
      { name: "Docker", level: 88, description: "Containerization for security environments" },
      { name: "AWS", level: 80, description: "Cloud infrastructure and security services" },
      { name: "Linux", level: 90, description: "System administration and hardening" },
      { name: "CI/CD", level: 78, description: "Automated testing and deployment pipelines" }
    ]
  };

  const RepoCard = ({ repo, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer h-full flex flex-col"
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)' }}
      onClick={() => setSelectedRepo(repo)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <i className={`fas fa-${repo.category === 'Security Tools' ? 'shield-alt' : 
                          repo.category === 'Security Research' ? 'search' : 
                          repo.category === 'Machine Learning' ? 'brain' : 'code'} text-white text-sm`}></i>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              {repo.name}
            </h4>
            <span className="text-xs text-gray-400">{repo.category}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <span className={`w-3 h-3 rounded-full`} style={{ backgroundColor: repo.languageColor }}></span>
          <span className="text-sm text-gray-300">{repo.language}</span>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-2">
        {repo.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {repo.technologies.slice(0, 3).map((tech) => (
          <span key={tech} className="px-2 py-1 bg-gray-700 text-gray-300 rounded-md text-xs">
            {tech}
          </span>
        ))}
        {repo.technologies.length > 3 && (
          <span className="px-2 py-1 bg-gray-600 text-gray-400 rounded-md text-xs">
            +{repo.technologies.length - 3} more
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span className="flex items-center space-x-1">
            <i className="fas fa-star text-yellow-500"></i>
            <span>{repo.metrics.issues}</span>
          </span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          repo.status === 'Active' ? 'bg-green-500/20 text-green-400' : 
          'bg-yellow-500/20 text-yellow-400'
        }`}>
          {repo.status}
        </span>
      </div>
    </motion.div>
  );

  const TechnologySection = ({ category, techs }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
        <i className={`fas fa-${
          category.includes('Security') ? 'shield-alt' :
          category.includes('Programming') ? 'code' :
          category.includes('Machine Learning') ? 'brain' : 'server'
        } text-blue-500 mr-3`}></i>
        {category}
      </h3>
      <div className="space-y-4">
        {techs.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">{tech.name}</span>
              <span className="text-blue-400 text-sm font-semibold">{tech.level}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${tech.level}%` } : {}}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              />
            </div>
            <p className="text-gray-400 text-xs mt-1 group-hover:text-gray-300 transition-colors">
              {tech.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section id="github" className="py-20 bg-gray-900 text-white">
      <div className="container-apple">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-12"
        >
          <h2 className="heading-md text-white mb-4">GitHub Portfolio</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Explore my contributions, repositories, and technical expertise in cybersecurity and software development
          </p>
        </motion.div>

        {/* Enhanced Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-800 rounded-2xl p-1 border border-gray-700">
            {Object.entries(tabContent).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              {/* GitHub Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {githubStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-800 rounded-2xl p-6 border border-gray-700 text-center hover:border-blue-500/50 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center mx-auto mb-4`}>
                      <i className={`fas fa-${stat.icon} ${stat.color} text-xl`}></i>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
                    <div className="text-green-400 text-xs">{stat.change}</div>
                  </motion.div>
                ))}
              </div>

              {/* GitHub Calendar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gray-800 rounded-2xl p-8 border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-6 text-center">
                  Contribution Activity
                </h3>
                <div className="flex justify-center">
                  <GitHubCalendar
                    username="chirag-dewan"
                    colorScheme="dark"
                    theme={calendarTheme}
                    fontSize={16}
                    blockSize={12}
                    blockMargin={5}
                    blockRadius={2}
                    hideColorLegend={false}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'repositories' && (
            <motion.div
              key="repositories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {repositories.map((repo, index) => (
                  <RepoCard key={repo.id} repo={repo} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'contributions' && (
            <motion.div
              key="contributions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Contribution Timeline */}
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: "Pushed to", repo: "packet-prowler", branch: "main", time: "2 hours ago", commits: 3 },
                    { action: "Opened issue in", repo: "malware-analysis", issue: "#12", time: "1 day ago" },
                    { action: "Merged PR in", repo: "ml-ids", pr: "#8", time: "3 days ago" },
                    { action: "Created release", repo: "vulnerability-scanner", version: "v2.1.0", time: "1 week ago" }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-700 rounded-xl"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-code-commit text-white text-xs"></i>
                      </div>
                      <div className="flex-grow">
                        <p className="text-white">
                          <span className="text-gray-300">{activity.action}</span>{' '}
                          <span className="font-semibold text-blue-400">{activity.repo}</span>
                          {activity.branch && <span className="text-gray-400"> to {activity.branch}</span>}
                          {activity.commits && <span className="text-gray-400"> ({activity.commits} commits)</span>}
                        </p>
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'technologies' && (
            <motion.div
              key="technologies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(technologies).map(([category, techs]) => (
                  <TechnologySection key={category} category={category} techs={techs} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Repository Detail Modal */}
        <AnimatePresence>
          {selectedRepo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedRepo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedRepo.name}</h3>
                    <p className="text-gray-400">{selectedRepo.category}</p>
                  </div>
                  <button
                    onClick={() => setSelectedRepo(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>
                
                <p className="text-gray-300 mb-6">{selectedRepo.longDescription}</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedRepo.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <i className="fas fa-check text-green-500 text-sm"></i>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRepo.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6 border-t border-gray-700">
                    {Object.entries(selectedRepo.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-xl font-bold text-white">{value}</div>
                        <div className="text-gray-400 text-sm capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.a 
            href="https://github.com/chirag-dewan" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fab fa-github mr-3 text-xl"></i>
            <span className="text-lg">Explore All Repositories</span>
            <i className="fas fa-external-link-alt ml-3"></i>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubContributions;stars}</span>
          </span>
          <span className="flex items-center space-x-1">
            <i className="fas fa-code-branch text-blue-500"></i>
            <span>{repo.metrics.forks}</span>
          </span>
          <span className="flex items-center space-x-1">
            <i className="fas fa-exclamation-circle text-red-500"></i>
            <span>{repo.metrics.
