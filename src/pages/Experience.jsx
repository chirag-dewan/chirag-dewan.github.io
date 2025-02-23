import React from 'react';

export default function Experience() {
  const experiences = [
    {
      title: "Cyber Researcher",
      company: "RTX BBN",
      location: "Cambridge, MA",
      period: "May 2024 – Present",
      achievements: [
        "Developed packet parsers and heuristic anomaly detection, boosting protocol test coverage by 35%",
        "Reverse-engineered firmware to uncover critical memory corruption vulnerabilities",
        "Developed and weaponized PoC exploits, reducing exploit feasibility by 40%"
      ]
    },
    {
      title: "Cyber Engineer",
      company: "Raytheon, RTX",
      location: "Aurora, CO",
      period: "June 2023 – May 2024",
      achievements: [
        "Performed threat modeling and misconfiguration analysis, reducing attack vectors by 35%",
        "Hardened RedHat Linux systems via SELinux & automated scans, cutting unauthorized access by 30%"
      ]
    },
    {
      title: "Senior Cyber Engineering Intern",
      company: "Raytheon, RTX",
      location: "Aurora, CO",
      period: "May 2022 – June 2023",
      achievements: [
        "Simulated real-world attacks using Metasploit, C2 frameworks, and Burp Suite, strengthening defenses by 20%",
        "Reverse-engineered legacy binaries, identifying and mitigating 15+ exploitable vulnerabilities"
      ]
    },
    {
      title: "Information Security Intern",
      company: "Reata Pharmaceuticals",
      location: "Plano, TX",
      period: "May 2021 – August 2021",
      achievements: [
        "Conducted vulnerability scans using Nessus and OpenVAS, reducing exposure by 25%"
      ]
    }
  ];

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">Experience</h1>
      
      <div className="relative">
        <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-500 to-purple-500"/>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className={`flex flex-col md:flex-row gap-8 relative ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}>
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-pink-500"/>
              
              <div className="md:w-1/2 glass p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                <h4 className="text-pink-500 mb-1">{exp.company}</h4>
                <p className="text-gray-400 mb-2">{exp.location}</p>
                <p className="text-sm text-gray-400 mb-4">{exp.period}</p>
                <ul className="list-disc list-inside space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-300">{achievement}</li>
                  ))}
                </ul>
              </div>
              
              <div className="hidden md:block md:w-1/2"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
