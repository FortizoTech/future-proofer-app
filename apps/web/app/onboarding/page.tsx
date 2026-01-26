"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase, Rocket, ChevronRight, Upload,
    X, Check, Lightbulb, Map, Box, User, Paperclip
} from "lucide-react";
import "./onboarding.css";

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
        x: direction > 0 ? 30 : -30,
        opacity: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 30 : -30,
        opacity: 0,
    }),
};

// --- BACKGROUND COMPONENT ---
const WorldMapBackground = () => (
    <div className="onboarding-bg">
        <div className="onboarding-bg-map">
            <img
                src="/onboarding-map.png"
                alt="World Map Background"
            />
        </div>
        <div className="onboarding-bg-gradient" />
        <div className="onboarding-bg-blob onboarding-bg-blob--top" />
        <div className="onboarding-bg-blob onboarding-bg-blob--bottom" />
    </div>
);

// --- LOGO COMPONENT ---
const LogoIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
    </svg>
);

export default function OnboardingWizard() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [isSimulating, setIsSimulating] = useState(false);

    const [data, setData] = useState<FormData>({
        mode: "",
        goal: "",
        skills: [],
        name: "",
        email: ""
    });

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setStep((prev) => prev + newDirection);
    };

    const handleFinalSubmit = () => {
        if (!data.name || !data.email.includes("@")) {
            alert("Please provide a valid name and email.");
            return;
        }
        setIsSimulating(true);
    };

    return (
        <div className="onboarding-page">
            <WorldMapBackground />

            {/* Glass Card */}
            <div className="onboarding-card">

                {/* Cancel Button */}
                {!isSimulating && (
                    <a href="/" className="onboarding-cancel" title="Cancel">
                        <X />
                    </a>
                )}

                {/* Header Branding */}
                {!isSimulating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="onboarding-header"
                    >
                        <div className="onboarding-logo">
                            <LogoIcon />
                        </div>
                        <h4 className="onboarding-brand">Future Proofer</h4>
                        <span className="onboarding-step-badge">Step {step} of 3</span>
                    </motion.div>
                )}

                {/* Content Area */}
                <div className="onboarding-content">
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
                                style={{ width: '100%' }}
                            >
                                {/* STEP 1: MODE SELECTION */}
                                {step === 1 && (
                                    <div>
                                        <h2 className="onboarding-title">Your Path Awaits</h2>
                                        <div className="onboarding-modes">
                                            <button
                                                onClick={() => { setData({ ...data, mode: 'career' }); paginate(1); }}
                                                className="onboarding-mode-btn onboarding-mode-btn--career"
                                            >
                                                <span>Career Mode</span>
                                                <Briefcase />
                                            </button>

                                            <button
                                                onClick={() => { setData({ ...data, mode: 'business' }); paginate(1); }}
                                                className="onboarding-mode-btn onboarding-mode-btn--business"
                                            >
                                                <span>Business Mode</span>
                                                <Rocket />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: SKILLS */}
                                {step === 2 && (
                                    <div>
                                        <h2 className="onboarding-title">Map Your Current Skills</h2>

                                        <div style={{ marginBottom: '1rem' }}>
                                            <label className="onboarding-label">What are your top 3 current strengths?</label>
                                            <SkillInput
                                                skills={data.skills}
                                                addSkill={(s) => setData({ ...data, skills: [...data.skills, s] })}
                                                removeSkill={(s) => setData({ ...data, skills: data.skills.filter(i => i !== s) })}
                                            />
                                        </div>

                                        <div className="onboarding-upload">
                                            <p className="onboarding-upload-title">Or, upload your CV for instant analysis</p>
                                            <p className="onboarding-upload-desc">PDF or DOCX, max 5MB. AI will extract key skills.</p>
                                            <button className="onboarding-upload-btn">
                                                <Paperclip />
                                                Upload CV
                                            </button>
                                        </div>

                                        <div className="onboarding-nav">
                                            <button onClick={() => paginate(-1)} className="onboarding-back-btn">Back</button>
                                            <button onClick={() => paginate(1)} className="onboarding-continue-btn">Continue</button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: FINALIZE */}
                                {step === 3 && (
                                    <div>
                                        <h2 className="onboarding-title">Finalize Your Future</h2>

                                        <div style={{ marginBottom: '1rem' }}>
                                            <label className="onboarding-label">Full Name</label>
                                            <div className="onboarding-input-wrapper">
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Amina Jallow"
                                                    className="onboarding-input"
                                                    value={data.name}
                                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label className="onboarding-label">Email Address</label>
                                            <div className="onboarding-input-wrapper">
                                                <input
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    className="onboarding-input"
                                                    value={data.email}
                                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleFinalSubmit}
                                            className="onboarding-continue-btn"
                                            style={{ width: '100%', height: '3.5rem', fontSize: '1rem' }}
                                        >
                                            Unlock My Roadmap <ChevronRight style={{ width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem' }} />
                                        </button>

                                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                            <button onClick={() => paginate(-1)} className="onboarding-back-btn">Back</button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <AiLoader onComplete={() => alert("Flow Complete: Dashboard Redirect")} />
                        )}

                    </AnimatePresence>
                </div>

                {/* Step Indicator Dots */}
                {!isSimulating && (
                    <div className="onboarding-dots">
                        <div className={`onboarding-dot ${step >= 1 ? 'onboarding-dot--active' : ''}`} />
                        <span className="onboarding-step-text">{step} / 3</span>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="onboarding-footer">
                No credit card required • Instant AI Match
            </div>

            {/* Decorative Star */}
            <svg className="onboarding-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L9 9l-7 3 7 3 3 7 3-7 7-3-7-3-3-7z" />
            </svg>
        </div>
    );
}


// --- SKILL INPUT COMPONENT ---
const SkillInput = ({ skills, addSkill, removeSkill }: { skills: string[], addSkill: (s: string) => void, removeSkill: (s: string) => void }) => {
    const [curr, setCurr] = useState("");
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && curr.trim().length > 0) {
            addSkill(curr.trim());
            setCurr("");
        }
    };

    return (
        <div className="onboarding-input-wrapper" onClick={() => document.getElementById('skill-input')?.focus()}>
            {skills.length > 0 && (
                <div className="onboarding-skills">
                    {skills.map((s) => (
                        <span key={s} className="onboarding-skill-tag">
                            {s}
                            <X onClick={(e) => { e.stopPropagation(); removeSkill(s); }} />
                        </span>
                    ))}
                </div>
            )}
            <input
                id="skill-input"
                type="text"
                className="onboarding-input"
                placeholder={skills.length === 0 ? "Type to add skills..." : "Add more..."}
                value={curr}
                onChange={(e) => setCurr(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

// --- AI LOADER COMPONENT ---
const AiLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);

    const messages = [
        "Analyzing Skill Gaps...",
        "Mapping Opportunities...",
        "Crafting Personalized Roadmap...",
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((old) => {
                if (old >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 800);
                    return 100;
                }
                return Math.min(old + Math.random() * 4, 100);
            });
        }, 100);

        const msgTimer = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % messages.length);
        }, 1500);

        return () => { clearInterval(timer); clearInterval(msgTimer); };
    }, []);

    const radius = 60;
    const stroke = 6;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="onboarding-loader"
        >
            <div className="onboarding-loader-circle">
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="onboarding-loader-svg"
                >
                    <circle
                        className="onboarding-loader-bg"
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        className="onboarding-loader-progress"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>
                <div className="onboarding-loader-percent">{Math.floor(progress)}%</div>
            </div>

            <h2 className="onboarding-loader-title">Synthesizing Your Future</h2>

            <motion.p
                key={messageIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="onboarding-loader-message"
            >
                {messages[messageIndex]}
            </motion.p>

            <p className="onboarding-loader-subtitle">Analyzing Market Trends in ECOWAS</p>

            <div className="onboarding-loader-bars">
                <div className="onboarding-loader-bar-item">
                    <span className="onboarding-loader-bar-label">Analyzing Skill Gaps...</span>
                    <div className="onboarding-loader-bar">
                        <div className="onboarding-loader-bar-fill" style={{ width: `${Math.min(progress * 1.5, 100)}%` }} />
                    </div>
                </div>
                <div className="onboarding-loader-bar-item">
                    <span className="onboarding-loader-bar-label">Mapping Opportunities</span>
                    <div className="onboarding-loader-bar">
                        <div className="onboarding-loader-bar-fill" style={{ width: `${Math.min((progress - 20) * 1.5, 100)}%` }} />
                    </div>
                </div>
                <div className="onboarding-loader-bar-item">
                    <span className="onboarding-loader-bar-label">Crafting Personalized Roadmap...</span>
                    <div className="onboarding-loader-bar">
                        <div className="onboarding-loader-bar-fill" style={{ width: `${Math.min((progress - 40) * 1.5, 100)}%` }} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}