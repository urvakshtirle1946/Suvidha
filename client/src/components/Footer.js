'use client';
import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer
            style={{
                marginTop: 'auto',
                width: '100%',
                padding: '4rem 0 2rem',
                background: '#fff',
                borderTop: '1px solid #f1f5f9',
                color: '#111827'
            }}
        >
            <div className="container" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '2rem'
                }}>
                    {/* Left: Branding */}
                    <div style={{ flex: '1 1 300px' }}>
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <span style={{ 
                                fontSize: '2rem', fontWeight: '800', color: '#000', 
                                letterSpacing: '-1.5px', fontFamily: 'var(--font-outfit), sans-serif'
                            }}>
                                Zelp
                            </span>
                        </Link>
                        <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.95rem', maxWidth: '280px', lineHeight: '1.6' }}>
                            Premium healthcare simplified. Book verified services and tests with top priority.
                        </p>
                    </div>

                    {/* Center: Quick Links */}
                    <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
                        <div>
                            <h4 style={{ marginBottom: '1.2rem', fontSize: '1rem', fontWeight: '700' }}>Company</h4>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <li><Link href="/" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.9rem' }}>Home</Link></li>
                                <li><Link href="/hospitals" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.9rem' }}>Services</Link></li>
                                <li><Link href="/about" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '1.2rem', fontSize: '1rem', fontWeight: '700' }}>Legal</h4>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <li><Link href="/terms-of-service" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</Link></li>
                                <li><Link href="/privacy-policy" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Social & Contact */}
                    <div style={{ flexShrink: 0 }}>
                        <h4 style={{ marginBottom: '1.2rem', fontSize: '1rem', fontWeight: '700' }}>Follow Us</h4>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                             <a href="#" className="social-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111827' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                             </a>
                             <a href="#" className="social-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111827' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                             </a>
                        </div>
                    </div>
                </div>

                <div style={{ paddingTop: '2rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>© 2026 Zelp Healthcare. All rights reserved.</p>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                        Built with ❤️ by <a href="https://www.linkedin.com/in/urvaksh-tirle" target="_blank" rel="noopener noreferrer" style={{ color: '#111827', textDecoration: 'none', fontWeight: '600' }}>Urvaksh</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
