import React from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-apple">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="heading-md text-apple-gray-900">Blog & Insights</h1>
          <p className="mt-4 text-lg text-apple-gray-600 max-w-3xl mx-auto">
            Coming soon! Check back for articles on software engineering and technology
          </p>
        </motion.div>
        
        {/* Coming soon section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-apple-gray-50 rounded-apple-xl p-12 text-center shadow-apple"
        >
          <div className="w-20 h-20 bg-apple-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-pen-nib text-apple-blue-500 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-display font-bold text-apple-gray-900 mb-4">Blog Posts Coming Soon</h2>
          <p className="text-apple-gray-600 mb-8">
            I'm currently working on some insightful articles about software engineering, 
            modern development practices, and technology trends. Subscribe to be notified when 
            new content is published.
          </p>
          
          {/* Subscription form */}
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="form-input flex-grow"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
                <i className="fas fa-paper-plane ml-2"></i>
              </button>
            </form>
            <p className="text-apple-gray-500 text-sm mt-4">
              I respect your privacy and won't share your information.
            </p>
          </div>
        </motion.div>
        
        {/* Blog post examples */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          {[
            {
              title: "Modern Frontend Architecture",
              date: "Coming soon",
              snippet: "An exploration of current best practices in frontend development, from component design to state management."
            },
            {
              title: "Building Scalable Microservices",
              date: "Coming soon",
              snippet: "Lessons learned from developing enterprise-grade microservice architectures at GM Financial."
            }
          ].map((post, index) => (
            <div key={index} className="card p-6 opacity-75">
              <h3 className="text-xl font-medium text-apple-gray-900 mb-2">{post.title}</h3>
              <p className="text-apple-gray-500 text-sm mb-4">{post.date}</p>
              <p className="text-apple-gray-600">{post.snippet}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
