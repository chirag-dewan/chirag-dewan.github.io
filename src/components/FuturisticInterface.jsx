import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FuturisticInterface = () => {
  // State for the interface
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [securityScan, setSecurityScan] = useState(0);
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  // Refs
  const terminalRef = useRef(null);
  const scannerRef = useRef(null);
  const mainFrameRef = useRef(null);

  // Boot sequence animation
  useEffect(() => {
    // Simulate boot sequence
    const timeout1 = setTimeout(() => {
      setTerminalHistory(prev => [...prev, "• System initialization..."]);
    }, 800);

    const timeout2 = setTimeout(() => {
      setTerminalHistory(prev => [...prev, "• Loading kernel modules..."]);
    }, 1500);

    const timeout3 = setTimeout(() => {
      setTerminalHistory(prev => [...prev, "• Establishing secure connection..."]);
      setSecurityScan(20);
    }, 2500);

    const timeout4 = setTimeout(() => {
      setTerminalHistory(prev => [...prev, "• Running security protocols..."]);
      setSecurityScan(60);
    }, 3500);

    const timeout5 = setTimeout(() => {
      setTerminalHistory(prev => [...prev, "• Biometric authentication required..."]);
      setBiometricAuth(true);
    }, 4500);

    const timeout6 = setTimeout(() => {
      setGlitchEffect(true);
      setTerminalHistory(prev => [...prev, "!!! ALERT: Unauthorized access attempt detected !!!"]);
    }, 5500);

    const timeout7 = setTimeout(() => {
      setGlitchEffect(false);
      setTerminalHistory(prev => [...prev, "• Security override accepted..."]);
      setSecurityScan(100);
    }, 6500);

    const timeout8 = setTimeout(() => {
      setTerminalHistory(prev => [...prev, "• Access granted. Welcome, OPERATOR."]);
      setBootSequenceComplete(true);
      addNotification("Security systems online");
    }, 7500);

    return () => {
      [timeout1, timeout2, timeout3, timeout4, timeout5, timeout6, timeout7, timeout8].forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Add a notification
  const addNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Handle terminal commands
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    
    if (terminalInput.trim() === '') return;
    
    setTerminalHistory(prev => [...prev, `> ${terminalInput}`]);
    
    // Simple command responses
    if (terminalInput.toLowerCase() === 'help') {
      setTerminalHistory(prev => [...prev, 
        `Available commands:
  profile        - Display personal profile
  skills         - List technical skills
  projects       - Show portfolio projects
  experience     - View professional experience
  contact        - Display contact information
  clear          - Clear terminal history
        `
      ]);
    } else if (terminalInput.toLowerCase() === 'profile') {
      setActiveSection('profile');
      setTerminalHistory(prev => [...prev, "Loading profile data..."]);
      addNotification("Profile section activated");
    } else if (terminalInput.toLowerCase() === 'skills') {
      setActiveSection('skills');
      setTerminalHistory(prev => [...prev, "Analyzing skill matrix..."]);
      addNotification("Skills database accessed");
    } else if (terminalInput.toLowerCase() === 'projects') {
      setActiveSection('projects');
      setTerminalHistory(prev => [...prev, "Accessing project repository..."]);
      addNotification("Project database unlocked");
    } else if (terminalInput.toLowerCase() === 'experience') {
      setActiveSection('experience');
      setTerminalHistory(prev => [...prev, "Retrieving experience records..."]);
      addNotification("Experience timeline activated");
    } else if (terminalInput.toLowerCase() === 'contact') {
      setActiveSection('contact');
      setTerminalHistory(prev => [...prev, "Establishing communication channels..."]);
      addNotification("Communication protocols engaged");
    } else if (terminalInput.toLowerCase() === 'clear') {
      setTerminalHistory([]);
    } else {
      setTerminalHistory(prev => [...prev, `Command not recognized: ${terminalInput}`]);
    }
    
    setTerminalInput('');
    
    // Scroll terminal to bottom
    if (terminalRef.current) {
      setTimeout(() => {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }, 100);
    }
  };

  // Sections for the interface
  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel p-6 h-full overflow-auto"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">PROFILE: CHIRAG DEWAN</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="relative aspect-square bg-slate-900 rounded-md overflow-hidden mb-4">
                  <div className="absolute inset-0 flex items-center justify-center text-5xl">👨‍💻</div>
                  <div className="absolute inset-0 border-4 border-cyan-500/50 rounded-md"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-slate-800/50 p-2 rounded-md">
                    <div className="text-slate-400">STATUS</div>
                    <div className="text-cyan-400">ACTIVE</div>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded-md">
                    <div className="text-slate-400">LOCATION</div>
                    <div className="text-cyan-400">CAMBRIDGE, MA</div>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded-md">
                    <div className="text-slate-400">CLEARANCE</div>
                    <div className="text-cyan-400">TOP SECRET</div>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded-md">
                    <div className="text-slate-400">STATUS</div>
                    <div className="text-cyan-400">OPERATIONAL</div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="bg-slate-800/50 p-4 rounded-md mb-4">
                  <h3 className="text-lg font-semibold text-pink-400 mb-2">// IDENTITY</h3>
                  <p className="text-slate-300 mb-4">
                    Cyber Research Scientist specializing in advanced security solutions, vulnerability discovery, and cutting-edge defensive technologies.
                  </p>
                  <div className="text-xs text-slate-400 mb-1">DESIGNATION</div>
                  <div className="text-lg text-white mb-4">SECURITY SPECIALIST // CODE: CD-0728</div>
                  
                  <div className="text-xs text-slate-400 mb-1">OPERATIONAL FOCUS</div>
                  <div className="text-white">
                    Pioneering innovative approaches to cybersecurity challenges through research-driven methodologies and security automation.
                  </div>
                </div>
                
                <div className="bg-slate-800/50 p-4 rounded-md">
                  <h3 className="text-lg font-semibold text-pink-400 mb-2">// MISSION STATEMENT</h3>
                  <p className="text-slate-300">
                    Dedicated to expanding the boundaries of security through innovative research and development of defensive countermeasures against evolving threats.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case 'skills':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel p-6 h-full overflow-auto"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">CAPABILITY ASSESSMENT</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-pink-400 mb-4">// SECURITY OPERATIONS</h3>
                
                {['Threat Modeling', 'Vulnerability Research', 'Penetration Testing', 'Malware Analysis', 'Incident Response'].map((skill, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">{skill}</span>
                      <span className="text-cyan-400">{85 + Math.floor(Math.random() * 10)}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-pink-500"
                        style={{ width: `${85 + Math.floor(Math.random() * 10)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-slate-800/50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-pink-400 mb-4">// DEVELOPMENT</h3>
                
                {['Python', 'C/C++', 'JavaScript', 'Rust', 'Bash/Shell'].map((skill, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">{skill}</span>
                      <span className="text-cyan-400">{75 + Math.floor(Math.random() * 20)}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-pink-500"
                        style={{ width: `${75 + Math.floor(Math.random() * 20)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-slate-800/50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-pink-400 mb-4">// CLOUD & INFRASTRUCTURE</h3>
                
                {['AWS', 'Docker', 'Kubernetes', 'CI/CD Security', 'Linux Administration'].map((skill, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">{skill}</span>
                      <span className="text-cyan-400">{70 + Math.floor(Math.random() * 15)}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-pink-500"
                        style={{ width: `${70 + Math.floor(Math.random() * 15)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-slate-800/50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-pink-400 mb-4">// DATA SCIENCE & ML</h3>
                
                {['Anomaly Detection', 'TensorFlow', 'Scikit-learn', 'Pandas/NumPy', 'Data Visualization'].map((skill, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">{skill}</span>
                      <span className="text-cyan-400">{70 + Math.floor(Math.random() * 15)}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-pink-500"
                        style={{ width: `${70 + Math.floor(Math.random() * 15)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 bg-slate-800/50 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-pink-400 mb-4">// CERTIFICATIONS & CLEARANCES</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-cyan-500/30 rounded-md p-3">
                  <div className="text-xs text-slate-400">CERTIFICATION</div>
                  <div className="text-white font-medium">CompTIA Security+</div>
                  <div className="text-cyan-400 text-sm">ACTIVE</div>
                </div>
                <div className="border border-cyan-500/30 rounded-md p-3">
                  <div className="text-xs text-slate-400">CERTIFICATION</div>
                  <div className="text-white font-medium">AWS Cloud Practitioner</div>
                  <div className="text-cyan-400 text-sm">ACTIVE</div>
                </div>
                <div className="border border-cyan-500/30 rounded-md p-3">
                  <div className="text-xs text-slate-400">CLEARANCE</div>
                  <div className="text-white font-medium">TOP SECRET (TS)</div>
                  <div className="text-cyan-400 text-sm">ACTIVE</div>
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case 'projects':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel p-6 h-full overflow-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cyan-400">PROJECT DATABASE</h2>
              <div className="flex items-center gap-2">
                <button className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-md text-sm">FILTER</button>
                <button className="bg-cyan-900 hover:bg-cyan-800 px-3 py-1 rounded-md text-sm">SORT</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project 1 */}
              <div className="relative bg-slate-800/50 rounded-md overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <div className="absolute top-0 right-0 bg-cyan-900/80 px-2 py-1 text-xs font-mono">
                  SECURITY
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-1">PACKET PROWLER</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Low-level network packet analyzer built in C with libpcap for real-time traffic capture and protocol inspection.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">C</span>
                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Networking</span>
                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Security</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-slate-400 font-mono">PROJECT ID: PP-2023</div>
                    <button className="bg-cyan-800 hover:bg-cyan-700 px-3 py-1 rounded text-xs transition-colors">
                      VIEW DETAILS →
                    </button>
                  </div>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-cyan-500 to-pink-500"></div>
              </div>
              
              {/* Project 2 */}
              <div className="relative bg-slate-800/50 rounded-md overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <div className="absolute top-0 right-0 bg-pink-900/80 px-2 py-1 text-xs font-mono">
                  ML
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-pink-400 mb-1">ML-BASED IDS</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Intrusion detection system powered by machine learning for real-time detection of network anomalies and attack patterns.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Python</span>
                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">TensorFlow</span>
                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Network Security</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-slate-400 font-mono">PROJECT ID: IDS-2022</div>
                    <button className="bg-pink-800 hover:bg-pink-700 px-3 py-1 rounded text-xs transition-colors">
                      VIEW DETAILS →
                    </button>
                  </div>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              </div>
              
              {/* Project 3 */}
              <div className="relative bg-slate-800/50 rounded-md overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <div className="absolute top-0 right-0 bg-cyan-900/80 px-2 py-1 text-xs font-mono">
                  SECURITY
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-1">MALWARE ANALYSIS TOOL</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Comprehensive framework for static, dynamic, and memory-based malware analysis with automated reporting.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Python</span>
                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Docker</span>
                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">YARA</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-slate-400 font-mono">PROJECT ID: MAT-2023</div>
                    <button className="bg-cyan-800 hover:bg-cyan-700 px-3 py-1 rounded text-xs transition-colors">
                      VIEW DETAILS →
                    </button>
                  </div>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-cyan-500 to-pink-500"></div>
              </div>
              
              {/* Project 4 */}
              <div className="relative bg-slate-800/50 rounded-md overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-colors">
                <div className="absolute top-0 right-0 bg-purple-900/80 px-2 py-1 text-xs font-mono">
                  ANALYSIS
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-purple-400 mb-1">ALGORITHMIC TRADING TEST</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Python-based trading strategy using technical analysis and machine learning to predict market movements.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Python</span>
                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">ML</span>
                    <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Finance</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-slate-400 font-mono">PROJECT ID: ATT-2022</div>
                    <button className="bg-purple-800 hover:bg-purple-700 px-3 py-1 rounded text-xs transition-colors">
                      VIEW DETAILS →
                    </button>
                  </div>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
              </div>
            </div>
          </motion.div>
        );
        
      case 'experience':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel p-6 h-full overflow-auto"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">OPERATIONAL HISTORY</h2>
            
            <div className="relative border-l-2 border-cyan-500/50 pl-6">
              {/* Experience 1 */}
              <div className="mb-10 relative">
                <div className="absolute -left-[31px] top-0 w-6 h-6 bg-black border-2 border-cyan-500 rounded-full"></div>
                <div className="absolute -left-[25px] top-2 w-3 h-3 bg-cyan-500 rounded-full animate-ping"></div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <div className="bg-slate-800/50 p-3 rounded-md">
                      <div className="text-pink-400 font-semibold mb-1">CYBER RESEARCHER</div>
                      <div className="text-white mb-1">RTX BBN</div>
                      <div className="text-xs text-slate-400">MAY 2024 - PRESENT</div>
                      <div className="text-xs text-cyan-400 mt-2">LOCATION: CAMBRIDGE, MA</div>
                      <div className="text-xs text-cyan-400">STATUS: ACTIVE</div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 bg-slate-800/50 p-4 rounded-md">
                    <p className="text-slate-300 mb-4">
                      Leading security research initiatives focused on vulnerability discovery and threat analysis for critical infrastructure systems.
                    </p>
                    
                    <h4 className="text-sm text-cyan-400 font-medium mb-2">PRIMARY RESPONSIBILITIES</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 mb-3">
                      <li>Simulated real-world attacks to test security controls and detection capabilities</li>
                      <li>Reverse-engineered binaries to identify and document exploitable vulnerabilities</li>
                      <li>Created custom vulnerability scanners that combined multiple open-source tools</li>
                      <li>Analyzed malware samples to document behaviors and improve detection capabilities</li>
                    </ul>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Penetration Testing</span>
                      <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Vulnerability Analysis</span>
                      <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Security Research</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case 'contact':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel p-6 h-full overflow-auto"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">SECURE COMMUNICATIONS</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-pink-400 mb-4">// CONTACT PROTOCOLS</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-700/70 p-3 rounded-full">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">EMAIL COMM CHANNEL</div>
                      <div className="text-white mb-1">chirag0728@gmail.com</div>
                      <div className="text-xs text-cyan-400">ENCRYPTION: TLS/SSL</div>
                      <button className="mt-2 bg-cyan-900 hover:bg-cyan-800 px-3 py-1 rounded text-xs flex items-center gap-1">
                        ESTABLISH CONNECTION
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-700/70 p-3 rounded-full">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">PROFESSIONAL NETWORK</div>
                      <div className="text-white mb-1">linkedin.com/in/cdewan</div>
                      <div className="text-xs text-cyan-400">STATUS: ACTIVE</div>
                      <button className="mt-2 bg-blue-900 hover:bg-blue-800 px-3 py-1 rounded text-xs flex items-center gap-1">
                        CONNECT SECURELY
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-700/70 p-3 rounded-full">
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">CODE REPOSITORY</div>
                      <div className="text-white mb-1">github.com/chirag-dewan</div>
                      <div className="text-xs text-cyan-400">PROJECTS: 42</div>
                      <button className="mt-2 bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-xs flex items-center gap-1">
                        ACCESS VAULT
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-pink-400 mb-4">// DIRECT MESSAGE</h3>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-xs text-cyan-400 mb-1">IDENTIFICATION</label>
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      className="w-full bg-slate-900/70 border border-slate-700 rounded px-3 py-2 focus:outline-none focus:border-cyan-500 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-cyan-400 mb-1">COMM CHANNEL</label>
                    <input 
                      type="email" 
                      placeholder="Your Email"
                      className="w-full bg-slate-900/70 border border-slate-700 rounded px-3 py-2 focus:outline-none focus:border-cyan-500 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-cyan-400 mb-1">SUBJECT</label>
                    <input 
                      type="text" 
                      placeholder="Message Subject"
                      className="w-full bg-slate-900/70 border border-slate-700 rounded px-3 py-2 focus:outline-none focus:border-cyan-500 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-cyan-400 mb-1">MESSAGE PAYLOAD</label>
                    <textarea 
                      placeholder="Your Message"
                      rows="4"
                      className="w-full bg-slate-900/70 border border-slate-700 rounded px-3 py-2 focus:outline-none focus:border-cyan-500 text-white resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white py-2 rounded transition-colors"
                    >
                      TRANSMIT SECURE MESSAGE
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="md:col-span-2 bg-slate-800/50 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-pink-400 mb-4">// OPERATIONAL COORDINATES</h3>
                
                <div className="flex items-center gap-4">
                  <div className="bg-slate-900 p-5 rounded-md border border-slate-700 w-20 h-20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  
                  <div>
                    <div className="text-xs text-slate-400 mb-1">PRIMARY LOCATION</div>
                    <div className="text-white font-medium">Cambridge, MA</div>
                    <div className="text-cyan-400 text-sm">Boston Metropolitan Area</div>
                    <div className="text-xs text-slate-400 mt-1">COORDINATES: 42.3736° N, 71.1097° W</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      default:
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel p-6 h-full flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-6xl mb-6">👋</div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">SYSTEM READY</h2>
              <p className="text-slate-300 mb-8 max-w-md">
                Enter a command in the terminal or select a section from the navigation panel to begin.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['profile', 'skills', 'projects', 'experience', 'contact'].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      setTerminalInput(cmd);
                      setTimeout(() => {
                        handleTerminalSubmit({ preventDefault: () => {} });
                      }, 100);
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 rounded-md text-sm transition-colors"
                  >
                    {cmd.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-mono">
      {/* Main interface */}
      <div className="container mx-auto p-4">
        {bootSequenceComplete ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-screen">
            {/* Left sidebar - Navigation */}
            <div className="lg:col-span-1">
              <div className="glass-panel p-4 mb-4">
                <div className="text-center mb-4">
                  <h1 className="text-2xl font-bold text-cyan-400">SECURITYOS</h1>
                  <div className="text-xs text-slate-400">v1.0.7-beta</div>
                </div>
                
                <div className="space-y-1">
                  {['profile', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                    <button
                      key={section}
                      onClick={() => {
                        setActiveSection(section);
                        addNotification(`${section.toUpperCase()} module activated`);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center ${
                        activeSection === section 
                          ? 'bg-gradient-to-r from-cyan-800/50 to-pink-800/50 text-white' 
                          : 'text-slate-400 hover:bg-slate-800/30'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        activeSection === section ? 'bg-cyan-400' : 'bg-slate-600'
                      }`}></span>
                      {section.toUpperCase()}
                    </button>
                  ))}
                </div>
                
                <div className="border-t border-slate-700/50 my-4 pt-4">
                  <div className="text-xs text-slate-400 mb-2">SYSTEM STATUS</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">MEMORY</span>
                      <div className="w-2/3 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500"
                          style={{ width: '42%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">CPU</span>
                      <div className="w-2/3 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500"
                          style={{ width: '27%' }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">NETWORK</span>
                      <div className="w-2/3 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500"
                          style={{ width: '88%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-slate-700/50 my-4 pt-4">
                  <div className="text-xs text-slate-400 mb-2">ACTIVE USER</div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-cyan-900/50 rounded-full flex items-center justify-center text-cyan-400 mr-2">
                      CD
                    </div>
                    <div>
                      <div className="text-sm">CHIRAG DEWAN</div>
                      <div className="text-xs text-cyan-400">ADMINISTRATOR</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* System stats */}
              <div className="glass-panel p-4">
                <div className="text-xs text-slate-400 mb-2">SECURITY METRICS</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-slate-800/30 p-2 rounded-md text-center">
                    <div className="text-2xl font-bold text-cyan-400">12</div>
                    <div className="text-xs text-slate-400">THREATS BLOCKED</div>
                  </div>
                  <div className="bg-slate-800/30 p-2 rounded-md text-center">
                    <div className="text-2xl font-bold text-cyan-400">99.8%</div>
                    <div className="text-xs text-slate-400">UPTIME</div>
                  </div>
                  <div className="bg-slate-800/30 p-2 rounded-md text-center">
                    <div className="text-2xl font-bold text-cyan-400">42</div>
                    <div className="text-xs text-slate-400">COMMITS</div>
                  </div>
                  <div className="bg-slate-800/30 p-2 rounded-md text-center">
                    <div className="text-2xl font-bold text-cyan-400">3</div>
                    <div className="text-xs text-slate-400">CERTS</div>
                  </div>
                </div>
                
                <div className="text-xs text-slate-400 mb-2">LOG ACTIVITY</div>
                <div className="bg-slate-800/30 p-2 rounded-md text-xs h-32 overflow-auto">
                  <div className="space-y-1">
                    <div><span className="text-cyan-400">[SYS]</span> User authentication successful</div>
                    <div><span className="text-green-400">[SEC]</span> Firewall rules updated</div>
                    <div><span className="text-yellow-400">[WARN]</span> Resource usage spike detected</div>
                    <div><span className="text-cyan-400">[SYS]</span> Database connection established</div>
                    <div><span className="text-green-400">[SEC]</span> SSL certificate validated</div>
                    <div><span className="text-pink-400">[API]</span> GitHub repository synced</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="lg:col-span-3 flex flex-col h-full min-h-[80vh]">
              {/* Top bar */}
              <div className="glass-panel p-3 mb-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2 animate-pulse"></div>
                  <div className="text-sm">{activeSection ? activeSection.toUpperCase() : 'DASHBOARD'}</div>
                </div>
                
                <div className="flex items-center">
                  <div className="text-xs text-slate-400 mr-4">SYSTEM TIME: {new Date().toLocaleTimeString()}</div>
                  <div className="flex space-x-2">
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </button>
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                      </svg>
                    </button>
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Notifications */}
              <div className="fixed top-4 right-4 z-50 w-72">
                <AnimatePresence>
                  {notifications.map(notification => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: -20, x: 20 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      exit={{ opacity: 0, y: -20, x: 20 }}
                      className="bg-slate-800/90 border border-cyan-500/30 rounded-md p-3 mb-2 backdrop-blur-sm shadow-lg"
                    >
                      <div className="flex items-start">
                        <div className="text-cyan-400 mr-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-white font-medium">{notification.message}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {/* Main content */}
              <div className="flex-1 mb-4">
                <AnimatePresence mode="wait">
                  {renderSection()}
                </AnimatePresence>
              </div>
              
              {/* Terminal */}
              <div className="glass-panel">
                <div className="bg-slate-900/80 p-2 rounded-t-md flex items-center">
                  <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                  <div className="text-xs">COMMAND TERMINAL</div>
                </div>
                <div 
                  ref={terminalRef}
                  className="bg-black/80 p-3 h-40 overflow-y-auto font-mono text-sm"
                >
                  {terminalHistory.map((line, index) => (
                    <div key={index} className={`mb-1 ${
                      line.startsWith('>') ? 'text-cyan-400' : 
                      line.startsWith('!') ? 'text-pink-500 font-bold' : 
                      line.startsWith('ERROR') ? 'text-red-500' : 
                      'text-green-400'
                    }`}>
                      {line}
                    </div>
                  ))}
                  <form onSubmit={handleTerminalSubmit} className="flex items-center mt-2">
                    <span className="text-pink-500 mr-2">$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      className="flex-1 bg-transparent outline-none caret-pink-500 text-white"
                      autoFocus
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Boot screen
          <div className="min-h-screen flex items-center justify-center">
            <div className="glass-panel p-8 w-full max-w-lg" ref={mainFrameRef}>
              <div className="text-center mb-6">
                <h1 className={`text-3xl font-bold ${glitchEffect ? 'animate-pulse text-pink-500' : 'text-cyan-400'}`}>
                  SECURITYOS INITIALIZING
                </h1>
                <div className="text-xs text-slate-400">PORTFOLIO INTERFACE v1.0.7-beta</div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Security Scan Progress</span>
                  <span className="text-sm">{securityScan}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-pink-500"
                    animate={{ width: `${securityScan}%` }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
              </div>
              
              {biometricAuth && (
                <div className={`mb-6 p-4 border rounded-md ${glitchEffect ? 'border-pink-500 bg-pink-500/10' : 'border-cyan-500 bg-cyan-800/10'}`}>
                  <div className="text-center mb-3">
                    <div className="text-lg font-bold text-cyan-400">Biometric Authentication</div>
                    <div className="text-sm text-slate-300">Place finger on scanner to continue</div>
                  </div>
                  
                  <div 
                    ref={scannerRef}
                    className={`w-full h-16 border-2 rounded-md flex items-center justify-center cursor-pointer ${
                      glitchEffect ? 'border-pink-500 bg-pink-500/10 animate-pulse' : 'border-cyan-500 bg-cyan-800/10'
                    }`}
                    onClick={() => setGlitchEffect(false)}
                  >
                    {glitchEffect ? (
                      <div className="text-pink-500 font-bold text-sm">ACCESS DENIED - RETRYING...</div>
                    ) : (
                      <div className="text-cyan-400 text-sm">SCANNING...</div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="font-mono text-sm text-green-400 mb-6 h-48 overflow-y-auto bg-black/70 p-3 rounded-md" ref={terminalRef}>
                {terminalHistory.map((line, index) => (
                  <div 
                    key={index} 
                    className={`mb-1 ${
                      line.includes('ALERT') ? 'text-pink-500 font-bold' : ''
                    }`}
                  >
                    {line}
                  </div>
                ))}
              </div>
              
              <div className="text-center text-xs text-slate-400">
                © {new Date().getFullYear()} CHIRAG DEWAN • CYBER SECURITY DASHBOARD
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Background animation and styling */}
      <style jsx>{`
        .glass-panel {
          background-color: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border-radius: 0.5rem;
          border: 1px solid rgba(148, 163, 184, 0.1);
        }
        
        @keyframes scanAnimation {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 100%; }
        }
      `}</style>
    </div>
  );
};

export default FuturisticInterface;</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 mb-3">
                      <li>Simulated attacks to test security controls</li>
                      <li>Reverse-engineered binaries to identify vulnerabilities</li>
                      <li>Created custom vulnerability scanners</li>
                      <li>Analyzed malware samples to improve detection</li>
                    </ul>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Security Assessment</span>
                      <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Reverse Engineering</span>
                      <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Tool Development</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Experience 2 */}
              <div className="mb-10 relative">
                <div className="absolute -left-[31px] top-0 w-6 h-6 bg-black border-2 border-pink-500 rounded-full"></div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <div className="bg-slate-800/50 p-3 rounded-md">
                      <div className="text-pink-400 font-semibold mb-1">CYBER ENGINEER</div>
                      <div className="text-white mb-1">Raytheon, RTX</div>
                      <div className="text-xs text-slate-400">JUNE 2023 - MAY 2024</div>
                      <div className="text-xs text-cyan-400 mt-2">LOCATION: AURORA, CO</div>
                      <div className="text-xs text-cyan-400">STATUS: COMPLETED</div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 bg-slate-800/50 p-4 rounded-md">
                    <p className="text-slate-300 mb-4">
                      Led security hardening initiatives and performed extensive threat modeling to secure enterprise systems and critical infrastructure.
                    </p>
                    
                    <h4 className="text-sm text-cyan-400 font-medium mb-2">PRIMARY RESPONSIBILITIES</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-300 mb-3">
                      <li>Performed threat modeling and vulnerability analysis</li>
                      <li>Implemented Linux system hardening with SELinux</li>
                      <li>Built secure environments for malware analysis</li>
                      <li>Developed security automation frameworks</li>
                    </ul>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">Threat Modeling</span>
                      <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">System Hardening</span>
                      <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">SELinux</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Experience 3 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-0 w-6 h-6 bg-black border-2 border-purple-500 rounded-full"></div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <div className="bg-slate-800/50 p-3 rounded-md">
                      <div className="text-pink-400 font-semibold mb-1">CYBER ENGINEERING INTERN</div>
                      <div className="text-white mb-1">Raytheon, RTX</div>
                      <div className="text-xs text-slate-400">MAY 2022 - JUNE 2023</div>
                      <div className="text-xs text-cyan-400 mt-2">LOCATION: AURORA, CO</div>
                      <div className="text-xs text-cyan-400">STATUS: COMPLETED</div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 bg-slate-800/50 p-4 rounded-md">
                    <p className="text-slate-300 mb-4">
                      Conducted security assessments and developed tools for vulnerability discovery and exploitation in controlled environments.
                    </p>
                    
                    <h4 className="text-sm text-cyan-400 font-medium mb-2">
