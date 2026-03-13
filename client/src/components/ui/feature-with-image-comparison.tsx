"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GripVertical } from "lucide-react";

function Feature() {
  const [inset, setInset] = useState<number>(0);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }

    const percentage = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setInset(percentage);
  };

  return (
    <div className="w-full py-8 lg:py-14">
      <div className="relative mx-auto w-full max-w-[1280px] px-0">
        <div className="pointer-events-none absolute -left-32 top-[50%] z-30 hidden -translate-y-1/2 md:block">
          <div className="slider-cue max-w-[128px] -rotate-6 text-[22px] leading-[0.95] text-[#b7b4bf]">
            Slide to discover Zelp
          </div>
          <svg
            className="slider-cue-arrow mt-2 ml-6 rotate-6 opacity-70"
            width="92"
            height="34"
            viewBox="0 0 92 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4 9C18 9 28 10 40 15C52 20 62 24 74 24"
              stroke="#9C9AA3"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="3 5"
            />
            <path
              d="M68 18L77 24L68 30"
              stroke="#9C9AA3"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className="relative min-h-[420px] w-full select-none overflow-hidden rounded-[26px] border border-white/10 bg-[#020202] shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:min-h-[560px]"
          onMouseMove={onMouseMove}
          onMouseUp={() => setOnMouseDown(false)}
          onMouseLeave={() => setOnMouseDown(false)}
          onTouchMove={onMouseMove}
          onTouchEnd={() => setOnMouseDown(false)}
        >
          <div className="absolute inset-0">
            <ThemePanel theme="dark" />
          </div>

          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 0 0 ${inset}%)`,
            }}
          >
            <ThemePanel theme="light" />
          </div>

          <div
            className="absolute top-0 bottom-0 z-20 w-px -translate-x-1/2 bg-white/35"
            style={{
              left: `${inset}%`,
            }}
          >
            <button
              className="absolute left-1/2 top-1/2 z-30 flex h-12 w-8 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-md border border-neutral-700 bg-[#202020] text-white shadow-xl transition-transform hover:scale-105"
              onTouchStart={(e) => {
                setOnMouseDown(true);
                onMouseMove(e);
              }}
              onMouseDown={(e) => {
                setOnMouseDown(true);
                onMouseMove(e);
              }}
              onTouchEnd={() => setOnMouseDown(false)}
              onMouseUp={() => setOnMouseDown(false)}
              type="button"
              aria-label="Drag to compare"
            >
              <GripVertical className="h-4 w-4 select-none" />
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .slider-cue {
          font-family: "Segoe Script", "Brush Script MT", cursive;
          animation: sliderCueFade 900ms ease-out both;
        }

        .slider-cue-arrow {
          animation: sliderCueFloat 2.5s ease-in-out infinite;
        }

        @keyframes sliderCueFade {
          from {
            opacity: 0;
            transform: rotate(-8deg) translateY(10px);
          }

          to {
            opacity: 1;
            transform: rotate(-6deg) translateY(0);
          }
        }

        @keyframes hintFloat {
          0% {
            transform: translateX(0);
          }

          50% {
            transform: translateX(6px);
          }

          100% {
            transform: translateX(0);
          }
        }

        .slider-cue-arrow {
          animation: hintFloat 2.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function ThemePanel({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`grid min-h-[420px] h-full w-full grid-cols-[320px_minmax(0,1fr)] items-center justify-items-center gap-4 px-8 py-8 sm:px-10 md:min-h-[560px] md:px-12 lg:px-16 ${
        isDark ? "bg-[#020202]" : "bg-[#f3f3f3]"
      }`}
    >
      <div className="w-full max-w-[360px] justify-self-center self-center md:translate-x-8">
        <h2
          className={`font-medium tracking-[-0.065em] ${
            isDark
              ? "max-w-[360px] text-[2.45rem] leading-[0.94] text-white md:text-[2.9rem]"
              : "text-[2.35rem] text-neutral-950 md:text-[2.95rem]"
          }`}
        >
          {isDark ? (
            <>
              Go directly to
              <br />
              the lab,
              <br />
              <span className="text-white/78">no waiting</span>
            </>
          ) : (
            <>
              Still waiting
              <br />
              <span className="text-neutral-700">in a long line?</span>
            </>
          )}
        </h2>

        {isDark ? (
          <>
            <p className="mt-14 max-w-[360px] text-[14px] leading-7 text-white/68">
              Book your hospital or lab visit through Zelp and arrive at your chosen time slot.
              Skip the queues and access healthcare services faster.
            </p>
            <ul className="mt-14 flex max-w-[340px] list-none flex-col gap-5 text-[13px] leading-6 text-white/88">
              <li className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
                <span className="mt-[6px] h-[7px] w-[7px] flex-shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.65)]" />
                <span>Choose your preferred hospital</span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
                <span className="mt-[6px] h-[7px] w-[7px] flex-shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.65)]" />
                <span>Select a convenient time slot</span>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
                <span className="mt-[6px] h-[7px] w-[7px] flex-shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.65)]" />
                <span>Get services at discounted prices</span>
              </li>
            </ul>
            <Link
              href="/#hero"
              className="mt-16 inline-flex min-w-[132px] items-center justify-center rounded-full bg-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-950 shadow-[0_14px_30px_rgba(255,255,255,0.16)] transition-transform hover:scale-[1.02]"
            >
              Join Now
            </Link>
          </>
        ) : null}
      </div>

      <div className="flex w-full items-center justify-center justify-self-stretch self-center pl-0 md:pl-6">
        <div
          className={`relative aspect-video w-full overflow-hidden rounded-[14px] ${
            isDark
              ? "max-w-[380px] bg-[#2b2b2f] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]"
              : "max-w-[560px] bg-[#ebe7ee] shadow-[0_24px_50px_rgba(0,0,0,0.08),inset_0_0_0_1px_rgba(0,0,0,0.03)]"
          }`}
        >
          <Image
            src={isDark ? "/patient.jpg" : "/waiting-line.png.jpg"}
            alt={isDark ? "Patient arriving with a booked slot" : "Hospital reception with a long waiting line"}
            width={1200}
            height={900}
            priority
            className={`h-full w-full ${isDark ? "object-cover" : "object-contain bg-[#ebe7ee] p-0"}`}
          />
          <div
            className={`absolute inset-0 ${
              isDark ? "bg-gradient-to-t from-black/48 via-black/10 to-transparent" : "bg-transparent"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export { Feature };
