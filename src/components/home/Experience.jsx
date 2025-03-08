import React from 'react';
import { useInView } from 'react-intersection-observer';

const ExperienceItem = ({ experience, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-500 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:gap-8 pb-12 md:pb-20">
        {/* Company info */}
        <div className="md:w-1/3 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold text-apple-gray-900">{experience.company}</h3>
          <p className="text-apple-gray-600 font-medium">{experience.position}</p>
          <p className="text-apple-gray-500 text-sm mt-1">{experience.period}</p>
          <p className="text-apple-gray-500 text-sm">{experience.location}</p>
        </div>
        
        {/* Responsibilities */}
        <div className="md:w-2/3">
          <p className="text-apple-gray-700 mb-4">{experience.description}</p>
          <ul className="space-y-2">
            {experience.responsibilities.map((item, i) => (
              <li key={i} className="flex items-start">
                <i className="fas fa-check text-apple-blue-500 mt-1 mr-3 text-xs"></i>
                <span className="text-apple-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const experiences = [
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
    }
  ];

  return (
    <section id="experience" className="section bg-white">
      <div className="container-apple">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="heading-md text-apple-gray-900">Professional Experience</h2>
          <p className="mt-4 text-lg text-apple-gray-600 max-w-3xl mx-auto">
            My journey through challenging roles in cybersecurity research and engineering
          </p>
        </div>

        <div className="border-t border-apple-gray-100">
          {experiences.map((experience, index) => (
            <ExperienceItem 
              key={experience.company + experience.position}
              experience={experience}
              index={index}
            />
          ))}
        </div>

        {/* Experience summary metrics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 flex flex-col items-center text-center">
            <span className="text-4xl font-display font-bold text-apple-gray-900 mb-2">1.5+</span>
            <span className="text-apple-gray-600">Years of Experience</span>
          </div>
          <div className="card p-8 flex flex-col items-center text-center">
            <span className="text-4xl font-display font-bold text-apple-gray-900 mb-2">5+</span>
            <span className="text-apple-gray-600">Security Projects</span>
          </div>
          <div className="card p-8 flex flex-col items-center text-center">
            <span className="text-4xl font-display font-bold text-apple-gray-900 mb-2">TS</span>
            <span className="text-apple-gray-600">Security Clearance</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
