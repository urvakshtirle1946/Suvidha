'use client';
import { useState, useRef } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import { getApiUrl } from '@/utils/api';
import { StackedCircularFooter } from '@/components/ui/stacked-circular-footer';

export default function WaitlistLanding() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      setLoading(true);
      setError('');
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/auth/waitlist/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ access_token: tokenResponse.access_token })
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || 'Unable to join waitlist right now.');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => setError('Google login popup failed to open or was closed.')
  });

  // Success Confirmation Screen
  if (submitted) {
    return (
      <div style={{
          minHeight: '100vh',
          backgroundColor: '#0026e9',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 2rem 2rem 2rem'
      }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', paddingTop: '1rem' }}>
            <img src="/logo.png" alt="Zelp Logo" style={{ height: '140px', objectFit: 'contain', background: 'transparent', mixBlendMode: 'plus-lighter' }} />
            <button 
                onClick={() => setSubmitted(false)}
                style={{ color: 'rgba(255,255,255,0.9)', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}>
              &rarr; Back
            </button>
        </header>

        {/* Content */}
        <main style={{ maxWidth: '600px', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: '500', lineHeight: '1.1', marginBottom: '2rem', letterSpacing: '-0.02em', color: 'white' }}>
              Your Spot Is<br/>Reserved.
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2.5rem' }}>
                <CheckCircle2 color="#22c55e" size={24} fill="rgba(34, 197, 94, 0.2)" />
                <span style={{ fontWeight: '600', fontSize: '1.1rem', color: 'white' }}>You're on the waitlist</span>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Zelp is bringing you <span style={{color: 'white', fontWeight: 'bold'}}>affordable, hospital-level healthcare</span> right to your fingertips.
            </p>
            
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '3rem' }}>
              We're rolling out access soon—keep an eye out for when spots open up in your area.
            </p>

            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.6' }}>
              Watch your inbox for priority access invitations and exclusive updates from the Zelp team.
            </p>
        </main>
      </div>
    );
  }

  // Initial Signup Screen
  return (
    <>
    <style>{`
      .waitlist-form-mobile {
        display: flex; 
        flex-direction: row; 
        flex-wrap: wrap;
        gap: 1rem; 
        align-items: center; 
        justify-content: center;
        width: 100%; 
        max-width: 800px;
      }
      .email-input-group {
        display: flex; 
        gap: 0.5rem; 
        flex: 1 1 300px; 
        max-width: 100%;
      }
      @media (max-width: 640px) {
        .waitlist-form-mobile {
          flex-direction: column;
          gap: 1rem;
        }
        .waitlist-form-mobile > button,
        .waitlist-form-mobile .email-input-group {
          width: 100% !important;
          max-width: 100% !important;
          flex: none !important;
        }
        .email-input-group {
          flex-direction: column;
          gap: 0.75rem;
        }
        .email-input-group input,
        .email-input-group button {
          width: 100% !important;
          min-width: 100% !important;
        }
      }
    `}</style>
    <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 20%, #eaddff 45%, #9fcaff 100%)', // Increased gradient height so color reaches buttons
        display: 'flex',
        flexDirection: 'column',
        padding: '0 clamp(1rem, 5vw, 2rem) 2rem clamp(1rem, 5vw, 2rem)', 
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative'
    }}>
      {/* Navbar - Full Width for Top-Left Logo and Right Button */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10, paddingTop: '1rem' }}>
           <img src="/logo.png" alt="Zelp Logo" style={{ height: 'clamp(80px, 12vw, 120px)', objectFit: 'contain', filter: 'invert(1)', mixBlendMode: 'multiply', marginTop: '-10px' }} />
           
           <button 
             onClick={() => setShowPopup(true)}
             style={{
               backgroundColor: '#000000', 
               color: 'white', 
               padding: '0.6rem 1.2rem', 
               fontSize: '0.95rem', 
               fontWeight: '600', 
               border: 'none', 
               borderRadius: '8px',
               cursor: 'pointer',
               boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
               transition: 'all 0.2s ease',
             }}
             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1f2937'}
             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
           >
             Join waitlist
           </button>
      </div>

      <div style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
      }}>
        {/* Main Content */}
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '1000px',
            width: '100%',
            margin: 'auto 0',
            paddingTop: '2rem',
            paddingBottom: '4rem'
        }}>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 8vw, 4.5rem)', 
              fontWeight: '500', 
              lineHeight: '1.2', 
              color: '#111', 
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-outfit)',
              wordWrap: 'break-word'
            }}>
              The fastest way to book medical tests
            </h1>

            <p style={{ 
              color: '#4b5563', 
              fontSize: 'clamp(0.95rem, 4vw, 1.1rem)', 
              lineHeight: '1.5', 
              marginBottom: '2.5rem', 
              maxWidth: '600px', 
              fontWeight: '500', 
              padding: '0 0.5rem' 
            }}>
              Compare prices and book MRI, CT scans, X-rays and lab tests near you — with instant time slots and quick ambulance access.
            </p>

            <form 
              id="waitlist-form"
              onSubmit={async (e) => {
                e.preventDefault();
                const emailFormData = new FormData(e.currentTarget);
                const email = emailFormData.get('email');
                if (!email) return;

                try {
                  setLoading(true);
                  setError('');
                  const apiUrl = getApiUrl();
                  const res = await fetch(`${apiUrl}/api/auth/waitlist/email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                  });
                  const data = await res.json().catch(() => null);
                  if (!res.ok || !data?.success) {
                    throw new Error(data?.message || 'Unable to join waitlist right now.');
                  }
                  setSubmitted(true);
                } catch (err) {
                  setError(err.message || 'Waitlist submission failed.');
                } finally {
                  setLoading(false);
                }
              }}
              className="waitlist-form-mobile"
            >
                <button 
                  type="button"
                  onClick={() => loginWithGoogle()}
                  disabled={loading}
                  style={{ 
                    backgroundColor: 'white', 
                    color: '#111', 
                    padding: '0.8rem 1.5rem', 
                    fontSize: '1rem', 
                    fontWeight: '500', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                    transition: 'all 0.2s ease',
                    opacity: loading ? 0.7 : 1,
                    height: '52px',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => { if(!loading) e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  onMouseLeave={(e) => { if(!loading) e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                >
                  {!loading && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  {loading ? 'Connecting...' : 'Continue with Google'}
                </button>

                <span style={{ color: '#6b7280', fontSize: '0.95rem', fontWeight: '500', padding: '0 0.5rem' }}>or</span>

                <div className="email-input-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Enter your email address"
                    required
                    disabled={loading}
                    style={{
                      padding: '0 1rem',
                      height: '52px',
                      fontSize: '1rem',
                      borderRadius: '8px',
                      border: '3px solid #d1d5db',
                      flex: 1,
                      outline: 'none',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      transition: 'border-color 0.2s',
                      minWidth: '200px'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#000000'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                  
                  <button 
                    type="submit"
                    disabled={loading}
                    style={{ 
                      backgroundColor: '#000000', 
                      color: 'white', 
                      padding: '0 1.5rem', 
                      height: '52px',
                      fontSize: '1rem', 
                      fontWeight: '600', 
                      border: 'none', 
                      borderRadius: '8px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease',
                      opacity: loading ? 0.7 : 1,
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#1f2937' }}
                    onMouseLeave={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#000000' }}
                  >
                    {loading ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </div>
            </form>
             {error && (
                <p style={{ color: '#dc2626', fontSize: '0.9rem', marginTop: '1rem' }}>
                  {error}
                </p>
              )}

            {/* Launch Video Section */}
            <div style={{ 
              marginTop: '4rem', 
              width: '100%', 
              maxWidth: '1000px', 
              borderRadius: '24px', 
              overflow: 'hidden', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              backgroundColor: '#000',
              position: 'relative',
              marginBottom: '2rem' // Added margin to separate from footer
            }}>
              <video 
                ref={videoRef}
                autoPlay 
                loop 
                muted={isMuted}
                playsInline 
                style={{ width: '100%', display: 'block' }}
              >
                <source src="/assets/Zelp Launch.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <button
                type="button"
                onClick={toggleMute}
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '24px',
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
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  zIndex: 20
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
            </div>
            
            {/* Footer */}
            <StackedCircularFooter />
        </div>
      </div>

      {/* Join Waitlist Popup Modal */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '3rem 2rem',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            {/* Close Button */}
            <button 
              onClick={() => setShowPopup(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 style={{ fontSize: '1.8rem', fontWeight: '600', marginBottom: '0.5rem', color: '#111' }}>Join the Waitlist</h2>
            <p style={{ color: '#4b5563', marginBottom: '2rem' }}>Be the first to know when Zelp launches.</p>

            <button 
              type="button"
              onClick={() => loginWithGoogle()}
              disabled={loading}
              style={{ 
                backgroundColor: 'white', 
                color: '#111', 
                padding: '0.8rem 1.5rem', 
                fontSize: '1rem', 
                fontWeight: '500', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
                width: '100%',
                opacity: loading ? 0.7 : 1,
                height: '52px'
              }}
            >
              {!loading && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              {loading ? 'Connecting...' : 'Continue with Google'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '1.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
              <span style={{ color: '#6b7280', fontSize: '0.9rem', padding: '0 1rem' }}>or</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e5e7eb' }}></div>
            </div>

            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const emailFormData = new FormData(e.currentTarget);
                const email = emailFormData.get('email');
                if (!email) return;

                try {
                  setLoading(true);
                  setError('');
                  const apiUrl = getApiUrl();
                  const res = await fetch(`${apiUrl}/api/auth/waitlist/email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                  });
                  const data = await res.json().catch(() => null);
                  if (!res.ok || !data?.success) {
                    throw new Error(data?.message || 'Unable to join waitlist right now.');
                  }
                  setSubmitted(true);
                  setShowPopup(false);
                } catch (err) {
                  setError(err.message || 'Waitlist submission failed.');
                } finally {
                  setLoading(false);
                }
              }}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email address"
                required
                disabled={loading}
                style={{
                  padding: '0 1rem',
                  height: '52px',
                  fontSize: '1rem',
                  borderRadius: '8px',
                  border: '3px solid #d1d5db',
                  width: '100%',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#000000'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              
              <button 
                type="submit"
                disabled={loading}
                style={{ 
                  backgroundColor: '#000000', 
                  color: 'white', 
                  height: '52px',
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  border: 'none', 
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex', 
                  justifyContent: 'center',
                  alignItems: 'center',
                  transition: 'background-color 0.2s ease',
                  width: '100%'
                }}
                onMouseEnter={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#1f2937' }}
                onMouseLeave={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#000000' }}
              >
                {loading ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
            {error && (
              <p style={{ color: '#dc2626', fontSize: '0.9rem', marginTop: '1rem' }}>
                {error}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
