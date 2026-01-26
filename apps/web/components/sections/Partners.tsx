"use client";
import React from "react";
import { motion } from "framer-motion";

/**
 * CUSTOM ICONS RE-CREATED FROM SCREENSHOT 
 */

const EcoTreeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.2" className="w-10 h-10 md:w-12 md:h-12">
        <path d="M12 21L12 11M8 8.5C8 6 10 5 12 5C14 5 16 6 16 8.5M7 11C7 9 9 9 10 9M17 11C17 9 15 9 14 9M4 14C4 11 12 8 20 14" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 14C4 17 8 20 12 21C16 20 20 17 20 14" strokeLinecap="round" />
        <path d="M9 21H15" strokeLinecap="round" />
    </svg>
);

const AfricaMapIcon = () => (
    <svg viewBox="0 0 100 100" fill="none" stroke="#003DA5" strokeWidth="3" className="w-10 h-10 md:w-12 md:h-12">
         {/* Simplified Outline of Africa matching screenshot */}
         <path d="M25 25 C20 10 60 5 70 20 C85 25 90 40 85 55 C80 80 55 90 45 95 C30 80 15 70 20 40 C15 30 20 28 25 25 Z" strokeLinecap="round" strokeLinejoin="round"/>
         <path d="M60 40 C55 35 60 30 65 35" strokeLinecap="round" />
    </svg>
);

const HandshakeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.2" className="w-10 h-10 md:w-12 md:h-12">
        <path d="M9.87862 17.1213L3.86812 13.5651C3.86812 13.5651 2.50481 12.3585 3.19014 11.2335C3.87547 10.1085 4.54593 10.7495 4.54593 10.7495L9.36391 14.1614" strokeLinecap="round"/>
        <path d="M7 8L16.2929 17.2929C16.6834 17.6834 17.3166 17.6834 17.7071 17.2929L19.8284 15.1716C20.219 14.781 20.219 14.1479 19.8284 13.7574L16 10" strokeLinecap="round"/>
        <rect x="7.44775" y="6.14209" width="4" height="11.1355" transform="rotate(-45 7.44775 6.14209)" rx="1.5" fill="none" stroke="#003DA5" strokeWidth="1.2"/>
    </svg>
);

const LightningIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.5" className="w-10 h-10 md:w-12 md:h-12">
        <circle cx="12" cy="12" r="10" strokeWidth="1.2"/>
        <path d="M13 5L8.5 13H12.5L10.5 19L15.5 11H11.5L13 5Z" strokeLinejoin="round" />
    </svg>
);

const AtomIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.2" className="w-10 h-10 md:w-12 md:h-12">
        <circle cx="12" cy="12" r="2.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
    </svg>
);

const AnkhIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.4" className="w-10 h-10 md:w-12 md:h-12">
         {/* Ankh symbol / Sahel Digitech logo simulation */}
         <ellipse cx="12" cy="7" rx="3.5" ry="5" />
         <path d="M5 14H19" strokeLinecap="round"/>
         <path d="M12 12V22" strokeLinecap="round"/>
    </svg>
);

const ChartIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.4" className="w-10 h-10 md:w-12 md:h-12">
        <rect x="3" y="14" width="4" height="6" rx="1"/>
        <rect x="9" y="8" width="4" height="12" rx="1"/>
        <rect x="15" y="4" width="4" height="16" rx="1"/>
        <path d="M2 20H22" strokeLinecap="round"/>
    </svg>
);

const CpuIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.4" className="w-10 h-10 md:w-12 md:h-12">
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M12 9V15M9 12H15" strokeOpacity="0.3" />
        <path d="M9 2V6M15 2V6M2 9H6M2 15H6M9 18V22M15 18V22M18 9H22M18 15H22" strokeLinecap="square"/>
    </svg>
);


/**
 * PARTNER DATA
 */
const partners = [
    { name: "ECOWAS Bank", sub1: "2030 Initiative", sub2: "Local amore atods", icon: <EcoTreeIcon /> },
    { name: "Afri-Tech Ventures", sub1: "Accelerator '27", sub2: "Locar Roadmaps skills", icon: <AfricaMapIcon /> },
    { name: "Afri-Tech", sub1: "Accelerator '27", sub2: "Ghana Hub AI Forum", icon: <HandshakeIcon /> },
    { name: "Ghana Innovations", sub1: "Hub AI Policy Skills", sub2: "Lomors ceropes", icon: <LightningIcon /> },
    
    { name: "Businork Farcess", sub1: "Sankoka", sub2: "Connectivity Skill", icon: <AtomIcon /> }, 
    { name: "Sahel Digitech", sub1: "Sankoka", sub2: "Connectivity Project", icon: <AnkhIcon /> },
    { name: "Sahel Digitech", sub1: "Data Science", sub2: "Fellowship", icon: <ChartIcon /> },
    { name: "Secure Science", sub1: "Secure Code", sub2: "Initiative", icon: <CpuIcon /> },
];

export default function Partners() {
    return (
        <section className="relative w-full py-24 px-4 bg-white flex flex-col items-center">
            
            {/* Header Content - Strictly Centered */}
            <div className="max-w-4xl w-full text-center mb-16">
                <motion.h2 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-[#001D3D] leading-tight mb-2 tracking-tight"
                >
                    Forging Futures 2026:<br /> 
                    Our Esteemed Partners
                </motion.h2>
                
                <p className="text-[#003DA5] font-bold text-lg md:text-xl">
                    Innovating Together for a Brighter Africa
                </p>
            </div>

            {/* 
                PARTNER GRID
                Constraints:
                - max-w-6xl ensure it doesn't spread too wide (fixes alignment issue).
                - place-items-center centers the cards in their lanes.
                - w-full ensures it takes available space.
             */}
            <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
                {partners.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -6, boxShadow: "0px 14px 40px -10px rgba(0, 61, 165, 0.12)" }}
                        viewport={{ once: true }}
                        // Card Styles matching screenshot: White, subtle border, specific rounded corners (rounded-2xl)
                        className="bg-white border border-gray-100 rounded-2xl p-6 h-[260px] flex flex-col items-center justify-between text-center shadow-sm cursor-pointer transition-all duration-300 w-full max-w-[280px] mx-auto"
                    >
                        {/* 1. Icon in soft blue circle */}
                        <div className="mt-4 w-20 h-20 rounded-full bg-[#ECF3FF] flex items-center justify-center shrink-0 border border-[#DEEAFF]">
                            {p.icon}
                        </div>

                        {/* 2. Text Block aligned to bottom of card content */}
                        <div className="mb-4">
                            <h3 className="font-extrabold text-[#001D3D] text-[15px] leading-tight mb-1.5">
                                {p.name}
                            </h3>
                            <div className="text-gray-500 text-xs font-medium leading-tight space-y-0.5">
                                <p className="font-semibold text-gray-700">{p.sub1}</p>
                                <p className="opacity-80">{p.sub2}</p>
                            </div>
                        </div>

                    </motion.div>
                ))}
            </div>

            {/* Footer Text */}
            <div className="mt-12 text-center text-sm md:text-base text-gray-600 font-medium">
                <span className="block sm:inline">Conference Attendees: Partner with us. </span>
                <span className="text-[#003DA5] font-bold hover:underline cursor-pointer">
                    Visit Booth A4 <span className="inline-block transition-transform hover:translate-x-1">→</span>
                </span>
                <p className="mt-1 text-xs md:text-sm text-gray-400">January 23, 2026, 8:50 PM CET</p>
            </div>
        </section>
    );
}