import React from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const blogPosts = [
    {
      id: 'welcome-intro',
      title: 'Welcome to My Cybersecurity Journey',
      date: 'February 27, 2025',
      excerpt: 'A brief introduction about who I am, my passion for cybersecurity, and what you can expect from this blog including weekly features on malware analysis, security tools, and research papers.',
      tags: ['Personal', 'Cybersecurity', 'Introduction'],
      readTime: '4 min read',
      featured: true
    }
  ];
  
  // Future blog post teasers
  const upcomingPosts = [
    {
      id: 'upcoming-malware-analysis',
      title: 'Malware of the Week: Analyzing Modern Ransomware',
      date: 'Coming Soon',
      excerpt: 'A deep dive into the techniques used by modern ransomware, with detailed analysis of encryption methods, evasion tactics, and mitigation strategies.',
      tags: ['Malware Analysis', 'Ransomware', 'Threat Intelligence'],
      readTime: 'Coming Soon'
    },
    {
      id: 'upcoming-offensive-tool',
      title: 'Tool Spotlight: Building an Advanced Port Scanner',
      date: 'Coming Soon',
      excerpt: 'Learn how to create a sophisticated port scanner from scratch using Python, with techniques for evading detection and comprehensive result analysis.',
      tags: ['Offensive Security', 'Tool Development', 'Python'],
      readTime: 'Coming Soon'
    },
    {
      id: 'upcoming-research-paper',
      title: 'Research Summary: Recent Advances in Memory Forensics',
      date: 'Coming Soon',
      excerpt: 'Breaking down the most significant research papers on memory forensics from the past year, with practical applications for your security toolkit.',
      tags: ['Research', 'Memory Forensics', 'Digital Forensics'],
      readTime: 'Coming Soon'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero Section with Enhanced Styling */}
      <section className="text-center mb-16 animate-fadeIn">
        <div className="relative mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent relative z-10">
            Security Blog
          </h1>
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl z-0"></div>
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Insights, tutorials, and research on cybersecurity, reverse engineering, and emerging threats.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <span className="px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-sm text-pink-400 hover:bg-pink-500/20 transition-colors cursor-pointer">
            Malware Analysis
          </span>
          <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer">
            Reverse Engineering
          </span>
          <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-400 hover:bg-purple-500/20 transition-colors cursor-pointer">
            Tool Spotlights
          </span>
          <span className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-sm text-green-400 hover:bg-green-500/20 transition-colors cursor-pointer">
            Research Papers
          </span>
        </div>
      </section>

      {/* Featured Post with Special Styling */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 inline-block relative">
          Featured Post
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></span>
        </h2>
        
        <Link
          to={`/blog/${blogPosts[0].id}`}
          className="block glass p-8 rounded-xl border border-pink-500/20 bg-gradient-to-br from-black to-pink-950/10 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl hover:border-pink-500/40 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm text-gray-300 bg-white/5 px-3 py-1 rounded-full">{blogPosts[0].date}</span>
              <span className="text-sm text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                {blogPosts[0].readTime}
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{blogPosts[0].title}</h2>
            <p className="text-gray-300 mb-6 text-lg">{blogPosts[0].excerpt}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-2 flex-wrap">
                {blogPosts[0].tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 rounded-full text-xs bg-white/5 text-gray-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <span className="text-pink-400 flex items-center gap-2 group">
                Read Post
                <svg 
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Upcoming Posts Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 inline-block relative">
          Coming Soon
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {upcomingPosts.map((post, index) => (
            <div
              key={post.id}
              className="glass p-6 rounded-xl border border-white/10 transition-all duration-300 hover:border-blue-500/20 hover:shadow-lg group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-gray-400">{post.date}</span>
                <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{post.title}</h3>
              <p className="text-gray-400 mb-4 text-sm line-clamp-3">{post.excerpt}</p>
              
              <div className="flex gap-2 flex-wrap mt-auto">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="mb-12">
        <div className="glass p-8 rounded-xl border border-purple-500/20 bg-gradient-to-br from-black to-purple-950/10">
          <h2 className="text-2xl font-bold mb-4 text-center">Subscribe to the Newsletter</h2>
          <p className="text-gray-300 text-center mb-6">
            Get notified when new posts are published, including the weekly Malware Analysis, Tool Spotlights, and Research Paper Summaries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg transition-all hover:shadow-lg hover:shadow-purple-500/20">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
