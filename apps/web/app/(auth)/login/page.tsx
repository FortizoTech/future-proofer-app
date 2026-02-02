"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { Loader2, Mail, Lock, ArrowRight, CheckCircle, Sparkles, Eye, EyeOff, X } from 'lucide-react';
import '@/assets/css/auth.css';

function LoginContent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const urlError = searchParams.get('error');
    const next = searchParams.get('next');
    const mode = searchParams.get('mode');

    // Initialize error from URL if present
    React.useEffect(() => {
        if (urlError) {
            setError(decodeURIComponent(urlError));
        }

        // Redirect to appropriate page if already logged in
        const checkUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // If they are already logged in, respect the 'next' or 'mode' params
                let redirectUrl = '/dashboard';
                if (next) {
                    redirectUrl = next;
                } else if (mode) {
                    redirectUrl = `/onboarding?mode=${mode}`;
                }
                router.push(redirectUrl);
            }
        };
        checkUser();
    }, [urlError, router]);

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
                // Determine redirect target
                let redirectUrl = '/dashboard';
                if (next) {
                    redirectUrl = next;
                } else if (mode) {
                    redirectUrl = `/onboarding?mode=${mode}`;
                }

                router.push(redirectUrl);
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const supabase = createClient();
            let nextUrl = '/dashboard';

            if (next) {
                nextUrl = next;
            } else if (mode) {
                nextUrl = `/onboarding?mode=${mode}`;
            }

            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextUrl)}`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'select_account',
                    },
                },
            });

            if (error) {
                console.error('Google login error:', error.message);
                setError(`Google login failed: ${error.message}`);
                setIsLoading(false);
            }
        } catch (err: any) {
            console.error('Unexpected Google login error:', err);
            setError('An unexpected error occurred during Google login');
            setIsLoading(false);
        }
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

            {/* Login Card */}
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
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to access your personalized dashboard</p>
                </div>

                {/* Success Message from Onboarding */}
                {message === 'success' && (
                    <div className="auth-success-message">
                        <div className="auth-success-icon">
                            <CheckCircle size={20} />
                        </div>
                        <div>
                            <h3 className="auth-success-title">Account Created!</h3>
                            <p className="auth-success-text">
                                Your account has been created. Please sign in with your email.
                            </p>
                        </div>
                    </div>
                )}

                {/* Check Email Message */}
                {message === 'check_email' && (
                    <div className="auth-success-message">
                        <div className="auth-success-icon">
                            <Mail size={20} />
                        </div>
                        <div>
                            <h3 className="auth-success-title">Check Your Email</h3>
                            <p className="auth-success-text">
                                We've sent you a verification link. Please check your email and click the link to continue.
                            </p>
                        </div>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="auth-form">
                    {/* Email Input */}
                    <div className="auth-field">
                        <label className="auth-label">Email Address</label>
                        <div className="auth-input-wrapper">
                            <Mail className="auth-input-icon" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="auth-input"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <div className="auth-input-wrapper">
                            <Lock className="auth-input-icon" size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="auth-input auth-input--password"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="auth-password-toggle"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="auth-submit-btn"
                    >
                        {isLoading ? (
                            <Loader2 className="auth-spinner" size={20} />
                        ) : (
                            <>
                                Sign In
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="auth-divider">
                    <span>NEW TO FUTURE PROOFER?</span>
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
                    Sign in with Google
                </button>

                {/* Sign Up Link */}
                <div style={{ textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" style={{ color: '#3b82f6', fontWeight: '600', textDecoration: 'none' }}>
                        Sign up
                    </Link>
                </div>

                {/* Footer */}
                <p className="auth-footer">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>

            {/* Bottom Text */}
            <p className="auth-bottom-text">
                Forging the future of African innovation 🌍
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="auth-page">
                <div className="auth-loading">
                    <Loader2 size={32} className="auth-spinner" />
                </div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}