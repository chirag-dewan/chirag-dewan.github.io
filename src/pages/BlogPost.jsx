import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { getBlogPost, getRelatedPosts } from '../data/blogPosts';

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
            className={`max-w-3xl mx-auto transition-all duration-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            <div 
              className="prose prose-xl max-w-none font-mono
                prose-headings:text-white prose-headings:font-bold prose-headings:mb-8 prose-headings:mt-12
                prose-h2:text-3xl prose-h2:border-b prose-h2:border-gray-600 prose-h2:pb-4 prose-h2:leading-tight
                prose-h3:text-2xl prose-h3:text-blue-400 prose-h3:mb-6 prose-h3:mt-10
                prose-h4:text-xl prose-h4:text-blue-300 prose-h4:mb-4 prose-h4:mt-8
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg
                prose-ul:text-gray-300 prose-ul:text-lg prose-li:mb-3 prose-li:leading-relaxed prose-li:pl-2
                prose-ol:text-gray-300 prose-ol:text-lg
                prose-strong:text-white prose-strong:font-semibold
                prose-code:bg-gray-800 prose-code:text-green-400 prose-code:px-3 prose-code:py-1 prose-code:rounded prose-code:text-base
                prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:p-6 prose-pre:rounded-lg
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:text-gray-400
                [&>*:first-child]:mt-0
                [&_h2]:scroll-mt-28
                [&_h3]:scroll-mt-28
                [&_p]:font-mono
                [&_li]:font-mono"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
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
