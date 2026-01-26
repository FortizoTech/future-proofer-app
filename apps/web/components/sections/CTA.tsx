"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="relative w-full px-4 bg-[#001529] overflow-hidden flex flex-col items-center text-center z-10">

            {/* Background Gradients/Glows to match the image */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            <div className="max-w-3xl w-full relative z-10 flex flex-col items-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight"
                >
                    Ready to Future-Proof Your Path?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-blue-200/80 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
                >
                    Whether you are scaling a venture or mastering a new trade, the journey starts with one choice.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto"
                >
                    <button className="w-full sm:w-auto px-8 py-4 bg-[#0066FF] hover:bg-[#0052cc] text-white rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                        Launch Career Mode
                        <ArrowRight size={20} />
                    </button>

                    <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-[#001D3D] rounded-lg font-bold text-lg transition-all shadow-lg">
                        Launch Business Mode
                    </button>
                </motion.div>

                {/* Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-6 text-slate-400 font-medium text-sm"
                >
                    <Link href="#" className="hover:text-white transition-colors underline decoration-transparent hover:decoration-white/50">Privacy</Link>
                    <Link href="#" className="hover:text-white transition-colors underline decoration-transparent hover:decoration-white/50">Terms</Link>
                    <Link href="#" className="hover:text-white transition-colors underline decoration-transparent hover:decoration-white/50">Partners</Link>
                </motion.div>
            </div>
        </section>
    );
}
