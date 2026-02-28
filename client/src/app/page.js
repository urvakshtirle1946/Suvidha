'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function WaitlistPage() {
  const router = useRouter();
  const [showOTP, setShowOTP] = useState(false);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOTPChange = (index, val) => {
    // Only allow alphanumeric digits
    if (val && !/^[a-zA-Z0-9]$/.test(val)) return;
    
    const newOtp = [...otpValues];
    newOtp[index] = val;
    setOtpValues(newOtp);

    // Auto-advance to next input
    if (val && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Check if full OTP validates
    if (newOtp.join("") === "Zelp26") {
      router.push('/home');
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace logic to move backward
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      display: 'flex',
      backgroundColor: '#f8f9fa',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-outfit), sans-serif'
    }}>
      {/* Left Box: Form & Illustration */}
      <div style={{
        flex: 1, // Takes all remaining space
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        height: '100%'
      }}>
        <div style={{
          background: '#ffffff',
          width: '100%',
          maxWidth: '800px',
          height: '100%',
          maxHeight: '800px',
          borderRadius: '24px',
          padding: 'clamp(1.5rem, 3vh, 2rem) 2rem 0 2rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          overflow: 'hidden',
          position: 'relative'
        }}>
        
        {/* Secret Developer Access Button */}
        <button 
          onClick={() => setShowOTP(true)}
          style={{ 
            position: 'absolute', 
            top: '1.5rem', 
            right: '1.5rem', 
            border: 'none', 
            background: 'transparent', 
            color: '#e5e7eb', 
            cursor: 'pointer',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#9ca3af'}
          onMouseOut={(e) => e.currentTarget.style.color = '#e5e7eb'}
          title="Developer Access"
        >
          <Lock size={18} />
        </button>

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
          marginBottom: '1rem',
          lineHeight: '1.5'
        }}>
          Join now to access new features and updates and be part of our early community.
        </p>

        <div className="launchlist-widget" data-key-id="iCtHEk" data-height="180px"></div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '1.5rem'
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
          maxWidth: '800px',
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
              maxHeight: '50vh',    
              objectFit: 'contain',
              objectPosition: 'bottom',
              marginBottom: '-2px' 
            }} 
          />
        </div>
        </div>
      </div>

      {/* Right Box: Leaderboard iframe */}
      <div 
        className="leaderboard-container"
        style={{
          flex: '0 0 380px', // Fixed smaller width for the leaderboard
          height: '100%',
          backgroundColor: '#ffffff',
          borderLeft: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}
      >
        <iframe 
          scrolling="yes" 
          src="https://getlaunchlist.com/w/e/iCtHEk/leaderboard" 
          style={{ width: '100%', display: 'block', border: 'none', height: '100%' }}
          title="LaunchList Leaderboard"
        />
      </div>

      {/* Developer OTP Modal Overlay */}
      {showOTP && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            background: '#fff',
            padding: '2.5rem',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            textAlign: 'center',
            position: 'relative',
            fontFamily: 'var(--font-outfit), sans-serif'
          }}>
            <button 
              onClick={() => { setShowOTP(false); setOtpValue(""); }}
              style={{ 
                position: 'absolute', 
                top: '12px', 
                right: '16px', 
                background: 'transparent', 
                border: 'none', 
                cursor: 'pointer', 
                fontSize: '1.5rem',
                color: '#9ca3af'
              }}
            >
              &times;
            </button>
            <h2 style={{ marginBottom: '0.5rem', fontWeight: 600, color: '#111827' }}>Developer Access</h2>
            <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Enter the access code to bypass the waitlist.</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {otpValues.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  style={{
                    width: '40px',
                    height: '45px',
                    textAlign: 'center',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#111827',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    backgroundColor: '#fff'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0c831f';
                    e.target.style.boxShadow = '0 0 0 2px rgba(12, 131, 31, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
