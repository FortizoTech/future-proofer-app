"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, Check, Plus, MoreHorizontal, Eye, Download, RotateCcw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ActionMenu from './ActionMenu';

interface MobileUserCardProps {
    user: any;
    profile: any;
    onSkillChange?: (skill: string) => void;
}

const AVAILABLE_SKILLS = [
    { value: 'Software Development', label: 'Software Developer' },
    { value: 'Data Analysis', label: 'Data Analyst' },
    { value: 'Project Management', label: 'Project Manager' },
    { value: 'UX/UI Design', label: 'UX/UI Designer' },
];

export function MobileUserCard({ user, profile, onSkillChange }: MobileUserCardProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<string>(profile?.skills?.[0] || 'Software Development');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const isBusiness = profile?.mode === 'BUSINESS';

    const displayName = profile?.full_name || user?.user_metadata?.full_name || "Guest User";
    const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || "https://randomuser.me/api/portraits/men/32.jpg";

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    const handleSkillSelect = (skill: string) => {
        setSelectedSkill(skill);
        onSkillChange?.(skill);
        setIsDropdownOpen(false);
    };

    const actionMenuItems = [
        {
            label: 'View AI Summary',
            icon: <Eye size={16} />,
            onClick: () => console.log('View AI Summary')
        },
        {
            label: 'Export Insights',
            icon: <Download size={16} />,
            onClick: () => console.log('Export Insights')
        },
        {
            label: 'Reset Session',
            icon: <RotateCcw size={16} />,
            onClick: () => console.log('Reset Session')
        },
        {
            label: 'Report Issue',
            icon: <AlertCircle size={16} />,
            onClick: () => console.log('Report Issue'),
            variant: 'danger' as const
        },
    ];

    const currentSkillLabel = AVAILABLE_SKILLS.find(s => s.value === selectedSkill)?.label || 'Software Developer';

    return (
        <div className="mobile-user-card" ref={dropdownRef}>
            <div className="mobile-user-avatar">
                <Image
                    src={avatarUrl}
                    alt={displayName}
                    width={48}
                    height={48}
                    className="mobile-avatar-img"
                />
            </div>
            <div className="mobile-user-info">
                <h3 className="mobile-user-name">{displayName}</h3>
                <button
                    className="mobile-user-role-btn"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="listbox"
                >
                    <span>{isBusiness ? (profile?.business_sector || 'Fintech SaaS Startup') : currentSkillLabel}</span>
                    <ChevronDown
                        size={14}
                        className={`mobile-user-chevron ${isDropdownOpen ? 'rotated' : ''}`}
                    />
                </button>

                {/* Skill Dropdown */}
                <AnimatePresence>
                    {isDropdownOpen && !isBusiness && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="mobile-skill-dropdown"
                            role="listbox"
                        >
                            {AVAILABLE_SKILLS.map((skill) => (
                                <button
                                    key={skill.value}
                                    className={`mobile-skill-option ${selectedSkill === skill.value ? 'selected' : ''}`}
                                    onClick={() => handleSkillSelect(skill.value)}
                                    role="option"
                                    aria-selected={selectedSkill === skill.value}
                                >
                                    {selectedSkill === skill.value && (
                                        <Check size={16} className="mobile-skill-check" />
                                    )}
                                    <span>{skill.label}</span>
                                    <ChevronDown size={14} className="mobile-skill-arrow" />
                                </button>
                            ))}
                            <button className="mobile-skill-add">
                                <Plus size={16} />
                                <span>Add More Expertise</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Three-dot Action Menu */}
            <ActionMenu items={actionMenuItems} position="bottom-right" />
        </div>
    );
}

export default MobileUserCard;
