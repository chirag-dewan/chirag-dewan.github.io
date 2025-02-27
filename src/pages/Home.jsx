import React, { useState, useEffect, useRef } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { Link } from 'react-router-dom';

// Fixed Typewriter Component
const TypewriterEffect = ({ text, delay = 100, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const index = useRef(0);
  
  useEffect(() => {
    setDisplayText('');
    index.current = 0;
    setIsTyping(true);
    
    if (!text) return;
    
    const intervalId = setInterval(() => {
      if (index.current < text.length) {
        setDisplayText(prev => prev + text.charAt(index.current));
        index.current += 1;
      } else {
        setIsTyping(false);
        clearInterval(intervalId);
      }
    }, delay);
    
    return () => clearInterval(intervalId);
  }, [text, delay]);
  
  return (
    <span className={className || ""}>
      {displayText}
      <span 
        className={`inline-block w-[2px] h-[1em] bg-pink-500 ml-1 align-middle ${isTyping ? 'animate-pulse' : 'opacity-0'}`}
        style={{ animationDuration: '0.75s' }}
      />
    </span>
  );
};

export default function Home() {
  // Animation state
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef({});

  // Intersection Observer for scroll animations
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

    // Observe all sections
    Object.values(sectionsRef.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
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
      link: "/projects/packet-prowler",
      bgGradient: "from-blue-900/20 to-blue-800/10",
      borderColor: "border-blue-500/20",
      hoverColor: "group-hover:text-blue-400"
    },
    {
      id: "malware-research-tool",
      title: "Malware Analysis Tool",
      description: "Comprehensive framework for static, behavioral, and memory forensics with ML classification",
      icon: "🔧",
      link: "/projects/malware-research-tool",
      bgGradient: "from-red-900/20 to-red-800/10",
      borderColor: "border-red-500/20",
      hoverColor: "group-hover:text-red-400"
    },
    {
      id: "ids-project",
      title: "ML-Driven Security Research",
      description: "Machine learning techniques to detect pattern anomalies in security data",
      icon: "🧠",
      link: "/projects/ids-project",
      bgGradient: "from-purple-900/20 to-purple-800/10",
      borderColor: "border-purple-500/20",
      hoverColor: "group-hover:text-purple-400"
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
      {/* Enhanced Hero Section with parallax effect */}
      <section className="min-h-screen flex flex-col justify-center relative py-16 px-4 overflow-hidden">
        {/* Animated background elements with improved parallax effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0"></div>
          
          {/* Animated gradient orbs with glow effects */}
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse shadow-[0_0_80px_40px_rgba(236,72,153,0.1)]"></div>
          <div className="absolute top-3/4 -left-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse shadow-[0_0_80px_40px_rgba(59,130,246,0.1)]" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse shadow-[0_0_80px_40px_rgba(168,85,247,0.1)]" style={{ animationDelay: '1s' }}></div>
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDF2MmgtMnYtMWgxem0tNSAydjFoLTJ2LTFoMnptOSAwaC0xdjJjLS41NTIgMC0xLS40NDgtMS0xdi0xaDF6TTM0IDI5di0xaDF2MWgtMXptMC0zdi0xaDF2MWgtMXpNMjQgMjl2LTFoMXYxaC0xem0wLTJ2LTFoMXYxaC0xem0tMSA0di0xaDF2MWgtMXptLTkgOHYtMWgxdjFoLTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5 mix-blend-overlay"></div>
        </div>
        
        <div className="container mx-auto z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent drop-shadow-sm">
            Chirag Dewan
          </h1>
          
          <div className="h-16 mb-8">
            <p className="text-2xl md:text-3xl text-gray-300 inline-block">
              <TypewriterEffect 
                text="Cyber Research Scientist" 
                delay={100}
                className="font-medium"
              />
            </p>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-400 italic mb-16 max-w-3xl mx-auto backdrop-blur-sm py-2">
            "In the realm of cybersecurity, continuous learning isn't just a choice – it's the foundation of excellence."
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link to="/projects" className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-lg font-medium hover:scale-105 transition-all shadow-lg shadow-pink-500/20 relative overflow-hidden group">
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
            </Link>
            <Link to="/resume" className="px-8 py-4 bg-transparent border border-white/30 rounded-full text-lg font-medium hover:bg-white/10 hover:border-white/50 transition-all relative overflow-hidden group">
              <span className="relative z-10">Resume</span>
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </div>
        </div>
        
        {/* Enhanced scroll indicator with animation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-14 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-[scroll_1.5s_infinite]"></div>
          </div>
        </div>
      </section>

      {/* Featured Projects - With enhanced cards and animations */}
      <section 
        id="achievements-section" 
        ref={el => registerSection('achievements-section', el)} 
        className="py-24 px-4 bg-black relative"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDF2MmgtMnYtMWgxem0tNSAydjFoLTJ2LTFoMnptOSAwaC0xdjJjLS41NTIgMC0xLS40NDgtMS0xdi0xaDF6TTM0IDI5di0xaDF2MWgtMXptMC0zdi0xaDF2MWgtMXpNMjQgMjl2LTFoMXYxaC0xem0wLTJ2LTFoMXYxaC0xem0tMSA0di0xaDF2MWgtMXptLTkgOHYtMWgxdjFoLTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-5"></div>
        
        <div className="container mx-auto relative z-10">
          <div className={`transition-all duration-700 ${isVisible['achievements-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">
              Key Projects
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredProjects.map((project, idx) => (
                <Link
                  key={project.id}
                  to={project.link}
                  className={`glass p-8 rounded-xl border ${project.borderColor} backdrop-blur-lg transition-all duration-500 hover:translate-y-[-12px] hover:shadow-2xl group bg-gradient-to-br ${project.bgGradient}`}
                  style={{ 
                    transitionDelay: `${idx * 0.15}s`,
                    boxShadow: '0 10px 40px -15px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="text-5xl mb-8 w-20 h-20 flex items-center justify-center rounded-2xl shadow-lg bg-gradient-to-br from-black/50 to-black/20 border border-white/10">
                    {project.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${project.hoverColor}`}>{project.title}</h3>
                  <p className="text-gray-300 mb-6">{project.description}</p>
                  <span className="text-pink-500 flex items-center gap-2 text-sm font-medium group-hover:translate-x-1 transition-transform">
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

      {/* About Section - Enhanced with interactive elements */}
      <section 
        id="about-section" 
        ref={el => registerSection('about-section', el)} 
        className="py-24 px-4 relative overflow-hidden"
      >
        <div className="absolute -top-40 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className={`transition-all duration-700 ${isVisible['about-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">About Me</h2>
            
            <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/2 hover:from-white/8 hover:to-white/3 transition-all border border-white/10 shadow-xl shadow-pink-500/5">
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
              
              <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-3xl font-bold text-pink-500 mb-2">4+</div>
                  <div className="text-sm text-gray-400">Years in Cybersecurity</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-3xl font-bold text-blue-500 mb-2">TS</div>
                  <div className="text-sm text-gray-400">Clearance Level</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-3xl font-bold text-purple-500 mb-2">15+</div>
                  <div className="text-sm text-gray-400">Security Projects</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <div className="text-3xl font-bold text-green-500 mb-2">3+</div>
                  <div className="text-sm text-gray-400">Certifications</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Enhanced with interactive features and animations */}
      <section 
        id="skills-section" 
        ref={el => registerSection('skills-section', el)} 
        className="py-24 px-4 bg-gradient-to-b from-black to-black/90 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className={`transition-all duration-700 ${isVisible['skills-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">
              Professional Skills
            </h2>
            
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
                  className="glass p-6 rounded-xl border border-white/10 backdrop-blur-md transition-all duration-500 hover:border-white/30 hover:shadow-xl hover:scale-[1.03] hover:bg-white/5 group"
                  style={{ 
                    opacity: isVisible['skills-section'] ? 1 : 0,
                    transform: isVisible['skills-section'] ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease, transform 0.5s ease, border 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease`,
                    transitionDelay: `${idx * 0.1}s`
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </span>
                    <span className="text-xl font-bold group-hover:text-pink-400 transition-colors">{skill.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">Proficiency</span>
                    <span className="text-pink-500 font-medium">{skill.level}%</span>
                  </div>
                  
                  <div className="relative h-2 rounded-full overflow-hidden bg-gray-900/50 mb-4 group-hover:bg-gray-900/70 transition-colors">
                    <div className="absolute top-0 left-0 bottom-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" style={{ width: `${skill.level}%` }}></div>
                    <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full filter blur-md" style={{ width: `${skill.level}%` }}></div>
                    <div 
                      className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/20 rounded-full animate-[shimmer_2s_infinite]" 
                      style={{ 
                        width: '50%',
                        transform: 'translateX(-100%)',
                        animation: 'shimmer 2s infinite',
                        opacity: 0.3,
                        display: isVisible['skills-section'] ? 'block' : 'none'
                      }}
                    ></div>
                  </div>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Add shimmer animation */}
        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          @keyframes scroll {
            0% {
              transform: translateY(0);
            }
            30% {
              transform: translateY(4px);
            }
            60%, 100% {
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Certification Roadmap - Enhanced with better visualization */}
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
              {/* Timeline line with enhanced glow */}
              <div className="absolute h-full w-1 bg-gradient-to-b from-pink-500 to-purple-500 left-[10px] md:left-1/2 transform md:-translate-x-1/2 top-0 shadow-[0_0_15px_rgba(236,72,153,0.5)]"></div>
              
              {/* Timeline items */}
              <div className="space-y-16">
                {skills.certRoadmap.map((stage, idx) => (
                  <div 
                    key={idx} 
                    className={`relative flex items-start gap-8 ${
                      idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    style={{ 
                      opacity: isVisible['cert-roadmap'] ? 1 : 0,
                      transform: isVisible['cert-roadmap'] ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.5s ease, transform 0.5s ease',
                      transitionDelay: `${idx * 0.2}s`
                    }}
                  >
                    {/* Timeline dot with enhanced effects */}
                    <div 
                      className={`absolute left-[10px] md:left-1/2 top-3 w-5 h-5 rounded-full transform -translate-x-1/2 z-10 ${
                        stage.completed ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-pulse' : 
                        stage.inProgress ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50 animate-pulse' : 
                        'bg-white/20'
                      }`}
                    ></div>
                    
                    {/* Content with enhanced effects */}
                    <div className="pl-10 md:pl-0 md:w-[45%]">
                      <div className="glass p-6 rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-lg group">
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

      {/* Certifications - Enhanced with better visual design */}
      <section 
        id="cert-section" 
        ref={el => registerSection('cert-section', el)} 
        className="py-24 px-4 bg-gradient-to-b from-black/80 to-black relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className={`transition-all duration-700 ${isVisible['cert-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">Certifications</h2>
            
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
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{cert.icon}</span>
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

      {/* GitHub Activity - Enhanced with better visuals */}
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
              
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-2xl font-bold text-green-400 mb-1">120+</div>
                  <div className="text-sm text-gray-400">Contributions</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-2xl font-bold text-blue-400 mb-1">15+</div>
                  <div className="text-sm text-gray-400">Repositories</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-2xl font-bold text-purple-400 mb-1">8+</div>
                  <div className="text-sm text-gray-400">Pull Requests</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-2xl font-bold text-pink-400 mb-1">3+</div>
                  <div className="text-sm text-gray-400">Open Source Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA - Enhanced with better visuals */}
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
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                <a 
                  href="mailto:chirag0728@gmail.com" 
                  className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-lg font-medium inline-flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-pink-500/20 w-full sm:w-auto justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Me
                </a>
                <a 
                  href="https://linkedin.com/in/cdewan" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-8 py-4 bg-blue-600 rounded-full text-lg font-medium inline-flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-blue-500/20 w-full sm:w-auto justify-center"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
              
              <div className="flex justify-center gap-6">
                <a href="https://github.com/chirag-dewan" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  GitHub
                </a>
                <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
                <a href="/resume" className="text-gray-400 hover:text-white transition-colors">
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal Apple Style with Enhanced Design */}
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
