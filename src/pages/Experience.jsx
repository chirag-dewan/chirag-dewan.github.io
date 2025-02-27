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

  // Professional experience data - simplified
  const professionalExperience = [
    {
      company: "RTX BBN",
      position: "Cyber Researcher",
      location: "Cambridge, MA",
      period: "May 2024 – Present",
      description: "Leading security research initiatives focused on vulnerability discovery and threat analysis for critical infrastructure systems.",
      responsibilities: [
        "Develop and implement packet parsing and analysis systems for network traffic inspection",
        "Conduct reverse engineering of firmware to identify and document security vulnerabilities",
        "Create proof-of-concept exploit code to demonstrate impact of discovered vulnerabilities",
        "Design and implement security automation pipelines for continuous vulnerability testing"
      ]
    },
    {
      company: "Raytheon, RTX",
      position: "Cyber Engineer",
      location: "Aurora, CO",
      period: "June 2023 – May 2024",
      description: "Led security hardening initiatives and performed extensive threat modeling to secure enterprise systems and critical infrastructure.",
      responsibilities: [
        "Performed comprehensive threat modeling and vulnerability analysis for critical systems",
        "Implemented hardening measures for Linux systems using SELinux and automated security scans",
        "Built secure environments for malware analysis and behavior monitoring",
        "Developed security automation frameworks integrated with CI/CD pipelines"
      ]
    },
    {
      company: "Raytheon, RTX",
      position: "Senior Cyber Engineering Intern",
      location: "Aurora, CO",
      period: "May 2022 – June 2023",
      description: "Conducted security assessments and developed tools for vulnerability discovery and exploitation in controlled environments.",
      responsibilities: [
        "Simulated real-world attacks to test security controls and detection capabilities",
        "Reverse-engineered binaries to identify and document exploitable vulnerabilities",
        "Created custom vulnerability scanners that combined multiple open-source tools",
        "Analyzed malware samples to document behaviors and improve detection capabilities"
      ]
    },
    {
      company: "Reata Pharmaceuticals",
      position: "Information Security Intern",
      location: "Plano, TX",
      period: "May 2021 – August 2021",
      description: "Performed security assessments and implemented monitoring solutions in a regulated healthcare environment.",
      responsibilities: [
        "Conducted vulnerability assessments using industry-standard tools and methodologies",
        "Implemented security monitoring solutions to detect unusual network activity",
        "Documented findings and presented recommendations to the security team"
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
          My journey through cybersecurity challenges, from defensive measures to offensive security research.
        </p>
      </section>

      {/* Experience Timeline - Simplified */}
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
            <div className="space-y-20">
              {professionalExperience.map((experience, idx) => (
                <div key={idx} 
                  className="relative"
                  style={{ 
                    opacity: isVisible['experience-timeline'] ? 1 : 0,
                    transform: isVisible['experience-timeline'] ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    transitionDelay: `${idx * 0.2}s`
                  }}
                >
                  {/* Company and Period Timeline Node */}
                  <div className="relative flex items-center mb-8">
                    <div className="absolute left-7 md:left-1/2 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transform -translate-x-1/2 z-10 shadow-lg shadow-pink-500/20"></div>
                    
                    <div className="md:w-1/2 md:text-right md:pr-8 pl-16 md:pl-0">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{experience.company}</h2>
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
                  
                  {/* Job Details */}
                  <div className="ml-16 md:ml-0 md:px-16">
                    <div className="glass rounded-xl p-6 mb-6 border border-white/10 hover:border-pink-500/20 transition-all duration-300 bg-gradient-to-br from-black to-black/70">
                      <p className="text-gray-300 mb-4">{experience.description}</p>
                      
                      <h3 className="text-lg font-bold mb-3 text-white/80">Key Responsibilities:</h3>
                      <ul className="space-y-2">
                        {experience.responsibilities.map((resp, respIdx) => (
                          <li key={respIdx} className="flex items-start text-gray-300">
                            <span className="text-pink-500 mr-2 mt-1">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section 
        id="experience-summary" 
        ref={el => registerSection('experience-summary', el)}
        className="mb-12"
      >
        <div className={`transition-all duration-700 ${isVisible['experience-summary'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="glass p-8 rounded-xl border border-white/10 bg-gradient-to-br from-pink-900/10 to-purple-900/10">
            <h2 className="text-2xl font-bold mb-6 text-center">Career Summary</h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-5 rounded-lg bg-white/5 border border-white/10">
                <div className="text-3xl font-bold text-pink-500 mb-2">1.5+</div>
                <div className="text-gray-300">Years of Full-Time Experience</div>
              </div>
              <div className="p-5 rounded-lg bg-white/5 border border-white/10">
                <div className="text-3xl font-bold text-blue-500 mb-2">3+</div>
                <div className="text-gray-300">Major Security Projects</div>
              </div>
              <div className="p-5 rounded-lg bg-white/5 border border-white/10">
                <div className="text-3xl font-bold text-purple-500 mb-2">TS</div>
                <div className="text-gray-300">Security Clearance</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
