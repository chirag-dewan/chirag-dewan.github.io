import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Sample blog posts data (in a real app, this would come from an API)
  const blogPostsData = {
    'understanding-memory-safety': {
      title: 'Understanding Memory Safety in Modern Systems',
      date: 'March 2, 2025',
      author: 'Chirag Dewan',
      category: 'security',
      readTime: '6 min read',
      image: '🔒',
      content: `
        <p>Memory safety vulnerabilities continue to be one of the most significant sources of critical security issues in modern systems. This article explores the nature of these vulnerabilities, their impact, and how modern programming languages and tools are addressing them.</p>
        
        <h2>The Memory Safety Problem</h2>
        
        <p>Memory safety vulnerabilities, including buffer overflows, use-after-free, and null pointer dereferences, have been responsible for countless security breaches over the past decades. According to industry reports, memory safety issues account for approximately 70% of all vulnerabilities in major software systems.</p>
        
        <p>These vulnerabilities are particularly common in systems written in languages like C and C++, which provide direct memory access without built-in safeguards. While this approach offers performance benefits, it places a significant burden on developers to manage memory correctly.</p>
        
        <h2>Common Memory Safety Vulnerabilities</h2>
        
        <ul>
          <li><strong>Buffer Overflows</strong>: Occur when a program writes data beyond the allocated memory buffer's bounds</li>
          <li><strong>Use-After-Free</strong>: Accessing memory after it has been freed, potentially allowing attackers to execute arbitrary code</li>
          <li><strong>NULL Pointer Dereferences</strong>: Attempting to access a NULL pointer, which can cause program crashes</li>
          <li><strong>Double Free</strong>: Freeing the same memory allocation multiple times, potentially corrupting memory management data structures</li>
          <li><strong>Integer Overflow/Underflow</strong>: When arithmetic operations produce a result that exceeds the maximum or minimum value representable</li>
        </ul>
        
        <h2>Modern Approaches to Memory Safety</h2>
        
        <p>Recent years have seen significant advancements in addressing memory safety issues through various approaches:</p>
        
        <h3>Memory-Safe Languages</h3>
        
        <p>Languages like Rust have emerged as compelling alternatives to C/C++ for systems programming. Rust's ownership model and borrow checker enforce memory safety at compile time without requiring garbage collection, offering both safety and performance.</p>
        
        <pre><code>// Example of Rust's ownership model
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // Value moved here
    
    // This would cause a compile-time error
    // println!("{}", s1); // Error: value used after move
}
</code></pre>
        
        <h3>Advanced Compiler Technologies</h3>
        
        <p>Modern compilers now offer various memory safety features:</p>
        
        <ul>
          <li><strong>AddressSanitizer (ASan)</strong>: Detects memory errors like buffer overflows and use-after-free</li>
          <li><strong>MemorySanitizer (MSan)</strong>: Finds uses of uninitialized memory</li>
          <li><strong>UndefinedBehaviorSanitizer (UBSan)</strong>: Catches undefined behavior like integer overflow</li>
        </ul>
        
        <h3>Runtime Detection and Mitigation</h3>
        
        <p>Various techniques can detect or mitigate memory safety issues at runtime:</p>
        
        <ul>
          <li><strong>Control-Flow Integrity (CFI)</strong>: Prevents attackers from redirecting program execution</li>
          <li><strong>Address Space Layout Randomization (ASLR)</strong>: Randomizes memory addresses to make exploitation harder</li>
          <li><strong>Stack Canaries</strong>: Detect stack buffer overflows before they can be exploited</li>
        </ul>
        
        <h2>Case Study: Microsoft's Memory Safety Initiative</h2>
        
        <p>Microsoft has been working on addressing memory safety issues in their codebase, with initiatives to use more Rust and to implement memory-safe components in Windows. Their data shows that approximately 70% of CVEs addressed by security updates were related to memory safety issues.</p>
        
        <h2>Conclusion</h2>
        
        <p>While memory safety issues remain a significant challenge, the industry is making progress through better languages, tools, and practices. Organizations should consider adopting memory-safe languages like Rust for new development, using sanitizers and static analysis tools for existing C/C++ code, and implementing runtime protections where possible.</p>
        
        <p>As we continue to build increasingly complex and interconnected systems, prioritizing memory safety becomes not just a technical best practice but a critical security imperative.</p>
      `
    },
    'packet-analysis-techniques': {
      title: 'Advanced Packet Analysis Techniques for Security Professionals',
      date: 'February 18, 2025',
      author: 'Chirag Dewan',
      category: 'security',
      readTime: '8 min read',
      image: '📊',
      content: `
        <p>Network packet analysis remains one of the most powerful techniques in a security professional's toolkit. This article explores advanced packet analysis methodologies and how they can help identify suspicious traffic patterns and potential intrusions.</p>
        
        <h2>Beyond Basic Packet Capturing</h2>
        
        <p>While tools like Wireshark and tcpdump provide excellent capabilities for packet capture and basic analysis, security professionals often need to go beyond these basics to detect sophisticated attacks. Advanced packet analysis involves not just examining individual packets but understanding traffic patterns, protocol anomalies, and contextual information.</p>
        
        <h2>Deep Packet Inspection Techniques</h2>
        
        <p>Deep Packet Inspection (DPI) involves examining the actual content of packets beyond just their headers. Modern DPI techniques include:</p>
        
        <ul>
          <li><strong>Protocol Anomaly Detection</strong>: Identifying deviations from standard protocol implementations</li>
          <li><strong>Statistical Analysis</strong>: Using statistical methods to identify abnormal traffic patterns</li>
          <li><strong>Signature-Based Detection</strong>: Matching packet contents against known attack signatures</li>
          <li><strong>Behavioral Analysis</strong>: Identifying unusual behavior in network communications</li>
        </ul>
        
        <h2>Implementation and Examples</h2>
        
        <p>The article would continue with implementation details and specific examples of advanced packet analysis techniques.</p>
      `
    },
    'ml-security-applications': {
      title: 'Machine Learning Applications in Cybersecurity',
      date: 'February 5, 2025',
      author: 'Chirag Dewan',
      category: 'research',
      readTime: '10 min read',
      image: '🧠',
      content: `
        <p>Machine learning algorithms are revolutionizing threat detection and response in modern security operations centers. This article explores the practical applications, challenges, and future directions of ML in cybersecurity.</p>
        
        <h2>The article would continue with detailed sections about ML applications in cybersecurity.</h2>
      `
    },
    'zero-trust-architectures': {
      title: 'Implementing Zero Trust Architectures',
      date: 'January 20, 2025',
      author: 'Chirag Dewan',
      category: 'security',
      readTime: '7 min read',
      image: '🛡️',
      content: `
        <p>A practical guide to implementing zero trust security models in enterprise environments, with real-world examples and best practices. This article provides a framework for moving beyond traditional perimeter-based security.</p>
        
        <h2>The article would continue with detailed sections about implementing zero trust architectures.</h2>
      `
    },
    'rust-systems-programming': {
      title: 'Rust for Systems Programming: A Security Perspective',
      date: 'January 8, 2025',
      author: 'Chirag Dewan',
      category: 'technology',
      readTime: '9 min read',
      image: '⚙️',
      content: `
        <p>Why Rust is gaining traction for systems programming tasks that traditionally used C/C++, with a focus on its security advantages. This article examines the language features that make Rust particularly suitable for secure systems programming.</p>
        
        <h2>The article would continue with detailed sections about Rust for systems programming.</h2>
      `
    },
    'threat-modeling-approaches': {
      title: 'Modern Threat Modeling Approaches',
      date: 'December 15, 2024',
      author: 'Chirag Dewan',
      category: 'research',
      readTime: '5 min read',
      image: '📈',
      content: `
        <p>A comparison of different threat modeling methodologies and how to choose the right approach for your organization or project. This article explores STRIDE, PASTA, OCTAVE, and other frameworks.</p>
        
        <h2>The article would continue with detailed sections about threat modeling approaches.</h2>
      `
    }
  };

  useEffect(() => {
    // Simulate loading blog post data
    setLoading(true);
    
    // In a real application, you would fetch this data from an API
    setTimeout(() => {
      const foundPost = blogPostsData[postId];
      setPost(foundPost || null);
      setLoading(false);
    }, 300);
  }, [postId]);

  // Related posts suggestion
  const getRelatedPosts = () => {
    if (!post) return [];
    
    // Find posts in the same category, excluding the current post
    return Object.entries(blogPostsData)
      .filter(([id, relatedPost]) => id !== postId && relatedPost.category === post.category)
      .map(([id, postData]) => ({
        id,
        ...postData
      }))
      .slice(0, 2); // Limit to 2 related posts
  };

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

  const relatedPosts = getRelatedPosts();

  return (
    <div className="pt-28 pb-20">
      <article className="section bg-white">
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
                className="inline-flex items-center text-sm font-medium text-apple-gray-600 hover:text-apple-gray-900 transition-colors"
              >
                <i className="fas fa-arrow-left mr-2 text-xs"></i>
                Back to Blog
              </Link>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-apple-gray-100 text-apple-gray-700 rounded-full text-sm font-medium">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              <span className="text-apple-gray-500 text-sm">{post.readTime}</span>
            </div>
            
            <h1 className="heading-md text-apple-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 mt-6">
              <div className="w-12 h-12 rounded-full bg-apple-gray-200 flex items-center justify-center text-apple-gray-800">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <p className="font-medium text-apple-gray-900">{post.author}</p>
                <p className="text-sm text-apple-gray-500">{post.date}</p>
              </div>
            </div>
          </div>
          
          {/* Featured Image (placeholder) */}
          <div 
            className={`max-w-4xl mx-auto mb-12 h-64 sm:h-80 md:h-96 bg-apple-gray-100 rounded-apple-lg flex items-center justify-center transition-all duration-500 ${
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
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* Author Bio */}
          <div 
            className={`max-w-3xl mx-auto mt-16 p-8 bg-apple-gray-50 rounded-apple-lg transition-all duration-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-20 h-20 rounded-full bg-apple-gray-200 flex items-center justify-center text-apple-gray-800 flex-shrink-0 mx-auto sm:mx-0">
                <i className="fas fa-user text-2xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-medium text-apple-gray-900 mb-2 text-center sm:text-left">About the Author</h3>
                <p className="text-apple-gray-600 mb-4">
                  Chirag Dewan is a Cyber Research Scientist specializing in security solutions and cutting-edge technology. With experience in vulnerability research and threat analysis, he regularly writes about cybersecurity topics and emerging technologies.
                </p>
                <div className="flex space-x-4 justify-center sm:justify-start">
                  <a
                    href="https://github.com/chirag-dewan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors"
                  >
                    <i className="fab fa-github text-lg"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/cdewan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-apple-gray-600 hover:text-apple-gray-900 transition-colors"
                  >
                    <i className="fab fa-linkedin text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div 
              className={`max-w-4xl mx-auto mt-20 transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.5s' }}
            >
              <h2 className="text-2xl font-display font-bold text-apple-gray-900 mb-8 text-center">Related Articles</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <div
                    key={relatedPost.id}
                    className="card hoverable overflow-hidden h-full flex flex-col"
                  >
                    {/* Post image/icon placeholder */}
                    <div className="h-40 bg-apple-gray-50 flex items-center justify-center">
                      <span className="text-4xl">{relatedPost.image}</span>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-1 bg-apple-gray-100 text-apple-gray-700 rounded-full text-xs">
                          {relatedPost.category.charAt(0).toUpperCase() + relatedPost.category.slice(1)}
                        </span>
                        <span className="text-apple-gray-500 text-sm">{relatedPost.readTime}</span>
                      </div>
                      
                      <h3 className="text-lg font-medium text-apple-gray-900 mb-2">{relatedPost.title}</h3>
                      <p className="text-sm text-apple-gray-500 mb-4">{relatedPost.date}</p>
                      
                      <div className="mt-auto">
                        <Link 
                          to={`/blog/${relatedPost.id}`} 
                          className="inline-flex items-center text-sm font-medium text-apple-blue-500 hover:text-apple-blue-600 transition-colors"
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
