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
        background: 'linear-gradient(180deg, #ffffff 60%, rgba(200, 230, 255, 0.4) 100%)', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        overflow: 'hidden',
        position: 'relative'
    }}>
      <div style={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
      }}>
          
        {/* Placeholder Navbar */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', paddingBottom: '6rem' }}>
             <img src="/logo.png" alt="Zelp Logo" style={{ height: '35px', filter: 'brightness(0)' }} />
        </div>

        {/* Main Content */}
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <h1 style={{ 
              fontSize: '4.5rem', 
              fontWeight: '500', 
              lineHeight: '1.2', 
              color: '#111', 
              marginBottom: '2rem',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-outfit)'
            }}>
              Transform your healthcare<br/>into a breeze
            </h1>

            <p style={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '3.5rem', maxWidth: '600px', fontWeight: '400' }}>
              Zelp helps you book and manage hospital treatments and lab tests instantly, just like having a personal healthcare assistant.
            </p>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button 
                  style={{ 
                    backgroundColor: 'white', 
                    color: '#111', 
                    padding: '0.8rem 1.4rem', 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"></polygon>
                  </svg>
                  Watch Demo
                </button>

                <button 
                  onClick={() => loginWithGoogle()}
                  disabled={loading}
                  style={{ 
                    backgroundColor: '#5e5fe6', 
                    color: 'white', 
                    padding: '0.8rem 1.4rem', 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    border: 'none', 
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'background-color 0.2s',
                    opacity: loading ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#4e4fd6' }}
                  onMouseLeave={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#5e5fe6' }}
                >
                  {loading ? 'Joining...' : 'Continue with Google'}
                </button>
            </div>
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
