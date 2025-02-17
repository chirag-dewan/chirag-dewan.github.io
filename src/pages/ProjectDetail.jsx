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
Algorithmic Trading Test HighLow is a Python-based simulation tool that tests a trading strategy driven by historical high and low prices. It ingests historical market data and calculates key indicators to generate trade signals, with an eye toward expanding into AI-driven strategies.

• **Data Ingestion:**  
  Reads and parses historical market data (time, price, volume) from input files or APIs. The data is used to compute essential trading indicators.

• **Sliding Window Calculation:**  
  Maintains a moving window over recent data to efficiently compute the highest high and lowest low over a specified period. This helps the algorithm adapt to changing market conditions.

• **Signal Generation:**  
  Compares the current price against these computed thresholds. When the price breaks out of the historical range, it triggers a buy or sell signal, capturing potential breakout opportunities.

• **AI Integration:**  
  Although currently a straightforward strategy, the project can be extended to incorporate machine learning or AI-based models. For example:
  - **Predictive Models:** Use neural networks or ensemble methods to forecast short-term price movements based on historical data and other indicators.
  - **Reinforcement Learning:** Train an RL agent to optimize entry and exit points by interacting with the simulated market environment.

• **Proposed Extensions & Benefits:**
  1. **Risk Management:**  
     Implement stop-loss and take-profit orders to protect against large drawdowns and lock in gains.
  2. **Feature Engineering:**  
     Incorporate additional features (e.g., RSI, MACD, or sentiment data) to enrich the algorithm’s understanding of market conditions.
  3. **Performance Analysis & Visualization:**  
     Generate performance metrics (Sharpe ratio, drawdown, win/loss rate) and produce real-time or post-run charts for better insight into strategy efficacy.
  4. **Parallelization or Cloud Deployment:**  
     Scale the simulation across multiple cores or servers to handle larger datasets and run hyperparameter tuning for AI models.

Overall, this project serves as a foundational testbed for exploring algorithmic trading strategies in Python. Its modular design makes it a prime candidate for integrating AI models, advanced risk controls, and robust performance analytics.
    `,
    link: "https://github.com/chirag-dewan/Algorithmic-Trading-Test-HighLow",
  },

  "malware-research-tool": {
    name: "Malware Research Tool",
    description: `
The Malware Research Tool is an interactive environment designed to dissect and analyze malware behavior. It breaks down malicious binaries into their constituent parts, visualizes execution flows, and documents reverse engineering techniques. This tool is designed to help researchers understand and neutralize modern threats through hands-on analysis.
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
