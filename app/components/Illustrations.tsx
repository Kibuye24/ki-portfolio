"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══════ Rocket SVG ═══════ */
export function RocketSVG() {
    return (
        <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            {/* Flame */}
            <g className="rocket-flame">
                <ellipse cx="60" cy="185" rx="14" ry="12" fill="#ff6b35" opacity="0.9" />
                <ellipse cx="60" cy="182" rx="10" ry="10" fill="#ffaa33" opacity="0.85" />
                <ellipse cx="60" cy="178" rx="6" ry="8" fill="#ffe066" opacity="0.9" />
            </g>
            {/* Fins */}
            <path d="M32 155 L45 130 L45 165 Z" fill="#a0a0a0" stroke="#666" strokeWidth="0.5" />
            <path d="M88 155 L75 130 L75 165 Z" fill="#a0a0a0" stroke="#666" strokeWidth="0.5" />
            {/* Body */}
            <rect x="42" y="60" width="36" height="110" rx="4" fill="#e8e8e8" stroke="#ccc" strokeWidth="0.5" />
            {/* Nose cone */}
            <path d="M42 60 L60 15 L78 60 Z" fill="#c8ff00" stroke="#a0cc00" strokeWidth="0.5" />
            {/* Window */}
            <circle cx="60" cy="90" r="12" fill="#1a1a2e" stroke="#888" strokeWidth="1.5" />
            <circle cx="60" cy="90" r="9" fill="#0f3460" />
            <ellipse cx="57" cy="87" rx="3" ry="4" fill="rgba(255,255,255,0.15)" />
            {/* Body stripe */}
            <rect x="42" y="120" width="36" height="4" fill="#c8ff00" opacity="0.7" />
            {/* Details */}
            <rect x="55" y="140" width="10" height="30" rx="2" fill="#ccc" stroke="#aaa" strokeWidth="0.5" />
        </svg>
    );
}

/* ═══════ Star SVG ═══════ */
function StarSVG({ size = 4, color = "#c8ff00" }: { size?: number; color?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 10 10" fill={color}>
            <circle cx="5" cy="5" r="2" />
        </svg>
    );
}

/* ═══════ Main Illustrations Component ═══════ */
export default function Illustrations() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [stars, setStars] = useState<Array<{ id: number, top: string, left: string, size: number, color: string }>>([]);

    useEffect(() => {
        // Generate random star positions only on the client
        setStars(Array.from({ length: 40 }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 4 + 1,
            color: i % 5 === 0 ? "#c8ff00" : i % 3 === 0 ? "#6366f1" : "rgba(255,255,255,0.4)",
        })));
    }, []);

    useEffect(() => {
        if (stars.length === 0) return;

        const ctx = gsap.context(() => {

            /* ── Floating stars ── */
            gsap.utils.toArray<HTMLElement>(".floating-star").forEach((star, i) => {
                gsap.to(star, {
                    y: `random(-30, 30)`,
                    x: `random(-20, 20)`,
                    opacity: gsap.utils.random(0.3, 1),
                    duration: gsap.utils.random(2, 4),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.2,
                });
            });

            /* ── Orbiting rings ── */
            gsap.to(".orbit-ring", {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "none",
                transformOrigin: "center center",
            });

            gsap.to(".orbit-ring-reverse", {
                rotation: -360,
                duration: 30,
                repeat: -1,
                ease: "none",
                transformOrigin: "center center",
            });

            /* ── Parallax shapes ── */
            gsap.utils.toArray<HTMLElement>(".parallax-shape").forEach((shape, i) => {
                gsap.to(shape, {
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                    },
                    y: (i % 2 === 0 ? -1 : 1) * gsap.utils.random(200, 600),
                    rotation: gsap.utils.random(-30, 30),
                    ease: "none",
                });
            });

            /* ── Shooting stars ── */
            const shootStar = () => {
                const star = document.createElement("div");
                star.className = "shooting-star";
                star.style.top = `${Math.random() * 50}%`;
                star.style.left = `${Math.random() * 80}%`;
                containerRef.current?.appendChild(star);

                gsap.fromTo(
                    star,
                    { x: 0, y: 0, opacity: 1 },
                    {
                        x: 200,
                        y: 100,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.in",
                        onComplete: () => star.remove(),
                    }
                );
            };

            const shootInterval = setInterval(shootStar, 4000);
            return () => clearInterval(shootInterval);
        }, containerRef);

        return () => ctx.revert();
    }, [stars]);

    return (
        <div ref={containerRef} className="illustrations-container">
            {/* Stars field */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="floating-star"
                    style={{
                        position: "absolute",
                        top: star.top,
                        left: star.left,
                        zIndex: 1,
                    }}
                >
                    <StarSVG size={star.size} color={star.color} />
                </div>
            ))}


            {/* Orbit rings decorations */}
            <svg className="orbit-ring orbit-decoration-1" width="300" height="300" viewBox="0 0 300 300">
                <ellipse cx="150" cy="150" rx="140" ry="50" fill="none" stroke="rgba(200,255,0,0.08)" strokeWidth="1" strokeDasharray="8 8" />
                <circle cx="290" cy="150" r="4" fill="#c8ff00" opacity="0.5" />
            </svg>

            <svg className="orbit-ring-reverse orbit-decoration-2" width="250" height="250" viewBox="0 0 250 250">
                <ellipse cx="125" cy="125" rx="115" ry="40" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="1" strokeDasharray="6 6" />
                <circle cx="240" cy="125" r="3" fill="#6366f1" opacity="0.5" />
            </svg>

            {/* Parallax geometric shapes */}
            <div className="parallax-shape shape-1">
                <svg width="20" height="20" viewBox="0 0 20 20">
                    <polygon points="10,0 20,20 0,20" fill="none" stroke="rgba(200,255,0,0.15)" strokeWidth="1" />
                </svg>
            </div>
            <div className="parallax-shape shape-2">
                <svg width="30" height="30" viewBox="0 0 30 30">
                    <rect x="2" y="2" width="26" height="26" rx="4" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="1" transform="rotate(45 15 15)" />
                </svg>
            </div>
            <div className="parallax-shape shape-3">
                <svg width="15" height="15" viewBox="0 0 15 15">
                    <circle cx="7.5" cy="7.5" r="6" fill="none" stroke="rgba(200,255,0,0.12)" strokeWidth="1" />
                </svg>
            </div>
            <div className="parallax-shape shape-4">
                <svg width="25" height="25" viewBox="0 0 25 25">
                    <line x1="0" y1="12.5" x2="25" y2="12.5" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <line x1="12.5" y1="0" x2="12.5" y2="25" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                </svg>
            </div>
            <div className="parallax-shape shape-5">
                <svg width="40" height="40" viewBox="0 0 40 40">
                    <path d="M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z" fill="none" stroke="rgba(200,255,0,0.08)" strokeWidth="0.5" />
                </svg>
            </div>

            {/* Code bracket decorations */}
            <div className="parallax-shape shape-6">
                <span style={{ fontFamily: "monospace", fontSize: "2rem", color: "rgba(200,255,0,0.06)", fontWeight: 300 }}>{"{"}</span>
            </div>
            <div className="parallax-shape shape-7">
                <span style={{ fontFamily: "monospace", fontSize: "2rem", color: "rgba(200,255,0,0.06)", fontWeight: 300 }}>{"}"}</span>
            </div>
            <div className="parallax-shape shape-8">
                <span style={{ fontFamily: "monospace", fontSize: "1.5rem", color: "rgba(99,102,241,0.06)", fontWeight: 300 }}>{"</>"}</span>
            </div>
        </div>
    );
}
