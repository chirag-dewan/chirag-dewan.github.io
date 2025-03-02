import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import GitHubCalendar from 'react-github-calendar';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedHero from '../components/AnimatedHero';
import ProjectShowcase from '../components/ProjectShowcase';
import InteractiveTerminal from '../components/InteractiveTerminal';
import ContactSection from '../components/ContactSection';

// Enhanced skill data from resume with corrected certification dates
const skills = {
  coreCompetencies: [
    {
      category: 'Cybersecurity',
      skills: [
        { 
          name: 'Threat Modeling', 
          level: 90, 
          icon: '🛡️', 
          description: 'STRIDE methodology and MITRE ATT&CK framework implementation for comprehensive threat analysis', 
          projects: ['Malware Analysis Framework', 'IDS Project']
        },
        { 
          name: 'Vulnerability Research', 
          level: 95, 
          icon: '🕵️', 
          description: 'Advanced exploit development, vulnerability discovery, and zero-day research with focus on critical infrastructure', 
          projects: ['Packet Prowler', 'Security Hardening Framework']
        },
        { 
          name: 'Malware Analysis', 
          level: 88, 
          icon: '🦠', 
          description: 'Memory forensics, dynamic analysis in isolated environments, and behavioral pattern recognition', 
          projects: ['Malware Analysis Framework', 'Threat Hunting Suite']
        },
        { 
          name: 'Penetration Testing', 
          level: 85, 
          icon: '🏴‍☠️', 
          description: 'Network and application penetration testing with custom exploitation frameworks', 
          projects: ['Web App Security Scanner', 'Network Enumeration Tool']
        },
        { 
          name: 'Incident Response', 
          level: 82, 
          icon: '🚨', 
          description: 'Rapid threat containment, digital forensics, and root cause analysis', 
          projects: ['Security Automation Framework', 'DFIR Toolkit']
        },
        { 
          name: 'Secure Architecture', 
          level: 88, 
          icon: '🏗️', 
          description: 'Designing and implementing security controls and zero-trust architectures', 
          projects: ['Cloud Security Framework', 'DevSecOps Pipeline']
        }
      ]
    },
    {
      category: 'Programming',
      skills: [
        { 
          name: 'Python', 
          level: 95, 
          icon: '🐍', 
          description: 'Advanced scripting, security tools, automation frameworks, and machine learning implementations', 
          projects: ['Malware Analysis Framework', 'ML-Based IDS', 'Automation Scripts']
        },
        { 
          name: 'C/C++', 
          level: 85, 
          icon: '⚙️', 
          description: 'Low-level systems programming, memory management, and performance-critical applications', 
          projects: ['Packet Prowler', 'Memory Forensics Tools']
        },
        { 
          name: 'JavaScript', 
          level: 80, 
          icon: '🌐', 
          description: 'Web application development, React frameworks, and security monitoring dashboards', 
          projects: ['Security Dashboard', 'Portfolio Website']
        },
        { 
          name: 'Rust', 
          level: 75, 
          icon: '🦀', 
          description: 'Memory-safe systems programming for security-critical applications', 
          projects: ['Secure Parser', 'Network Monitor']
        },
        { 
          name: 'Bash/Shell', 
          level: 70, 
          icon: '💻', 
          description: 'System administration, automation scripts, and security hardening tools', 
          projects: ['Hardening Scripts', 'Deployment Automation']
        }
      ]
    },
    {
      category: 'Cloud & Infrastructure',
      skills: [
        { 
          name: 'AWS', 
          level: 80, 
          icon: '☁️', 
          description: 'Cloud infrastructure, security services, and comprehensive cloud security posture management', 
          projects: ['Cloud Security Framework', 'AWS CSPM Tool']
        },
        { 
          name: 'Docker', 
          level: 85, 
          icon: '🐳', 
          description: 'Container security, secure image building, and isolation techniques', 
          projects: ['Containerized Analysis Environment', 'Security Pipeline']
        },
        { 
          name: 'Kubernetes', 
          level: 75, 
          icon: '🚢', 
          description: 'Secure orchestration, network policies, and service mesh implementation', 
          projects: ['K8s Security Scanner', 'Service Mesh Implementation']
        },
        { 
          name: 'CI/CD Security', 
          level: 78, 
          icon: '🔄', 
          description: 'Pipeline security integration, automated vulnerability scanning, and IaC security', 
          projects: ['DevSecOps Pipeline', 'SAST/DAST Integration']
        },
        { 
          name: 'Linux Administration', 
          level: 85, 
          icon: '🐧', 
          description: 'System hardening, SELinux configuration, and secure deployment practices', 
          projects: ['Linux Hardening Framework', 'Security Baseline Tool']
        }
      ]
    },
    {
      category: 'Data Science & ML',
      skills: [
        { 
          name: 'Anomaly Detection', 
          level: 85, 
          icon: '📊', 
          description: 'Implementing ML models for detecting unusual patterns in network traffic and system behavior', 
          projects: ['ML-Based IDS', 'User Behavior Analytics']
        },
        { 
          name: 'TensorFlow', 
          level: 80, 
          icon: '🧠', 
          description: 'Building and training neural networks for security classification problems', 
          projects: ['Malware Classification Engine', 'Threat Prediction Model']
        },
        { 
          name: 'Scikit-learn', 
          level: 85, 
          icon: '🔍', 
          description: 'Feature engineering and model development for security applications', 
          projects: ['ML-Based IDS', 'Anomaly Detection System']
        },
        { 
          name: 'Pandas/NumPy', 
          level: 85, 
          icon: '📈', 
          description: 'Data manipulation, analysis, and preprocessing for security datasets', 
          projects: ['Security Analytics Platform', 'Threat Intelligence Processing']
        },
        { 
          name: 'Data Visualization', 
          level: 70, 
          icon: '📉', 
          description: 'Creating insightful visualizations of security metrics and threat intelligence', 
          projects: ['Security Dashboard', 'Threat Intelligence Platform']
        }
      ]
    },
    {
      category: 'Specialized Tools',
      skills: [
        { 
          name: 'Ghidra/IDA Pro', 
          level: 90, 
          icon: '🔍', 
          description: 'Advanced reverse engineering of binaries and firmware', 
          projects: ['Firmware Analysis', 'Binary Security Assessment']
        },
        { 
          name: 'Metasploit', 
          level: 85, 
          icon: '🔪', 
          description: 'Exploitation framework for security testing and vulnerability validation', 
          projects: ['Penetration Testing', 'Vulnerability Validation']
        },
        { 
          name: 'Volatility', 
          level: 80, 
          icon: '💾', 
          description: 'Memory forensics for malware analysis and incident response', 
          projects: ['Memory Forensics Tool', 'Incident Response Framework']
        },
        { 
          name: 'YARA', 
          level: 85, 
          icon: '🔎', 
          description: 'Pattern matching for malware identification and classification', 
          projects: ['Malware Analysis Tool', 'Threat Hunting Platform']
        }
      ]
    }
  ],
  certifications: [
    { 
      name: 'CompTIA Security+', 
      status: 'Certified', 
      year: '2023',
      logo: 'comptia-security',
      description: 'Fundamental security concepts and best practices'
    },
    { 
      name: 'CompTIA Network+', 
      status: 'Certified', 
      year: '2024',
      logo: 'comptia-network',
      description: 'Network architecture and troubleshooting skills'
    },
    { 
      name: 'AWS Cloud Practitioner', 
      status: 'Certified', 
      year: '2024',
      logo: 'aws',
      description: 'Foundational knowledge of AWS cloud services'
    },
    { 
      name: 'OSCP', 
      status: 'In Progress', 
      year: '2025',
      logo: 'oscp',
      description: 'Advanced offensive security certification'
    }
  ],
  specialTools: [
    'Cobalt Strike', 'Metasploit', 'Burp Suite Pro', 'Ghidra', 
    'IDA Pro', 'Wireshark', 'Volatility3', 'YARA', 'Nmap', 
    'OWASP ZAP', 'Radare2', 'Splunk', 'ELK Stack', 'Suricata'
  ]
};

// Sample project data (enhanced)
const personalProjects = [
  {
    id: "malware-research-tool",
    name: "Malware Analysis Framework",
    summary: "Comprehensive Python-based framework for multi-faceted threat detection and analysis.",
    description: "Advanced malware analysis system integrating static analysis, behavioral monitoring, memory forensics, and machine learning classification. Containerized with Docker for safe execution environment.",
    category: "security",
    languages: [
      { name: "Python", percentage: 75 },
      { name: "Docker", percentage: 15 },
      { name: "YARA", percentage: 10 }
    ],
    tags: ["Python", "Security", "ML", "Docker", "Threat Analysis"]
  },
  {
    id: "ids-project",
    name: "Machine Learning IDS",
    summary: "Robust Intrusion Detection System leveraging advanced machine learning techniques.",
    description: "Modular Python application using scikit-learn for network security threat identification with comprehensive feature engineering. Designed for high-throughput environments with minimal false positives.",
    category: "ml",
    languages: [
      { name: "Python", percentage: 80 },
      { name: "TensorFlow", percentage: 15 },
      { name: "Pandas", percentage: 5 }
    ],
    tags: ["Python", "ML", "Security", "Network", "Threat Detection"]
  },
  {
    id: "packet-prowler",
    name: "Packet Prowler",
    summary: "A C-based network packet sniffer for real-time traffic analysis and protocol inspection.",
    description: "Lightweight yet powerful network analysis tool built with libpcap. Provides deep packet inspection, protocol filtering, and extensible architecture for custom security monitoring.",
    category: "security",
    languages: [
      { name: "C", percentage: 85 },
      { name: "Bash", percentage: 10 },
      { name: "Makefile", percentage: 5 }
    ],
    tags: ["C", "Networking", "Security", "Protocol Analysis"]
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(skills.coreCompetencies[0].category);
  
  // Animation controls
  const controls = useAnimation();
  const [skillsRef, skillsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [certRef, certInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [toolsRef, toolsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  // Trigger animations when sections are in view
  useEffect(() => {
    if (skillsInView) controls.start("visible");
  }, [controls, skillsInView]);
  
  useEffect(() => {
    if (certInView) controls.start("visible");
  }, [controls, certInView]);
  
  useEffect(() => {
    if (toolsInView) controls.start("visible");
  }, [controls, toolsInView]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const renderSkillCategory = () => {
    const category = skills.coreCompetencies.find(cat => cat.category === activeCategory);
    
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid md:grid-cols-3 gap-6"
      >
        {category.skills.map((skill, index) => (
          <motion.div 
            key={skill.name}
            variants={itemVariants}
            className="glass-card p-6 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300 hover:shadow-lg glow-border"
          >
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">{skill.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                <div className="w-full bg-gray-800 h-2 rounded-full mt-2 overflow-hidden skill-bar">
                  <div 
                    className="skill-progress"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-right text-xs text-gray-400">{skill.level}%</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">{skill.description}</p>
            
            {/* Related projects */}
            {skill.projects && skill.projects.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-700/30">
                <div className="text-xs text-gray-400 mb-2">Related Projects:</div>
                <div className="flex flex-wrap gap-1">
                  {skill.projects.map(project => (
                    <span key={project} className="text-xs bg-gray-800/50 px-2 py-1 rounded-full">
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    );
  };

  const renderCertifications = () => {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {skills.certifications.map((cert) => (
          <motion.div 
            key={cert.name} 
            variants={itemVariants}
            className="certification-badge glass-card p-5 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between">
                <h4 className="text-lg font-bold text-white mb-2">{cert.name}</h4>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  cert.status === 'Certified' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/20' 
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                }`}>
                  {cert.status}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-2">{cert.description}</p>
              <div className="text-gray-400 text-xs mt-auto">{cert.year}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  const renderSpecialTools = () => {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="flex flex-wrap gap-3 justify-center mt-6"
      >
        {skills.specialTools.map((tool, index) => (
          <motion.span 
            key={tool}
            variants={itemVariants}
            className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10 hover:border-pink-500/20 hover:bg-pink-500/5 transition-all duration-300"
          >
            {tool}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  const renderGitHubCalendar = () => {
    // Custom theme for the calendar
    const calendarTheme = {
      background: 'transparent',
      text: '#ffffff',
      grade4: '#ec4899',
      grade3: '#a855f7',
      grade2: '#6b21a8',
      grade1: '#4a044e',
      grade0: '#1f2937'
    };

    return (
      <section className="py-16 px-4 relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute -top-40 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text text-glow mb-6">
              GitHub Contributions
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A snapshot of my coding journey and open-source contributions
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="enhanced-glass glass-card p-8 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300">
              <GitHubCalendar 
                username="chirag-dewan"
                colorScheme="dark"
                theme={calendarTheme}
                blockSize={12}
                blockMargin={4}
                fontSize={14}
                hideColorLegend={false}
                hideMonthLabels={false}
                labels={{
                  totalCount: '{{count}} contributions in the last year',
                }}
                renderBlock={(block, activity) => (
                  <div
                    className="rounded-sm transition-all hover:scale-125 hover:z-10"
                    style={{
                      backgroundColor: activity.color,
                      width: 12,
                      height: 12,
                      margin: 4
                    }}
                    data-count={activity.count}
                    data-date={activity.date}
                  />
                )}
                style={{
                  width: '100%',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}
              />
            </div>
            
            {/* Contribution summary */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-pink-500 mb-1">334</div>
                <div className="text-gray-400 text-sm">Total Contributions</div>
              </div>
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-500 mb-1">42</div>
                <div className="text-gray-400 text-sm">Repositories</div>
              </div>
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-500 mb-1">156</div>
                <div className="text-gray-400 text-sm">Pull Requests</div>
              </div>
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-500 mb-1">78</div>
                <div className="text-gray-400 text-sm">Code Reviews</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedHero 
        name="Chirag Dewan"
        title="Cyber Research Scientist"
        description="Pioneering advanced security solutions through innovative research and cutting-edge technology."
      />
      
      {/* Interactive Terminal Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black via-black/95 to-black relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Interactive Portfolio Terminal
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore my professional journey through an interactive CLI
            </p>
          </div>
          
          <InteractiveTerminal />
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <ProjectShowcase projects={personalProjects} />
      
      {/* Skills Section */}
      <section 
        ref={skillsRef}
        className="py-20 px-4 bg-gradient-to-b from-black via-black/80 to-black relative overflow-hidden"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text text-glow mb-6">Core Competencies</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and skills
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex justify-center mb-12 flex-wrap gap-4">
            {skills.coreCompetencies.map((category) => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(category.category)}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.category 
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/20' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 interactive-button'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
          
          {/* Skills Grid */}
          {renderSkillCategory()}
          
          {/* Certifications */}
          <div 
            ref={certRef}
            className="text-center mt-20 mb-8"
          >
            <h3 className="text-2xl font-bold gradient-text text-glow mb-6">Certifications</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Professional credentials that validate my expertise
            </p>
          </div>
          {renderCertifications()}
          
          {/* Special Tools */}
          <div 
            ref={toolsRef}
            className="text-center mt-20 mb-8"
          >
            <h3 className="text-2xl font-bold gradient-text text-glow mb-6">Specialized Tools</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Advanced security and development tools in my arsenal
            </p>
          </div>
          {renderSpecialTools()}
        </div>
      </section>
      
      {/* GitHub Contributions Section */}
      {renderGitHubCalendar()}
      
      {/* Work Experience Timeline */}
      <section className="py-20 px-4 bg-gradient-to-b from-black via-black/80 to-black relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text text-glow mb-6">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              My journey through challenging roles in cybersecurity and software development
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="timeline-connector"></div>
            
            {/* Experience items */}
            <div className="space-y-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative"
              >
                {/* Timeline node */}
                <div className="timeline-node"></div>
                
                <div className="flex flex-col md:flex-row">
                  {/* Company and Period */}
                  <div className="md:w-1/2 flex flex-col items-start md:items-end px-6 py-4">
                    <div className="text-left md:text-right pl-16 md:pl-0 md:pr-8">
                      <h3 className="text-2xl font-bold heading-gradient mb-2">RTX BBN</h3>
                      <div className="inline-block mb-1 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 text-sm font-medium">
                        Cyber Researcher
                      </div>
                      <p className="text-gray-400">May 2024 – Present</p>
                      <p className="text-gray-500">Cambridge, MA</p>
                    </div>
                  </div>
                  
                  {/* Job details */}
                  <div className="md:w-1/2 ml-16 md:ml-0 md:px-8">
                    <div className="glass-card rounded-xl p-6 backdrop-blur-lg animated-border">
                      <p className="text-gray-300 mb-4">Leading security research initiatives focused on vulnerability discovery and threat analysis for critical infrastructure systems.</p>
                      
                      <h4 className="text-lg font-bold mb-3 text-white/80">Key Responsibilities:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start text-gray-300">
                          <span className="text-pink-500 mr-2 mt-1">•</span>
                          <span>Develop and implement packet parsing and analysis systems for network traffic inspection</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <span className="text-pink-500 mr-2 mt-1">•</span>
                          <span>Conduct reverse engineering of firmware to identify and document security vulnerabilities</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <span className="text-pink-500 mr-2 mt-1">•</span>
                          <span>Create proof-of-concept exploit code to demonstrate impact of discovered vulnerabilities</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <span className="text-pink-500 mr-2 mt-1">•</span>
                          <span>Design and implement security automation pipelines for continuous vulnerability testing</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative"
              >
                {/* Timeline node */}
                <div className="timeline-node"></div>
                
                <div className="flex flex-col md:flex-row-reverse">
                  {/* Company and Period */}
                  <div className="md:w-1/2 flex flex-col items-start px-6 py-4">
                    <div className="text-left pl-16 md:pl-8">
                      <h3 className="text-2xl font-bold heading-gradient mb-2">Raytheon, RTX</h3>
                      <div className="inline-block mb-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 text-sm font-medium">
                        Cyber Engineer
                      </div>
                      <p className="text-gray-400">June 2023 – May 2024</p>
                      <p className="text-gray-500">Aurora, CO</p>
                    </div>
                  </div>
                  
                  {/* Job details */}
                  <div className="md:w-1/2 ml-16 md:ml-0 md:px-8">
                    <div className="glass-card rounded-xl p-6 backdrop-blur-lg animated-border">
                      <p className="text-gray-300 mb-4">Led security hardening initiatives and performed extensive threat modeling to secure enterprise systems and critical infrastructure.</p>
                      
                      <h4 className="text-lg font-bold mb-3 text-white/80">Key Responsibilities:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start text-gray-300">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span>Performed comprehensive threat modeling and vulnerability analysis for critical systems</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span>Implemented hardening measures for Linux systems using SELinux and automated security scans</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span>Built secure environments for malware analysis and behavior monitoring</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span>Developed security automation frameworks integrated with CI/CD pipelines</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative"
              >
                {/* Timeline node */}
                <div className="timeline-node"></div>
                
                <div className="flex flex-col md:flex-row">
                  {/* Company and Period */}
                  <div className="md:w-1/2 flex flex-col items-start md:items-end px-6 py-4">
                    <div className="text-left md:text-right pl-16 md:pl-0 md:pr-8">
                      <h3 className="text-2xl font-bold heading-gradient mb-2">Raytheon, RTX</h3>
                      <div className="inline-block mb-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-400 text-sm font-medium">
                        Senior Cyber Engineering Intern
                      </div>
                      <p className="text-gray-400">May 2022 – June 2023</p>
                      <p className="text-gray-500">Aurora, CO</p>
                    </div>
                  </div>
                  
                  {/* Job details */}
                  <div className="md:w-1/2 ml-16 md:ml-0 md:px-8">
                    <div className="glass-card rounded-xl p-6 backdrop-blur-lg animated-border">
                      <p className="text-gray-300 mb-4">Conducted security assessments and developed tools for vulnerability discovery and exploitation in controlled environments.</p>
                      
                      <h4 className="text-lg font-bold mb-3 text-white/80">Key Responsibilities:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start text-gray-300">
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          <span>Simulated real-world attacks to test security controls and detection capabilities</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          <span>Reverse-engineered binaries to identify and document exploitable vulnerabilities</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          <span>Created custom vulnerability scanners that combined multiple open-source tools</span>
                        </li>
                        <li className="flex items-start text-gray-300">
                          <span className="text-purple-500 mr-2 mt-1">•</span>
                          <span>Analyzed malware samples to document behaviors and improve detection capabilities</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Career summary metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-20 grid md:grid-cols-3 gap-6"
          >
            <div className="enhanced-glass p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-pink-500 mb-2 neon-glow">1.5+</div>
              <div className="text-lg text-gray-300">Years of Security Experience</div>
            </div>
            <div className="enhanced-glass p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2 neon-glow">5+</div>
              <div className="text-lg text-gray-300">Security Projects</div>
            </div>
            <div className="enhanced-glass p-6 rounded-xl text-center">
              <div className="text-4xl font-bold gradient-text mb-2">TS</div>
              <div className="text-lg text-gray-300">Security Clearance</div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Recent Certifications Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black via-black/90 to-black relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text text-glow mb-6">
              Recent Certifications
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Industry-recognized credentials validating my cybersecurity expertise
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* CompTIA Security+ */}
            <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-transparent to-pink-500/10 rounded-full blur-2xl"></div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-pink-500/10 p-4 rounded-xl">
                  <svg className="w-10 h-10 text-pink-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM6 14C5.45 14 5 13.55 5 13C5 12.45 5.45 12 6 12C6.55 12 7 12.45 7 13C7 13.55 6.55 14 6 14ZM12 4C12.55 4 13 4.45 13 5C13 5.55 12.55 6 12 6C11.45 6 11 5.55 11 5C11 4.45 11.45 4 12 4ZM12 20C11.45 20 11 19.55 11 19C11 18.45 11.45 18 12 18C12.55 18 13 18.45 13 19C13 19.55 12.55 20 12 20ZM18 14C17.45 14 17 13.55 17 13C17 12.45 17.45 12 18 12C18.55 12 19 12.45 19 13C19 13.55 18.55 14 18 14ZM10.5 8.25L7.75 11H12C12.55 11 13 11.45 13 12C13 12.55 12.55 13 12 13H7.75L10.5 15.75C10.89 16.14 10.89 16.79 10.5 17.18C10.11 17.57 9.46 17.57 9.07 17.18L4.57 12.68C4.18 12.29 4.18 11.64 4.57 11.25L9.07 6.75C9.46 6.36 10.11 6.36 10.5 6.75C10.89 7.14 10.89 7.79 10.5 8.18C10.5 8.2 10.5 8.23 10.5 8.25Z" fill="currentColor"/>
                  </svg>
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white mb-2">CompTIA Security+</h3>
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">
                      2023
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">Validates baseline skills necessary to perform core security functions and pursue an IT security career.</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Threat Management
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Cryptography
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Identity Management
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Network Security
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CompTIA Network+ */}
            <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-blue-500/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-transparent to-blue-500/10 rounded-full blur-2xl"></div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-500/10 p-4 rounded-xl">
                  <svg className="w-10 h-10 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM14.66 13.73L13.38 16.15C13.22 16.44 12.9 16.61 12.56 16.61C12.41 16.61 12.25 16.58 12.11 16.5C11.64 16.27 11.45 15.73 11.66 15.27L12.95 12.8C12.97 12.77 12.97 12.74 12.95 12.7C12.93 12.67 12.91 12.66 12.87 12.66H7.41C7 12.66 6.66 12.32 6.66 11.91C6.66 11.57 6.87 11.27 7.17 11.15L11.77 8.89C11.87 8.85 11.98 8.82 12.09 8.82C12.38 8.82 12.64 8.97 12.8 9.21C12.89 9.36 12.95 9.54 12.95 9.71C12.95 9.93 12.87 10.14 12.73 10.31L12.04 11.25C12.02 11.29 12.02 11.33 12.04 11.36C12.06 11.39 12.1 11.41 12.13 11.41H16.59C17 11.41 17.34 11.75 17.34 12.16C17.34 12.43 17.19 12.68 16.97 12.82L14.72 13.83C14.69 13.84 14.67 13.87 14.66 13.89C14.66 13.92 14.66 13.7 14.66 13.73Z" fill="currentColor"/>
                  </svg>
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white mb-2">CompTIA Network+</h3>
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">
                      2024
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">Certifies technical competency in network architecture, operations, security, and troubleshooting.</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Network Architecture
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Network Operations
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Network Security
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Troubleshooting
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AWS Cloud Practitioner */}
            <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-orange-500/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-transparent to-orange-500/10 rounded-full blur-2xl"></div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-orange-500/10 p-4 rounded-xl">
                  <svg className="w-10 h-10 text-orange-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.74 4.23L12.59 3.08C12.2 2.69 11.56 2.69 11.17 3.08L10.02 4.23C9.47 4.78 9.47 5.67 10.02 6.22L11.17 7.37C11.56 7.76 12.2 7.76 12.59 7.37L13.74 6.22C14.29 5.67 14.29 4.78 13.74 4.23ZM3.08 12.59L4.23 13.74C4.78 14.29 5.67 14.29 6.22 13.74L7.37 12.59C7.76 12.2 7.76 11.56 7.37 11.17L6.22 10.02C5.67 9.47 4.78 9.47 4.23 10.02L3.08 11.17C2.69 11.56 2.69 12.2 3.08 12.59ZM17.41 10.02L16.26 11.17C15.87 11.56 15.87 12.2 16.26 12.59L17.41 13.74C17.96 14.29 18.85 14.29 19.4 13.74L20.55 12.59C20.94 12.2 20.94 11.56 20.55 11.17L19.4 10.02C18.85 9.47 17.96 9.47 17.41 10.02ZM15.59 15.59L13.74 17.44C13.19 17.99 13.19 18.88 13.74 19.43L14.89 20.58C15.28 20.97 15.92 20.97 16.31 20.58L18.16 18.73C18.71 18.18 18.71 17.29 18.16 16.74L17.01 15.59C16.46 15.04 15.57 15.04 15.02 15.59C15.15 15.46 15.72 15.59 15.59 15.59ZM8.45 15.59L7.3 16.74C6.75 17.29 6.75 18.18 7.3 18.73L9.15 20.58C9.54 20.97 10.18 20.97 10.57 20.58L11.72 19.43C12.27 18.88 12.27 17.99 11.72 17.44L9.87 15.59C9.32 15.04 8.43 15.04 7.88 15.59C8.01 15.46 8.58 15.59 8.45 15.59Z" fill="currentColor"/>
                  </svg>
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white mb-2">AWS Cloud Practitioner</h3>
                    <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium border border-green-500/30">
                      2024
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">Demonstrates fundamental understanding of AWS Cloud services, terminology, billing, and security concepts.</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Cloud Concepts
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Security & Compliance
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Core Services
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Billing & Pricing
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* OSCP (In Progress) */}
            <div className="glass-card p-6 rounded-xl border border-white/10 hover:border-purple-500/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-transparent to-purple-500/10 rounded-full blur-2xl"></div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-purple-500/10 p-4 rounded-xl">
                  <svg className="w-10 h-10 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/>
                  </svg>
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white mb-2">OSCP</h3>
                    <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium border border-blue-500/30">
                      In Progress
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">Advanced hands-on penetration testing certification demonstrating practical offensive security skills in real-world environments.</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Penetration Testing
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Exploit Development
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Privilege Escalation
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-800/50 text-gray-300 text-xs">
                      Reporting
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
