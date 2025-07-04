import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [currentSection, setCurrentSection] = useState('terminal');
  const [terminalLines, setTerminalLines] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const canvasRef = useRef(null);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01SECURITY10HACK01DEFEND10PROTECT";
    const charArray = chars.split('');
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Terminal simulation
  useEffect(() => {
    if (currentSection === 'terminal') {
      setTerminalLines([]);
      const commands = [
        '> initializing security protocols...',
        '> scanning network infrastructure...',
        '> vulnerability assessment: COMPLETE',
        '> threat analysis: 20+ vulnerabilities discovered',
        '> penetration testing framework: ACTIVE',
        '> reverse engineering tools: LOADED',
        '> welcome to chirag_dewan security research lab',
        '> type "help" for available commands'
      ];

      let index = 0;
      const typeCommand = () => {
        if (index < commands.length) {
          setIsTyping(true);
          setTimeout(() => {
            setTerminalLines(prev => [...prev, commands[index]]);
            setIsTyping(false);
            index++;
            setTimeout(typeCommand, 800);
          }, Math.random() * 1000 + 500);
        }
      };

      const timer = setTimeout(typeCommand, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentSection]);

  const skills = [
    { name: 'Vulnerability Research', level: 95, color: '#ff6b6b' },
    { name: 'Reverse Engineering', level: 90, color: '#4ecdc4' },
    { name: 'Exploit Development', level: 88, color: '#45b7d1' },
    { name: 'Malware Analysis', level: 92, color: '#96ceb4' },
    { name: 'Network Security', level: 89, color: '#feca57' },
    { name: 'SCADA Security', level: 87, color: '#ff9ff3' }
  ];

  const projects = [
    {
      name: 'Packet Prowler',
      description: 'Advanced C-based network packet sniffer with real-time analysis',
      tech: ['C', 'libpcap', 'BPF'],
      status: 'active',
      threat_level: 'high',
      github: 'https://github.com/chirag-dewan/Packet-Prowler'
    },
    {
      name: 'Malware Analysis Framework',
      description: 'ML-powered malware detection and behavioral analysis platform',
      tech: ['Python', 'TensorFlow', 'YARA'],
      status: 'active',
      threat_level: 'critical'
    },
    {
      name: 'ML-Based IDS',
      description: 'Intelligent intrusion detection with ensemble learning',
      tech: ['Python', 'Scikit-learn', 'Network Analysis'],
      status: 'deployed',
      threat_level: 'medium'
    }
  ];

  const TerminalSection = () => (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 overflow-hidden relative">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none opacity-20"
      />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-gray-400">chirag_dewan@security-lab</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-2xl font-bold mb-4 text-cyan-400">
            ╔══════════════════════════════════════════════════════════════╗
            <br />
            ║                CHIRAG DEWAN - SECURITY RESEARCHER            ║
            <br />
            ║                GM FINANCIAL | SOFTWARE ENGINEER II           ║
            <br />
            ╚══════════════════════════════════════════════════════════════╝
          </div>

          {terminalLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              <span className="text-cyan-400 mr-2">$</span>
              <span>{line}</span>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex items-center">
              <span className="text-cyan-400 mr-2">$</span>
              <div className="w-2 h-5 bg-green-400 animate-pulse"></div>
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setCurrentSection('skills')}
            className="bg-gray-900 border-2 border-green-400 p-6 rounded-lg hover:bg-green-400 hover:text-black transition-all"
          >
            <div className="text-lg font-bold mb-2">SKILLS.EXE</div>
            <div className="text-sm">Technical Arsenal</div>
          </button>

          <button
            onClick={() => setCurrentSection('projects')}
            className="bg-gray-900 border-2 border-cyan-400 p-6 rounded-lg hover:bg-cyan-400 hover:text-black transition-all"
          >
            <div className="text-lg font-bold mb-2">PROJECTS.EXE</div>
            <div className="text-sm">Security Tools</div>
          </button>

          <button
            onClick={() => setCurrentSection('contact')}
            className="bg-gray-900 border-2 border-red-400 p-6 rounded-lg hover:bg-red-400 hover:text-black transition-all"
          >
            <div className="text-lg font-bold mb-2">CONTACT.EXE</div>
            <div className="text-sm">Secure Communication</div>
          </button>
        </div>

        <div className="mt-12 text-center">
          <div className="text-gray-500 text-sm">
            <p>Current Status: <span className="text-green-400">ONLINE</span></p>
            <p>Security Level: <span className="text-red-400">MAXIMUM</span></p>
            <p>System Uptime: <span className="text-cyan-400">365 days</span></p>
          </div>
        </div>
      </div>
    </div>
  );

  const SkillsSection = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">SECURITY ARSENAL</h2>
          <p className="text-xl text-gray-300">Advanced capabilities in cyber warfare and defense</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="bg-black bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                <span className="text-sm px-3 py-1 bg-gray-800 text-green-400 rounded-full">
                  {skill.level}%
                </span>
              </div>
              
              <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ 
                    backgroundColor: skill.color,
                    width: `${skill.level}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-black bg-opacity-70 rounded-2xl p-8 border border-red-500">
            <h3 className="text-2xl font-bold text-red-400 mb-4">THREAT ASSESSMENT</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-red-400">Vulnerabilities Found</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">4+</div>
                <div className="text-green-400">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-blue-400">Security Tools Built</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-purple-400">Dedicated to Security</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentSection('terminal')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold"
          >
            ← RETURN TO TERMINAL
          </button>
        </div>
      </div>
    </div>
  );

  const ProjectsSection = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">SECURITY OPERATIONS</h2>
          <p className="text-xl text-gray-300">Advanced cybersecurity tools and frameworks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className="bg-black bg-opacity-80 rounded-xl p-6 border-2 border-gray-700 hover:border-red-500 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{project.name}</h3>
                <div className={`px-2 py-1 rounded text-xs font-bold ${
                  project.threat_level === 'critical' ? 'bg-red-600 text-white' :
                  project.threat_level === 'high' ? 'bg-orange-600 text-white' :
                  'bg-yellow-600 text-black'
                }`}>
                  {project.threat_level.toUpperCase()}
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-gray-800 text-green-400 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded text-sm font-bold ${
                  project.status === 'active' ? 'bg-green-600 text-white' :
                  project.status === 'deployed' ? 'bg-blue-600 text-white' :
                  'bg-gray-600 text-white'
                }`}>
                  {project.status.toUpperCase()}
                </span>
                
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span className="mr-2">ANALYZE</span>
                    <span>→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentSection('terminal')}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold"
          >
            ← RETURN TO TERMINAL
          </button>
        </div>
      </div>
    </div>
  );

  const ContactSection = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">SECURE COMMUNICATION</h2>
          <p className="text-xl text-gray-300">Encrypted channels available</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black bg-opacity-70 rounded-xl p-8 border border-green-500">
            <h3 className="text-2xl font-bold text-green-400 mb-6">CONTACT PROTOCOLS</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">@</span>
                </div>
                <div>
                  <div className="text-white font-bold">Email</div>
                  <div className="text-gray-400">chirag0728@gmail.com</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">LI</span>
                </div>
                <div>
                  <div className="text-white font-bold">LinkedIn</div>
                  <div className="text-gray-400">linkedin.com/in/cdewan</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">GH</span>
                </div>
                <div>
                  <div className="text-white font-bold">GitHub</div>
                  <div className="text-gray-400">github.com/chirag-dewan</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">📞</span>
                </div>
                <div>
                  <div className="text-white font-bold">Phone</div>
                  <div className="text-gray-400">(919) 771-7668</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black bg-opacity-70 rounded-xl p-8 border border-purple-500">
            <h3 className="text-2xl font-bold text-purple-400 mb-6">CURRENT STATUS</h3>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-green-400 font-bold">GM Financial</div>
                <div className="text-white">Software Engineer II</div>
                <div className="text-gray-400">Financial Technology Solutions</div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-blue-400 font-bold">Previous: RTX BBN</div>
                <div className="text-white">Cyber Research Engineer I</div>
                <div className="text-gray-400">Vulnerability Research & Analysis</div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-yellow-400 font-bold">Availability</div>
                <div className="text-white">Open to Opportunities</div>
                <div className="text-gray-400">Security Consulting Available</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentSection('terminal')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold"
          >
            ← RETURN TO TERMINAL
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {currentSection === 'terminal' && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TerminalSection />
          </motion.div>
        )}
        
        {currentSection === 'skills' && (
          <motion.div
            key="skills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SkillsSection />
          </motion.div>
        )}
        
        {currentSection === 'projects' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProjectsSection />
          </motion.div>
        )}
        
        {currentSection === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ContactSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
