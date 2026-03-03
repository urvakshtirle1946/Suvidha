'use client';
import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function WaitlistLanding() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    // Simulate API call for waitlist registration
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 800);
  };

  // Success Confirmation Screen
  if (submitted) {
    return (
      <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #2b1049 0%, #17172b 50%, #10101f 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem'
      }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Vidrush</h1>
            <button style={{ color: 'rgba(255,255,255,0.7)', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}>
              &rarr; Log Out
            </button>
        </header>

        {/* Content */}
        <main style={{ maxWidth: '600px', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: '500', lineHeight: '1.1', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
              Your Studio<br/>Seat Is Reserved.
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2.5rem' }}>
                <CheckCircle2 color="#22c55e" size={24} fill="rgba(34, 197, 94, 0.2)" />
                <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>You're on the waitlist</span>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Vidrush is live and creators are already producing <span style={{color: 'white'}}>fully-autonomous videos.</span>
            </p>
            
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '3rem' }}>
              You'll be the next wave—we'll ping you the moment a slot opens.
            </p>

            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: '1.6' }}>
              Want early entry? Keep an eye on your inbox for priority invitations and special updates.
            </p>
        </main>
      </div>
    );
  }

  // Initial Signup Screen
  return (
    <div style={{
        minHeight: '100vh',
        backgroundColor: '#0026e6', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflow: 'hidden',
        position: 'relative'
    }}>
      <div style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '4rem',
          flexWrap: 'wrap'
      }}>
          
        {/* Left Side: Illustration Image */}
        <div style={{ flex: '1 1 500px', position: 'relative', height: '100%', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
                src="/assets/waitlist_new_illustration.png"
                alt="Rockstar character illustration"
                onError={(e) => {
                  e.currentTarget.src = '/logo.png';
                }}
                style={{
                   width: '100%',
                   maxHeight: '600px',
                   objectFit: 'contain',
                   zIndex: 1,
                   borderRadius: '20px'
                }}
            />
        </div>

        {/* Right Side: The White Card */}
        <div style={{ 
            flex: '1 1 500px', 
            background: 'white', 
            borderRadius: '40px', 
            padding: '4rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '600px'
        }}>
            <div style={{ height: '4px', width: '60px', backgroundColor: '#f02d2d', marginBottom: '3rem' }}></div>

            <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1', color: '#111', marginBottom: '2rem', letterSpacing: '-0.03em' }}>
              Join The<br/>Revolution
            </h1>

            <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '3rem', maxWidth: '400px' }}>
              Don't let your portfolio site be boring and just like everyone else. This is a template like no other templates.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ 
                    backgroundColor: 'white', 
                    color: '#111', 
                    padding: '1.2rem', 
                    fontSize: '1.1rem', 
                    fontWeight: '700', 
                    border: '2px solid #eaeaea', 
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'border-color 0.2s, background-color 0.2s',
                    opacity: loading ? 0.7 : 1,
                    width: '100%'
                  }}
                  onMouseEnter={(e) => { if(!loading) e.currentTarget.style.borderColor = '#ccc' }}
                  onMouseLeave={(e) => { if(!loading) e.currentTarget.style.borderColor = '#eaeaea' }}
                >
                  {!loading && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  {loading ? 'Connecting...' : 'Continue with Google'}
                </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '4rem' }}>
                <div style={{ width: '40px', height: '40px', background: '#f5f5f5', borderRadius: '50%', border: '2px solid #111', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '20px', height: '20px', background: '#111', borderRadius: '50%' }}></div>
                </div>
                <div>
                    <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Illustration by the fantastic</p>
                    <p style={{ fontSize: '0.85rem', color: '#999', margin: 0, fontWeight: '600' }}>@bmendoza_22</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
