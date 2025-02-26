import React, { useState, useEffect, useRef } from 'react';

export default function Experience() {
  // Animation state using Intersection Observer
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef({});

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

    Object.values(sectionsRef.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const registerSection = (id, ref) => {
    if (ref && !sectionsRef.current[id]) {
      sectionsRef.current[id] = ref;
    }
  };

  // Professional experience data
  const professionalExperience = [
    {
      company: "RTX BBN",
      position: "Cyber Researcher",
      location: "Cambridge, MA",
      period: "May 2024 – Present",
      description: "Leading security research initiatives focused on vulnerability discovery and threat analysis for critical infrastructure systems.",
      highlights: [
        {
          title: "Advanced Packet Analysis",
          description: "Developed intelligent packet parsers and heuristic anomaly detection engines, boosting protocol test coverage by 35%. Created custom dissectors for proprietary protocols that were previously unanalyzable.",
          technologies: ["Wireshark", "Python", "libpcap", "PCRE"],
          category: "defensive"
        },
        {
          title: "Firmware Vulnerability Research",
          description: "Reverse-engineered embedded firmware to uncover critical memory corruption vulnerabilities. Applied static and dynamic analysis to identify buffer overflow conditions that could lead to remote code execution in networked devices.",
          technologies: ["Ghidra", "IDA Pro", "GDB", "JTAG debugging"],
          category: "offensive"
        },
        {
          title: "Exploit Development",
          description: "Developed and weaponized Proof-of-Concept (PoC) exploits for real-world vulnerabilities, enabling preemptive patching. Created robust automation frameworks to validate mitigation effectiveness across multiple firmware versions.",
          technologies: ["C/C++", "Assembly", "ROP chains", "Shellcode"],
          category: "offensive"
        },
        {
          title: "Security Automation",
          description: "Engineered automated security testing pipelines that identified regression vulnerabilities before deployment. Built systems to continually fuzz-test firmware components, reducing the attack surface of each release.",
          technologies: ["AFL++", "Docker", "Jenkins", "Python"],
          category: "defensive"
        }
      ]
    },
    {
      company: "Raytheon, RTX",
      position: "Cyber Engineer",
      location: "Aurora, CO",
      period: "June 2023 – May 2024",
      description: "Led security hardening initiatives and performed extensive threat modeling to secure enterprise systems and critical infrastructure.",
      highlights: [
        {
          title: "Threat Modeling & Analysis",
          description: "Performed in-depth threat modeling and misconfiguration analysis, implementing tailored security policies that reduced attack vectors by 35%. Introduced a structured approach to identifying threats across the entire attack surface.",
          technologies: ["MITRE ATT&CK", "STRIDE", "DREAD", "PASTA"],
          category: "defensive"
        },
        {
          title: "Linux System Hardening",
          description: "Hardened RedHat Linux systems via SELinux & automated scans, cutting unauthorized access by 30%. Created customized security policies that balanced security requirements with operational needs.",
          technologies: ["SELinux", "OpenSCAP", "Ansible", "Bash scripting"],
          category: "defensive"
        },
        {
          title: "Malware Analysis Infrastructure",
          description: "Built a secure, isolated environment for analyzing sophisticated malware, enabling safe detonation and behavior analysis of suspected malicious code. Implemented advanced memory forensics techniques to understand evasive malware.",
          technologies: ["Cuckoo Sandbox", "Volatility", "YARA", "OSQuery"],
          category: "defensive"
        },
        {
          title: "Security Automation Framework",
          description: "Developed a comprehensive automation framework for continuous security testing, reducing manual testing efforts by 60% while increasing coverage. Integrated with CI/CD pipelines to catch security issues early in development.",
          technologies: ["Python", "GitLab CI", "Docker", "REST APIs"],
          category: "both"
        }
      ]
    },
    {
      company: "Raytheon, RTX",
      position: "Senior Cyber Engineering Intern",
      location: "Aurora, CO",
      period: "May 2022 – June 2023",
      description: "Conducted security assessments and developed tools for vulnerability discovery and exploitation in controlled environments.",
      highlights: [
        {
          title: "Adversary Emulation",
          description: "Simulated real-world attacks using Metasploit, C2 frameworks, and Burp Suite, strengthening defenses by 20%. Emulated advanced persistent threat techniques to test detection and response capabilities.",
          technologies: ["Metasploit", "Cobalt Strike", "PowerShell Empire", "Burp Suite"],
          category: "offensive"
        },
        {
          title: "Binary Analysis & Exploitation",
          description: "Reverse-engineered legacy binaries, identifying and mitigating 15+ exploitable vulnerabilities. Developed techniques for analyzing proprietary software without access to source code.",
          technologies: ["Ghidra", "Binary Ninja", "GDB", "Radare2"],
          category: "offensive"
        },
        {
          title: "Automated Vulnerability Scanner",
          description: "Created a custom vulnerability scanner that combined multiple open-source tools with proprietary checks. The system found 30% more vulnerabilities than commercial scanners in internal testing.",
          technologies: ["Python", "Docker", "OpenVAS", "SQLite"],
          category: "defensive"
        },
        {
          title: "Malware Behavior Analysis",
          description: "Analyzed malware samples to document behaviors, infection vectors, and persistence mechanisms. Created detailed technical reports used to improve detection capabilities across the organization.",
          technologies: ["Dynamic analysis", "Static analysis", "Sandboxing", "Memory forensics"],
          category: "defensive"
        }
      ]
    },
    {
      company: "Reata Pharmaceuticals",
      position: "Information Security Intern",
      location: "Plano, TX",
      period: "May 2021 – August 2021",
      description: "Performed security assessments and implemented monitoring solutions in a regulated healthcare environment.",
      highlights: [
        {
          title: "Vulnerability Assessment",
          description: "Conducted vulnerability scans using Nessus and OpenVAS, identifying critical security gaps and reducing exposure by 25%. Prioritized findings based on risk and recommended appropriate mitigations.",
          technologies: ["Nessus", "OpenVAS", "CVSS scoring", "Risk assessment"],
          category: "defensive"
        },
        {
          title: "Security Monitoring Implementation",
          description: "Deployed and configured security monitoring tools to detect unusual network activity and potential data exfiltration attempts. Established baseline behavior profiles to reduce false positives.",
          technologies: ["SIEM", "IDS/IPS", "Log analysis", "Network monitoring"],
          category: "defensive"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-12">
      {/* Header Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">
          Professional Experience
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          A journey through cybersecurity challenges, from defensive hardening to offensive security research and malware analysis.
        </p>
      </section>

      {/* Experience Timeline */}
      <section 
        id="experience-timeline" 
        ref={el => registerSection('experience-timeline', el)}
        className="mb-20"
      >
        <div className={`transition-all duration-700 ${isVisible['experience-timeline'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-7 md:left-1/2 top-0 h-full w-1 bg-gradient-to-b from-pink-500 to-purple-500 transform md:-translate-x-1/2"></div>
            
            {/* Experience items */}
            <div className="space-y-24">
              {professionalExperience.map((experience, idx) => (
                <div key={idx}>
                  {/* Company and Period Timeline Node */}
                  <div className="relative flex items-center mb-8">
                    <div className="absolute left-7 md:left-1/2 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transform -translate-x-1/2 z-10"></div>
                    
                    <div className="md:w-1/2 md:text-right md:pr-8 pl-16 md:pl-0">
                      <h2 className="text-2xl font-bold">{experience.company}</h2>
                      <p className="text-pink-500 font-medium">{experience.position}</p>
                    </div>
                    
                    <div className="hidden md:block md:w-1/2 md:pl-8">
                      <p className="text-gray-400">{experience.period}</p>
                      <p className="text-gray-500">{experience.location}</p>
                    </div>
                    
                    <div className="md:hidden absolute right-0 top-0">
                      <p className="text-gray-400 text-sm">{experience.period}</p>
                      <p className="text-gray-500 text-sm">{experience.location}</p>
                    </div>
                  </div>
                  
                  {/* Overview */}
                  <div className="ml-16 md:ml-0 md:px-16">
                    <div className="glass rounded-xl p-6 mb-8 border border-white/10">
                      <p className="text-gray-300">{experience.description}</p>
                    </div>
                  </div>
                  
                  {/* Highlights Grid */}
                  <div className="ml-16 md:ml-0 md:px-16 grid md:grid-cols-2 gap-6">
                    {experience.highlights.map((highlight, hIdx) => (
                      <div 
                        key={hIdx} 
                        className={`glass rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${
                          highlight.category === 'offensive' 
                            ? 'border-red-500/20 hover:border-red-500/30' 
                            : highlight.category === 'defensive'
                              ? 'border-blue-500/20 hover:border-blue-500/30'
                              : 'border-purple-500/20 hover:border-purple-500/30'
                        }`}
                        style={{
                          animationDelay: `${hIdx * 0.1}s`,
                          opacity: isVisible['experience-timeline'] ? 1 : 0,
                          transform: isVisible['experience-timeline'] ? 'translateY(0)' : 'translateY(20px)',
                          transition: `opacity 0.5s ease, transform 0.5s ease`,
                          transitionDelay: `${(idx * 0.2) + (hIdx * 0.1)}s`
                        }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold">{highlight.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            highlight.category === 'offensive' 
                              ? 'bg-red-500/10 text-red-400' 
                              : highlight.category === 'defensive'
                                ? 'bg-blue-500/10 text-blue-400'
                                : 'bg-purple-500/10 text-purple-400'
                          }`}>
                            {highlight.category === 'offensive' 
                              ? 'Red Team' 
                              : highlight.category === 'defensive'
                                ? 'Blue Team'
                                : 'Red & Blue Team'}
                          </span>
                        </div>
                        
                        <p className="text-gray-300 mb-4">{highlight.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {highlight.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-400">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Focus Areas */}
      <section 
        id="research-areas" 
        ref={el => registerSection('research-areas', el)} 
        className="py-16 glass p-8 rounded-xl border border-white/10 mb-20"
      >
        <div className={`transition-all duration-700 ${isVisible['research-areas'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-3xl font-bold mb-8 text-center">Research Focus Areas</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-red-900/20 to-red-800/10 rounded-xl border border-red-500/20">
              <h3 className="text-xl font-bold mb-4 text-red-400">Offensive Security</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Exploit development and weaponization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Binary reverse engineering</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Advanced persistence techniques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Memory corruption vulnerabilities</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl border border-blue-500/20">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Defensive Security</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Security hardening & compliance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Anomaly detection systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Secure architecture design</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Threat modeling & risk assessment</span>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-400">Malware Research</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Advanced evasion techniques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Memory forensics & behavior analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Sandbox detection countermeasures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Novel infection vectors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security Automation */}
      <section 
        id="security-automation" 
        ref={el => registerSection('security-automation', el)} 
        className="mb-20"
      >
        <div className={`transition-all duration-700 ${isVisible['security-automation'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">
            Security Automation Expertise
          </h2>
          
          <div className="glass p-8 rounded-xl border border-white/10 mb-8">
            <p className="text-gray-300 mb-6">
              Throughout my career, I've focused on developing security automation solutions that bridge the gap between offensive and defensive security. By automating routine tasks, security teams can focus on complex challenges while maintaining comprehensive coverage.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-red-500/20 p-6 rounded-xl bg-red-900/5">
                <h3 className="text-xl font-bold mb-4 text-center text-red-400">Offensive Automation</h3>
                <ul className="space-y-4">
                  <li className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Vulnerability Discovery Pipeline</h4>
                    <p className="text-gray-400 text-sm">
                      Created a continuous scanning system that automates discovery of vulnerabilities across enterprise assets. The system combines multiple scanning tools and correlates findings to reduce false positives.
                    </p>
                  </li>
                  <li className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Exploit Generation System</h4>
                    <p className="text-gray-400 text-sm">
                      Developed a framework that automates the creation of proof-of-concept exploits for discovered vulnerabilities, enabling faster validation and prioritization of security issues.
                    </p>
                  </li>
                  <li className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Fuzz Testing Orchestration</h4>
                    <p className="text-gray-400 text-sm">
                      Built an intelligent fuzzing platform that directs testing efforts to code paths most likely to contain vulnerabilities, resulting in 40% more unique crashes than traditional approaches.
                    </p>
                  </li>
                </ul>
              </div>
              
              <div className="border border-blue-500/20 p-6 rounded-xl bg-blue-900/5">
                <h3 className="text-xl font-bold mb-4 text-center text-blue-400">Defensive Automation</h3>
                <ul className="space-y-4">
                  <li className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Security Hardening Scripts</h4>
                    <p className="text-gray-400 text-sm">
                      Engineered automated hardening scripts that apply security best practices to systems at scale, ensuring consistent security posture across the enterprise.
                    </p>
                  </li>
                  <li className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Anomaly Detection System</h4>
                    <p className="text-gray-400 text-sm">
                      Created a machine learning-based system that identifies abnormal network behavior and user activity, providing early warning of potential security incidents.
                    </p>
                  </li>
                  <li className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Automated Incident Response</h4>
                    <p className="text-gray-400 text-sm">
                      Developed playbooks and automation tools that perform initial incident response actions, collecting forensic data and implementing containment measures to reduce impact.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="glass p-8 rounded-xl border border-purple-500/20 bg-purple-900/5">
            <h3 className="text-xl font-bold mb-6 text-center text-purple-400">Full-Spectrum Security Tools</h3>
            <p className="text-gray-300 mb-6 text-center">
              By combining offensive and defensive perspectives, I've developed tools that provide comprehensive security coverage:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-5 rounded-lg">
                <h4 className="font-bold mb-3 text-center">Autonomous Vulnerability Management</h4>
                <p className="text-gray-400 text-sm">
                  End-to-end system that discovers, validates, prioritizes, and tracks vulnerabilities through remediation, reducing mean time to remediate by 45%.
                </p>
              </div>
              
              <div className="bg-white/5 p-5 rounded-lg">
                <h4 className="font-bold mb-3 text-center">Continuous Security Validation</h4>
                <p className="text-gray-400 text-sm">
                  Platform that regularly tests security controls using real-world attack techniques, ensuring defenses remain effective against evolving threats.
                </p>
              </div>
              
              <div className="bg-white/5 p-5 rounded-lg">
                <h4 className="font-bold mb-3 text-center">Malware Analysis Automation</h4>
                <p className="text-gray-400 text-sm">
                  System that automates the analysis of suspicious files, extracting IOCs and behavioral patterns to enhance detection capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Technical Challenges */}
      <section 
        id="technical-challenges" 
        ref={el => registerSection('technical-challenges', el)}
      >
        <div className={`transition-all duration-700 ${isVisible['technical-challenges'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-3xl font-bold mb-8 text-center">Notable Technical Challenges</h2>
          
          <div className="space-y-6">
            <div className="glass p-6 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Hardware-Backed Security for IoT Devices</h3>
              <p className="text-gray-300 mb-4">
                Faced with securing resource-constrained IoT devices, I developed a novel approach using hardware security modules and lightweight cryptography. This solution provided strong security guarantees while maintaining acceptable performance on limited hardware.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm">Embedded Security</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm">Hardware Security Modules</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm">Cryptography</span>
              </div>
              <div className="flex items-center text-pink-500 text-sm">
                <span className="mr-2">Key Achievement:</span>
                <span className="text-white">Reduced firmware attack surface by 60% while maintaining functionality</span>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Advanced Obfuscated Malware Analysis</h3>
              <p className="text-gray-300 mb-4">
                Analyzed a sophisticated malware variant that used multiple layers of packing, encryption, and anti-analysis techniques. By developing custom tools and leveraging advanced debugging methods, I was able to fully understand its operation and develop effective countermeasures.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm">Reverse Engineering</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm">Dynamic Analysis</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm">Anti-Anti-Analysis</span>
              </div>
              <div className="flex items-center text-pink-500 text-sm">
                <span className="mr-2">Key Achievement:</span>
                <span className="text-white">Developed detection signatures that identified previously undetected variants</span>
              </div>
            </div>
            
            <div className="glass p-6 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Zero-Trust Network Implementation</h3>
              <p className="text-gray-300 mb-4">
                Led the design and implementation of a zero-trust architecture for a complex enterprise environment. The project involved integrating network segmentation, identity verification, and comprehensive monitoring while maintaining operational efficiency.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm">Zero-Trust</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm">Network Architecture</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-sm">Identity Management</span>
              </div>
              <div className="flex items-center text-pink-500 text-sm">
                <span className="mr-2">Key Achievement:</span>
                <span className="text-white">Reduced security incidents by 70% while improving system performance</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
