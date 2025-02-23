import React from 'react';
import { Shield, Code, Terminal, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Cyber Research Scientist
        </h1>
        <p className="text-xl text-gray-400 italic">
          "In a world of digital threats at every corner, curiosity and creativity are the keys to staying secure."
        </p>
      </section>

      {/* About Section */}
      <section className="mb-16 glass p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <div className="prose prose-invert">
          <p className="text-lg">
            I'm Chirag Dewan, a Cyber Research Scientist with a passion for vulnerability research, 
            reverse engineering, and cybersecurity. I thrive on uncovering hidden threats and building 
            robust defenses. My mindset revolves around curiosity, creativity, and an unwavering drive 
            to explore the unknown.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-16 grid md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-6">Programming Languages</h3>
          <div className="space-y-4">
            {[
              { name: 'Python', level: 95 },
              { name: 'C', level: 85 },
              { name: 'JavaScript', level: 80 },
              { name: 'Rust', level: 75 },
            ].map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ '--skill-level': `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-6">Security & Analysis Tools</h3>
          <div className="space-y-4">
            {[
              { name: 'Ghidra', level: 90 },
              { name: 'IDA Pro', level: 85 },
              { name: 'Metasploit', level: 80 },
              { name: 'Burp Suite', level: 75 },
            ].map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress" 
                    style={{ '--skill-level': `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="glass p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-6">Certifications</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'CompTIA Security+', status: 'Completed' },
            { name: 'CompTIA Network+', status: 'Completed' },
            { name: 'AWS Certified Cloud Practitioner', status: 'Completed' },
            { name: 'OSCP', status: 'In Progress' },
            { name: 'CISSP', status: 'Not Started' },
          ].map((cert) => (
            <div key={cert.name} className="content-card p-4">
              <h3 className="font-bold mb-2">{cert.name}</h3>
              <span className={`text-sm ${
                cert.status === 'Completed' ? 'text-green-500' :
                cert.status === 'In Progress' ? 'text-yellow-500' :
                'text-gray-500'
              }`}>
                {cert.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
