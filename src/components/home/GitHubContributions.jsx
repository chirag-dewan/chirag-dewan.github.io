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
    <section id="github" className="py-20 bg-apple-gray-900 text-white">
      <div className="container-apple">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="heading-md text-white">Code Portfolio</h2>
          <p className="mt-4 text-lg text-apple-gray-300 max-w-3xl mx-auto">
            Showcasing my software development journey through projects and contributions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div 
            className={`transition-all duration-500 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: inView ? '0.2s' : '0s' }}
          >
            <div className="card bg-apple-gray-800 shadow-2xl p-8 h-full">
              <h3 className="text-xl font-bold text-white mb-6">Featured Projects</h3>
              
              <div className="space-y-6">
                {[
                  {
                    name: "Financial Dashboard",
                    description: "React-based financial analytics dashboard with real-time data visualization",
                    tech: ["React", "TypeScript", "D3.js"]
                  },
                  {
                    name: "API Gateway Service",
                    description: "Microservice architecture gateway for handling distributed system requests",
                    tech: ["Java", "Spring Boot", "Docker"]
                  },
                  {
                    name: "Data Processing Pipeline",
                    description: "Scalable ETL pipeline for handling large datasets and analytics",
                    tech: ["Python", "Apache Spark", "AWS"]
                  }
                ].map((project, index) => (
                  <div key={project.name} className="border-b border-apple-gray-700 pb-6 last:border-0 last:pb-0">
                    <h4 className="text-apple-gray-100 font-medium text-lg mb-2">{project.name}</h4>
                    <p className="text-apple-gray-400 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-apple-gray-700 text-apple-gray-300 rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div 
            className={`transition-all duration-500 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: inView ? '0.3s' : '0s' }}
          >
            <div className="card bg-apple-gray-800 shadow-2xl p-8 h-full">
              <h3 className="text-xl font-bold text-white mb-6">Technical Skills</h3>
              
              <div className="space-y-8">
                {[
                  { 
                    category: "Frontend Development",
                    skills: [
                      { name: "React.js", level: 90 },
                      { name: "TypeScript", level: 85 },
                      { name: "UI/UX Design", level: 80 }
                    ]
                  },
                  { 
                    category: "Backend Development", 
                    skills: [
                      { name: "Java/Spring", level: 85 },
                      { name: "Node.js", level: 75 },
                      { name: "Python", level: 80 }
                    ]
                  },
                  { 
                    category: "Infrastructure & Tools", 
                    skills: [
                      { name: "Docker/Kubernetes", level: 75 },
                      { name: "AWS/Azure", level: 70 },
                      { name: "CI/CD Pipelines", level: 80 }
                    ]
                  }
                ].map((group, groupIndex) => (
                  <div key={group.category}>
                    <h4 className="text-apple-gray-200 font-medium mb-3">{group.category}</h4>
                    <div className="space-y-3">
                      {group.skills.map((skill, skillIndex) => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-apple-gray-300">{skill.name}</span>
                            <span className="text-apple-gray-400">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-apple-gray-700 rounded-full">
                            <div 
                              className="h-full bg-apple-blue-500 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Activity */}
        <div 
          className={`card bg-apple-gray-800 shadow-2xl p-8 mb-12 transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: inView ? '0.4s' : '0s' }}
        >
          <h3 className="text-xl font-bold text-white mb-6">GitHub Contributions</h3>
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

        {/* Coding philosophy section */}
        <div 
          className={`mt-16 bg-apple-gray-800 rounded-apple-xl p-8 shadow-2xl transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: inView ? '0.6s' : '0s' }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">My Development Philosophy</h3>
              <p className="text-apple-gray-300 mb-4">
                I approach software development with a focus on creating scalable, maintainable, and user-centric solutions. My code is a reflection of my commitment to excellence and continuous improvement.
              </p>
              <p className="text-apple-gray-300 mb-6">
                From building financial services applications at GM Financial to developing data processing systems, I've consistently delivered high-quality software that balances technical requirements with business objectives.
              </p>
              <a 
                href="https://github.com/chirag-dewan" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-apple-blue-500 text-white hover:bg-apple-blue-600 px-5 py-3 rounded-full transition-colors"
              >
                <i className="fab fa-github mr-2"></i>
                View My Projects
              </a>
            </div>
            <div className="bg-apple-gray-900 p-6 rounded-apple-lg font-mono text-sm overflow-hidden shadow-inner">
              <pre className="text-apple-blue-500">
{`// My software development approach
function developmentPhilosophy() {
  const principles = [
    'Clean, maintainable code',
    'User-centered design',
    'Performance optimization',
    'Continuous learning'
  ];
  
  const techStack = {
    frontend: ['React', 'TypeScript', 'TailwindCSS'],
    backend: ['Java', 'Spring Boot', 'Node.js'],
    database: ['PostgreSQL', 'MongoDB', 'Redis'],
    devOps: ['Docker', 'CI/CD', 'AWS']
  };
  
  return {
    goal: "Create elegant solutions to complex problems",
    approach: "Balance technical excellence with business value"
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
