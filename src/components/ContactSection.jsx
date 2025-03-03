import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EnhancedContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'info'
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with a delay
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Your message has been sent successfully! I\'ll get back to you soon.'
      });
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // After 5 seconds, reset the success message
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          error: false,
          message: ''
        });
      }, 5000);
    }, 1500);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Social media links
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/chirag-dewan',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/cdewan',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:chirag0728@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      )
    }
  ];

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Interested in collaboration or have questions about my work? I'm always open to discussing new projects and opportunities.
          </p>
        </motion.div>
        
        {/* Tab selector for mobile */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center mb-10 md:hidden"
        >
          <div className="bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
            <button
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeTab === 'form' ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('form')}
            >
              Send Message
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                activeTab === 'info' ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('info')}
            >
              Contact Info
            </button>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className={`${activeTab === 'form' ? 'block' : 'hidden md:block'}`}
          >
            <div className="backdrop-blur-xl bg-black/40 p-8 rounded-xl border border-white/10 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Send a Message
              </h3>
              
              {formStatus.submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center"
                >
                  <div className="text-5xl mb-4">✓</div>
                  <h4 className="text-xl font-medium text-green-400 mb-2">Message Sent!</h4>
                  <p className="text-green-300">{formStatus.message}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                      <label htmlFor="message" className="block text-gray-400 mb-2 text-sm">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-colors resize-none"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg text-white font-medium transition-all hover:shadow-lg hover:shadow-pink-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className={`${activeTab === 'info' ? 'block' : 'hidden md:block'}`}
          >
            <div className="space-y-8">
              {/* Contact card */}
              <div className="backdrop-blur-xl bg-black/40 p-8 rounded-xl border border-white/10 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/5 p-3 rounded-full">
                      <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">Email</h4>
                      <p className="text-gray-300">chirag0728@gmail.com</p>
                      <a href="mailto:chirag0728@gmail.com" className="text-pink-400 hover:text-pink-300 transition-colors inline-flex items-center mt-1 text-sm">
                        Send an email
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/5 p-3 rounded-full">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">LinkedIn</h4>
                      <p className="text-gray-300">linkedin.com/in/cdewan</p>
                      <a href="https://linkedin.com/in/cdewan" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center mt-1 text-sm">
                        Connect with me
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/5 p-3 rounded-full">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">GitHub</h4>
                      <p className="text-gray-300">github.com/chirag-dewan</p>
                      <a href="https://github.com/chirag-dewan" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors inline-flex items-center mt-1 text-sm">
                        View my projects
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Location card */}
              <div className="backdrop-blur-xl bg-black/40 p-8 rounded-xl border border-white/10 shadow-xl">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Location
                </h3>
                <div className="flex items-center">
                  <div className="bg-white/5 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Cambridge, MA</h4>
                    <p className="text-gray-300">Boston Metropolitan Area</p>
                  </div>
                </div>
              </div>
              
              {/* Social links */}
              <div className="backdrop-blur-xl bg-black/40 p-8 rounded-xl border border-white/10 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Connect With Me
                </h3>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-white transition-colors hover:transform hover:scale-110 inline-block"
                      title={link.name}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default EnhancedContact;
                        <label htmlFor="name" className="block text-gray-400 mb-2 text-sm">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-gray-400 mb-2 text-sm">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-400 mb-2 text-sm">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30 transition-colors"
                      />
                    </div>
                    
                    <div>
