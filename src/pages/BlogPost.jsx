import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BlogPost() {
  const { postId } = useParams();
  
  const blogPosts = {
    'reverse-engineering-basics': {
      title: 'Getting Started with Reverse Engineering: A Beginner\'s Guide',
      date: 'February 15, 2024',
      author: 'Chirag Dewan',
      readTime: '8 min read',
      tags: ['Reverse Engineering', 'Cybersecurity', 'Beginner'],
      content: `
# Getting Started with Reverse Engineering: A Beginner's Guide

Reverse engineering is the process of analyzing a system, device, or piece of software to understand its inner workings, design, and implementation. In the cybersecurity context, it's often used to understand how software functions, identify vulnerabilities, or analyze malware.

## Why Learn Reverse Engineering?

Reverse engineering skills are valuable for several reasons:

1. **Security Research**: Finding vulnerabilities in software before malicious actors do
2. **Malware Analysis**: Understanding how malware operates to develop better defenses
3. **Compatibility & Interoperability**: Understanding how systems work to create compatible solutions
4. **Legacy System Maintenance**: Supporting systems without documentation

## Essential Tools

To get started with reverse engineering, you'll need:

### Disassemblers & Decompilers
- **Ghidra**: NSA's free and open-source software reverse engineering tool
- **IDA Pro**: Industry-standard interactive disassembler
- **Radare2**: Open-source command-line disassembler and debugger

### Debuggers
- **GDB**: GNU Project Debugger for Unix-like systems
- **WinDbg**: Windows debugger
- **x64dbg**: Open-source Windows debugger

## Basic Workflow

A typical reverse engineering workflow involves:

1. **Initial Analysis**: Determine the file type, architecture, and compiler
2. **Static Analysis**: Examine the code without execution (using disassemblers)
3. **Dynamic Analysis**: Run the program to observe behavior (using debuggers)
4. **Documentation**: Document findings and create a map of program functionality

## Getting Started with Ghidra

Ghidra is an excellent tool for beginners due to its powerful features and zero cost:

\`\`\`
// Sample of what decompiled code might look like in Ghidra

int check_password(char *input_password) {
  size_t len;
  int i;
  
  len = strlen(input_password);
  if (len != 10) {
    return 0;
  }
  for (i = 0; i < 10; i++) {
    if (input_password[i] != stored_password[i]) {
      return 0;
    }
  }
  return 1;
}
\`\`\`

## Practice Suggestions

To build your skills:

1. Start with **Crackmes**: Small programs designed to be reverse engineered
2. Analyze **Open Source Software**: Understanding code you can verify
3. Join **CTF Competitions**: Capture the Flag events with reverse engineering challenges
4. Contribute to **Security Research**: Participate in bug bounty programs

## Ethical Considerations

Always remember:
- Obtain proper authorization before reverse engineering any software
- Respect intellectual property rights and end-user license agreements
- Disclose vulnerabilities responsibly
- Never use these skills for malicious purposes

## Next Steps

After getting comfortable with basic reverse engineering:

1. Learn about code obfuscation and how to defeat it
2. Explore anti-debugging techniques
3. Study different architectures (ARM, MIPS)
4. Dive into specific domains like mobile apps or IoT devices

Remember that reverse engineering is a skill that requires patience, persistence, and continual learning. Start small, be methodical, and don't get discouraged by complexity.
      `,
      relatedPosts: ['threat-hunting-techniques', 'machine-learning-security']
    },
    'threat-hunting-techniques': {
      title: 'Advanced Threat Hunting Techniques in Enterprise Networks',
      date: 'January 28, 2024',
      author: 'Chirag Dewan',
      readTime: '12 min read',
      tags: ['Threat Hunting', 'Enterprise Security', 'Advanced'],
      content: `
# Advanced Threat Hunting Techniques in Enterprise Networks

Threat hunting is a proactive security approach that focuses on the pursuit of attacks and malicious actors in your network that may have evaded existing security solutions. Unlike traditional reactive security measures, threat hunting assumes compromise and actively looks for evidence of malicious activity.

## The Need for Proactive Threat Hunting

Modern attackers have become increasingly sophisticated, using techniques that can bypass traditional security controls:

1. **Living off the land** - Using legitimate tools and processes for malicious purposes
2. **Fileless malware** - Operating entirely in memory to avoid detection
3. **Supply chain attacks** - Compromising trusted software to distribute malware
4. **Zero-day exploits** - Leveraging unknown vulnerabilities

## Essential Data Sources for Threat Hunting

Effective threat hunting requires visibility across multiple data sources:

- **Endpoint telemetry**: Process creation, file modifications, registry changes
- **Network traffic**: DNS requests, HTTP connections, TLS metadata
- **Authentication logs**: Login attempts, privilege escalations, account modifications
- **Email security logs**: Attachment types, sender reputation, link analysis
- **Cloud service logs**: API calls, resource provisioning, configuration changes

## Advanced Hunting Methodologies

### 1. Hypothesis-Based Hunting

Start with a specific theory about attacker behavior:

\`\`\`
Hypothesis: Attackers are using PowerShell Empire for post-exploitation
Evidence to look for:
- Suspicious PowerShell command-line parameters (e.g., -enc, -exec bypass)
- PowerShell processes spawned by unusual parent processes
- Outbound connections from PowerShell to uncommon domains
\`\`\`

### 2. TTP-Based Hunting

Focus on specific Tactics, Techniques, and Procedures (TTPs) mapped to the MITRE ATT&CK framework:

\`\`\`
TTP: T1055 - Process Injection
Hunt for:
- Memory allocation patterns indicating shellcode injection
- DLL injection via CreateRemoteThread
- Process hollowing signatures
\`\`\`

### 3. Anomaly-Based Hunting

Identify statistical outliers and unusual patterns:

\`\`\`
Examples:
- Processes with rare parent-child relationships
- Unusual login times or locations for privileged users
- Abnormal data transfer volumes or destinations
\`\`\`

## Advanced Detection Techniques

### Behavioral Analysis

Look for sequences of events that indicate malicious behavior:

\`\`\`
Example pattern:
1. Office document execution
2. Command line interpreter spawn
3. Network connection to low-reputation domain
4. Registry modification to establish persistence
\`\`\`

### Stack Counting

Analyze frequency distributions to identify rare or unusual occurrences:

\`\`\`python
# Pseudocode for stack counting
def stack_count(events, field):
    counts = {}
    for event in events:
        key = event[field]
        counts[key] = counts.get(key, 0) + 1
    
    # Sort by frequency (least common first)
    return sorted(counts.items(), key=lambda x: x[1])
\`\`\`

### Timeline Analysis

Reconstruct attack sequences through temporal analysis:

\`\`\`
Timeline example:
08:23:15 - Email received with attachment
08:23:47 - User opens attachment
08:23:52 - PowerShell process spawned
08:24:01 - Connection to C2 server established
08:24:15 - Scheduled task created for persistence
\`\`\`

## Tools for Advanced Threat Hunting

- **Osquery**: SQL-powered operating system instrumentation
- **ELK Stack**: Elasticsearch, Logstash, and Kibana for log aggregation and analysis
- **Zeek (formerly Bro)**: Network security monitoring
- **YARA**: Pattern matching for malware identification
- **Volatility**: Memory forensics framework

## Building a Sustainable Threat Hunting Program

1. **Define hunting processes**: Establish methodologies, documentation standards, and automation opportunities
2. **Build a hunting library**: Maintain a repository of queries, techniques, and findings
3. **Measure effectiveness**: Track metrics such as dwell time reduction and coverage of the attack surface
4. **Share knowledge**: Regular knowledge transfer sessions between hunters and broader security team

## Future of Threat Hunting

As threats evolve, so must hunting techniques:

1. **AI-assisted hunting**: Machine learning to identify subtle anomalies and connections
2. **Automated response**: Moving from detection to remediation with minimal human intervention
3. **Threat intelligence integration**: Incorporating external IOCs and TTPs into hunting workflows
4. **Cloud-native hunting**: Adapting methodologies for serverless, container, and microservice architectures

Remember that threat hunting is not a one-time activity but a continuous process of improvement and adaptation to stay ahead of evolving threats.
      `,
      relatedPosts: ['reverse-engineering-basics', 'cloud-security-best-practices']
    },
    'machine-learning-security': {
      title: 'Leveraging Machine Learning for Security Analytics',
      date: 'December 15, 2023',
      author: 'Chirag Dewan',
      readTime: '10 min read',
      tags: ['Machine Learning', 'Security Analytics', 'Data Science'],
      content: `# Machine Learning for Security Analytics

Content for this post is coming soon.
      `,
      relatedPosts: ['reverse-engineering-basics', 'threat-hunting-techniques']
    },
    'cloud-security-best-practices': {
      title: 'Cloud Security Best Practices for Multi-Cloud Environments',
      date: 'November 8, 2023',
      author: 'Chirag Dewan',
      readTime: '15 min read',
      tags: ['Cloud Security', 'AWS', 'Azure', 'GCP'],
      content: `# Cloud Security Best Practices

Content for this post is coming soon.
      `,
      relatedPosts: ['threat-hunting-techniques', 'machine-learning-security']
    }
  };

  const post = blogPosts[postId];

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-gray-400 mb-8">The post you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:scale-105 transition-all">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Function to convert Markdown-style content to JSX
  const renderContent = (markdown) => {
    // Split content by line breaks
    const lines = markdown.split('\n');
    
    // Simple renderer for basic markdown
    return lines.map((line, index) => {
      // H1 headers
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
      }
      // H2 headers
      else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
      }
      // H3 headers
      else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mt-5 mb-2">{line.substring(4)}</h3>;
      }
      // Code blocks
      else if (line.startsWith('```') && !line.endsWith('```')) {
        // Start of code block
        return null; // Skip this line, we'll handle the content inside
      }
      else if (line.endsWith('```') && !line.startsWith('```')) {
        // End of code block
        return null; // Skip this line too
      }
      else if (line.startsWith('- ')) {
        // List items
        return <li key={index} className="ml-6 list-disc mb-2">{line.substring(2)}</li>;
      }
      else if (line.match(/^\d+\. /)) {
        // Numbered list items
        return <li key={index} className="ml-6 list-decimal mb-2">{line.substring(line.indexOf(' ') + 1)}</li>;
      }
      // Empty line becomes paragraph break
      else if (line.trim() === '') {
        return <div key={index} className="mb-4"></div>;
      }
      // Regular text
      else {
        return <p key={index} className="mb-4 text-gray-300">{line}</p>;
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors mb-8">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to all articles
      </Link>
      
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap gap-4 items-center text-sm mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-2">
              {post.author.charAt(0)}
            </div>
            <span>{post.author}</span>
          </div>
          <span className="text-gray-500">•</span>
          <span className="text-gray-400">{post.date}</span>
          <span className="text-gray-500">•</span>
          <span className="text-pink-500">{post.readTime}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-300">
              {tag}
            </span>
          ))}
        </div>
      </header>
      
      <div className="glass p-8 rounded-xl border border-white/10 mb-12">
        <article className="prose prose-invert max-w-none">
          {renderContent(post.content)}
        </article>
      </div>
      
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="glass p-8 rounded-xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {post.relatedPosts.map(relatedId => {
              const relatedPost = blogPosts[relatedId];
              if (!relatedPost) return null;
              
              return (
                <Link
                  key={relatedId}
                  to={`/blog/${relatedId}`}
                  className="p-5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <h3 className="font-bold mb-2 group-hover:text-pink-400 transition-colors">{relatedPost.title}</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{relatedPost.date}</span>
                    <span className="text-pink-500">{relatedPost.readTime}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
