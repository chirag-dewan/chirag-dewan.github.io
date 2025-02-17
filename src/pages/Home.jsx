import React, { useState } from 'react';
import GitHubCalendar from 'react-github-calendar';

export default function Home() {
  // Interactive Certifications data
  const certificationsData = [
    {
      title: "CompTIA Security+",
      description: "Foundational cybersecurity knowledge, including threats, vulnerabilities, and risk management.",
    },
    {
      title: "CompTIA Network+",
      description: "Focuses on networking concepts, infrastructure, operations, and security best practices.",
    },
    {
      title: "AWS Certified Cloud Practitioner",
      description: "Broad understanding of AWS cloud fundamentals, security, and compliance.",
    },
    {
      title: "OSCP (In Progress)",
      description: "Advanced offensive security techniques with a hands-on penetration testing exam.",
    },
  ];

  // State to track which certification is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 mt-8 fade-in-up">
      {/* Inspirational Quote on Top */}
      <section className="mb-12">
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 text-xl">
          "In a world of digital threats at every corner, curiosity and creativity are the keys to staying secure."
        </blockquote>
      </section>

      {/* About Me Section */}
      <section id="about" className="mb-12">
        <h1 className="text-3xl font-bold mb-2 heading-glow">About Me</h1>
        <p className="text-gray-300 mb-4">
          I’m Chirag Dewan, a Cyber Research Scientist driven by curiosity and a relentless desire to innovate.
          I thrive on uncovering hidden vulnerabilities, crafting ingenious defenses, and pushing the boundaries
          of what's possible in cybersecurity.
        </p>
        <p className="text-gray-300 mb-4">
          My mindset is simple: stay curious, stay bold, and never settle. I'm always exploring new angles,
          testing new theories, and collaborating with others who share my passion for building a safer
          digital world.
        </p>
      </section>

      {/* Technical Arsenal Section */}
      <section id="technical-arsenal" className="mb-12">
        <h2 className="text-3xl font-bold mb-2 heading-glow">Technical Arsenal</h2>
        <p className="text-gray-300">
          From firmware reverse engineering to custom C2 development, my toolkit spans the full range of
          offensive and defensive capabilities. I believe in hands-on experimentation, rigorous testing,
          and constant learning.
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
                  style={{ "--skill-level": "95%" }}
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
                  style={{ "--skill-level": "85%" }}
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
                  style={{ "--skill-level": "80%" }}
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
                  style={{ "--skill-level": "90%" }}
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
                  style={{ "--skill-level": "85%" }}
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
                  style={{ "--skill-level": "80%" }}
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
          Collaboration, creative problem-solving, and relentless curiosity. I'm excited by emerging
          threats, new exploit techniques, and the evolving landscape of cybersecurity. I want to
          work on projects that challenge me to push the boundaries of what’s possible.
        </p>
      </section>

      {/* Interactive Certifications Section */}
      <section id="certifications" className="mb-12">
        <h2 className="text-3xl font-bold mb-4 heading-glow">Certifications</h2>
        <div className="space-y-2">
          {certificationsData.map((cert, index) => (
            <CertificationCard
              key={index}
              cert={cert}
              index={index}
              expandedIndex={expandedIndex}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      </section>

      {/* GitHub Contributions */}
      <section id="github-contributions" className="mb-12">
        <h2 className="text-3xl font-bold mb-4 heading-glow">My GitHub Contributions</h2>
        <div className="overflow-x-auto">
          <GitHubCalendar
            username="chirag-dewan"
            blockSize={16}
            blockMargin={4}
            colorScheme="dark"
            theme={{
              background: "transparent",
              text: "#ffffff",
            }}
          />
        </div>
      </section>
    </div>
  );
}

/* Sub-component for Interactive Certifications */
function CertificationCard({ cert, index, expandedIndex, toggleExpand }) {
  const isExpanded = expandedIndex === index;
  return (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
      <button
        onClick={() => toggleExpand(index)}
        className="w-full text-left flex items-center justify-between"
      >
        <span className="font-semibold text-white">{cert.title}</span>
        <span className="text-gray-400">
          {isExpanded ? "—" : "+"}
        </span>
      </button>
      {isExpanded && (
        <p className="mt-2 text-sm text-gray-300">
          {cert.description}
        </p>
      )}
    </div>
  );
}
