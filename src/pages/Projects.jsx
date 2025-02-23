import React from 'react';
import { Link } from 'react-router-dom';

export default function Projects() {
  const personalProjects = [
    {
      id: "packet-prowler",
      name: "Packet Prowler",
      summary: "A C-based network packet sniffer leveraging libpcap for real-time traffic capture and detailed protocol analysis.",
      tags: ["C", "Networking", "Security"]
    },
    {
      id: "algorithmic-trading-test-highlow",
      name: "Algorithmic Trading Test HighLow",
      summary: "A Python-based trading strategy that predicts next-day High/Low values using candlestick patterns and rolling indicators.",
      tags: ["Python", "ML", "Finance"]
    },
    {
      id: "malware-research-tool",
      name: "Malware Analysis Tool",
      summary: "A modular Python framework unifying static, behavioral, memory, and network forensics with machine learning classification.",
      tags: ["Python", "Security", "ML"]
    },
    {
      id: "ids-project",
      name: "ML-Based Intrusion Detection System",
      summary: "An intelligent IDS leveraging machine learning to detect network intrusions with high accuracy using synthetic and real-world datasets.",
      tags: ["Python", "ML", "Security"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-animate bg-clip-text text-transparent">
          Project Portfolio
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A collection of projects showcasing expertise in cybersecurity, machine learning, and network analysis.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {personalProjects.map((proj) => (
          <Link
            to={`/projects/${proj.id}`}
            key={proj.id}
            className="glass rounded-xl p-6 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-3">{proj.name}</h3>
            <p className="text-gray-300 mb-4">{proj.summary}</p>
            <div className="flex gap-2 flex-wrap">
              {proj.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 rounded-full text-sm bg-pink-500/10 text-pink-500 border border-pink-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
