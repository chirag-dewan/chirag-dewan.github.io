import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { getBlogPost, getRelatedPosts } from '../data/blogPosts';

// Reading progress hook
const useReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
};

// Function to generate table of contents from content
const generateTableOfContents = (content) => {
  const headings = [];
  const headingRegex = /<h([2-4])>(.*?)<\/h[2-4]>/g;
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, ''); // Remove any HTML tags
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    headings.push({ level, text, id });
  }
  
  return headings;
};

// Function to add markdown indicators and IDs to content
const addMarkdownIndicators = (content) => {
  return content
    .replace(/<h2>(.*?)<\/h2>/g, (match, text) => {
      const id = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<h2 id="${id}"><span style="color: rgb(107 114 128); margin-right: 0.75rem; font-family: ui-monospace, monospace;">##</span>${text}</h2>`;
    })
    .replace(/<h3>(.*?)<\/h3>/g, (match, text) => {
      const id = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<h3 id="${id}"><span style="color: rgb(107 114 128); margin-right: 0.75rem; font-family: ui-monospace, monospace;">###</span>${text}</h3>`;
    })
    .replace(/<h4>(.*?)<\/h4>/g, (match, text) => {
      const id = text.replace(/<[^>]*>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<h4 id="${id}"><span style="color: rgb(107 114 128); margin-right: 0.75rem; font-family: ui-monospace, monospace;">####</span>${text}</h4>`;
    })
    .replace(/<h5>/g, '<h5><span style="color: rgb(107 114 128); margin-right: 0.75rem; font-family: ui-monospace, monospace;">#####</span>')
    .replace(/<h6>/g, '<h6><span style="color: rgb(107 114 128); margin-right: 0.75rem; font-family: ui-monospace, monospace;">######</span>')
    .replace(/<li>/g, '<li><span style="color: rgb(96 165 250); margin-right: 0.75rem; font-weight: bold;">-</span>')
    .replace(/<blockquote>/g, '<blockquote><span style="color: rgb(96 165 250); margin-right: 0.75rem; font-weight: bold;">&gt;</span>');
};

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeHeading, setActiveHeading] = useState('');
  const [showToc, setShowToc] = useState(false);
  const progress = useReadingProgress();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Track active heading for TOC
  useEffect(() => {
    if (!post) return;

    const headings = document.querySelectorAll('h2, h3, h4');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [post]);


  useEffect(() => {
    // Load blog post data immediately
    setLoading(true);
    
    // Get post from imported data
    const foundPost = getBlogPost(postId);
    setPost(foundPost || null);
    setLoading(false);
  }, [postId]);

  // Get related posts using the imported function
  const relatedPostsList = post ? getRelatedPosts(postId, 2) : [];

  if (loading) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-black font-mono relative">
        {/* Loading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 animate-pulse" />
        </div>
        
        <div className="container-apple">
          {/* Loading Skeleton */}
          <div className="max-w-6xl mx-auto">
            {/* Header Skeleton */}
            <div className="mb-12 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-24 mb-4"></div>
              <div className="h-8 bg-gray-700 rounded w-32 mb-4"></div>
              <div className="h-16 bg-gray-700 rounded w-full mb-6"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-16"></div>
                </div>
              </div>
            </div>
            
            {/* Terminal Window Skeleton */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-gray-800 p-4 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="h-4 bg-gray-600 rounded w-48 mx-auto"></div>
                </div>
                <div className="h-4 bg-gray-600 rounded w-20"></div>
              </div>
              
              {/* Content Area */}
              <div className="flex">
                {/* Line Numbers */}
                <div className="bg-gray-800 border-r border-gray-700 px-4 py-6 w-20">
                  <div className="space-y-6">
                    {Array.from({ length: 15 }, (_, i) => (
                      <div key={i} className="h-3 bg-gray-600 rounded animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="flex-1 p-8 space-y-8">
                  {/* YAML Header */}
                  <div className="space-y-2">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div key={i} className="h-3 bg-gray-700 rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%`, animationDelay: `${i * 0.15}s` }}></div>
                    ))}
                  </div>
                  
                  {/* TL;DR Box */}
                  <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-600 rounded-full animate-pulse"></div>
                      <div className="h-6 bg-gray-600 rounded w-20 animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-600 rounded w-4/5 animate-pulse"></div>
                      <div className="h-4 bg-gray-600 rounded w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Content Paragraphs */}
                  <div className="space-y-6">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div key={i} className="space-y-3">
                        {i % 3 === 0 && <div className="h-6 bg-gray-600 rounded w-1/3 animate-pulse"></div>}
                        <div className="h-4 bg-gray-700 rounded animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                        <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse" style={{ animationDelay: `${i * 0.2 + 0.1}s` }}></div>
                        <div className="h-4 bg-gray-700 rounded w-4/5 animate-pulse" style={{ animationDelay: `${i * 0.2 + 0.2}s` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="text-center mt-12">
            <div className="flex items-center justify-center gap-3 text-blue-400 font-mono">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span className="ml-3">Loading cybersecurity insights...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-28 pb-20">
        <div className="container-apple">
          <div className="text-center py-20">
            <h1 className="heading-md text-apple-gray-900 mb-6">Post Not Found</h1>
            <p className="text-lg text-apple-gray-600 max-w-xl mx-auto mb-8">
              Sorry, the blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/blog" className="btn-primary">
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="pt-28 pb-20 min-h-screen bg-black font-mono relative">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Table of Contents Toggle */}
      <div className="fixed bottom-8 left-8 z-40">
        <button
          onClick={() => setShowToc(!showToc)}
          className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-2xl hover:border-blue-500/50 transition-all duration-300 group"
          title="Table of Contents"
        >
          <div className="flex items-center gap-3">
            <i className={`fas fa-${showToc ? 'times' : 'list'} text-blue-400 group-hover:scale-110 transition-transform`}></i>
            <span className="text-xs font-mono text-gray-400">TOC</span>
          </div>
        </button>
        
        {/* Table of Contents Panel */}
        {showToc && post && (
          <div className="absolute bottom-16 left-0 w-80 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-sm font-bold text-blue-400 font-mono flex items-center gap-2">
                <i className="fas fa-bookmark"></i>
                Table of Contents
              </h3>
            </div>
            <div className="p-4 space-y-2">
              {generateTableOfContents(post.content).map((heading, index) => (
                <a
                  key={index}
                  href={`#${heading.id}`}
                  className={`block py-2 px-3 text-sm font-mono rounded transition-all duration-200 ${
                    activeHeading === heading.id
                      ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-400'
                      : 'text-gray-400 hover:text-blue-400 hover:bg-gray-800/50'
                  }`}
                  style={{ paddingLeft: `${(heading.level - 2) * 12 + 12}px` }}
                  onClick={() => setShowToc(false)}
                >
                  <span className="text-gray-500 mr-2">
                    {'#'.repeat(heading.level)}
                  </span>
                  {heading.text}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Reading Progress Indicator */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgb(75 85 99)"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgb(59 130 246)"
                  strokeWidth="2"
                  strokeDasharray={`${progress}, 100`}
                  className="transition-all duration-150"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-mono text-blue-400 font-bold">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
            <div className="text-xs font-mono text-gray-400">
              <div>Reading</div>
              <div>Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Sharing Panel */}
      <div className="fixed top-1/2 right-4 z-40 transform -translate-y-1/2">
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              // Show toast notification
              const toast = document.createElement('div');
              toast.className = 'fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 font-mono text-sm';
              toast.textContent = '✓ Link copied!';
              document.body.appendChild(toast);
              setTimeout(() => toast.remove(), 2000);
            }}
            className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl hover:border-blue-500/50 transition-all duration-300 group"
            title="Copy Link"
          >
            <i className="fas fa-link text-gray-400 group-hover:text-blue-400 transition-colors"></i>
          </button>
          
          <button
            onClick={() => {
              const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post?.title || '')}&url=${encodeURIComponent(window.location.href)}`;
              window.open(url, '_blank');
            }}
            className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl hover:border-blue-500/50 transition-all duration-300 group"
            title="Share on Twitter"
          >
            <i className="fab fa-twitter text-gray-400 group-hover:text-blue-400 transition-colors"></i>
          </button>
          
          <button
            onClick={() => {
              const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
              window.open(url, '_blank');
            }}
            className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl hover:border-blue-500/50 transition-all duration-300 group"
            title="Share on LinkedIn"
          >
            <i className="fab fa-linkedin text-gray-400 group-hover:text-blue-400 transition-colors"></i>
          </button>
          
          <button
            onClick={() => {
              if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
              }
            }}
            className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl hover:border-green-500/50 transition-all duration-300 group"
            title="Fullscreen Reading"
          >
            <i className="fas fa-expand text-gray-400 group-hover:text-green-400 transition-colors"></i>
          </button>
          
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-xl hover:border-purple-500/50 transition-all duration-300 group"
            title="Back to Top"
          >
            <i className="fas fa-arrow-up text-gray-400 group-hover:text-purple-400 transition-colors"></i>
          </button>
        </div>
      </div>
      
      <article className="section">
        <div className="container-apple">
          {/* Post Header */}
          <div 
            ref={ref}
            className={`max-w-4xl mx-auto mb-12 transition-all duration-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="mb-6">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                <i className="fas fa-arrow-left mr-2 text-xs"></i>
                Back to Blog
              </Link>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              <span className="text-gray-400 text-sm">{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
            
            <div className="flex items-center gap-4 mt-6">
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <p className="font-medium text-white text-lg">{post.author}</p>
                <p className="text-base text-gray-400">{post.date}</p>
              </div>
            </div>
          </div>
          
          {/* Featured Image (placeholder) */}
          <div 
            className={`max-w-4xl mx-auto mb-12 h-64 sm:h-80 md:h-96 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-500 border border-gray-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="text-9xl">{post.image}</span>
          </div>
          
          {/* Post Content */}
          <div 
            className={`max-w-6xl mx-auto transition-all duration-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            {/* Enhanced Terminal-style header */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-t-lg p-4 flex items-center gap-2 shadow-2xl">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer" title="Close"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer" title="Minimize"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer animate-pulse" title="Fullscreen"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-gray-300 text-sm font-mono bg-gray-800/50 px-3 py-1 rounded-md border border-gray-600">
                  📝 {post.title.toLowerCase().replace(/\s+/g, '-')}.md
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-mono bg-gray-800/50 px-3 py-1 rounded-md border border-gray-600">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
                <div className="text-gray-400 text-sm font-mono bg-gray-800/50 px-3 py-1 rounded-md border border-gray-600">
                  <i className="fas fa-clock mr-2"></i>
                  {post.readTime}
                </div>
              </div>
            </div>
            
            {/* Content with line numbers */}
            <div className="bg-gray-900 border-x border-b border-gray-700 rounded-b-lg overflow-hidden">
              <div className="flex">
                {/* Enhanced Line numbers sidebar */}
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 border-r border-gray-600 px-4 py-6 select-none relative overflow-hidden">
                  {/* Subtle grid pattern */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                    backgroundSize: '20px 20px'
                  }}></div>
                  
                  <div className="text-gray-500 text-sm font-mono leading-relaxed space-y-4 relative z-10">
                    {(() => {
                      // Calculate precise line count based on actual content elements
                      const yamlLines = 8; // YAML frontmatter
                      const tldrLines = 4; // TL;DR section
                      const contentElements = post.content.split(/<\/p>|<\/h[1-6]>|<\/li>|<\/blockquote>|<\/ul>|<\/ol>/).filter(el => el.trim().length > 0);
                      const footerLines = 6; // Footer section
                      const totalLines = yamlLines + tldrLines + contentElements.length + footerLines;
                      
                      return Array.from({ length: totalLines }, (_, i) => (
                        <div 
                          key={i + 1} 
                          className="text-right min-w-[3rem] hover:text-blue-400 hover:bg-blue-900/20 px-2 py-1 rounded transition-all duration-200 cursor-pointer group"
                          title={`Line ${i + 1}`}
                        >
                          <span className="group-hover:font-bold">
                            {String(i + 1).padStart(3, '0')}
                          </span>
                        </div>
                      ));
                    })()}
                  </div>
                  
                  {/* Scroll indicator */}
                  <div className="absolute right-1 top-6 bottom-6 w-1 bg-gray-700 rounded-full">
                    <div className="w-full h-8 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Main content */}
                <div className="flex-1 py-6 px-8">
                  {/* Markdown metadata header */}
                  <div className="border-b border-gray-700 pb-6 mb-8">
                    <div className="text-gray-500 font-mono text-sm space-y-1">
                      <div>---</div>
                      <div><span className="text-blue-400">title:</span> "{post.title}"</div>
                      <div><span className="text-blue-400">author:</span> "{post.author}"</div>
                      <div><span className="text-blue-400">date:</span> {post.date}</div>
                      <div><span className="text-blue-400">category:</span> {post.category}</div>
                      <div><span className="text-blue-400">tags:</span> [{post.tags.map(tag => `"${tag}"`).join(', ')}]</div>
                      <div><span className="text-blue-400">readTime:</span> "{post.readTime}"</div>
                      <div>---</div>
                    </div>
                  </div>
                  
                  {/* Enhanced TL;DR section */}
                  <div className="mb-12 p-8 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-blue-900/40 border border-blue-500/40 rounded-xl shadow-2xl relative overflow-hidden group hover:border-blue-400/60 transition-all duration-300">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating particles */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
                          <span className="text-2xl">🎯</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-blue-400 font-mono mb-1">TL;DR</h3>
                          <p className="text-xs text-gray-400 font-mono">Too Long; Didn't Read</p>
                        </div>
                        <div className="ml-auto">
                          <div className="flex items-center gap-2 text-xs text-gray-400 font-mono bg-gray-800/50 px-3 py-1 rounded-full">
                            <i className="fas fa-stopwatch"></i>
                            <span>30s read</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-200 font-mono text-lg leading-relaxed pl-1 border-l-4 border-blue-400/50 ml-6">
                        {post.summary}
                      </p>
                      
                      {/* Quick stats */}
                      <div className="mt-6 flex flex-wrap gap-4 text-sm font-mono">
                        <div className="flex items-center gap-2 text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">
                          <i className="fas fa-brain"></i>
                          <span>AI Security</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-400 bg-purple-900/30 px-3 py-1 rounded-full">
                          <i className="fas fa-shield-alt"></i>
                          <span>Cyber Defense</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400 bg-green-900/30 px-3 py-1 rounded-full">
                          <i className="fas fa-lightbulb"></i>
                          <span>Research</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="prose prose-xl max-w-none font-mono
                      prose-headings:text-white prose-headings:font-bold prose-headings:mb-12 prose-headings:mt-20
                      prose-h1:text-5xl prose-h1:mb-10 prose-h1:mt-0 prose-h1:border-b prose-h1:border-gradient-to-r prose-h1:from-blue-500 prose-h1:to-purple-500 prose-h1:pb-8 prose-h1:bg-gradient-to-r prose-h1:from-blue-400 prose-h1:to-purple-400 prose-h1:bg-clip-text prose-h1:text-transparent
                      prose-h2:text-4xl prose-h2:border-b prose-h2:border-gray-600 prose-h2:pb-6 prose-h2:leading-tight prose-h2:mt-24 prose-h2:mb-16 prose-h2:bg-gradient-to-r prose-h2:from-white prose-h2:to-blue-200 prose-h2:bg-clip-text prose-h2:text-transparent prose-h2:shadow-lg
                      prose-h3:text-3xl prose-h3:text-blue-400 prose-h3:mb-10 prose-h3:mt-20 prose-h3:relative prose-h3:pl-8
                      prose-h4:text-2xl prose-h4:text-blue-300 prose-h4:mb-8 prose-h4:mt-16 prose-h4:relative prose-h4:pl-6
                      prose-h5:text-xl prose-h5:text-blue-200 prose-h5:mb-6 prose-h5:mt-12
                      prose-h6:text-lg prose-h6:text-gray-300 prose-h6:mb-4 prose-h6:mt-8
                      prose-p:text-gray-200 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-p:indent-0 prose-p:relative
                      prose-ul:text-gray-200 prose-ul:text-lg prose-ul:my-6 prose-li:mb-4 prose-li:leading-relaxed prose-li:pl-4 prose-li:relative prose-li:hover:bg-gray-800/30 prose-li:hover:rounded prose-li:transition-all prose-li:p-2 prose-li:border-l-2 prose-li:border-transparent hover:prose-li:border-blue-400/50
                      prose-ol:text-gray-200 prose-ol:text-lg prose-ol:my-6
                      prose-strong:text-white prose-strong:font-bold prose-strong:bg-gradient-to-r prose-strong:from-blue-600/20 prose-strong:to-purple-600/20 prose-strong:px-2 prose-strong:py-1 prose-strong:rounded prose-strong:border prose-strong:border-blue-500/30
                      prose-em:text-yellow-300 prose-em:not-italic prose-em:font-bold prose-em:bg-yellow-500/20 prose-em:px-1 prose-em:rounded
                      prose-code:bg-gradient-to-r prose-code:from-gray-800 prose-code:to-gray-900 prose-code:text-green-400 prose-code:px-4 prose-code:py-2 prose-code:rounded-lg prose-code:text-base prose-code:border prose-code:border-gray-700 prose-code:shadow-lg prose-code:font-bold
                      prose-pre:bg-gradient-to-br prose-pre:from-gray-900 prose-pre:via-gray-800 prose-pre:to-gray-900 prose-pre:border prose-pre:border-gray-600 prose-pre:p-8 prose-pre:rounded-xl prose-pre:my-8 prose-pre:shadow-2xl prose-pre:relative
                      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 prose-a:font-bold prose-a:underline prose-a:underline-offset-4 prose-a:decoration-blue-400/50 hover:prose-a:decoration-blue-300 prose-a:transition-all prose-a:duration-200
                      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-8 prose-blockquote:py-6 prose-blockquote:text-gray-300 prose-blockquote:bg-gradient-to-r prose-blockquote:from-blue-900/20 prose-blockquote:to-purple-900/10 prose-blockquote:rounded-r-xl prose-blockquote:my-6 prose-blockquote:shadow-lg prose-blockquote:relative
                      prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-8 prose-img:border prose-img:border-gray-700
                      prose-table:text-gray-200 prose-thead:text-white prose-th:border-gray-600 prose-td:border-gray-700 prose-table:bg-gray-800/50 prose-table:rounded-lg
                      [&>*:first-child]:mt-0
                      [&_h2]:scroll-mt-32
                      [&_h3]:scroll-mt-32
                      [&_h4]:scroll-mt-32
                      [&_p]:font-mono
                      [&_li]:font-mono
                      [&_h3::before]:content-['▸'] [&_h3::before]:absolute [&_h3::before]:left-0 [&_h3::before]:text-blue-500 [&_h3::before]:font-bold
                      [&_h4::before]:content-['‣'] [&_h4::before]:absolute [&_h4::before]:left-0 [&_h4::before]:text-blue-400 [&_h4::before]:font-bold
                      [&_p]:first-letter:text-3xl [&_p]:first-letter:font-bold [&_p]:first-letter:text-blue-400 [&_p]:first-letter:mr-2 [&_p]:first-letter:float-left [&_p]:first-letter:leading-none"
                    dangerouslySetInnerHTML={{ __html: addMarkdownIndicators(post.content) }} 
                  />
                  
                  {/* Enhanced footer section */}
                  <div className="mt-24 pt-8 border-t border-gradient-to-r from-blue-500/50 to-purple-500/50">
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-500/30 rounded-lg p-4 hover:border-green-400/50 transition-all duration-300 group">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse group-hover:animate-spin"></div>
                          <span className="text-green-400 font-mono text-sm font-bold">SAVED</span>
                        </div>
                        <p className="text-gray-300 font-mono text-xs mt-2">{new Date().toLocaleString()}</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/30 rounded-lg p-4 hover:border-blue-400/50 transition-all duration-300 group">
                        <div className="flex items-center gap-3">
                          <i className="fas fa-file-word text-blue-400 group-hover:scale-110 transition-transform"></i>
                          <span className="text-blue-400 font-mono text-sm font-bold">WORDS</span>
                        </div>
                        <p className="text-gray-300 font-mono text-xs mt-2">{post.content.split(' ').length.toLocaleString()}</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-500/30 rounded-lg p-4 hover:border-purple-400/50 transition-all duration-300 group">
                        <div className="flex items-center gap-3">
                          <i className="fas fa-clock text-purple-400 group-hover:rotate-180 transition-transform duration-500"></i>
                          <span className="text-purple-400 font-mono text-sm font-bold">TIME</span>
                        </div>
                        <p className="text-gray-300 font-mono text-xs mt-2">{post.readTime}</p>
                      </div>
                      
                      <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border border-yellow-500/30 rounded-lg p-4 hover:border-yellow-400/50 transition-all duration-300 group">
                        <div className="flex items-center gap-3">
                          <i className="fas fa-tags text-yellow-400 group-hover:scale-110 transition-transform"></i>
                          <span className="text-yellow-400 font-mono text-sm font-bold">TAGS</span>
                        </div>
                        <p className="text-gray-300 font-mono text-xs mt-2">{post.tags.length} topics</p>
                      </div>
                    </div>
                    
                    {/* Enhanced Git-style commit info */}
                    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-600 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 20px)',
                          animation: 'slide 20s linear infinite'
                        }}></div>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 text-sm font-mono text-gray-300">
                              <span className="text-green-400 font-bold">commit</span>
                              <span className="text-yellow-400 font-mono bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/30">a7f8d2e</span>
                              <span className="text-gray-400">({new Date().toISOString().split('T')[0]})</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-xs font-mono">COMMITTED</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm font-mono">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Author:</span>
                            <span className="text-blue-400">{post.author}</span>
                            <span className="text-gray-500">&lt;{post.author.toLowerCase().replace(' ', '.')}@cybersec.dev&gt;</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">Date:</span>
                            <span className="text-gray-300">{new Date().toISOString()}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                            <i className="fas fa-plus text-green-400"></i>
                            <span className="text-white font-bold">Add: {post.title}</span>
                          </div>
                        </div>
                        
                        {/* Diff-style stats */}
                        <div className="mt-6 flex items-center gap-6 text-sm font-mono">
                          <div className="flex items-center gap-2">
                            <span className="text-green-400">+{Math.floor(post.content.split(' ').length * 0.8)}</span>
                            <span className="text-gray-400">additions</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-red-400">-{Math.floor(post.content.split(' ').length * 0.1)}</span>
                            <span className="text-gray-400">deletions</span>
                          </div>
                          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-red-500" style={{width: '90%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Author Bio */}
          <div 
            className={`max-w-3xl mx-auto mt-16 p-8 bg-gray-800 border border-gray-700 rounded-lg transition-all duration-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-gray-300 flex-shrink-0 mx-auto sm:mx-0">
                <i className="fas fa-user text-2xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-medium text-white mb-4 text-center sm:text-left">About the Author</h3>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  Chirag Dewan is a Cyber Research Scientist specializing in security solutions and cutting-edge technology. With experience in vulnerability research and threat analysis, he regularly writes about cybersecurity topics and emerging technologies.
                </p>
                <div className="flex space-x-4 justify-center sm:justify-start">
                  <a
                    href="https://github.com/chirag-dewan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <i className="fab fa-github text-lg"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/cdewan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <i className="fab fa-linkedin text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Posts */}
          {relatedPostsList.length > 0 && (
            <div 
              className={`max-w-4xl mx-auto mt-20 transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.5s' }}
            >
              <h2 className="text-3xl font-bold text-white mb-10 text-center">Related Articles</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPostsList.map((relatedPost, index) => (
                  <div
                    key={relatedPost.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden h-full flex flex-col hover:border-gray-600 transition-colors"
                  >
                    {/* Post image/icon placeholder */}
                    <div className="h-40 bg-gray-700 flex items-center justify-center">
                      <span className="text-4xl">{relatedPost.image}</span>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs">
                          {relatedPost.category.charAt(0).toUpperCase() + relatedPost.category.slice(1)}
                        </span>
                        <span className="text-gray-400 text-sm">{relatedPost.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-medium text-white mb-3 leading-tight">{relatedPost.title}</h3>
                      <p className="text-base text-gray-400 mb-4">{relatedPost.date}</p>
                      
                      <div className="mt-auto">
                        <Link 
                          to={`/blog/${relatedPost.id}`} 
                          className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Read Article
                          <i className="fas fa-arrow-right ml-2 text-xs"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Back to Blog Button */}
          <div 
            className={`max-w-4xl mx-auto mt-16 text-center transition-all duration-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            <Link to="/blog" className="btn-primary">
              Explore More Articles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
