import React from 'react';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 mt-8 fade-in-up">
      {/* About Me Section */}
      <section id="about" className="mb-12">
        <h1 className="text-3xl font-bold mb-2 heading-glow">About Me</h1>
        <p className="text-gray-300 mb-4">
          I’m Chirag Dewan, a Cyber Research Scientist based in Boston, MA. My work revolves around
          vulnerability research, reverse engineering, and penetration testing. With an active Top
          Secret Clearance and years of hands-on experience, I focus on uncovering hidden threats and
          designing robust security solutions.
        </p>
        <p className="text-gray-300 mb-4">
          My expertise spans from building custom command-and-control servers to conducting in-depth
          firmware analyses. I’m driven by curiosity, a commitment to innovation, and the pursuit of
          cutting-edge security research.
        </p>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400">
          "In a world where digital threats lurk in every corner, passion and persistence are your
          strongest defenses."
        </blockquote>
      </section>

      {/* Technical Arsenal Section */}
      <section id="technical-arsenal" className="mb-12">
        <h2 className="text-3xl font-bold mb-2 heading-glow">Technical Arsenal</h2>
        <p className="text-gray-300">
          I leverage a blend of theoretical knowledge and practical experience to secure systems and
          validate security strategies. My toolkit includes advanced malware analysis, custom
          defensive solution design, and deep dives into network vulnerabilities.
        </p>
      </section>

      {/* Skills Section with Animated Progress Bars */}
      <section id="skills" className="mb-12">
        <h2 className="text-3xl font-bold mb-4 heading-glow">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Programming Languages */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Python</span>
                <span>95%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="skill-progress"
                  style={{ '--skill-level': '95%' }}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>C</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="skill-progress"
                  style={{ '--skill-level': '85%' }}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>JavaScript</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="skill-progress"
                  style={{ '--skill-level': '80%' }}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Rust</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="skill-progress"
                  style={{ '--skill-level': '75%' }}
                />
              </div>
            </div>
          </div>

          {/* Security & Analysis Tools */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Security &amp; Analysis Tools</h3>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Ghidra</span>
                <span>90%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="skill-progress"
                  style={{ '--skill-level': '90%' }}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>IDA Pro</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="skill-progress"
                  style={{ '--skill-level': '85%' }}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Metasploit</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="skill-progress"
                  style={{ '--skill-level': '80%' }}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Burp Suite</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="skill-progress"
                  style={{ '--skill-level': '75%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Passions Section */}
      <section id="passions" className="mb-12">
        <h2 className="text-3xl font-bold mb-4 heading-glow">Passions</h2>
        <p className="text-gray-300">
          Beyond my technical pursuits, I am deeply passionate about continuous learning, community
          engagement, and sharing knowledge. Whether it’s through blogging, speaking at conferences,
          or mentoring the next generation of security researchers, I strive to make a meaningful
          impact in the world of cybersecurity.
        </p>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="mb-12">
        <h2 className="text-3xl font-bold mb-4 heading-glow">Certifications</h2>
        <ul className="text-gray-300 list-disc list-inside">
          <li>CompTIA Security+</li>
          <li>CompTIA Network+</li>
          <li>AWS Certified Cloud Practitioner</li>
          <li>OSCP (In Progress)</li>
        </ul>
      </section>
    </div>
  );
}
