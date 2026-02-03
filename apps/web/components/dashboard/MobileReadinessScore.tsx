"use client";

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import MetricBottomSheet from './MetricBottomSheet';

interface BreakdownItem {
    label: string;
    value: number;
    color: string;
    explanation?: string;
    dataSource?: string;
}

interface MobileReadinessScoreProps {
    mode: 'CAREER' | 'BUSINESS';
    overallScore: number;
    breakdown: BreakdownItem[];
}

// Explanations for metrics
const METRIC_EXPLANATIONS: Record<string, { explanation: string; dataSource: string }> = {
    'Skills Match': {
        explanation: 'Measures how closely your current skill set aligns with in-demand roles in your target market. Based on your profile data and current job market requirements.',
        dataSource: 'LinkedIn API, Job Postings Analysis'
    },
    'Market Alignment': {
        explanation: 'Evaluates how well your career trajectory aligns with market trends and emerging opportunities in your industry.',
        dataSource: 'Industry Reports, ECOWAS Digital Skills Framework'
    },
    'Profile Strength': {
        explanation: 'Assesses the completeness and quality of your professional profile, including experience, certifications, and portfolio.',
        dataSource: 'Profile Analysis Engine'
    },
    'Opportunity Readiness': {
        explanation: 'Indicates your preparedness to seize career opportunities based on skills, network, and market positioning.',
        dataSource: 'Opportunity Matching Algorithm'
    },
    'Market-Solution Fit': {
        explanation: 'Measures how well your business solution addresses a real market need and pain point.',
        dataSource: 'Market Research Data, Customer Interviews'
    },
    'Execution Capability': {
        explanation: 'Evaluates your team\'s ability to deliver on the business plan and meet key milestones.',
        dataSource: 'Founder Assessment, Team Analysis'
    },
    'Regulatory Compliance': {
        explanation: 'Assesses your business\'s adherence to local and regional regulatory requirements.',
        dataSource: 'Compliance Database, Legal Framework Analysis'
    },
    'Growth Potential': {
        explanation: 'Projects the scalability and growth trajectory of your business based on market size and model.',
        dataSource: 'Financial Projections, Market Size Analysis'
    },
};

// Evidence links
const EVIDENCE_LINKS = [
    { title: 'ECOWAS Digital Skills Report 2024', url: 'https://www.ecowas.int/digital-skills-report', source: 'ECOWAS' },
    { title: 'West Africa Tech Talent Survey', url: '#', source: 'AfriLabs' },
    { title: 'Software Developer Salary Guide', url: '#', source: 'Jobberman' },
];

export function MobileReadinessScore({ mode, overallScore, breakdown }: MobileReadinessScoreProps) {
    const [selectedMetric, setSelectedMetric] = useState<BreakdownItem | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const isBusiness = mode === 'BUSINESS';
    const title = isBusiness ? 'Venture Readiness Score' : 'Career Readiness Score';

    // Calculate stroke-dashoffset for SVG circle (circumference = 2 * PI * 45 ≈ 283)
    const circumference = 283;
    const offset = circumference - (overallScore / 100) * circumference;

    const handleMetricClick = (item: BreakdownItem) => {
        const enrichedMetric = {
            ...item,
            explanation: METRIC_EXPLANATIONS[item.label]?.explanation || 'No explanation available.',
            dataSource: METRIC_EXPLANATIONS[item.label]?.dataSource || 'Internal Analysis',
            lastUpdated: 'Updated 2 days ago'
        };
        setSelectedMetric(enrichedMetric);
        setIsSheetOpen(true);
    };

    return (
        <>
            <div className="mobile-readiness-widget">
                <div className="mobile-readiness-header">
                    <h3 className="mobile-readiness-title">{title}</h3>
                    {isBusiness && <span className="mobile-readiness-overall">{overallScore}%</span>}
                </div>

                <div className="mobile-readiness-content">
                    {/* Circular score for Career Mode */}
                    {!isBusiness && (
                        <div className="mobile-score-circle-container">
                            <div className="mobile-score-circle">
                                <svg className="mobile-score-svg" viewBox="0 0 100 100">
                                    <circle className="mobile-score-track" cx="50" cy="50" r="45" />
                                    <circle
                                        className="mobile-score-value"
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={offset}
                                        style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                                    />
                                </svg>
                                <div className="mobile-score-content">
                                    <div className="mobile-score-number">{overallScore}%</div>
                                    <div className="mobile-score-label">COMPLETE</div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={`mobile-readiness-breakdown ${isBusiness ? 'business' : 'career'}`}>
                        {breakdown.map((item, index) => (
                            <button
                                key={index}
                                className="mobile-breakdown-item"
                                onClick={() => handleMetricClick(item)}
                            >
                                {!isBusiness ? (
                                    // Career mode: checkmark + label + value
                                    <>
                                        <Check size={16} className="mobile-breakdown-check" style={{ color: '#22c55e' }} />
                                        <span className="mobile-breakdown-label">{item.label}</span>
                                        <span className="mobile-breakdown-value">{item.value}%</span>
                                    </>
                                ) : (
                                    // Business mode: label + progress bar + value
                                    <>
                                        <div className="mobile-breakdown-row">
                                            <span className="mobile-breakdown-label">{item.label}</span>
                                            <span className="mobile-breakdown-value">{item.value}%</span>
                                        </div>
                                        <div className="mobile-breakdown-bar-track">
                                            <div
                                                className="mobile-breakdown-bar-fill"
                                                style={{
                                                    width: `${item.value}%`,
                                                    backgroundColor: item.color,
                                                    transition: 'width 1s ease-in-out'
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Sheet for Metric Details */}
            <MetricBottomSheet
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                title={selectedMetric?.label || 'Metric Details'}
                metric={selectedMetric ? {
                    ...selectedMetric,
                    explanation: selectedMetric.explanation,
                    dataSource: selectedMetric.dataSource,
                    lastUpdated: 'Updated 2 days ago'
                } : undefined}
                evidenceLinks={EVIDENCE_LINKS}
            />
        </>
    );
}

export default MobileReadinessScore;
