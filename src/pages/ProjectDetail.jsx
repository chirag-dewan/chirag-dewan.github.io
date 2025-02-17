import React from 'react';
import { useParams, Link } from 'react-router-dom';

const projectDetails = {
  "packet-prowler": {
    name: "Packet Prowler",
    description:
      "Packet Prowler is designed to capture and analyze network packets in real time. The code typically leverages packet-sniffing libraries to intercept network traffic, parse protocol headers, and extract key metrics. Researchers use this tool to identify anomalies and potential security threats in network data. Reinforcement could include real-time visualizations and anomaly detection algorithms.",
    link: "https://github.com/chirag-dewan/Packet-Prowler",
  },
  "algorithmic-trading-test-highlow": {
    name: "Algorithmic Trading Test HighLow",
    description:
      "This project simulates an algorithmic trading strategy based on high/low price triggers. It ingests historical market data and calculates indicators such as the highest high and lowest low over a specified period. Researchers evaluate performance by analyzing signals in a backtested environment, reinforcing risk management parameters and performance analytics.",
    link: "https://github.com/chirag-dewan/Algorithmic-Trading-Test-HighLow",
  },
  "malware-research-tool": {
    name: "Malware Research Tool",
    description:
      "The Malware Research Tool provides an interactive environment to break down malware behavior. It guides researchers through step-by-step analyses, visualizes execution flows, and documents reverse engineering techniques. The code is modular—parsing binary data, identifying malicious patterns, and simulating behavior. It reinforces the need for hands-on malware analysis in modern cybersecurity research.",
    link: null,
  },
};

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projectDetails[projectId];

  if (!project) {
    return (
      <div className="max-w-5xl mx-auto px-6 mt-8 fade-in-up">
        <h1 className="text-3xl font-bold heading-glow">Project Not Found</h1>
        <p className="text-gray-300 mt-4">The project you are looking for does not exist.</p>
        <Link to="/projects" className="text-blue-400 hover:underline mt-4 inline-block">
          &larr; Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 mt-8 fade-in-up">
      <h1 className="text-3xl font-bold mb-4 heading-glow">{project.name}</h1>
      <p className="text-gray-300 mb-6 text-sm">{project.description}</p>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:underline text-sm"
        >
          {projectId === "malware-research-tool" ? "Explore Interactive Tool" : "View on GitHub"}
        </a>
      )}
      <div className="mt-6">
        <Link to="/projects" className="text-blue-400 hover:underline text-sm">
          &larr; Back to Projects
        </Link>
      </div>
    </div>
  );
}
