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
        <div style={{ flex: '1 1 500px', position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Minimalist representation of the hero graphic from Image 1 */}
            <div style={{ position: 'relative', width: '300px', height: '400px' }}>
                {/* Window graphic */}
                <div style={{ position: 'absolute', top: '0', right: '-80px', width: '80px', height: '100px', border: '4px solid white', borderRadius: '4px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '4px', padding: '4px' }}>
                    <div style={{ border: '2px solid white', borderRadius: '2px' }}></div>
                    <div style={{ border: '2px solid white', borderRadius: '2px' }}></div>
                    <div style={{ border: '2px solid white', borderRadius: '2px' }}></div>
                    <div style={{ border: '2px solid white', borderRadius: '2px' }}></div>
                </div>
                
                {/* Abstract Character Shapes matching vibe */}
                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', display: 'flex', justifyContent: 'center' }}>
                   <div style={{ 
                       width: '60px', height: '180px', background: 'black', borderRadius: '30px 30px 0 0',
                       position: 'relative', zIndex: 2
                   }}>
                       <div style={{ position: 'absolute', top: '20px', left: '15px', width: '30px', height: '30px', background: 'white', borderRadius: '50%' }}></div>
                   </div>
                   {/* Rock hand / Guitar abstraction */}
                   <div style={{ 
                       width: '30px', height: '150px', background: 'white', position: 'absolute', top: '-100px', right: '80px', transform: 'rotate(15deg)', borderRadius: '15px', zIndex: 1
                   }}></div>
                   {/* Ground bubble */}
                   <div style={{ position: 'absolute', bottom: '-20px', right: '-50px', width: '150px', height: '80px', background: 'white', borderRadius: '100px 100px 0 0', border: '2px solid black' }}></div>
                </div>
            </div>
            {/* Visual Decorative Background circle */}
            <div style={{ position: 'absolute', left: '-50px', top: '100px', width: '300px', height: '300px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', zIndex: 0 }}></div>
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
