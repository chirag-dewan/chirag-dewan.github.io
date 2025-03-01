import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const InteractiveTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState('~/portfolio');
  const [typingIntroduction, setTypingIntroduction] = useState('');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  
  // Introduction message
  const introMessage = `Welcome to Chirag Dewan's portfolio terminal. Type 'help' for a list of commands.`;
  const introLines = [
    'cybersecurity-portfolio $ ./welcome.sh',
    'Initializing cybersecurity environment...',
    'Loading security modules: [security] [analysis] [network] [crypto] [reverse-engineering]',
    'Environment ready. Welcome to Chirag Dewan\'s portfolio.'
  ];
  
  // Initial commands and responses
  useEffect(() => {
    // Simulate typing the introduction message
    let timer;
    let charIndex = 0;
    let lineIndex = 0;
    
    const typeIntro = () => {
      if (lineIndex < introLines.length) {
        if (charIndex < introLines[lineIndex].length) {
          setTypingIntroduction(prev => prev + introLines[lineIndex][charIndex]);
          charIndex++;
          timer = setTimeout(typeIntro, 15); // Typing speed
        } else {
          setTypingIntroduction(prev => prev + '\n');
          lineIndex++;
          charIndex = 0;
          timer = setTimeout(typeIntro, 200); // Pause between lines
        }
      } else {
        // When finished typing, add the intro message to history
        setHistory([{ type: 'system', content: introMessage }]);
      }
    };
    
    timer = setTimeout(typeIntro, 500); // Initial delay
    
    return () => clearTimeout(timer);
  }, []);
  
  // Auto-scroll to bottom on new entries
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, typingIntroduction]);
  
  // Focus input when terminal is clicked
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Handle command execution
  const executeCommand = (cmd) => {
    const commandComponents = cmd.trim().split(' ');
    const command = commandComponents[0];
    const args = commandComponents.slice(1);
    
    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: `${currentPath} $ ${cmd}` }]);
    
    // Process command
    switch (command) {
      case 'help':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `Available commands:
  help             - Show this help message
  clear            - Clear the terminal screen
  about            - Display information about Chirag Dewan
  skills           - List technical skills
  projects         - Show portfolio projects
  contact          - Display contact information
  experience       - Show professional experience
  cd [directory]   - Change directory (simulate navigation)
  ls               - List contents of current directory
  cat [file]       - View contents of a file (limited to certain files)`
        }]);
        break;
        
      case 'clear':
        setHistory([]);
        break;
        
      case 'about':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `Chirag Dewan
--------------
Cyber Research Scientist specializing in vulnerability discovery, threat analysis,
and secure system design. Currently at RTX BBN focused on securing critical
infrastructure systems through advanced security research.

* Expertise in reverse engineering and low-level security analysis
* Skilled in developing custom security tools and automation
* Active security clearance: Top Secret`
        }]);
        break;
        
      case 'skills':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `TECHNICAL SKILLS
---------------
Languages: Python (95%), C/C++ (85%), JavaScript (80%), Rust (75%), Bash (70%)

Security Tools:
- Ghidra (90%) - Binary analysis, reverse engineering
- IDA Pro (85%) - Disassembly, vulnerability research
- Metasploit (80%) - Penetration testing
- Burp Suite (75%) - Web application security
- Volatility (70%) - Memory forensics

Cloud & Infrastructure:
- AWS (85%) - EC2, S3, Lambda, Security Groups
- Docker (80%) - Container security
- Kubernetes (70%) - Container orchestration`
        }]);
        break;
        
      case 'projects':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `PROJECTS
--------
1. Packet Prowler (Security)
   Real-time network traffic analysis tool for threat detection

2. Malware Analysis Tool (Security)
   Modular framework for static, dynamic, and memory forensics

3. ML-Based IDS (Machine Learning)
   Intrusion detection using ensemble learning methods

4. Algorithmic Trading Test (Analysis)
   Stock prediction system using technical patterns

Type 'cat readme.txt project1' to view details about Packet Prowler`
        }]);
        break;
        
      case 'contact':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `CONTACT INFORMATION
-------------------
Email: chirag0728@gmail.com
LinkedIn: linkedin.com/in/cdewan
GitHub: github.com/chirag-dewan
Location: Cambridge, MA (Boston Metro Area)`
        }]);
        break;
        
      case 'experience':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `PROFESSIONAL EXPERIENCE
----------------------
RTX BBN | Cyber Researcher | Cambridge, MA | May 2024 - Present
* Develop packet parsing systems for network traffic inspection
* Conduct firmware reverse engineering for vulnerability discovery
* Create proof-of-concept exploits for security validation

Raytheon RTX | Cyber Engineer | Aurora, CO | June 2023 - May 2024
* Performed threat modeling and vulnerability analysis
* Implemented Linux system hardening with SELinux
* Built secure environments for malware analysis

Raytheon RTX | Senior Cyber Engineering Intern | Aurora, CO | May 2022 - June 2023
* Simulated attacks to test security controls
* Reverse-engineered binaries to identify vulnerabilities`
        }]);
        break;
        
      case 'ls':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `Contents of ${currentPath}:
${getDirectoryContents(currentPath)}`
        }]);
        break;
        
      case 'cd':
        if (args.length === 0) {
          setCurrentPath('~');
        } else if (args[0] === '..') {
          if (currentPath !== '~') {
            const parts = currentPath.split('/');
            parts.pop();
            setCurrentPath(parts.join('/') || '~');
          }
        } else {
          // Simulate changing to valid directories
          const validDirs = ['projects', 'skills', 'about', 'experience', 'contact'];
          if (validDirs.includes(args[0])) {
            setCurrentPath(`${currentPath}/${args[0]}`);
          } else {
            setHistory(prev => [...prev, { 
              type: 'error', 
              content: `cd: no such directory: ${args[0]}`
            }]);
          }
        }
        break;
        
      case 'cat':
        if (args.length === 0) {
          setHistory(prev => [...prev, { 
            type: 'error', 
            content: 'cat: missing file operand'
          }]);
        } else {
          handleCatCommand(args);
        }
        break;
        
      default:
        setHistory(prev => [...prev, { 
          type: 'error', 
          content: `Command not found: ${command}. Type 'help' for available commands.`
        }]);
    }
  };
  
  // Helper function to get directory contents
  const getDirectoryContents = (path) => {
    if (path === '~') {
      return 'projects/  skills/  about/  experience/  contact/  readme.txt';
    }
    if (path === '~/projects') {
      return 'packet_prowler/  malware_analysis_tool/  ml_ids/  algo_trading/';
    }
    if (path.includes('~/projects/')) {
      return 'code/  documentation/  readme.md';
    }
    
    // Default content
    return 'documentation/  readme.txt';
  };
  
  // Handle cat command for viewing files
  const handleCatCommand = (args) => {
    const filename = args[0];
    
    if (filename === 'readme.txt') {
      setHistory(prev => [...prev, { 
        type: 'response', 
        content: `# Chirag Dewan's Portfolio Repository

This terminal interface provides an interactive way to explore my cybersecurity
background, projects, and skills. Use commands like 'help', 'projects',
and 'skills' to navigate through my portfolio.

Thank you for visiting!`
      }]);
    } else if (args.join(' ') === 'readme.txt project1' || filename === 'packet_prowler.md') {
      setHistory(prev => [...prev, { 
        type: 'response', 
        content: `# Packet Prowler

A lightweight network packet analyzer built in C using libpcap for
real-time traffic capture and analysis. Features protocol filtering,
extensible architecture, and custom output formats.

## Key Features
- Real-time packet capture on specified interfaces
- Protocol filtering (TCP/UDP/custom)
- Modular C architecture for extensibility
- Detailed output logging for offline analysis

## Technologies
- C
- libpcap
- Network Programming
- Linux Systems`
      }]);
    } else {
      setHistory(prev => [...prev, { 
        type: 'error', 
        content: `cat: ${filename}: No such file or directory`
      }]);
    }
  };
  
  // Handle form submission (command entry)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700">
        {/* Terminal header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-400 text-sm font-mono flex-1 text-center">chirag@portfolio:~</div>
        </div>
        
        {/* Terminal content */}
        <div 
          ref={terminalRef}
          className="bg-black bg-opacity-90 p-4 h-96 overflow-y-auto font-mono text-sm"
          onClick={handleTerminalClick}
        >
          {/* Animated typing introduction */}
          {typingIntroduction && (
            <pre className="text-green-400 whitespace-pre-line">{typingIntroduction}</pre>
          )}
          
          {/* Command history */}
          {history.map((entry, index) => (
            <div key={index} className="mb-2">
              {entry.type === 'command' && (
                <div className="text-white">{entry.content}</div>
              )}
              {entry.type === 'response' && (
                <pre className="text-green-400 whitespace-pre-wrap mb-2">{entry.content}</pre>
              )}
              {entry.type === 'error' && (
                <div className="text-red-400">{entry.content}</div>
              )}
              {entry.type === 'system' && (
                <div className="text-blue-400">{entry.content}</div>
              )}
            </div>
          ))}
          
          {/* Command input */}
          <form onSubmit={handleSubmit} className="flex">
            <span className="text-purple-400">{currentPath} $</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 ml-2 bg-transparent text-white outline-none"
              autoFocus
            />
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
