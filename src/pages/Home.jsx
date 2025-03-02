import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GitHubCalendar from 'react-github-calendar';
import AnimatedHero from '../components/AnimatedHero';
import ProjectShowcase from '../components/ProjectShowcase';
import SkillHexagon from '../components/SkillHexagon';
import InteractiveTerminal from '../components/InteractiveTerminal';
import ContactSection from '../components/ContactSection';

// Enhanced Skills Data based on resume
const skills = {
  coreCompetencies: [
    {
      category: 'Cybersecurity',
      skills: [
        { 
          name: 'Threat Modeling', 
          level: 90, 
          icon: '🛡️', 
          description: 'STRIDE methodology and MITRE ATT&CK framework implementation' 
        },
        { 
          name: 'Vulnerability Research', 
          level: 95, 
          icon: '🕵️', 
          description: 'Advanced exploit development and vulnerability discovery' 
        },
        { 
          name: 'Malware Analysis', 
          level: 88, 
          icon: '🦠', 
          description: 'Memory forensics and advanced binary instrumentation' 
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
          description: 'Advanced scripting, security tools, and machine learning' 
        },
        { 
          name: 'C/C++', 
          level: 85, 
          icon: '⚙️', 
          description: 'Low-level systems programming and exploit development' 
        },
        { 
          name: 'Rust', 
          level: 75, 
          icon: '🦀', 
          description: 'Memory-safe systems programming' 
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
          description: 'GuardDuty, Security Hub, and cloud infrastructure security' 
        },
        { 
          name: 'Docker/Kubernetes', 
          level: 80, 
          icon: '🐳', 
          description: 'Containerization and secure deployment strategies' 
        },
        { 
          name: 'CI/CD Security', 
          level: 75, 
          icon: '🔒', 
          description: 'Pipeline security integration and IaC scanning' 
        }
      ]
    },
    {
      category: 'Offensive Security',
      skills: [
        { 
          name: 'Penetration Testing', 
          level: 85, 
          icon: '🏴‍☠️', 
          description: 'Advanced offensive security techniques and tool development' 
        },
        { 
          name: 'Exploit Development', 
          level: 80, 
          icon: '💥', 
          description: 'Buffer overflows, heap sprays, and advanced exploit techniques' 
        },
        { 
          name: 'Fuzzing', 
          level: 85, 
          icon: '🐞', 
          description: 'Advanced fuzzing techniques with AFL++ and libFuzzer' 
        }
      ]
    }
  ],
  certifications: [
    { name: 'CompTIA Security+', status: 'Certified' },
    { name: 'CompTIA Network+', status: 'Certified' },
    { name: 'AWS Certified Cloud Professional', status: 'Certified' },
    { name: 'OSCP', status: 'In Progress' }
  ],
  specialTools: [
    'Cobalt Strike', 'Metasploit', 'Burp Suite Pro', 'Ghidra', 
    'IDA Pro', 'Wireshark', 'Volatility3', 'YARA'
  ]
};

// Sample project data (from previous implementation)
const personalProjects = [
  {
    id: "malware-research-tool",
    name: "Malware Analysis Framework",
    summary: "Comprehensive Python-based framework for multi-faceted threat detection and analysis.",
    description: "Advanced malware analysis system integrating static analysis, behavioral monitoring, memory forensics, and machine learning classification.",
    category: "security",
    languages: [
      { name: "Python", percentage: 75 },
      { name: "Docker", percentage: 15 },
      { name: "YARA", percentage: 10 }
    ],
    tags: ["Python", "Security", "ML", "Docker"]
  },
  {
    id: "ids-project",
    name: "Machine Learning IDS",
    summary: "Robust Intrusion Detection System leveraging advanced machine learning techniques.",
    description: "Modular Python application using scikit-learn for network security threat identification with comprehensive feature engineering.",
    category: "ml",
    languages: [
      { name: "Python", percentage: 80 },
      { name: "scikit-learn", percentage: 15 },
      { name: "Pytest", percentage: 5 }
    ],
    tags: ["Python", "ML", "Security", "Network"]
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
            <span className={`px-3 py-1 rounded-full text-xs ${
              cert.status === 'Certified' 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {cert.status}
            </span>
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedHero 
        name="Chirag Dewan"
        subtitle="Software Development Engineer II"
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
          
          {/* Certifications */}
          <div className="text-center mt-16 mb-8">
            <h3 className="text-2xl font-bold gradient-text mb-6">Certifications</h3>
          </div>
          {renderCertifications()}
          
          {/* Special Tools */}
          <div className="text-center mt-16 mb-8">
            <h3 className="text-2xl font-bold gradient-text mb-6">Specialized Tools</h3>
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
