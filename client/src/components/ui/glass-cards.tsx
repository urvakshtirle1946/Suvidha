'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cardData } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
    id: number;
    title: string;
    description: string;
    index: number;
    totalCards: number;
    color: string;
    image?: string;
    gradient?: string;
    glow?: string;
    isVisible?: boolean;
    reduceMotion?: boolean;
}

const Card: React.FC<CardProps> = ({ title, description, index, totalCards, color, image, gradient, glow, isVisible = true, reduceMotion = false }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const container = containerRef.current;
        if (!card || !container || !isVisible) return;

        const targetScale = 1 - (totalCards - index) * 0.05;

        if (reduceMotion) {
            gsap.set(card, {
                scale: targetScale,
                transformOrigin: 'center top',
                force3D: true
            });
            return;
        }

        gsap.set(card, {
            scale: 1,
            transformOrigin: 'center top',
            willChange: 'transform',
            force3D: true
        });

        const setScale = gsap.quickSetter(card, 'scale');
        const trigger = ScrollTrigger.create({
            trigger: container,
            start: 'top center',
            end: 'bottom center',
            scrub: 0.65,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const scale = Math.max(gsap.utils.interpolate(1, targetScale, progress), targetScale);
                setScale(scale);
            }
        });

        return () => {
            trigger.kill();
            gsap.set(card, { willChange: 'auto' });
        };
    }, [index, totalCards, isVisible, reduceMotion]);

    return (
        <div
            ref={containerRef}
            className="glass-card-shell scroll-trigger-element"
            style={{
                height: '92vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'sticky',
                top: 0,
                contain: 'layout style paint',
                backfaceVisibility: 'hidden',
                perspective: 1000
            }}
        >
            <div
                ref={cardRef}
                style={{
                    position: 'relative',
                    width: 'min(78vw, 980px)',
                    height: 'min(72vh, 500px)',
                    borderRadius: '30px',
                    isolation: 'isolate',
                    top: `calc(-3vh + ${index * 22}px)`,
                    transformOrigin: 'top',
                    backfaceVisibility: 'hidden',
                    perspective: 1000
                }}
                className="glass-card-frame card-content"
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: '-1px',
                        borderRadius: '30px',
                        background: `linear-gradient(135deg, ${color} 0%, ${color.replace('0.8', '0.5')} 100%)`,
                        zIndex: -1,
                        opacity: 0.4,
                        filter: 'blur(0.5px)'
                    }}
                />

                <div
                    className="glass-card-body"
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'minmax(280px, 0.9fr) minmax(340px, 1.1fr)',
                        alignItems: 'center',
                        gap: '2rem',
                        borderRadius: '30px',
                        background: gradient ?? 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(255,255,255,0.82))',
                        backdropFilter: 'blur(12px) saturate(120%)',
                        border: '1px solid rgba(255, 255, 255, 0.72)',
                        boxShadow: `
                            0 20px 45px rgba(15, 23, 42, 0.08),
                            inset 0 1px 0 rgba(255, 255, 255, 0.72)
                        `,
                        overflow: 'hidden',
                        padding: 'clamp(1.6rem, 3vw, 2.75rem)',
                        backfaceVisibility: 'hidden'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: glow,
                            pointerEvents: 'none',
                            borderRadius: '30px',
                            opacity: 0.5
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '40%',
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 52%, transparent 100%)',
                            pointerEvents: 'none',
                            borderRadius: '30px 30px 0 0'
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '2px',
                            height: '100%',
                            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%)',
                            borderRadius: '30px 0 0 30px',
                            pointerEvents: 'none'
                        }}
                    />

                    <div className="glass-card-copy" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                        <div style={{ marginBottom: '1rem', display: 'inline-flex', width: 'fit-content', borderRadius: '999px', border: '1px solid rgba(15,23,42,0.1)', background: 'rgba(255,255,255,0.72)', padding: '0.38rem 0.8rem', color: '#334155', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                            Step {index + 1}
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.04em', lineHeight: '1.02', maxWidth: '11ch' }}>
                            {title}
                        </h2>
                        <p style={{ fontSize: 'clamp(0.98rem, 1.4vw, 1.08rem)', color: '#334155', lineHeight: '1.8', maxWidth: '34ch' }}>
                            {description}
                        </p>
                    </div>

                    <div className="glass-card-media-wrap" style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <div className="glass-card-media" style={{ width: '100%', maxWidth: '520px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.72)', boxShadow: '0 15px 30px rgba(15,23,42,0.08)', background: 'rgba(255,255,255,0.56)' }}>
                            {image && isVisible ? (
                                <img 
                                    src={image} 
                                    alt={title} 
                                    style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', aspectRatio: '16 / 10' }}
                                    loading="lazy"
                                />
                            ) : <div style={{ width: '100%', paddingBottom: '62.5%', backgroundColor: 'rgba(200,200,200,0.1)' }} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const StackedCards: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updateReduceMotion = () => setReduceMotion(mediaQuery.matches);
        updateReduceMotion();

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', updateReduceMotion);
            return () => mediaQuery.removeEventListener('change', updateReduceMotion);
        }

        mediaQuery.addListener(updateReduceMotion);
        return () => mediaQuery.removeListener(updateReduceMotion);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Intersection Observer for lazy loading the entire section
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(container);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !isVisible) return;

        if (reduceMotion) {
            gsap.set(container, { opacity: 1 });
            return;
        }

        gsap.fromTo(
            container,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1.2,
                ease: 'power2.out'
            }
        );
    }, [isVisible, reduceMotion]);

    return (
        <main ref={containerRef} style={{ background: 'transparent' }}>
            <section className="how-it-works-section" style={{ width: '100%', color: '#0f172a' }}>
                <div style={{ textAlign: 'center', marginBottom: '0rem', padding: '0 2rem' }}>
                    <h2 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', fontWeight: 500, fontFamily: 'var(--font-cormorant-garamond)', lineHeight: '1.05', letterSpacing: '-0.03em', color: '#1a120a' }}>
                        How it works
                    </h2>
                </div>

                {isVisible && cardData.map((card, index) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        index={index}
                        totalCards={cardData.length}
                        color={card.color}
                        image={card.image}
                        gradient={card.gradient}
                        glow={card.glow}
                        isVisible={isVisible}
                        reduceMotion={reduceMotion}
                    />
                ))}
            </section>
            <style jsx>{`
                .how-it-works-section {
                    padding: 8rem 0 0;
                }
                
                @media (max-width: 900px) {
                    .glass-card-frame {
                        width: min(92vw, 680px) !important;
                        height: min(78vh, 760px) !important;
                        top: calc(-2vh + var(--card-offset, 0px)) !important;
                    }

                    .glass-card-body {
                        grid-template-columns: 1fr !important;
                        gap: 1.25rem !important;
                        padding: 1.25rem !important;
                    }

                    .glass-card-copy {
                        justify-content: flex-start !important;
                    }

                    .glass-card-media-wrap {
                        height: auto !important;
                    }

                    .glass-card-media {
                        max-width: 100% !important;
                    }
                }

                @media (max-width: 640px) {
                    .how-it-works-section {
                        padding: 4rem 0 0 !important;
                    }
                    .glass-card-shell {
                        height: auto !important;
                        min-height: 100svh !important;
                        padding: 2rem 0.5rem !important;
                    }

                    .glass-card-frame {
                        width: calc(100vw - 1rem) !important;
                        height: auto !important;
                        min-height: min(75svh, 500px) !important;
                        border-radius: 24px !important;
                    }

                    .glass-card-body {
                        padding: 1rem !important;
                        border-radius: 24px !important;
                    }

                    .glass-card-copy h2 {
                        font-size: clamp(1.6rem, 7vw, 2.15rem) !important;
                        max-width: 100% !important;
                        margin-bottom: 0.75rem !important;
                    }

                    .glass-card-copy p {
                        font-size: 0.95rem !important;
                        line-height: 1.65 !important;
                        max-width: 100% !important;
                    }

                    .glass-card-media,
                    .glass-card-media img {
                        border-radius: 18px !important;
                    }
                }
            `}</style>
        </main>
    );
};
