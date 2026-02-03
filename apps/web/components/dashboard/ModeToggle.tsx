"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import {
    Rocket, Loader2, X, Building2, Target, ChevronRight,
    Briefcase, Check, Users, DollarSign, Globe, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import '@/assets/css/onboarding.css';

type UserMode = 'CAREER' | 'BUSINESS';

const BUSINESS_STAGES = [
    { value: 'IDEA', label: 'Idea Stage', description: 'Planning / Conceptualizing' },
    { value: 'MVP', label: 'MVP', description: '0-6 months old' },
    { value: 'EARLY', label: 'Early Stage', description: '6 months - 2 years' },
    { value: 'GROWTH', label: 'Growth Stage', description: '2-5 years' },
    { value: 'ESTABLISHED', label: 'Established', description: '5+ years' },
];

const TEAM_SIZES = ['Solo', '2-5', '6-10', '11-50', '50+'];
const REVENUE_STAGES = [
    { value: 'PRE_REVENUE', label: 'Pre-Revenue' },
    { value: 'REVENUE', label: 'Generating Revenue' },
    { value: 'PROFITABLE', label: 'Profitable' },
];

const CAREER_GOALS = [
    { value: 'FIND_JOB', label: 'Find a Job', description: 'Looking for new employment opportunities' },
    { value: 'UPSKILL', label: 'Upskill', description: 'Improve my current skill set' },
    { value: 'CAREER_SWITCH', label: 'Career Switch', description: 'Transition to a new career path' },
];

export default function ModeToggle({
    compact = false,
    onModeChange
}: {
    compact?: boolean;
    onModeChange?: (mode: UserMode) => void;
}) {
    const [activeMode, setActiveMode] = useState<UserMode | null>(null);
    const [secondaryEnabled, setSecondaryEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showInitModal, setShowInitModal] = useState(false);
    const [initMode, setInitMode] = useState<UserMode>('BUSINESS');
    const [currentStep, setCurrentStep] = useState(1);

    // Business State
    const [sector, setSector] = useState('');
    const [stage, setStage] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [revenueStage, setRevenueStage] = useState('');

    // Career State
    const [careerGoal, setCareerGoal] = useState('');
    const [customGoal, setCustomGoal] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState('');

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchMode = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: profile, error } = await supabase
                .from('profiles')
                .select('mode, secondary_mode_enabled, business_sector, business_stage, team_size, revenue_stage, career_goal, skills')
                .eq('id', user.id)
                .single();

            if (profile) {
                setActiveMode(profile.mode || 'CAREER');
                setSecondaryEnabled(profile.secondary_mode_enabled || false);
                setSector(profile.business_sector || '');
                setStage(profile.business_stage || '');
                setTeamSize(profile.team_size || '');
                setRevenueStage(profile.revenue_stage || '');
                setCareerGoal(profile.career_goal || '');
                setSkills(profile.skills || []);
            }
            setIsLoading(false);
        };

        fetchMode();
    }, []);

    const handleToggle = async () => {
        if (!activeMode || isUpdating) return;

        const newMode = activeMode === 'CAREER' ? 'BUSINESS' : 'CAREER';

        // Check if destination mode needs initialization
        // Business mode is complete if sector is set
        if (newMode === 'BUSINESS' && !sector) {
            setInitMode('BUSINESS');
            setShowInitModal(true);
            setCurrentStep(1);
            setError(null);
            return;
        }

        // Career mode is complete if careerGoal is set
        if (newMode === 'CAREER' && !careerGoal) {
            setInitMode('CAREER');
            setShowInitModal(true);
            setCurrentStep(1);
            setError(null);
            return;
        }

        // Both modes complete - just switch
        updateMode(newMode);
    };

    const updateMode = async (newMode: UserMode) => {
        setIsUpdating(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('profiles')
            .update({ mode: newMode })
            .eq('id', user.id);

        if (!error) {
            setActiveMode(newMode);
            if (onModeChange) onModeChange(newMode);
            else {
                router.refresh();
                window.location.reload(); // Ensure all components react
            }
        } else {
            console.error('[ModeToggle] Error updating mode:', error);
            setError(`Failed to switch to ${newMode} mode`);
        }
        setIsUpdating(false);
    };

    const handleInitializeBusiness = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (currentStep < 4) {
            if (currentStep === 1 && !sector.trim()) { setError('Please enter sector'); return; }
            if (currentStep === 2 && !stage) { setError('Please select stage'); return; }
            if (currentStep === 3 && (!teamSize || !revenueStage)) { setError('Please complete details'); return; }
            setCurrentStep(prev => prev + 1);
            setError(null);
            return;
        }

        setIsUpdating(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const stageObj = BUSINESS_STAGES.find(s => s.value === stage);
        const finalStage = stageObj ? `${stageObj.label}: ${stageObj.description}` : stage;

        const { error } = await supabase
            .from('profiles')
            .update({
                mode: 'BUSINESS',
                secondary_mode_enabled: true,
                business_sector: sector,
                business_stage: finalStage,
                team_size: teamSize,
                revenue_stage: revenueStage
            })
            .eq('id', user.id);

        if (!error) {
            setActiveMode('BUSINESS');
            setSecondaryEnabled(true);
            setShowInitModal(false);
            if (onModeChange) onModeChange('BUSINESS');
            else {
                router.refresh();
                window.location.reload();
            }
        } else {
            setError('Failed to initialize business mode');
        }
        setIsUpdating(false);
    };

    const handleInitializeCareer = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (currentStep < 4) {
            if (currentStep === 1 && !careerGoal && !customGoal) { setError('Please select or enter a goal'); return; }
            if (currentStep === 2 && skills.length === 0) { setError('Please add skills'); return; }
            setCurrentStep(prev => prev + 1);
            setError(null);
            return;
        }

        setIsUpdating(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const finalGoal = customGoal ? (careerGoal ? `${careerGoal}: ${customGoal}` : customGoal) : careerGoal;

        const { error } = await supabase
            .from('profiles')
            .update({
                mode: 'CAREER',
                career_goal: finalGoal,
                skills: skills
            })
            .eq('id', user.id);

        if (!error) {
            setActiveMode('CAREER');
            setShowInitModal(false);
            if (onModeChange) onModeChange('CAREER');
            else {
                router.refresh();
                window.location.reload();
            }
        } else {
            setError('Failed to initialize career mode');
        }
        setIsUpdating(false);
    };

    if (isLoading) return null;

    return (
        <>
            <button
                onClick={handleToggle}
                disabled={isUpdating}
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-blue-500 transition-colors disabled:opacity-50"
            >
                {isUpdating ? (
                    <Loader2 size={12} className="animate-spin" />
                ) : activeMode === 'CAREER' ? (
                    <>
                        <Rocket size={12} />
                        <span>Biz Mode</span>
                    </>
                ) : (
                    <>
                        <Briefcase size={12} />
                        <span>Career Mode</span>
                    </>
                )}
            </button>

            <AnimatePresence>
                {showInitModal && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => currentStep === 1 && setShowInitModal(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl overflow-hidden z-[10000]"
                        >
                            <div className="onboarding-card" style={{ maxWidth: '100%', minHeight: 'auto', padding: '2.5rem 2rem' }}>
                                {currentStep === 1 && (
                                    <button onClick={() => setShowInitModal(false)} className="onboarding-cancel"><X size={16} /></button>
                                )}

                                <div className="onboarding-header">
                                    <div className="onboarding-logo mb-2" style={{ background: 'transparent', boxShadow: 'none' }}>
                                        <Image
                                            src="/logo/logo-transparent.png"
                                            alt="Project Logo"
                                            width={80}
                                            height={80}
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="onboarding-step-badge">Step {currentStep} of 4</span>
                                </div>

                                <div className="onboarding-content">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={`${initMode}-${currentStep}`}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {initMode === 'BUSINESS' ? (
                                                /* BUSINESS MODE BREADCRUMBS */
                                                <>
                                                    {currentStep === 1 && (
                                                        <div>
                                                            <h2 className="onboarding-title">Business Sector</h2>
                                                            <p className="onboarding-subtitle">What industry is your venture in?</p>
                                                            <div className="onboarding-input-wrapper mb-6">
                                                                <input type="text" placeholder="e.g. E-commerce, AI..." className="onboarding-input" value={sector} onChange={(e) => setSector(e.target.value)} autoFocus />
                                                            </div>
                                                            <div className="onboarding-nav">
                                                                <button onClick={() => setShowInitModal(false)} className="onboarding-back-btn">Cancel</button>
                                                                <button onClick={() => handleInitializeBusiness()} className="onboarding-continue-btn">Continue <ChevronRight size={16} /></button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {currentStep === 2 && (
                                                        <div>
                                                            <h2 className="onboarding-title">Business Stage</h2>
                                                            <p className="onboarding-subtitle">Where is your venture now?</p>
                                                            <div className="onboarding-options mb-6">
                                                                {BUSINESS_STAGES.map(s => (
                                                                    <button key={s.value} className={`onboarding-option ${stage === s.value ? 'selected' : ''}`} onClick={() => setStage(s.value)}>
                                                                        <Building2 className="onboarding-option-icon" />
                                                                        <div><span className="onboarding-option-title">{s.label}</span></div>
                                                                        {stage === s.value && <Check className="onboarding-option-check" />}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            <div className="onboarding-nav">
                                                                <button onClick={() => setCurrentStep(1)} className="onboarding-back-btn">Back</button>
                                                                <button onClick={() => handleInitializeBusiness()} className="onboarding-continue-btn">Continue <ChevronRight size={16} /></button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {currentStep === 3 && (
                                                        <div>
                                                            <h2 className="onboarding-title">Details</h2>
                                                            <div className="mb-4">
                                                                <label className="onboarding-label">Team Size</label>
                                                                <div className="onboarding-chips">
                                                                    {TEAM_SIZES.map(t => <button key={t} className={`onboarding-chip ${teamSize === t ? 'selected' : ''}`} onClick={() => setTeamSize(t)}>{t}</button>)}
                                                                </div>
                                                            </div>
                                                            <div className="mb-6">
                                                                <label className="onboarding-label">Revenue</label>
                                                                <div className="onboarding-chips">
                                                                    {REVENUE_STAGES.map(r => <button key={r.value} className={`onboarding-chip ${revenueStage === r.value ? 'selected' : ''}`} onClick={() => setRevenueStage(r.value)}>{r.label}</button>)}
                                                                </div>
                                                            </div>
                                                            <div className="onboarding-nav">
                                                                <button onClick={() => setCurrentStep(2)} className="onboarding-back-btn">Back</button>
                                                                <button onClick={() => handleInitializeBusiness()} className="onboarding-continue-btn">Continue <ChevronRight size={16} /></button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {currentStep === 4 && (
                                                        <div>
                                                            <h2 className="onboarding-title">Ready?</h2>
                                                            <p className="onboarding-subtitle">Activate Business Mode now.</p>
                                                            {error && <div className="onboarding-error mb-4"><AlertCircle size={16} /> {error}</div>}
                                                            <button onClick={() => handleInitializeBusiness()} disabled={isUpdating} className="onboarding-submit-btn w-full">
                                                                {isUpdating ? 'Activating...' : 'Activate Business Mode'}
                                                            </button>
                                                            <button onClick={() => setCurrentStep(3)} className="onboarding-back-btn w-full justify-center mt-2">Edit</button>
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                /* CAREER MODE FLOW */
                                                <>
                                                    {currentStep === 1 && (
                                                        <div style={{ width: '100%', maxWidth: '900px' }}>
                                                            <h2 className="onboarding-title">Career Goal</h2>
                                                            <p className="onboarding-subtitle">What are you aiming for?</p>

                                                            <div className="onboarding-goal-grid mb-6">
                                                                <div className="onboarding-goal-options">
                                                                    {CAREER_GOALS.map(g => (
                                                                        <button
                                                                            key={g.value}
                                                                            className={`onboarding-option ${careerGoal === g.value ? 'selected' : ''}`}
                                                                            onClick={() => setCareerGoal(g.value)}
                                                                        >
                                                                            <Target className="onboarding-option-icon" />
                                                                            <div><span className="onboarding-option-title">{g.label}</span></div>
                                                                            {careerGoal === g.value && <Check className="onboarding-option-check" />}
                                                                        </button>
                                                                    ))}
                                                                </div>

                                                                <div className="onboarding-goal-input-container">
                                                                    <textarea
                                                                        placeholder="Tell us more about your career objectives..."
                                                                        className="onboarding-goal-textarea"
                                                                        value={customGoal}
                                                                        onChange={(e) => setCustomGoal(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="onboarding-nav">
                                                                <button onClick={() => setShowInitModal(false)} className="onboarding-back-btn">Cancel</button>
                                                                <button
                                                                    onClick={() => {
                                                                        if (careerGoal || customGoal) {
                                                                            setCurrentStep(2);
                                                                            setError(null);
                                                                        } else {
                                                                            setError('Please select or enter a goal');
                                                                        }
                                                                    }}
                                                                    className="onboarding-continue-btn"
                                                                >
                                                                    Continue <ChevronRight size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {currentStep === 2 && (
                                                        <div>
                                                            <h2 className="onboarding-title">Skills</h2>
                                                            <div className="onboarding-input-wrapper mb-4">
                                                                <input type="text" placeholder="Add skill..." className="onboarding-input" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => {
                                                                    if (e.key === 'Enter' && skillInput.trim()) {
                                                                        setSkills([...skills, skillInput.trim()]);
                                                                        setSkillInput('');
                                                                    }
                                                                }} />
                                                            </div>
                                                            <div className="flex flex-wrap gap-2 mb-6">
                                                                {skills.map((s, i) => <span key={i} className="onboarding-skill-tag">{s} <X size={10} onClick={() => setSkills(skills.filter((_, idx) => idx !== i))} /></span>)}
                                                            </div>
                                                            <div className="onboarding-nav">
                                                                <button onClick={() => setCurrentStep(1)} className="onboarding-back-btn">Back</button>
                                                                <button onClick={() => handleInitializeCareer()} className="onboarding-continue-btn">Continue <ChevronRight size={16} /></button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {currentStep === 3 && (
                                                        <div>
                                                            <h2 className="onboarding-title">Resume</h2>
                                                            <p className="onboarding-subtitle">Personalize your experience.</p>
                                                            <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 text-center text-slate-400 text-sm mb-6">
                                                                CV Analysis coming soon
                                                            </div>
                                                            <div className="onboarding-nav">
                                                                <button onClick={() => setCurrentStep(2)} className="onboarding-back-btn">Back</button>
                                                                <button onClick={() => setCurrentStep(4)} className="onboarding-continue-btn">Skip <ChevronRight size={16} /></button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {currentStep === 4 && (
                                                        <div>
                                                            <h2 className="onboarding-title">Switch to Career?</h2>
                                                            {error && <div className="onboarding-error mb-4"><AlertCircle size={16} /> {error}</div>}
                                                            <button onClick={() => handleInitializeCareer()} disabled={isUpdating} className="onboarding-submit-btn w-full">
                                                                {isUpdating ? 'Switching...' : 'Activate Career Mode'}
                                                            </button>
                                                            <button onClick={() => setCurrentStep(2)} className="onboarding-back-btn w-full justify-center mt-2">Edit</button>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="onboarding-dots">
                                    {[1, 2, 3, 4].map(s => <div key={s} className={`onboarding-dot ${currentStep >= s ? 'onboarding-dot--active' : ''}`} />)}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}