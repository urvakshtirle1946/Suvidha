'use client';
import Link from 'next/link';

const TILES = [
  {
    label: 'Top Hospitals',
    cta: 'Explore →',
    href: '/hospitals',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    fallbackImg: 'https://images.unsplash.com/photo-1586773860418-d3b97898c75c?auto=format&fit=crop&w=800&q=80',
    gridColumn: '1 / 2',
    gridRow: '1 / 3',
  },
  {
    label: 'All Treatments',
    cta: 'Explore →',
    href: '/hospitals',
    img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    gridColumn: '2 / 3',
    gridRow: '1 / 2',
  },
  {
    label: 'Popular Lab Tests',
    cta: 'View Tests →',
    href: '/lab-tests',
    img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    gridColumn: '2 / 3',
    gridRow: '2 / 3',
  },
];

export default function QuickExploreGrid() {
  return (
    <section style={{ flex: '0 0 auto' }}>
      <h2 style={{
        fontSize: 'clamp(1.05rem, 3vw, 1.35rem)',
        fontWeight: '800',
        marginBottom: '0.75rem',
        color: '#111827',
      }}>
        Explore Our Services
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '140px 140px',
        gap: '10px',
      }}>
        {TILES.map((tile, i) => (
          <div key={i} style={{
            gridColumn: tile.gridColumn,
            gridRow: tile.gridRow,
          }}>
            <Link href={tile.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <div
                className="smooth-lift"
                style={{
                  '--lift-distance': '-4px',
                  '--lift-shadow-hover': '0 16px 32px rgba(0,0,0,0.14)',
                  position: 'relative',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  height: '100%',
                  cursor: 'pointer',
                  background: '#e5e7eb',
                }}
              >
                <img
                  src={tile.img}
                  alt={tile.label}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => {
                    if (tile.fallbackImg && e.target.src !== tile.fallbackImg) {
                      e.target.src = tile.fallbackImg;
                    } else {
                      e.target.style.opacity = '0';
                    }
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 60%)',
                }} />
                <div style={{ position: 'absolute', bottom: '0.85rem', left: '0.85rem' }}>
                  <p style={{
                    color: '#fff', fontWeight: '700',
                    fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
                    margin: '0 0 5px 0',
                    textShadow: '0 1px 6px rgba(0,0,0,0.4)',
                  }}>
                    {tile.label}
                  </p>
                  <span style={{
                    color: '#fff', fontSize: '0.75rem', fontWeight: '600',
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(6px)',
                    padding: '3px 10px', borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.35)',
                  }}>
                    {tile.cta}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
