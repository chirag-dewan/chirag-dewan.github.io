import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GitHubCalendar from 'react-github-calendar';
import AnimatedHero from '../components/AnimatedHero';
import ProjectShowcase from '../components/ProjectShowcase';
import InteractiveTerminal from '../components/InteractiveTerminal';
import ContactSection from '../components/ContactSection';

// Comprehensive skill data extracted from resume
const skills = {
  coreCompetencies: [
    {
      category: 'Cybersecurity',
      skills: [
        { 
          name: 'Threat Modeling', 
          level: 90, 
          icon: '🛡️', 
          description: 'STRIDE methodology and MITRE ATT&CK framework implementation for comprehensive threat analysis' 
        },
        { 
          name: 'Vulnerability Research', 
          level: 95, 
          icon: '🕵️', 
          description: 'Advanced exploit development, vulnerability discovery, and zero-day research with focus on critical infrastructure' 
        },
        { 
          name: 'Malware Analysis', 
          level: 88, 
          icon: '🦠', 
          description: 'Memory forensics, dynamic analysis in isolated environments, and behavioral pattern recognition' 
        },
        { 
          name: 'Penetration Testing', 
          level: 85, 
          icon: '🏴‍☠️', 
          description: 'Network and application penetration testing with custom exploitation frameworks' 
        },
        { 
          name: 'Incident Response', 
          level: 82, 
          icon: '🚨', 
          description: 'Rapid threat containment, digital forensics, and root cause analysis' 
        },
        { 
          name: 'Secure Architecture', 
          level: 88, 
          icon: '🏗️', 
          description: 'Designing and implementing security controls and zero-trust architectures' 
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
          description: 'Advanced scripting, security tools, automation frameworks, and machine learning implementations' 
        },
        { 
          name: 'C/C++', 
          level: 85, 
          icon: '⚙️', 
          description: 'Low-level systems programming, memory management, and performance-critical applications' 
        },
        { 
          name: 'JavaScript', 
          level: 80, 
          icon: '🌐', 
          description: 'Web application development, React frameworks, and security monitoring dashboards' 
        },
        { 
          name: 'Rust', 
          level: 75, 
          icon: '🦀', 
          description: 'Memory-safe systems programming for security-critical applications' 
        },
        { 
          name: 'Bash/Shell', 
          level: 70, 
          icon: '💻', 
          description: 'System administration, automation scripts, and security hardening tools' 
        }
      ]
    },
    {
      category: 'Cloud & Infrastructure',
      skills: [
        { 
          name: 'AWS Security', 
          level: 85, 
          icon: '☁️', 
          description: 'GuardDuty, Security Hub, IAM policies, and comprehensive cloud security posture management' 
        },
        { 
          name: 'Docker', 
          level: 80, 
          icon: '🐳', 
          description: 'Container security, secure image building, and isolation techniques' 
        },
        { 
          name: 'Kubernetes', 
          level: 75, 
          icon: '🚢', 
          description: 'Secure orchestration, network policies, and service mesh implementation' 
        },
        { 
          name: 'CI/CD Security', 
          level: 78, 
          icon: '🔄', 
          description: 'Pipeline security integration, automated vulnerability scanning, and IaC security' 
        },
        { 
          name: 'Linux Administration', 
          level: 85, 
          icon: '🐧', 
          description: 'System hardening, SELinux configuration, and secure deployment practices' 
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
          description: 'Implementing ML models for detecting unusual patterns in network traffic and system behavior' 
        },
        { 
          name: 'TensorFlow', 
          level: 75, 
          icon: '🧠', 
          description: 'Building and training neural networks for security classification problems' 
        },
        { 
          name: 'Scikit-learn', 
          level: 80, 
          icon: '🔍', 
          description: 'Feature engineering and model development for security applications' 
        },
        { 
          name: 'Pandas/NumPy', 
          level: 85, 
          icon: '📈', 
          description: 'Data manipulation, analysis, and preprocessing for security datasets' 
        },
        { 
          name: 'Data Visualization', 
          level: 70, 
          icon: '📉', 
          description: 'Creating insightful visualizations of security metrics and threat intelligence' 
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
          description: 'Advanced reverse engineering of binaries and firmware' 
        },
        { 
          name: 'Metasploit', 
          level: 85, 
          icon: '🔪', 
          description: 'Exploitation framework for security testing and vulnerability validation' 
        },
        { 
          name: 'Volatility', 
          level: 80, 
          icon: '💾', 
          description: 'Memory forensics for malware analysis and incident response' 
        },
        { 
          name: 'Wireshark', 
          level: 90, 
          icon: '🦈', 
          description: 'Network protocol analysis and traffic inspection' 
        },
        { 
          name: 'Burp Suite', 
          level: 85, 
          icon: '🕸️', 
          description: 'Web application security testing and vulnerability discovery' 
        },
        { 
          name: 'YARA', 
          level: 85, 
          icon: '🔎', 
          description: 'Pattern matching for malware identification and classification' 
        }
      ]
    }
  ],
  certifications: [
    { name: 'CompTIA Security+', status: 'Certified', year: '2021' },
    { name: 'CompTIA Network+', status: 'Certified', year: '2021' },
    { name: 'AWS Certified Security Specialty', status: 'Certified', year: '2023' },
    { name: 'AWS Certified Cloud Practitioner', status: 'Certified', year: '2022' },
    { name: 'OSCP', status: 'In Progress', year: '2025' }
  ],
  workExperience: [
    {
      position: 'Cyber Researcher',
      company: 'RTX BBN',
      period: 'May 2024 – Present',
      location: 'Cambridge, MA',
      highlights: [
        'Develop and implement packet parsing and analysis systems',
        'Conduct reverse engineering of firmware to identify security vulnerabilities',
        'Create proof-of-concept exploits to demonstrate impact',
        'Design and implement security automation pipelines'
      ]
    },
    {
      position: 'Cyber Engineer',
      company: 'Raytheon, RTX',
      period: 'June 2023 – May 2024',
      location: 'Aurora, CO',
      highlights: [
        'Performed threat modeling and vulnerability analysis',
        'Implemented Linux system hardening with SELinux',
        'Built secure environments for malware analysis',
        'Developed security automation frameworks'
      ]
    },
    {
      position: 'Senior Cyber Engineering Intern',
      company: 'Raytheon, RTX',
      period: 'May 2022 – June 2023',
      location: 'Aurora, CO',
      highlights: [
        'Simulated attacks to test security controls',
        'Reverse-engineered binaries to identify vulnerabilities',
        'Created custom vulnerability scanners',
        'Analyzed malware samples to improve detection'
      ]
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

  const renderSkillCategory = () => {
    const category = skills.coreCompetencies.find(cat => cat.category === activeCategory);
    
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {category.skills.map((skill, index) => (
          <div 
            key={skill.name}
            className="glass p-6 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">{skill.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                <div className="w-full bg-gray-800 h-2 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">{skill.description}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderCertifications = () => {
    return (
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.certifications.map((cert) => (
          <div 
            key={cert.name} 
            className="glass p-4 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300"
          >
            <h4 className="text-lg font-bold text-white mb-2">{cert.name}</h4>
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-xs ${
                cert.status === 'Certified' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                {cert.status}
              </span>
              <span className="text-gray-400 text-xs">{cert.year}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSpecialTools = () => {
    return (
      <div className="flex flex-wrap gap-3 justify-center mt-6">
        {skills.specialTools.map((tool) => (
          <span 
            key={tool} 
            className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10"
          >
            {tool}
          </span>
        ))}
      </div>
    );
  };

  const renderWorkExperience = () => {
    return (
      <div className="mt-8 space-y-6">
        {skills.workExperience.map((job, index) => (
          <div 
            key={index}
            className="glass p-6 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300"
          >
            <div className="flex justify-between flex-wrap">
              <h4 className="text-xl font-bold text-white mb-1">{job.position}</h4>
              <span className="text-pink-500 text-sm">{job.period}</span>
            </div>
            <div className="flex justify-between flex-wrap mb-4">
              <span className="text-gray-300">{job.company}</span>
              <span className="text-gray-400 text-sm">{job.location}</span>
            </div>
            <ul className="space-y-2">
              {job.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start text-gray-300 text-sm">
                  <span className="text-pink-500 mr-2">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
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
      <section className="py-20 px-4 bg-gradient-to-b from-black via-black/80 to-black relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-6">Core Competencies</h2>
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
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
          
          {/* Skills Grid */}
          {renderSkillCategory()}
          
          {/* Work Experience Section */}
          <div className="text-center mt-20 mb-8">
            <h3 className="text-2xl font-bold gradient-text mb-6">Professional Experience</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              My journey through challenging cybersecurity roles
            </p>
          </div>
          {renderWorkExperience()}
          
          {/* Certifications */}
          <div className="text-center mt-20 mb-8">
            <h3 className="text-2xl font-bold gradient-text mb-6">Certifications</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Professional credentials that validate my expertise
            </p>
          </div>
          {renderCertifications()}
          
          {/* Special Tools */}
          <div className="text-center mt-20 mb-8">
            <h3 className="text-2xl font-bold gradient-text mb-6">Specialized Tools</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Advanced security and development tools in my arsenal
            </p>
          </div>
          {renderSpecialTools()}
        </div>
      </section>
      
      {/* GitHub Contributions Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black via-black/80 to-black relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-6">GitHub Contributions</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A snapshot of my coding journey and open-source contributions
            </p>
          </div>
          
          <div className="glass p-8 rounded-xl border border-white/10">
            <GitHubCalendar 
              username="chirag-dewan" 
              colorScheme="dark"
              theme={{
                background: 'transparent',
                text: '#ffffff',
                grade4: '#ec4899',
                grade3: '#a855f7',
                grade2: '#6b21a8',
                grade1: '#4a044e',
                grade0: '#1f2937'
              }}
              style={{
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto'
              }}
            />
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
