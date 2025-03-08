import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('Cybersecurity');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const skillCategories = [
    'Cybersecurity',
    'Programming',
    'Cloud & Infrastructure',
    'Data Science & ML'
  ];
  
  const skills = {
    'Cybersecurity': [
      { name: 'Threat Modeling', level: 90, description: 'STRIDE methodology and MITRE ATT&CK framework implementation for threat analysis' },
      { name: 'Vulnerability Research', level: 95, description: 'Advanced exploit development and zero-day research for critical infrastructure' },
      { name: 'Malware Analysis', level: 88, description: 'Memory forensics, dynamic analysis, and behavioral pattern recognition' },
      { name: 'Penetration Testing', level: 85, description: 'Network and application penetration testing with custom exploitation frameworks' },
      { name: 'Incident Response', level: 82, description: 'Rapid threat containment, digital forensics, and root cause analysis' },
      { name: 'Secure Architecture', level: 88, description: 'Designing and implementing security controls and zero-trust architectures' }
    ],
    'Programming': [
      { name: 'Python', level: 95, description: 'Advanced scripting, security tools, automation frameworks, and ML implementations' },
      { name: 'C/C++', level: 85, description: 'Low-level systems programming, memory management, and performance-critical applications' },
      { name: 'JavaScript', level: 80, description: 'Web application development, React frameworks, and security monitoring dashboards' },
      { name: 'Rust', level: 75, description: 'Memory-safe systems programming for security-critical applications' },
      { name: 'Bash/Shell', level: 70, description: 'System administration, automation scripts, and security hardening tools' }
    ],
    'Cloud & Infrastructure': [
      { name: 'AWS', level: 80, description: 'Cloud infrastructure, security services, and cloud security posture management' },
      { name: 'Docker', level: 85, description: 'Container security, secure image building, and isolation techniques' },
      { name: 'Kubernetes', level: 75, description: 'Secure orchestration, network policies, and service mesh implementation' },
      { name: 'CI/CD Security', level: 78, description: 'Pipeline security integration, automated vulnerability scanning, and IaC security' },
      { name: 'Linux Administration', level: 85, description: 'System hardening, SELinux configuration, and secure deployment practices' }
    ],
    'Data Science & ML': [
      { name: 'Anomaly Detection', level: 85, description: 'ML models for detecting unusual patterns in network traffic and system behavior' },
      { name: 'TensorFlow', level: 80, description: 'Building and training neural networks for security classification problems' },
      { name: 'Scikit-learn', level: 85, description: 'Feature engineering and model development for security applications' },
      { name: 'Pandas/NumPy', level: 85, description: 'Data manipulation, analysis, and preprocessing for security datasets' },
      { name: 'Data Visualization', level: 70, description: 'Creating insightful visualizations of security metrics and threat intelligence' }
    ]
  };

  const certifications = [
    { name: 'CompTIA Security+', status: 'Certified', year: '2023' },
    { name: 'CompTIA Network+', status: 'Certified', year: '2024' },
    { name: 'AWS Cloud Practitioner', status: 'Certified', year: '2024' },
    { name: 'OSCP', status: 'In Progress', year: '2025' }
  ];

  return (
    <section id="skills" className="section bg-apple-gray-50">
      <div className="container-apple">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="heading-md text-apple-gray-900">Core Competencies</h2>
          <p className="mt-4 text-lg text-apple-gray-600 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and skills
          </p>
        </div>

        {/* Category selector */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {skillCategories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-apple-gray-900 text-white shadow-apple-sm'
                  : 'bg-white text-apple-gray-700 hover:bg-apple-gray-100'
              }`}
              style={{ 
                transitionDelay: inView ? `${index * 0.1}s` : '0s',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills[activeCategory].map((skill, index) => (
            <div
              key={skill.name}
              className="card p-6 hoverable"
              style={{ 
                transitionDelay: inView ? `${index * 0.1}s` : '0s',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(10px)'
              }}
            >
              <h3 className="text-lg font-medium text-apple-gray-900 mb-2">{skill.name}</h3>
              
              <div className="mt-4 flex items-center">
                <div className="skill-bar flex-1">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="ml-3 text-sm font-medium text-apple-gray-700">{skill.level}%</span>
              </div>
              
              <p className="mt-4 text-sm text-apple-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-20">
          <h3 className="text-2xl font-display font-bold text-apple-gray-900 text-center mb-10">Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((certification, index) => (
              <div 
                key={certification.name}
                className="card p-6 hoverable"
                style={{ 
                  transitionDelay: inView ? `${0.6 + (index * 0.1)}s` : '0s',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(10px)'
                }}
              >
                <h4 className="text-lg font-medium text-apple-gray-900 mb-2">{certification.name}</h4>
                <div className="mt-auto flex justify-between items-end">
                  <span className="text-sm text-apple-gray-600">{certification.year}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    certification.status === 'Certified'
                      ? 'bg-apple-green/10 text-apple-green'
                      : 'bg-apple-blue-500/10 text-apple-blue-500'
                  }`}>
                    {certification.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specialized tools */}
        <div className="mt-20">
          <h3 className="text-2xl font-display font-bold text-apple-gray-900 text-center mb-10">Specialized Tools</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Ghidra/IDA Pro', 'Metasploit', 'Burp Suite', 'Wireshark', 
              'Volatility', 'YARA', 'Nmap', 'OWASP ZAP', 'Radare2', 
              'Splunk', 'ELK Stack', 'Suricata', 'Cobalt Strike'
            ].map((tool, index) => (
              <span 
                key={tool}
                className="px-4 py-2 bg-white text-apple-gray-700 rounded-full shadow-apple-sm text-sm"
                style={{ 
                  transitionDelay: inView ? `${1 + (index * 0.05)}s` : '0s',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.5s ease'
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
