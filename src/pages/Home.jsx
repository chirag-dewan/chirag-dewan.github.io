import React from 'react';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 mt-8 fade-in-up">
      {/* About Me Section */}
      <section id="about">
        <h1 className="text-3xl font-bold mb-2 heading-glow">About Me</h1>
        <p className="text-gray-300 mb-4">
          Hello! I’m Chirag Dewan, a Cyber Research Scientist based in Boston, MA.
          I have a passion for vulnerability research, reverse engineering, and cybersecurity.
          I thrive on uncovering hidden threats and building robust defenses.
        </p>
        <p className="text-gray-300 mb-4">
          <strong>What I Do:</strong> I specialize in penetration testing, secure system design,
          and innovative malware analysis. I leverage my deep technical skill set to solve complex
          security challenges and protect critical infrastructure.
        </p>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 mb-8">
          "In a world where digital threats lurk in every corner, passion and persistence are your strongest defenses."
        </blockquote>
      </section>

      {/* Technical Arsenal Section */}
      <section id="technical-arsenal" className="mt-8">
        <h2 className="text-3xl font-bold mb-2 heading-glow">Technical Arsenal</h2>
        <p className="text-gray-300">
          I leverage a combination of deep technical expertise and innovative research to secure systems,
          build custom defensive solutions, and validate security strategies.
        </p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="mt-8">
        <h2 className="text-3xl font-bold mb-4 heading-glow">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Programming Languages</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <span>Python</span>
                <span>95%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full skill-progress" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <span>C</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full skill-progress" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <span>JavaScript</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full skill-progress" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Security Tools</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <span>Ghidra</span>
                <span>90%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full skill-progress" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <span>IDA Pro</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full skill-progress" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <span>Metasploit</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full skill-progress" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
