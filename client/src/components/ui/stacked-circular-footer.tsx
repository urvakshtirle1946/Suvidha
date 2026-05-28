"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function StackedCircularFooter() {
  return (
    <footer style={{
      width: '100%',
      padding: '2rem 1rem',
      display: 'flex',
      justifyContent: 'center',
      background: '#f4f6fb',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        background: '#020202',
        borderRadius: '40px',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        padding: '4rem 3rem 2rem 3rem',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Glow effect */}
        <div style={{
          position: 'absolute',
          top: '-150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse at top, rgba(255, 255, 255, 0.1), transparent 70%)',
          pointerEvents: 'none',
          opacity: 0.7
        }}></div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Brand Column */}
          <div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '1.2rem', letterSpacing: '-0.03em', color: '#fff' }}>
              Zelp
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: '280px' }}>
              Redefining healthcare accessibility with premium, zero-wait hospital and lab booking experiences.
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  width: '40px', height: '40px', borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.05)', color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#000'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Home', path: '/' },
                { name: 'Hospitals', path: '/hospitals' },
                { name: 'Lab Tests', path: '/lab-tests' },
                { name: 'Scans & MRI', path: '/hospitals?category=Scan' },
                { name: 'About Us', path: '/about' }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.path} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s ease' }}
                    onMouseOver={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#fff'}
                    onMouseOut={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>Legal & Support</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { name: 'Terms of Service', path: '/terms-of-service' },
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Refund Policy', path: '/terms-of-service#refund' },
                { name: 'Contact Support', path: 'https://cal.com/urvakshtirle/30min' },
                { name: 'Partner with Us', path: 'https://tally.so/r/Y5OjLz' }
              ].map((link, i) => (
                <li key={i}>
                  {link.name === 'Partner with Us' || link.name === 'Contact Support' ? (
                    <a 
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s ease' }}
                      onMouseOver={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#fff'}
                      onMouseOut={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)'}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.path} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s ease' }}
                      onMouseOver={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#fff'}
                      onMouseOut={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)'}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: '#fff' }}>Contact Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}><Phone size={16} color="#fff" /></div>
                <span>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}><Mail size={16} color="#fff" /></div>
                <span>support@zelp.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}><MapPin size={16} color="#fff" /></div>
                <span>Indore, Mp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.4)',
          position: 'relative',
          zIndex: 1
        }}>
          <div>&copy; {new Date().getFullYear()} Zelp Healthcare. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Made with precision</span>
            <span>Premium Healthcare</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
