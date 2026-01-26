"use client";
import React from "react";
import { motion } from "framer-motion";

const features = [
    {
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop", 
        title: "Localized AI Insights",
        description: "Deep analytics for African innovation.",
    },
    {
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop", 
        title: "Career Roadmap",
        description: "Career Roadmaps implementation.",
    },
    {
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop", 
        title: "Business Forecaster",
        description: "Local pertine skills and values.",
    },
    {
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
        title: "Network Access",
        description: "Access mentors across borders.",
    },
];

export default function FeatureGrid() {
    return (
        <section className="relative w-full bg-white py-24 px-4 font-sans flex justify-center">
            <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">
                
                {/* 1. Header Section (Centered) */}
                <div className="text-center max-w-2xl mb-16 px-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black text-[#001D3D] mb-4 tracking-tight leading-tight"
                    >
                        Tailored for Your Ambition
                    </motion.h2>
                    <p className="text-gray-500 text-base md:text-lg font-medium">
                        AI-Powered Foresight for Africa's Innovators
                    </p>
                </div>

                {/* 
                   2. Grid Section (Centered Cards) 
                   grid-cols-2 works best to match your 2x2 layout 
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 w-full max-w-5xl place-items-center">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="w-full max-w-md bg-[#F8FAFC] rounded-[32px] p-6 pb-10 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* 
                                3. The Custom Hexagon Crop 
                                We wrap the image in a container that has the clip-path applied.
                            */}
                            <div className="relative w-full mb-6">
                                {/* The Blue "Swoosh" Stroke simulation (Absolute background) */}
                                <div className="absolute inset-0 bg-[#003DA5] scale-[1.02] translate-y-1 z-0 rounded-b-full opacity-0 md:opacity-100" 
                                     style={{ clipPath: "polygon(10% 20%, 50% 5%, 90% 20%, 100% 60%, 80% 90%, 20% 90%, 0% 60%)" }}></div>
                                
                                {/* The Actual Image Crop */}
                                <div 
                                    className="relative z-10 w-full aspect-[16/9] overflow-hidden bg-slate-200"
                                    style={{
                                        // This precise polygon creates the angled top corners and straight sides
                                        // clipPath: "polygon(15% 15%, 50% 0%, 85% 15%, 100% 50%, 90% 95%, 10% 95%, 0% 50%)", 
                                        // ALTERNATIVE SHAPE to match screenshot closer (Smoother Hex):
                                        clipPath: "polygon(50% 0%, 100% 35%, 100% 90%, 0% 90%, 0% 35%)", 
                                        borderRadius: "0px 0px 80px 80px" // This adds the curve at the bottom manually if clip-path is too sharp
                                    }}
                                >
                                    {/* 
                                       NOTE: CSS clip-path makes rounded corners hard. 
                                       For pixel-perfect rounded hexagon, we use a masking technique with SVG below 
                                       or a simpler combined rounded border radius for now.
                                       
                                       Let's try a pure border-radius approach to get that soft "Diamond" look:
                                    */}
                                     <div 
                                        className="w-full h-full overflow-hidden"
                                        style={{ 
                                            // This complex radius creates the leaf/diamond shape
                                            borderTopLeftRadius: "50% 20%",
                                            borderTopRightRadius: "50% 20%",
                                            borderBottomLeftRadius: "50px", 
                                            borderBottomRightRadius: "50px",
                                            clipPath: "polygon(0 30%, 50% 0, 100% 30%, 100% 100%, 0 100%)"
                                        }}
                                     >
                                         <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                                        />
                                     </div>
                                </div>
                                
                                {/* The Bottom Blue Accent Stroke (Key Detail from image) */}
                                <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[102%] h-[20px] z-20" viewBox="0 0 400 20" preserveAspectRatio="none">
                                     {/* This draws the curved blue line underneath */}
                                    <path d="M10,0 Q200,35 390,0" fill="none" stroke="#003DA5" strokeWidth="6" strokeLinecap="round" />
                                </svg>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl md:text-2xl font-extrabold text-[#001D3D] mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-base leading-relaxed px-4">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}