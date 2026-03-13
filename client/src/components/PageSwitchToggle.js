'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const supportsViewTransitions = () =>
  typeof document !== 'undefined' && typeof document.startViewTransition === 'function';

export default function PageSwitchToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const timeoutRef = useRef(null);

  const current = pathname === '/about' ? 'about' : 'home';
  const [visualCurrent, setVisualCurrent] = useState(current);
  const [isNavigating, setIsNavigating] = useState(false);
  const isAbout = visualCurrent === 'about';

  useEffect(() => {
    setVisualCurrent(current);
    setIsNavigating(false);
  }, [current]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const navigate = (href) => {
    const next = href === '/about' ? 'about' : 'home';
    if (next === current || isNavigating) return;

    setVisualCurrent(next);
    setIsNavigating(true);
    timeoutRef.current = setTimeout(() => {
      if (supportsViewTransitions()) {
        document.startViewTransition(() => {
          router.push(href);
        });
        return;
      }

      router.push(href);
    }, 220);
  };

  const itemStyle = (active) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: '999px',
    border: 'none',
    width: '84px',
    height: '30px',
    textAlign: 'center',
    fontSize: '0.72rem',
    fontWeight: '600',
    lineHeight: 1,
    cursor: active || isNavigating ? 'default' : 'pointer',
    color: active ? '#ffffff' : '#111111',
    backgroundColor: 'transparent',
    zIndex: 1,
    transition: 'color 0.24s ease, opacity 0.24s ease',
  });

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.2rem',
        padding: '0.22rem',
        borderRadius: '999px',
        backgroundColor: '#f3f4f6',
        border: '1px solid #d1d5db',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
        width: '174px',
        flexShrink: 0,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '3px',
          left: '3px',
          width: '84px',
          height: '30px',
          borderRadius: '999px',
          backgroundColor: '#111111',
          boxShadow: '0 1px 2px rgba(0,0,0,0.14)',
          transform: isAbout ? 'translateX(84px)' : 'translateX(0)',
          transition: 'transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      />
      <button type="button" onClick={() => navigate('/')} aria-pressed={visualCurrent === 'home'} style={itemStyle(visualCurrent === 'home')}>
        Home
      </button>
      <button type="button" onClick={() => navigate('/about')} aria-pressed={visualCurrent === 'about'} style={itemStyle(visualCurrent === 'about')}>
        About
      </button>
    </div>
  );
}
