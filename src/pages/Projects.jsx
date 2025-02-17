import React from 'react';
import { Link } from 'react-router-dom';

export default function Projects() {
  // Work Projects
  const workProjects = [
    {
      name: 'Custom C2 Server',
      description:
        'A custom command-and-control server for firmware analysis and penetration testing. (Work Project – Private)',
    },
  ];

  // Personal Projects
  const personalProjects = [
    {
      id: 'packet-prowler',
      name: 'Packet Prowler',
      summary:
        'A tool for capturing and analyzing network packets in real time.',
      link: 'https://github.com/chirag-dewan/Packet-Prowler',
    },
    {
      id: 'algorithmic-trading-test-highlow',
      name: 'Algorithmic Trading Test HighLow',
      summary:
        'A simulation tool to test high/low trading algorithms with historical market data.',
      link: 'https://github.com/chirag-dewan/Algorithmic-Trading-Test-HighLow',
    },
    {
      id: 'malware-research-tool',
      name: 'Malware Research Tool',
      summary:
        'An interactive environment for analyzing malware behavior and reverse engineering techniques.',
      link: '/projects/malware-research-tool',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 mt-8 fade-in-up">
      <h1 className="text-3xl font-bold mb-4 heading-glow">Projects</h1>
      {/* Work Projects */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 heading-glow">Work Projects</h2>
        {workProjects.length > 0 ? (
          <div className="space-y-4">
            {workProjects.map((proj, idx) => (
              <div key={idx} className="card bg-white/5 p-4 rounded-lg border border-white/10">
                <h3 className="text-xl font-semibold mb-1">{proj.name}</h3>
                <p className="text-gray-300 mb-2 text-sm">{proj.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No work projects available at the moment.</p>
        )}
      </section>

      {/* Personal Projects */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 heading-glow">Personal Projects</h2>
        {personalProjects.length > 0 ? (
          <div className="space-y-4">
            {personalProjects.map((proj) => (
              <div key={proj.id} className="card bg-white/5 p-4 rounded-lg border border-white/10">
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
          <p className="text-gray-400">No personal projects available at the moment.</p>
        )}
      </section>
    </div>
  );
}
