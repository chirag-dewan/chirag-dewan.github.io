import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BlogPost() {
  const { postId } = useParams();
  
  const blogPosts = {
    'welcome-intro': {
      title: 'Welcome to My Cybersecurity Journey',
      date: 'February 27, 2025',
      author: 'Chirag Dewan',
      readTime: '4 min read',
      tags: ['Personal', 'Cybersecurity', 'Introduction'],
      content: `
# Welcome to My Cybersecurity Journey

Hey there! I'm Chirag Dewan, a Cybersecurity Researcher based in Boston, MA. If you're reading this, you've just stumbled upon my little corner of the digital world where I'll be sharing my adventures in the realm of cybersecurity.

## A Bit About Me

I've always been drawn to understanding how things work by taking them apart. That curiosity naturally led me to cybersecurity, where breaking down systems is actually part of making them stronger. Currently at RTX BBN, I get to channel this passion into tangible security solutions.

My day-to-day work involves everything from developing intelligent packet parsers to reverse-engineering firmware and creating proof-of-concept exploits. There's something incredibly satisfying about finding a vulnerability before the bad actors do and helping patch it up.

## What Drives Me

What gets me out of bed every morning is the constantly evolving nature of security threats. Each day brings new challenges, techniques, and opportunities to learn. With an active Top Secret clearance, I've had the privilege of working on some fascinating projects that push the boundaries of what's possible in defensive security.

Some of my personal projects include:
- Building a real-time network packet sniffer (because sometimes you just need to see what's happening at the packet level)
- Creating an automated malware analysis environment with Docker and YARA
- Developing a machine learning-powered intrusion detection system

## What to Expect on This Blog

I started this blog to share insights that might help others navigating the complex world of cybersecurity. You can expect:

- Deep dives into interesting security concepts
- Walkthroughs of personal projects and tools I've built
- Thoughts on emerging threats and defense strategies
- Occasional tutorials on techniques I've found valuable

I'm also excited to introduce several weekly features:

- **Malware of the Week**: Detailed analysis of interesting malware samples, breaking down their techniques and potential mitigations
- **Offensive/Defensive Tool Spotlight**: Highlighting useful security tools with practical demonstrations
- **Research Paper Summaries**: Digestible breakdowns of important cybersecurity research papers and their real-world implications

Security is a community effort, and I believe in the power of sharing knowledge (responsibly, of course). Whether you're a seasoned security professional or just curious about how to better protect your digital life, I hope you'll find something valuable here.

Thanks for joining me on this journey. I'm looking forward to the conversations and connections that grow from this space.

Stay curious and secure,
Chirag
      `,
      relatedPosts: []
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
    </div>
  );
}
