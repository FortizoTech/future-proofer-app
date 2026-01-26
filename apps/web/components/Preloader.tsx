"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingText, setLoadingText] = useState("Initializing AI...");

    // Simulate loading process
    useEffect(() => {
        const timer1 = setTimeout(() => setLoadingText("Fetching Career Insights..."), 1500);
        const timer2 = setTimeout(() => setLoadingText("Preparing Dashboard..."), 3000);
        const timer3 = setTimeout(() => setIsLoading(false), 4500); // Adjust duration as needed

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="preloader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0d] to-[#1a1a2e] overflow-hidden"
                    >
                        {/* Background Animation */}
                        <div className="preloader-background" />

                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: [0.8, 1.0, 0.8], opacity: 1 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-40 h-40 rounded-full flex items-center justify-center
                         bg-white/[0.05] backdrop-blur-lg border border-white/[0.1]
                         shadow-lg overflow-hidden z-10"
                        >
                            <img
                                src="/logo-f.svg"
                                alt="Future Proofer Logo"
                                className="w-24 h-24 filter drop-shadow-[0_0_20px_rgba(0,191,255,0.8)]"
                            />
                            {/* Inner blue glow layer */}
                            <div className="absolute inset-0 rounded-full bg-blue-500/[0.2] animate-pulse-light"></div>
                        </motion.div>

                        {/* Skeleton Loaders */}
                        <div className="grid grid-cols-3 gap-6 mt-16 w-3/4 max-w-4xl z-10">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                    className="p-6 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/[0.1] shadow-lg flex flex-col space-y-3"
                                >
                                    {i === 0 ? ( // Example for profile icon
                                        <div className="w-12 h-12 rounded-full bg-blue-500/[0.1] animate-shimmer mb-2"></div>
                                    ) : null}
                                    <div className="h-3 rounded bg-blue-500/[0.1] animate-shimmer w-3/4"></div>
                                    <div className="w-3/4 h-3 rounded bg-blue-500/[0.1] animate-shimmer"></div>
                                    <div className="h-3 rounded bg-blue-500/[0.1] animate-shimmer w-1/2"></div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Dynamic Progress Text */}
                        <motion.div
                            key={loadingText}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mt-12 text-blue-300 text-lg font-light z-10 text-center"
                        >
                            {loadingText}
                            <div className="h-0.5 w-24 bg-blue-400 mt-2 rounded-full mx-auto animate-pulse-horizontal"></div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </>
    );
};

export default Preloader;
