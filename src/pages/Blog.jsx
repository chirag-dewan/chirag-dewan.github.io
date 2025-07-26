// src/pages/Blog.jsx - Updated

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getAllBlogPosts, getFeaturedPosts, getPostsByCategory } from '../data/blogPosts';

const BlogCard = ({ post, index, featured = false }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group ${featured ? 'col-span-full lg:col-span-2' : ''}`}
    >
      <Link to={`/blog/${post.id}`}>
        <div className={`bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-lg overflow-hidden h-full flex flex-col transition-colors ${
          featured ? 'border-2 border-blue-500' : ''
        }`}>
          {/* Featured badge */}
          {featured && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
              <span className="text-sm font-medium flex items-center">
                <i className="fas fa-star mr-2"></i>
                Featured Article
              </span>
            </div>
          )}
          
          {/* Post image/icon */}
          <div className={`${featured ? 'h-64' : 'h-48'} bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center relative overflow-hidden`}>
            <span className={`${featured ? 'text-8xl' : 'text-6xl'} transition-transform group-hover:scale-110`}>
              {post.image}
            </span>
            
            {/* Category overlay */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                {post.category}
              </span>
            </div>
            
            {/* Read time overlay */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-black/70 text-white rounded-full text-xs">
                {post.readTime}
              </span>
            </div>
          </div>
          
          <div className="p-6 flex-grow flex flex-col">
            {/* Metadata */}
            <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            
            {/* Title */}
            <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2`}>
              {post.title}
            </h3>
            
            {/* Summary */}
            <p className="text-gray-300 flex-grow line-clamp-3 mb-4">
              {post.summary}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, featured ? 4 : 3).map((tag) => (
                <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                  {tag}
                </span>
              ))}
              {post.tags.length > (featured ? 4 : 3) && (
                <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                  +{post.tags.length - (featured ? 4 : 3)} more
                </span>
              )}
            </div>
            
            {/* Read more link */}
            <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
              <span>Read Article</span>
              <i className="fas fa-arrow-right ml-2 text-sm transform group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const allPosts = getAllBlogPosts();
  const featuredPosts = getFeaturedPosts();
  
  // Get unique categories
  const categories = ['all', ...new Set(allPosts.map(post => post.category))];
  
  // Filter posts based on category and search
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 min-h-screen bg-black">
      <div className="container-apple">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="heading-md text-white mb-4">Cybersecurity Research & Insights</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Deep dives into AI security, offensive cybersecurity techniques, and the evolving threat landscape. 
            Insights from vulnerability research and practical security engineering.
          </p>
          
          {/* Stats */}
          <div className="mt-8 flex justify-center">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-400">{allPosts.length}</div>
                  <div className="text-sm text-gray-400">Articles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">{featuredPosts.length}</div>
                  <div className="text-sm text-gray-400">Featured</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">{categories.length - 1}</div>
                  <div className="text-sm text-gray-400">Categories</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded-full focus:outline-none focus:border-blue-500 shadow-sm"
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600 shadow-sm'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category === 'all' ? 'All Articles' : category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Posts Section */}
        {activeCategory === 'all' && !searchTerm && featuredPosts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} featured={true} />
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts Section */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              {activeCategory === 'all' ? 'All Articles' : `${activeCategory} Articles`}
              <span className="text-gray-400 font-normal ml-2">({filteredPosts.length})</span>
            </h2>
            
            {/* Sort Options */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Sort by:</span>
              <select className="bg-gray-800 border border-gray-600 text-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500">
                <option>Latest</option>
                <option>Oldest</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-search text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
              <p className="text-gray-300 mb-6">
                Try adjusting your search terms or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get notified when I publish new articles about cybersecurity research, AI security, and emerging threats.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
                Subscribe
                <i className="fas fa-paper-plane ml-2"></i>
              </button>
            </div>
            <p className="text-blue-100 text-sm mt-3">
              No spam, unsubscribe at any time. Join 500+ security professionals.
            </p>
          </div>
        </motion.div>

        {/* Categories Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Explore by Category</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.filter(cat => cat !== 'all').map((category, index) => {
              const categoryPosts = getPostsByCategory(category);
              const icons = {
                'AI Security': 'robot',
                'Offensive Security': 'crosshairs',
                'Intelligence': 'eye',
                'Network Security': 'network-wired'
              };
              
              return (
                <motion.div
                  key={category}
                  className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:border-gray-600 transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveCategory(category)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <i className={`fas fa-${icons[category] || 'shield-alt'} text-white text-xl`}></i>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{category}</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    {categoryPosts.length} article{categoryPosts.length !== 1 ? 's' : ''}
                  </p>
                  <span className="text-blue-400 text-sm font-medium">
                    Explore →
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
