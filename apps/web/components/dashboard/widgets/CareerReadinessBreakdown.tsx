"use client";

import React from 'react';

export interface BreakdownItem {
    label: string;
    value: number;
    color: string;
}

interface CareerReadinessBreakdownProps {
    items: BreakdownItem[];
    title?: string;
}

export function CareerReadinessBreakdown({ items, title = 'Career Readiness' }: CareerReadinessBreakdownProps) {
    // Calculate overall average
    const overall = Math.round(
        items.reduce((sum, item) => sum + item.value, 0) / (items.length || 1)
    );

    return (
        <div className="readiness-breakdown-widget">
            <div className="breakdown-header">
                <h3 className="breakdown-title">{title}</h3>
                <span className="breakdown-overall">{overall}%</span>
            </div>
            <div className="breakdown-bars">
                {items.map((item) => (
                    <div key={item.label} className="breakdown-item">
                        <div className="breakdown-label-row">
                            <span className="breakdown-label">{item.label}</span>
                            <span className="breakdown-value">{item.value}%</span>
                        </div>
                        <div className="breakdown-bar-track">
                            <div
                                className="breakdown-bar-fill"
                                style={{
                                    width: `${item.value}%`,
                                    backgroundColor: item.color,
                                    transition: 'width 1s ease-in-out',
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CareerReadinessBreakdown;

