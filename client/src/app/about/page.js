import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | Zelp',
  description: 'Zelp is on a mission to reduce waiting times at Indian hospitals by making diagnostic test booking fast, transparent, and effortless.',
};

const metrics = [
  { label: 'Role', value: 'Co-founder & CTO' },
  { label: 'Base', value: 'Indore, India' },
  { label: 'Focus', value: 'Healthcare Tech' },
  { label: 'Mission', value: 'Reduce friction' },
];

const highlights = [
  'Building Zelp around speed, trust, and clarity.',
  'Designing simpler healthcare journeys for patients.',
  'Turning product ideas into usable, scalable systems.',
];

export default function AboutPage() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#f3f3f3',
        color: '#111111',
        fontFamily: 'var(--font-helvetica)',
        overflow: 'hidden',
        padding: '14px',
      }}
    >
      <style>{`
        .about-shell {
          max-width: 1480px;
          margin: 0 auto;
          height: calc(100vh - 28px);
          background: #ffffff;
          border-radius: 24px;
          padding: clamp(0.7rem, 1.25vw, 1.15rem);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .about-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 40px;
          margin-bottom: 0.25rem;
          flex-shrink: 0;
          position: relative;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.92fr);
          gap: clamp(1rem, 2vw, 1.75rem);
          align-items: stretch;
          flex: 1;
          min-height: 0;
        }
        .hero-copy {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100%;
          min-width: 0;
        }
        .metric-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.65rem;
          max-width: 720px;
        }
        .metric-card {
          background: #f8f8f8;
          border: 1px solid #e7e7e7;
          border-radius: 18px;
          padding: 0.72rem 0.82rem;
        }
        .hero-photo-wrap {
          position: relative;
          min-height: 0;
          display: flex;
          align-items: stretch;
        }
        .hero-photo-card {
          width: 100%;
          border-radius: 44px;
          overflow: hidden;
          background: #d9d9d9;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
          border: 1px solid #e7e7e7;
        }
        .social-chip {
          position: absolute;
          right: 1.25rem;
          bottom: 1.25rem;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255,255,255,0.96);
          border-radius: 999px;
          padding: 0.72rem 1rem;
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
          border: 1px solid #e5e5e5;
          z-index: 2;
        }
        .panel {
          background: #fafafa;
          border: 1px solid #ececec;
          border-radius: 28px;
        }
        @media (max-width: 980px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-photo-wrap {
            min-height: 280px;
          }
        }
        @media (max-width: 640px) {
          .metric-grid {
            grid-template-columns: 1fr;
          }
          .hero-photo-wrap {
            min-height: 180px;
          }
          .social-chip {
            right: 0.85rem;
            bottom: 0.85rem;
          }
        }
      `}</style>

      <main className="about-shell">
        <div className="about-topbar">
          <img src="/logo.png" alt="Zelp Logo" style={{ height: 'clamp(36px, 4vw, 56px)', objectFit: 'contain', filter: 'invert(1)', mixBlendMode: 'multiply' }} />
          <Link href="/" style={{ backgroundColor: '#000', color: '#fff', padding: '0.6rem 1.2rem', fontSize: '0.95rem', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
            <span aria-hidden="true">←</span>
            <span>Back to home</span>
          </Link>
        </div>
        <section className="hero-grid">
          <div className="hero-copy">
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  border: '1.5px solid #111111',
                  borderRadius: '999px',
                  padding: '0.3rem 0.72rem',
                  fontSize: '0.85rem',
                  marginBottom: '0.8rem',
                  backgroundColor: '#ffffff',
                }}
              >
                India
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.65rem, 7vw, 5.35rem)',
                  lineHeight: '0.92',
                  letterSpacing: '-0.07em',
                  color: '#111111',
                  margin: '0 0 0.8rem',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                }}
              >
                Urvaksh
                <br />
                Tirle
              </h1>

              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.08rem)',
                  lineHeight: '1.5',
                  color: '#525252',
                  maxWidth: '720px',
                  margin: '0 0 1rem',
                }}
              >
                Designing and building a more seamless healthcare experience through Zelp, with a focus on reducing waiting time, increasing trust, and making every interaction feel simpler for real people.
              </p>

              <div className="metric-grid">
                {metrics.map((item) => (
                  <div key={item.label} className="metric-card">
                    <div
                      style={{
                        display: 'inline-flex',
                        border: '1px solid #d4d4d4',
                        borderRadius: '999px',
                        padding: '0.28rem 0.7rem',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#404040',
                        marginBottom: '0.5rem',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: 'clamp(1.1rem, 2vw, 1.45rem)', fontWeight: '800', color: '#111111', lineHeight: '1.15' }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="panel"
              style={{
                marginTop: '0.75rem',
                padding: '0.75rem 0.9rem',
                display: 'grid',
                gap: '0.45rem',
              }}
            >
              {highlights.map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#111111', marginTop: '0.42rem', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.89rem', lineHeight: '1.38', color: '#3f3f46', fontWeight: '500' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-photo-wrap">
            <div className="hero-photo-card">
              <img
                src="/PP.png"
                alt="Urvaksh Tirle - Co-founder and CTO, Zelp"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(100%)' }}
              />
            </div>

            <div className="social-chip">
              <a
                href="https://www.linkedin.com/in/urvaksh-tirle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{ color: '#111111', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="currentColor"/>
                </svg>
              </a>
              <a
                href="https://x.com/urvaksh_tirle05"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                style={{ color: '#111111', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
