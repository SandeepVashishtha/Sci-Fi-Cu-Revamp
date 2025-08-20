'use client';

import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import './page.css';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const sectionVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const statVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="about-container">
        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div className="about-header" variants={itemVariants}>
            <h1 className="about-title">About Our Mission</h1>
            <p className="about-subtitle">Bridging Science Fiction with Tomorrow&rsquo;s Reality</p>
            <div className="about-intro">
              Welcome to the Sci-Fi Innovation Club - where imagination meets innovation. We are a community of visionaries, 
              technologists, and science fiction enthusiasts dedicated to exploring the intersection of speculative fiction 
              and cutting-edge technology. Our mission is to inspire real-world innovation through the limitless possibilities 
              of science fiction.
            </div>
          </motion.div>

          {/* Main Sections */}
          <motion.div 
            className="about-sections"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="about-section" variants={sectionVariants}>
              <span className="section-icon">🚀</span>
              <h3 className="section-title">Our Vision</h3>
              <div className="section-content">
                To create a future where the boundaries between science fiction and reality blur, fostering innovation 
                that transforms how we live, work, and explore the cosmos. We envision a world where today&rsquo;s 
                impossible becomes tomorrow&rsquo;s breakthrough.
              </div>
            </motion.div>

            <motion.div className="about-section" variants={sectionVariants}>
              <span className="section-icon">⚡</span>
              <h3 className="section-title">Innovation Hub</h3>
              <div className="section-content">
                Our club serves as a catalyst for technological advancement, bringing together minds from diverse 
                fields to collaborate on projects that push the boundaries of what&rsquo;s possible. From AI and robotics 
                to space exploration and biotechnology.
              </div>
            </motion.div>

            <motion.div className="about-section" variants={sectionVariants}>
              <span className="section-icon">🌌</span>
              <h3 className="section-title">Community</h3>
              <div className="section-content">
                Join a vibrant community of dreamers, creators, and innovators. We host workshops, hackathons, 
                discussions, and collaborative projects that turn science fiction concepts into tangible prototypes 
                and research initiatives.
              </div>
            </motion.div>

            <motion.div className="about-section" variants={sectionVariants}>
              <span className="section-icon">🔬</span>
              <h3 className="section-title">Research & Development</h3>
              <div className="section-content">
                We bridge the gap between fictional technologies and real-world applications. Our research teams 
                explore emerging technologies, conduct experiments, and develop prototypes inspired by science 
                fiction narratives.
              </div>
            </motion.div>
          </motion.div>

          {/* Statistics Section */}
          <motion.div 
            className="about-stats"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="stat-item" variants={statVariants}>
              <span className="stat-number">500+</span>
              <div className="stat-label">Active Members</div>
            </motion.div>
            <motion.div className="stat-item" variants={statVariants}>
              <span className="stat-number">50+</span>
              <div className="stat-label">Projects Launched</div>
            </motion.div>
            <motion.div className="stat-item" variants={statVariants}>
              <span className="stat-number">25+</span>
              <div className="stat-label">Research Papers</div>
            </motion.div>
            <motion.div className="stat-item" variants={statVariants}>
              <span className="stat-number">100+</span>
              <div className="stat-label">Events Hosted</div>
            </motion.div>
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="about-cta"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.button 
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
            >
              Join Our Mission
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
