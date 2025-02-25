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
      { name: 'Python', level: 95, description: 'Data analysis, automation, security tools' },
      { name: 'C', level: 85, description: 'Low-level programming, system utilities' },
      { name: 'JavaScript', level: 80, description: 'Web applications, data visualization' },
      { name: 'Rust', level: 75, description: 'Memory-safe systems programming' },
      { name: 'Bash', level: 70, description: 'Automation, system administration' }
    ],
    security: [
      { name: 'Ghidra', level: 90, description: 'Binary analysis, reverse engineering' },
      { name: 'IDA Pro', level: 85, description: 'Disassembly, vulnerability research' },
      { name: 'Metasploit', level: 80, description: 'Penetration testing and exploitation' },
      { name: 'Burp Suite', level: 75, description: 'Web application security testing' },
      { name: 'Volatility', level: 70, description: 'Memory forensics, incident response' }
    ],
    cloud: [
      { name: 'AWS', level: 85, description: 'EC2, S3, Lambda, Security Groups' },
      { name: 'Azure', level: 75, description: 'Virtual Machines, Active Directory' },
      { name: 'Docker', level: 80, description: 'Container orchestration and security' },
      { name: 'Kubernetes', level: 70, description: 'Container orchestration and management' }
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
    <div className="min-h-screen container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-20 text-center relative py-8">
        {/* Visual elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Chirag Dewan
        </h1>
        <div className="h-10 mb-4">
          <p className="text-xl text-gray-400 typewriter">
            {titleText}
          </p>
        </div>
        <p className="text-xl text-gray-400 italic mb-8 max-w-3xl mx-auto">
          "In the realm of cybersecurity, continuous learning isn't just a choice – it's the foundation of excellence."
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link to="/projects" className="button-primary">View Projects</Link>
          <Link to="/resume" className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all">Resume</Link>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about-section" 
        ref={el => registerSection('about-section', el)} 
        className="mb-20 glass p-8 rounded-lg"
      >
        <div className={`transition-all duration-700 ${isVisible['about-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <div className="prose prose-invert">
            <p className="text-lg mb-4">
              As a Cyber Researcher at RTX BBN, I'm dedicated to uncovering and solving complex security challenges. 
              My journey is driven by an unwavering commitment to learning and growth, pushing the boundaries of what's 
              possible in cybersecurity.
            </p>
            <p className="text-lg">
              Through persistence and hard work, I've developed expertise in vulnerability research, reverse engineering, 
              and threat analysis. Each challenge is an opportunity to learn, innovate, and strengthen our digital defenses.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills-section" 
        ref={el => registerSection('skills-section', el)} 
        className="mb-20"
      >
        <div className={`transition-all duration-700 ${isVisible['skills-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold mb-8 text-center">Professional Skills</h2>
          
          <div className="flex justify-center mb-8 gap-2 flex-wrap">
            {Object.keys(skills).filter(key => key !== 'certifications' && key !== 'certRoadmap').map((category) => (
              <button
                key={category}
                onClick={() => setActiveSkillCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeSkillCategory === category 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {skills[activeSkillCategory].map((skill, idx) => (
              <div 
                key={skill.name} 
                className="glass p-6 rounded-lg hover:shadow-lg transition-all"
                style={{ 
                  animationDelay: `${idx * 0.1}s`,
                  opacity: isVisible['skills-section'] ? 1 : 0,
                  transform: isVisible['skills-section'] ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease, transform 0.5s ease`,
                  transitionDelay: `${idx * 0.1}s`
                }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-bold">{skill.name}</span>
                  <span className="text-pink-500">{skill.level}%</span>
                </div>
                <div className="skill-bar mb-3">
                  <div 
                    className="skill-progress" 
                    style={{ '--skill-level': `${skill.level}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Roadmap */}
      <section 
        id="cert-roadmap" 
        ref={el => registerSection('cert-roadmap', el)} 
        className="mb-20 glass p-8 rounded-lg"
      >
        <div className={`transition-all duration-700 ${isVisible['cert-roadmap'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold mb-8">Certification Roadmap</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute h-full w-1 bg-gradient-to-b from-pink-500 to-purple-500 left-[7px] md:left-[50%] top-0 transform md:translate-x-[-50%]"></div>
            
            {/* Timeline items */}
            <div className="space-y-10">
              {skills.certRoadmap.map((stage, idx) => (
                <div key={idx} className={`relative flex items-start ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Timeline dot */}
                  <div 
                    className={`absolute left-[7px] md:left-[50%] top-3 w-4 h-4 rounded-full transform translate-x-[-50%] border-2 ${
                      stage.completed ? 'bg-green-500 border-green-600' : 
                      stage.inProgress ? 'bg-yellow-500 border-yellow-600' : 
                      'bg-gray-700 border-gray-600'
                    }`}
                  ></div>
                  
                  {/* Content */}
                  <div className="pl-10 md:pl-0 md:w-[45%]">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">{stage.name}</h3>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          stage.completed ? 'bg-green-500/20 text-green-400' : 
                          stage.inProgress ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {stage.year}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {stage.certs.map((cert, certIdx) => (
                          <li key={certIdx} className="text-gray-300 flex items-center gap-2">
                            <span>•</span> {cert}
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
      </section>

      {/* Certifications */}
      <section 
        id="cert-section" 
        ref={el => registerSection('cert-section', el)} 
        className="glass p-8 rounded-lg mb-20"
      >
        <div className={`transition-all duration-700 ${isVisible['cert-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold mb-8">Certifications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.certifications.map((cert, idx) => (
              <div 
                key={cert.name} 
                className="content-card p-5 hover:scale-105 transition-all"
                style={{ 
                  opacity: isVisible['cert-section'] ? 1 : 0,
                  transform: isVisible['cert-section'] ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease, transform 0.5s ease`,
                  transitionDelay: `${idx * 0.1}s`
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{cert.icon}</span>
                  <h3 className="font-bold">{cert.name}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${
                    cert.status === 'Completed' ? 'text-green-500' :
                    cert.status === 'In Progress' ? 'text-yellow-500' :
                    'text-gray-500'
                  }`}>
                    {cert.status}
                  </span>
                  <span className="text-xs text-gray-400">{cert.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Activity */}
      <section 
        id="github-section" 
        ref={el => registerSection('github-section', el)} 
        className="glass p-8 rounded-lg mb-8"
      >
        <div className={`transition-all duration-700 ${isVisible['github-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl font-bold mb-8">GitHub Activity</h2>
          <div className="flex justify-center overflow-x-auto py-2">
            <GitHubCalendar 
              username="chirag-dewan"
              colorScheme="dark"
              blockSize={12}
              blockMargin={4}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
