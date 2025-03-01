import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const InteractiveTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [currentPath, setCurrentPath] = useState('~/portfolio');
  const [typingIntroduction, setTypingIntroduction] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(true);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  
  // Introduction message
  const introMessage = `Welcome to Chirag Dewan's portfolio terminal. Type 'help' for a list of commands.`;
  const introLines = [
    'cybersecurity-portfolio $ ./welcome.sh',
    'Initializing environment...',
    'Loading modules: [software] [security] [web] [cloud] [machine-learning]',
    'Environment ready. Welcome to Chirag Dewan\'s portfolio.'
  ];
  
  // File system structure for ls and cd commands
  const fileSystem = {
    '~': {
      type: 'dir',
      contents: {
        'portfolio': {
          type: 'dir',
          contents: {
            'projects': {
              type: 'dir',
              contents: {
                'packet-prowler': {
                  type: 'dir',
                  contents: {
                    'README.md': { type: 'file', content: `# Packet Prowler

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
- Linux Systems` }
                  }
                },
                'malware-analysis-tool': {
                  type: 'dir',
                  contents: {
                    'README.md': { type: 'file', content: `# Malware Analysis Tool

A modular Python framework unifying static, behavioral, memory, and network forensics
with machine learning classification. Built with security and isolation in mind.

## Key Features
- Multi-sandbox malware detonation environment
- Static, dynamic, and memory forensics integration
- ML-based malware family classification
- Comprehensive threat reporting

## Technologies
- Python
- Docker
- YARA rules
- Machine Learning` }
                  }
                },
                'ids-project': {
                  type: 'dir',
                  contents: {
                    'README.md': { type: 'file', content: `# ML-Based Intrusion Detection System

An intelligent IDS leveraging machine learning to detect network intrusions with 
high accuracy using synthetic and real-world datasets.

## Key Features
- Real-time traffic analysis and classification
- Ensemble model approach (Random Forest, Gradient Boosting)
- Anomaly detection for zero-day threats
- Tunable sensitivity with explainable results

## Technologies
- Python
- TensorFlow
- Network Security
- Machine Learning` }
                  }
                }
              }
            },
            'skills': {
              type: 'dir',
              contents: {
                'languages.md': { type: 'file', content: `# Programming Languages

- Python (95%) - Data analysis, automation, security tools
- C/C++ (85%) - Low-level programming, system utilities
- JavaScript (80%) - Web applications, data visualization
- Rust (75%) - Memory-safe systems programming
- Bash (70%) - Automation, system administration` },
                'security.md': { type: 'file', content: `# Security Tools

- Ghidra (90%) - Binary analysis, reverse engineering
- IDA Pro (85%) - Disassembly, vulnerability research
- Metasploit (80%) - Penetration testing and exploitation
- Burp Suite (75%) - Web application security testing
- Volatility (70%) - Memory forensics, incident response` },
                'cloud.md': { type: 'file', content: `# Cloud Technologies

- AWS (85%) - EC2, S3, Lambda, Security Groups
- Docker (80%) - Container orchestration and security
- Azure (75%) - Virtual Machines, Active Directory
- Kubernetes (70%) - Container orchestration and management` },
                'datascience.md': { type: 'file', content: `# Data Science

- Pandas (85%) - Data manipulation and analysis
- NumPy (80%) - Scientific computing
- TensorFlow (75%) - Machine learning and AI
- Scikit-learn (80%) - ML algorithms implementation` }
              }
            },
            'resume.md': { type: 'file', content: `# Chirag Dewan
Software Development Engineer II

## Professional Experience

### Software Development Engineer II | Dallas-Fort Worth, TX | May 2024 - Present
* Develop secure and scalable software solutions
* Implement security-focused application architectures
* Create and maintain CI/CD pipelines for automated testing

### Cyber Engineer | Aurora, CO | June 2023 - May 2024
* Performed threat modeling and vulnerability analysis
* Implemented Linux system hardening with SELinux
* Built secure environments for malware analysis

### Senior Cyber Engineering Intern | Aurora, CO | May 2022 - June 2023
* Simulated attacks to test security controls
* Reverse-engineered binaries to identify vulnerabilities` },
            'about.md': { type: 'file', content: `# About Chirag Dewan

Software Development Engineer II specializing in secure software development,
system design, and cybersecurity. Currently focused on developing robust
and secure solutions for complex technical challenges.

* Expertise in secure application development and system architecture
* Skilled in developing custom security tools and automation
* Strong background in vulnerability assessment and threat modeling` },
            'contact.md': { type: 'file', content: `# Contact Information

Email: chirag0728@gmail.com
LinkedIn: linkedin.com/in/cdewan
GitHub: github.com/chirag-dewan
Location: Dallas-Fort Worth, TX` }
          }
        }
      }
    }
  };
  
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
        setIsTyping(false);
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
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  };

  // Get contents of a path in the file system
  const getNodeAtPath = (path) => {
    const parts = path.split('/').filter(part => part !== '');
    let currentNode = fileSystem;
    
    if (path.startsWith('~')) {
      currentNode = fileSystem['~'];
      parts.shift(); // Remove the ~ from the parts array
    }
    
    for (const part of parts) {
      if (currentNode.type !== 'dir' || !currentNode.contents || !currentNode.contents[part]) {
        return null;
      }
      currentNode = currentNode.contents[part];
    }
    
    return currentNode;
  };
  
  // Get the list of contents in the current directory
  const getDirectoryContents = (path) => {
    const node = getNodeAtPath(path);
    if (!node || node.type !== 'dir') return "Not a directory";
    
    const contents = Object.entries(node.contents).map(([name, item]) => {
      return `${item.type === 'dir' ? name + '/' : name}`;
    });
    
    // Sort directories first, then files
    return contents.sort((a, b) => {
      const aIsDir = a.endsWith('/');
      const bIsDir = b.endsWith('/');
      if (aIsDir && !bIsDir) return -1;
      if (!aIsDir && bIsDir) return 1;
      return a.localeCompare(b);
    }).join('\n');
  };
  
  // Handle command execution
  const executeCommand = (cmd) => {
    if (!cmd.trim()) return;
    
    const commandComponents = cmd.trim().split(' ');
    const command = commandComponents[0].toLowerCase();
    const args = commandComponents.slice(1);
    
    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: `${currentPath} $ ${cmd}` }]);
    
    // Add to command history for up/down navigation
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    
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
  resume           - Show professional experience
  cd [directory]   - Change directory (simulate navigation)
  ls [directory]   - List contents of directory
  cat [file]       - View contents of a file
  pwd              - Print working directory
  echo [text]      - Display text
  date             - Display current date and time
  whoami           - Display current user`
        }]);
        break;
        
      case 'clear':
        setHistory([]);
        break;
        
      case 'about':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `Software Development Engineer II specializing in secure software development,
system design, and cybersecurity. Currently focused on developing robust
and secure solutions for complex technical challenges.

* Expertise in secure application development and system architecture
* Skilled in developing custom security tools and automation
* Strong background in vulnerability assessment and threat modeling`
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

Type 'cd ~/portfolio/projects/packet-prowler' and then 'cat README.md' to view project details`
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
Location: Dallas-Fort Worth, TX`
        }]);
        break;
        
      case 'resume':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: `PROFESSIONAL EXPERIENCE
----------------------
Software Development Engineer II | Dallas-Fort Worth, TX | May 2024 - Present
* Develop secure and scalable software solutions
* Implement security-focused application architectures
* Create and maintain CI/CD pipelines for automated testing

Cyber Engineer | Aurora, CO | June 2023 - May 2024
* Performed threat modeling and vulnerability analysis
* Implemented Linux system hardening with SELinux
* Built secure environments for malware analysis

Senior Cyber Engineering Intern | Aurora, CO | May 2022 - June 2023
* Simulated attacks to test security controls
* Reverse-engineered binaries to identify vulnerabilities`
        }]);
        break;
        
      case 'ls':
        const lsPath = args.length > 0 ? args[0] : currentPath;
        const resolvedLsPath = resolvePath(lsPath);
        const contents = getDirectoryContents(resolvedLsPath);
        
        if (contents === "Not a directory") {
          setHistory(prev => [...prev, { 
            type: 'error', 
            content: `ls: ${resolvedLsPath}: Not a directory`
          }]);
        } else {
          setHistory(prev => [...prev, { 
            type: 'response', 
            content: contents || "No files found"
          }]);
        }
        break;
        
      case 'cd':
        if (args.length === 0) {
          setCurrentPath('~');
        } else {
          const newPath = resolvePath(args[0]);
          const node = getNodeAtPath(newPath);
          
          if (!node) {
            setHistory(prev => [...prev, { 
              type: 'error', 
              content: `cd: no such directory: ${args[0]}`
            }]);
          } else if (node.type !== 'dir') {
            setHistory(prev => [...prev, { 
              type: 'error', 
              content: `cd: not a directory: ${args[0]}`
            }]);
          } else {
            setCurrentPath(newPath);
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
          const filePath = resolvePath(args[0]);
          const node = getNodeAtPath(filePath);
          
          if (!node) {
            setHistory(prev => [...prev, { 
              type: 'error', 
              content: `cat: ${args[0]}: No such file or directory`
            }]);
          } else if (node.type !== 'file') {
            setHistory(prev => [...prev, { 
              type: 'error', 
              content: `cat: ${args[0]}: Is a directory`
            }]);
          } else {
            setHistory(prev => [...prev, { 
              type: 'response', 
              content: node.content
            }]);
          }
        }
        break;
        
      case 'pwd':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: currentPath
        }]);
        break;
        
      case 'echo':
        const text = args.join(' ');
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: text
        }]);
        break;
        
      case 'date':
        const now = new Date();
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: now.toString()
        }]);
        break;
        
      case 'whoami':
        setHistory(prev => [...prev, { 
          type: 'response', 
          content: 'visitor@portfolio'
        }]);
        break;
      
      case 'sudo':
        setHistory(prev => [...prev, { 
          type: 'error', 
          content: 'Nice try! 😉 Permission denied.'
        }]);
        break;
        
      case 'exit':
      case 'logout':
        setHistory(prev => [...prev, { 
          type: 'system', 
          content: 'You can\'t log out from this terminal. Keep exploring!'
        }]);
        break;
        
      case 'download':
      case 'resumedownload':
        if (args[0] === 'resume' || command === 'resumedownload') {
          setHistory(prev => [...prev, { 
            type: 'system', 
            content: 'Resume download initiated. Please check the Resume page for the actual download option.'
          }]);
        } else {
          setHistory(prev => [...prev, { 
            type: 'error', 
            content: `download: unknown file: ${args[0] || ''}`
          }]);
        }
        break;
        
      default:
        // Easter eggs and fun commands
        if (['hello', 'hi', 'hey'].includes(command)) {
          setHistory(prev => [...prev, { 
            type: 'system', 
            content: 'Hello there! Type \'help\' to see available commands.'
          }]);
        } else if (command === 'github') {
          setHistory(prev => [...prev, { 
            type: 'system', 
            content: 'Opening GitHub profile... (This would redirect in a real terminal). Visit: github.com/chirag-dewan'
          }]);
        } else if (command === 'linkedin') {
          setHistory(prev => [...prev, { 
            type: 'system', 
            content: 'Opening LinkedIn profile... (This would redirect in a real terminal). Visit: linkedin.com/in/cdewan'
          }]);
        } else if (['ping', 'traceroute', 'nmap', 'netstat'].includes(command)) {
          setHistory(prev => [...prev, { 
            type: 'system', 
            content: 'Network operations not available in this terminal simulation.'
          }]);
        } else if (command === 'matrix') {
          setHistory(prev => [...prev, { 
            type: 'system', 
            content: 'Wake up, Neo...'
          }]);
        } else {
          setHistory(prev => [...prev, { 
            type: 'error', 
            content: `Command not found: ${command}. Type 'help' for available commands.`
          }]);
        }
    }
  };
  
  // Helper function to resolve paths
  const resolvePath = (path) => {
    // Handle absolute paths
    if (path.startsWith('~') || path.startsWith('/')) {
      return path.startsWith('~') ? path : '~' + path;
    }
    
    // Handle relative paths
    if (path === '.') return currentPath;
    if (path === '..') {
      const parts = currentPath.split('/');
      if (parts.length > 1) {
        parts.pop();
        return parts.join('/') || '~';
      }
      return '~';
    }
    
    // Standard relative path
    return `${currentPath}/${path}`;
  };
  
  // Handle form submission (command entry)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      executeCommand(input);
      setInput('');
    }
  };
  
  // Handle keyboard navigation for command history
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      if (newIndex >= 0 && commandHistory.length > 0) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete functionality could be added here
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
          <div className="text-gray-400 text-sm font-mono flex-1 text-center">visitor@portfolio:~</div>
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
          {!isTyping && (
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-pink-400 whitespace-nowrap">{currentPath} $</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 ml-2 bg-transparent text-white outline-none"
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          )}
          
          {/* Blinking cursor */}
          {isTyping && (
            <span className="inline-block h-4 w-2 bg-white animate-pulse"></span>
          )}
        </div>
        
        {/* Terminal footer with hint */}
        <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400">
          <div className="flex justify-between items-center">
            <span>Type 'help' for available commands</span>
            <span>
              <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300 mr-1">↑</kbd>
              <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">↓</kbd>
              <span className="ml-2">for command history</span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Quick command suggestions */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {['help', 'about', 'skills', 'projects', 'resume'].map(cmd => (
          <button
            key={cmd}
            onClick={() => {
              if (!isTyping) {
                setInput(cmd);
                setTimeout(() => executeCommand(cmd), 100);
              }
            }}
            className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors border border-gray-700 hover:border-gray-600"
          >
            {cmd}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal;
