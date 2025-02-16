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
          build custom defensive solutions, and validate security strategies. My approach blends
          theoretical knowledge with practical application, ensuring that every solution is both
          effective and efficient.
        </p>
      </section>

      {/* Detailed Skills Section */}
      <section id="skills" className="mt-8">
        <h2 className="text-3xl font-bold mb-4 heading-glow">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Programming Languages</h3>
            <ul className="text-gray-300 list-disc list-inside mb-4">
              <li>Python (95%)</li>
              <li>C (85%)</li>
              <li>JavaScript (80%)</li>
              <li>Rust (75%)</li>
              <li>Bash & Shell Scripting</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Security & Analysis Tools</h3>
            <ul className="text-gray-300 list-disc list-inside mb-4">
              <li>Ghidra (90%)</li>
              <li>IDA Pro (85%)</li>
              <li>Metasploit (80%)</li>
              <li>Burp Suite (75%)</li>
              <li>Nessus, Nmap, OpenVAS</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Networking & Protocols</h3>
            <ul className="text-gray-300 list-disc list-inside mb-4">
              <li>TCP/IP, DNS, TLS</li>
              <li>Packet Analysis</li>
              <li>Firewall Configuration</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Cloud & DevOps</h3>
            <ul className="text-gray-300 list-disc list-inside mb-4">
              <li>AWS (EC2, S3, IAM, CloudFormation)</li>
              <li>Docker, Kubernetes</li>
              <li>Terraform, Jenkins</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Passions Section */}
      <section id="passions" className="mt-8">
        <h2 className="text-3xl font-bold mb-4 heading-glow">Passions</h2>
        <p className="text-gray-300">
          I am passionate about exploring new vulnerabilities, crafting innovative security solutions, and continuously learning about emerging cyber threats. When I'm not immersed in research, I enjoy sharing my insights through blogs, workshops, and community engagements.
        </p>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="mt-8">
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
