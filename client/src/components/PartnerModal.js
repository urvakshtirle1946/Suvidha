'use client';
import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Sparkles } from 'lucide-react';

export default function PartnerModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(true);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Disable body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5000, // Above everything
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(12px)',
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.25s',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '850px',
          height: 'min(780px, 90vh)',
          background: '#ffffff',
          borderRadius: '32px',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'scale(1)' : 'scale(0.96)',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 2rem',
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#ffffff',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827', margin: 0 }}>
              Partner With Us
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Open in Notion Button */}
            <a
              href="https://ash-violet-1b7.notion.site/2a8a2f6c1a0545679aae242bb9a6a9a2"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '10px',
                background: '#f3f4f6',
                border: 'none',
                color: '#374151',
                fontSize: '0.8rem',
                fontWeight: '600',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
              }}
            >
              Open Form <ExternalLink size={12} />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#4b5563',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
                e.currentTarget.style.color = '#111827';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
                e.currentTarget.style.color = '#4b5563';
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Area with Iframe */}
        <div style={{ flex: 1, position: 'relative', background: '#fafafa' }}>
          {loading && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#ffffff',
                zIndex: 10,
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  border: '3px solid #e5e7eb',
                  borderTopColor: '#a855f7',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
              <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '500' }}>
                Loading lead collection form...
              </span>
            </div>
          )}

          <iframe
            src="https://ash-violet-1b7.notion.site/ebd//2a8a2f6c1a0545679aae242bb9a6a9a2"
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
            }}
            onLoad={() => setLoading(false)}
            title="Partner With Us Form"
          />
        </div>

        {/* Footer Reminder */}
        <div
          style={{
            padding: '1rem 2rem',
            borderTop: '1px solid #f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff',
            fontSize: '0.8rem',
            color: '#6b7280',
          }}
        >
          Having trouble viewing? Use the button in the top right to open the form in a new window.
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
