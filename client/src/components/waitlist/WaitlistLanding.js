import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import Link from 'next/link';
import DemoOne from '@/components/ui/demo';

export default function WaitlistLanding() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showManualEmailForm, setShowManualEmailForm] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const persistState = localStorage.getItem('zelp_waitlist_submitted');
    if (persistState === 'true') setSubmitted(true);
  }, []);

  const openWaitlisterForm = () => setShowManualEmailForm(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) { videoRef.current.pause(); } else { videoRef.current.play(); }
      setIsPlaying(!isPlaying);
    }
  };

  /* ── Submitted state ── */
  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0a0b14', color: '#fff', fontFamily: 'var(--font-helvetica)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '20%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
        <nav style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', position: 'relative', zIndex: 10 }}>
          <img src="/logo.png" alt="Zelp Logo" style={{ height: '60px', objectFit: 'contain' }} />
          <button onClick={() => { localStorage.removeItem('zelp_waitlist_submitted'); setSubmitted(false); setLoading(false); setError(''); }} style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Log Out
          </button>
        </nav>
        <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto', padding: '4rem 2rem', position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '600', marginBottom: '1.5rem', lineHeight: '1.1', letterSpacing: '-0.03em', color: '#fff' }}>Your Spot Is Reserved.</h1>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', padding: '0.4rem 0.8rem', borderRadius: '99px', marginBottom: '2.5rem' }}>
            <div style={{ backgroundColor: '#22c55e', borderRadius: '50%', display: 'flex', padding: '2px' }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#22c55e' }}>You&apos;re on the waitlist</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '3.5rem', maxWidth: '680px' }}>
            <p>Zelp is preparing to revolutionize healthcare booking, and we&apos;re already onboarding top medical centers.</p>
            <p>You&apos;ll be part of the early wave. We&apos;ll notify you the moment a slot becomes available in your area.</p>
            <p>Want early entry? Keep an eye on your inbox for priority invitations and special updates from the Zelp team.</p>
          </div>
          <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', fontWeight: '500' }}>
            Built in <span style={{ color: '#ef4444' }}>&hearts;</span> Indore
          </div>
        </div>
      </div>
    );
  }

  /* ── Main landing page ── */
  return (
    <>
      <style>{`
        .waitlist-actions { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; align-items: center; }
        .footer-content { max-width: 1000px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding: 0 2rem; }
        .footer-section { flex: 1 1 300px; display: flex; align-items: center; }
        .footer-left { justify-content: flex-start; }
        .footer-center { justify-content: center; gap: 1.5rem; }
        .footer-right { justify-content: flex-end; gap: 1.25rem; }
        .video-wrapper { position: relative; margin-top: 3rem; margin-bottom: 1rem; width: 100%; max-width: 1000px; }
        @media (max-width: 640px) {
          .hero-heading { line-height: 1.15 !important; }
          .waitlist-actions { width: 100%; flex-direction: column; align-items: center; }
          .footer-content { flex-direction: column; gap: 2rem; }
          .footer-section { flex: 1 1 auto; width: 100%; }
          .footer-left, .footer-center, .footer-right { justify-content: center; text-align: center; }
          .video-wrapper { margin-bottom: 1rem; }
          #hero { padding-top: 0rem !important; padding-bottom: 1.5rem !important; }
          .badge-text { font-size: 0.9rem !important; padding: 0.4rem 0.8rem !important; white-space: normal !important; }
        }
      `}</style>

      {/* ── Outer wrapper — beige background ── */}
      <div style={{ backgroundColor: '#FAF6F0' }}>

        {/* Navbar + hero + video all in one centered flex column */}
        <div style={{ padding: '0 clamp(1.5rem, 5vw, 2.5rem)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Navbar */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
            <img src="/logo.png" alt="Zelp Logo" style={{ height: 'clamp(130px, 12vw, 170px)', objectFit: 'contain', filter: 'invert(1)', mixBlendMode: 'multiply', marginTop: '-25px', marginBottom: '-25px' }} />
            <button onClick={openWaitlisterForm} style={{ backgroundColor: '#2b1b12', color: '#FAF6F0', padding: '0.65rem 1.25rem', fontSize: '0.95rem', fontWeight: '500', border: 'none', borderRadius: '10px', cursor: 'pointer', fontFamily: 'var(--font-helvetica)' }}>
              Join waitlist
            </button>
          </div>

          {/* Hero text */}
          <div id="hero" style={{ textAlign: 'center', maxWidth: '840px', width: '100%', paddingTop: '0rem', paddingBottom: '1.5rem', marginTop: '-5.5rem' }}>
            {/* Peerlist Badge */}
            <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
              <a href="https://peerlist.io/anishsarkar/project/zelp" target="_blank" rel="noreferrer" style={{ display: 'inline-block' }}>
                <img
                  src="https://peerlist.io/api/v1/projects/embed/PRJH7B8BLKR8GRBQJF96G67AQK8QP8?showUpvote=true&theme=light"
                  alt="Zelp"
                  style={{ width: 'auto', height: '72px' }}
                />
              </a>
            </div>
            {/* Badge */}
            <div className="badge-text" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.35rem 1rem', borderRadius: '999px', border: '1px solid rgba(60,40,20,0.18)', color: '#5a3e2b', fontSize: '0.82rem', fontWeight: 500, marginBottom: '1.6rem', letterSpacing: '0.01em', fontFamily: 'var(--font-helvetica)', gap: '0.5rem' }}>
              <span style={{ minWidth: '8px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.8)', flexShrink: 0 }}></span>
              <span>Fastest Medical Tests Booking | Now in Indore!</span>
            </div>
            <h1 className="hero-heading" style={{ fontSize: 'clamp(3rem, 11vw, 5.5rem)', fontWeight: 500, fontFamily: 'var(--font-cormorant-garamond)', lineHeight: '1.02', color: '#1a120a', marginBottom: '1.5rem', letterSpacing: '-0.04em', textAlign: 'center' }}>
              Compare prices and book medical tests online
            </h1>
            <p style={{ color: '#7f7165', fontSize: 'clamp(0.95rem, 3.5vw, 1.15rem)', lineHeight: '1.5', marginBottom: '2.5rem', maxWidth: '600px', marginInline: 'auto', fontFamily: 'var(--font-helvetica)', fontWeight: 400 }}>
              <strong>MRI • CT scans • X-rays • Lab tests</strong><br />
              From nearby hospitals with confirmed time slots
            </p>
            <div className="waitlist-actions" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
              <button
                type="button"
                onClick={openWaitlisterForm}
                style={{ backgroundColor: '#2b1b12', color: '#FAF6F0', padding: '1rem 2.5rem', fontSize: '1.05rem', fontWeight: 500, border: 'none', borderRadius: '16px', cursor: 'pointer', height: '56px', whiteSpace: 'nowrap', fontFamily: 'var(--font-helvetica)', letterSpacing: '0.01em', transition: 'transform 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
                Get Early Access
              </button>
            </div>
            {error && <p style={{ color: '#dc2626', fontSize: '0.9rem', marginTop: '1rem' }}>{error}</p>}
          </div>

          {/* Video — max-width 1000px, wider than the 780px hero text */}
          <div className="video-wrapper" style={{ maxWidth: '1000px', width: '100%' }}>
            <div style={{ position: 'absolute', top: '-20%', left: '-15%', right: '-15%', bottom: '-20%', background: 'linear-gradient(to right, #8b5cf6, #3b82f6)', filter: 'blur(120px)', opacity: 0.5, borderRadius: '50%', zIndex: 0, pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1, width: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', backgroundColor: '#000' }}>
              <video ref={videoRef} autoPlay loop muted={isMuted} playsInline style={{ width: '100%', display: 'block' }}>
                <source src="/assets/Zelp Launch.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div style={{ position: 'absolute', bottom: '24px', right: '24px', display: 'flex', gap: '12px' }}>
                <button type="button" onClick={togglePlay} style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button type="button" onClick={toggleMute} style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
              </div>
            </div>
          </div>

        </div>{/* end flex column */}

        {/* How it works */}
        <DemoOne />

        {/* Footer */}
        <footer style={{ width: '100%', padding: '2rem 0 1.5rem', color: '#111827' }}>
          <div className="footer-content">
            <div className="footer-section footer-left">
              <img src="/logo.png" alt="Zelp Logo" style={{ height: '160px', objectFit: 'contain', filter: 'invert(1)', mixBlendMode: 'multiply', marginTop: '-30px', marginBottom: '-30px' }} />
            </div>
            <div className="footer-section footer-center" style={{ flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <Link href="/about" style={{ color: '#111827', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, opacity: 0.9 }}>tech team</Link>
                <Link href="/terms-of-service" style={{ color: '#111827', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, opacity: 0.9 }}>terms of service</Link>
                <Link href="/privacy-policy" style={{ color: '#111827', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, opacity: 0.9 }}>privacy policy</Link>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '500' }}>
                Built in <span style={{ color: '#ef4444' }}>&hearts;</span> Indore
              </div>
            </div>
            <div className="footer-section footer-right">
              <a href="https://x.com/tryzelp" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" style={{ color: '#111827', display: 'flex', alignItems: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/></svg>
              </a>
              <a href="https://www.instagram.com/tryzelp" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#111827', display: 'flex', alignItems: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.169a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" fill="currentColor"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/tryzelp/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#111827', display: 'flex', alignItems: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="currentColor"/></svg>
              </a>
            </div>
          </div>
        </footer>

      </div>{/* end outer beige wrapper */}

      {/* Waitlister modal — fixed overlay, sibling to the page content */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999, padding: '1rem',
          transition: 'opacity 0.2s ease-out, visibility 0.2s ease-out',
          opacity: showManualEmailForm ? 1 : 0,
          visibility: showManualEmailForm ? 'visible' : 'hidden',
          pointerEvents: showManualEmailForm ? 'auto' : 'none',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) setShowManualEmailForm(false); }}
      >
        <div style={{ width: '100%', maxWidth: '520px', background: '#fff', borderRadius: '16px', padding: '2rem 1.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', transform: showManualEmailForm ? 'scale(1)' : 'scale(0.95)', transition: 'transform 0.2s ease-out' }}>
          <button
            onClick={() => setShowManualEmailForm(false)}
            style={{ position: 'absolute', top: '16px', right: '16px', background: '#f3f4f6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4b5563', transition: 'background 0.2s' }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#e5e7eb'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = '#f3f4f6'; }}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div className="waitlister-form" data-waitlist-key="3SMfipgo2R1D" data-height="307px"></div>
        </div>
      </div>
    </>
  );
}
