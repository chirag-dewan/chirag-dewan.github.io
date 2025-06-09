import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    loading: false,
    message: ''
  });
  
  const [focusedField, setFocusedField] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const formRef = useRef(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Real-time validation
  const validateField = (name, value) => {
    const errors = {};
    
    switch (name) {
      case 'name':
        if (!value.trim()) errors.name = 'Name is required';
        else if (value.trim().length < 2) errors.name = 'Name must be at least 2 characters';
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) errors.email = 'Email is required';
        else if (!emailRegex.test(value)) errors.email = 'Please enter a valid email address';
        break;
      case 'subject':
        if (!value.trim()) errors.subject = 'Subject is required';
        else if (value.trim().length < 5) errors.subject = 'Subject must be at least 5 characters';
        break;
      case 'message':
        if (!value.trim()) errors.message = 'Message is required';
        else if (value.trim().length < 10) errors.message = 'Message must be at least 10 characters';
        break;
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
    
    // Real-time validation
    const fieldErrors = validateField(name, value);
    if (Object.keys(fieldErrors).length > 0) {
      setValidationErrors(prev => ({ ...prev, ...fieldErrors }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(prev => ({ ...prev, loading: true, error: false }));
    
    // Validate all fields
    const allErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'company' && key !== 'inquiryType') {
        const fieldErrors = validateField(key, formData[key]);
        Object.assign(allErrors, fieldErrors);
      }
    });
    
    if (Object.keys(allErrors).length > 0) {
      setValidationErrors(allErrors);
      setFormStatus(prev => ({ ...prev, loading: false, error: true, message: 'Please correct the errors above' }));
      return;
    }
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFormStatus({
        submitted: true,
        error: false,
        loading: false,
        message: 'Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
      setValidationErrors({});
    } catch (error) {
      setFormStatus({
        submitted: false,
        error: true,
        loading: false,
        message: 'Something went wrong. Please try again later.'
      });
    }
  };

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry', icon: 'question-circle' },
    { value: 'collaboration', label: 'Collaboration', icon: 'handshake' },
    { value: 'consulting', label: 'Consulting', icon: 'chart-line' },
    { value: 'speaking', label: 'Speaking Engagement', icon: 'microphone' },
    { value: 'job', label: 'Job Opportunity', icon: 'briefcase' }
  ];

  const contactMethods = [
    {
      icon: 'envelope',
      label: 'Email',
      value: 'chirag0728@gmail.com',
      href: 'mailto:chirag0728@gmail.com',
      description: 'Best for detailed inquiries',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/cdewan',
      href: 'https://linkedin.com/in/cdewan',
      description: 'Professional networking',
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/10'
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: 'github.com/chirag-dewan',
      href: 'https://github.com/chirag-dewan',
      description: 'Code collaboration',
      color: 'text-gray-600',
      bgColor: 'bg-gray-600/10'
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: '(919) 771-7668',
      href: 'tel:+19197717668',
      description: 'For urgent matters',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    }
  ];

  return (
    <section id="contact" className="section bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container-apple">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-md text-gray-900 mb-4">Let's Connect</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Interested in collaboration, consulting, or just want to discuss cybersecurity? 
              I'm always open to connecting with fellow professionals and exploring new opportunities.
            </p>
          </motion.div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              className={`bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: inView ? '0.2s' : '0s' }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <i className="fas fa-paper-plane text-blue-500 mr-3"></i>
                Send a Message
              </h3>
              
              <AnimatePresence mode="wait">
                {formStatus.submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="fas fa-check text-green-600 text-2xl"></i>
                    </div>
                    <h4 className="text-2xl font-semibold text-gray-900 mb-4">Message Sent!</h4>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">{formStatus.message}</p>
                    <button
                      type="button"
                      onClick={() => setFormStatus({ submitted: false, error: false, loading: false, message: '' })}
                      className="btn-primary"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Inquiry Type Selection */}
                    <div>
                      <label className="form-label mb-3">What's this about?</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {inquiryTypes.map((type) => (
                          <motion.label
                            key={type.value}
                            className={`relative flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all ${
                              formData.inquiryType === type.value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300 text-gray-600'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <input
                              type="radio"
                              name="inquiryType"
                              value={type.value}
                              checked={formData.inquiryType === type.value}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <i className={`fas fa-${type.icon} text-xl mb-2`}></i>
                            <span className="text-sm font-medium text-center">{type.label}</span>
                          </motion.label>
                        ))}
                      </div>
                    </div>

                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label htmlFor="name" className="form-label">
                          Your Name *
                        </label>
                        <motion.input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className={`form-input transition-all duration-300 ${
                            validationErrors.name ? 'border-red-500 focus:border-red-500' : 
                            focusedField === 'name' ? 'border-blue-500 shadow-lg' : ''
                          }`}
                          placeholder="John Doe"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="subject" className="form-label">
                          Subject *
                        </label>
                        <motion.input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField(null)}
                          className={`form-input transition-all duration-300 ${
                            validationErrors.subject ? 'border-red-500 focus:border-red-500' : 
                            focusedField === 'subject' ? 'border-blue-500 shadow-lg' : ''
                          }`}
                          placeholder="Brief description of your inquiry"
                          whileFocus={{ scale: 1.02 }}
                        />
                        <AnimatePresence>
                          {validationErrors.subject && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-500 text-sm mt-1"
                            >
                              {validationErrors.subject}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    {/* Message */}
                    <div className="relative">
                      <label htmlFor="message" className="form-label">
                        Message *
                      </label>
                      <motion.textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows="6"
                        className={`form-input resize-none transition-all duration-300 ${
                          validationErrors.message ? 'border-red-500 focus:border-red-500' : 
                          focusedField === 'message' ? 'border-blue-500 shadow-lg' : ''
                        }`}
                        placeholder="Tell me more about your project, inquiry, or how I can help..."
                        whileFocus={{ scale: 1.01 }}
                      />
                      <div className="flex justify-between items-center mt-1">
                        <AnimatePresence>
                          {validationErrors.message && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-500 text-sm"
                            >
                              {validationErrors.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                        <p className={`text-sm ${
                          formData.message.length < 10 ? 'text-gray-400' : 
                          formData.message.length < 50 ? 'text-yellow-500' : 'text-green-500'
                        }`}>
                          {formData.message.length} characters
                        </p>
                      </div>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {formStatus.error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3"
                        >
                          <i className="fas fa-exclamation-triangle text-red-500"></i>
                          <p className="text-red-700">{formStatus.message}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={formStatus.loading}
                      className={`w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                        formStatus.loading 
                          ? 'opacity-75 cursor-not-allowed' 
                          : 'hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:-translate-y-1'
                      }`}
                      whileHover={!formStatus.loading ? { scale: 1.02 } : {}}
                      whileTap={!formStatus.loading ? { scale: 0.98 } : {}}
                    >
                      {formStatus.loading ? (
                        <span className="flex items-center justify-center">
                          <motion.i 
                            className="fas fa-spinner mr-3"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending Message...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Send Message
                          <i className="fas fa-paper-plane ml-3"></i>
                        </span>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <motion.div 
              className={`bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: inView ? '0.4s' : '0s' }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <i className="fas fa-address-card text-blue-500 mr-3"></i>
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : '_self'}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="group flex items-start p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 ${method.bgColor} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                      <i className={`fa${method.icon === 'github' || method.icon === 'linkedin' ? 'b' : 's'} fa-${method.icon} ${method.color} text-lg`}></i>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {method.label}
                      </h4>
                      <p className="text-gray-600 text-sm mb-1">{method.value}</p>
                      <p className="text-gray-500 text-xs">{method.description}</p>
                    </div>
                    <i className="fas fa-external-link-alt text-gray-400 group-hover:text-blue-500 transition-colors text-sm"></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Info */}
            <motion.div 
              className={`bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: inView ? '0.6s' : '0s' }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <i className="fas fa-info-circle mr-3"></i>
                Quick Info
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="fas fa-clock text-blue-200 mr-3"></i>
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-blue-100 text-sm">Usually within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <i className="fas fa-globe-americas text-blue-200 mr-3"></i>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-blue-100 text-sm">Cambridge, MA (EST)</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <i className="fas fa-language text-blue-200 mr-3"></i>
                  <div>
                    <p className="font-medium">Languages</p>
                    <p className="text-blue-100 text-sm">English (Native)</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <i className="fas fa-calendar text-blue-200 mr-3"></i>
                  <div>
                    <p className="font-medium">Availability</p>
                    <p className="text-blue-100 text-sm">Open to new opportunities</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Download Resume CTA */}
            <motion.div 
              className={`bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: inView ? '0.8s' : '0s' }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-file-pdf text-red-500 text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Resume</h3>
              <p className="text-gray-600 text-sm mb-6">
                Get a detailed overview of my experience, skills, and accomplishments.
              </p>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-download mr-2"></i>
                Download PDF
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Additional Contact Options */}
        <motion.div 
          className={`mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: inView ? '1s' : '0s' }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Other Ways to Connect</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prefer a different communication method? Here are additional ways we can connect and collaborate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="text-center p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-video text-blue-600 text-xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Video Call</h4>
              <p className="text-gray-600 text-sm mb-4">
                Schedule a video call for more detailed discussions about projects or collaborations.
              </p>
              <a href="mailto:chirag0728@gmail.com?subject=Video%20Call%20Request" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Schedule a Call
              </a>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-handshake text-green-600 text-xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Consulting</h4>
              <p className="text-gray-600 text-sm mb-4">
                Need cybersecurity expertise for your project? Let's discuss how I can help.
              </p>
              <a href="mailto:chirag0728@gmail.com?subject=Consulting%20Inquiry" className="text-green-600 hover:text-green-700 font-medium text-sm">
                Discuss Consulting
              </a>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-microphone text-purple-600 text-xl"></i>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Speaking</h4>
              <p className="text-gray-600 text-sm mb-4">
                Interested in having me speak at your event or conference about cybersecurity?
              </p>
              <a href="mailto:chirag0728@gmail.com?subject=Speaking%20Engagement" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Invite to Speak
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
                        <AnimatePresence>
                          {validationErrors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-500 text-sm mt-1"
                            >
                              {validationErrors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="email" className="form-label">
                          Email Address *
                        </label>
                        <motion.input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className={`form-input transition-all duration-300 ${
                            validationErrors.email ? 'border-red-500 focus:border-red-500' : 
                            focusedField === 'email' ? 'border-blue-500 shadow-lg' : ''
                          }`}
                          placeholder="john@example.com"
                          whileFocus={{ scale: 1.02 }}
                        />
                        <AnimatePresence>
                          {validationErrors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-red-500 text-sm mt-1"
                            >
                              {validationErrors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Company and Subject Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="form-label">
                          Company/Organization
                        </label>
                        <motion.input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('company')}
                          onBlur={() => setFocusedField(null)}
                          className={`form-input transition-all duration-300 ${
                            focusedField === 'company' ? 'border-blue-500 shadow-lg' : ''
                          }`}
                          placeholder="Acme Corp (Optional)"
                          whileFocus={{ scale: 1.02 }}
                        />
