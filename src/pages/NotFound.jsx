import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="max-w-md">
        <div className="mb-8">
          <span className="text-8xl font-display font-bold text-apple-gray-900">404</span>
        </div>
        
        <h1 className="text-3xl font-display font-bold text-apple-gray-900 mb-4">Page Not Found</h1>
        
        <p className="text-apple-gray-600 mb-10 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved to another location.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <i className="fas fa-home mr-2"></i>
            Back to Home
          </Link>
          
          <Link to="/contact" className="btn-secondary">
            <i className="fas fa-envelope mr-2"></i>
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
