'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import { ChevronDown, ShoppingCart, Menu, X } from 'lucide-react';
import { TextReveal } from './ui/text-reveal-animation';
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { location } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000, 
        height: 'var(--header-height)',
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container nav-content">
          
          {/* Mobile Menu Button */}
          <button 
            className="show-on-mobile"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'transparent', border: 'none', marginRight: '1rem', cursor: 'pointer', color: '#374151' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo & Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                  <TextReveal word="Suvidha" />
              </Link>
              
              {/* Location Display - Desktop */}
              <div className="hide-on-mobile" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#1f2937', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {location || 'Detecting Location...'}
                        </span>
                        <ChevronDown size={16} color="#1f2937" />
                   </div>
              </div>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hide-on-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginRight: '2rem' }}>
             <Link href="/" style={{ fontWeight: '500', color: '#1f2937' }}>Home</Link>
             <Link href="/hospitals" style={{ fontWeight: '500', color: '#1f2937' }}>Services</Link>
          </div>
          
          {/* Right Actions */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="hide-on-mobile" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <SignedOut>
                      <Link href="/login" style={{ textDecoration: 'none' }}>
                        <button 
                            style={{ background: 'transparent', border: 'none', fontWeight: '500', fontSize: '1.1rem', cursor: 'pointer', color: '#374151' }}
                        >
                            Login
                        </button>
                      </Link>
                  </SignedOut>

                  <SignedIn>
                     <Link href="/bookings" style={{ textDecoration: 'none', color: '#374151', fontSize: '1rem', fontWeight: '500' }}>
                        My Bookings
                     </Link>
                     <UserButton />
                  </SignedIn>
              </div>
              
              {/* Cart is always visible but smaller on mobile */}
              <button className="btn btn-primary" style={{ borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem' }}>
                  <ShoppingCart size={18} /> <span className="hide-on-mobile">My Cart</span>
              </button>
              
              {/* Mobile User Button if signed in */}
               <div className="show-on-mobile">
                  <SignedIn>
                       <UserButton />
                  </SignedIn>
               </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            background: '#fff',
            borderBottom: '1px solid #e5e7eb',
            padding: '1rem',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
             {/* Mobile Location */}
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem', background: '#f3f4f6', borderRadius: '8px' }}>
                <MapPin size={16} color="#db2777" />
                <span style={{ fontSize: '0.9rem', color: '#374151' }}>{location || 'Detecting...'}</span>
             </div>

             <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.8rem', borderBottom: '1px solid #f3f4f6', fontWeight: '500', color: '#1f2937' }}>
                Home
             </Link>
             <Link href="/hospitals" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.8rem', borderBottom: '1px solid #f3f4f6', fontWeight: '500', color: '#1f2937' }}>
                Services
             </Link>
             
             <SignedOut>
                 <Link href="/login" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.8rem', fontWeight: '600', color: '#ff6f61' }}>
                    Login / Sign Up
                 </Link>
             </SignedOut>
             
             <SignedIn>
                 <Link href="/bookings" onClick={() => setMobileMenuOpen(false)} style={{ padding: '0.8rem', fontWeight: '500', color: '#1f2937' }}>
                    My Bookings
                 </Link>
             </SignedIn>
        </div>
      )}
    </>
  );
}

// Helper icon import (was missing in original replaced block context, ensure we import MapPin)
import { MapPin } from 'lucide-react';
