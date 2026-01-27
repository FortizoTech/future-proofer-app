"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Loader2, Mail, Lock, ArrowRight, CheckCircle, Sparkles, Eye, EyeOff, X } from 'lucide-react';
import '../../assets/css/login.css';

function LoginContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const searchParams = useSearchParams();
    const message = searchParams.get('message');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const supabase = createClient();

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else if (data.user) {
                // Login successful - redirect to dashboard
                router.push('/dashboard');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Background Elements */}
            <div className="login-bg">
                <div className="login-bg-gradient" />
                <div className="login-bg-blob login-bg-blob--top" />
                <div className="login-bg-blob login-bg-blob--bottom" />
                <div className="login-bg-pattern" />
            </div>

            {/* Login Card */}
            <div className="login-card">
                {/* Exit Button */}
                <Link href="/" className="login-exit-btn" title="Exit to Landing Page">
                    <X size={20} />
                </Link>

                {/* Logo */}
                <div className="login-logo-container">
                    <Link href="/">
                        <div className="login-logo-wrapper">
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
                <div className="login-header">
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to access your personalized dashboard</p>
                </div>

                {/* Success Message from Onboarding */}
                {message === 'success' && (
                    <div className="login-success-message">
                        <div className="login-success-icon">
                            <CheckCircle size={20} />
                        </div>
                        <div>
                            <h3 className="login-success-title">Account Created!</h3>
                            <p className="login-success-text">
                                Your account has been created. Please sign in with your email.
                            </p>
                        </div>
                    </div>
                )}

                {/* Check Email Message */}
                {message === 'check_email' && (
                    <div className="login-success-message">
                        <div className="login-success-icon">
                            <Mail size={20} />
                        </div>
                        <div>
                            <h3 className="login-success-title">Check Your Email</h3>
                            <p className="login-success-text">
                                We've sent you a verification link. Please check your email and click the link to continue.
                            </p>
                        </div>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="login-form">
                    {/* Email Input */}
                    <div className="login-field">
                        <label className="login-label">Email Address</label>
                        <div className="login-input-wrapper">
                            <Mail className="login-input-icon" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="login-input"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="login-field">
                        <label className="login-label">Password</label>
                        <div className="login-input-wrapper">
                            <Lock className="login-input-icon" size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input login-input--password"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="login-password-toggle"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="login-submit-btn"
                    >
                        {isLoading ? (
                            <Loader2 className="login-spinner" size={20} />
                        ) : (
                            <>
                                Sign In
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="login-divider">
                    <span>NEW TO FUTURE PROOFER?</span>
                </div>

                {/* Get Started Link */}
                <Link href="/onboarding" className="login-get-started">
                    <Sparkles size={18} />
                    Get Started Free
                    <ArrowRight size={18} />
                </Link>

                {/* Footer */}
                <p className="login-footer">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>

            {/* Bottom Text */}
            <p className="login-bottom-text">
                Forging the future of African innovation 🌍
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="login-page">
                <div className="login-loading">
                    <Loader2 size={32} className="login-spinner" />
                </div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
