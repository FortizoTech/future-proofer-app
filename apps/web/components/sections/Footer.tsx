"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <section className="relative w-full bg-[#F8FAFC] pt-32 pb-12 px-6 overflow-hidden font-sans border-t border-slate-100">

            {/* BACKGROUND GRADIENT DECORATION */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

                {/* LOGO REINFORCEMENT */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 justify-center mb-6">
                        <svg className="w-10 h-10 text-[#003DA5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" strokeLinejoin="round" />
                        </svg>
                        <span className="text-2xl font-black text-[#001D3D] tracking-tighter uppercase">FUTURE PROOFER</span>
                    </div>
                </motion.div>

                {/* DECISION CLOSURE (The CTA) */}
                <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black text-[#001D3D] mb-6 tracking-tight leading-tight"
                >
                    Forge Your Future
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 font-medium text-lg md:text-xl mb-12 max-w-xl mx-auto"
                >
                    A Unified Platform for Visionary African Leaders
                </motion.p>

                {/* HARD GATEWAY BUTTONS */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm mx-auto mb-24"
                >
                    <Link href="/onboarding?mode=career" className="w-full">
                        <button className="w-full h-14 bg-[#003DA5] text-white font-bold rounded-xl text-lg hover:bg-[#002875] transition-all hover:-translate-y-1 shadow-[0_10px_30px_-10px_rgba(0,61,165,0.4)] flex items-center justify-center gap-2 group">
                            Start Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    <Link href="/onboarding?mode=business" className="w-full">
                        <button className="w-full h-14 bg-white text-[#003DA5] border-2 border-slate-200 font-bold rounded-xl text-lg hover:border-[#003DA5] hover:bg-blue-50 transition-all">
                            Business Mode
                        </button>
                    </Link>
                </motion.div>

                {/* THE FOOTER LINKS (Structured Data) */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 w-full max-w-4xl text-left border-t border-slate-200 pt-16">

                    {/* Column 1 */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-bold text-[#001D3D] text-lg mb-2">Platform</h4>
                        <Link href="/onboarding?mode=career" className="text-gray-500 hover:text-[#003DA5] font-medium transition-colors">Career Mode</Link>
                        <Link href="/onboarding?mode=business" className="text-gray-500 hover:text-[#003DA5] font-medium transition-colors">Business Mode</Link>
                        <Link href="#" className="text-gray-500 hover:text-[#003DA5] font-medium transition-colors">AI Roadmap</Link>
                        <Link href="#" className="text-gray-500 hover:text-[#003DA5] font-medium transition-colors">Pricing</Link>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-bold text-[#001D3D] text-lg mb-2">Company</h4>
                        <Link href="#" className="text-gray-500 hover:text-[#003DA5] font-medium transition-colors">About Us</Link>
                        <Link href="#" className="text-gray-500 hover:text-[#003DA5] font-medium transition-colors">Our Mission</Link>
                        <Link href="#" className="text-gray-500 hover:text-[#003DA5] font-medium transition-colors">Partners</Link>
                        <Link href="#" className="text-gray-500 hover:text-[#003DA5] font-medium transition-colors">Careers</Link>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="font-bold text-[#001D3D] text-lg mb-2">Support</h4>
                        <Link href="#" className="text-gray-500 hover:text-[#003DA5] font-medium transition-colors">Help Center</Link>
                        <Link href="#" className="text-gray-500 hover:text-[#10B981] font-medium transition-colors flex items-center gap-2">
                            WhatsApp Chat
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-[#003DA5] font-medium transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-gray-500 hover:text-[#003DA5] font-medium transition-colors">Terms of Service</Link>
                    </div>
                </div>

                {/* TRUST REINFORCEMENT (Bottom) */}
                <div className="mt-20 pt-8 w-full border-t border-slate-100 flex flex-col md:flex-row items-center justify-center text-gray-400 text-sm font-medium gap-1">
                    <span>&copy; 2026 Future Proofer. All rights reserved.</span>
                    <span className="hidden md:inline mx-2">•</span>
                    <span className="flex items-center gap-1">
                        Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Africa.
                    </span>
                </div>

            </div>
        </section>
    );
}
