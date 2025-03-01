import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedHero from '../components/AnimatedHero';
import ProjectShowcase from '../components/ProjectShowcase';
import SkillHexagon from '../components/SkillHexagon';
import ExperienceTimeline from '../components/ExperienceTimeline';
import InteractiveTerminal from '../components/InteractiveTerminal';
import ContactSection from '../components/ContactSection';

// Sample data
const personalProjects = [
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
    tags: ["C", "Networking", "Security", "Analysis"]
  },
  {
    id: "malware-research-tool",
    name: "Malware Analysis Tool",
    summary: "A modular Python framework unifying static, behavioral, memory, and network forensics with machine learning classification.",
    description: "Comprehensive malware analysis suite built with security and isolation in mind. Features Docker containerization for safe execution and integrates with YARA and other analysis tools for multi-layered detection.",
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
    name: "ML-Based Intrusion Detection System",
    summary: "An intelligent IDS leveraging machine learning to detect network intrusions with high accuracy using synthetic and real-world datasets.",
    description: "Next-generation intrusion detection combining signature and anomaly-based approaches. Uses ensemble learning methods to minimize false positives while maintaining high detection rates for novel attacks.",
    category: "ml",
    languages: [
      { name: "Python", percentage: 80 },
      { name: "TensorFlow", percentage: 15 },
      { name: "Bash", percentage: 5 }
    ],
    tags: ["Python", "ML", "Security", "Network"]
  }
];

const skills = {
  languages: [
    { name: 'Python', level: 95, description: 'Data analysis, automation, security tools', icon: '🐍', category: 'language' },
    { name: 'C/C++', level: 85, description: 'Low-level programming, system utilities', icon: '⚙️', category: 'language' },
    { name: 'JavaScript', level: 80, description: 'Web applications, data visualization', icon: '🌐', category: 'language' },
    { name: 'Rust', level: 75, description: 'Memory-safe systems programming', icon: '🦀', category: 'language' },
    { name: 'Bash', level: 70, description: 'Automation, system administration', icon: '💻', category: 'language' }
  ],
  security: [
    { name: 'Ghidra', level: 90, description: 'Binary analysis, reverse engineering', icon: '🔍', category: 'security' },
    { name: 'IDA Pro', level: 85, description: 'Disassembly, vulnerability research', icon: '🔬', category: 'security' },
    { name: 'Metasploit', level: 80, description: 'Penetration testing and exploitation', icon: '🛠️', category: 'security' },
    { name: 'Burp Suite', level: 75, description: 'Web application security testing', icon: '🕸️', category: 'security' },
    { name: 'Volatility', level: 70, description: 'Memory forensics, incident response', icon: '🧠', category: 'security' }
  ],
  cloud: [
    { name: 'AWS', level: 85, description: 'EC2, S3, Lambda, Security Groups', icon: '☁️', category: 'cloud' },
    { name: 'Azure', level: 75, description: 'Virtual Machines, Active Directory', icon: '📊', category: 'cloud' },
    { name: 'Docker', level: 80, description: 'Container orchestration and security', icon: '🐳', category: 'cloud' },
    { name: 'Kubernetes', level: 70, description: 'Container orchestration and management', icon: '⚓', category: 'cloud' }
  ],
  datascience: [
    { name: 'Pandas', level: 85, description: 'Data manipulation and analysis', icon: '🐼', category: 'datascience' },
    { name: 'NumPy', level: 80, description: 'Scientific computing', icon: '🔢', category: 'datascience' },
    { name: 'TensorFlow', level: 75, description: 'Machine learning and AI', icon: '🧠', category: 'datascience' },
    { name: 'Scikit-learn', level: 80, description: 'ML algorithms implementation', icon: '🤖', category: 'datascience' }
  ]
};

const professionalExperience = [
  {
    company: "RTX BBN",
    position: "Cyber Researcher",
    location: "Cambridge, MA",
    period: "May 2024 – Present",
    description: "Leading security research initiatives focused on vulnerability discovery and threat analysis for critical infrastructure systems.",
    responsibilities: [
      "Develop and implement packet parsing and analysis systems for network traffic inspection",
      "Conduct reverse engineering of firmware to identify and document security vulnerabilities",
      "Create proof-of-concept exploit code to demonstrate impact of discovered vulnerabilities",
      "Design and implement security automation pipelines for continuous vulnerability testing"
    ]
  },
  {
    company: "Raytheon, RTX",
    position: "Cyber Engineer",
    location: "Aurora, CO",
    period: "June 2023 – May 2024",
    description: "Led security hardening initiatives and performed extensive threat modeling to secure enterprise systems and critical infrastructure.",
    responsibilities: [
      "Performed comprehensive threat modeling and vulnerability analysis for critical systems",
      "Implemented hardening measures for Linux systems using SELinux and automated security scans",
      "Built secure environments for malware analysis and behavior monitoring",
      "Developed security automation frameworks integrated with CI/CD pipelines"
    ]
  },
  {
    company: "Raytheon, RTX",
    position: "Senior Cyber Engineering Intern",
    location: "Aurora, CO",
    period: "May 2022 – June 2023",
    description: "Conducted security assessments and developed tools for vulnerability discovery and exploitation in controlled environments.",
    responsibilities: [
      "Simulated real-world attacks to test security controls and detection capabilities",
      "Reverse-engineered binaries to identify and document exploitable vulnerabilities",
      "Created custom vulnerability scanners that combined multiple open-source tools",
      "Analyzed malware samples to document behaviors and improve detection capabilities"
    ]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedHero 
        name="Chirag Dewan"
        title="Cyber Research Scientist"
        description="In the realm of cybersecurity, continuous learning isn't just a choice – it's the foundation of excellence."
      />
      
      {/* Interactive Terminal Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black via-black/95 to-black relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Interactive Portfolio Terminal
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore my background using familiar command-line interface
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
            <h2 className="text-4xl font-bold gradient-text mb-6">Technical Skills</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Core competencies and technologies I've mastered
            </p>
          </div>
          
          <SkillHexagon skillData={skills} />
        </div>
      </section>
      
      {/* Experience Timeline */}
      <section className="py-20 px-4 bg-black relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-6">Professional Experience</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              My journey through cybersecurity challenges and achievements
            </p>
          </div>
          
          <ExperienceTimeline experiences={professionalExperience} />
        </div>
      </section>
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
