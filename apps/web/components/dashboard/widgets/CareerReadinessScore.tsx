"use client";

import React from 'react';

interface CareerReadinessScoreProps {
    score: number;
    title?: string;
}

export function CareerReadinessScore({ score, title = 'Overall Readiness Score' }: CareerReadinessScoreProps) {
    // Calculate stroke-dashoffset for SVG circle (circumference = 2 * PI * 45 ≈ 283)
    const circumference = 283;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="score-widget">
            <div className="score-title">{title}</div>
            <div className="score-circle">
                <svg className="score-svg" viewBox="0 0 100 100">
                    <circle className="score-track" cx="50" cy="50" r="45" />
                    <circle
                        className="score-value-path"
                        cx="50"
                        cy="50"
                        r="45"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{
                            transition: 'stroke-dashoffset 1s ease-in-out',
                        }}
                    />
                </svg>
                <div className="score-content">
                    <div className="score-number">{score}%</div>
                    <div className="score-label">Complete</div>
                </div>
            </div>
        </div>
    );
}

export default CareerReadinessScore;
