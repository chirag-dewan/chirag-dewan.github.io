import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-apple-gray-50 pt-16 pb-8">
      <div className="container-apple">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-display font-semibold text-apple-gray-900">CD.</span>
            </Link>
            <p className="text-sm text-apple-gray-600 max-w-xs">
              Cyber Research Scientist specializing in innovative security solutions and cutting-edge technology.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="https://github.com/chirag-dewan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors"
                aria-label="GitHub profile"
              >
                <i className="fab fa-github text-lg"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/cdewan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors"
                aria-label="LinkedIn profile"
              >
                <i className="fab fa-linkedin text-lg"></i>
              </a>
              <a
                href="mailto:chirag0728@gmail.com"
                className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors"
                aria-label="Email"
              >
                <i className="fas fa-envelope text-lg"></i>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-apple-gray-900 uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#experience" className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors text-sm">
                  Experience
                </a>
              </li>
              <li>
                <a href="/#skills" className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors text-sm">
                  Skills
                </a>
              </li>
              <li>
                <a href="/#projects" className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors text-sm">
                  Projects
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-apple-gray-900 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/chirag-dewan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors text-sm"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/cdewan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors text-sm"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="/resume.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors text-sm"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-apple-gray-900 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-apple-gray-600">
                Cambridge, MA
              </p>
              <p className="text-sm text-apple-gray-600">
                chirag0728@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-apple-gray-200">
          <p className="text-center text-sm text-apple-gray-500">
            &copy; {currentYear} Chirag Dewan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
