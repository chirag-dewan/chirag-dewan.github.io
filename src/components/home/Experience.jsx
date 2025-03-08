import React from 'react';
import { useInView } from 'react-intersection-observer';

const ExperienceItem = ({ experience, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-500 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 0.2}s` }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:gap-8 pb-12 md:pb-20">
        {/* Company info */}
        <div className="md:w-1/3 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold text-apple-gray-900">{experience.company}</h3>
          <p className="text-apple-gray-600 font-medium">{experience.position}</p>
          <p className="text-apple-gray-500 text-sm mt-1">{experience.period}</p>
          <p className="text-apple-gray-500 text-sm">{experience.location}</p>
        </div>
        
        {/* Responsibilities */}
        <div className="md:w-2/3">
          <p className="text-apple-gray-700 mb-4">{experience.description}</p>
          <ul className="space-y-2">
            {experience.responsibilities.map((item, i) => (
              <li key={i} className="flex items-start">
                <i className="fas fa-check text-apple-blue-500 mt-1 mr-3 text-xs"></i>
                <span className="text-apple-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const experiences = [
    {
      company: "GM Financial",
      position: "Software Engineer II",
      location: "Dallas, TX",
      period: "March 2024 – Present",
      description: "Working with enterprise software applications to enhance financial service platforms and optimize customer-facing solutions.",
      responsibilities: [
        "Developing scalable microservices architecture using Java Spring Boot and RESTful APIs",
        "Implementing modern frontend solutions with React and TypeScript for financial dashboards",
        "Optimizing database performance and query structures for high-volume financial transactions",
        "Collaborating in Agile teams to deliver iterative improvements to customer-facing applications"
      ]
    },
    {
      company: "RTX BBN",
      position: "Software Engineer",
      location: "Cambridge, MA",
      period: "June 2023 – February 2024",
      description: "Engineered software solutions for complex enterprise systems, focusing on reliability and scalability.",
      responsibilities: [
        "Designed and implemented data processing systems for large-scale information analysis",
        "Developed automated testing frameworks that improved code quality and deployment reliability",
        "Created modular backend services integrated with CI/CD pipelines for efficient deployment",
        "Optimized system performance through code improvements and architectural enhancements"
      ]
    },
    {
      company: "Raytheon, RTX",
      position: "Software Engineering Intern",
      location: "Aurora, CO",
      period: "May 2022 – June 2023",
      description: "Contributed to enterprise software projects while learning industry best practices in software development.",
      responsibilities: [
        "Participated in software development for data analysis and visualization tools",
        "Collaborated on building robust system monitoring and reporting solutions",
        "Assisted in creating documentation and test cases for software components",
        "Gained experience with enterprise-level version control and deployment processes"
      ]
    }
  ];

  return (
    <section id="experience" className="section bg-white">
      <div className="container-apple">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-500 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="heading-md text-apple-gray-900">Professional Experience</h2>
          <p className="mt-4 text-lg text-apple-gray-600 max-w-3xl mx-auto">
            My journey through software engineering roles across financial technology and enterprise systems
          </p>
          
          {/* Dark storytelling element */}
          <div className="mt-8 p-6 bg-apple-gray-900 rounded-apple-lg text-white max-w-3xl mx-auto shadow-apple-lg">
            <p className="text-apple-gray-200">
              Throughout my career, I've approached each role with a commitment to creating exceptional software.
              From financial systems at GM Financial to enterprise solutions at RTX, my focus has been on
              building applications that blend technical excellence with practical business value.
            </p>
          </div>
        </div>

        <div className="border-t border-apple-gray-100">
          {experiences.map((experience, index) => (
            <ExperienceItem 
              key={experience.company + experience.position}
              experience={experience}
              index={index}
            />
          ))}
        </div>

        {/* Experience summary metrics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 flex flex-col items-center text-center">
            <span className="text-4xl font-display font-bold text-apple-gray-900 mb-2">2+</span>
            <span className="text-apple-gray-600">Years of Experience</span>
          </div>
          <div className="card p-8 flex flex-col items-center text-center">
            <span className="text-4xl font-display font-bold text-apple-gray-900 mb-2">15+</span>
            <span className="text-apple-gray-600">Software Projects</span>
          </div>
          <div className="card p-8 flex flex-col items-center text-center">
            <span className="text-4xl font-display font-bold text-apple-gray-900 mb-2">3</span>
            <span className="text-apple-gray-600">Enterprise Applications</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
