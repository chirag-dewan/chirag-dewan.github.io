import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChiragGPT = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "👋 Hey! I'm ChiragGPT - ask me about Chirag's cybersecurity research, zero-day discoveries, AI/ML projects, or career journey!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Real knowledge base from resume
  const knowledge = {
    current_role: "I'm currently a Software Engineer II at GM Financial since February 2025, working on financial technology solutions. Previously, I was a Cybersecurity Researcher at RTX (Raytheon/BBN Technologies) where I discovered 8 zero-day vulnerabilities in critical infrastructure systems.",
    
    vulnerabilities: "I discovered 8 zero-day vulnerabilities in critical infrastructure systems deployed across 15,000+ industrial installations globally. I coordinated urgent security patches with vendors and developed automated fuzzing platforms that improved vulnerability detection by 42%.",
    
    rtx_experience: "At RTX, I reverse-engineered proprietary SCADA protocols using Ghidra and IDA Pro, uncovering memory corruption flaws that prompted emergency patches from 3 major vendors. I also authored 50+ YARA and Sigma detection rules that improved malware detection by 45% across Fortune 500 deployments.",
    
    technical_skills: "I'm an expert in Python, proficient in Java and C/C++, advanced in Rust. My AI/ML stack includes PyTorch, TensorFlow, LLMs (GPT-4, Claude), LangGraph, and various security tools like Ghidra, IDA Pro, AFL++, YARA, and Splunk.",
    
    certifications: "I hold Security+, Network+, AWS Cloud Practitioner, and AWS Solutions Architect Associate certifications. Currently working towards AWS ML Specialty and Azure AI Engineer Associate.",
    
    projects: "Key projects include an Autonomous Financial Fraud Detection System using LangGraph and OpenAI GPT-4, and a Secure Cloud Infrastructure Automation Platform with Terraform achieving 96% fraud detection accuracy.",
    
    education: "I have a Bachelor of Science in Computer Science from Arizona State University with a 3.74/4.0 GPA, graduated May 2023.",
    
    career_advice: "My advice: 1) Get hands-on with real systems, 2) Learn both offense and defense, 3) Master Python and cloud platforms, 4) Stay current with AI/ML in security, 5) Build projects that show real impact like preventing fraud or discovering vulnerabilities!"
  };

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('gm financial') || message.includes('current job')) {
      return knowledge.current_role;
    }
    
    if (message.includes('zero-day') || message.includes('vulnerabilities') || message.includes('discovered')) {
      return knowledge.vulnerabilities;
    }
    
    if (message.includes('rtx') || message.includes('raytheon') || message.includes('reverse engineering')) {
      return knowledge.rtx_experience;
    }
    
    if (message.includes('skills') || message.includes('technical') || message.includes('programming')) {
      return knowledge.technical_skills;
    }
    
    if (message.includes('certification') || message.includes('certified')) {
      return knowledge.certifications;
    }
    
    if (message.includes('projects') || message.includes('built')) {
      return knowledge.projects;
    }
    
    if (message.includes('education') || message.includes('degree') || message.includes('arizona')) {
      return knowledge.education;
    }
    
    if (message.includes('advice') || message.includes('tips') || message.includes('career')) {
      return knowledge.career_advice;
    }
    
    if (message.includes('contact') || message.includes('email')) {
      return "You can reach me at chirag0728@gmail.com, connect on LinkedIn at linkedin.com/in/cdewan, or check out my GitHub at github.com/chirag-dewan. I'm based in Boston, MA and open to cybersecurity opportunities!";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hey! 👋 I'm an AI representation of Chirag Dewan, a cybersecurity researcher turned fintech engineer. I can tell you about discovering zero-day vulnerabilities, building fraud detection systems, or my technical journey. What interests you?";
    }
    
    if (message.includes('help') || message === '') {
      return "I can tell you about:\n• 🔒 Cybersecurity research (8 zero-days discovered)\n• 💰 Current work at GM Financial\n• 🛠️ Technical skills (Python, AI/ML, security tools)\n• 📜 Certifications and education\n• 💡 Career advice\n\nWhat would you like to know?";
    }
    
    return "Interesting question! I can share details about Chirag's cybersecurity research, zero-day discoveries, technical skills, career journey, or current work. Try asking about specific topics like 'zero-day vulnerabilities', 'RTX experience', 'technical skills', or 'career advice'!";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateResponse(inputValue),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickQuestions = [
    "Tell me about the 8 zero-day vulnerabilities",
    "What's your experience at RTX?",
    "What technical skills do you have?",
    "What projects have you built?",
    "Any career advice?"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-4 bg-black border-2 border-green-400 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
      style={{ boxShadow: '0 0 50px rgba(0, 255, 0, 0.3)' }}
    >
      {/* Header */}
      <div className="bg-gray-900 border-b border-green-400 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">CD</span>
          </div>
          <div>
            <h3 className="text-green-400 font-bold text-lg">ChiragGPT</h3>
            <p className="text-gray-400 text-sm">Ask me anything about Chirag's experience!</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-lg ${
              message.type === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 border border-green-400 text-green-300'
            }`}>
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs opacity-70 mt-2">
                {formatTime(message.timestamp)}
              </p>
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-800 border border-green-400 p-4 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="p-4 border-t border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputValue(question)}
                className="text-xs bg-gray-800 text-green-400 px-3 py-1 rounded-full hover:bg-gray-700 transition-colors border border-green-400"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-green-400 p-4 bg-gray-900">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about cybersecurity research, zero-days, technical skills..."
            className="flex-1 bg-black border border-green-400 text-green-300 px-4 py-2 rounded-lg focus:outline-none focus:border-cyan-400 placeholder-gray-500"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChiragGPT;
