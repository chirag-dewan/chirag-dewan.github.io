import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogCard = ({ post, index, featured = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link 
        to={`/blog/${post.id}`}
        className={`block glass-card rounded-xl overflow-hidden transition-all duration-500 h-full ${
          featured ? 'border border-pink-500/20 bg-gradient-to-br from-black to-pink-950/10' : 'border border-white/10'
        }`}
      >
        {/* Card Header with Date and Read Time */}
        <div className="flex justify-between items-start p-6 pb-2">
          <span className="text-sm bg-white/5 px-3 py-1 rounded-full text-gray-300">{post.date}</span>
          <span className={`text-sm ${featured ? 'text-pink-400 bg-pink-500/10 border border-pink-500/20' : 'text-blue-400 bg-blue-500/10 border border-blue-500/20'} px-3 py-1 rounded-full`}>
            {post.readTime}
          </span>
        </div>
        
        {/* Title and Excerpt */}
        <div className="px-6 py-4">
          <h3 className={`text-2xl font-bold mb-4 ${featured ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent' : 'text-white'}`}>
            {post.title}
          </h3>
          
          <p className="text-gray-300 mb-6 line-clamp-3">{post.excerpt}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className={`px-3 py-1 rounded-full text-xs ${
                  featured ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-gray-800 text-gray-300'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* "Read Post" Link */}
          <div className="flex justify-end">
            <span className="text-pink-400 flex items-center gap-2 group text-sm font-medium">
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
        
        {/* Decorative Corner Elements for Featured Post */}
        {featured && (
          <>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
          </>
        )}
      </Link>
    </motion.div>
  );
};

const BlogFeaturedPost = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link
        to={`/blog/${post.id}`}
        className="block glass-card p-8 rounded-xl border border-pink-500/20 bg-gradient-to-br from-black to-pink-950/10 transition-all duration-500 hover:shadow-xl hover:border-pink-500/40 relative overflow-hidden animated-border"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm text-gray-300 bg-white/5 px-3 py-1 rounded-full">{post.date}</span>
            <span className="text-sm text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
              {post.readTime}
            </span>
          </div>

          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{post.title}</h2>
          <p className="text-gray-300 mb-6 text-lg">{post.excerpt}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
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
    </motion.div>
  );
};

const BlogUpcomingCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
      className="glass-card p-6 rounded-xl border border-white/10 transition-all duration-300 hover:border-blue-500/20 hover:shadow-lg group h-full"
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
    </motion.div>
  );
};

const BlogCardGrid = ({ posts, featured = [] }) => {
  // Separate featured posts from regular posts
  const regularPosts = posts.filter(post => !featured.includes(post.id));
  
  return (
    <div className="grid gap-8">
      {featured.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6 inline-block relative">
            Featured Post
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></span>
          </h2>
          
          {posts.filter(post => featured.includes(post.id)).map(post => (
            <BlogFeaturedPost key={post.id} post={post} />
          ))}
        </section>
      )}
      
      {regularPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6 inline-block relative">
            Recent Posts
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export { BlogCard, BlogFeaturedPost, BlogUpcomingCard, BlogCardGrid };
