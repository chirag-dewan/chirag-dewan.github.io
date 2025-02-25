import React, { useState, useEffect, useRef } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Link } from 'react-router-dom';

export default function Home() {
  // Animation state
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef({});

  // Typewriter effect for title
  const [titleText, setTitleText] = useState('');
  const fullTitleText = "Cyber Research Scientist";
  
  useEffect(() => {
    // Typewriter effect
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullTitleText.length) {
        setTitleText(prev => prev + fullTitleText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    // Intersection Observer for scroll animations
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

    // Observe all sections
    Object.values(sectionsRef.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      clearInterval(typingInterval);
      observer.disconnect();
    };
  }, []);

  // Register a section ref
  const registerSection = (id, ref) => {
    if (ref && !sectionsRef.current[id]) {
      sectionsRef.current[id] = ref;
    }
  };

  const skills = {
    languages: [
      { name: 'Python', level: 95, description: 'Data analysis, automation, security tools', icon: '🐍' },
      { name: 'C/C++', level: 85, description: 'Low-level programming, system utilities', icon: '⚙️' },
      { name: 'JavaScript', level: 80, description: 'Web applications, data visualization', icon: '🌐' },
      { name: 'Rust', level: 75, description: 'Memory-safe systems programming', icon: '🦀' },
      { name: 'Bash', level: 70, description: 'Automation, system administration', icon: '💻' }
    ],
    security: [
      { name: 'Ghidra', level: 90, description: 'Binary analysis, reverse engineering', icon: '🔍' },
      { name: 'IDA Pro', level: 85, description: 'Disassembly, vulnerability research', icon: '🔬' },
      { name: 'Metasploit', level: 80, description: 'Penetration testing and exploitation', icon: '🛠️' },
      { name: 'Burp Suite', level: 75, description: 'Web application security testing', icon: '🕸️' },
      { name: 'Volatility', level: 70, description: 'Memory forensics, incident response', icon: '🧠' }
    ],
    cloud: [
      { name: 'AWS', level: 85, description: 'EC2, S3, Lambda, Security Groups', icon: '☁️' },
      { name: 'Azure', level: 75, description: 'Virtual Machines, Active Directory', icon: '📊' },
      { name: 'Docker', level: 80, description: 'Container orchestration and security', icon: '🐳' },
      { name: 'Kubernetes', level: 70, description: 'Container orchestration and management', icon: '⚓' }
    ],
    datascience: [
      { name: 'Pandas', level: 85, description: 'Data manipulation and analysis', icon: '🐼' },
      { name: 'NumPy', level: 80, description: 'Scientific computing', icon: '🔢' },
      { name: 'TensorFlow', level: 75, description: 'Machine learning and AI', icon: '🧠' },
      { name: 'Scikit-learn', level: 80, description: 'ML algorithms implementation', icon: '🤖' }
    ],
    certifications: [
      { name: 'CompTIA Security+', status: 'Completed', year: '2022', icon: '🔐' },
      { name: 'CompTIA Network+', status: 'Completed', year: '2022', icon: '🌐' },
      { name: 'AWS Certified Cloud Practitioner', status: 'Completed', year: '2023', icon: '☁️' },
      { name: 'OSCP', status: 'In Progress', year: '2025 (Expected)', icon: '🛡️' },
      { name: 'CISSP', status: 'Not Started', year: 'Future Goal', icon: '🔒' },
    ],
    certRoadmap: [
      { 
        name: 'Foundation', 
        completed: true,
        year: '2022',
        certs: ['CompTIA Security+', 'CompTIA Network+']
      },
      { 
        name: 'Cloud Security', 
        completed: true,
        year: '2023',
        certs: ['AWS Cloud Practitioner']
      },
      { 
        name: 'Penetration Testing', 
        completed: false,
        inProgress: true,
        year: '2025',
        certs: ['OSCP']
      },
      { 
        name: 'Advanced Security', 
        completed: false,
        year: '2026-2027',
        certs: ['CISSP', 'OSWE']
      }
    ]
  };

  const [activeSkillCategory, setActiveSkillCategory] = useState('languages');

  return (
    <div className="min-h-screen">
      {/* Hero Section - Netflix/Apple Style */}
      <section className="min-h-screen flex flex-col justify-center items-center relative py-16 px-4">
        {/* Background gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
            Chirag Dewan
          </h1>
          
          <div className="h-16 mb-8">
            <p className="text-2xl md:text-3xl text-gray-400 typewriter">
              {titleText}
            </p>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-400 italic mb-16 max-w-3xl mx-auto">
            "In the realm of cybersecurity, continuous learning isn't just a choice – it's the foundation of excellence."
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link to="/projects" className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-lg font-medium hover:scale-105 transition-all">
              View Projects
            </Link>
            <Link to="/resume" className="px-8 py-4 bg-transparent border border-white/30 rounded-full text-lg font-medium hover:bg-white/10 transition-all">
              Resume
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* About Section - Spotify Card Style */}
      <section 
        id="about-section" 
        ref={el => registerSection('about-section', el)} 
        className="py-24 px-4"
      >
        <div className="container mx-auto">
          <div className={`transition-all duration-700 ${isVisible['about-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">About Me</h2>
            
            <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-2xl backdrop-blur-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10">
              <div className="prose prose-lg max-w-none text-gray-300">
                <p className="text-xl mb-6">
                  As a <span className="text-pink-500 font-medium">Cyber Researcher at RTX BBN</span>, I'm dedicated to uncovering and solving complex security challenges. 
                  My journey is driven by an unwavering commitment to learning and growth, pushing the boundaries of what's 
                  possible in cybersecurity.
                </p>
                <p className="text-xl">
                  Through persistence and hard work, I've developed expertise in vulnerability research, reverse engineering, 
                  and threat analysis. Each challenge is an opportunity to learn, innovate, and strengthen our digital defenses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Apple Style Cards */}
      <section 
        id="skills-section" 
        ref={el => registerSection('skills-section', el)} 
        className="py-24 px-4 bg-black/30"
      >
        <div className="container mx-auto">
          <div className={`transition-all duration-700 ${isVisible['skills-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">Professional Skills</h2>
            
            <div className="flex justify-center mb-12 gap-2 flex-wrap">
              {Object.keys(skills).filter(key => key !== 'certifications' && key !== 'certRoadmap').map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveSkillCategory(category)}
                  className={`px-6 py-3 rounded-full text-lg transition-all ${
                    activeSkillCategory === category 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills[activeSkillCategory].map((skill, idx) => (
                <div 
                  key={skill.name} 
                  className="glass p-6 rounded-xl border border-white/10 backdrop-blur-md transition-all duration-500 hover:border-white/30 hover:shadow-lg"
                  style={{ 
                    opacity: isVisible['skills-section'] ? 1 : 0,
                    transform: isVisible['skills-section'] ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease, transform 0.5s ease`,
                    transitionDelay: `${idx * 0.1}s`
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="text-xl font-bold">{skill.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Proficiency</span>
                    <span className="text-pink-500 font-medium">{skill.level}%</span>
                  </div>
                  
                  <div className="skill-bar mb-4">
                    <div 
                      className="skill-progress rounded-full" 
                      style={{ '--skill-level': `${skill.level}%` }}
                    />
                  </div>
                  
                  <p className="text-gray-400">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification Roadmap - Netflix Timeline Style */}
      <section 
        id="cert-roadmap" 
        ref={el => registerSection('cert-roadmap', el)} 
        className="py-24 px-4"
      >
        <div className="container mx-auto">
          <div className={`transition-all duration-700 ${isVisible['cert-roadmap'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Certification Roadmap</h2>
            
            <div className="max-w-4xl mx-auto relative">
              {/* Timeline line */}
              <div className="absolute h-full w-1 bg-gradient-to-b from-pink-500 to-purple-500 left-[10px] md:left-1/2 transform md:-translate-x-1/2 top-0"></div>
              
              {/* Timeline items */}
              <div className="space-y-16">
                {skills.certRoadmap.map((stage, idx) => (
                  <div 
                    key={idx} 
                    className={`relative flex items-start gap-8 ${
                      idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div 
                      className={`absolute left-[10px] md:left-1/2 top-3 w-5 h-5 rounded-full transform -translate-x-1/2 z-10 ${
                        stage.completed ? 'bg-green-500 animate-pulse' : 
                        stage.inProgress ? 'bg-yellow-500 animate-pulse' : 
                        'bg-white/20'
                      }`}
                    ></div>
                    
                    {/* Content */}
                    <div className="pl-10 md:pl-0 md:w-[45%]">
                      <div className="glass p-6 rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-xl">{stage.name}</h3>
                          <span className={`text-sm px-3 py-1 rounded-full ${
                            stage.completed ? 'bg-green-500/20 text-green-400' : 
                            stage.inProgress ? 'bg-yellow-500/20 text-yellow-400' : 
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {stage.year}
                          </span>
                        </div>
                        <ul className="space-y-3">
                          {stage.certs.map((cert, certIdx) => (
                            <li key={certIdx} className="text-gray-300 flex items-center gap-2">
                              <span className="text-pink-500">•</span> {cert}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block md:w-[55%]"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications - Spotify Card Grid */}
      <section 
        id="cert-section" 
        ref={el => registerSection('cert-section', el)} 
        className="py-24 px-4 bg-black/30"
      >
        <div className="container mx-auto">
          <div className={`transition-all duration-700 ${isVisible['cert-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">Certifications</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.certifications.map((cert, idx) => (
                <div 
                  key={cert.name} 
                  className="glass p-6 rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl hover:bg-white/10"
                  style={{ 
                    opacity: isVisible['cert-section'] ? 1 : 0,
                    transform: isVisible['cert-section'] ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease, transform 0.5s ease`,
                    transitionDelay: `${idx * 0.1}s`
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl">{cert.icon}</span>
                    <h3 className="text-xl font-bold">{cert.name}</h3>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      cert.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      cert.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {cert.status}
                    </span>
                    <span className="text-gray-400">{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Activity - Apple Card Style */}
      <section 
        id="github-section" 
        ref={el => registerSection('github-section', el)} 
        className="py-24 px-4"
      >
        <div className="container mx-auto">
          <div className={`transition-all duration-700 ${isVisible['github-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">GitHub Activity</h2>
            
            <div className="max-w-5xl mx-auto glass p-8 rounded-xl border border-white/10 backdrop-blur-md">
              <div className="flex justify-center overflow-x-auto py-4">
                <GitHubCalendar 
                  username="chirag-dewan"
                  colorScheme="dark"
                  blockSize={12}
                  blockMargin={4}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal Apple Style */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Chirag Dewan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
