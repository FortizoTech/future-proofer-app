"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Briefcase, Rocket, LayoutDashboard, Lightbulb, Users, Settings, MessageCircle, MapPin, ChevronDown, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    profile: any;
    isDarkMode: boolean;
    onModeChange?: (mode: 'CAREER' | 'BUSINESS') => void;
    onNavigate?: (route: string) => void;
}

export function MobileSidebar({
    isOpen,
    onClose,
    user,
    profile,
    isDarkMode,
    onModeChange,
    onNavigate
}: MobileSidebarProps) {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const activeMode = profile?.mode || 'CAREER';
    const isBusiness = activeMode === 'BUSINESS';

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', route: '/dashboard' },
        { icon: Lightbulb, label: 'Insights', route: '/insights' },
        { icon: Users, label: 'Networking', route: '/networking' },
        { icon: Settings, label: 'Settings', route: '/settings' },
    ];

    const displayName = profile?.full_name || user?.user_metadata?.full_name || "Guest User";
    const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || "https://randomuser.me/api/portraits/men/32.jpg";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mobile-sidebar-overlay"
                        onClick={onClose}
                    />

                    {/* Sidebar Drawer */}
                    <motion.div
                        ref={sidebarRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="mobile-sidebar"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                    >
                        {/* User Profile Header */}
                        <div className="mobile-sidebar-header">
                            <div className="mobile-sidebar-user">
                                <div className="mobile-sidebar-avatar">
                                    <Image
                                        src={avatarUrl}
                                        alt={displayName}
                                        width={48}
                                        height={48}
                                        className="mobile-sidebar-avatar-img"
                                    />
                                </div>
                                <div className="mobile-sidebar-user-info">
                                    <h3 className="mobile-sidebar-name">{displayName}</h3>
                                    <p className="mobile-sidebar-role">
                                        {isBusiness ? 'Software Developer' : 'Software Developer'}
                                        <ChevronDown size={14} />
                                    </p>
                                </div>
                            </div>
                            <button className="mobile-sidebar-more-btn">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        {/* Mode Toggle */}
                        <div className="mobile-sidebar-modes">
                            <button
                                className={`mobile-sidebar-mode-btn ${activeMode === 'CAREER' ? 'active' : ''}`}
                                onClick={() => onModeChange?.('CAREER')}
                            >
                                <Briefcase size={16} />
                                <span>Career Mode</span>
                            </button>
                            <button
                                className={`mobile-sidebar-mode-btn ${activeMode === 'BUSINESS' ? 'active' : ''}`}
                                onClick={() => onModeChange?.('BUSINESS')}
                            >
                                <Rocket size={16} />
                                <span>Business Mode</span>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="mobile-sidebar-nav">
                            {navItems.map((item) => (
                                <button
                                    key={item.route}
                                    className="mobile-sidebar-nav-item"
                                    onClick={() => {
                                        onNavigate?.(item.route);
                                        onClose();
                                    }}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </nav>

                        {/* Support Button */}
                        <div className="mobile-sidebar-support">
                            <button
                                className="mobile-sidebar-support-btn"
                                onClick={() => window.open('https://wa.me/2202350530', '_blank')}
                            >
                                <MessageCircle size={18} fill="white" />
                                <span>Support</span>
                            </button>
                        </div>

                        {/* Mode Context Section */}
                        <div className="mobile-sidebar-context">
                            <div className="mobile-sidebar-context-header">
                                <span className="mobile-sidebar-context-mode">
                                    {isBusiness ? (
                                        <>
                                            <Rocket size={16} className="text-amber-500" />
                                            Career Mode
                                        </>
                                    ) : (
                                        <>
                                            <Briefcase size={16} className="text-blue-500" />
                                            Career Mode
                                        </>
                                    )}
                                </span>
                                <button className="mobile-sidebar-context-more">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>
                            <div className="mobile-sidebar-context-items">
                                <div className="mobile-sidebar-context-item">
                                    <Briefcase size={14} />
                                    <span>Business Developer</span>
                                </div>
                                <div className="mobile-sidebar-context-item">
                                    <Rocket size={14} />
                                    <span>Fintech SaaS Startup</span>
                                </div>
                                <div className="mobile-sidebar-context-item">
                                    <MapPin size={14} />
                                    <span>Gambia</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default MobileSidebar;
