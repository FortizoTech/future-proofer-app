"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * PARTNER DATA
 */
const partners = [
    { name: "ECOWAS Bank", sub1: "2030 Initiative", sub2: "Local amore atods", icon: "/partners/partner-1.png" },
    { name: "Afri-Tech Ventures", sub1: "Accelerator '27", sub2: "Locar Roadmaps skills", icon: "/partners/partner-2.png" },
    { name: "Afri-Tech", sub1: "Accelerator '27", sub2: "Ghana Hub AI Forum", icon: "/partners/partner-3.png" },
    { name: "Ghana Innovations", sub1: "Hub AI Policy Skills", sub2: "Lomors ceropes", icon: "/partners/partner-4.png" },

    { name: "Businork Farcess", sub1: "Sankoka", sub2: "Connectivity Skill", icon: "/partners/partner-5.png" },
    { name: "Sahel Digitech", sub1: "Sankoka", sub2: "Connectivity Project", icon: "/partners/partner-6.png" },
    { name: "Sahel Digitech", sub1: "Data Science", sub2: "Fellowship", icon: "/partners/partner-7.png" },
    { name: "Secure Science", sub1: "Secure Code", sub2: "Initiative", icon: "/partners/partner-8.png" },
];

export default function Partners() {
    return (
        <section className="relative w-full px-4 flex flex-col items-center z-10 overflow-hidden">

            {/* Header Content - Strictly Centered */}
            <div className="max-w-4xl w-full text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black text-[#001D3D] leading-tight mb-4 tracking-tight"
                >
                    Forging Futures 2026:<br />
                    Our Esteemed Partners
                </motion.h2>

                <p className="text-[#003DA5] font-bold text-xl md:text-2xl">
                    Innovating Together for a Brighter Africa
                </p>
            </div>

            {/* 
                PARTNER GRID
             */}
            <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
                {partners.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -6, boxShadow: "0px 14px 40px -10px rgba(0, 61, 165, 0.2)" }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden rounded-[32px] px-8 pt-16 pb-16 h-[320px] flex flex-col items-center justify-center text-center shadow-md cursor-pointer transition-all duration-300 w-full max-w-[280px] mx-auto border border-slate-200/50"
                    >
                        {/* Grey Aurora Background inside the card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 z-0">
                            {/* Aurora Glow Effects */}
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-slate-300/40 blur-[40px] rounded-full" />
                            <div className="absolute bottom-0 right-0 w-28 h-28 bg-blue-200/30 blur-[35px] rounded-full" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-slate-200/50 blur-[30px] rounded-full" />
                        </div>

                        {/* Glassmorphism overlay */}
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-[1]" />

                        {/* 1. Icon in soft blue circle */}
                        <div className="relative z-10 mt-4 w-24 h-24 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/60 shadow-sm overflow-hidden p-5">
                            <img
                                src={p.icon}
                                alt={p.name}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* 2. Text Block aligned to bottom of card content */}
                        <div className="relative z-10 mb-4">
                            <h3 className="font-black text-[#001D3D] text-lg leading-tight mb-2">
                                {p.name}
                            </h3>
                            <div className="text-slate-500 text-sm font-medium leading-tight space-y-1">
                                <p className="font-bold text-slate-700">{p.sub1}</p>
                                <p className="opacity-80">{p.sub2}</p>
                            </div>
                        </div>

                    </motion.div>
                ))}
            </div>
        </section>
    );
}