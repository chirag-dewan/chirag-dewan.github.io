import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'security', name: 'Security' },
    { id: 'research', name: 'Research' },
    { id: 'technology', name: 'Technology' }
  ];

  const blogPosts = [
    {
      id: 'understanding-memory-safety',
      title: 'Understanding Memory Safety in Modern Systems',
      date: 'March 2, 2025',
      category: 'security',
      summary: 'An exploration of memory safety vulnerabilities and how modern programming languages are addressing these critical security issues.',
      image: '🔒',
      readTime: '6 min read'
    },
    {
      id: 'packet-analysis-techniques',
      title: 'Advanced Packet Analysis Techniques for Security Professionals',
      date: 'February 18, 2025',
      category: 'security',
      summary: 'Diving deep into network packet analysis methodologies that can help identify suspicious traffic patterns and potential intrusions.',
      image: '📊',
      readTime: '8 min read'
    },
    {
      id: 'ml-security-applications',
      title: 'Machine Learning Applications in Cybersecurity',
      date: 'February 5, 2025',
      category: 'research',
      summary: 'How machine learning algorithms are revolutionizing threat detection and response in modern security operations centers.',
      image: '🧠',
      readTime: '10 min read'
    },
    {
      id: 'zero-trust-architectures',
      title: 'Implementing Zero Trust Architectures',
      date: 'January 20, 2025',
      category: 'security',
      summary: 'A practical guide to implementing zero trust security models in enterprise environments, with real-world examples and best practices.',
      image: '🛡️',
      readTime: '7 min read'
    },
    {
      id: 'rust-systems-programming',
      title: 'Rust for Systems Programming: A Security Perspective',
      date: 'January 8, 2025',
      category: 'technology',
      summary: 'Why Rust is gaining traction for systems programming tasks that traditionally used C/C++, with a focus on its security advantages.',
      image: '⚙️',
      readTime: '9 min read'
    },
    {
      id: 'threat-modeling-approaches',
      title: 'Modern Threat Modeling Approaches',
      date: 'December 15, 2024',
      category: 'research',
      summary: 'A comparison of different threat modeling methodologies and how to choose the right approach for your organization or project.',
      image: '📈',
      readTime: '5 min read'
    }
  ];

  // Filter blog posts based on selected category
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="pt-28 pb-20">
      <section className="section bg-white">
        <div className="container-apple">
          <div 
            ref={ref}
            className={`text-center mb-16 transition-all duration-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="heading-md text-apple-gray-900">Blog & Insights</h1>
            <p className="mt-4 text-lg text-apple-gray-600 max-w-3xl mx-auto">
              Thoughts, research, and perspectives on cybersecurity, technology, and more
            </p>
          </div>

          {/* Category Filters */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-apple-gray-900 text-white shadow-apple-sm'
                    : 'bg-white text-apple-gray-700 hover:bg-apple-gray-100 border border-apple-gray-200'
                }`}
                style={{ 
                  transitionDelay: inView ? `${index * 0.1}s` : '0s',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(10px)'
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="card hoverable overflow-hidden h-full flex flex-col"
                style={{ 
                  transitionDelay: inView ? `${index * 0.1}s` : '0s',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease'
                }}
              >
                {/* Post image/icon placeholder */}
                <div className="h-48 bg-apple-gray-50 flex items-center justify-center">
                  <span className="text-5xl">{post.image}</span>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-1 bg-apple-gray-100 text-apple-gray-700 rounded-full text-xs">
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </span>
                    <span className="text-apple-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-medium text-apple-gray-900 mb-2">{post.title}</h3>
                  <p className="text-sm text-apple-gray-500 mb-4">{post.date}</p>
                  
                  <p className="mt-2 text-apple-gray-600 flex-grow">{post.summary}</p>
                  
                  <div className="mt-6">
                    <Link 
                      to={`/blog/${post.id}`} 
                      className="inline-flex items-center text-sm font-medium text-apple-blue-500 hover:text-apple-blue-600 transition-colors"
                    >
                      Read More
                      <i className="fas fa-arrow-right ml-2 text-xs"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div 
            className="mt-16 bg-apple-gray-50 rounded-apple-xl p-8 md:p-12"
            style={{ 
              transitionDelay: inView ? '0.6s' : '0s',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease'
            }}
          >
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-bold text-apple-gray-900 mb-4">Stay Updated</h3>
                <p className="text-lg text-apple-gray-600">
                  Subscribe to my newsletter for the latest articles, research findings, and security insights.
                </p>
              </div>
              
              <form className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="form-input md:flex-1"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                  <i className="fas fa-paper-plane ml-2"></i>
                </button>
              </form>
              <p className="text-apple-gray-500 text-sm text-center mt-4">
                I respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
