import React from 'react';

export default function Resume() {
  return (
    <div className="max-w-5xl mx-auto px-6 mt-8 fade-in-up">
      <h1 className="text-3xl font-bold mb-4 heading-glow">Resume</h1>
      <p className="text-gray-300 mb-4">
        You can view or download my resume below.
      </p>
      <div className="w-full h-screen border border-white/10 rounded">
        <iframe
          src="/resume.pdf"
          title="Resume"
          className="w-full h-full"
          frameBorder="0"
        />
      </div>
    </div>
  );
}
