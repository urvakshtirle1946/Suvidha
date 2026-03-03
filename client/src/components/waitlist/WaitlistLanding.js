'use client';
import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { CheckCircle2 } from 'lucide-react';
import { getApiUrl } from '@/utils/api';

export default function WaitlistLanding() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
          padding: '2rem'
      }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
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
    <div style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff', 
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        overflow: 'hidden',
        position: 'relative'
    }}>
      {/* Animated Wave Background */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '60%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        {/* We use multiple SVG waves with opacity to create a smooth layered transition */}
        <svg viewBox="0 0 1440 320" style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', left: '0', animation: 'wave 20s linear infinite', opacity: 0.2 }}>
          <path fill="#0026e9" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path transform="translate(1440, 0)" fill="#0026e9" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <svg viewBox="0 0 1440 320" style={{ position: 'absolute', bottom: 0, width: '200%', height: '80%', left: '0', animation: 'wave 15s linear infinite reverse', opacity: 0.3 }}>
          <path fill="#0026e9" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,240C672,256,768,256,864,229.3C960,203,1056,149,1152,144C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path transform="translate(1440, 0)" fill="#0026e9" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,240C672,256,768,256,864,229.3C960,203,1056,149,1152,144C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <svg viewBox="0 0 1440 320" style={{ position: 'absolute', bottom: 0, width: '200%', height: '60%', left: '0', animation: 'wave 10s linear infinite', opacity: 0.6 }}>
          <path fill="#0026e9" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,106.7C672,96,768,128,864,160C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          <path transform="translate(1440, 0)" fill="#0026e9" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,106.7C672,96,768,128,864,160C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <style>
          {`
            @keyframes wave {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>
      </div>
      
      {/* Navbar - Full Width for Top-Left Logo */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', position: 'relative', zIndex: 10 }}>
           <img src="/logo.png" alt="Zelp Logo" style={{ height: '140px', objectFit: 'contain', filter: 'invert(1)', mixBlendMode: 'multiply' }} />
      </div>

      <div style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
            marginTop: '-5vh' // A slight offset because the logo takes up space at the top
        }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
              fontWeight: '500', 
              lineHeight: '1.2', 
              color: '#111', 
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-outfit)',
              whiteSpace: 'nowrap'
            }}>
              Transform your healthcare<br/>into a breeze
            </h1>

            <p style={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '3.5rem', maxWidth: '600px', fontWeight: '500', whiteSpace: 'normal' }}>
              Zelp helps you book and manage hospital treatments and lab tests instantly, just like having a personal healthcare assistant.
            </p>

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
                } catch (err) {
                  setError(err.message || 'Waitlist submission failed.');
                } finally {
                  setLoading(false);
                }
              }}
              style={{
                display: 'flex', 
                flexDirection: 'row', 
                flexWrap: 'wrap',
                gap: '1rem', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '100%', 
                maxWidth: '800px' 
              }}
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

                <div style={{ display: 'flex', gap: '0.5rem', width: '350px' }}>
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
                      border: '1px solid #d1d5db',
                      flex: 1,
                      outline: 'none',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      transition: 'border-color 0.2s',
                      minWidth: '200px'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0026e9'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                  
                  <button 
                    type="submit"
                    disabled={loading}
                    style={{ 
                      backgroundColor: '#0026e9', 
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
                    onMouseEnter={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#001bb3' }}
                    onMouseLeave={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#0026e9' }}
                  >
                    {loading ? 'Joining...' : 'Join'}
                  </button>
                </div>
            </form>
             {error && (
                <p style={{ color: '#dc2626', fontSize: '0.9rem', marginTop: '1rem' }}>
                  {error}
                </p>
              )}
        </div>
      </div>
    </div>
  );
}
