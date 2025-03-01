import React from 'react';
import ContactSection from '../components/ContactSection';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Page header with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold gradient-text text-glow mb-4">Get In Touch</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          I'm always open to discussing new projects, cybersecurity challenges, or potential collaborations.
        </p>
      </motion.div>
      
      {/* Contact form section */}
      <ContactSection />
      
      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FaqItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

// Animated FAQ Item Component
const FaqItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <motion.div
      className="glass-card rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <button
        className="w-full px-6 py-4 flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <svg
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-4 text-gray-300">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

// FAQ data
const faqs = [
  {
    question: "What cybersecurity services do you specialize in?",
    answer: "I specialize in vulnerability research, penetration testing, malware analysis, and secure software development with a focus on critical infrastructure systems and network security."
  },
  {
    question: "Are you available for freelance or consulting work?",
    answer: "Yes, I'm open to selective freelance and consulting opportunities, particularly in the areas of security architecture review, code auditing, and threat modeling."
  },
  {
    question: "Do you offer security training or workshops?",
    answer: "I occasionally conduct workshops on specific security topics such as threat modeling, secure coding practices, and malware analysis techniques. Please reach out with specific requests."
  },
  {
    question: "What's your approach to responsible disclosure?",
    answer: "I follow industry standard responsible disclosure practices, typically providing organizations with 90 days to address vulnerabilities before public disclosure, and I'm always willing to work with security teams to help remediate issues."
  },
  {
    question: "How can we collaborate on cybersecurity research?",
    answer: "I'm open to collaborative research in areas like vulnerability discovery, threat intelligence, and tool development. Please reach out with a brief overview of your research interests, and we can discuss potential collaboration opportunities."
  }
];

export default Contact;
