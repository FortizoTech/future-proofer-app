"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Target, MapPin, X } from 'lucide-react';

interface WelcomeModalProps {
    isOpen: boolean;
    onClose: () => void;
    userName: string;
    goal: string;
    country: string;
}

export const WelcomeModal = ({ isOpen, onClose, userName, goal, country }: WelcomeModalProps) => {
    if (!isOpen) return null;

    const getGoalText = (goal: string) => {
        switch (goal) {
            case 'FIND_JOB': return 'Find your next career opportunity';
            case 'UPSKILL': return 'Enhance your professional skill set';
            case 'CAREER_SWITCH': return 'Transition into a new career path';
            default: return 'Grow your professional career';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Background Glows */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative flex flex-col items-center text-center">
                            {/* Bot Icon */}
                            <div className="w-20 h-20 bg-blue-500 rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-500/20">
                                <Bot size={40} />
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-2">
                                Welcome, {userName || 'Explorer'}!
                            </h2>
                            <p className="text-blue-400 font-medium mb-8">
                                Your AI Career Guide is ready.
                            </p>

                            {/* Data Cards */}
                            <div className="grid grid-cols-2 gap-4 w-full mb-8">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wider mb-2 font-semibold">
                                        <Target size={14} className="text-blue-400" />
                                        Target Goal
                                    </div>
                                    <div className="text-white text-sm font-medium">
                                        {getGoalText(goal)}
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wider mb-2 font-semibold">
                                        <MapPin size={14} className="text-purple-400" />
                                        Location
                                    </div>
                                    <div className="text-white text-sm font-medium">
                                        {country || 'Global'}
                                    </div>
                                </div>
                            </div>

                            {/* Insight Box */}
                            <div className="w-full bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 mb-8 text-left relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-3">
                                    <Sparkles size={16} className="text-blue-400 opacity-50" />
                                </div>
                                <h4 className="text-blue-400 text-sm font-bold mb-2 flex items-center gap-2">
                                    Initial AI Insight
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Based on your interest in <strong>{goal === 'UPSKILL' ? 'upskilling' : 'career growth'}</strong>, I&apos;ve analyzed the tech ecosystem in <strong>{country || 'your region'}</strong>. I see high demand for cloud architecture and React specialists right now.
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-1 active:scale-[0.98]"
                            >
                                Launch My Dashboard
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
