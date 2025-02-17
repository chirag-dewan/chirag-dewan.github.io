import React from 'react';
import { useParams, Link } from 'react-router-dom';

const projectDetails = {
  "packet-prowler": {
    name: "Packet Prowler",
    description:
      "Packet Prowler intercepts and analyzes network packets in real time, helping identify anomalies and potential threats. By parsing protocol headers and extracting key metrics, it provides valuable insights into traffic flow. This fosters a deeper understanding of network security and can be extended with real-time visualizations or intrusion detection algorithms.",
    link: "https://github.com/chirag-dewan/Packet-Prowler",
  },
  "algorithmic-trading-test-highlow": {
    name: "Algorithmic Trading Test HighLow",
    description:
      "This project simulates an algorithmic trading strategy based on historical highs and lows. By ingesting market data, it identifies potential buy/sell signals whenever price crosses these thresholds. Researchers can expand it with risk management modules, performance analytics, or advanced indicators to reinforce the trading system's reliability.",
    link: "https://github.com/chirag-dewan/Algorithmic-Trading-Test-HighLow",
  },
  "malware-research-tool": {
    name: "Malware Research Tool",
    description:
      "The Malware Research Tool is an interactive environment that dissects malicious binaries, tracing execution paths and highlighting dangerous code segments. It guides researchers through reverse engineering steps, demonstrating how to isolate, neutralize, or replicate malware behaviors for deeper study. This tool underscores the importance of hands-on analysis in modern cybersecurity.",
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
