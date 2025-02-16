import React from 'react';
import { useParams, Link } from 'react-router-dom';

const projectDetails = {
  "packet-prowler": {
    name: "Packet Prowler",
    description:
      "Packet Prowler is an interactive tool for capturing and analyzing network packets. It provides real-time data visualizations and in-depth insights into live network traffic. Explore the data and learn how packets flow through the network.",
    link: "https://github.com/chirag-dewan/Packet-Prowler",
  },
  "algorithmic-trading-test-highlow": {
    name: "Algorithmic Trading Test HighLow",
    description:
      "This project tests high/low trading strategies using simulated market data. The tool allows you to adjust parameters and visualize algorithm performance over time. Dive into the analytics to understand the trading signals.",
    link: "https://github.com/chirag-dewan/Algorithmic-Trading-Test-HighLow",
  },
  "malware-research-tool": {
    name: "Malware Research Tool",
    description:
      "The Malware Research Tool is an interactive environment designed to break down malware behavior. It provides step-by-step analyses, visualizations of malware execution flows, and detailed documentation on reverse engineering techniques. Explore the tool to learn about modern malware analysis methods.",
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
