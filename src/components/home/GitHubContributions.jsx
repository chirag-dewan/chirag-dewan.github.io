import React from 'react';
import { useInView } from 'react-intersection-observer';
import GitHubCalendar from 'react-github-calendar';

const GitHubContributions = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Custom theme for the GitHub calendar
  const calendarTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <section className="py-20 bg-apple-gray-900 text-white">
      <div className="container-apple">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="heading-md text-white">GitHub Contributions</h2>
          <p className="mt-4 text-lg text-apple-gray-300 max-w-3xl mx-auto">
            A visual representation of my consistent dedication to code and open-source projects
          </p>
        </div>

        <div
          className={`transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: inView ? '0.2s' : '0s' }}
        >
          <div className="card bg-apple-gray-800 shadow-2xl p-6 mb-12">
            <GitHubCalendar
              username="chirag-dewan"
              colorScheme="dark"
              theme={calendarTheme}
              fontSize={16}
              blockSize={12}
              blockMargin={5}
              blockRadius={2}
              hideColorLegend={false}
            />
          </div>
        </div>

        {/* Contribution stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Repositories', value: '15+', icon: 'fa-code-branch' },
            { label: 'Contributions', value: '650+', icon: 'fa-code-commit' },
            { label: 'Pull Requests', value: '45+', icon: 'fa-code-pull-request' },
            { label: 'Stars Received', value: '120+', icon: 'fa-star' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`card bg-apple-gray-800 p-6 flex flex-col items-center text-center transition-all duration-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: inView ? `${0.3 + index * 0.1}s` : '0s' }}
            >
              <div className="w-12 h-12 rounded-full bg-apple-gray-700 flex items-center justify-center mb-4">
                <i className={`fab ${stat.icon} text-apple-green`}></i>
              </div>
              <span className="text-3xl font-display font-bold text-white mb-2">{stat.value}</span>
              <span className="text-apple-gray-300">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Code storytelling section */}
        <div 
          className={`mt-16 bg-apple-gray-800 rounded-apple-xl p-8 shadow-2xl transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: inView ? '0.7s' : '0s' }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">The Story Behind the Code</h3>
              <p className="text-apple-gray-300 mb-4">
                Each commit represents a problem solved, a vulnerability patched, or a new security feature implemented. My GitHub activity tells the story of continuous learning and improvement in the cybersecurity space.
              </p>
              <p className="text-apple-gray-300 mb-6">
                From developing packet sniffers to implementing machine learning-based intrusion detection systems, my repositories showcase my journey through the complex landscape of security engineering.
              </p>
              <a 
                href="https://github.com/chirag-dewan" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-apple-gray-700 text-white hover:bg-apple-gray-600 px-5 py-3 rounded-full transition-colors"
              >
                <i className="fab fa-github mr-2"></i>
                Explore My GitHub
              </a>
            </div>
            <div className="bg-apple-gray-900 p-6 rounded-apple-lg font-mono text-sm overflow-hidden shadow-inner">
              <pre className="text-apple-green">
{`// The journey of a security engineer
function securityJourney() {
  const skills = ['Vulnerability Research', 
                  'Exploit Development', 
                  'Threat Analysis'];
                  
  const experience = new Timeline();
  
  experience.add({
    company: "RTX BBN",
    role: "Cyber Researcher",
    focus: "Critical infrastructure"
  });
  
  return {
    mission: "Find vulnerabilities before 
             the adversaries do",
    approach: "Continuous learning and 
              relentless curiosity"
  };
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubContributions;
