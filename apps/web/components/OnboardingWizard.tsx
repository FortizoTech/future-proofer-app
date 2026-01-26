"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase, Rocket, ChevronRight, Upload,
    X, Check, Lightbulb, Map, Zap, User
} from "lucide-react";

// --- TYPE DEFINITIONS ---
type Mode = "career" | "business" | "";
type Goal = "skillset" | "venture" | "";

interface FormData {
    mode: Mode;
    goal: Goal;
    skills: string[];
    name: string;
    email: string;
}

// --- ANIMATION VARIANTS ---
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
    }),
};

// --- BACKGROUND COMPONENT (World Map Background) ---
const WorldMapBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-white">
        {/* The Map Image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <img
                src="/onboarding-map.png"
                alt="Onboarding Map Background"
                className="w-full h-full object-contain"
            />
        </div>

        {/* Soft Radial Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 via-transparent to-white/50" />

        {/* Subtle decorative blobs */}
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-blue-100/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-indigo-100/20 rounded-full blur-[100px]" />
    </div>
);


export default function OnboardingWizard() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);

    // --- STATE ---
    const [data, setData] = useState<FormData>({
        mode: "",
        goal: "",
        skills: [],
        name: "",
        email: ""
    });

    // --- FORM ACTIONS ---
    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setStep((prev) => prev + newDirection);
    };

    const handleFinalSubmit = () => {
        if (!data.name || !data.email.includes("@")) {
            alert("Please provide a valid name and email.");
            return;
        }
        setIsSimulating(true); // Triggers the AI Loader
    };

    // --- RENDER CONTENT BASED ON STEP ---
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center font-sans px-4">
            <WorldMapBackground />

            {/* The Glass Card Container */}
            <div className="w-full relative rounded-[36px] border-2 border-blue-500 p-[6px] max-w-[500px] min-h-[580px] bg-white/70 backdrop-blur-xl  rounded-[40px] shadow-2xl shadow-blue-900/10 flex flex-col p-8 relative overflow-hidden transition-all duration-500">

                {/* -- Cancel Button (Top Right) -- */}
                {!isSimulating && (
                    <a
                        href="/"
                        className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors group z-20"
                        title="Cancel and return to home"
                    >
                        <X className="w-4 h-4 text-slate-600 group-hover:text-slate-900" />
                    </a>
                )}

                {/* -- Top Branding -- */}
                {!isSimulating && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col items-center mb-6"
                    >
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-2 shadow-lg shadow-blue-500/30">
                            <Zap className="text-white w-6 h-6 fill-white" />
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm tracking-wide uppercase">Future Proofer</h4>
                        <div className="text-xs font-semibold text-blue-500 mt-2 bg-blue-50 px-3 py-1 rounded-full">
                            Step {step} of 3
                        </div>
                    </motion.div>
                )}

                {/* -- Main Dynamic Content Area -- */}
                <div className="flex-grow relative flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction} mode="wait">

                        {!isSimulating ? (
                            <motion.div
                                key={step}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="w-full"
                            >
                                {/* === STEP 1: PERSONA === */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-extrabold text-slate-900 text-center leading-tight">
                                            Your Path Awaits
                                        </h2>

                                        <button
                                            onClick={() => { setData({ ...data, mode: 'career' }); paginate(1); }}
                                            className="group w-full h-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-between px-8 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-[1.02] transition-all"
                                        >
                                            <span className="text-xl font-bold">Career Mode</span>
                                            <Briefcase className="w-7 h-7" />
                                        </button>

                                        <button
                                            onClick={() => { setData({ ...data, mode: 'business' }); paginate(1); }}
                                            className="group w-full h-20 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl flex items-center justify-between px-8 hover:border-blue-500 hover:text-blue-600 hover:shadow-lg transition-all"
                                        >
                                            <span className="text-xl font-bold">Business Mode</span>
                                            <Rocket className="w-7 h-7" />
                                        </button>
                                    </div>
                                )}

                                {/* === STEP 2: DESTINATION (Simulated Step 2 from context) === */}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-extrabold text-slate-900 text-center leading-tight">
                                            Map Your Current Skills
                                        </h2>

                                        {/* Skill Tag Input */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-500">What are your top 3 current strengths?</label>
                                            <SkillInput
                                                skills={data.skills}
                                                addSkill={(s) => setData({ ...data, skills: [...data.skills, s] })}
                                                removeSkill={(s) => setData({ ...data, skills: data.skills.filter(i => i !== s) })}
                                            />
                                        </div>

                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#fcfdff] px-2 text-slate-400">Or auto-import</span></div>
                                        </div>

                                        {/* CV Upload */}
                                        <div className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-colors group">
                                            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                <Upload className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">Upload CV / LinkedIn PDF</span>
                                            <span className="text-xs text-slate-400 mt-1">PDF or DOCX (Max 5MB)</span>
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <button onClick={() => paginate(-1)} className="text-sm font-semibold text-slate-400 hover:text-slate-600">Back</button>
                                            <button onClick={() => paginate(1)} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/20">Continue</button>
                                        </div>
                                    </div>
                                )}

                                {/* === STEP 3: FINALIZE === */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-extrabold text-slate-900 text-center leading-tight">
                                            Finalize Your Future
                                        </h2>

                                        <div className="space-y-4 pt-2">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Amina Jallow"
                                                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                                                        value={data.name}
                                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700">Email Address</label>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</div>
                                                    <input
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                                                        value={data.email}
                                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleFinalSubmit}
                                            className="w-full h-14 bg-blue-600 text-white font-bold rounded-xl text-lg hover:bg-blue-700 shadow-xl shadow-blue-600/30 transition-transform active:scale-95 flex items-center justify-center gap-2 mt-4"
                                        >
                                            Unlock My Roadmap <ChevronRight className="w-5 h-5" />
                                        </button>

                                        <div className="text-center">
                                            <button onClick={() => paginate(-1)} className="text-sm font-semibold text-slate-400 hover:text-slate-600">Back</button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            // === LOADING STATE (AI SYNTHESIS) ===
                            <AiLoader onComplete={() => alert("Flow Complete: Dashboard Redirect")} />
                        )}

                    </AnimatePresence>
                </div>

                {/* Footer Dots (Only show during wizard) */}
                {!isSimulating && (
                    <div className="absolute bottom-6 left-0 w-full flex justify-center gap-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-blue-500' : 'w-2 bg-slate-200'}`} />
                        ))}
                    </div>
                )}
            </div>

            <div className="absolute bottom-6 text-slate-400 text-xs font-medium opacity-60">
                No credit card required • Instant AI Match
            </div>
        </div>
    );
}


// --- SUB-COMPONENT: SKILL TAG INPUT ---
const SkillInput = ({ skills, addSkill, removeSkill }: { skills: string[], addSkill: (s: string) => void, removeSkill: (s: string) => void }) => {
    const [curr, setCurr] = useState("");
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && curr.trim().length > 0) {
            addSkill(curr.trim());
            setCurr("");
        }
    };

    return (
        <div className="w-full bg-white border border-slate-200 rounded-xl p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-shadow cursor-text shadow-sm" onClick={() => document.getElementById('skill-input')?.focus()}>
            <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((s) => (
                    <span key={s} className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        {s} <X className="w-3 h-3 cursor-pointer hover:text-blue-900" onClick={(e) => { e.stopPropagation(); removeSkill(s); }} />
                    </span>
                ))}
            </div>
            <input
                id="skill-input"
                type="text"
                className="w-full outline-none text-sm text-slate-700 font-medium placeholder:font-normal placeholder:text-slate-400"
                placeholder={skills.length === 0 ? "Type a skill (e.g. Python) and hit Enter..." : "Add more..."}
                value={curr}
                onChange={(e) => setCurr(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

// --- SUB-COMPONENT: AI LOADING SIMULATION ---
const AiLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);

    const messages = [
        "Analyzing Skill Gaps...",
        "Mapping ECOWAS Opportunities...",
        "Crafting Personalized Roadmap...",
        "Finalizing Your Profile..."
    ];

    useEffect(() => {
        // Progress Logic
        const timer = setInterval(() => {
            setProgress((old) => {
                if (old >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 800); // Wait a bit before finish
                    return 100;
                }
                const diff = Math.random() * 5;
                return Math.min(old + diff, 100);
            });
        }, 100);

        // Message Logic
        const msgTimer = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % messages.length);
        }, 1500);

        return () => { clearInterval(timer); clearInterval(msgTimer); };
    }, []);

    const radius = 60;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center w-full h-full py-10"
        >
            <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
                {/* Circular Progress SVG */}
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="rotate-[-90deg] transition-all duration-300"
                >
                    <circle
                        stroke="#e2e8f0"
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="#3B82F6"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className="transition-all duration-300 ease-out"
                    />
                </svg>
                {/* Inner Percentage */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-black text-slate-800">{Math.floor(progress)}%</span>
                </div>

                {/* Orbiting Particles (Decoration) */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="absolute w-full h-full border border-blue-200 rounded-full"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                </motion.div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Synthesizing Your Future</h2>

            <div className="h-6 overflow-hidden">
                <motion.p
                    key={messageIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="text-blue-500 font-medium text-sm"
                >
                    {messages[messageIndex]}
                </motion.p>
            </div>

            <p className="text-slate-400 text-xs mt-8">Analyzing Market Trends in ECOWAS</p>

            {/* List visualization of completed tasks */}
            <div className="w-full max-w-[280px] mt-6 space-y-3">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-400"
                        animate={{ width: `${Math.min(progress * 1.5, 100)}%` }}
                    />
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden delay-100">
                    <motion.div
                        className="h-full bg-blue-400"
                        animate={{ width: `${Math.min((progress - 20) * 2, 100)}%` }}
                    />
                </div>
            </div>

        </motion.div>
    );
}
