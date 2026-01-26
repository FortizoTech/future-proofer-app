"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logoImage from "@/assets/future-proofer-logo.png";

export default function Hero() {
    return (
        <div className="relative min-h-[90vh] w-full bg-white flex flex-col items-center justify-center font-sans overflow-hidden py-16 px-4">

            {/* BACKGROUND (Subtle Gradient) */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white opacity-80" />

            {/* LOGO SECTION */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8 relative z-10"
            >
                <div className="relative w-48 h-16 md:w-64 md:h-20">
                    <Image
                        src={logoImage}
                        alt="Future Proofer Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </motion.div>

            {/* HEADLINE */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center z-10 px-2 max-w-4xl"
            >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight md:leading-[1.15] mb-6 drop-shadow-sm">
                    Navigate Tomorrow&rsquo;s Potential.<br className="hidden md:block" />
                    <span className="text-slate-900 block mt-2">Simplify Your Future.</span>
                </h1>

                <p className="text-base md:text-xl text-slate-500 font-medium mb-10 max-w-xl mx-auto leading-relaxed">
                    AI-Powered Foresight for Africa&rsquo;s Innovators
                </p>
            </motion.div>

            {/* ACTION BUTTONS (The Two Modes) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 z-10 w-full max-w-md px-4 mb-16"
            >
                {/* CAREER MODE BUTTON */}
                <Link href="/onboarding?mode=career" className="w-full sm:flex-1">
                    <Button
                        className="w-full h-12 bg-[#003DA5] hover:bg-[#002e7a] text-white font-bold text-sm tracking-wide rounded-lg shadow-lg shadow-blue-900/10 transition-transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        CAREER MODE
                    </Button>
                </Link>

                {/* BUSINESS MODE BUTTON */}
                <Link href="/onboarding?mode=business" className="w-full sm:flex-1">
                    <Button
                        variant="outline"
                        className="w-full h-12 bg-white border border-[#003DA5] text-[#003DA5] hover:bg-blue-50 font-bold text-sm tracking-wide rounded-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        BUSINESS MODE
                    </Button>
                </Link>
            </motion.div>

            {/* BOTTOM LINK */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative z-10"
            >
                <a
                    href="/mission"
                    className="group inline-flex items-center gap-2 text-[#003DA5] font-bold text-sm hover:underline underline-offset-4 decoration-2"
                >
                    Learn More about our Mission
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
            </motion.div>

        </div>
    );
}