import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SecurityDemo = () => {
  const [activeDemo, setActiveDemo] = useState('vulnerability-scanner');
  const [scanResults, setScanResults] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [networkNodes, setNetworkNodes] = useState([]);

  // Simulated vulnerability scanner
  const vulnerabilities = [
    { id: 1, severity: 'critical', cve: 'CVE-2024-1234', description: 'Buffer overflow in network protocol parser', score: 9.8 },
    { id: 2, severity: 'high', cve: 'CVE-2024-5678', description: 'SQL injection in web application', score: 8.2 },
    { id: 3, severity: 'medium', cve: 'CVE-2024-9012', description: 'Cross-site scripting vulnerability', score: 6.1 },
    { id: 4, severity: 'high', cve: 'CVE-2024-3456', description: 'Privilege escalation in system service', score: 7.8 },
    { id: 5, severity: 'critical', cve: 'CVE-2024-7890', description: 'Remote code execution in SCADA protocol', score: 9.5 }
  ];

  const startVulnerabilityScan = () => {
    setIsScanning(true);
    setScanResults([]);
    
    vulnerabilities.forEach((vuln, index) => {
      setTimeout(() => {
        setScanResults(prev => [...prev, vuln]);
        if (index === vulnerabilities.length - 1) {
          setIsScanning(false);
        }
      }, (index + 1) * 1000);
    });
  };

  // Network visualization
  useEffect(() => {
    const nodes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      type: ['server', 'workstation', 'router', 'firewall'][Math.floor(Math.random() * 4)],
      status: Math.random() > 0.8 ? 'compromised' : 'secure',
      connections: []
    }));

    // Add random connections
    nodes.forEach(node => {
      const connectionCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < connectionCount; i++) {
        const targetId = Math.floor(Math.random() * nodes.length);
        if (targetId !== node.id && !node.connections.includes(targetId)) {
          node.connections.push(targetId);
        }
      }
    });

    setNetworkNodes(nodes);
  }, []);

  const VulnerabilityScanner = () => (
    <div className="h-full bg-gray-900 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-green-400">Vulnerability Scanner</h3>
        <button
          onClick={startVulnerabilityScan}
          disabled={isScanning}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
        >
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {isScanning && (
          <div className="flex items-center space-x-2 text-yellow-400">
            <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Scanning for vulnerabilities...</span>
          </div>
        )}

        {scanResults.map((vuln, index) => (
          <motion.div
            key={vuln.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-lg border-l-4 ${
              vuln.severity === 'critical' ? 'bg-red-900/20 border-red-500' :
              vuln.severity === 'high' ? 'bg-orange-900/20 border-orange-500' :
              'bg-yellow-900/20 border-yellow-500'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    vuln.severity === 'critical' ? 'bg-red-600 text-white' :
                    vuln.severity === 'high' ? 'bg-orange-600 text-white' :
                    'bg-yellow-600 text-black'
                  }`}>
                    {vuln.severity.toUpperCase()}
                  </span>
                  <span className="text-gray-400 text-sm">{vuln.cve}</span>
                </div>
                <p className="text-gray-300 text-sm">{vuln.description}</p>
              </div>
              <span className="text-white font-bold">{vuln.score}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {scanResults.length > 0 && !isScanning && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h4 className="text-green-400 font-semibold mb-2">Scan Summary</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-400">
                {scanResults.filter(v => v.severity === 'critical').length}
              </div>
              <div className="text-xs text-gray-400">Critical</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">
                {scanResults.filter(v => v.severity === 'high').length}
              </div>
              <div className="text-xs text-gray-400">High</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {scanResults.filter(v => v.severity === 'medium').length}
              </div>
              <div className="text-xs text-gray-400">Medium</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const NetworkVisualization = () => (
    <div className="h-full bg-gray-900 rounded-xl p-6">
      <h3 className="text-xl font-bold text-cyan-400 mb-6">Network Topology</h3>
      
      <div className="relative bg-black rounded-lg p-4 h-80 overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Draw connections */}
          {networkNodes.map(node => 
            node.connections.map(connId => {
              const target = networkNodes[connId];
              if (!target) return null;
              return (
                <line
                  key={`${node.id}-${connId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={node.status === 'compromised' || target.status === 'compromised' ? '#ef4444' : '#22c55e'}
                  strokeWidth="1"
                  opacity="0.6"
                />
              );
            })
          )}
          
          {/* Draw nodes */}
          {networkNodes.map(node => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="8"
                fill={node.status === 'compromised' ? '#ef4444' : '#22c55e'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text
                x={node.x}
                y={node.y - 15}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
              >
                {node.type}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">Secure</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-400">Compromised</span>
          </div>
        </div>
        <div className="text-gray-400">
          {networkNodes.filter(n => n.status === 'compromised').length} / {networkNodes.length} compromised
        </div>
      </div>
    </div>
  );

  const ThreatIntelligence = () => (
    <div className="h-full bg-gray-900 rounded-xl p-6">
      <h3 className="text-xl font-bold text-purple-400 mb-6">Threat Intelligence</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">APT29 (Cozy Bear)</span>
            <span className="px-2 py-1 bg-red-600 text-white rounded text-xs">ACTIVE</span>
          </div>
          <p className="text-gray-400 text-sm">Russian state-sponsored group targeting government entities</p>
          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
            <span>Last seen: 2 hours ago</span>
            <span>Techniques: T1566.001, T1059.001</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">Lazarus Group</span>
            <span className="px-2 py-1 bg-orange-600 text-white rounded text-xs">MONITORING</span>
          </div>
          <p className="text-gray-400 text-sm">North Korean cybercriminal group focusing on financial institutions</p>
          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
            <span>Last seen: 1 day ago</span>
            <span>Techniques: T1566.002, T1055</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">BlackCat Ransomware</span>
            <span className="px-2 py-1 bg-yellow-600 text-black rounded text-xs">DETECTED</span>
          </div>
          <p className="text-gray-400 text-sm">Ransomware-as-a-Service operation targeting enterprise networks</p>
          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
            <span>Last seen: 3 days ago</span>
            <span>Techniques: T1486, T1083</span>
          </div>
        </div>
      </div>
    </div>
  );

  const demos = [
    { id: 'vulnerability-scanner', name: 'Vulnerability Scanner', icon: 'search', component: VulnerabilityScanner },
    { id: 'network-viz', name: 'Network Analysis', icon: 'network-wired', component: NetworkVisualization },
    { id: 'threat-intel', name: 'Threat Intelligence', icon: 'shield-alt', component: ThreatIntelligence }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            🔒 CYBERSECURITY RESEARCH LAB 🔒
          </h1>
          <p className="text-xl text-gray-300">
            Interactive demonstrations of security tools and techniques
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Based on real research experience at RTX BBN and current work at GM Financial
          </p>
        </motion.div>

        {/* Demo Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-2xl p-1 border border-gray-700">
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeDemo === demo.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <i className={`fas fa-${demo.icon}`}></i>
                <span>{demo.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Demo Content */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-96"
        >
          {demos.find(demo => demo.id === activeDemo)?.component()}
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>🔍 Real tools inspired by vulnerability research at RTX BBN</p>
          <p>📊 Demonstrations based on actual cybersecurity experience</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityDemo;
