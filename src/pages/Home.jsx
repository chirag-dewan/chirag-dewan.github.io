import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChiragGPT from '../components/ChiragGPT';
import SecurityDemo from '../components/SecurityDemo';

const Home = () => {
  const [currentSection, setCurrentSection] = useState('terminal');
  const [terminalLines, setTerminalLines] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showChiragGPT, setShowChiragGPT] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01SECURITY10HACK01DEFEND10PROTECT8ZERODAYSVULNSRTXBBNGMFINANCIAL";
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

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced terminal simulation with professional achievements
  useEffect(() => {
    if (currentSection === 'terminal') {
      setTerminalLines([]);
      const commands = [
        '> initializing chirag_dewan portfolio system...',
        '> loading professional experience database...',
        '> GM Financial: Software Engineer II - active ✓',
        '> cybersecurity research: vulnerability discovery & analysis ✓',
        '> AI/ML engineering: fraud detection & automation ✓',
        '> cloud infrastructure: AWS certified architect ✓',
        '> detection rules: 50+ YARA/Sigma rules deployed ✓',
        '> education: Arizona State University CS degree ✓',
        '> certifications: Security+, Network+, Cloud+ ✓',
        '> system status: ALL SYSTEMS OPERATIONAL',
        '> welcome to my digital portfolio 🚀',
        '> explore projects, skills, and interactive demos!'
      ];

      let index = 0;
      const typeCommand = () => {
        if (index < commands.length) {
          setIsTyping(true);
          setTimeout(() => {
            setTerminalLines(prev => [...prev, commands[index]]);
            setIsTyping(false);
            index++;
            setTimeout(typeCommand, 600);
          }, Math.random() * 800 + 400);
        }
      };

      const timer = setTimeout(typeCommand, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentSection]);

  // Professional skills and expertise
  const skills = [
    { name: 'Cybersecurity Research', level: 95, color: '#dc2626', description: 'Vulnerability research, SCADA protocols, threat analysis' },
    { name: 'Python Development', level: 95, color: '#3776ab', description: 'Security automation, ML frameworks, payment systems' },
    { name: 'AI/ML Engineering', level: 92, color: '#ff6b35', description: 'PyTorch, TensorFlow, LLMs, fraud detection systems' },
    { name: 'Cloud Architecture', level: 90, color: '#ff9500', description: 'AWS certified, Terraform, Kubernetes, DevSecOps' },
    { name: 'Security Analysis', level: 88, color: '#8b5cf6', description: 'Reverse engineering, malware analysis, threat hunting' },
    { name: 'Team Leadership', level: 85, color: '#059669', description: 'Cross-functional teams, technical mentorship' }
  ];


  const TerminalSection = () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-green-400 font-mono p-8 overflow-hidden relative">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none opacity-10"
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-gray-400">chirag_dewan@security-lab:~$</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-2xl font-bold mb-4 text-cyan-400">
            ╔══════════════════════════════════════════════════════════════╗
            <br />
            ║              CHIRAG DEWAN - SOFTWARE ENGINEER II             ║
            <br />
            ║        CYBERSECURITY • AI/ML • CLOUD ARCHITECTURE           ║
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
            className="group bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-green-400/50 p-6 rounded-xl hover:border-green-400 hover:shadow-lg hover:shadow-green-400/25 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/5 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-lg font-bold mb-2 text-green-400">⚡ SKILLS</div>
              <div className="text-sm text-gray-300">Technical Arsenal</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentSection('demo')}
            className="group bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-purple-400/50 p-6 rounded-xl hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/25 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-lg font-bold mb-2 text-purple-400">🔧 DEMO</div>
              <div className="text-sm text-gray-300">Interactive Tools</div>
            </div>
          </button>

          <button
            onClick={() => setShowChiragGPT(true)}
            className="group bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-red-400/50 p-6 rounded-xl hover:border-red-400 hover:shadow-lg hover:shadow-red-400/25 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/5 to-red-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-lg font-bold mb-2 text-red-400">🤖 ChiragGPT</div>
              <div className="text-sm text-gray-300">AI Assistant</div>
            </div>
          </button>
        </div>

        {/* GitHub Contributions */}
        <div className="mt-16 p-8 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-2xl backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">GitHub Activity</h3>
          <div className="bg-black/50 rounded-xl p-6">
            <img 
              src="https://github-readme-stats.vercel.app/api?username=chirag-dewan&show_icons=true&theme=dark&bg_color=00000000&text_color=ffffff&icon_color=00ff00&title_color=00ffff&border_color=333333"
              alt="GitHub Stats"
              className="w-full max-w-md mx-auto block rounded-lg"
            />
            <div className="mt-6">
              <img 
                src="https://github-readme-streak-stats.herokuapp.com/?user=chirag-dewan&theme=dark&background=00000000&ring=00ff00&fire=00ffff&currStreakLabel=ffffff&sideLabels=ffffff&dates=ffffff&currStreakNum=00ff00&sideNums=00ffff&border=333333"
                alt="GitHub Streak"
                className="w-full max-w-md mx-auto block rounded-lg"
              />
            </div>
            <div className="mt-6">
              <img 
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=chirag-dewan&layout=compact&theme=dark&bg_color=00000000&text_color=ffffff&title_color=00ffff&border_color=333333"
                alt="Top Languages"
                className="w-full max-w-md mx-auto block rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="text-gray-500 text-sm">
            <p>Status: <span className="text-green-400">ONLINE & AVAILABLE</span></p>
            <p>Security Level: <span className="text-red-400">MAXIMUM</span></p>
            <p>Location: <span className="text-cyan-400">Boston, MA</span></p>
            <p>Expertise: <span className="text-yellow-400">AI • Security • Cloud</span></p>
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
          <p className="text-xl text-gray-300">Real expertise from cybersecurity research and engineering</p>
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
              
              <p className="text-gray-400 text-sm mb-4">{skill.description}</p>
              
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
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-500 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-blue-400 mb-6">PROFESSIONAL IMPACT</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-black/30 rounded-xl">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-green-400 text-sm">Cloud Workloads Secured</div>
              </div>
              <div className="p-4 bg-black/30 rounded-xl">
                <div className="text-3xl font-bold text-white mb-2">96%</div>
                <div className="text-blue-400 text-sm">ML Model Accuracy</div>
              </div>
              <div className="p-4 bg-black/30 rounded-xl">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-purple-400 text-sm">Detection Rules</div>
              </div>
              <div className="p-4 bg-black/30 rounded-xl">
                <div className="text-3xl font-bold text-white mb-2">75%</div>
                <div className="text-yellow-400 text-sm">Efficiency Improvement</div>
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


  const ContactSection = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">SECURE COMMUNICATION</h2>
          <p className="text-xl text-gray-300">Connect with a cybersecurity professional</p>
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
                <div className="text-blue-400 font-bold">Research Experience</div>
                <div className="text-white">Cybersecurity & Vulnerability Research</div>
                <div className="text-gray-400">Industrial Control Systems & IoT Security</div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-yellow-400 font-bold">Location & Availability</div>
                <div className="text-white">Boston, MA</div>
                <div className="text-gray-400">Open to NYC cybersecurity opportunities</div>
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
      {/* Cursor follower */}
      <motion.div
        className="fixed w-6 h-6 border-2 border-green-400 rounded-full pointer-events-none z-40 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* ChiragGPT Modal */}
      <AnimatePresence>
        {showChiragGPT && (
          <ChiragGPT onClose={() => setShowChiragGPT(false)} />
        )}
      </AnimatePresence>

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
        

        {currentSection === 'demo' && (
          <motion.div
            key="demo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SecurityDemo />
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
