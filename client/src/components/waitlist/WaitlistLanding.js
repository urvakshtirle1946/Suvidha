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

  // Success Confirmation Screen (Matches Image 2 styling)
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
            <h1 style={{ fontSize: '4rem', fontWeight: '500', lineHeight: '1.1', marginBottom: '2rem' }}>
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

  // Initial Signup Screen (Matches Image 1 layout)
  return (
    <div style={{
        minHeight: '100vh',
        backgroundColor: '#0026e6', // Bright blue background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflow: 'hidden',
        position: 'relative'
    }}>
      {/* Container */}
      <div style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '4rem',
          flexWrap: 'wrap'
      }}>
          
        {/* Left Side: Illustration / Graphic */}
        <div style={{ flex: '1 1 500px', position: 'relative', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="400" height="450" viewBox="0 0 400 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Window Shapes */}
                <path d="M280 120 h40 v60 h-40 z" fill="transparent" stroke="white" strokeWidth="4"/>
                <path d="M280 150 h40" stroke="white" strokeWidth="4"/>
                <path d="M300 120 v60" stroke="white" strokeWidth="4"/>
                
                {/* Background Plant / Pot Shapes */}
                <ellipse cx="60" cy="220" rx="20" ry="15" fill="white" stroke="black" strokeWidth="2" />
                <path d="M50 220 v40 h20 v-40" fill="white" stroke="black" strokeWidth="2" />
                
                {/* Secondary Background Circle Base */}
                <ellipse cx="250" cy="380" rx="80" ry="40" fill="white" stroke="black" strokeWidth="2" />
                <ellipse cx="320" cy="390" rx="30" ry="20" fill="white" stroke="black" strokeWidth="2" />

                <circle cx="210" cy="375" r="3" fill="black" />
                <circle cx="240" cy="365" r="2" fill="black" />
                <circle cx="270" cy="385" r="2" fill="black" />

                {/* Rockstar Character Leg Line Patterns Area Bubble Base */}
                <path d="M120 380 Q 150 250 180 250" fill="none" stroke="black" strokeWidth="4" />
                <path d="M220 380 Q 220 250 180 250" fill="none" stroke="black" strokeWidth="4" />
                
                {/* Chequer Pants Base */}
                <path d="M180 250 H240 V380 H180 Z" fill="none" stroke="black" strokeWidth="2" />
                <path d="M200 250 V380 M220 250 V380" stroke="black" strokeWidth="1" />
                <path d="M180 280 H240 M180 310 H240 M180 340 H240" stroke="black" strokeWidth="1" />
                
                {/* Solid Black Leg Left */}
                <path d="M180 250 Q120 250 100 380 H130 Q140 280 180 260" fill="black" />
                
                {/* Boot Left */}
                <path d="M100 380 V395 H135 V380" fill="white" stroke="black" strokeWidth="2"/>
                {/* Boot Right */}
                <path d="M220 380 V395 H260 V380" fill="white" stroke="black" strokeWidth="2"/>
                
                {/* Torso & Skull Vest */}
                <path d="M160 170 H220 V250 H160 Z" fill="black" stroke="black" strokeWidth="2" />
                <path d="M160 170 H220 V210 H160 Z" fill="#0026e6" />
                {/* Vest Lapels */}
                <polygon points="160,170 180,170 170,230" fill="white" stroke="black" strokeWidth="2"/>
                <polygon points="220,170 200,170 210,230" fill="white" stroke="black" strokeWidth="2"/>
                
                {/* Skull */}
                <circle cx="190" cy="210" r="10" fill="white" />
                <rect x="185" y="210" width="10" height="15" fill="white" />
                <circle cx="186" cy="208" r="2" fill="black" />
                <circle cx="194" cy="208" r="2" fill="black" />
                <path d="M190 216 V222 M187 216 V222 M193 216 V222" stroke="black" strokeWidth="1" />

                {/* Head / Collar */}
                <circle cx="190" cy="150" r="25" fill="black" />
                <ellipse cx="190" cy="155" rx="15" ry="18" fill="white" />
                {/* Glasses / Face */}
                <rect x="180" y="145" width="20" height="8" fill="none" stroke="black" strokeWidth="2" />
                <line x1="190" y1="145" x2="190" y2="153" stroke="black" strokeWidth="2" />
                <circle cx="185" cy="149" r="2" fill="#0026e6" />
                <circle cx="195" cy="149" r="2" fill="#0026e6" />
                <line x1="187" y1="162" x2="193" y2="162" stroke="black" strokeWidth="2" />
                
                {/* Right Arm Up */}
                <path d="M215 180 Q250 160 270 100" fill="none" stroke="white" strokeWidth="25" strokeLinecap="round" />
                <path d="M215 180 Q250 160 270 100" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />
                {/* Rock Hand Horns */}
                <circle cx="270" cy="100" r="15" fill="white" />
                <path d="M260 100 V80" stroke="white" strokeWidth="6" strokeLinecap="round" />
                <path d="M280 100 V80" stroke="white" strokeWidth="6" strokeLinecap="round" />
                
                {/* Left Arm holding Guitar */}
                <path d="M165 180 Q150 250 185 285" fill="none" stroke="white" strokeWidth="25" strokeLinecap="round" />
                <path d="M165 180 Q150 250 185 285" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" />

                {/* The Guitar Component */}
                <g transform="translate(180, 240) rotate(-40)">
                   <polygon points="0,0 80,0 120,-20 80,-40 0,-40" fill="white" stroke="black" strokeWidth="2" />
                   <rect x="-10" y="-22" width="200" height="4" fill="white" stroke="black" strokeWidth="1" />
                   <circle cx="50" cy="-20" r="5" fill="none" stroke="black" strokeWidth="1" />
                   <circle cx="10" cy="-30" r="4" fill="none" stroke="black" strokeWidth="1" />
                   <circle cx="25" cy="-30" r="4" fill="none" stroke="black" strokeWidth="1" />
                   <path d="M200 -24 V-16 H220 V-24 Z" fill="white" stroke="black" strokeWidth="2" />
                </g>
                
                {/* Decorative Faint Circle Outline */}
                <circle cx="110" cy="180" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <circle cx="80" cy="140" r="5" fill="rgba(255,255,255,0.2)" />
                <circle cx="150" cy="110" r="3" fill="rgba(255,255,255,0.2)" />
            </svg>
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
            {/* Small red line accent */}
            <div style={{ height: '4px', width: '60px', backgroundColor: '#f02d2d', marginBottom: '3rem' }}></div>

            <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1', color: '#111', marginBottom: '2rem' }}>
              Join The<br/>Revolution
            </h1>

            <p style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '3rem', maxWidth: '400px' }}>
              Don't let your portfolio site be boring and just like everyone else. This is a template like no other templates.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                      padding: '1.2rem',
                      fontSize: '1rem',
                      border: '2px solid #eee',
                      borderRadius: '8px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      width: '100%'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0026e6'}
                  onBlur={(e) => e.target.style.borderColor = '#eee'}
                  required
                />
                
                <button 
                  type="submit"
                  disabled={loading}
                  style={{ 
                    backgroundColor: '#f02d2d', 
                    color: 'white', 
                    padding: '1.2rem 2rem', 
                    fontSize: '1.1rem', 
                    fontWeight: '700', 
                    border: 'none', 
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'background-color 0.2s',
                    opacity: loading ? 0.7 : 1,
                    width: '100%'
                  }}
                  onMouseEnter={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#d01e1e' }}
                  onMouseLeave={(e) => { if(!loading) e.currentTarget.style.backgroundColor = '#f02d2d' }}
                >
                  {loading ? 'Processing...' : 'Get Started'}
                  <div style={{ background: 'rgba(0,0,0,0.1)', padding: '5px', borderRadius: '50%' }}>
                      <ArrowRight size={20} color="white" />
                  </div>
                </button>
            </form>

            {/* Footer Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '4rem' }}>
                <div style={{ width: '40px', height: '40px', background: '#f5f5f5', borderRadius: '50%', border: '2px solid #111', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Placeholder Profile illustration */}
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
