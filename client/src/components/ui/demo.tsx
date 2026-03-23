"use client";

import { StackedCards } from "@/components/ui/glass-cards";
import { useEffect, useRef, useState } from "react";

export default function DemoOne() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: '240px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full" ref={ref}>
      {isVisible ? <StackedCards /> : <div style={{ minHeight: '320vh' }} />}
    </div>
  );
}
