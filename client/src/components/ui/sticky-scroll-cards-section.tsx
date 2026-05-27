"use client";

import React, { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Choose your hospital",
    description:
      "Browse trusted hospitals and labs near you, compare options clearly, and pick the place that fits your needs best.",
    imageUrl: "/how_it_works_panel.png",
    bgColor: "bg-[#f6efe2]",
    textColor: "text-neutral-700",
  },
  {
    title: "Select a time slot",
    description:
      "See available appointment times instantly and choose a slot that works for your schedule without repeated calls or waiting.",
    imageUrl: "/booking_step_panel.png",
    bgColor: "bg-[#e8f2ec]",
    textColor: "text-neutral-700",
  },
  {
    title: "Skip the queue",
    description:
      "Arrive at your booked time, avoid long lines at reception, and get access to care faster with a smoother experience.",
    imageUrl: "/waiting-line.png.jpg",
    bgColor: "bg-[#ece8f3]",
    textColor: "text-neutral-700",
  },
  {
    title: "Save more on tests",
    description:
      "Unlock discounted pricing on medical tests and lab services while keeping the booking process simple and transparent.",
    imageUrl: "/time_saving_step_panel.png",
    bgColor: "bg-[#f5eadf]",
    textColor: "text-neutral-700",
  },
];

const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.unobserve(entry.target);
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
};

const AnimatedHeader = () => {
  const [headerRef, headerInView] = useScrollAnimation();

  return (
    <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
      <h2
        ref={headerRef}
        className={`text-4xl font-bold tracking-tight text-gray-900 transition-all duration-700 ease-out md:text-[3.3rem] ${
          headerInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        How it works
      </h2>
    </div>
  );
};

export function StickyFeatureSection() {
  return (
    <div className="bg-white font-sans scroll-container">
      <div className="px-[5%]">
        <div className="mx-auto max-w-7xl">
          <section className="flex flex-col items-center py-20 md:py-28">
            <AnimatedHeader />

            <div className="w-full space-y-10 md:space-y-14">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${feature.bgColor} sticky mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 overflow-hidden rounded-[32px] border border-black/5 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.08)] md:grid-cols-[minmax(280px,0.82fr)_minmax(420px,1fr)] md:gap-14 md:p-12 scroll-trigger-element`}
                  style={{ 
                    top: "124px",
                    contain: 'layout style paint',
                    transform: 'translateZ(0)'
                  }}
                >
                  <div className="flex flex-col justify-center md:pl-2 lg:pl-4">
                    <div className="mb-5 inline-flex w-fit rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-600">
                      Step {index + 1}
                    </div>
                    <h3 className="mb-5 max-w-[11ch] text-[2rem] font-bold tracking-tight text-gray-900 md:text-[2.4rem] md:leading-[1.02]">
                      {feature.title}
                    </h3>
                    <p className={`max-w-[38ch] text-[16px] leading-8 ${feature.textColor}`}>{feature.description}</p>
                  </div>

                  <div className="mt-2 flex justify-center md:mt-0 md:justify-end">
                    <div className="w-full max-w-[560px] overflow-hidden rounded-[24px] border border-black/5 bg-white/80 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
                      <img
                        src={feature.imageUrl}
                        alt={feature.title}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/10] h-auto w-full rounded-[18px] object-cover"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.onerror = null;
                          target.src = "https://placehold.co/900x600/e5e7eb/6b7280?text=Image+Not+Found";
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
