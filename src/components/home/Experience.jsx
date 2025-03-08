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
      position: "Cyber Research Engineer I",
      location: "",
      period: "May 2025 – Present",
      description: "Leading security research initiatives focused on vulnerability discovery and threat analysis for critical infrastructure systems.",
      responsibilities: [
        "Engineered custom protocol fuzzers for SCADA systems using AFL++ and libFuzzer, identifying 3 vulnerabilities in industrial control systems",
        "Reverse-engineered proprietary firmware using IDA Pro and Ghidra, uncovering 5+ critical memory corruption vulnerabilities",
        "Automated vulnerability discovery by developing Python-based fuzzing harnesses integrated with LLVM sanitizer toolchain",
        "Designed and implemented Proof-of-Concept (PoC) exploits utilizing command injections, buffer overflows and race conditions"
      ]
    },
    {
      company: "RTX (Formerly Raytheon)",
      position: "Cyber Engineer",
      location: "",
      period: "June 2023 – May 2024",
      description: "Led security hardening initiatives and performed extensive threat modeling to secure enterprise systems and critical infrastructure.",
      responsibilities: [
        "Conducted comprehensive threat modeling using STRIDE methodology and MITRE ATT&CK",
        "Strengthened RedHat Linux systems by customizing SELinux policies and integrating OVAL-based automated compliance scans",
        "Developed and deployed 50+ custom Yara rules and Sigma detections for emergent malware and adversary behaviors",
        "Reduced mean time to detection (MTTD) by 45% through improved detection techniques"
      ]
    },
    {
      company: "RTX (Formerly Raytheon)",
      position: "Senior Cyber Intern",
      location: "",
      period: "May 2022 – June 2023",
      description: "Conducted security assessments and developed tools for vulnerability discovery and exploitation in controlled environments.",
      responsibilities: [
        "Executed advanced persistent threat (APT) simulations with Cobalt Strike, Empire, and custom C2 frameworks",
        "Reverse-engineered legacy binaries using Ghidra and IDA Pro, uncovering 15+ exploitable vulnerabilities",
        "Implemented mitigation strategies via patching and exploit-resistant code refactoring",
        "Enhanced blue team defense strategies through realistic attack simulations"
      ]
    },
    {
      company: "Reata Pharmaceuticals",
      position: "Information Security Intern",
      location: "",
      period: "May 2021 – August 2021",
      description: "Assisted in security assessments and compliance verification for healthcare systems.",
      responsibilities: [
        "Performed in-depth vulnerability assessments using Nessus and OpenVAS",
        "Designed custom scan policies to ensure HIPAA and HITRUST compliance in healthcare systems",
        "Supported security incident response and remediation efforts",
        "Contributed to the implementation of security best practices"
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
          
          {/* Dark storytelling element */}
          <div className="mt-8 p-6 bg-apple-gray-900 rounded-apple-lg text-white max-w-3xl mx-auto shadow-apple-lg">
            <p className="text-apple-gray-200">
              Throughout my career, I've focused on finding and addressing security vulnerabilities in critical systems.
              From industrial control systems at RTX BBN to healthcare compliance at Reata Pharmaceuticals,
              my work has centered on making digital infrastructure more secure and resilient.
            </p>
          </div>
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
            <span className="text-4xl font-display font-bold text-apple-gray-900 mb-2">4+</span>
            <span className="text-apple-gray-600">Years of Experience</span>
          </div>
          <div className="card p-8 flex flex-col items-center text-center">
            <span className="text-4xl font-display font-bold text-apple-gray-900 mb-2">20+</span>
            <span className="text-apple-gray-600">Vulnerabilities Discovered</span>
          </div>
          <div className="card p-8 flex flex-col items-center text-center">
            <span className="text-4xl font-display font-bold text-apple-gray-900 mb-2">3+</span>
            <span className="text-apple-gray-600">Security Certifications</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
