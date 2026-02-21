'use client';
import React, { useEffect, useState } from "react";
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Menu } from 'lucide-react'; // Using Lucide icons for standard look

export default function SterlingGateKineticNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  // Handle Overflow and Floating Elements
  useEffect(() => {
     const floatingGroups = document.querySelectorAll(".payment-reminder-float");
     
     if (isMenuOpen) {
         document.body.style.overflow = 'hidden';
         // Hide floating elements
         floatingGroups.forEach(el => el.style.display = 'none');
     } else {
         document.body.style.overflow = '';
         // Show floating elements
         floatingGroups.forEach(el => el.style.display = '');
     }

     return () => {
         document.body.style.overflow = '';
         floatingGroups.forEach(el => el.style.display = '');
     };
  }, [isMenuOpen]);

  // Handle Escape Key
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
    <div className="mobile-nav-root">
        {/* Toggle Button */}
        <div className="nav-toggle-wrapper show-on-mobile">
            <button className="nav-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                <Menu size={28} color="#111827" />
            </button>
        </div>

      {/* Fullscreen Menu Overlay */}
      <div className={`fullscreen-menu-container ${isMenuOpen ? 'open' : ''}`}>
        <div className="overlay" onClick={closeMenu}></div>
        
        <nav className="menu-content">
            <button className="close-btn" onClick={closeMenu} aria-label="Close Menu">
                <X size={28} color="#111827" />
            </button>

            <div className="menu-links">
                <Link href="/" className="nav-link" onClick={closeMenu}>Home</Link>
                <Link href="/hospitals" className="nav-link" onClick={closeMenu}>Services</Link>
                
                {user ? (
                   <>
                    <Link href="/bookings" className="nav-link" onClick={closeMenu}>My Bookings</Link>
                    <button className="nav-link logout-btn" onClick={() => { logout(); closeMenu(); }}>
                        Logout
                    </button>
                   </>
                ) : (
                    <div className="nav-link guest">Guest User</div>
                )}
            </div>
        </nav>
      </div>

      <style jsx>{`
        .nav-toggle-wrapper {
             z-index: 1001;
             position: relative;
        }

        .nav-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .fullscreen-menu-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 99999; /* Top priority */
            pointer-events: none;
            visibility: hidden;
            transition: visibility 0.3s;
        }

        .fullscreen-menu-container.open {
            pointer-events: auto;
            visibility: visible;
        }

        .overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.5);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .fullscreen-menu-container.open .overlay {
            opacity: 1;
        }

        .menu-content {
            position: absolute;
            top: 0;
            right: 0;
            width: 80%; /* Standard mobile drawer width */
            max-width: 300px;
            height: 100%;
            background: #fff;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
            box-shadow: -5px 0 25px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            padding: 2rem;
        }

        .fullscreen-menu-container.open .menu-content {
            transform: translateX(0);
        }

        .close-btn {
            align-self: flex-end;
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            margin-bottom: 2rem;
        }

        .menu-links {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .nav-link {
            font-size: 1.5rem;
            font-weight: 600;
            color: #111827;
            text-decoration: none;
            border-bottom: 1px solid #f3f4f6;
            padding-bottom: 0.5rem;
        }

        .logout-btn {
            text-align: left;
            color: #ef4444;
            background: none;
            border: none;
            border-bottom: 1px solid #f3f4f6;
            font-family: inherit;
            cursor: pointer;
        }

        .guest {
            color: #9ca3af;
        }
      `}</style>
    </div>
  );
}
