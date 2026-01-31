"use client";

/**
 * ============================================
 * ONBOARDING WIZARD - COMPLETE IMPLEMENTATION
 * ============================================
 * 
 * This wizard handles the complete onboarding flow for Future Proofer:
 * 
 * STEP 1: Mode Selection (Career or Business)
 * STEP 2: Destination (Branching based on mode)
 *   - CAREER: Career Goal selection
 *   - BUSINESS: Business Stage selection
 * STEP 3: Inventory (Mode-aware data collection)
 *   - CAREER: Skills + CV Upload
 *   - BUSINESS: Sector, Team Size, Revenue Stage
 * STEP 4: Finalize Identity (Name, Email, Auth)
 * 
 * @file apps/web/app/onboarding/page.tsx
 */

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase, Rocket, ChevronRight, Upload, ChevronLeft,
    X as CloseIcon, Check, Lightbulb, Target, Search, RefreshCw,
    Building2, Users, DollarSign, User, Mail, FileText,
    Loader2, AlertCircle, Globe
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import "../assets/css/onboarding.css";
import "../assets/css/ai-loader.css";
import AiLoader from "@/components/AiLoader";
import {
    OnboardingData,
    UserMode,
    CareerGoal,
    BusinessStage,
    RevenueStage,
    uploadCV,
    extractCVText,
    completeOnboarding
} from "@/lib/onboarding";

// ============================================
// ANIMATION VARIANTS
// ============================================

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

// ============================================
// BACKGROUND COMPONENT
// ============================================

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

// ============================================
// LOGO COMPONENT
// ============================================

const LogoIcon = () => (
    <img
        src="/logo/logo-transparent.png"
        alt="Future Proofer Logo"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
);





// ============================================
// CONSTANTS
// ============================================

const TOTAL_STEPS = 4;

// Career Goals Options
const CAREER_GOALS: { value: CareerGoal; label: string; icon: typeof Search; description: string }[] = [
    { value: 'FIND_JOB', label: 'Find a Job', icon: Search, description: 'Looking for new employment opportunities' },
    { value: 'UPSKILL', label: 'Upskill', icon: RefreshCw, description: 'Improve my current skill set' },
    { value: 'CAREER_SWITCH', label: 'Career Switch', icon: Target, description: 'Transition to a new career path' },
];

// Business Stage Options
const BUSINESS_STAGES: { value: BusinessStage; label: string; description: string }[] = [
    { value: 'IDEA', label: 'Idea Stage', description: 'Planning / Conceptualizing' },
    { value: 'MVP', label: 'MVP', description: '0-6 months old' },
    { value: 'EARLY', label: 'Early Stage', description: '6 months - 2 years' },
    { value: 'GROWTH', label: 'Growth Stage', description: '2-5 years' },
    { value: 'ESTABLISHED', label: 'Established', description: '5+ years' },
];

// Team Size Options
const TEAM_SIZES = ['Solo', '2-5', '6-10', '11-50', '50+'];

// Revenue Stage Options
const REVENUE_STAGES: { value: RevenueStage; label: string }[] = [
    { value: 'PRE_REVENUE', label: 'Pre-Revenue' },
    { value: 'REVENUE', label: 'Generating Revenue' },
    { value: 'PROFITABLE', label: 'Profitable' },
];

// ============================================
// MAIN COMPONENT
// ============================================

function OnboardingContent() {

    // ============================================
    // STATE & HOOKS
    // ============================================
    const searchParams = useSearchParams();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [hasMounted, setHasMounted] = useState(false);
    const [direction, setDirection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Initialize step as default
    const [step, setStep] = useState(1);

    // Initialize data as default
    const [data, setData] = useState<OnboardingData>({
        mode: '',
        skills: [],
        fullName: '',
        email: '',
        country: '',
        password: '',
        cvFile: null,
    });

    // Handle mode selection from landing page
    useEffect(() => {
        const modeParam = searchParams.get('mode');
        if (modeParam) {
            const upperMode = modeParam.toUpperCase() as UserMode;
            if (upperMode === 'CAREER' || upperMode === 'BUSINESS') {
                setData(prev => ({ ...prev, mode: upperMode }));
                setStep(2);
            }
        }
    }, [searchParams]);

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('onboarding_data');
        if (savedData) {
            try {
                setData(JSON.parse(savedData));
            } catch (e) {
                console.error('Failed to parse saved onboarding data', e);
            }
        }

        const savedStep = localStorage.getItem('onboarding_step');
        if (savedStep) {
            setStep(parseInt(savedStep));
        }

        setHasMounted(true);
    }, []);

    // Save data to localStorage whenever it changes (only after mounting)
    useEffect(() => {
        if (hasMounted) {
            localStorage.setItem('onboarding_data', JSON.stringify(data));
        }
    }, [data, hasMounted]);

    // Save step to localStorage whenever it changes (only after mounting)
    useEffect(() => {
        if (hasMounted) {
            localStorage.setItem('onboarding_step', step.toString());
        }
    }, [step, hasMounted]);

    // Auto-fill user data (Email/Name) and detect country
    useEffect(() => {
        // Fetch current user data
        const loadUserData = async () => {
            // We can dynamically import createClient to avoid top-level issues if any
            const { createClient } = await import('@/utils/supabase/client');
            const supabase = createClient();

            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Check if onboarding is already completed
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('onboarding_completed')
                    .eq('id', user.id)
                    .single();

                if (profile?.onboarding_completed) {
                    // User has already finished onboarding, redirect to dashboard
                    window.location.href = '/dashboard';
                    return;
                }

                setIsAuthenticated(true);
                setData(prev => ({
                    ...prev,
                    email: user.email || prev.email,
                    fullName: user.user_metadata?.full_name || prev.fullName
                }));
            }
        };

        loadUserData();

        if (data.country) return; // Skip if already set

        const detectCountry = async () => {
            try {
                // Using ipapi for simple country detection (no API key needed for basic usage)
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                if (data.country_name) {
                    setData(prev => ({ ...prev, country: data.country_name }));
                }
            } catch (error) {
                console.error('Failed to detect country:', error);
            }
        };
        detectCountry();
    }, []);

    // ============================================
    // NAVIGATION FUNCTIONS
    // ============================================

    const paginate = (newDirection: number) => {
        setError(null);
        setDirection(newDirection);
        setStep((prev) => Math.max(1, Math.min(prev + newDirection, TOTAL_STEPS)));
    };

    const canProceed = (): boolean => {
        switch (step) {
            case 1:
                return !!data.mode;
            case 2:
                if (data.mode === 'CAREER') {
                    return !!data.careerGoal;
                } else if (data.mode === 'BUSINESS') {
                    return !!data.businessStage;
                }
                return false;
            case 3:
                if (data.mode === 'CAREER') {
                    // At least one skill or CV uploaded
                    return data.skills.length > 0 || !!data.cvFile;
                } else if (data.mode === 'BUSINESS') {
                    // Business sector is required
                    return !!data.businessSector;
                }
                return false;
            case 4:
                // If authenticated, just need name and country. If not, need email and password too.
                const basicInfo = !!data.fullName && !!data.country;
                if (isAuthenticated) {
                    return basicInfo;
                }
                return basicInfo && !!data.email && data.email.includes('@') && !!data.password && data.password.length >= 6;
            default:
                return false;
        }
    };

    // ============================================
    // CV UPLOAD HANDLER
    // ============================================

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (!allowedTypes.includes(file.type)) {
            setError('Please upload a PDF or DOCX file');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            return;
        }

        setData({ ...data, cvFile: file });
        setError(null);

        // TODO: Extract text from CV for AI processing
        // const extractedText = await extractCVText(file);
        // if (extractedText) {
        //     setData(prev => ({ ...prev, cvText: extractedText }));
        // }
    };

    // ============================================
    // FINAL SUBMISSION HANDLER
    // ============================================

    const handleFinalSubmit = async () => {
        if (!canProceed()) {
            setError('Please complete all required fields');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Complete the onboarding flow
            const result = await completeOnboarding(data);

            if (result.success) {
                setSuccessMessage(result.message);

                // Clear persistence on success
                localStorage.removeItem('onboarding_data');
                localStorage.removeItem('onboarding_step');

                // Redirect after a short delay
                if (result.redirectUrl) {
                    setTimeout(() => {
                        window.location.href = result.redirectUrl!;
                    }, 2000);
                }
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ============================================
    // RENDER
    // ============================================

    return (
        <div className="onboarding-page">
            <WorldMapBackground />

            {/* Glass Card */}
            <div className="onboarding-card">

                {/* Cancel Button */}
                {!isSubmitting && !successMessage && (
                    <a href="/" className="onboarding-cancel" title="Cancel">
                        <CloseIcon />
                    </a>
                )}

                {/* Header Branding */}
                {!isSubmitting && !successMessage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="onboarding-header"
                    >
                        <div className="onboarding-logo">
                            <LogoIcon />
                        </div>
                        <span className="onboarding-step-badge">Step {step} of {TOTAL_STEPS}</span>
                    </motion.div>
                )}

                {/* Content Area */}
                <div className="onboarding-content">
                    <AnimatePresence initial={false} custom={direction} mode="wait">

                        {/* Success Message */}
                        {successMessage ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="onboarding-success"
                            >
                                <div className="onboarding-success-icon">
                                    <Check />
                                </div>
                                <h2 className="onboarding-title">{successMessage}</h2>
                                <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
                                    Redirecting you...
                                </p>
                            </motion.div>
                        ) : !isSubmitting ? (
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
                                {/* ============================================
                                    STEP 1: MODE SELECTION (The Gateway)
                                    ============================================ */}
                                {step === 1 && (
                                    <div>
                                        <h2 className="onboarding-title">Choose Your Path</h2>
                                        <p className="onboarding-subtitle">
                                            Select how you want to use Future Proofer
                                        </p>

                                        <div className="onboarding-modes">
                                            {/* Career Mode Button */}
                                            <button
                                                onClick={() => {
                                                    setData({ ...data, mode: 'CAREER' });
                                                    paginate(1);
                                                }}
                                                className={`onboarding-mode-btn onboarding-mode-btn--career ${data.mode === 'CAREER' ? 'selected' : ''}`}
                                            >
                                                <div className="onboarding-mode-btn-content">
                                                    <Briefcase />
                                                    <span className="onboarding-mode-btn-title">Career Mode</span>
                                                    <span className="onboarding-mode-btn-desc">
                                                        Find jobs, upskill, or switch careers
                                                    </span>
                                                </div>
                                            </button>

                                            {/* Business Mode Button */}
                                            <button
                                                onClick={() => {
                                                    setData({ ...data, mode: 'BUSINESS' });
                                                    paginate(1);
                                                }}
                                                className={`onboarding-mode-btn onboarding-mode-btn--business ${data.mode === 'BUSINESS' ? 'selected' : ''}`}
                                            >
                                                <div className="onboarding-mode-btn-content">
                                                    <Rocket />
                                                    <span className="onboarding-mode-btn-title">Business Mode</span>
                                                    <span className="onboarding-mode-btn-desc">
                                                        Validate, scale, or grow your venture
                                                    </span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* ============================================
                                    STEP 2: SET YOUR DESTINATION (Branching)
                                    ============================================ */}
                                {step === 2 && (
                                    <div>
                                        {/* CAREER MODE: Goal Selection */}
                                        {data.mode === 'CAREER' && (
                                            <>
                                                <h2 className="onboarding-title">What's Your Goal?</h2>
                                                <p className="onboarding-subtitle">
                                                    This helps CareerGuide AI personalize your experience
                                                </p>

                                                <div className="onboarding-options">
                                                    {CAREER_GOALS.map((goal) => {
                                                        const Icon = goal.icon;
                                                        return (
                                                            <button
                                                                key={goal.value}
                                                                onClick={() => setData({ ...data, careerGoal: goal.value })}
                                                                className={`onboarding-option ${data.careerGoal === goal.value ? 'selected' : ''}`}
                                                            >
                                                                <Icon className="onboarding-option-icon" />
                                                                <div>
                                                                    <span className="onboarding-option-title">{goal.label}</span>
                                                                    <span className="onboarding-option-desc">{goal.description}</span>
                                                                </div>
                                                                {data.careerGoal === goal.value && (
                                                                    <Check className="onboarding-option-check" />
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        )}

                                        {/* BUSINESS MODE: Business Stage Selection */}
                                        {data.mode === 'BUSINESS' && (
                                            <>
                                                <h2 className="onboarding-title">Business Stage</h2>
                                                <p className="onboarding-subtitle">
                                                    Where is your venture right now?
                                                </p>

                                                <div className="onboarding-options">
                                                    {BUSINESS_STAGES.map((stage) => (
                                                        <button
                                                            key={stage.value}
                                                            onClick={() => setData({ ...data, businessStage: stage.value })}
                                                            className={`onboarding-option ${data.businessStage === stage.value ? 'selected' : ''}`}
                                                        >
                                                            <Building2 className="onboarding-option-icon" />
                                                            <div>
                                                                <span className="onboarding-option-title">{stage.label}</span>
                                                                <span className="onboarding-option-desc">{stage.description}</span>
                                                            </div>
                                                            {data.businessStage === stage.value && (
                                                                <Check className="onboarding-option-check" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}

                                        {/* Navigation */}
                                        <div className="onboarding-nav">
                                            <button onClick={() => paginate(-1)} className="onboarding-back-btn">
                                                <ChevronLeft /> Back
                                            </button>
                                            <button
                                                onClick={() => paginate(1)}
                                                className="onboarding-continue-btn"
                                                disabled={!canProceed()}
                                            >
                                                Continue <ChevronRight />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* ============================================
                                    STEP 3: MAP YOUR INVENTORY (Mode-Aware)
                                    ============================================ */}
                                {step === 3 && (
                                    <div>
                                        {/* CAREER MODE: Skills & CV Upload */}
                                        {data.mode === 'CAREER' && (
                                            <>
                                                <h2 className="onboarding-title">Your Current Skills</h2>
                                                <p className="onboarding-subtitle">
                                                    Add your strengths or upload your CV
                                                </p>

                                                {/* Skills Input */}
                                                <div style={{ marginBottom: '1.5rem' }}>
                                                    <label className="onboarding-label">
                                                        Enter your top skills
                                                    </label>
                                                    <SkillInput
                                                        skills={data.skills}
                                                        addSkill={(s) => setData({ ...data, skills: [...data.skills, s] })}
                                                        removeSkill={(s) => setData({ ...data, skills: data.skills.filter(i => i !== s) })}
                                                    />
                                                </div>

                                                {/* Divider */}
                                                <div className="onboarding-divider">
                                                    <span>OR</span>
                                                </div>

                                                {/* CV Upload */}
                                                <div className="onboarding-upload">
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                        onChange={handleFileSelect}
                                                        style={{ display: 'none' }}
                                                    />

                                                    {data.cvFile ? (
                                                        <div className="onboarding-upload-success">
                                                            <FileText />
                                                            <span>{data.cvFile.name}</span>
                                                            <button
                                                                onClick={() => setData({ ...data, cvFile: null })}
                                                                className="onboarding-upload-remove"
                                                            >
                                                                <CloseIcon />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <p className="onboarding-upload-title">
                                                                Upload your CV for instant analysis
                                                            </p>
                                                            <p className="onboarding-upload-desc">
                                                                PDF or DOCX, max 5MB. AI will extract key skills.
                                                            </p>
                                                            <button
                                                                onClick={() => fileInputRef.current?.click()}
                                                                className="onboarding-upload-btn"
                                                            >
                                                                <Upload />
                                                                Upload CV
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        {/* BUSINESS MODE: Business Details */}
                                        {data.mode === 'BUSINESS' && (
                                            <>
                                                <h2 className="onboarding-title">Business Details</h2>
                                                <p className="onboarding-subtitle">
                                                    Help BusinessMate AI understand your venture
                                                </p>

                                                {/* Business Sector */}
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <label className="onboarding-label">
                                                        <Building2 size={16} style={{ marginRight: '0.5rem' }} />
                                                        Business Sector / Industry
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. E-commerce, FinTech, Agriculture..."
                                                        className="onboarding-input"
                                                        value={data.businessSector || ''}
                                                        onChange={(e) => setData({ ...data, businessSector: e.target.value })}
                                                    />
                                                </div>

                                                {/* Team Size */}
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <label className="onboarding-label">
                                                        <Users size={16} style={{ marginRight: '0.5rem' }} />
                                                        Team Size
                                                    </label>
                                                    <div className="onboarding-chips">
                                                        {TEAM_SIZES.map((size) => (
                                                            <button
                                                                key={size}
                                                                onClick={() => setData({ ...data, teamSize: size })}
                                                                className={`onboarding-chip ${data.teamSize === size ? 'selected' : ''}`}
                                                            >
                                                                {size}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Revenue Stage */}
                                                <div style={{ marginBottom: '1rem' }}>
                                                    <label className="onboarding-label">
                                                        <DollarSign size={16} style={{ marginRight: '0.5rem' }} />
                                                        Revenue Stage
                                                    </label>
                                                    <div className="onboarding-chips">
                                                        {REVENUE_STAGES.map((rev) => (
                                                            <button
                                                                key={rev.value}
                                                                onClick={() => setData({ ...data, revenueStage: rev.value })}
                                                                className={`onboarding-chip ${data.revenueStage === rev.value ? 'selected' : ''}`}
                                                            >
                                                                {rev.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Navigation */}
                                        <div className="onboarding-nav">
                                            <button onClick={() => paginate(-1)} className="onboarding-back-btn">
                                                <ChevronLeft /> Back
                                            </button>
                                            <button
                                                onClick={() => paginate(1)}
                                                className="onboarding-continue-btn"
                                                disabled={!canProceed()}
                                            >
                                                Continue <ChevronRight />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* ============================================
                                    STEP 4: FINALIZE IDENTITY (Auth Creation)
                                    ============================================ */}
                                {step === 4 && (
                                    <div>
                                        <h2 className="onboarding-title">Finalize Your Profile</h2>
                                        <p className="onboarding-subtitle">
                                            Create your account to unlock your personalized roadmap
                                        </p>

                                        {/* Full Name Input */}
                                        <div style={{ marginBottom: '1rem' }}>
                                            <label className="onboarding-label">Full Name</label>
                                            <div className="onboarding-input-wrapper">
                                                <User className="onboarding-input-icon" />
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Amina Jallow"
                                                    className="onboarding-input onboarding-input--with-icon"
                                                    value={data.fullName}
                                                    onChange={(e) => setData({ ...data, fullName: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        {/* Country Input */}
                                        <div style={{ marginBottom: '1rem' }}>
                                            <label className="onboarding-label">Country</label>
                                            <div className="onboarding-input-wrapper">
                                                <Globe className="onboarding-input-icon" />
                                                <select
                                                    className="onboarding-input onboarding-input--with-icon"
                                                    value={data.country || ''}
                                                    onChange={(e) => setData({ ...data, country: e.target.value })}
                                                    style={{ appearance: 'none', background: 'transparent' }}
                                                >
                                                    <option value="" disabled>Select your country</option>
                                                    <optgroup label="West Africa">
                                                        <option value="The Gambia">The Gambia</option>
                                                        <option value="Senegal">Senegal</option>
                                                        <option value="Nigeria">Nigeria</option>
                                                        <option value="Ghana">Ghana</option>
                                                        <option value="Sierra Leone">Sierra Leone</option>
                                                        <option value="Liberia">Liberia</option>
                                                        <option value="Ivory Coast">Ivory Coast</option>
                                                    </optgroup>
                                                    <optgroup label="Other">
                                                        <option value="United States">United States</option>
                                                        <option value="United Kingdom">United Kingdom</option>
                                                        <option value="Canada">Canada</option>
                                                        <option value="Other">Other</option>
                                                    </optgroup>
                                                </select>
                                                <div style={{ position: 'absolute', right: '1rem', pointerEvents: 'none', color: '#94a3b8' }}>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="m6 9 6 6 6-6" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Email Input */}
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label className="onboarding-label">Email Address</label>
                                            <div className="onboarding-input-wrapper">
                                                <Mail className="onboarding-input-icon" />
                                                <input
                                                    type="email"
                                                    disabled={isAuthenticated}
                                                    placeholder="you@example.com"
                                                    className="onboarding-input onboarding-input--with-icon"
                                                    value={data.email}
                                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                                    style={isAuthenticated ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
                                                />
                                            </div>
                                        </div>

                                        {/* Password Input (Only for Guest Users) */}
                                        {!isAuthenticated && (
                                            <div style={{ marginBottom: '1.5rem' }}>
                                                <label className="onboarding-label">Create Password</label>
                                                <div className="onboarding-input-wrapper">
                                                    <div className="onboarding-input-icon">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="password"
                                                        placeholder="Create a password (min 6 chars)"
                                                        className="onboarding-input onboarding-input--with-icon"
                                                        value={data.password || ''}
                                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {!isAuthenticated && (
                                            <div style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                                                Already have an account? <a href="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Login here</a>
                                            </div>
                                        )}


                                        {/* Error Message */}
                                        {error && (
                                            <div className="onboarding-error">
                                                <AlertCircle />
                                                <span>{error}</span>
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            onClick={handleFinalSubmit}
                                            className="onboarding-submit-btn"
                                            disabled={!canProceed() || isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="onboarding-spinner" />
                                                    Creating Account...
                                                </>
                                            ) : (
                                                <>
                                                    Unlock My Roadmap
                                                    <ChevronRight />
                                                </>
                                            )}
                                        </button>

                                        {/* Back Button */}
                                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                                            <button onClick={() => paginate(-1)} className="onboarding-back-btn">
                                                <ChevronLeft /> Back
                                            </button>
                                        </div>

                                        {/* Terms Text */}
                                        <p className="onboarding-terms">
                                            By continuing, you agree to our Terms of Service and Privacy Policy
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <AiLoader />
                        )}

                    </AnimatePresence>
                </div>

                {/* Step Indicator Dots */}
                {!isSubmitting && !successMessage && (
                    <div className="onboarding-dots">
                        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                            <div
                                key={i}
                                className={`onboarding-dot ${step > i ? 'onboarding-dot--completed' : ''} ${step === i + 1 ? 'onboarding-dot--active' : ''}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="onboarding-footer">
                No credit card required • Instant AI Match
            </div>
        </div>
    );
}


// ============================================
// SKILL INPUT COMPONENT
// ============================================

interface SkillInputProps {
    skills: string[];
    addSkill: (skill: string) => void;
    removeSkill: (skill: string) => void;
}

const SkillInput = ({ skills, addSkill, removeSkill }: SkillInputProps) => {
    const [current, setCurrent] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && current.trim().length > 0) {
            e.preventDefault();
            if (!skills.includes(current.trim())) {
                addSkill(current.trim());
            }
            setCurrent("");
        }
    };

    return (
        <div
            className="onboarding-skill-input"
            onClick={() => document.getElementById('skill-input')?.focus()}
        >
            {skills.length > 0 && (
                <div className="onboarding-skills">
                    {skills.map((s) => (
                        <span key={s} className="onboarding-skill-tag">
                            {s}
                            <CloseIcon onClick={(e: React.MouseEvent) => { e.stopPropagation(); removeSkill(s); }} />
                        </span>
                    ))}
                </div>
            )}
            <input
                id="skill-input"
                type="text"
                className="onboarding-input"
                placeholder={skills.length === 0 ? "Type a skill and press Enter..." : "Add more..."}
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default function OnboardingWizard() {
    return (
        <Suspense fallback={
            <div className="onboarding-page">
                <WorldMapBackground />
                <div className="onboarding-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader2 className="onboarding-spinner" size={48} />
                </div>
            </div>
        }>
            <OnboardingContent />
        </Suspense>
    );
}