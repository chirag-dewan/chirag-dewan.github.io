import React from 'react';
import { useParams, Link } from 'react-router-dom';

const projectDetails = {
  "packet-prowler": {
    name: "Packet Prowler",
    description: `
Packet Prowler is a low-level network packet capture and analysis tool written in C. It is designed to operate directly at the OS level, capturing raw packets from a specified network interface (often using libraries like libpcap). Its main objectives include:

• **Packet Capture:**  
  Captures network traffic in real time, often operating in promiscuous mode to intercept all packets.

• **Packet Parsing:**  
  Dissects each packet into protocol layers (Ethernet, IP, TCP/UDP, etc.), extracting key metadata such as source/destination addresses, port numbers, and timestamps.

• **Filtering & Logging:**  
  Implements filtering options (e.g., BPF filters) to narrow down traffic to relevant packets and logs data for offline analysis.

• **Real-Time Analysis:**  
  Provides immediate insights into network traffic to identify anomalies or potential security threats.

Challenges and Enhancements:
• Written in C, it offers high performance but requires careful memory management and error handling.
• Future improvements could include real-time visualizations, integrated anomaly detection algorithms, and extended protocol support.

Overall, Packet Prowler provides researchers with a hands-on tool to analyze network traffic and uncover potential vulnerabilities.
    `,
    link: "https://github.com/chirag-dewan/Packet-Prowler",
  },
  "algorithmic-trading-test-highlow": {
    name: "Algorithmic Trading Test HighLow",
    description: `
Algorithmic Trading Test HighLow is a simulation tool implemented in C that tests a trading strategy based on historical high and low prices. Its core focus is on processing historical market data to generate trade signals, and it is structured as follows:

• **Data Ingestion:**  
  Reads and parses historical market data (time, price, volume) from input files. The data is used to compute essential trading indicators.

• **Sliding Window Calculation:**  
  Maintains a moving window over recent data to efficiently compute the highest high and lowest low over a specified period.

• **Signal Generation:**  
  Compares the current price against these computed thresholds. When the price breaks out of the historical range, it triggers a buy or sell signal, capturing potential breakout opportunities.

• **Implementation in C:**  
  The use of C aims to maximize performance with minimal latency. However, it introduces challenges such as meticulous memory management, handling floating-point precision, and robust error handling in volatile market conditions.

Potential Enhancements:
• Integrate risk management features like stop-loss and take-profit levels.
• Refactor the code for better modularity and maintainability.
• Use performance profiling to further optimize for large datasets.
• Consider interfacing with higher-level tools for real-time visualization and analytics.

This project serves as a foundational testbed for exploring algorithmic trading strategies and can be expanded with advanced risk management and performance analytics.
    `,
    link: "https://github.com/chirag-dewan/Algorithmic-Trading-Test-HighLow",
  },
  "malware-research-tool": {
    name: "Malware Research Tool",
    description: `
The Malware Research Tool is an interactive environment designed to dissect and analyze malware behavior. Its modular design allows researchers to:

• **Break Down Malicious Binaries:**  
  Parse and dissect executable code to isolate and examine malicious patterns.

• **Visualize Execution Flows:**  
  Map out the control flow of malware to understand how it executes and propagates.

• **Document Reverse Engineering Techniques:**  
  Provide detailed steps and best practices for isolating, neutralizing, or replicating malware behavior.

This tool reinforces the importance of hands-on analysis in modern cybersecurity research and offers a platform for both education and advanced threat analysis.
    `,
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
        <p className="text-gray-300 mt-4">
          The project you are looking for does not exist.
        </p>
        <Link to="/projects" className="text-blue-400 hover:underline mt-4 inline-block">
          &larr; Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 mt-8 fade-in-up">
      <h1 className="text-3xl font-bold mb-4 heading-glow">{project.name}</h1>
      <p className="text-gray-300 mb-6 text-sm whitespace-pre-line">
        {project.description}
      </p>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:underline text-sm"
        >
          View on GitHub
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
