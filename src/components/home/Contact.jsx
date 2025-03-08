import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
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
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
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
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you! Your message has been sent successfully.'
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <section id="contact" className="section bg-apple-gray-50">
      <div className="container-apple">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="heading-md text-apple-gray-900">Let's Connect</h2>
          <p className="mt-4 text-lg text-apple-gray-600 max-w-3xl mx-auto">
            Interested in collaboration or have questions about my work? I'm always open to discussing new projects and opportunities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div 
            className={`transition-all duration-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: inView ? '0.2s' : '0s' }}
          >
            <div className="card p-8">
              <h3 className="text-xl font-medium text-apple-gray-900 mb-6">Send a Message</h3>
              
              {formStatus.submitted ? (
                <div className="bg-apple-green/5 border border-apple-green/20 rounded-apple-lg p-6 text-center">
                  <div className="w-16 h-16 bg-apple-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check text-apple-green text-xl"></i>
                  </div>
                  <h4 className="text-lg font-medium text-apple-gray-900 mb-2">Thank You!</h4>
                  <p className="text-apple-gray-600 mb-6">{formStatus.message}</p>
                  <button
                    type="button"
                    onClick={() => setFormStatus({ submitted: false, error: false, message: '' })}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="form-input"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Processing...
                        </>
                      ) : (
                        <>
                          Send Message
                          <i className="fas fa-arrow-right ml-2"></i>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Contact Information */}
          <div 
            className={`transition-all duration-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: inView ? '0.4s' : '0s' }}
          >
            <div className="card p-8 mb-8">
              <h3 className="text-xl font-medium text-apple-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-apple-blue-500/10 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-envelope text-apple-blue-500"></i>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-apple-gray-900">Email</h4>
                    <p className="text-apple-gray-600 mt-1">chirag0728@gmail.com</p>
                    <a 
                      href="mailto:chirag0728@gmail.com" 
                      className="text-apple-blue-500 hover:text-apple-blue-600 inline-flex items-center mt-1 text-sm"
                    >
                      Send an email
                      <i className="fas fa-arrow-right ml-2 text-xs"></i>
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-apple-blue-500/10 rounded-full flex items-center justify-center mr-4">
                    <i className="fab fa-linkedin-in text-apple-blue-500"></i>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-apple-gray-900">LinkedIn</h4>
                    <p className="text-apple-gray-600 mt-1">linkedin.com/in/cdewan</p>
                    <a 
                      href="https://linkedin.com/in/cdewan" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-apple-blue-500 hover:text-apple-blue-600 inline-flex items-center mt-1 text-sm"
                    >
                      Connect with me
                      <i className="fas fa-arrow-right ml-2 text-xs"></i>
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-apple-blue-500/10 rounded-full flex items-center justify-center mr-4">
                    <i className="fab fa-github text-apple-blue-500"></i>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-apple-gray-900">GitHub</h4>
                    <p className="text-apple-gray-600 mt-1">github.com/chirag-dewan</p>
                    <a 
                      href="https://github.com/chirag-dewan" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-apple-blue-500 hover:text-apple-blue-600 inline-flex items-center mt-1 text-sm"
                    >
                      View my projects
                      <i className="fas fa-arrow-right ml-2 text-xs"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-8">
              <h3 className="text-xl font-medium text-apple-gray-900 mb-6">Location</h3>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 bg-apple-blue-500/10 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-map-marker-alt text-apple-blue-500"></i>
                </div>
                <div>
                  <h4 className="text-base font-medium text-apple-gray-900">Cambridge, MA</h4>
                  <p className="text-apple-gray-600 mt-1">Boston Metropolitan Area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
