"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Briefcase, Rocket, Loader2 } from 'lucide-react';

type UserMode = 'CAREER' | 'BUSINESS';

interface MobileModeToggleProps {
    onModeChange?: (mode: UserMode) => void;
}

export function MobileModeToggle({ onModeChange }: MobileModeToggleProps) {
    const [activeMode, setActiveMode] = useState<UserMode | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchMode = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: profile } = await supabase
                .from('profiles')
                .select('mode')
                .eq('id', user.id)
                .single();

            if (profile) {
                setActiveMode(profile.mode || 'CAREER');
            }
            setIsLoading(false);
        };

        fetchMode();
    }, []);

    const handleModeSwitch = async (newMode: UserMode) => {
        if (activeMode === newMode || isUpdating) return;

        setIsUpdating(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setIsUpdating(false);
            return;
        }

        const { error } = await supabase
            .from('profiles')
            .update({ mode: newMode })
            .eq('id', user.id);

        if (!error) {
            setActiveMode(newMode);
            if (onModeChange) {
                onModeChange(newMode);
            } else {
                router.refresh();
                window.location.reload();
            }
        }
        setIsUpdating(false);
    };

    if (isLoading) {
        return (
            <div className="mobile-mode-toggle">
                <div className="mobile-mode-loading">
                    <Loader2 size={16} className="animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="mobile-mode-toggle">
            <button
                className={`mobile-mode-tab ${activeMode === 'CAREER' ? 'active' : ''}`}
                onClick={() => handleModeSwitch('CAREER')}
                disabled={isUpdating}
            >
                <Briefcase size={16} />
                <span>Career Mode</span>
            </button>
            <button
                className={`mobile-mode-tab ${activeMode === 'BUSINESS' ? 'active' : ''}`}
                onClick={() => handleModeSwitch('BUSINESS')}
                disabled={isUpdating}
            >
                <Rocket size={16} />
                <span>Business Mode</span>
            </button>
        </div>
    );
}

export default MobileModeToggle;
