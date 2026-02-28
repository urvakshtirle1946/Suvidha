'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // In a real app, send to backend here
    setTimeout(() => {
      setSubmitted(true);
      setEmail('');
    }, 600);
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      padding: '1rem',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-outfit), sans-serif'
    }}>
      <div style={{
        background: '#ffffff',
        width: '100%',
        maxWidth: '800px',
        height: '100%',
        maxHeight: '800px',
        borderRadius: '24px',
        padding: 'clamp(2rem, 5vh, 4rem) 2rem 0 2rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '500',
          color: '#111827',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
          fontFamily: 'monospace' // Simulating the typewriter/monospace vibe from the image
        }}>
          Join The Waitlist
        </h1>
        
        <p style={{
          fontSize: '1rem',
          color: '#6b7280',
          maxWidth: '450px',
          marginBottom: '2.5rem',
          lineHeight: '1.5'
        }}>
          Join now to access new features and updates and be part of our early community.
        </p>

        {submitted ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#ecfdf5',
            color: '#059669',
            padding: '1rem 2rem',
            borderRadius: '50px',
            marginBottom: '2rem',
            fontWeight: '500'
          }}>
            <CheckCircle2 size={20} />
            You're on the list! Keep an eye on your inbox.
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#f3f4f6',
              borderRadius: '50px',
              padding: '4px',
              width: '100%',
              maxWidth: '450px',
              marginBottom: '1.5rem',
              border: '1px solid #e5e7eb',
              transition: 'border-color 0.2s'
            }}
          >
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                padding: '0.8rem 1.5rem',
                flexGrow: 1,
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#374151',
                letterSpacing: '0.05em'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#111827',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50px',
                padding: '0.8rem 2rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.1s, background 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#000000'}
              onMouseOut={(e) => e.currentTarget.style.background = '#111827'}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              GET NOTIFIED
            </button>
          </form>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '3rem'
        }}>
          <div style={{ display: 'flex' }}>
            {/* Hardcoded sample avatars to match design */}
            {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
              'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80'
            ].map((src, i) => (
              <img 
                key={i}
                src={src}
                alt={`User ${i+1}`}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #ffffff',
                  marginLeft: i > 0 ? '-10px' : '0',
                  zIndex: 3 - i,
                  position: 'relative'
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '500' }}>
            Join 10,000+ others on the waitlist
          </span>
        </div>

        {/* Waitlist Illustration */}
        <div style={{
          width: '100%',
          maxWidth: '600px',
          marginTop: 'auto',
          display: 'flex',
          justifyContent: 'center',
          flex: '1 1 auto',
          minHeight: 0
        }}>
          <img 
            src="/assets/waitlist_illustration.png" 
            alt="Community Illustration" 
            style={{ 
              width: '100%', 
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom',
              marginBottom: '-2px' // Flush with the bottom of the card
            }} 
          />
        </div>

      </div>
    </div>
  );
}
