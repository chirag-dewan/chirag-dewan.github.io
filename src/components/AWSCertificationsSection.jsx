import React from 'react';
import { motion } from 'framer-motion';

const AwsCertificationBadge = ({ title, level, issueDate, showLogo = true }) => {
  return (
    <motion.div 
      className="aws-badge rounded-lg p-5 relative overflow-hidden"
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 0 25px rgba(255, 153, 0, 0.5)'
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-center">
        {showLogo && (
          <div className="mr-4 flex-shrink-0">
            <svg width="48" height="48" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M72.376 122.817L57.3 109.213L72.376 95.6082V122.817Z" fill="#FF9900"/>
              <path d="M80.6276 128.319L94.0113 119.301L80.6276 110.283V128.319Z" fill="#FF9900"/>
              <path d="M104.611 138.2L118.651 147.873V108.55L104.611 118.201V138.2Z" fill="#FF9900"/>
              <path d="M127.986 147.865L142.026 138.192V118.193L127.986 108.542V147.865Z" fill="#FF9900"/>
              <path d="M152.587 119.301L166.061 128.319V110.283L152.587 119.301Z" fill="#FF9900"/>
              <path d="M174.302 122.817L189.378 109.213L174.302 95.6082V122.817Z" fill="#FF9900"/>
              <path d="M127.988 0C59.9183 0 4.80273 55.1156 4.80273 123.186C4.80273 164.162 26.4313 200.096 58.5444 220.744L66.2309 198.932C41.2095 182.032 24.6455 151.328 24.6455 123.186C24.6455 66.1228 70.9248 19.8435 127.988 19.8435C185.051 19.8435 231.331 66.1228 231.331 123.186C231.331 147.328 221.457 171.97 203.88 190.114C191.538 203.051 175.777 212.658 158.028 217.501L165.714 239.313C188.103 233.309 208.075 221.196 224.021 204.614C246.246 181.683 251.174 151.301 251.174 123.186C251.174 55.1156 196.058 0 127.988 0Z" fill="#FF9900"/>
              <path d="M158.028 217.501L165.714 239.313C188.103 233.309 208.075 221.196 224.021 204.614L203.88 190.114C191.538 203.051 175.777 212.658 158.028 217.501Z" fill="#FF9900"/>
              <path d="M58.5444 220.744L66.2309 198.932C41.2095 182.032 24.6455 151.328 24.6455 123.186H4.80273C4.80273 164.162 26.4313 200.096 58.5444 220.744Z" fill="#FF9900"/>
              <path d="M251.174 123.186C251.174 151.301 246.246 181.683 224.021 204.614C246.246 181.683 251.174 151.301 251.174 123.186Z" fill="#FF9900"/>
            </svg>
          </div>
        )}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-orange-300 font-medium">{level}</p>
          <p className="text-gray-300 text-sm mt-2">Issued: {issueDate}</p>
        </div>
        <div className="ml-2 px-3 py-1 bg-orange-600/20 border border-orange-500/30 rounded-full text-orange-300 text-xs font-medium">
          Verified
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-tr from-transparent to-orange-500/10 blur-lg"></div>
    </motion.div>
  );
};

const AwsCertificationsSection = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-6 inline-block heading-gradient">
        AWS Certifications
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <AwsCertificationBadge 
          title="AWS Security Specialty" 
          level="Professional Certification"
          issueDate="March 2023"
        />
        
        <AwsCertificationBadge 
          title="AWS Certified Solutions Architect" 
          level="Associate"
          issueDate="January 2023"
        />
        
        <AwsCertificationBadge 
          title="AWS Certified Developer" 
          level="Associate"
          issueDate="November 2022"
        />
        
        <AwsCertificationBadge 
          title="AWS Cloud Practitioner" 
          level="Foundational"
          issueDate="September 2022"
        />
      </div>
      
      <div className="mt-8 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
        <div className="flex items-start">
          <div className="p-2 bg-orange-500/20 rounded-full mr-3">
            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-gray-300 text-sm">
              AWS Certifications verify cloud expertise to help professionals highlight in-demand skills and organizations build effective, innovative teams for cloud initiatives using AWS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwsCertificationsSection;
