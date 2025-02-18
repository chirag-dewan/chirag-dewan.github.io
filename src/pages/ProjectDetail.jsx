import React from 'react';
import { useParams, Link } from 'react-router-dom';

const projectDetails = {
  "packet-prowler": {
    name: "Packet Prowler",
    description: `
PacketProwler - A Lightweight Network Packet Sniffer

Overview:
Packet Prowler is a C-based network packet sniffer leveraging libpcap for real-time packet capture. Its design focuses on low-level access to raw traffic, making it ideal for in-depth network analysis, threat detection, and protocol research.

Key Features:
• Real-Time Capture: Sniffs traffic on specified interfaces (e.g., eth0).
• Protocol Filtering: Narrow down to TCP/UDP or custom filters.
• Extensible Design: main.c, packet_sniffer.c, and utils.c modular structure for easy addition of new protocols/analyses.
• Output Logging: Logs data to a specified file for offline review.

Usage:
Build with the provided Makefile (make), then run:
  sudo ./PacketProwler -o output.txt -n 100
to capture up to 100 packets and store them in output.txt.

Future Enhancements:
• Support for IPv6 and advanced BPF filters.
• Real-time dash or multi-threading for high-throughput environments.
• JSON or CSV output for SIEM integration.

Overall, Packet Prowler provides a hands-on, deep look at raw network traffic for both security and troubleshooting.
    `,
    link: "https://github.com/chirag-dewan/Packet-Prowler",
  },

  "algorithmic-trading-test-highlow": {
    name: "Algorithmic Trading Test HighLow",
    description: `
Stock Price Prediction with Candlestick Patterns

Overview:
A Python-based tool that predicts tomorrow’s stock High and Low values using candlestick patterns, rolling averages, and historical OHLC data. It dynamically fetches market data, preprocesses it, and outputs forecasts—serving as a foundation for AI-driven enhancements.

Key Features:
• Candlestick Recognition: Identifies patterns (Doji, Hammer, Engulfing).
• Dynamic Fetching: Pulls recent OHLC data via yfinance.
• Directionality Indicators: Leverages rolling averages or signals to infer trend momentum.
• Retraining: Automatically adapts to new data if features shift or mismatch.

AI Integration & Future Plans:
• Add neural networks (LSTM/GRU) for time-series forecasting.
• Reinforcement learning for optimized trade entries/exits.
• Expand indicators (RSI, MACD, Bollinger Bands) and sentiment analysis.
• Deploy on a cloud pipeline for large-scale, real-time data.

This project is a testbed for algorithmic trading strategies, flexible enough to evolve into an advanced ML-based predictive system.
    `,
    link: "https://github.com/chirag-dewan/Algorithmic-Trading-Test-HighLow",
  },

  "malware-research-tool": {
    name: "Malware Analysis Tool",
    description: `
Malware Analysis Tool - Modular Security Research Framework

Overview:
A Python-driven framework that merges static, behavioral, memory, and network analysis with machine learning classification. Containerized (Docker) for safe execution, it offers a full-stack approach to modern malware forensics.

Highlights of Technical Prowess:
• Static Analysis:
  - Integrates YARA for signature detection and PE parsing to identify malicious file structures.
  - Extracts AST-level code features (for Python-based samples) to detect suspicious imports and function calls.

• Behavioral Analysis:
  - Executes samples within isolated Docker containers, tracking system calls (strace/psutil) for real-time process, file, and registry events.
  - Multi-threaded monitoring ensures minimal overhead and detailed logs of runtime behavior.

• Memory & Network Forensics:
  - Utilizes Volatility3 to inspect memory dumps, detect code injection, and pinpoint hidden processes.
  - Captures network traffic with scapy/dpkt, flags suspicious IPs or domains, and correlates them with known threat intel.

• Machine Learning Classification:
  - Extracts code features, function calls, string patterns, and more.
  - Employs Random Forest, neural networks, or ensemble methods to classify unknown malware families.

• Reporting & Visualization:
  - Generates consolidated HTML/PDF/JSON reports with charts, process trees, and memory analysis visuals.
  - Offers a Flask-based web dashboard for sample uploads, historical browsing, and Elasticsearch indexing/search.

Infrastructure & Design:
• Docker Compose orchestrates multi-container setup (sandbox, web dashboard, Elasticsearch).
• Code is split into modules: static_analyzer.py, behavior_analyzer.py, memory_analyzer.py, etc., fostering easy extension.
• CI/CD pipelines can be integrated for automated scans, improving DevSecOps synergy.

This framework showcases advanced security research capabilities—combining static checks, runtime forensics, memory inspection, network analysis, and ML classification to form a comprehensive malware lab environment.
    `,
    link: "https://github.com/chirag-dewan/malware-analysis-tool", 
  },
};

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projectDetails[projectId];

  if (!project) {
    return (
      <div className="max-w-5xl mx-auto px-6 mt-8 fade-in-up">
        <h1 className="text-3xl font-bold">Project Not Found</h1>
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
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
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
