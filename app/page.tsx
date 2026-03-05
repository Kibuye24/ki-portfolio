"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Navigation from "./components/Navigation";
import Illustrations, { RocketSVG } from "./components/Illustrations";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ────────────────────────────────────────────────────────── */

const projects = [
  {
    title: "NexusFlow AI Platform",
    description:
      "An enterprise AI orchestration platform that streamlines workflows using LLM-powered agents. Built for organizations looking to automate complex processes at scale.",
    tags: ["AI/ML", "Next.js", "Python", "AWS"],
    color: "#c8ff00",
    featured: true,
  },
  {
    title: "HealthBridge Analytics",
    description:
      "Real-time health data analytics dashboard enabling healthcare providers to make data-driven decisions. Processes millions of records with sub-second response times.",
    tags: ["React", "D3.js", "PostgreSQL", "Docker"],
    color: "#6366f1",
    featured: false,
  },
  {
    title: "EduConnect LMS",
    description:
      "A modern learning management system built for African institutions, featuring adaptive learning paths and offline-first capabilities.",
    tags: ["TypeScript", "Node.js", "MongoDB", "PWA"],
    color: "#f59e0b",
    featured: false,
  },
  {
    title: "AgriSense IoT",
    description:
      "IoT-powered precision agriculture platform connecting farmers with real-time soil, weather, and crop health insights.",
    tags: ["IoT", "React Native", "Firebase", "ML"],
    color: "#10b981",
    featured: false,
  },
];

const experience = [
  {
    period: "2024 — Present",
    role: "Lead Software Engineer",
    company: "Nexus Data & Design",
    description:
      "Leading a cross-functional team building AI-powered digital products for enterprise clients. Architecting scalable solutions and driving innovation strategy.",
    tech: ["Next.js", "Python", "AWS", "OpenAI", "Docker"],
  },
  {
    period: "2022 — 2024",
    role: "Senior Full-Stack Developer",
    company: "Innovation Hub",
    description:
      "Developed high-performance web applications serving 100K+ users. Implemented CI/CD pipelines and microservices architecture, reducing deployment time by 60%.",
    tech: ["React", "Node.js", "PostgreSQL", "Kubernetes", "Redis"],
  },
  {
    period: "2020 — 2022",
    role: "Software Engineer",
    company: "TechForward Labs",
    description:
      "Built data-driven applications and integrated ML models into production systems. Shipped predictive analytics features used by enterprise clients.",
    tech: ["TypeScript", "Python", "TensorFlow", "GCP", "GraphQL"],
  },
  {
    period: "2018 — 2020",
    role: "Junior Developer",
    company: "Digital Solutions Co.",
    description:
      "Contributed to full-stack web applications, designed RESTful APIs, and built interactive front-end experiences for diverse clients.",
    tech: ["JavaScript", "React", "Express", "MongoDB"],
  },
];

/* ─── Reveal helper: uses ScrollTrigger.batch with gsap.to ─── */

function setupReveals() {
  // Batch reveal for all .reveal-up elements
  ScrollTrigger.batch(".reveal-up", {
    start: "top 92%",
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1, y: 0, stagger: 0.08,
        duration: 0.8, ease: "power3.out",
      });
    },
    once: true,
  });

  // Batch reveal for all .reveal-left elements
  ScrollTrigger.batch(".reveal-left", {
    start: "top 92%",
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1, x: 0, stagger: 0.08,
        duration: 0.8, ease: "power3.out",
      });
    },
    once: true,
  });

  // Batch reveal for all .reveal-scale elements
  ScrollTrigger.batch(".reveal-scale", {
    start: "top 92%",
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1, scale: 1, y: 0, stagger: 0.1,
        duration: 0.9, ease: "power3.out",
      });
    },
    once: true,
  });
}

/* ─── Component ───────────────────────────────────────────────────── */

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Hero Text Reveal (these are above the fold, no ScrollTrigger needed) ── */
      const heroTl = gsap.timeline({ delay: 0.5 });

      heroTl
        .from(".hero-tag", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" })
        .from(".hero-title-word", {
          y: 60, opacity: 0,
          stagger: 0.06, duration: 1.2, ease: "power4.out",
        }, "-=0.5")
        .from(".hero-description", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.6")
        .from(".hero-cta-group > *", {
          y: 30, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
        }, "-=0.5")
        .from(".hero-scroll-indicator", { opacity: 0, y: 20, duration: 1 }, "-=0.3");

      /* ── Hero parallax on scroll ── */
      gsap.to(".hero-content", {
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        y: -100, opacity: 0.3, ease: "none",
      });

      /* ── Rocket flight to the moon ── */
      gsap.to(".rocket-container", {
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: "-100vh",   // Fly up towards the top
        x: "-65vw",    // Shoot across the screen to the right
        rotation: 60, // Angle dynamically towards the moon
        scale: 0.4,   // Scale down to simulate distance
        ease: "power1.inOut",
      });

      /* ── Rocket flame flicker ── */
      gsap.to(".rocket-flame ellipse", {
        scaleY: 1.3,
        scaleX: 0.9,
        yoyo: true,
        repeat: -1,
        duration: 0.15,
        stagger: 0.05,
        ease: "power1.inOut",
        transformOrigin: "center top",
      });

      /* ── Marquee ── */
      gsap.to(".marquee-track", { x: "-50%", duration: 25, repeat: -1, ease: "none" });

      /* ── Section divider line draw ── */
      gsap.utils.toArray<HTMLElement>(".section-divider-animated").forEach((line) => {
        gsap.from(line, {
          scrollTrigger: { trigger: line, start: "top 95%", toggleActions: "play none none none" },
          scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power2.out",
        });
      });

      /* ── All scroll reveals (reliable CSS-first approach) ── */
      setupReveals();

      // Refresh after small delay for layout settlement
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="page-wrapper">
      <Illustrations />
      <Navigation />

      {/* ═══ Hero ═══ */}
      <section className="hero">
        <div className="hero-grid-overlay" />
        <div className="hero-gradient hero-gradient-1" />
        <div className="hero-gradient hero-gradient-2" />

        {/* Hero Moon Illustration */}
        <div className="hero-moon">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="#f8f9fa" opacity="0.95" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5" />

            <circle cx="65" cy="70" r="18" fill="#e9ecef" />
            <circle cx="63" cy="68" r="14" fill="none" stroke="#dee2e6" strokeWidth="2" opacity="0.4" />

            <circle cx="120" cy="55" r="12" fill="#e9ecef" />
            <circle cx="118" cy="53" r="10" fill="none" stroke="#dee2e6" strokeWidth="1.5" opacity="0.4" />

            <circle cx="140" cy="110" r="22" fill="#e9ecef" />
            <circle cx="137" cy="107" r="18" fill="none" stroke="#dee2e6" strokeWidth="2" opacity="0.4" />

            <circle cx="90" cy="140" r="14" fill="#e9ecef" />

            <circle cx="50" cy="115" r="8" fill="#e9ecef" />
            <circle cx="150" cy="150" r="6" fill="#e9ecef" />
            <circle cx="100" cy="35" r="5" fill="#e9ecef" />

            <circle cx="100" cy="100" r="82" fill="none" stroke="#c8ff00" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>

        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            Full-Stack Developer · AI · Innovation
          </div>

          <h1 className="hero-title">
            <span className="hero-title-line">
              <span className="hero-title-word">Building&nbsp;</span>
              <span className="hero-title-word">the&nbsp;</span>
            </span>
            <span className="hero-title-line">
              <span className="hero-title-word accent">future&nbsp;</span>
              <span className="hero-title-word">through</span>
            </span>
            <span className="hero-title-line">
              <span className="hero-title-word">code.</span>
            </span>
          </h1>

          <p className="hero-description">
            I&apos;m Joshua Kibuye — a full-stack developer and AI engineer
            crafting innovative digital solutions that empower organizations and
            drive meaningful impact.
          </p>

          <div className="hero-cta-group">
            <Link href="/work" className="btn-primary">
              <span>View My Work</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get In Touch
            </Link>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>

        {/* Rocket Container */}
        <div className="rocket-container">
          <RocketSVG />
        </div>
      </section>

      {/* ═══ Marquee Strip ═══ */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="marquee-content">
              <span className="marquee-word">FULL-STACK</span>
              <span className="marquee-dot">✦</span>
              <span className="marquee-word">AI ENGINEERING</span>
              <span className="marquee-dot">✦</span>
              <span className="marquee-word">INNOVATION</span>
              <span className="marquee-dot">✦</span>
              <span className="marquee-word">DESIGN THINKING</span>
              <span className="marquee-dot">✦</span>
              <span className="marquee-word">SCALABLE SYSTEMS</span>
              <span className="marquee-dot">✦</span>
              <span className="marquee-word">CLOUD NATIVE</span>
              <span className="marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="section-divider-animated" />

      {/* ═══ Projects / Work ═══ */}
      <section id="work" className="section projects">
        <div className="projects-header">
          <div>
            <div className="section-label reveal-left">
              <span className="section-label-line" />
              Selected Work
            </div>
            <h2 className="section-title reveal-up">Projects &amp; Products</h2>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div className="project-card reveal-scale" key={i}>
              <div className="project-image-wrapper">
                <div
                  className="project-image"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <svg width="120" height="120" viewBox="0 0 120 120" style={{ opacity: 0.15 }}>
                    <circle cx="60" cy="60" r="50" fill="none" stroke={project.color} strokeWidth="0.5" strokeDasharray="4 4" />
                    <circle cx="60" cy="60" r="30" fill="none" stroke={project.color} strokeWidth="0.5" />
                    <circle cx="60" cy="60" r="10" fill={project.color} opacity="0.3" />
                    <text x="60" y="65" textAnchor="middle" fill={project.color} fontSize="14" fontFamily="var(--font-heading)" fontWeight="800" opacity="0.7">
                      {String(i + 1).padStart(2, "0")}
                    </text>
                  </svg>
                </div>
                <div className="project-image-overlay" />
              </div>
              <div className="project-info">
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span className="project-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <a href="#" className="project-link">
                  View Project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/work" className="btn-secondary reveal-up">
            View All Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      <div className="section-divider-animated" />

      {/* ═══ Experience ═══ */}
      <section id="experience" className="section experience">
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="section-label reveal-left">
            <span className="section-label-line" />
            Career
          </div>
          <h2 className="section-title reveal-up">Work History</h2>
        </div>

        <div className="experience-list">
          {experience.map((exp, i) => (
            <div className="experience-item reveal-left" key={i}>
              <div className="experience-line-fill" />
              <div className="experience-period">{exp.period}</div>
              <div className="experience-details">
                <h3>{exp.role}</h3>
                <div className="experience-company">{exp.company}</div>
                <p className="experience-description">{exp.description}</p>
                <div className="experience-tech">
                  {exp.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider-animated" />

      {/* ═══ Contact ═══ */}
      <section id="contact" className="section contact">
        <div className="contact-content">
          <div className="section-label reveal-up" style={{ justifyContent: "center" }}>
            <span className="section-label-line" />
            Connect
          </div>
          <h2 className="contact-title reveal-up">
            Let&apos;s build something{" "}
            <span style={{ color: "var(--accent)" }}>extraordinary</span>
          </h2>
          <p className="contact-subtitle reveal-up">
            Whether you&apos;re looking to bring an idea to life, need a
            technical partner, or want to explore how AI can transform your
            organization — I&apos;d love to hear from you.
          </p>
          <div className="contact-links reveal-up">
            <a href="mailto:hello@joshuakibuye.com" className="contact-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4l6 4 6-4M2 4v8h12V4H2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
              Email
            </a>
            <a href="https://github.com/kibuye" target="_blank" className="contact-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
              GitHub
            </a>
            <a href="https://linkedin.com/in/joshuakibuye" target="_blank" className="contact-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169H7.043c.032.694 0 7.225 0 7.225h2.608z" /></svg>
              LinkedIn
            </a>
            <a href="https://twitter.com/joshuakibuye" target="_blank" className="contact-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z" /></svg>
              Twitter / X
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="footer">
        <span>© 2025 Joshua Kibuye</span>
        <div className="footer-right">
          <span style={{ color: "var(--text-muted)" }}>Designed &amp; Built with passion</span>
        </div>
      </footer>
    </div>
  );
}
