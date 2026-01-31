"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Mail, Lock, User, ArrowRight, Loader2, X } from 'lucide-react';
import '@/assets/css/auth.css';

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
        } else {
            router.push('/onboarding?message=check_email');
        }
    };

    const handleGoogleLogin = async () => {
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
            },
        });
    };

    return (
        <div className="auth-page">
            {/* Background Elements */}
            <div className="auth-bg">
                <div className="auth-bg-gradient" />
                <div className="auth-bg-blob auth-bg-blob--top" />
                <div className="auth-bg-blob auth-bg-blob--bottom" />
                <div className="auth-bg-pattern" />
            </div>

            {/* Signup Card */}
            <div className="auth-card">
                {/* Exit Button */}
                <Link href="/" className="auth-exit-btn" title="Exit to Landing Page">
                    <X size={20} />
                </Link>

                {/* Logo */}
                <div className="auth-logo-container">
                    <Link href="/">
                        <div className="auth-logo-wrapper">
                            <Image
                                src="/logo/logo-transparent.png"
                                alt="Future Proofer"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </Link>
                </div>

                {/* Header */}
                <div className="auth-header">
                    <h1 className="auth-title">Join Future Proofer</h1>
                    <p className="auth-subtitle">Start your journey to a better career</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSignup} className="auth-form">

                    {/* Email Input */}
                    <div className="auth-field">
                        <label className="auth-label">Email Address</label>
                        <div className="auth-input-wrapper">
                            <Mail className="auth-input-icon" size={20} />
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="auth-input"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <div className="auth-input-wrapper">
                            <Lock className="auth-input-icon" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="auth-input auth-input--password"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="auth-submit-btn"
                    >
                        {isLoading ? (
                            <Loader2 className="auth-spinner" size={20} />
                        ) : (
                            <>
                                Create Account <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="auth-divider">
                    <span>ALREADY HAVE AN ACCOUNT?</span>
                </div>

                {/* Google Login Button */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="auth-google-btn"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#1e293b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        marginBottom: '24px'
                    }}
                >
                    <Image
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        width={20}
                        height={20}
                    />
                    Sign up with Google
                </button>

                {/* Login Link */}
                <div style={{ textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
                    Already have an account?{' '}
                    <Link href="/login" style={{ color: '#3b82f6', fontWeight: '600', textDecoration: 'none' }}>
                        Sign In
                    </Link>
                </div>

                {/* Footer */}
                <p className="auth-footer">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>

            {/* Bottom Text */}
            <div className="auth-bottom-text">
                © 2026 Future Proofer. All rights reserved.
            </div>
        </div>
    );
}
