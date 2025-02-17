import React from 'react';
import { useParams, Link } from 'react-router-dom';

const projectDetails = {
  "packet-prowler": {
    name: "Packet Prowler",
    description: `
Packet Prowler - A Lightweight Network Packet Sniffer

Overview:
Packet Prowler is a lightweight, customizable network packet sniffer written in C using the libpcap library. It captures real-time network packets and extracts key details such as source and destination IP addresses, protocol types, and packet sizes. Designed for hands-on network analysis, it helps researchers identify anomalies and potential threats.

Features:
- Real-Time Packet Sniffing: Captures live traffic on specified interfaces.
- Protocol Filtering: Allows filters for protocols like TCP or UDP.
- Packet Analysis: Dissects packets to display essential details.
- Output Logging: Records packet information for offline review.
- Extensible Design: Easily supports new protocols or additional analysis features.

Usage:
Clone the repository, build using the provided Makefile, and run with options to specify an output file and number of packets to capture.

Future Enhancements:
- IPv6 support, multi-threaded processing, real-time dashboards, and expanded logging formats.

Overall, Packet Prowler offers low-level insight into network traffic, suitable for both research and practical network security applications.
    `,
    link: "https://github.com/chirag-dewan/Packet-Prowler",
  },
  "algorithmic-trading-test-highlow": {
    name: "Algorithmic Trading Test HighLow",
    description: `
Stock Price Prediction Using Candlestick Patterns

Overview:
This Python-based project predicts the High and Low stock prices for the next trading day using historical OHLC data, candlestick pattern recognition, and directionality indicators. It dynamically fetches market data and processes it to generate precise predictions, laying the groundwork for integrating advanced AI models.

Features:
- Dynamic Data Fetching: Automatically retrieves historical stock data via yfinance.
- Candlestick Pattern Recognition: Identifies patterns (e.g., Doji, Hammer, Engulfing) to understand market sentiment.
- Directionality Indicator: Uses rolling averages or similar signals to gauge market trends.
- Model Retraining: Detects feature mismatches and retrains the model to adapt to new data.
- Seamless Predictions: Outputs the predicted High and Low prices for the next trading day.

Technologies Used:
- Python as the core language.
- scikit-learn for training a RandomForestRegressor.
- yfinance for fetching historical OHLC data.
- joblib for model persistence.

How It Works:
1. Fetch Data – Downloads the latest 365 days of stock data.
2. Preprocessing – Cleans data and extracts candlestick patterns and other indicators.
3. Model Training – Uses a RandomForestRegressor to learn from historical trends.
4. Predictions – Compares current prices to historical highs/lows to predict tomorrow’s trading range.

AI Integration & Future Enhancements:
- Incorporate neural networks or LSTM models for more robust predictions.
- Use reinforcement learning to dynamically optimize trading signals.
- Add additional technical indicators (e.g., RSI, MACD, Bollinger Bands) and sentiment analysis.
- Implement advanced risk management strategies, including stop-loss and take-profit mechanisms.
- Deploy a cloud-based parallel processing system for real-time analysis.

Overall, Algorithmic Trading Test HighLow serves as a testbed for developing AI-driven trading strategies. Its modular design makes it an ideal candidate for future expansion, enabling more sophisticated market predictions and automated trading decisions.
    `,
    link: "https://github.com/chirag-dewan/Algorithmic-Trading-Test-HighLow",
  },
  "malware-research-tool": {
    name: "Malware Research Tool",
    description: `
The Malware Research Tool is an interactive environment that dissects and analyzes malware behavior. It parses malicious binaries, visualizes execution flows, and documents reverse engineering techniques to help researchers understand and neutralize modern threats. This hands-on approach is essential for developing effective countermeasures in today's cybersecurity landscape.
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
        <h1 className="text-3xl font-bold">Project Not Found</h1>
        <p className="text-gray-300 mt-4">The project you are looking for does not exist.</p>
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
