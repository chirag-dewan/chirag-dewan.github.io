import React from 'react';
import Hero from '../components/home/Hero';
import Experience from '../components/home/Experience';
import Skills from '../components/home/Skills';
import Projects from '../components/home/Projects';
import Contact from '../components/home/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <div className="section-divider"></div>
      <Experience />
      <div className="section-divider"></div>
      <Skills />
      <div className="section-divider"></div>
      <Projects />
      <div className="section-divider"></div>
      <Contact />
    </>
  );
};

export default Home;
