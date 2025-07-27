import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { getBlogPost, getRelatedPosts } from '../data/blogPosts';

// Function to add markdown indicators to content
const addMarkdownIndicators = (content) => {
  return content
    .replace(/<h2>/g, '<h2><span style="color: rgb(107 114 128); margin-right: 0.75rem; font-family: ui-monospace, monospace;">##</span>')
    .replace(/<h3>/g, '<h3><span style="color: rgb(107 114 128); margin-right: 0.75rem; font-family: ui-monospace, monospace;">###</span>')
    .replace(/<h4>/g, '<h4><span style="color: rgb(107 114 128); margin-right: 0.75rem; font-family: ui-monospace, monospace;">####</span>')
    .replace(/<h5>/g, '<h5><span style="color: rgb(107 114 128); margin-right: 0.75rem; font-family: ui-monospace, monospace;">#####</span>')
    .replace(/<h6>/g, '<h6><span style="color: rgb(107 114 128); margin-right: 0.75rem; font-family: ui-monospace, monospace;">######</span>')
    .replace(/<li>/g, '<li><span style="color: rgb(96 165 250); margin-right: 0.75rem; font-weight: bold;">-</span>')
    .replace(/<blockquote>/g, '<blockquote><span style="color: rgb(96 165 250); margin-right: 0.75rem; font-weight: bold;">&gt;</span>');
};

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });


  useEffect(() => {
    // Load blog post data
    setLoading(true);
    
    // Get post from imported data
    setTimeout(() => {
      const foundPost = getBlogPost(postId);
      setPost(foundPost || null);
      setLoading(false);
    }, 300);
  }, [postId]);

  // Get related posts using the imported function
  const relatedPostsList = post ? getRelatedPosts(postId, 2) : [];

  if (loading) {
    return (
      <div className="pt-28 pb-20">
        <div className="container-apple">
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="animate-pulse text-apple-gray-500">
              <i className="fas fa-spinner fa-spin text-3xl"></i>
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
    <div className="pt-28 pb-20 min-h-screen bg-black font-mono">
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
            className={`max-w-5xl mx-auto transition-all duration-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            {/* Terminal-style header */}
            <div className="bg-gray-900 border border-gray-700 rounded-t-lg p-4 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-gray-400 text-sm font-mono">
                  📝 {post.title.toLowerCase().replace(/\s+/g, '-')}.md
                </span>
              </div>
              <div className="text-gray-400 text-sm font-mono">
                <i className="fas fa-code mr-2"></i>
                {post.readTime}
              </div>
            </div>
            
            {/* Content with line numbers */}
            <div className="bg-gray-900 border-x border-b border-gray-700 rounded-b-lg overflow-hidden">
              <div className="flex">
                {/* Line numbers sidebar */}
                <div className="bg-gray-800 border-r border-gray-700 px-4 py-6 select-none">
                  <div className="text-gray-500 text-sm font-mono leading-relaxed space-y-6">
                    {(() => {
                      // Calculate approximate line count based on content
                      const contentLines = post.content.split(/<\/p>|<\/h[1-6]>|<\/li>|<\/blockquote>/).length;
                      const metadataLines = 10; // YAML frontmatter + TL;DR section
                      const totalLines = Math.max(25, contentLines + metadataLines);
                      
                      return Array.from({ length: totalLines }, (_, i) => (
                        <div key={i + 1} className="text-right min-w-[2rem]">
                          {String(i + 1).padStart(3, '0')}
                        </div>
                      ));
                    })()}
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
                  
                  {/* Creative intro section */}
                  <div className="mb-10 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">🎯</span>
                      <h3 className="text-xl font-bold text-blue-400 font-mono">TL;DR</h3>
                    </div>
                    <p className="text-gray-300 font-mono text-lg leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  
                  <div 
                    className="prose prose-xl max-w-none font-mono
                      prose-headings:text-white prose-headings:font-bold prose-headings:mb-10 prose-headings:mt-16
                      prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-0 prose-h1:border-b prose-h1:border-gray-600 prose-h1:pb-6
                      prose-h2:text-3xl prose-h2:border-b prose-h2:border-gray-600 prose-h2:pb-4 prose-h2:leading-tight prose-h2:mt-20 prose-h2:mb-12
                      prose-h3:text-2xl prose-h3:text-blue-400 prose-h3:mb-8 prose-h3:mt-16
                      prose-h4:text-xl prose-h4:text-blue-300 prose-h4:mb-6 prose-h4:mt-12
                      prose-h5:text-lg prose-h5:text-blue-200 prose-h5:mb-4 prose-h5:mt-8
                      prose-h6:text-base prose-h6:text-gray-300 prose-h6:mb-3 prose-h6:mt-6
                      prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg prose-p:indent-0
                      prose-ul:text-gray-300 prose-ul:text-lg prose-ul:my-8 prose-li:mb-4 prose-li:leading-relaxed prose-li:pl-2
                      prose-ol:text-gray-300 prose-ol:text-lg prose-ol:my-8
                      prose-strong:text-white prose-strong:font-semibold prose-strong:bg-gray-800/50 prose-strong:px-1 prose-strong:rounded
                      prose-em:text-yellow-300 prose-em:not-italic prose-em:font-semibold
                      prose-code:bg-gray-800 prose-code:text-green-400 prose-code:px-3 prose-code:py-1 prose-code:rounded prose-code:text-base
                      prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:p-8 prose-pre:rounded-lg prose-pre:my-10 prose-pre:shadow-lg
                      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 prose-a:font-semibold prose-a:underline prose-a:underline-offset-4 prose-a:decoration-blue-400/50
                      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-8 prose-blockquote:py-4 prose-blockquote:text-gray-400 prose-blockquote:bg-blue-900/10 prose-blockquote:rounded-r-lg prose-blockquote:my-8
                      prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
                      prose-table:text-gray-300 prose-thead:text-white prose-th:border-gray-600 prose-td:border-gray-700
                      [&>*:first-child]:mt-0
                      [&_h2]:scroll-mt-28
                      [&_h3]:scroll-mt-28
                      [&_h4]:scroll-mt-28
                      [&_p]:font-mono
                      [&_li]:font-mono
                      [&_p]:first-letter:text-2xl [&_p]:first-letter:font-bold [&_p]:first-letter:text-blue-400 [&_p]:first-letter:mr-1"
                    dangerouslySetInnerHTML={{ __html: addMarkdownIndicators(post.content) }} 
                  />
                  
                  {/* Creative footer section */}
                  <div className="mt-20 pt-8 border-t border-gray-700">
                    <div className="flex flex-wrap items-center gap-6 text-gray-400 font-mono text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        💾 Last saved: {new Date().toLocaleString()}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span>📊 {post.content.split(' ').length} words</span>
                      <span className="text-gray-600">•</span>
                      <span>⚡ {post.readTime}</span>
                      <span className="text-gray-600">•</span>
                      <span>🎯 {post.tags.length} tags</span>
                      <span className="text-gray-600">•</span>
                      <span>📅 {post.date}</span>
                    </div>
                    
                    {/* Git-style commit info */}
                    <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                        <span className="text-green-400">commit</span>
                        <span className="text-yellow-400">a7f8d2e</span>
                        <span>({new Date().toISOString().split('T')[0]})</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-300 font-mono">
                        Author: {post.author} &lt;author@cybersec.dev&gt;
                      </div>
                      <div className="mt-1 text-xs text-gray-300 font-mono">
                        Date: {new Date().toISOString()}
                      </div>
                      <div className="mt-3 text-sm text-white font-mono">
                        📝 Add: {post.title}
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
