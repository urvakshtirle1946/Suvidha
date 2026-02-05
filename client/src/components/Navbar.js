'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from '@/context/LocationContext';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import { TextReveal } from './ui/text-reveal-animation';
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { location } = useLocation();

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
        <div className="container" style={{ 
          width: '100%',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          gap: '2rem'
        }}>
          {/* Logo & Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                  <TextReveal word="Suvidha" />
              </Link>
              
              {/* Location Display */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#1f2937', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {location || 'Detecting Location...'}
                        </span>
                        <ChevronDown size={16} color="#1f2937" />
                   </div>
              </div>
          </div>

          {/* Nav Links */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
             <Link href="/" style={{ fontWeight: '500', color: '#1f2937' }}>Home</Link>
             <Link href="/hospitals" style={{ fontWeight: '500', color: '#1f2937' }}>Services</Link>
          </div>
          
          {/* Right Actions */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
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
              
              <button className="btn btn-primary" style={{ borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem' }}>
                  <ShoppingCart size={18} /> My Cart
              </button>
          </div>
        </div>
      </nav>
    </>
  );
}
