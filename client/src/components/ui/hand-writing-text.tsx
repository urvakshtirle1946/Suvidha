"use client";

import { motion, Variants } from "framer-motion";

interface HandWrittenTitleProps {
    title?: React.ReactNode | string;
    subtitle?: string;
    className?: string; // Add className prop overrides for specific styling like navbar dimensions
}

function HandWrittenTitle({
    title = "Hand Written",
    subtitle = "Optional subtitle",
    className = "",
}: HandWrittenTitleProps) {
    const draw: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] },
                opacity: { duration: 0.5 },
            },
        },
    };

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-90">
                <motion.svg
                    width="100%" // Scale SVG to fit closer
                    height="100%"
                    viewBox="0 0 1200 600"
                    initial="hidden"
                    animate="visible"
                    className="absolute"
                    style={{ overflow: 'visible' }}
                >
                    <title>KokonutUI</title>
                    <motion.path
                        d="M 950 90 
                           C 1250 300, 1050 480, 600 520
                           C 250 520, 150 480, 150 300
                           C 150 120, 350 80, 600 80
                           C 850 80, 950 180, 950 180"
                        fill="none"
                        strokeWidth="24" // Much thicker stroke for small navbar logo
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={draw}
                        className="text-[#0c831f] opacity-80" // Using app primary green color
                    />
                </motion.svg>
            </div>

            <div className="relative text-center z-10 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {title}
                </motion.div>

                {subtitle && (
                    <motion.p
                        className="text-sm text-black/80 dark:text-white/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </div>
    );
}

export { HandWrittenTitle };
