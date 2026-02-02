"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Target, MapPin, X } from 'lucide-react';

interface WelcomeModalProps {
    isOpen: boolean;
    onClose: () => void;
    userName: string;
    goal: any;
    country: string;
    skills?: string[];
    aiInsight?: string;
    isDarkMode?: boolean;
}

export const WelcomeModal = ({
    isOpen,
    onClose,
    userName,
    goal,
    country,
    skills = [],
    aiInsight,
    isDarkMode = false
}: WelcomeModalProps) => {
    if (!isOpen) return null;

    const getGoalText = (goalVal: any) => {
        const g = goalVal || '';
        if (!g) return 'Grow your professional career';
        if (g === 'FIND_JOB') return 'Find your next career opportunity';
        if (g === 'UPSKILL') return 'Enhance your professional skill set';
        if (g === 'CAREER_SWITCH') return 'Transition into a new career path';

        // Handle custom goals: clean up and truncate if needed
        const cleanGoal = (g.split(':')[0] || '').trim();
        return cleanGoal.length > 35 ? cleanGoal.substring(0, 32) + '...' : cleanGoal;
    };

    // Default insight if AI hasn't loaded one yet
    const displayInsight = aiInsight || `Based on your profile, I'm identifying high-growth opportunities in ${country || 'the region'} that match your skills. Let's explore your tailored career roadmap.`;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className={`absolute inset-0 ${isDarkMode ? 'bg-slate-950/80 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]' : 'bg-slate-500/20'} backdrop-blur-md`}
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        className={`relative w-full max-w-lg ${isDarkMode
                                ? 'bg-slate-900/60 border-white/10 text-white'
                                : 'bg-white/80 border-slate-200 text-slate-900'
                            } backdrop-blur-2xl border rounded-[3rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden`}
                    >
                        {/* Background Decorative Glows */}
                        <div className={`absolute -top-24 -right-24 w-64 h-64 ${isDarkMode ? 'bg-blue-600/20' : 'bg-blue-400/10'} rounded-full blur-[80px] pointer-events-none`} />
                        <div className={`absolute -bottom-24 -left-24 w-64 h-64 ${isDarkMode ? 'bg-purple-600/20' : 'bg-purple-400/10'} rounded-full blur-[80px] pointer-events-none`} />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className={`absolute top-8 right-8 p-2 rounded-full transition-all ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                        >
                            <X size={20} />
                        </button>

                        <div className="relative flex flex-col items-center text-center">
                            {/* Bot Icon with Pulse effect */}
                            <div className="relative mb-8">
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute -inset-4 bg-blue-500 rounded-[2.5rem] blur-xl"
                                />
                                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-[2.2rem] flex items-center justify-center text-white shadow-2xl shadow-blue-500/30">
                                    <Bot size={48} strokeWidth={1.5} />
                                </div>
                            </div>

                            <h2 className={`text-4xl font-extrabold mb-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                Welcome, {userName || 'Explorer'}!
                            </h2>
                            <p className="text-blue-500 font-semibold mb-10 text-lg uppercase tracking-widest text-sm">
                                AI Foresight is Ready
                            </p>

                            {/* Refined Data Cards */}
                            <div className="grid grid-cols-2 gap-5 w-full mb-10">
                                <div className={`group rounded-[2rem] p-6 text-left transition-all border ${isDarkMode
                                        ? 'bg-white/5 border-white/5 hover:border-white/10'
                                        : 'bg-slate-50 border-slate-100 hover:border-slate-200 shadow-sm'
                                    }`}>
                                    <div className="flex items-center gap-2 text-blue-500 text-[10px] uppercase tracking-[0.2em] mb-3 font-bold">
                                        <Target size={14} />
                                        Target Goal
                                    </div>
                                    <div className={`text-sm font-bold leading-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                                        {getGoalText(goal)}
                                    </div>
                                </div>
                                <div className={`group rounded-[2rem] p-6 text-left transition-all border ${isDarkMode
                                        ? 'bg-white/5 border-white/5 hover:border-white/10'
                                        : 'bg-slate-50 border-slate-100 hover:border-slate-200 shadow-sm'
                                    }`}>
                                    <div className="flex items-center gap-2 text-purple-500 text-[10px] uppercase tracking-[0.2em] mb-3 font-bold">
                                        <MapPin size={14} />
                                        Location
                                    </div>
                                    <div className={`text-sm font-bold leading-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                                        {country || 'Global'}
                                    </div>
                                </div>
                            </div>

                            {/* Elevated Insight Box */}
                            <div className={`w-full rounded-[2rem] p-8 mb-10 text-left relative overflow-hidden min-h-[120px] flex flex-col justify-center border transition-all ${isDarkMode
                                    ? 'bg-blue-500/5 border-blue-500/20'
                                    : 'bg-blue-50/50 border-blue-100 shadow-[0_8px_32px_rgba(59,130,246,0.1)]'
                                }`}>
                                <div className="absolute top-0 right-0 p-4">
                                    <Sparkles size={20} className={`text-blue-500 ${!aiInsight ? 'animate-pulse' : 'opacity-30'}`} />
                                </div>
                                <h4 className="text-blue-500 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    AI Perspective
                                </h4>
                                {aiInsight ? (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`text-sm leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
                                    >
                                        {aiInsight}
                                    </motion.p>
                                ) : (
                                    <div className="space-y-3">
                                        <div className={`h-2.5 w-full rounded-full animate-pulse ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-200'}`} />
                                        <div className={`h-2.5 w-4/5 rounded-full animate-pulse ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-200'}`} />
                                        <p className="text-[10px] text-blue-500/60 font-bold uppercase tracking-tighter mt-4">Synthesizing African Market Data...</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-lg rounded-[1.8rem] shadow-[0_20px_40px_-10px_rgba(59,130,246,0.3)] transition-all transform hover:-translate-y-1 active:scale-[0.98] tracking-wide"
                            >
                                Launch Experience
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
