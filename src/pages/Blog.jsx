import React from 'react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const blogPosts = [
    {
      id: 'reverse-engineering-intro',
      title: 'Introduction to Reverse Engineering',
      date: 'February 20, 2025',
      excerpt: 'A beginner-friendly guide to understanding reverse engineering concepts and tools.',
      tags: ['Reverse Engineering', 'Tutorial', 'Ghidra'],
      readTime: '8 min read'
    },
    {
      id: 'ml-security-applications',
      title: 'Machine Learning in Cybersecurity',
      date: 'February 15, 2025',
      excerpt: 'Exploring practical applications of ML techniques for threat detection and prevention.',
      tags: ['Machine Learning', 'Security', 'Python'],
      readTime: '12 min read'
    },
    {
      id: 'cloud-security-architecture',
      title: 'Designing Secure Cloud Architectures',
      date: 'February 8, 2025',
      excerpt: 'Best practices for securing multi-cloud environments against modern threats.',
      tags: ['Cloud', 'Architecture', 'AWS', 'Azure'],
      readTime: '10 min read'
    },
    {
      id: 'linux-hardening',
      title: 'Enterprise Linux Hardening Techniques',
      date: 'January 30, 2025',
      excerpt: 'Advanced strategies for securing Linux systems in enterprise environments.',
      tags: ['Linux', 'Security', 'Hardening'],
      readTime: '15 min read'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <section className="text-center mb-16 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-animate bg-clip-text text-transparent">
          Security Blog
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Insights, tutorials, and research on cybersecurity, reverse engineering, and emerging threats.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 stagger-children">
        {blogPosts.map((post) => (
          <Link
            to={`/blog/${post.id}`}
            key={post.id}
            className="glass p-6 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm text-gray-400">{post.date}</span>
              <span className="text-xs text-pink-500 bg-pink-500/10 px-2 py-1 rounded-full">
                {post.readTime}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
            <p className="text-gray-300 mb-4">{post.excerpt}</p>
            
            <div className="flex gap-2 flex-wrap mt-auto">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="button-primary">
          Load More Articles
        </button>
      </div>
    </div>
  );
}
