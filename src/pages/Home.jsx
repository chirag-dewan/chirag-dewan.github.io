import React, { useState } from 'react';
import GitHubCalendar from 'react-github-calendar';

export default function Home() {
  // Example data for certifications with statuses
  const certificationsData = [
    {
      title: "CompTIA Security+",
      status: "Completed",
      description:
        "Foundational cybersecurity knowledge, including threats, vulnerabilities, and risk management.",
    },
    {
      title: "CompTIA Network+",
      status: "Completed",
      description:
        "Focuses on networking concepts, infrastructure, operations, and security best practices.",
    },
    {
      title: "AWS Certified Cloud Practitioner",
      status: "Completed",
      description:
        "Broad understanding of AWS cloud fundamentals, security, and compliance.",
    },
    {
      title: "OSCP",
      status: "In Progress",
      description:
        "Advanced offensive security techniques with a hands-on penetration testing exam.",
    },
    {
      title: "CISSP",
      status: "Not Started",
      description:
        "Covers information security architecture, engineering, and management, emphasizing best practices and risk management.",
    },
  ];

  // Example data for future goals
  const futureGoals = [
    {
      title: "GIAC Reverse Engineering Malware (GREM)",
      description: "Deep dive into reverse-engineering advanced malware, including obfuscation techniques and analysis of complex binaries.",
    },
    {
      title: "Published Research Papers",
      description: "Plan to publish academic-style papers on novel exploit techniques and advanced defense mechanisms.",
    },
    {
      title: "CTF Competition Leadership",
      description: "Aim to lead or organize CTF events that challenge participants with real-world exploit scenarios.",
    },
  ];

  // State to track which certification is expanded
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 mt-8 fade-in-up">
      {/* 1) Inspirational Quote at the Top */}
      <section className="mb-12">
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 text-xl">
          "In a world of digital threats at every corner, curiosity and creativity are the keys to staying secure."
        </blockquote>
      </section>

      {/* 2) About Me Section */}
      <section id="about" className="mb-12">
        <h1 className="text-3xl font-bold mb-2 heading-glow">About Me</h1>
        <p className="text-gray-300 mb-4">
          I’m Chirag Dewan, a Cyber Research Scientist with a passion for vulnerability research,
          reverse engineering, and cybersecurity. I thrive on uncovering hidden threats and building
          robust defenses. My mindset revolves around curiosity, creativity, and an unwavering drive
          to explore the unknown.
        </p>
        <p className="text-gray-300 mb-4">
          I’m eager to tackle complex security challenges, collaborate with innovative teams, and
          continue pushing the boundaries of what's possible in cybersecurity. Above all, I believe
          in staying bold, staying curious, and never settling for “good enough.”
        </p>
      </section>

      {/* 3) Skills Section (Animated Skill Bars) */}
      <section id="skills" className="mb-12">
        <h2 className="text-3xl font-bold mb-4 heading-glow">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Programming Languages */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
            <SkillBar name="Python" level="95%" />
            <SkillBar name="C" level="85%" />
            <SkillBar name="JavaScript" level="80%" />
            <SkillBar name="Rust" level="75%" />
          </div>

          {/* Security & Analysis Tools */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Security &amp; Analysis Tools</h3>
            <SkillBar name="Ghidra" level="90%" />
            <SkillBar name="IDA Pro" level="85%" />
            <SkillBar name="Metasploit" level="80%" />
            <SkillBar name="Burp Suite" level="75%" />
          </div>
        </div>
      </section>

      {/* 4) Passions Section */}
      <section id="passions" className="mb-12">
        <h2 className="text-3xl font-bold mb-4 heading-glow">Passions</h2>
        <p className="text-gray-300">
          Collaboration, creative problem-solving, and relentless curiosity fuel my work. Whether
          it's dissecting new exploit techniques or developing advanced defensive strategies,
          I'm always seeking projects that challenge me to learn, innovate, and grow.
        </p>
      </section>

      {/* 5) Certifications as Cards */}
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

      {/* 6) Future Goals Section */}
      <section id="future-goals" className="mb-12">
        <h2 className="text-3xl font-bold mb-4 heading-glow">Future Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {futureGoals.map((goal, idx) => (
            <div
              key={idx}
              className="card bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
              <p className="text-sm text-gray-300">{goal.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7) GitHub Contributions with Lighter Green Theme */}
      <section id="github-contributions" className="mb-12">
        <h2 className="text-3xl font-bold mb-4 heading-glow">GitHub Contributions</h2>
        <div className="overflow-x-auto">
          <GitHubCalendar
            username="chirag-dewan"
            blockSize={16}
            blockMargin={4}
            colorScheme="dark"
            theme={{
              background: "transparent",
              text: "#ffffff",
              grade4: "#7ee08a", // Lighter green for highest activity
              grade3: "#51cc5f",
              grade2: "#3fa14a",
              grade1: "#2d7a3b",
              grade0: "#1b5a2d"
            }}
          />
        </div>
      </section>
    </div>
  );
}

/* Sub-component for a single skill bar */
function SkillBar({ name, level }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span>{level}</span>
      </div>
      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
        <div
          className="skill-progress"
          style={{ "--skill-level": level }}
        />
      </div>
    </div>
  );
}

/* Sub-component for Interactive Certification Cards */
function CertificationCard({ cert, index, expandedIndex, toggleExpand }) {
  const isExpanded = expandedIndex === index;

  // color-coding based on status
  const statusColor = getStatusColor(cert.status);

  return (
    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => toggleExpand(index)}
          className="text-left font-semibold text-white w-full flex items-center justify-between"
        >
          <span>{cert.title}</span>
          <span className="text-gray-400">{isExpanded ? "—" : "+"}</span>
        </button>
      </div>
      {/* Status badge */}
      <span
        className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${statusColor}`}
      >
        {cert.status}
      </span>
      {isExpanded && (
        <p className="mt-2 text-sm text-gray-300">{cert.description}</p>
      )}
    </div>
  );
}

/* Helper function to color-code certifications */
function getStatusColor(status) {
  switch (status) {
    case "Completed":
      return "bg-green-600/20 text-green-400 border-green-400/20";
    case "In Progress":
      return "bg-yellow-600/20 text-yellow-400 border-yellow-400/20";
    case "Not Started":
      return "bg-red-600/20 text-red-400 border-red-400/20";
    default:
      return "bg-white/10 text-white border-white/20";
  }
}
