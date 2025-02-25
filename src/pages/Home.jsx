import React, { useState, useEffect, useRef } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Link } from 'react-router-dom';

export default function Home() {
  // Animation state
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef({});

  // Typewriter effect for title
  const [titleText, setTitleText] = useState('');
  const fullTitleText = "Cyber Research Scientist"; // Fixed typo from "Cber RRsearch"
  
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullTitleText.length) {
        setTitleText(prev => prev + fullTitleText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Register a section ref
  const registerSection = (id, ref) => {
    if (ref && !sectionsRef.current[id]) {
      sectionsRef.current[id] = ref;
    }
  };

  // Featured projects with proper links
  const featuredProjects = [
    {
      id: "packet-prowler",
      title: "Packet Analysis Framework",
      description: "A next-generation packet sniffer for real-time traffic capture and threat detection",
      icon: "🔍",
      link: "/projects/packet-prowler"
    },
    {
      id: "malware-research-tool",
      title: "Malware Analysis Tool",
      description: "Comprehensive framework for static, behavioral, and memory forensics with ML classification",
      icon: "🔧",
      link: "/projects/malware-research-tool"
    },
    {
      id: "ids-project",
      title: "ML-Driven Security Research",
      description: "Machine learning techniques to detect pattern anomalies in security data",
      icon: "🧠",
      link: "/projects/ids-project"
    }
  ];

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
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0"></div>
          <div className="absolute top-1/4 -right-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight text-white">
            Chirag Dewan
          </h1>
          
          <div className="h-16 mb-8">
            <p className="text-2xl md:text-3xl text-gray-300 typewriter inline-block">
              {titleText}
            </p>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-400 italic mb-16 max-w-3xl mx-auto">
            "In the realm of cybersecurity, continuous learning isn't just a choice – it's the foundation of excellence."
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link to="/projects" className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-lg font-medium hover:scale-105 transition-all shadow-lg shadow-pink-500/20">
              View Projects
            </Link>
            <Link to="/resume" className="px-8 py-4 bg-transparent border border-white/30 rounded-full text-lg font-medium hover:bg-white/10 hover:border-white/50 transition-all">
              Resume
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Featured Projects */}
      <section 
        id="achievements-section" 
        ref={el => registerSection('achievements-section', el)} 
        className="py-24 px-4 bg-black"
      >
        <div className="container mx-auto">
          <div className={`transition-all duration-700 ${isVisible['achievements-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">
              Key Projects
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {featuredProjects.map((project, idx) => (
                <Link
                  key={project.id}
                  to={project.link}
                  className="glass p-8 rounded-xl border border-white/10 backdrop-blur-lg transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl hover:border-pink-500/20 group"
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-4xl mb-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl w-16 h-16 flex items-center justify-center">
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-pink-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <span className="text-pink-500 flex items-center gap-2 text-sm font-medium">
                    View Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about-section" 
        ref={el => registerSection('about-section', el)} 
        className="py-24 px-4 relative overflow-hidden"
      >
        <div className="absolute -top-40 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className={`transition-all duration-700 ${isVisible['about-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">About Me</h2>
            
            <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-2xl backdrop-blur-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 shadow-xl shadow-pink-500/5">
              <div className="prose prose-lg max-w-none text-gray-300">
                <p className="text-xl mb-6">
                  As a <span className="text-pink-500 font-medium">Cyber Researcher at RTX BBN</span>, I'm dedicated to uncovering and solving complex security challenges. 
                  My journey is driven by an unwavering commitment to learning and growth, pushing the boundaries of what's 
                  possible in cybersecurity.
                </p>
                <p className="text-xl mb-6">
                  Through persistence and hard work, I've developed expertise in vulnerability research, reverse engineering, 
                  and threat analysis. Each challenge is an opportunity to learn, innovate, and strengthen our digital defenses.
                </p>
                <p className="text-xl">
                  My approach combines technical depth with creative problem-solving. Whether I'm conducting firmware analysis, 
                  developing proof-of-concepts, or hardening enterprise systems, I bring meticulous attention to detail and a 
                  passion for excellence to every project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills-section" 
        ref={el => registerSection('skills-section', el)} 
        className="py-24 px-4 bg-gradient-to-b from-black to-black/80 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className={`transition-all duration-700 ${isVisible['skills-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">Professional Skills</h2>
            
            <div className="flex justify-center mb-12 gap-3 flex-wrap max-w-4xl mx-auto">
              {Object.keys(skills).filter(key => key !== 'certifications' && key !== 'certRoadmap').map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveSkillCategory(category)}
                  className={`px-6 py-3 rounded-full text-lg transition-all ${
                    activeSkillCategory === category 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium shadow-lg shadow-pink-500/20' 
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {skills[activeSkillCategory].map((skill, idx) => (
                <div 
                  key={skill.name} 
                  className="glass p-6 rounded-xl border border-white/10 backdrop-blur-md transition-all duration-500 hover:border-white/30 hover:shadow-lg hover:scale-[1.02]"
                  style={{ 
                    opacity: isVisible['skills-section'] ? 1 : 0,
                    transform: isVisible['skills-section'] ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease, transform 0.5s ease`,
                    transitionDelay: `${idx * 0.1}s`
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-2 rounded-lg">{skill.icon}</span>
                    <span className="text-xl font-bold">{skill.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Proficiency</span>
                    <span className="text-pink-500 font-medium">{skill.level}%</span>
                  </div>
                  
                  <div className="skill-bar mb-4 bg-gray-900/50 rounded-full overflow-hidden">
                    <div 
                      className="skill-progress rounded-full h-2" 
                      style={{ 
                        width: `${skill.level}%`,
                        background: 'linear-gradient(to right, #FF0080, #7928CA)',
                        boxShadow: '0 0 10px rgba(255, 0, 128, 0.3)'
                      }}
                    />
                  </div>
                  
                  <p className="text-gray-400">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification Roadmap */}
      <section 
        id="cert-roadmap" 
        ref={el => registerSection('cert-roadmap', el)} 
        className="py-24 px-4 relative overflow-hidden"
      >
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className={`transition-all duration-700 ${isVisible['cert-roadmap'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Certification Roadmap</h2>
            
            <div className="max-w-4xl mx-auto relative">
              <div className="absolute h-full w-1 bg-gradient-to-b from-pink-500 to-purple-500 left-[10px] md:left-1/2 transform md:-translate-x-1/2 top-0 shadow-glow"></div>
              
              <div className="space-y-16">
                {skills.certRoadmap.map((stage, idx) => (
                  <div 
                    key={idx} 
                    className={`relative flex items-start gap-8 ${
                      idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div 
                      className={`absolute left-[10px] md:left-1/2 top-3 w-5 h-5 rounded-full transform -translate-x-1/2 z-10 ${
                        stage.completed ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-pulse' : 
                        stage.inProgress ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50 animate-pulse' : 
                        'bg-white/20'
                      }`}
                    ></div>
                    
                    <div className="pl-10 md:pl-0 md:w-[45%]">
                      <div className="glass p-6 rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg">
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
                    
                    <div className="hidden md:block md:w-[55%]"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section 
        id="cert-section" 
        ref={el => registerSection('cert-section', el)} 
        className="py-24 px-4 bg-gradient-to-b from-black/80 to-black relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className={`transition-all duration-700 ${isVisible['cert-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">Certifications</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {skills.certifications.map((cert, idx) => (
                <div 
                  key={cert.name} 
                  className="glass p-6 rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl hover:bg-white/10 group"
                  style={{ 
                    opacity: isVisible['cert-section'] ? 1 : 0,
                    transform: isVisible['cert-section'] ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease, transform 0.5s ease`,
                    transitionDelay: `${idx * 0.1}s`
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{cert.icon}</span>
                    <h3 className="text-xl font-bold group-hover:text-pink-400 transition-colors">{cert.name}</h3>
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

      {/* GitHub Activity */}
      <section 
        id="github-section" 
        ref={el => registerSection('github-section', el)} 
        className="py-24 px-4 relative overflow-hidden"
      >
        <div className="absolute -top-40 -left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className={`transition-all duration-700 ${isVisible['github-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">GitHub Activity</h2>
            
            <div className="max-w-5xl mx-auto glass p-8 rounded-xl border border-white/10 backdrop-blur-md hover:border-white/20 transition-all shadow-xl shadow-pink-500/5">
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

      {/* Contact CTA */}
      <section 
        id="contact-section" 
        ref={el => registerSection('contact-section', el)} 
        className="py-24 px-4 bg-gradient-to-r from-pink-900/20 to-purple-900/20"
      >
        <div className="container mx-auto">
          <div className={`transition-all duration-700 ${isVisible['contact-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's Connect</h2>
              <p className="text-xl text-gray-300 mb-10">
                Interested in collaboration or have questions about my work? I'm always open to discussing new projects and opportunities.
              </p>
              <a 
                href="mailto:chirag0728@gmail.com" 
                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-lg font-medium inline-block hover:scale-105 transition-all shadow-lg shadow-pink-500/20"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 bg-black">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://github.com/chirag-dewan" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/cdewan" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
              Blog
            </a>
          </div>
          <p className="text-gray-500">© {new Date().getFullYear()} Chirag Dewan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
