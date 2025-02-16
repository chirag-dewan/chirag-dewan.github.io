import React from 'react';

export default function App() {
  // Data structures for the sections
  const skillsData = [
    {
      category: 'Programming Languages',
      items: [
        { name: 'Python', level: 95 },
        { name: 'C', level: 85 },
        { name: 'JavaScript', level: 80 },
        { name: 'Rust', level: 75 },
      ],
    },
    {
      category: 'Security Tools',
      items: [
        { name: 'Ghidra', level: 90 },
        { name: 'IDA Pro', level: 85 },
        { name: 'Metasploit', level: 80 },
        { name: 'Burp Suite', level: 75 },
      ],
    },
  ];

  const certificationsData = [
    {
      title: 'CompTIA Security+',
      year: 2023,
      status: 'Completed',
      description: 'Foundation in cybersecurity concepts and best practices.',
    },
    {
      title: 'CompTIA Network+',
      year: 2023,
      status: 'Completed',
      description: 'Expertise in network security and infrastructure.',
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      year: 2023,
      status: 'Completed',
      description: 'Solid understanding of AWS cloud fundamentals.',
    },
    {
      title: 'OSCP',
      year: 2024,
      status: 'In Progress',
      description: 'Advanced penetration testing techniques in progress.',
    },
  ];

  const projectsData = [
    {
      name: 'Custom C2 Server',
      description:
        'Developed a secure Command-and-Control server using Python and Flask, incorporating TLS for encrypted communications.',
      link: 'https://github.com/yourusername/c2-server',
    },
    {
      name: 'Firmware Analysis Toolkit',
      description:
        'Created a toolkit to automate firmware unpacking, scan for vulnerabilities, and generate reports for reverse-engineering.',
      link: 'https://github.com/yourusername/firmware-analysis',
    },
  ];

  const malwareResearch = [
    {
      title: 'Ransomware Behavioral Analysis',
      summary:
        'Analyzed a new ransomware strain’s file-encryption routine, discovered unique evasion techniques, and proposed effective mitigation strategies.',
    },
    {
      title: 'Stealth Keylogger PoC',
      summary:
        'Developed a proof-of-concept keylogger in C that bypassed basic AV heuristics, highlighting the need for advanced detection measures.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0F172A] via-[#131B2C] to-[#0F172A] text-white font-mono">
      {/* ==================== NAVBAR ==================== */}
      <header className="flex items-center justify-between px-6 py-4 glass sticky top-0 z-50">
        <div className="text-xl font-bold heading-glow">CD.</div>
        <div className="space-x-4 text-sm">
          <a
            href="#about"
            className="bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition hover-pulse"
          >
            About Me
          </a>
          <a
            href="#portfolio"
            className="bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition hover-pulse"
          >
            Portfolio
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition hover-pulse"
          >
            GitHub
          </a>
        </div>
      </header>

      {/* ==================== ABOUT ME / HERO ==================== */}
      <section id="about" className="max-w-5xl mx-auto px-6 mt-8 fade-in-up">
        <h1 className="text-3xl font-bold mb-2 heading-glow">About Me</h1>
        <p className="text-gray-300 mb-4">
          Hello! I’m Chirag Dewan, a Cyber Research Scientist based in Boston, MA.
          With a passion for vulnerability research, reverse engineering, and advanced
          cybersecurity, I thrive on uncovering hidden threats and building robust defenses.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>What I Do:</strong> I specialize in penetration testing, secure system design,
          and innovative research into malware analysis. I bring a deep technical skill set
          to solve complex security challenges and protect critical infrastructure.
        </p>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 mb-8">
          "In a world where digital threats lurk in every corner, passion and persistence are your
          strongest defenses."
        </blockquote>
      </section>

      {/* ==================== TECHNICAL SUMMARY ==================== */}
      <section id="portfolio" className="max-w-5xl mx-auto px-6 mt-8 fade-in-up">
        <h2 className="text-3xl font-bold mb-2 heading-glow">Technical Arsenal</h2>
        <p className="text-gray-300">
          I leverage a combination of deep technical expertise and innovative research to
          secure systems, build custom defensive solutions, and validate security strategies.
          From developing custom packet parsers to reverse-engineering firmware vulnerabilities,
          my work is driven by a commitment to excellence and a passion for cybersecurity.
        </p>
      </section>

      {/* ==================== SKILLS (Progress Bars) ==================== */}
      <section className="max-w-5xl mx-auto px-6 mt-10 fade-in-up">
        {skillsData.map((group, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-200 heading-glow">
              {group.category}
            </h3>
            {group.items.map((skill) => (
              <div key={skill.name} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-2 rounded-full skill-progress"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* ==================== CERTIFICATIONS ==================== */}
      <section className="max-w-5xl mx-auto px-6 mt-12 fade-in-up">
        <h2 className="text-2xl font-bold mb-4 heading-glow">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificationsData.map((cert) => (
            <div key={cert.title} className="card bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{cert.title}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-green-600/20 text-green-400 border border-green-400/20">
                  {cert.status}
                </span>
              </div>
              <span className="inline-block text-xs text-gray-400 mb-2 bg-white/5 px-2 py-1 rounded">
                {cert.year}
              </span>
              <p className="text-sm text-gray-300">{cert.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== PROJECTS ==================== */}
      <section className="max-w-5xl mx-auto px-6 mt-12 fade-in-up">
        <h2 className="text-2xl font-bold mb-4 heading-glow">Projects</h2>
        <div className="space-y-4">
          {projectsData.map((proj) => (
            <div key={proj.name} className="card bg-white/5 p-4 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-1">{proj.name}</h3>
              <p className="text-sm text-gray-300 mb-2">{proj.description}</p>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 text-sm hover:underline"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ==================== MALWARE ANALYSIS / RESEARCH ==================== */}
      <section className="max-w-5xl mx-auto px-6 mt-12 fade-in-up">
        <h2 className="text-2xl font-bold mb-4 heading-glow">Malware Analysis &amp; Research</h2>
        <div className="space-y-4">
          {malwareResearch.map((item) => (
            <div key={item.title} className="card bg-white/5 p-4 rounded-lg border border-white/10">
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="max-w-5xl mx-auto px-6 mt-16 py-6 text-center text-sm text-gray-400 border-t border-white/10 fade-in-up">
        &copy; {new Date().getFullYear()} Chirag Dewan. All Rights Reserved.
      </footer>
    </div>
  );
}
