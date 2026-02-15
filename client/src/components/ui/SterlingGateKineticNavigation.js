'use client';
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export default function SterlingGateKineticNavigation() {
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  // Initial Setup
  useEffect(() => {
    if (!containerRef.current) return;

    // Create custom easing
    try {
        if (!gsap.parseEase("main")) {
            CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
            gsap.defaults({ ease: "main", duration: 0.7 });
        }
    } catch (e) {
        console.warn("CustomEase failed to load, falling back to default.", e);
        gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }
  }, []);

  // Menu Open/Close Animation Effect
  useEffect(() => {
      if (!containerRef.current) return;
      
      const ctx = gsap.context(() => {
        const navWrap = containerRef.current.querySelector(".nav-overlay-wrapper");
        const menu = containerRef.current.querySelector(".menu-content");
        const overlay = containerRef.current.querySelector(".overlay");
        // Removed bgPanels
        const menuLinks = containerRef.current.querySelectorAll(".nav-link");
        const fadeTargets = containerRef.current.querySelectorAll("[data-menu-fade]");
        
        const menuButton = containerRef.current.querySelector(".nav-close-btn");
        const menuButtonIcon = menuButton?.querySelector(".menu-button-icon");

      const tl = gsap.timeline();
        
        if (isMenuOpen) {
            // OPEN
            if (navWrap) navWrap.setAttribute("data-nav", "open");
            document.body.style.overflow = 'hidden';
            
            tl.set(navWrap, { display: "block" })
              // Animate main container slide-in (White Background)
              .fromTo(menu, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: "power3.out" })
              .fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 90 }, "<")
              
              .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<");
              
              // Removed link animation to guarantee visibility
              
            if (fadeTargets.length) {
                tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" }, "<+=0.2");
            }

        } else {
            // CLOSE
            if (navWrap) navWrap.setAttribute("data-nav", "closed");
            document.body.style.overflow = '';

            tl.to(overlay, { autoAlpha: 0 })
              .to(menu, { xPercent: 100, ease: "power3.in" }, "<")
              .to(menuButtonIcon, { rotate: 0 }, "<")
              .set(navWrap, { display: "none" });
        }

      }, containerRef);
      
      return () => ctx.revert();
  }, [isMenuOpen]);

  // keydown Escape handling
  useEffect(() => {
    const handleEsc = (e) => {
        if (e.key === "Escape" && isMenuOpen) {
            setIsMenuOpen(false);
        }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef} className="kinetic-nav-root">
        {/* Toggle Button (Visible on Mobile) */}
        <div className="nav-toggle-wrapper show-on-mobile">
            <button role="button" className="nav-close-btn" onClick={toggleMenu} style={{ pointerEvents: 'auto', background: 'transparent', border:'none', cursor:'pointer' }}>
                <div className="icon-wrap">
                    {/* Replaced complex SVG with simple 3-lines (Menu) icon */}
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="menu-button-icon"
                    >
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                </div>
            </button>
        </div>

      {/* Fullscreen Menu */}
      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper" style={{ display: 'none' }}>
          <div className="overlay" onClick={closeMenu}></div>
          <nav className="menu-content">
            {/* Abstract shapes inside the white panel */}
            <div className="ambient-background-shapes">
              <svg className="bg-shape bg-shape-1 active" viewBox="0 0 400 400" fill="none">
                <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(99,102,241,0.15)" />
                <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(139,92,246,0.12)" />
                <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(236,72,153,0.1)" />
              </svg>
            </div>

            <div className="menu-content-wrapper" style={{ zIndex: 50, position: 'relative' }}>
              <ul className="menu-list" style={{ pointerEvents: 'auto' }}>
                <li className="menu-list-item">
                  <Link href="/" className="nav-link w-inline-block" onClick={closeMenu}>
                    <p className="nav-link-text" style={{ color: '#000' }}>Home</p>
                  </Link>
                </li>
                <li className="menu-list-item">
                  <Link href="/hospitals" className="nav-link w-inline-block" onClick={closeMenu}>
                    <p className="nav-link-text" style={{ color: '#000' }}>Services</p>
                  </Link>
                </li>
                {user ? (
                   <>
                    <li className="menu-list-item">
                        <Link href="/bookings" className="nav-link w-inline-block" onClick={closeMenu}>
                            <p className="nav-link-text" style={{ color: '#000' }}>My Bookings</p>
                        </Link>
                    </li>
                    <li className="menu-list-item">
                        <button className="nav-link w-inline-block" onClick={() => { logout(); closeMenu(); }} style={{ background:'transparent', border:'none', textAlign:'left', width:'100%' }}>
                            <p className="nav-link-text" style={{ color: '#ff6f61' }}>Logout</p>
                        </button>
                    </li>
                   </>
                ) : (
                    <li className="menu-list-item">
                         <div className="nav-link w-inline-block" style={{ opacity: 0.5 }}>
                            <p className="nav-link-text" style={{ color: '#000' }}>Guest User</p>
                         </div>
                    </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </section>

      <style jsx>{`
        .kinetic-nav-root {
            /* Scoped styles */
        }
        
        .nav-toggle-wrapper {
             z-index: 1001;
             position: relative;
        }

        .nav-close-btn {
            display: flex;
            align-items: center;
            gap: 12px;
            overflow: hidden;
            height: 48px;
            padding-right: 12px;
        }

        .menu-button-text {
            display: flex;
            flex-direction: column;
            height: 20px;
            overflow: hidden;
            text-align: right;
            font-weight: 600;
            color: #111827;
            font-size: 0.9rem;
        }

        .icon-wrap {
            width: 32px;
            height: 32px;
            background: #f3f4f6;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #111827;
        }

        .fullscreen-menu-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
        }

        .nav-overlay-wrapper {
            width: 100%;
            height: 100%;
            pointer-events: auto;
        }

        .overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.5);
            opacity: 0;
        }

        .menu-content {
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            max-width: 500px;
            height: 100%;
            background: #fff;
            transform: translateX(100%);
            box-shadow: -5px 0 25px rgba(0,0,0,0.1);
            z-index: 1000;
        }

        /* Abstract shapes container */
        .ambient-background-shapes {
            position: absolute;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            overflow: hidden;
        }

        .menu-content-wrapper {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            padding: 4rem 2rem;
        }

        .menu-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .menu-list-item {
            overflow: hidden;
        }

        .nav-link {
            display: block;
            text-decoration: none;
            color: #000000; /* Force Black */
            font-size: 2.5rem;
            font-weight: 800;
            line-height: 1.1;
            opacity: 1 !important; /* Force Visibility */
        }

        .nav-link-text {
            margin: 0;
        }

        @media (max-width: 480px) {
            .nav-link {
                font-size: 2rem;
            }
        }
      `}</style>
    </div>
  );
}
