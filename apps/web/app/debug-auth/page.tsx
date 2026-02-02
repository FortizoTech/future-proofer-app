"use client";

import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';

export default function DebugAuthPage() {
    const [session, setSession] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
        console.log(message);
    };

    useEffect(() => {
        const supabase = createClient();
        
        const checkAuth = async () => {
            addLog('Checking authentication status...');
            
            try {
                // Check session
                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) {
                    addLog(`Session error: ${sessionError.message}`);
                    setError(sessionError.message);
                } else {
                    addLog(`Session: ${sessionData.session ? 'Found' : 'None'}`);
                    setSession(sessionData.session);
                }

                // Check user
                const { data: userData, error: userError } = await supabase.auth.getUser();
                if (userError) {
                    addLog(`User error: ${userError.message}`);
                    setError(userError.message);
                } else {
                    addLog(`User: ${userData.user ? userData.user.email : 'None'}`);
                    setUser(userData.user);
                }
            } catch (err: any) {
                addLog(`Unexpected error: ${err.message}`);
                setError(err.message);
            }
        };

        checkAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            addLog(`Auth state changed: ${event}`);
            if (session) {
                addLog(`New session for: ${session.user.email}`);
                setSession(session);
                setUser(session.user);
                setError(null);
            } else {
                addLog('Session cleared');
                setSession(null);
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleGoogleLogin = async () => {
        const supabase = createClient();
        addLog('Initiating Google login...');
        
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback?next=/debug-auth`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'select_account',
                    },
                },
            });

            if (error) {
                addLog(`Google login error: ${error.message}`);
                setError(error.message);
            } else {
                addLog('Google login initiated successfully');
                addLog(`Redirect URL: ${data.url}`);
            }
        } catch (err: any) {
            addLog(`Unexpected Google login error: ${err.message}`);
            setError(err.message);
        }
    };

    const handleSignOut = async () => {
        const supabase = createClient();
        addLog('Signing out...');
        
        const { error } = await supabase.auth.signOut();
        if (error) {
            addLog(`Sign out error: ${error.message}`);
        } else {
            addLog('Signed out successfully');
            setSession(null);
            setUser(null);
            setError(null);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h1>Authentication Debug Page</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <h2>Current Status</h2>
                <p><strong>User:</strong> {user ? user.email : 'None'}</p>
                <p><strong>Session:</strong> {session ? 'Active' : 'None'}</p>
                <p><strong>Error:</strong> {error || 'None'}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <button 
                    onClick={handleGoogleLogin}
                    style={{ 
                        padding: '10px 20px', 
                        marginRight: '10px',
                        backgroundColor: '#4285f4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Sign in with Google
                </button>
                
                <button 
                    onClick={handleSignOut}
                    style={{ 
                        padding: '10px 20px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Sign Out
                </button>
            </div>

            <div>
                <h2>Debug Logs</h2>
                <div style={{ 
                    backgroundColor: '#f8f9fa', 
                    padding: '10px', 
                    borderRadius: '4px',
                    maxHeight: '400px',
                    overflowY: 'auto',
                    fontSize: '12px'
                }}>
                    {logs.map((log, index) => (
                        <div key={index}>{log}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}