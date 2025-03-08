{/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.6 }}
          className="mt-12 text-center"
        >
          <motion.a 
            href="https://github.com/chirag-dewan" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-apple-blue-500 to-blue-600 text-white font-medium rounded-full hover:shadow-lg hover:from-apple-blue-600 hover:to-blue-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fab fa-github mr-3 text-xl"></i>
            <span className="text-lg">View My GitHub Profile</span>
          </motion.a>
        </motion.div>import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import GitHubCalendar from 'react-github-calendar';

const GitHubContributions = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Custom theme for the GitHub calendar
  const calendarTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <section id="github" className="py-20 bg-apple-gray-900 text-white">
      <div className="container-apple">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          ref={ref}
          className="text-center mb-12"
        >
          <h2 className="heading-md text-white">GitHub Contributions</h2>
          <p className="mt-4 text-lg text-apple-gray-300 max-w-3xl mx-auto">
            A visualization of my code contributions and open-source development
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card bg-apple-gray-800 shadow-2xl p-6 mb-12 rounded-apple-lg overflow-hidden"
        >
          <GitHubCalendar
            username="chirag-dewan"
            colorScheme="dark"
            theme={calendarTheme}
            fontSize={16}
            blockSize={12}
            blockMargin={5}
            blockRadius={2}
            hideColorLegend={false}
          />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Repositories", value: "15+", icon: "code-branch" },
            { label: "Contributions", value: "650+", icon: "code-commit" },
            { label: "Pull Requests", value: "45+", icon: "code-pull-request" },
            { label: "Stars Received", value: "120+", icon: "star" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              className="card bg-apple-gray-800 p-6 flex flex-col items-center text-center rounded-apple-lg"
            >
              <div className="w-12 h-12 rounded-full bg-apple-blue-500/20 flex items-center justify-center mb-4">
                <i className={`fab fa-${stat.icon} text-apple-blue-500`}></i>
              </div>
              <motion.span 
                initial={{ scale: 0.8 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 300, delay: 0.5 + (index * 0.1) }}
                className="text-3xl font-display font-bold text-white mb-2"
              >
                {stat.value}
              </motion.span>
              <span className="text-apple-gray-300">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Featured repositories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-display font-bold text-white mb-8 text-center">Featured Projects</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Packet Prowler",
                description: "A C-based network packet sniffer leveraging libpcap for real-time traffic capture and detailed protocol analysis.",
                language: "C",
                details: "Features multiple interfaces, BPF filtering, and custom output formats for integration with other security tools.",
                stars: 32,
                forks: 14,
                icon: "network-wired"
              },
              {
                name: "Malware Analysis Framework",
                description: "A comprehensive Python-based malware analysis framework utilizing modular architecture for multi-faceted threat detection.",
                language: "Python",
                details: "Integrates static analysis with YARA rules, dynamic behavioral monitoring, memory forensics, and network traffic analysis.",
                stars: 45,
                forks: 12,
                icon: "virus"
              },
              {
                name: "Machine Learning IDS",
                description: "ML-based Intrusion Detection System for identifying network security threats using advanced classification algorithms.",
                language: "Python",
                details: "Features comprehensive feature engineering, Random Forest classification, and visualization capabilities for enhanced threat detection.",
                stars: 38,
                forks: 9,
                icon: "brain"
              }
            ].map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + (index * 0.15) }}
                className="card bg-apple-gray-800 p-6 rounded-apple-lg border border-apple-gray-700 h-full flex flex-col"
                whileHover={{ 
                  y: -5, 
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                  borderColor: '#4071e3'
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-apple-blue-500/20 flex items-center justify-center mr-3">
                      <i className={`fas fa-${repo.icon} text-apple-blue-500`}></i>
                    </div>
                    <h4 className="text-xl font-medium text-white">{repo.name}</h4>
                  </div>
                  <motion.div 
                    className="text-apple-blue-500 text-xl"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                  >
                    <i className="fab fa-github"></i>
                  </motion.div>
                </div>
                
                <p className="text-apple-gray-300 text-sm mb-3">{repo.description}</p>
                <p className="text-apple-gray-400 text-xs mb-auto">{repo.details}</p>
                
                <div className="mt-6 pt-4 border-t border-apple-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="flex items-center"
                      >
                        <span className={`w-3 h-3 rounded-full ${repo.language === 'C' ? 'bg-blue-400' : 'bg-yellow-500'} mr-2`}></span>
                        <span className="text-apple-gray-300 text-sm">{repo.language}</span>
                      </motion.div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="flex items-center text-apple-gray-300 text-sm"
                      >
                        <i className="fas fa-star mr-1 text-xs"></i>
                        <span>{repo.stars}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ y: -2 }}
                        className="flex items-center text-apple-gray-300 text-sm"
                      >
                        <i className="fas fa-code-branch mr-1 text-xs"></i>
                        <span>{repo.forks}</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Code Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 rounded-apple-xl overflow-hidden bg-apple-gray-800 border border-apple-gray-700"
        >
          <div className="p-6 border-b border-apple-gray-700">
            <h3 className="text-xl font-bold text-white">Code Showcase</h3>
            <p className="text-apple-gray-300 text-sm mt-2">A sample of my technical work in C, Python, and security tooling</p>
          </div>
          
          <div className="grid md:grid-cols-3">
            {/* Code Sample 1 - C */}
            <motion.div
              className="p-6 border-r border-apple-gray-700 font-mono text-sm overflow-auto h-60"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="text-apple-gray-400 mb-2">// Packet Prowler - Packet Capture</div>
              <pre className="text-apple-blue-500">
{`void capture_packets(pcap_t *handle) {
    struct pcap_pkthdr header;
    const u_char *packet;
    
    while ((packet = pcap_next(handle, &header))) {
        printf("Packet captured: %d bytes\\n", 
               header.len);
        
        // Timestamp
        printf("Timestamp: %s", 
               ctime((const time_t *)&header.ts.tv_sec));
        
        // Parse the packet
        parse_ethernet(packet, header.len);
    }
}`}
              </pre>
            </motion.div>
            
            {/* Code Sample 2 - Python */}
            <motion.div
              className="p-6 border-r border-apple-gray-700 font-mono text-sm overflow-auto h-60"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="text-apple-gray-400 mb-2"># ML-IDS Classification</div>
              <pre className="text-green-400">
{`def train_model(X_train, y_train):
    """Train Random Forest classifier with optimized hyperparameters"""
    # Parameter grid for optimization
    param_grid = {
        'n_estimators': [100, 200, 300],
        'max_depth': [None, 10, 20, 30],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4]
    }
    
    # Initialize model
    rf = RandomForestClassifier(random_state=42)
    
    # Grid search with cross-validation
    grid_search = GridSearchCV(
        rf, param_grid, cv=5, 
        scoring='f1_weighted', n_jobs=-1
    )
    
    # Fit the model
    grid_search.fit(X_train, y_train)
    
    return grid_search.best_estimator_`}
              </pre>
            </motion.div>
            
            {/* Code Sample 3 - YARA Rule */}
            <motion.div
              className="p-6 font-mono text-sm overflow-auto h-60"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="text-apple-gray-400 mb-2">// Malware Analysis YARA Rule</div>
              <pre className="text-purple-400">
{`rule APT_Backdoor_Generic {
    meta:
        description = "Detects generic APT backdoor characteristics"
        author = "Chirag Dewan"
        severity = "HIGH"
        
    strings:
        $obf_string = { 68 ?? ?? ?? ?? E8 ?? ?? ?? ?? 83 C4 04 }
        $sus_api1 = "CreateRemoteThread" ascii wide
        $sus_api2 = "WriteProcessMemory" ascii wide
        $sus_api3 = "LoadLibraryA" ascii wide
        $sus_reg = "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run" ascii wide
        
    condition:
        uint16(0) == 0x5A4D and
        filesize < 1MB and
        (
            $obf_string or
            (2 of ($sus_api*) and $sus_reg)
        )
}`}
              </pre>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Technologies Used */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-12 bg-apple-gray-800 rounded-apple-xl p-8 border border-apple-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">Technologies & Tools</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { category: "Languages", items: ["Python", "C/C++", "Rust", "PowerShell/Bash"] },
              { category: "Security Tools", items: ["Ghidra", "IDA Pro", "Wireshark", "YARA"] },
              { category: "Analysis", items: ["ML/Scikit-learn", "Pandas", "AFL++", "libFuzzer"] },
              { category: "Infrastructure", items: ["Docker", "AWS", "CI/CD", "Linux"] }
            ].map((tech, index) => (
              <motion.div 
                key={tech.category}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.4 + (index * 0.1) }}
                className="bg-apple-gray-700 rounded-apple-lg p-5"
              >
                <h4 className="text-apple-blue-500 font-medium border-b border-apple-gray-600 pb-2 mb-3">{tech.category}</h4>
                <ul className="space-y-2">
                  {tech.items.map((item, i) => (
                    <motion.li 
                      key={item}
                      initial={{ x: -10, opacity: 0 }}
                      animate={inView ? { x: 0, opacity: 1 } : {}}
                      transition={{ duration: 0.3, delay: 1.5 + (index * 0.1) + (i * 0.05) }}
                      className="flex items-center text-apple-gray-300"
                    >
                      <i className="fas fa-caret-right text-apple-blue-500 mr-2 text-xs"></i>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubContributions;
