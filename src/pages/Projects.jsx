import React from 'react';
import { Link } from 'react-router-dom';

export default function Projects() {
  // Personal Projects
  const personalProjects = [
    {
      id: "packet-prowler",
      name: "Packet Prowler",
      summary:
        "A C-based network packet sniffer leveraging libpcap for real-time traffic capture and detailed protocol analysis.",
    },
    {
      id: "algorithmic-trading-test-highlow",
      name: "Algorithmic Trading Test HighLow",
      summary:
        "A Python-based trading strategy that predicts next-day High/Low values using candlestick patterns and rolling indicators.",
    },
    {
      id: "malware-research-tool",
      name: "Malware Analysis Tool",
      summary:
        "A modular Python framework unifying static, behavioral, memory, and network forensics with machine learning classification.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 mt-8 fade-in-up">
      <h1 className="text-3xl font-bold mb-4 heading-glow">Projects</h1>
      <p className="text-gray-300 mb-6 text-sm">
        Below are some personal projects focusing on networking, cybersecurity, and AI-driven solutions. Click “View Details” to learn more about each one.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 heading-glow">Personal Projects</h2>
        {personalProjects.length > 0 ? (
          <div className="space-y-4">
            {personalProjects.map((proj) => (
              <div
                key={proj.id}
                className="card bg-white/5 p-4 rounded-lg border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-1">{proj.name}</h3>
                <p className="text-gray-300 mb-2 text-sm">{proj.summary}</p>
                <Link
                  to={`/projects/${proj.id}`}
                  className="text-blue-400 hover:underline text-sm"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No personal projects found.</p>
        )}
      </section>
    </div>
  );
}
