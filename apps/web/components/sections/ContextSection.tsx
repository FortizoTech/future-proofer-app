"use client";
import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

/**
 * Helper component for list items
 */
const ListItem = ({ type, text }: { type: 'bad' | 'good', text: string }) => (
    <li className="flex items-start gap-4">
        <div className="shrink-0 pt-1">
            {type === 'bad' ? (
                <XCircle className="w-6 h-6 text-[#E11D48] fill-red-50" />
            ) : (
                <CheckCircle2 className="w-6 h-6 text-[#10B981] fill-green-50" />
            )}
        </div>
        <span className="text-[17px] text-gray-600 font-medium leading-snug">
            {text}
        </span>
    </li>
);

export default function ContextSection() {
    return (
        <section className="relative w-full py-20 px-4 bg-white flex flex-col items-center">
            {/* Main Container - Centered */}
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-[#001D3D] mb-4 tracking-tight leading-[1.1]"
                    >
                        The Challenge & The Edge
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[#003DA5] text-lg font-medium"
                    >
                        Bridging Today's Realities with Tomorrow's Africa
                    </motion.p>
                </div>

                {/* Comparison Grid - CENTERED with max-w-5xl */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch max-w-5xl mx-auto">

                    {/* LEFT CARD: THE CHALLENGE */}
                    <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#F8FAFC] rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* Image: Grayscale Path */}
                        <div className="mb-8 rounded-xl h-56 w-full overflow-hidden bg-gray-200">
                            <img
                                src="https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1200&auto=format&fit=crop"
                                alt="Difficult Path"
                                className="w-full h-full object-cover grayscale opacity-90 hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <h3 className="text-3xl font-bold text-[#001D3D] mb-8">The Challenge</h3>

                        <ul className="space-y-5 flex-grow">
                            <ListItem type="bad" text="Outdated skills for a 2026 economy" />
                            <ListItem type="bad" text="High business failure rates due to lack of data" />
                            <ListItem type="bad" text="Limited access to strategic mentorship" />
                        </ul>
                    </motion.div>

                    {/* RIGHT CARD: THE EDGE */}
                    <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-blue-50 flex flex-col h-full hover:shadow-2xl transition-all duration-300"
                    >
                        {/* Image: Tech Map of Africa */}
                        <div className="mb-8 rounded-xl h-56 w-full bg-blue-50/50 flex items-center justify-center p-8 overflow-hidden relative">
                            {/* Faint Grid Background */}
                            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#003DA5 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

                            {/* The Blue Africa Tech SVG */}
                            <svg viewBox="0 0 100 100" className="w-full h-full text-[#003DA5] opacity-80" stroke="currentColor" fill="none" strokeWidth="1.5">
                                {/* Africa Outline */}
                                <path d="M25 25 C20 10 60 5 70 20 C85 25 90 40 85 55 C80 80 55 90 45 95 C30 80 15 70 20 40 C15 30 20 28 25 25 Z" className="drop-shadow-lg" />
                                {/* Circuit lines overlay */}
                                <path d="M45 40 L60 40 L60 60" strokeDasharray="3 2" opacity="0.6" />
                                <circle cx="60" cy="60" r="2" fill="currentColor" />
                                <circle cx="45" cy="40" r="2" fill="currentColor" />
                            </svg>
                        </div>

                        <h3 className="text-3xl font-bold text-[#003DA5] mb-8">The Future Proofer Edge</h3>

                        <ul className="space-y-5 flex-grow">
                            <ListItem type="good" text="Real-time market-demand skill mapping" />
                            <ListItem type="good" text="AI Business simulations with local data" />
                            <ListItem type="good" text="Direct pathway to the Thinkforge Network" />
                            <ListItem type="good" text="Personalized Career Roadmaps" />
                        </ul>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}