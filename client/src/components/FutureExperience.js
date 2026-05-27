'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: '10-Mins Ambulance',
    subtitle: 'Ultra-fast emergency response',
    description: 'A revolutionary GPS-tracked ambulance network that guarantees arrival at your doorstep within 10 minutes.',
    image: 'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=800&q=80',
    tags: ['Emergency', '10-Min'],
  },
  {
    id: 2,
    title: 'Post Medicare',
    subtitle: 'Holistic post-treatment care',
    description: 'Expert medical monitoring and rehabilitation services delivered at your home after hospital discharge.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    tags: ['Rehab', 'Home-Care'],
  },
  {
    id: 3,
    title: 'Instant Bed Booking',
    subtitle: 'Real-time hospital inventory',
    description: 'Check live ICU and ward bed availability across top hospitals and book instantly in one tap.',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80',
    tags: ['ICU', 'Confirmed'],
  }
];

export default function FutureExperience() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : CAROUSEL_ITEMS.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < CAROUSEL_ITEMS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section style={{
      width: '100%',
      padding: '6rem 0',
      background: 'transparent', // Removed white background
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ maxWidth: '700px' }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: '900', 
              color: '#111827', 
              marginBottom: '1rem', 
              letterSpacing: '-0.04em',
              background: 'linear-gradient(to right, #111827, #4b5563)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Discover Future Experience
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#6b7280', lineHeight: '1.7', fontWeight: '500' }}>
              We are building the next generation of healthcare technology. 
              Explore upcoming features that will transform your medical experience.
            </p>
          </div>
        </div>

        {/* Carousel Section */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '650px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {CAROUSEL_ITEMS.map((item, index) => {
            let diff = index - activeIndex;
            if (diff < -2) diff += CAROUSEL_ITEMS.length;
            if (diff > 2) diff -= CAROUSEL_ITEMS.length;

            const isActive = diff === 0;
            const isVisible = Math.abs(diff) <= 2;

            const translateX = diff * 320; 
            const scale = isActive ? 1.1 : 0.85;
            const opacity = isActive ? 1 : (Math.abs(diff) === 1 ? 0.7 : 0);
            const zIndex = 10 - Math.abs(diff);

            if (!isVisible) return null;

            return (
              <div 
                key={item.id}
                onClick={() => setActiveIndex(index)}
                style={{
                  position: 'absolute',
                  width: '380px',
                  height: isActive ? '540px' : '440px',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  transition: 'all 0.8s cubic-bezier(0.2, 1, 0.3, 1)',
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  cursor: isActive ? 'default' : 'pointer',
                  boxShadow: isActive ? '0 40px 80px rgba(0,0,0,0.15)' : 'none',
                }}
              >
                {/* Background Image */}
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'; }}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: isActive ? 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' : 'rgba(255,255,255,0.2)',
                    transition: 'all 0.6s'
                  }}></div>
                </div>

                {/* Overlay Card */}
                <div style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '24px',
                  right: '24px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  padding: '2rem',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.5s cubic-bezier(0.2, 1, 0.3, 1) 0.3s',
                  pointerEvents: isActive ? 'auto' : 'none'
                }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', marginBottom: '6px' }}>{item.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: '#111827', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.subtitle}</p>
                    </div>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    }}>
                      <ArrowRight size={18} color="#fff" />
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {item.tags.map((tag, i) => (
                      <span key={i} style={{
                        background: i === 0 ? '#111827' : '#f3f4f6',
                        color: i === 0 ? '#fff' : '#4b5563',
                        padding: '6px 14px',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: '700'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '2rem' }}>
          <button 
            onClick={handlePrev}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#fff',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#111827',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)'; }}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={handleNext}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#fff',
              border: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#111827',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)'; }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
}
