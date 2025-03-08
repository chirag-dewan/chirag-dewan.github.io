import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Hero from '../components/home/Hero';
import Experience from '../components/home/Experience';
import Skills from '../components/home/Skills';
import Projects from '../components/home/Projects';
import GitHubContributions from '../components/home/GitHubContributions';
import AnimatedDivider from '../components/home/AnimatedDivider';
import Contact from '../components/home/Contact';

// Enhanced Animated Section Divider
const AnimatedDivider = ({ delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        width: ['0%', '100%', '40%'],
        opacity: [0, 1, 1],
        transition: { duration: 1.5, delay }
      });
    }
  }, [inView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ width: '0%', opacity: 0 }}
      className="w-24 h-px bg-apple-blue-500 mx-auto my-16"
    />
  );
};

// Animated Stats Section
const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { label: "Vulnerabilities Found", value: "20+", icon: "shield-alt", color: "text-apple-red", gradient: "from-red-500/20 to-red-600/5" },
    { label: "Years of Experience", value: "4+", icon: "calendar-alt", color: "text-apple-blue-500", gradient: "from-blue-500/20 to-blue-600/5" },
    { label: "Certifications", value: "3+", icon: "certificate", color: "text-apple-green", gradient: "from-green-500/20 to-green-600/5" },
    { label: "Projects Completed", value: "15+", icon: "project-diagram", color: "text-apple-purple", gradient: "from-purple-500/20 to-purple-600/5" }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-apple-gray-50 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl"></div>
      
      <div className="container-apple relative z-10">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-apple-xl p-8 shadow-apple-lg text-center flex flex-col items-center relative overflow-hidden`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-40`}></div>
              
              {/* Decorative shapes */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/30 rounded-full"></div>
              <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white/30 rounded-full"></div>
              
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 relative z-10 bg-opacity-10 ${stat.color === 'text-apple-blue-500' ? 'bg-apple-blue-500/10' : stat.color === 'text-apple-red' ? 'bg-apple-red/10' : stat.color === 'text-apple-green' ? 'bg-apple-green/10' : 'bg-apple-purple/10'}`}>
                <i className={`fas fa-${stat.icon} text-2xl ${stat.color}`}></i>
              </div>
              
              <motion.div
                className="relative z-10"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  delay: 0.2 + index * 0.1,
                  duration: 0.8
                }}
              >
                <span className="text-4xl font-display font-bold text-apple-gray-900 mb-2 block">
                  {stat.value}
                </span>
                <span className="text-apple-gray-600 block">{stat.label}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skills Showcase (Compact Version for Homepage)
const SkillsShowcase = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { name: "Reverse Engineering", level: 90, category: "Security" },
    { name: "Exploit Development", level: 85, category: "Security" },
    { name: "Python", level: 95, category: "Development" },
    { name: "C/C++", level: 85, category: "Development" },
    { name: "Threat Modeling", level: 90, category: "Security" },
    { name: "Rust", level: 80, category: "Development" }
  ];

  return (
    <section className="py-16 bg-apple-gray-900 text-white">
      <div className="container-apple">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-md text-white mb-4">Core Expertise</h2>
          <p className="text-lg text-apple-gray-300 max-w-3xl mx-auto">
            Specialized in cybersecurity research, vulnerability discovery, and secure software development
          </p>
        </motion.div>

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-apple-gray-800 rounded-apple-lg p-6 shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-white">{skill.name}</h3>
                <span className="px-3 py-1 bg-apple-gray-700 text-apple-gray-300 rounded-full text-xs">
                  {skill.category}
                </span>
              </div>
              
              <div className="mt-3 flex items-center">
                <div className="flex-grow h-2 bg-apple-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    className="h-full bg-apple-blue-500 rounded-full"
                  />
                </div>
                <span className="ml-3 text-sm font-medium text-apple-gray-300">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Animated Timeline Component
const Timeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineItems = [
    {
      year: "2025",
      title: "Software Engineer II at GM Financial",
      description: "Starting Soon - Financial technology development",
      icon: "dollar-sign"
    },
    {
      year: "2025",
      title: "Cyber Research Engineer I at RTX BBN",
      description: "Leading vulnerability research in critical infrastructure",
      icon: "search"
    },
    {
      year: "2023-2024",
      title: "Cyber Engineer at RTX",
      description: "Securing enterprise systems through threat modeling and hardening",
      icon: "shield-alt"
    },
    {
      year: "2022-2023",
      title: "Senior Cyber Intern at RTX",
      description: "Conducting APT simulations and vulnerability discovery",
      icon: "bug"
    },
    {
      year: "2021",
      title: "Information Security Intern at Reata Pharmaceuticals",
      description: "Performing security assessments for healthcare systems",
      icon: "medkit"
    },
    {
      year: "2023",
      title: "B.S. Computer Science",
      description: "Arizona State University",
      icon: "graduation-cap"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-apple max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-md text-apple-gray-900 mb-4">Professional Journey</h2>
          <p className="text-lg text-apple-gray-600 max-w-3xl mx-auto">
            A visual timeline of my career in cybersecurity
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Timeline central line */}
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 1.5 }}
            className="absolute left-1/2 transform -translate-x-1/2 w-px bg-apple-gray-200 h-full z-0"
          />

          {/* Timeline items */}
          <div className="relative z-10">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center mb-12 last:mb-0 ${index % 2 === 0 ? 'justify-start' : 'flex-row-reverse'}`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <span className="block text-sm font-medium text-apple-blue-500 mb-1">{item.year}</span>
                  <h3 className="text-lg font-medium text-apple-gray-900 mb-2">{item.title}</h3>
                  <p className="text-apple-gray-600">{item.description}</p>
                </div>

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 300, delay: 0.3 + index * 0.2 }}
                    className="w-12 h-12 rounded-full bg-apple-blue-500 flex items-center justify-center shadow-lg"
                  >
                    <i className={`fas fa-${item.icon} text-white`}></i>
                  </motion.div>
                </div>

                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      
      <StatsSection />
      
      <AnimatedDivider />
      
      <Experience />
      
      <AnimatedDivider delay={0.2} />
      
      <Timeline />
      
      <AnimatedDivider delay={0.2} />
      
      <SkillsShowcase />
      
      <AnimatedDivider delay={0.2} />
      
      <Projects />
      
      <AnimatedDivider delay={0.2} />
      
      <GitHubContributions />
      
      <AnimatedDivider delay={0.2} />
      
      <Contact />
    </>
  );
};

export default Home;
