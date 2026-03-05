"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../components/Navigation";

gsap.registerPlugin(ScrollTrigger);

const socials = [
    {
        label: "Email",
        href: "mailto:hello@joshuakibuye.com",
        value: "hello@joshuakibuye.com",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M2 6l8 5 8-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: "GitHub",
        href: "https://github.com/kibuye",
        value: "github.com/kibuye",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-1.025-.013-1.862-2.513.546-3.163-.616-3.363-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.663.788-.012 1.35.725 1.538.913.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.088.638-1.338-2.225-.25-4.55-1.112-4.55-4.937 0-1.088.387-1.988 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.025a9.28 9.28 0 015 0c1.912-1.3 2.75-1.025 2.75-1.025.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.688 0 3.837-2.337 4.687-4.562 4.937.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.175.575.688.475A10.016 10.016 0 0020 10c0-5.523-4.477-10-10-10z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/joshuakibuye",
        value: "linkedin.com/in/joshuakibuye",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M0 1.433C0 .642.657 0 1.469 0h17.062C19.343 0 20 .642 20 1.433v17.134c0 .791-.657 1.433-1.469 1.433H1.469C.657 20 0 19.358 0 18.567V1.433zM6.178 16.737V7.712H3.178v9.025h3zm-1.5-10.265c1.046 0 1.698-.693 1.698-1.56-.02-.886-.652-1.56-1.678-1.56S3.019 3.926 3.019 4.812c0 .867.652 1.56 1.64 1.56h.02zM10.834 16.737v-5.036c0-.269.02-.538.098-.731.217-.538.71-1.097 1.54-1.097 1.087 0 1.521.828 1.521 2.042v4.822h3v-5.168c0-2.769-1.478-4.056-3.45-4.056-1.593 0-2.307.878-2.709 1.49v.032h-.02l.02-.031V7.712h-3c.04.867 0 9.025 0 9.025h3z" />
            </svg>
        ),
    },
    {
        label: "Twitter / X",
        href: "https://twitter.com/joshuakibuye",
        value: "@joshuakibuye",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15.75.938h3.068l-6.7 7.678L20 19.063h-6.17l-4.834-6.338-5.532 6.338H.396l7.167-8.212L0 .938h6.328l4.37 5.79L15.75.937zm-1.075 16.285h1.7L5.404 2.68H3.58l11.094 14.543z" />
            </svg>
        ),
    },
];

export default function ContactPage() {
    const mainRef = useRef<HTMLDivElement>(null);
    const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus("sending");
        // Simulate form submit
        setTimeout(() => setFormStatus("sent"), 1500);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* ── Hero ── */
            const tl = gsap.timeline({ delay: 0.3 });
            tl.from(".contact-hero-label", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
                .from(".contact-hero-title .word", {
                    y: 60, opacity: 0,
                    stagger: 0.06, duration: 1, ease: "power4.out",
                }, "-=0.5")
                .from(".contact-hero-desc", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5");

            /* ── Big background text ── */
            gsap.from(".contact-bg-text", { y: 80, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.2 });

            /* ── Floating symbols ── */
            gsap.utils.toArray<HTMLElement>(".floating-symbol").forEach((sym, i) => {
                gsap.to(sym, {
                    y: `random(-20, 20)`, x: `random(-10, 10)`, rotation: `random(-8, 8)`,
                    duration: gsap.utils.random(3, 5), repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.4,
                });
            });

            /* ── Scroll reveals ── */
            ScrollTrigger.batch(".reveal-up", {
                start: "top 92%",
                onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }),
                once: true,
            });
            ScrollTrigger.batch(".reveal-scale", {
                start: "top 92%",
                onEnter: (batch) => gsap.to(batch, { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "power3.out" }),
                once: true,
            });

            /* ── Dividers ── */
            gsap.utils.toArray<HTMLElement>(".section-divider-animated").forEach((line) => {
                gsap.from(line, {
                    scrollTrigger: { trigger: line, start: "top 95%", toggleActions: "play none none none" },
                    scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power2.out",
                });
            });

            setTimeout(() => ScrollTrigger.refresh(), 300);
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="page-wrapper">
            <Navigation />

            {/* ═══ Contact Hero ═══ */}
            <section className="contact-hero-v2">
                <div className="hero-grid-overlay" />
                <div className="hero-gradient hero-gradient-1" />
                <div className="hero-gradient hero-gradient-2" />

                {/* Giant background text */}
                <div className="contact-bg-text" aria-hidden="true">HELLO</div>

                {/* Floating symbols */}
                <div className="floating-symbol" style={{ position: "absolute", top: "18%", right: "12%", opacity: 0.05 }}>
                    <span style={{ fontFamily: "monospace", fontSize: "3rem", color: "#c8ff00" }}>{"@"}</span>
                </div>
                <div className="floating-symbol" style={{ position: "absolute", top: "55%", left: "6%", opacity: 0.04 }}>
                    <span style={{ fontFamily: "monospace", fontSize: "2.5rem", color: "#6366f1" }}>{"<>"}</span>
                </div>
                <div className="floating-symbol" style={{ position: "absolute", top: "35%", right: "25%", opacity: 0.03 }}>
                    <span style={{ fontFamily: "monospace", fontSize: "2rem", color: "#c8ff00" }}>{"{ }"}</span>
                </div>

                <div className="contact-hero-inner">
                    <div className="contact-hero-label">
                        <span className="section-label-line" />
                        Contact
                    </div>
                    <h1 className="contact-hero-title">
                        <span className="word">Let&apos;s&nbsp;</span>
                        <span className="word accent">connect</span>
                    </h1>
                    <p className="contact-hero-desc">
                        Have a project in mind, want to collaborate, or just want to say hello?
                        I&apos;d love to hear from you. Let&apos;s turn ideas into reality.
                    </p>
                </div>
            </section>

            <div className="section-divider-animated" />

            {/* ═══ Contact Content ═══ */}
            <section className="section contact-section">
                <div className="contact-grid">

                    {/* ── Left: Form ── */}
                    <div className="contact-form-wrapper reveal-up">
                        <h2 className="contact-form-title">Send a Message</h2>
                        <p className="contact-form-desc">
                            Fill out the form below and I&apos;ll get back to you as soon as possible.
                        </p>

                        {formStatus === "sent" ? (
                            <div className="contact-success">
                                <div className="contact-success-icon">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                        <circle cx="24" cy="24" r="22" stroke="#c8ff00" strokeWidth="2" />
                                        <path d="M15 24l6 6 12-12" stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3>Message Sent!</h3>
                                <p>Thanks for reaching out. I&apos;ll get back to you soon.</p>
                                <button className="btn-secondary" onClick={() => setFormStatus("idle")} style={{ marginTop: "1rem" }}>
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" id="name" className="form-input" placeholder="Joshua Kibuye" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" id="email" className="form-input" placeholder="you@example.com" required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject" className="form-label">Subject</label>
                                    <input type="text" id="subject" className="form-input" placeholder="Project collaboration, question, idea..." required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea id="message" className="form-textarea" rows={6} placeholder="Tell me about your project or idea..." required />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary contact-submit-btn"
                                    disabled={formStatus === "sending"}
                                >
                                    {formStatus === "sending" ? (
                                        <>
                                            <span className="contact-spinner" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M2 14L14 2M14 2H6M14 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* ── Right: Info + Socials ── */}
                    <div className="contact-info-side">
                        <div className="contact-info-card reveal-scale">
                            <h3>Direct Contact</h3>
                            <p>Prefer email? Reach out directly and I&apos;ll respond within 24 hours.</p>
                            <a href="mailto:hello@joshuakibuye.com" className="contact-direct-email">
                                hello@joshuakibuye.com
                            </a>
                        </div>

                        <div className="contact-socials-card reveal-scale">
                            <h3>Find Me Online</h3>
                            <div className="contact-social-list">
                                {socials.map((s) => (
                                    <a href={s.href} key={s.label} target={s.label === "Email" ? undefined : "_blank"} className="contact-social-item">
                                        <span className="contact-social-icon">{s.icon}</span>
                                        <div className="contact-social-text">
                                            <span className="contact-social-label">{s.label}</span>
                                            <span className="contact-social-value">{s.value}</span>
                                        </div>
                                        <svg className="contact-social-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="contact-availability reveal-scale">
                            <span className="contact-avail-dot" />
                            <span>Currently available for new projects</span>
                        </div>
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
