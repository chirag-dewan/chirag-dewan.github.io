import React from 'react';
import GitHubCalendar from 'react-github-calendar';

export default function Home() {
  const skills = {
    languages: [
      { name: 'Python', level: 95 },
      { name: 'C', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'Rust', level: 75 },
    ],
    security: [
      { name: 'Ghidra', level: 90 },
      { name: 'IDA Pro', level: 85 },
      { name: 'Metasploit', level: 80 },
      { name: 'Burp Suite', level: 75 },
    ],
    certifications: [
      { name: 'CompTIA Security+', status: 'Completed' },
      { name: 'CompTIA Network+', status: 'Completed' },
      { name: 'AWS Certified Cloud Practitioner', status: 'Completed' },
      { name: 'OSCP', status: 'In Progress' },
      { name: 'CISSP', status: 'Not Started' },
    ]
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Chirag Dewan
        </h1>
        <p className="text-xl text-gray-400 italic">
          "In the realm of cybersecurity, continuous learning isn't just a choice – it's the foundation of excellence."
        </p>
      </section>

      <section className="mb-16 glass p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <div className="prose prose-invert">
          <p className="text-lg mb-4">
            As a Cyber Researcher at RTX BBN, I'm dedicated to uncovering and solving complex security challenges. 
            My journey is driven by an unwavering commitment to learning and growth, pushing the boundaries of what's 
            possible in cybersecurity.
          </p>
          <p className="text-lg">
            Through persistence and hard work, I've developed expertise in vulnerability research, reverse engineering, 
            and threat analysis. Each challenge is an opportunity to learn, innovate, and strengthen our digital defenses.
          </p>
        </div>
      </section>

      <section className="mb-16 grid md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-6">Programming Languages</h3>
          <div className="space-y-4">
            {skills.languages.map((skill) => (
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
            {skills.security.map((skill) => (
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

      <section className="glass p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-6">Certifications</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {skills.certifications.map((cert) => (
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

      <section className="glass p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-6">GitHub Activity</h2>
        <div className="flex justify-center">
          <GitHubCalendar 
            username="chirag-dewan"
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
          />
        </div>
      </section>
    </div>
  );
}
