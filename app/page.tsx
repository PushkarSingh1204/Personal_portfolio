"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const updateMouseObj = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, .project-card, .experience-item, .achievement-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
      
      // Update mouse variables for CSS hover effects
      const achievementCards = document.querySelectorAll('.achievement-card');
      achievementCards.forEach((card: any) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    
    window.addEventListener('mousemove', updateMouseObj);
    return () => window.removeEventListener('mousemove', updateMouseObj);
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      <motion.div
        className="cursor-outline"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? "var(--accent-color)" : "var(--border-color)",
          backgroundColor: isHovering ? "rgba(192, 255, 0, 0.05)" : "transparent"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.5 }}
      >
        {isHovering && <span className="cursor-crosshair">+</span>}
      </motion.div>
    </>
  );
}

function FadeInView({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHeader = useTransform(scrollYProgress, [0, 0.2], [0, -20]);
  
  const [typedText, setTypedText] = useState("");
  const fullText = "INITIALIZING PORTFOLIO_";
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  const skills = [
    "Python", "JavaScript", "C", "C++", "HTML", "CSS", 
    "Machine Learning", "Computer Vision", "OpenCV", "Edge AI", 
    "Predictive Modelling", "REST APIs", "JSON", "Webhooks", 
    "Firebase", "Flask", "ESP32", "Arduino", "Git", "GitHub", "n8n", "SQL"
  ];

  return (
    <>
      <CustomCursor />
      
      {/* Background Parallax */}
      <motion.div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '200vh',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          zIndex: 0,
          y: useTransform(scrollYProgress, [0, 1], [0, -300]),
          opacity: 0.5
        }}
      />

      <div className="container">
        <motion.header className="brd-b" style={{ y: yHeader }}>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            PUSHKAR SINGH
          </motion.h1>
          <nav>
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, staggerChildren: 0.1 }}
            >
              <li><a href="#summary">[ Summary ]</a></li>
              <li><a href="#skills">[ Skills ]</a></li>
              <li><a href="#projects">[ Projects ]</a></li>
              <li><a href="#experience">[ Experience ]</a></li>
              <li><a href="#achievements">[ Achievements ]</a></li>
              <li><a href="#certifications">[ Certifications ]</a></li>
            </motion.ul>
          </nav>
        </motion.header>

        <main>
          {/* HERO SECTION - PROFESSIONAL SUMMARY */}
          <section id="summary" className="hero brd-b">
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {typedText}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span style={{ display: 'inline-block' }} whileHover={{ color: '#fff', x: 10, transition: { duration: 0.2 } }}>AI & ML ENGINEER.</motion.span> <br />
              <motion.span style={{ display: 'inline-block' }} whileHover={{ color: '#fff', x: 10, transition: { duration: 0.2 } }}>IOT SYSTEMS BUILDER.</motion.span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              style={{ maxWidth: '800px', fontSize: '1.25rem', marginBottom: '2rem', color: '#aaa', position: 'relative', zIndex: 2 }}
            >
              B.Tech Computer Science student specializing in ( AI for IoT ) at Sharda University. Hands-on experience building AI and machine learning systems, Iot integrated backends, REST API pipelines, and Python-based automation. Patent filer, competition finalist (900+ teams), and startup pitch winner — demonstrating the ability to conceive, build, and deliver under pressure. Seeking an internship to apply technical skills to real-world product challenges.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 2, flexWrap: 'wrap' }}
            >
              <a href="mailto:pushkarsingh.20061204@gmail.com" className="cta-button">Email Me</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ background: 'transparent', color: '#fff', borderColor: 'var(--border-color)' }}>GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ background: 'transparent', color: '#fff', borderColor: 'var(--border-color)' }}>LinkedIn</a>
            </motion.div>
          </section>

          {/* SKILLS & TOOLS SECTION */}
          <section id="skills" className="brd-b" style={{ padding: '0', overflow: 'hidden', paddingBottom: '4rem' }}>
            <FadeInView>
              <h3 className="section-title" style={{ padding: '6rem 2rem 2rem 2rem', marginBottom: 0 }}>LANGUAGES I CODE IN</h3>
            </FadeInView>
            
            <div className="marquee-wrapper">
              <div className="marquee-content">
                {[
                  { name: "JavaScript", icon: "devicon-javascript-plain" },
                  { name: "TypeScript", icon: "devicon-typescript-plain" },
                  { name: "Python", icon: "devicon-python-plain" },
                  { name: "C++", icon: "devicon-cplusplus-plain" },
                  { name: "C", icon: "devicon-c-plain" },
                  { name: "HTML5", icon: "devicon-html5-plain" },
                  { name: "CSS3", icon: "devicon-css3-plain" },
                  { name: "SQL", icon: "devicon-mysql-plain" }
                ].map((lang, idx) => (
                  <div key={`lang-1-${idx}`} className="tool-item">
                    <i className={`${lang.icon} colored tool-icon`}></i>
                    <span className="tool-name">{lang.name}</span>
                  </div>
                ))}
                {/* Duplicate for infinite loop */}
                {[
                  { name: "JavaScript", icon: "devicon-javascript-plain" },
                  { name: "TypeScript", icon: "devicon-typescript-plain" },
                  { name: "Python", icon: "devicon-python-plain" },
                  { name: "C++", icon: "devicon-cplusplus-plain" },
                  { name: "C", icon: "devicon-c-plain" },
                  { name: "HTML5", icon: "devicon-html5-plain" },
                  { name: "CSS3", icon: "devicon-css3-plain" },
                  { name: "SQL", icon: "devicon-mysql-plain" }
                ].map((lang, idx) => (
                  <div key={`lang-2-${idx}`} className="tool-item">
                    <i className={`${lang.icon} colored tool-icon`}></i>
                    <span className="tool-name">{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <FadeInView>
              <h3 className="section-title" style={{ padding: '4rem 2rem 2rem 2rem', marginBottom: 0 }}>CODING TOOLS</h3>
            </FadeInView>
            
            <div className="marquee-wrapper" style={{ borderBottom: 'none' }}>
              <div className="marquee-content" style={{ animationDirection: 'reverse' }}>
                {[
                  { name: "React", icon: "devicon-react-original" },
                  { name: "Next.js", icon: "devicon-nextjs-plain" },
                  { name: "Node.js", icon: "devicon-nodejs-plain" },
                  { name: "Firebase", icon: "devicon-firebase-plain" },
                  { name: "OpenCV", icon: "devicon-opencv-plain" },
                  { name: "Git", icon: "devicon-git-plain" },
                  { name: "GitHub", icon: "devicon-github-original" },
                  { name: "Arduino", icon: "devicon-arduino-plain" },
                  { name: "Flask", icon: "devicon-flask-original" }
                ].map((tool, idx) => (
                  <div key={`tool-1-${idx}`} className="tool-item">
                    <i className={`${tool.icon} colored tool-icon`}></i>
                    <span className="tool-name">{tool.name}</span>
                  </div>
                ))}
                {/* Duplicate for infinite loop */}
                {[
                  { name: "React", icon: "devicon-react-original" },
                  { name: "Next.js", icon: "devicon-nextjs-plain" },
                  { name: "Node.js", icon: "devicon-nodejs-plain" },
                  { name: "Firebase", icon: "devicon-firebase-plain" },
                  { name: "OpenCV", icon: "devicon-opencv-plain" },
                  { name: "Git", icon: "devicon-git-plain" },
                  { name: "GitHub", icon: "devicon-github-original" },
                  { name: "Arduino", icon: "devicon-arduino-plain" },
                  { name: "Flask", icon: "devicon-flask-original" }
                ].map((tool, idx) => (
                  <div key={`tool-2-${idx}`} className="tool-item">
                    <i className={`${tool.icon} colored tool-icon`}></i>
                    <span className="tool-name">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section id="projects" className="brd-b">
            <FadeInView>
              <h3 className="section-title">PROJECTS</h3>
            </FadeInView>
            
            <div className="projects-grid">
              {[
                { 
                  title: "CubeSat AI System", 
                  desc: "Engineered an autonomous collision risk detection pipeline for satellites. Solved edge computing constraints by optimizing computer vision and ML models for low-power inference. Provides real-time debris tracking to ensure practical aerospace safety. Selected as Top 5 Finalist (900+ teams).", 
                  tech: ["Python", "OpenCV", "Computer Vision", "Machine Learning", "Edge AI"], 
                  link: "#" 
                },
                { 
                  title: "Focus Aura [Patent Filed]", 
                  desc: "Architected a scalable IoT attendance system to eliminate manual tracking inefficiencies. Integrated ESP32 hardware with a Python/Flask REST API and Firebase for real-time validation, successfully reducing processing time by over 80% in practical classroom deployments.", 
                  tech: ["ESP32", "Python", "Flask", "Firebase", "REST APIs"], 
                  link: "#" 
                },
                {
                  title: "Train Tracker Pro",
                  desc: "Developed a live transit tracking system providing real-time train schedules and route visualization. Solved complex async data fetching challenges by integrating external APIs with robust UI state handling, ensuring users receive accurate estimated arrival times.",
                  tech: ["JavaScript", "REST APIs", "Async Fetching", "React", "State Management"],
                  link: "#"
                },
                {
                  title: "Recipe Finder App",
                  desc: "Built a responsive web application for dynamic recipe discovery based on available ingredients. Implemented complex search filtering and real-time results by integrating external culinary APIs, delivering a seamless and practical user experience.",
                  tech: ["JavaScript", "API Integration", "Responsive UI", "JSON", "Filtering Logic"],
                  link: "#"
                }
              ].map((project, idx) => (
                <FadeInView key={idx} delay={idx * 0.15}>
                  <article className="project-card">
                    <h4 className="project-title">{project.title}</h4>
                    <p className="project-desc">{project.desc}</p>
                    <div className="project-tech">
                      {project.tech.map((t, i) => (
                        <span key={i} className="tech-tag">{t}</span>
                      ))}
                    </div>
                    <a href={project.link} className="project-link">VIEW_REPO</a>
                  </article>
                </FadeInView>
              ))}
            </div>
          </section>

          {/* EXPERIENCE SECTION */}
          <section id="experience" className="brd-b">
            <FadeInView>
              <h3 className="section-title">WORK EXPERIENCE</h3>
            </FadeInView>
            
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <FadeInView delay={0.2}>
                <div className="experience-item">
                  <div className="exp-date">Remote, 1 Month</div>
                  <h4 className="exp-title">Full Stack Developer Intern</h4>
                  <div className="exp-company">Thiranex</div>
                  <ul style={{ listStyleType: 'square', marginLeft: '1.5rem', color: '#999' }}>
                    <li style={{ marginBottom: '0.5rem' }}>Engineered multiple full-stack applications including a portfolio website, task management system, e-commerce application, and blog platform.</li>
                    <li style={{ marginBottom: '0.5rem' }}>Architected scalable solutions using modern frontend and backend technologies, ensuring robust database integration.</li>
                    <li>Designed and consumed REST APIs to facilitate seamless client-server communication and dynamic UI updates.</li>
                  </ul>
                </div>
              </FadeInView>

              <FadeInView delay={0.4}>
                <div className="experience-item">
                  <div className="exp-date">2024</div>
                  <h4 className="exp-title">Software Engineering Virtual Experience</h4>
                  <div className="exp-company">JPMorgan Chase & Co. (Forage | Virtual)</div>
                  <ul style={{ listStyleType: 'square', marginLeft: '1.5rem', color: '#999' }}>
                    <li style={{ marginBottom: '0.5rem' }}>Completed engineering simulations involving data analysis, API-based problem solving, and structured code implementation.</li>
                    <li style={{ marginBottom: '0.5rem' }}>Practiced debugging, optimization, and delivering working solutions under defined deadlines.</li>
                    <li>Gained exposure to enterprise-level workflows and structured development practices.</li>
                  </ul>
                </div>
              </FadeInView>
            </div>
          </section>

          {/* ACHIEVEMENTS SECTION */}
          <section id="achievements" className="brd-b">
            <FadeInView>
              <h3 className="section-title">ACHIEVEMENTS & RECOGNITION</h3>
            </FadeInView>
            
            <div className="achievements-grid">
              {[
                { title: "1st Prize", desc: "Pivot Pitch 2025, Startup Idea Pitching Competition, Sharda University", icon: "🏆" },
                { title: "2nd Place", desc: "BIZZPRENEUR 2025, Sharda University", icon: "🥈" },
                { title: "Patent Filed", desc: "Eye Tracking System (AI-based innovation)", icon: "📜" },
                { title: "Top Finalist", desc: "Top 5 of 900+ teams — Elite Hack Competition, CubeSat AI project", icon: "🚀" }
              ].map((achievement, idx) => (
                <FadeInView key={idx} delay={idx * 0.1}>
                  <div className="achievement-card">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-content">
                      <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: 'var(--text-color)' }}>{achievement.title}</h4>
                      <p style={{ color: '#999', fontSize: '0.9rem' }}>{achievement.desc}</p>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </section>

          {/* CERTIFICATIONS SECTION */}
          <section id="certifications" className="brd-b">
            <FadeInView>
              <h3 className="section-title">CERTIFICATIONS</h3>
            </FadeInView>
            
            <div className="achievements-grid">
              {[
                { title: "CS50 Certified", desc: "Introduction to Computer Science, Harvard University", icon: "🎓" },
                { title: "Java Certified", desc: "Java Programming Certification, Oracle", icon: "☕" }
              ].map((cert, idx) => (
                <FadeInView key={idx} delay={idx * 0.1}>
                  <div className="achievement-card">
                    <div className="achievement-icon">{cert.icon}</div>
                    <div className="achievement-content">
                      <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: 'var(--text-color)' }}>{cert.title}</h4>
                      <p style={{ color: '#999', fontSize: '0.9rem' }}>{cert.desc}</p>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact">
            <FadeInView>
              <h3 className="section-title">INITIATE_HANDSHAKE</h3>
              <p style={{ marginBottom: '3rem', color: '#999', fontSize: '1.25rem' }}>Ready to build something robust? Let's connect the nodes.</p>
            </FadeInView>
            
            <FadeInView delay={0.2}>
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">IDENTIFIER (NAME)</label>
                  <input type="text" id="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">CONTACT (EMAIL)</label>
                  <input type="email" id="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">PAYLOAD (MESSAGE)</label>
                  <textarea id="message" rows={5} required></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button" 
                  className="cta-button" 
                  style={{ maxWidth: 'max-content' }}
                >
                  TRANSMIT
                </motion.button>
              </form>
            </FadeInView>
          </section>
        </main>

        <footer>
          <p>SYSTEM.HALT(); // &copy; 2026 PUSHKAR SINGH // +91 8920463196</p>
        </footer>
      </div>
    </>
  );
}
