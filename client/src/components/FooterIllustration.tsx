'use client';

import React from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   ZELP Footer Illustration
   Medical healthcare team dressed in kente-cloth outfits standing in front of a 
   giant lowercase "zelp" background watermark.
   ───────────────────────────────────────────────────────────────────────────── */

export default function FooterIllustration() {
  return (
    <section
      aria-label="Zelp medical and healthcare team illustration"
      style={{
        width: '100%',
        background: '#0f0f0f',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        zIndex: 20,
        paddingBottom: '1rem',
      }}
    >
      {/* ── Centered aspect-ratio wrapper to slightly crop the watermark ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '1300px',
          aspectRatio: '2146 / 570',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* ── Characters image ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/zelp-footer-dancers.png"
            alt="Zelp medical team flat illustration dressed in kente cloth"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center bottom',
            }}
          />
        </div>

        {/* ── Side fades aligned to the image edges ── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #0f0f0f 0%, rgba(15,15,15,0) 8%, rgba(15,15,15,0) 92%, #0f0f0f 100%)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      </div>

      {/* ── Full-bleed bottom fade ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40px',
          background: 'linear-gradient(to top, #0f0f0f 0%, rgba(15,15,15,0.5) 30%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      />

      {/* ── Full-bleed top fade ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40px',
          background: 'linear-gradient(to bottom, #0f0f0f 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      />
    </section>
  );
}




