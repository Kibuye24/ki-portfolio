"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../components/Navigation";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="3" y="6" width="22" height="16" rx="2" stroke="#c8ff00" strokeWidth="1.5" />
                <path d="M10 13l2 2 4-4" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="9" y1="25" x2="19" y2="25" stroke="#c8ff00" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="14" y1="22" x2="14" y2="25" stroke="#c8ff00" strokeWidth="1.5" />
            </svg>
        ),
        title: "Full-Stack Engineering",
        description: "End-to-end development with React, Next.js, Node.js, and cloud-native architectures. Clean code that scales.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="10" stroke="#c8ff00" strokeWidth="1.5" />
                <circle cx="14" cy="14" r="4" fill="#c8ff00" opacity="0.3" />
                <path d="M14 4v4M14 20v4M4 14h4M20 14h4" stroke="#c8ff00" strokeWidth="1" strokeLinecap="round" />
            </svg>
        ),
        title: "AI & Machine Learning",
        description: "Integrating intelligent systems — from LLMs and NLP to computer vision — into products that deliver real-world value.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" stroke="#c8ff00" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        ),
        title: "Innovation Strategy",
        description: "Translating bold ideas into viable products through design thinking, rapid prototyping, and data-driven decisions.",
    },
];

const values = [
    { title: "Purpose-Driven", description: "Every line of code should serve a purpose. I build technology that solves real problems and creates meaningful impact.", number: "01" },
    { title: "Human-Centered", description: "Technology exists to serve people. I design experiences that are intuitive, accessible, and genuinely useful.", number: "02" },
    { title: "Forward-Looking", description: "I stay at the frontier of emerging technologies — AI, cloud computing, and automation — to build solutions that are ready for tomorrow.", number: "03" },
    { title: "Relentlessly Curious", description: "Learning never stops. I explore new domains, challenge assumptions, and bring cross-disciplinary thinking to every project.", number: "04" },
];

const techStack = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"] },
    { category: "Backend", items: ["Node.js", "Python", "FastAPI", "Express", "GraphQL"] },
    { category: "AI & Data", items: ["OpenAI", "LangChain", "TensorFlow", "PostgreSQL", "Redis"] },
    { category: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Vercel"] },
];

export default function AboutPage() {
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* ── Hero text animation (above fold, use from) ── */
            const heroTl = gsap.timeline({ delay: 0.3 });
            heroTl
                .from(".about-hero-label", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
                .from(".about-hero-title .word", {
                    y: 60, opacity: 0,
                    stagger: 0.06, duration: 1, ease: "power4.out",
                }, "-=0.4")
                .from(".about-hero-subtitle", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
                .from(".about-hero-illustration", { scale: 0.8, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6");

            /* ── Floating planet ── */
            gsap.to(".about-planet", { y: -15, rotation: 5, duration: 4, yoyo: true, repeat: -1, ease: "sine.inOut" });
            gsap.to(".about-planet-ring", { rotation: 360, duration: 25, repeat: -1, ease: "none", transformOrigin: "center center" });

            /* ── Section dividers ── */
            gsap.utils.toArray<HTMLElement>(".section-divider-animated").forEach((line) => {
                gsap.from(line, {
                    scrollTrigger: { trigger: line, start: "top 95%", toggleActions: "play none none none" },
                    scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power2.out",
                });
            });

            /* ── Floating symbols ── */
            gsap.utils.toArray<HTMLElement>(".floating-symbol").forEach((sym, i) => {
                gsap.to(sym, {
                    y: `random(-20, 20)`, x: `random(-15, 15)`, rotation: `random(-10, 10)`,
                    duration: gsap.utils.random(3, 6), repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.3,
                });
            });

            /* ── Reliable scroll reveals via CSS classes + ScrollTrigger.batch ── */
            ScrollTrigger.batch(".reveal-up", {
                start: "top 92%",
                onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }),
                once: true,
            });
            ScrollTrigger.batch(".reveal-left", {
                start: "top 92%",
                onEnter: (batch) => gsap.to(batch, { opacity: 1, x: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }),
                once: true,
            });
            ScrollTrigger.batch(".reveal-scale", {
                start: "top 92%",
                onEnter: (batch) => gsap.to(batch, { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out" }),
                once: true,
            });

            setTimeout(() => ScrollTrigger.refresh(), 300);
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="page-wrapper about-page">
            <Navigation />

            {/* ═══ About Hero ═══ */}
            <section className="about-hero">
                <div className="hero-grid-overlay" />
                <div className="hero-gradient hero-gradient-1" />

                <div className="floating-symbol" style={{ position: "absolute", top: "15%", right: "10%", opacity: 0.06 }}>
                    <span style={{ fontFamily: "monospace", fontSize: "3rem", color: "#c8ff00" }}>{"{ }"}</span>
                </div>
                <div className="floating-symbol" style={{ position: "absolute", top: "60%", right: "20%", opacity: 0.04 }}>
                    <span style={{ fontFamily: "monospace", fontSize: "2rem", color: "#6366f1" }}>{"< />"}</span>
                </div>
                <div className="floating-symbol" style={{ position: "absolute", top: "40%", left: "5%", opacity: 0.05 }}>
                    <span style={{ fontFamily: "monospace", fontSize: "2.5rem", color: "#c8ff00" }}>{"( )"}</span>
                </div>

                <div className="about-hero-content">
                    <div className="about-hero-text">
                        <div className="about-hero-label">
                            <span className="section-label-line" />
                            About Me
                        </div>
                        <h1 className="about-hero-title">
                            <span className="word">Innovation&nbsp;</span>
                            <span className="word">that&nbsp;</span>
                            <span className="word accent">powers&nbsp;</span>
                            <span className="word">organizations</span>
                        </h1>
                        <p className="about-hero-subtitle">
                            I&apos;m Joshua Kibuye — a full-stack developer and AI engineer
                            driven by the belief that technology, when purposefully applied,
                            can transform organizations and create solutions that matter.
                        </p>
                    </div>

                    <div className="about-hero-illustration">
                        <div className="about-planet">
                            <svg width="200" height="200" viewBox="0 0 200 200">
                                <circle cx="100" cy="100" r="45" fill="url(#planetGrad)" />
                                <defs>
                                    <radialGradient id="planetGrad" cx="40%" cy="40%">
                                        <stop offset="0%" stopColor="#2a2a3e" />
                                        <stop offset="100%" stopColor="#0f0f1a" />
                                    </radialGradient>
                                </defs>
                                <ellipse cx="85" cy="90" rx="15" ry="8" fill="rgba(200,255,0,0.08)" />
                                <ellipse cx="115" cy="110" rx="10" ry="6" fill="rgba(99,102,241,0.08)" />
                                <ellipse cx="80" cy="80" rx="8" ry="12" fill="rgba(255,255,255,0.03)" transform="rotate(-30 80 80)" />
                            </svg>
                            <svg className="about-planet-ring" width="280" height="280" viewBox="0 0 280 280" style={{ position: "absolute", top: "-40px", left: "-40px" }}>
                                <ellipse cx="140" cy="140" rx="130" ry="45" fill="none" stroke="rgba(200,255,0,0.12)" strokeWidth="0.8" strokeDasharray="6 6" transform="rotate(-20 140 140)" />
                                <circle cx="270" cy="140" r="4" fill="#c8ff00" opacity="0.6" />
                                <circle cx="10" cy="140" r="3" fill="#6366f1" opacity="0.4" />
                            </svg>
                            <svg width="280" height="280" viewBox="0 0 280 280" style={{ position: "absolute", top: "-40px", left: "-40px" }}>
                                <circle cx="140" cy="30" r="5" fill="#1a1a2e" stroke="rgba(200,255,0,0.3)" strokeWidth="0.8" />
                                <circle cx="250" cy="200" r="3" fill="#1a1a2e" stroke="rgba(99,102,241,0.3)" strokeWidth="0.8" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider-animated" />

            {/* ═══ Story ═══ */}
            <section className="section about-story">
                <div className="about-story-content">
                    <div className="section-label reveal-left">
                        <span className="section-label-line" />
                        My Story
                    </div>

                    <p className="story-paragraph story-lead reveal-up">
                        I believe <strong>technology should serve a purpose</strong> — to solve real problems,
                        unlock new opportunities, and fundamentally transform the way organizations operate
                        and deliver value.
                    </p>
                    <p className="story-paragraph reveal-up">
                        My journey began with a deep curiosity about how things work. That curiosity evolved
                        into a passion for building — from full-stack web applications to AI-powered systems
                        that can reason, predict, and automate.
                    </p>
                    <p className="story-paragraph reveal-up">
                        With a foundation in <strong>full-stack development</strong> and a growing specialization
                        in <strong>artificial intelligence and machine learning</strong>, I build systems that
                        are not just technically elegant, but strategically aligned with business goals.
                    </p>
                    <p className="story-paragraph reveal-up">
                        I&apos;m passionate about leveraging emerging technologies to create solutions that are
                        <strong> scalable, intelligent, and human-centered</strong> — the kind of innovation
                        that doesn&apos;t just follow trends, but sets them.
                    </p>
                </div>
            </section>

            <div className="section-divider-animated" />

            {/* ═══ Expertise ═══ */}
            <section className="section about-expertise">
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div className="section-label reveal-left">
                        <span className="section-label-line" />
                        What I Do
                    </div>
                    <h2 className="section-title reveal-up">Core Expertise</h2>
                </div>

                <div className="expertise-grid">
                    {expertise.map((item, i) => (
                        <div className="expertise-card reveal-scale" key={i}>
                            <div className="expertise-icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="section-divider-animated" />

            {/* ═══ Values ═══ */}
            <section className="section about-values">
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    <div className="section-label reveal-left">
                        <span className="section-label-line" />
                        Philosophy
                    </div>
                    <h2 className="section-title reveal-up">What Drives Me</h2>
                </div>

                <div className="values-grid">
                    {values.map((value, i) => (
                        <div className="value-card reveal-left" key={i}>
                            <div className="value-number">{value.number}</div>
                            <div className="value-content">
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="section-divider-animated" />

            {/* ═══ Tech Stack ═══ */}
            <section className="section about-tech">
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div className="section-label reveal-left">
                        <span className="section-label-line" />
                        Tools
                    </div>
                    <h2 className="section-title reveal-up">Tech Stack</h2>
                </div>

                <div className="tech-grid">
                    {techStack.map((cat, i) => (
                        <div className="tech-category reveal-up" key={i}>
                            <h3>{cat.category}</h3>
                            <div className="tech-items">
                                {cat.items.map((item) => (
                                    <span className="tech-item" key={item}>{item}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="section-divider-animated" />

            {/* ═══ CTA ═══ */}
            <section className="section about-cta">
                <div className="about-cta-content">
                    <h2 className="section-title reveal-up" style={{ textAlign: "center", marginBottom: "1rem" }}>
                        Ready to build something <span style={{ color: "var(--accent)" }}>remarkable</span>?
                    </h2>
                    <p className="reveal-up" style={{ textAlign: "center", color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto 2.5rem", fontSize: "1.05rem", lineHeight: 1.7 }}>
                        Let&apos;s turn your vision into reality with technology that makes a difference.
                    </p>
                    <div className="reveal-up" style={{ textAlign: "center" }}>
                        <Link href="/contact" className="btn-primary">
                            <span>Get In Touch</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <span>© 2026 Joshua Kibuye</span>
                <div className="footer-right">
                    <span style={{ color: "var(--text-muted)" }}>Designed & Built with passion</span>
                </div>
            </footer>
        </div>
    );
}
