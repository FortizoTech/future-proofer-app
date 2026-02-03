"use client";

import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface GapItem {
    name: string;
    status: 'gap' | 'partial';
}

interface SkillGapRadarProps {
    items: GapItem[];
    title?: string;
}

export function SkillGapRadar({ items, title = 'Skill Gap Radar' }: SkillGapRadarProps) {
    // Only show top 3 gaps
    const topGaps = items.slice(0, 3);

    return (
        <div className="skill-gap-widget">
            <h3 className="skill-gap-title">{title}</h3>
            <div className="skill-gap-list">
                {topGaps.map((gap, index) => (
                    <div key={index} className={`skill-gap-item ${gap.status}`}>
                        {gap.status === 'gap' ? (
                            <AlertCircle size={14} className="gap-icon gap" />
                        ) : (
                            <CheckCircle2 size={14} className="gap-icon partial" />
                        )}
                        <span className="gap-skill">{gap.name}</span>
                        <span className={`gap-status-badge ${gap.status}`}>
                            {gap.status === 'gap' ? 'Gap' : 'Partial'}
                        </span>
                    </div>
                ))}
            </div>
            {items.length === 0 && (
                <div className="skill-gap-empty">
                    No significant gaps detected.
                </div>
            )}
        </div>
    );
}

export default SkillGapRadar;

