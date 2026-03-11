import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import Link from 'next/link';
import { apiFetch } from '@/utils/api';

export default function WaitlistLanding() {
  const [isMounted, setIsMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showManualEmailForm, setShowManualEmailForm] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    // Restore submitted state from localStorage
    const persistState = localStorage.getItem('zelp_waitlist_submitted');
    if (persistState === 'true') {
      setSubmitted(true);
    }
  }, []);


  const openWaitlisterForm = () => {
    setShowManualEmailForm(true);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };


  if (submitted) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0a0b14', 
        color: '#fff', 
        fontFamily: 'var(--font-helvetica)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Background Gradients / Spotlights */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '20%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0
        }} />

        {/* Top Navigation */}
        <nav style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1.5rem 2rem',
          position: 'relative',
          zIndex: 10
        }}>
          <img
            src="/logo.png"
            alt="Zelp Logo"
            style={{ height: '60px', objectFit: 'contain' }}
          />
          <button 
            onClick={() => {
              localStorage.removeItem('zelp_waitlist_submitted');
              setSubmitted(false);
              setLoading(false);
              setError('');
            }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Log Out
          </button>
        </nav>

        {/* Main Content */}
        <div style={{ 
          maxWidth: '800px', 
          width: '100%',
          margin: '0 auto', 
          padding: '4rem 2rem',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <a href="https://www.producthunt.com/products/zelp-2?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-zelp-2" target="_blank" rel="noopener noreferrer">
              <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1094833&amp;theme=light&amp;t=1773186593807" alt="Zelp - Compare prices and book medical tests instantly | Product Hunt" style={{ width: '250px', height: '54px' }} width="250" height="54" />
            </a>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            letterSpacing: '-0.03em',
            color: '#fff'
          }}>
            Your Spot Is Reserved.
          </h1>

          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            padding: '0.4rem 0.8rem',
            borderRadius: '99px',
            marginBottom: '2.5rem'
          }}>
            <div style={{ 
              backgroundColor: '#22c55e', 
              borderRadius: '50%', 
              display: 'flex', 
              padding: '2px' 
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#22c55e' }}>
              You're on the waitlist
            </span>
          </div>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.5rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '1.05rem',
            lineHeight: '1.6',
            marginBottom: '3.5rem',
            maxWidth: '680px'
          }}>
            <p>
              Zelp is preparing to revolutionize healthcare booking, and we're already onboarding top medical centers.
            </p>
            <p>
              You'll be part of the early wave—we'll notify you the moment a slot becomes available in your area.
            </p>
            <p>
              Want early entry? Keep an eye on your inbox for priority invitations and special updates from the Zelp team.
            </p>
          </div>


          {/* New Footer for Success Page */}
          <div style={{ 
            marginTop: 'auto', 
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.5)',
            fontWeight: '500'
          }}>
            Build by <span style={{ color: '#ef4444' }}>❤️</span> <a href="https://www.linkedin.com/in/urvaksh-tirle" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>Urvaksh</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .waitlist-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }
        .footer-content {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-section {
          flex: 1 1 300px;
          display: flex;
          align-items: center;
        }
        .footer-left { justify-content: flex-start; }
        .footer-center { justify-content: center; gap: 1.5rem; }
        .footer-right { justify-content: flex-end; gap: 1.25rem; }
        .video-wrapper {
          position: relative;
          margin-top: 3rem;
          margin-bottom: 8rem;
          width: 100%;
          max-width: 1000px;
        }
        @media (max-width: 640px) {
          .waitlist-actions {
            width: 100%;
            flex-direction: column;
          }
          .waitlist-actions > button {
            width: 100%;
          }
          .footer-content {
            flex-direction: column;
            gap: 2rem;
          }
          .footer-section {
            flex: 1 1 auto;
            width: 100%;
          }
          .footer-left, .footer-center, .footer-right {
            justify-content: center;
          }
          .video-wrapper {
            margin-bottom: 4rem;
          }
        }
      `}</style>

      <div
        style={{
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 clamp(1rem, 5vw, 2rem)',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem' }}>
          <img
            src="/logo.png"
            alt="Zelp Logo"
            style={{ height: 'clamp(70px, 10vw, 140px)', objectFit: 'contain', filter: 'invert(1)', mixBlendMode: 'multiply', marginTop: '-20px' }}
          />

          <button
            onClick={openWaitlisterForm}
            style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '0.6rem 1.2rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Join waitlist
          </button>
        </div>

        <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: '1000px', width: '100%', margin: 'auto 0', paddingTop: '2rem', paddingBottom: '3rem' }}>
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
              <a href="https://www.producthunt.com/products/zelp-2?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-zelp-2" target="_blank" rel="noopener noreferrer">
                <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1094833&amp;theme=light&amp;t=1773186593807" alt="Zelp - Compare prices and book medical tests instantly | Product Hunt" style={{ width: '250px', height: '54px' }} width="250" height="54" />
              </a>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2rem, 8vw, 4.5rem)', 
              fontWeight: '500', 
              fontFamily: 'var(--font-helvetica)',
              lineHeight: '1.2', 
              color: '#111', 
              marginBottom: '1rem', 
              letterSpacing: '-0.02em' 
            }}>
              The fastest way to book medical tests
            </h1>

            <p style={{ color: '#4b5563', fontSize: 'clamp(0.95rem, 4vw, 1.1rem)', lineHeight: '1.5', marginBottom: '2rem', maxWidth: '640px', marginInline: 'auto' }}>
              Compare prices and book MRI, CT scans, X-rays and lab tests near you with instant time slots and quick ambulance access.
            </p>

            <div className="waitlist-actions" style={{ maxWidth: '560px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

              <button
                type="button"
                onClick={openWaitlisterForm}
                style={{
                  backgroundColor: '#111827',
                  color: '#fff',
                  padding: '0.8rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  border: '1px solid #111827',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  height: '56px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 10px 15px -3px rgba(17, 24, 39, 0.4), 0 4px 6px -2px rgba(17, 24, 39, 0.2)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(17, 24, 39, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(17, 24, 39, 0.4)';
                }}
              >
                Get Early Access
              </button>
            </div>


            {error && (
              <p style={{ color: '#dc2626', fontSize: '0.9rem', marginTop: '1rem' }}>
                {error}
              </p>
            )}

            {/* Pre-render modal at start for instant speed */}
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                padding: '1rem',
                transition: 'opacity 0.2s ease-out, visibility 0.2s ease-out',
                opacity: showManualEmailForm ? 1 : 0,
                visibility: showManualEmailForm ? 'visible' : 'hidden',
                pointerEvents: showManualEmailForm ? 'auto' : 'none'
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowManualEmailForm(false);
                }
              }}
            >
              <div
                style={{
                  width: '100%',
                  maxWidth: '520px',
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '2rem 1.5rem',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  position: 'relative',
                  transform: showManualEmailForm ? 'scale(1)' : 'scale(0.95)',
                  transition: 'transform 0.2s ease-out'
                }}
              >
                <button
                  onClick={() => setShowManualEmailForm(false)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: '#f3f4f6',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#4b5563',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#e5e7eb'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#f3f4f6'}
                  aria-label="Close"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                <div 
                  className="waitlister-form" 
                  data-waitlist-key="3SMfipgo2R1D" 
                  data-height="307px"
                ></div>
              </div>
            </div>

            <div className="video-wrapper">
              {/* Spotlight Glow Effect */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20%',
                  left: '-15%',
                  right: '-15%',
                  bottom: '-20%',
                  background: 'linear-gradient(to right, #8b5cf6, #3b82f6)',
                  filter: 'blur(120px)',
                  opacity: 0.5,
                  borderRadius: '50%',
                  zIndex: 0,
                  pointerEvents: 'none'
                }}
              />

              <div style={{ position: 'relative', zIndex: 1, width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', backgroundColor: '#000' }}>
                <video ref={videoRef} autoPlay loop muted={isMuted} playsInline style={{ width: '100%', display: 'block' }}>
                  <source src="/assets/Zelp Launch.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div style={{ position: 'absolute', bottom: '24px', right: '24px', display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={togglePlay}
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(4px)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(4px)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

        <footer
          style={{
            marginTop: 'auto',
            width: '100%',
            padding: '2rem 0 1.5rem',
            color: '#111827'
          }}
        >
          <div className="footer-content">
            {/* Left: Logo */}
            <div className="footer-section footer-left">
              <img
                src="/logo.png"
                alt="Zelp Logo"
                style={{ height: '160px', objectFit: 'contain', filter: 'invert(1)', mixBlendMode: 'multiply', marginTop: '-30px', marginBottom: '-30px' }}
              />
            </div>

            {/* Center: Links */}
            <div className="footer-section footer-center" style={{ flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <Link href="/terms-of-service" style={{ color: '#111827', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, opacity: 0.9 }}>terms of service</Link>
                <Link href="/privacy-policy" style={{ color: '#111827', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, opacity: 0.9 }}>privacy policy</Link>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '500' }}>
                Build by <span style={{ color: '#ef4444' }}>❤️</span> <a href="https://www.linkedin.com/in/urvaksh-tirle" target="_blank" rel="noopener noreferrer" style={{ color: '#111827', textDecoration: 'none', borderBottom: '1px solid #e5e7eb' }}>Urvaksh</a>
              </div>
            </div>

            {/* Right: Icons */}
            <div className="footer-section footer-right">
              <a href="https://x.com/tryzelp" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" style={{ color: '#111827', display: 'flex', alignItems: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/tryzelp" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#111827', display: 'flex', alignItems: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.169a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/tryzelp/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#111827', display: 'flex', alignItems: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

