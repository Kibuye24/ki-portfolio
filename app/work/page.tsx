"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../components/Navigation";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* ─── Projects Data ───────────────────────────────────────────────── */

type ProjectCategory = "all" | "fullstack" | "ai";

interface Project {
    title: string;
    description: string;
    tags: string[];
    color: string;
    category: ProjectCategory[];
    year: string;
    num: string;
}

const allProjects: Project[] = [
    {
        title: "NexusFlow AI Platform",
        description:
            "Enterprise AI orchestration platform using LLM-powered agents. Automates complex workflows at scale with intelligent routing and multi-model support.",
        tags: ["AI/ML", "Next.js", "Python", "AWS", "LangChain"],
        color: "#c8ff00",
        category: ["ai", "fullstack"],
        year: "2024",
        num: "01",
    },
    {
        title: "HealthBridge Analytics",
        description:
            "Real-time health data analytics dashboard. Processes millions of records with sub-second response times across distributed systems.",
        tags: ["React", "D3.js", "PostgreSQL", "Docker", "Redis"],
        color: "#6366f1",
        category: ["fullstack"],
        year: "2024",
        num: "02",
    },
    {
        title: "Sentinel AI Monitor",
        description:
            "AI-powered infrastructure monitoring predicting server failures before they happen. Anomaly detection and time-series forecasting for 99.99% uptime.",
        tags: ["Python", "TensorFlow", "Grafana", "Kubernetes"],
        color: "#ef4444",
        category: ["ai"],
        year: "2023",
        num: "03",
    },
    {
        title: "EduConnect LMS",
        description:
            "Modern learning management system for African institutions with adaptive learning paths, offline-first capabilities, and AI content recommendations.",
        tags: ["TypeScript", "Node.js", "MongoDB", "PWA"],
        color: "#f59e0b",
        category: ["fullstack"],
        year: "2023",
        num: "04",
    },
    {
        title: "AgriSense IoT",
        description:
            "IoT precision agriculture platform with real-time soil, weather, and crop health insights. ML models predict optimal planting and harvesting cycles.",
        tags: ["IoT", "React Native", "Firebase", "ML"],
        color: "#10b981",
        category: ["ai", "fullstack"],
        year: "2023",
        num: "05",
    },
    {
        title: "MarketPulse Dashboard",
        description:
            "Financial analytics platform providing real-time market insights, portfolio tracking, and AI-generated trade signals for institutional investors.",
        tags: ["Next.js", "Python", "FastAPI", "WebSocket"],
        color: "#8b5cf6",
        category: ["ai", "fullstack"],
        year: "2022",
        num: "06",
    },
    {
        title: "CloudSync CMS",
        description:
            "Headless CMS with real-time collaboration, versioning, and multi-tenant architecture serving content to 50+ client applications.",
        tags: ["React", "Node.js", "GraphQL", "PostgreSQL"],
        color: "#06b6d4",
        category: ["fullstack"],
        year: "2022",
        num: "07",
    },
    {
        title: "VoiceBot Engine",
        description:
            "Conversational AI engine powering customer support. Handles 10K+ daily conversations with NLU and sentiment analysis.",
        tags: ["NLP", "Python", "FastAPI", "OpenAI"],
        color: "#f97316",
        category: ["ai"],
        year: "2022",
        num: "08",
    },
    {
        title: "Nexus Design System",
        description:
            "Comprehensive component library and design system used across 12+ products with accessible components and automated visual regression testing.",
        tags: ["React", "TypeScript", "Storybook", "Figma"],
        color: "#ec4899",
        category: ["fullstack"],
        year: "2021",
        num: "09",
    },
    {
        title: "DataWeave ETL",
        description:
            "Scalable ETL pipeline processing 2TB+ of data daily. Transforms raw data from multiple sources into actionable insights.",
        tags: ["Python", "Apache Spark", "Airflow", "AWS"],
        color: "#14b8a6",
        category: ["ai", "fullstack"],
        year: "2021",
        num: "10",
    },
];

const filters = [
    { id: "all" as ProjectCategory, label: "All" },
    { id: "fullstack" as ProjectCategory, label: "Full-Stack" },
    { id: "ai" as ProjectCategory, label: "AI & ML" },
];

/* ─── Component ───────────────────────────────────────────────────── */

export default function WorkPage() {
    const mainRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredProjects =
        activeFilter === "all"
            ? allProjects
            : allProjects.filter((p) => p.category.includes(activeFilter));

    const featured = filteredProjects[0];
    const rest = filteredProjects.slice(1);

    const handleFilter = (filter: ProjectCategory) => {
        if (filter === activeFilter) return;
        const targets = gridRef.current
            ? [".work-featured", ...Array.from(gridRef.current.children)]
            : [];

        gsap.to(targets, {
            opacity: 0,
            y: 20,
            stagger: 0.03,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => setActiveFilter(filter),
        });
    };

    useEffect(() => {
        const featured = document.querySelector(".work-featured");
        const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
        const all = featured ? [featured, ...cards] : cards;

        if (all.length > 0) {
            gsap.fromTo(
                all,
                { opacity: 0, y: 50, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.65, ease: "power3.out" }
            );
        }
    }, [activeFilter]);

    useEffect(() => {
        const timer = setTimeout(() => { ScrollTrigger.refresh(); }, 200);

        const ctx = gsap.context(() => {
            /* ── Big number reveal ── */
            gsap.from(".work-big-number", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                delay: 0.2,
            });

            /* ── Hero text ── */
            const tl = gsap.timeline({ delay: 0.3 });
            tl.from(".work-hero-label", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
                .from(".work-hero-title .word", {
                    y: 60, opacity: 0,
                    stagger: 0.06, duration: 1, ease: "power4.out",
                }, "-=0.5")
                .from(".work-hero-desc", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
                .from(".work-filter-bar", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");

            /* ── Horizontal scrolling text ── */
            gsap.to(".work-marquee-track", {
                x: "-50%",
                duration: 30,
                repeat: -1,
                ease: "none",
            });

            /* ── Section dividers ── */
            gsap.utils.toArray<HTMLElement>(".section-divider-animated").forEach((line) => {
                gsap.from(line, {
                    scrollTrigger: { trigger: line, start: "top 95%", toggleActions: "play none none none" },
                    scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power2.out",
                });
            });

            /* ── CTA reveal ── */
            gsap.from(".work-cta-inner > *", {
                scrollTrigger: { trigger: ".work-cta", start: "top 80%", toggleActions: "play none none none" },
                y: 50, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
            });

            ScrollTrigger.refresh();
        }, mainRef);

        return () => { clearTimeout(timer); ctx.revert(); };
    }, []);

    return (
        <div ref={mainRef} className="page-wrapper">
            <Navigation />

            {/* ═══ Hero ═══ */}
            <section className="work-hero-v2">
                <div className="hero-grid-overlay" />
                <div className="hero-gradient hero-gradient-1" />
                <div className="hero-gradient hero-gradient-2" />

                {/* Giant background number */}
                <div className="work-big-number" aria-hidden="true">WORK</div>

                <div className="work-hero-inner">
                    <div className="work-hero-label">
                        <span className="section-label-line" />
                        Portfolio
                    </div>
                    <h1 className="work-hero-title">
                        <span className="word">Crafted&nbsp;</span>
                        <span className="word">with&nbsp;</span>
                        <span className="word accent">purpose.</span>
                    </h1>
                    <p className="work-hero-desc">
                        A curated collection of projects spanning full-stack platforms,
                        AI systems, and digital innovation — each built to solve real
                        problems and push boundaries.
                    </p>
                </div>
            </section>

            {/* ═══ Scrolling keywords ═══ */}
            <div className="work-marquee">
                <div className="work-marquee-track">
                    {[...Array(3)].map((_, i) => (
                        <span key={i} className="work-marquee-content">
                            <span>REACT</span><span className="work-marquee-sep">●</span>
                            <span>PYTHON</span><span className="work-marquee-sep">●</span>
                            <span>NEXT.JS</span><span className="work-marquee-sep">●</span>
                            <span>TENSORFLOW</span><span className="work-marquee-sep">●</span>
                            <span>AWS</span><span className="work-marquee-sep">●</span>
                            <span>NODE.JS</span><span className="work-marquee-sep">●</span>
                            <span>OPENAI</span><span className="work-marquee-sep">●</span>
                            <span>DOCKER</span><span className="work-marquee-sep">●</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ═══ Filter + Projects ═══ */}
            <section className="section work-section">
                {/* Filter Bar */}
                <div className="work-filter-bar">
                    <div className="work-filter-group">
                        {filters.map((f) => (
                            <button
                                key={f.id}
                                className={`wf-btn ${activeFilter === f.id ? "wf-active" : ""}`}
                                onClick={() => handleFilter(f.id)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                    <div className="work-count">
                        <span className="work-count-num">{filteredProjects.length}</span> projects
                    </div>
                </div>

                {/* Featured Project */}
                {featured && (
                    <div className="work-featured" style={{ "--card-accent": featured.color } as React.CSSProperties}>
                        <div className="work-featured-visual">
                            <div className="work-featured-bg" style={{ background: `radial-gradient(circle at 30% 40%, ${featured.color}18, transparent 70%)` }}>
                                {/* Orbital illustration */}
                                <svg className="work-featured-orbit" viewBox="0 0 400 400" fill="none">
                                    <circle cx="200" cy="200" r="150" stroke={featured.color} strokeWidth="0.5" strokeDasharray="6 6" opacity="0.15" />
                                    <circle cx="200" cy="200" r="100" stroke={featured.color} strokeWidth="0.3" opacity="0.1" />
                                    <circle cx="200" cy="200" r="50" stroke={featured.color} strokeWidth="0.3" opacity="0.08" />
                                    <circle cx="200" cy="200" r="18" fill={featured.color} opacity="0.08" />
                                    {/* Orbiting dots */}
                                    <circle cx="350" cy="200" r="4" fill={featured.color} opacity="0.4">
                                        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="100" cy="200" r="3" fill={featured.color} opacity="0.25">
                                        <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="-360 200 200" dur="30s" repeatCount="indefinite" />
                                    </circle>
                                </svg>
                                <div className="work-featured-num">{featured.num}</div>
                            </div>
                        </div>
                        <div className="work-featured-info">
                            <div className="work-featured-meta">
                                <span className="work-year-badge">{featured.year}</span>
                                <div className="work-cat-dots">
                                    {featured.category.includes("fullstack") && <span className="cat-dot cat-dot-fs" title="Full-Stack" />}
                                    {featured.category.includes("ai") && <span className="cat-dot cat-dot-ai" title="AI & ML" />}
                                </div>
                            </div>
                            <h2 className="work-featured-title">{featured.title}</h2>
                            <p className="work-featured-desc">{featured.description}</p>
                            <div className="work-featured-tags">
                                {featured.tags.map((t) => (
                                    <span key={t} className="wf-tag">{t}</span>
                                ))}
                            </div>
                            <a href="#" className="work-featured-link">
                                <span>Explore Project</span>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M2 16L16 2M16 2H6M16 2v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                )}

                {/* Grid */}
                <div ref={gridRef} className="work-grid">
                    {rest.map((project, i) => (
                        <a
                            href="#"
                            className={`work-card ${i === 0 || i === 3 ? "work-card-wide" : ""}`}
                            key={`${activeFilter}-${project.num}`}
                            style={{ "--card-accent": project.color } as React.CSSProperties}
                        >
                            <div className="work-card-top">
                                <div className="work-card-bg" style={{ background: `linear-gradient(135deg, ${project.color}10, transparent)` }}>
                                    <span className="work-card-num">{project.num}</span>
                                    {/* Mini orbit */}
                                    <svg className="work-card-orbit" viewBox="0 0 120 120" fill="none">
                                        <circle cx="60" cy="60" r="50" stroke={project.color} strokeWidth="0.4" strokeDasharray="4 4" opacity="0.12" />
                                        <circle cx="60" cy="60" r="25" stroke={project.color} strokeWidth="0.3" opacity="0.08" />
                                        <circle cx="60" cy="60" r="6" fill={project.color} opacity="0.1" />
                                    </svg>
                                </div>
                            </div>
                            <div className="work-card-body">
                                <div className="work-card-meta">
                                    <span className="work-year-badge">{project.year}</span>
                                    <div className="work-cat-dots">
                                        {project.category.includes("fullstack") && <span className="cat-dot cat-dot-fs" title="Full-Stack" />}
                                        {project.category.includes("ai") && <span className="cat-dot cat-dot-ai" title="AI" />}
                                    </div>
                                </div>
                                <h3 className="work-card-title">{project.title}</h3>
                                <p className="work-card-desc">{project.description}</p>
                                <div className="work-card-tags">
                                    {project.tags.map((t) => (
                                        <span key={t} className="wf-tag">{t}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="work-card-arrow">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2 14L14 2M14 2H6M14 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            <div className="section-divider-animated" />

            {/* ═══ CTA ═══ */}
            <section className="section work-cta">
                <div className="work-cta-inner">
                    <div className="section-label" style={{ justifyContent: "center" }}>
                        <span className="section-label-line" />
                        Collaborate
                    </div>
                    <h2 className="contact-title">
                        Have a project in <span style={{ color: "var(--accent)" }}>mind</span>?
                    </h2>
                    <p className="contact-subtitle">
                        I&apos;m always open to discussing new projects, creative ideas,
                        or opportunities to bring your vision to life.
                    </p>
                    <Link href="/#contact" className="btn-primary">
                        <span>Let&apos;s Talk</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
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
