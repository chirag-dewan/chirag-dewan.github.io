import React from 'react';
import { useParams, Link } from 'react-router-dom';

const projectDetails = {
  "packet-prowler": {
    name: "Packet Prowler",
    description: `PacketProwler - A Lightweight Network Packet Sniffer

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

Overall, Packet Prowler provides a hands-on, deep look at raw network traffic for both security and troubleshooting.`,
    link: "https://github.com/chirag-dewan/Packet-Prowler",
    tech: ["C", "libpcap", "Networking", "Linux"],
    features: [
      "Real-Time Packet Capture",
      "Protocol Filtering",
      "Modular Architecture",
      "Custom Output Formats"
    ]
  },

  "algorithmic-trading-test-highlow": {
    name: "Algorithmic Trading Test HighLow",
    description: `Stock Price Prediction with Candlestick Patterns

Overview:
A Python-based tool that predicts tomorrow's stock High and Low values using candlestick patterns, rolling averages, and historical OHLC data. It dynamically fetches market data, preprocesses it, and outputs forecasts—serving as a foundation for AI-driven enhancements.

Key Features:
• Candlestick Recognition: Identifies patterns (Doji, Hammer, Engulfing).
• Dynamic Fetching: Pulls recent OHLC data via yfinance.
• Directionality Indicators: Leverages rolling averages or signals to infer trend momentum.
• Retraining: Automatically adapts to new data if features shift or mismatch.

AI Integration & Future Plans:
• Add neural networks (LSTM/GRU) for time-series forecasting.
• Reinforcement learning for optimized trade entries/exits.
• Expand indicators (RSI, MACD, Bollinger Bands) and sentiment analysis.
• Deploy on a cloud pipeline for large-scale, real-time data.`,
    link: "https://github.com/chirag-dewan/Algorithmic-Trading-Test-HighLow",
    tech: ["Python", "yfinance", "Pandas", "NumPy", "Technical Analysis"],
    features: [
      "Pattern Recognition",
      "Dynamic Data Fetching",
      "Technical Indicators",
      "Automated Retraining"
    ]
  },

  "malware-research-tool": {
    name: "Malware Analysis Tool",
    description: `Malware Analysis Tool - Modular Security Research Framework

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

Infrastructure & Design:
• Docker Compose orchestrates multi-container setup (sandbox, web dashboard, Elasticsearch).
• Code is split into modules for easy extension.
• CI/CD pipelines can be integrated for automated scans.`,
    link: "https://github.com/chirag-dewan/malware-analysis-tool",
    tech: ["Python", "Docker", "YARA", "ML", "Volatility3", "Elasticsearch"],
    features: [
      "Static Analysis",
      "Behavioral Analysis",
      "Memory Forensics",
      "ML Classification"
    ]
  },

  "ids-project": {
    name: "ML-Based Intrusion Detection System",
    description: `Machine Learning-Based Intrusion Detection System (IDS)

Overview:
This project demonstrates a sophisticated Intrusion Detection System using advanced machine learning techniques. It processes network traffic data and employs ensemble learning methods to distinguish between normal and malicious network activities.

Features:
• Data Processing: Handles both synthetic and real-world network traffic datasets
• ML Pipeline: Implements Random Forest and Gradient Boosting classifiers
• Evaluation Metrics: Comprehensive performance analysis with precision, recall, and F1-score
• Real-time Detection: Capable of processing live network streams

Technical Implementation:
• Python-based implementation using scikit-learn and pandas
• Feature engineering for network traffic analysis
• Cross-validation and hyperparameter tuning
• Modular design for easy integration of new ML models

Future Enhancements:
• Deep learning models integration
• Real-time monitoring dashboard
• Threat intelligence feed integration
• Automated response mechanisms`,
    link: "https://github.com/chirag-dewan/IDS-MachineLearningTest",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy", "Network Security"],
    features: [
      "ML-based Detection",
      "Real-time Processing",
      "Performance Analytics",
      "Modular Architecture"
    ]
  }
};

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projectDetails[projectId];

  if (!project) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="glass p-8 rounded-xl">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-300 mb-6">The project you are looking for does not exist.</p>
          <Link to="/projects" className="button-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="glass p-8 rounded-xl mb-8">
        <h1 className="text-4xl font-bold mb-6">{project.name}</h1>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {project.tech.map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-full text-sm bg-pink-500/10 text-pink-500 border border-pink-500/20">
              {tech}
            </span>
          ))}
        </div>

        <div className="prose prose-invert max-w-none mb-8">
          <div className="whitespace-pre-line">{project.description}</div>
        </div>

        <div className="flex gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="button-primary"
            >
              View on GitHub
            </a>
          )}
          <Link to="/projects" className="button-primary bg-gray-800 hover:bg-gray-700">
            Back to Projects
          </Link>
        </div>
      </div>

      <div className="glass p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {project.features.map((feature) => (
            <div key={feature} className="p-4 bg-white/5 rounded-lg border border-white/10">
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
