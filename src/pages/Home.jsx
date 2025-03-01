import React from 'react';
import { Link } from 'react-router-dom';
import GitHubCalendar from 'react-github-calendar';
import AnimatedHero from '../components/AnimatedHero';
import ProjectShowcase from '../components/ProjectShowcase';
import SkillHexagon from '../components/SkillHexagon';
import InteractiveTerminal from '../components/InteractiveTerminal';
import ContactSection from '../components/ContactSection';

// Sample data (keep existing data from previous implementation)
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
  // ... other projects from previous implementation
];

const skills = {
  languages: [
    { name: 'Python', level: 95, description: 'Data analysis, automation, security tools', icon: '🐍', category: 'language' },
    { name: 'C/C++', level: 85, description: 'Low-level programming, system utilities', icon: '⚙️', category: 'language' },
    // ... other languages
  ],
  security: [
    { name: 'Ghidra', level: 90, description: 'Binary analysis, reverse engineering', icon: '🔍', category: 'security' },
    // ... other security tools
  ],
  // ... other skill categories
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedHero 
        name="Chirag Dewan"
        subtitle="Software Development Engineer II"
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
