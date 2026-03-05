"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const navRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        gsap.fromTo(
            nav,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
        );

        let lastScroll = 0;
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScroll && currentScroll > 100 && !mobileMenuOpen) {
                gsap.to(nav, { y: -100, duration: 0.4, ease: "power2.inOut" });
            } else {
                gsap.to(nav, { y: 0, duration: 0.4, ease: "power2.inOut" });
            }
            lastScroll = currentScroll;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [mobileMenuOpen]);

    // Close mobile menu when pathname changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <nav ref={navRef} className={`nav ${mobileMenuOpen ? "nav-mobile-open" : ""}`}>
                <Link href="/" className="nav-logo">
                    <span className="nav-logo-dot" />
                    JK
                </Link>

                <ul className="nav-links">
                    <li>
                        <Link href="/work" className={`nav-link ${pathname === "/work" ? "nav-link-active" : ""}`}>
                            Work
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" className={`nav-link ${pathname === "/about" ? "nav-link-active" : ""}`}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className={`nav-link ${pathname === "/contact" ? "nav-link-active" : ""}`}>
                            Contact
                        </Link>
                    </li>
                </ul>

                {/* Hamburger Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <div className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? "open" : ""}`}>
                <div className="mobile-menu-content">
                    <ul className="mobile-nav-links">
                        <li>
                            <Link href="/" className={`mobile-nav-link ${pathname === "/" ? "active" : ""}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/work" className={`mobile-nav-link ${pathname === "/work" ? "active" : ""}`}>
                                Work
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className={`mobile-nav-link ${pathname === "/about" ? "active" : ""}`}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className={`mobile-nav-link ${pathname === "/contact" ? "active" : ""}`}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
