"use client";

import React from 'react';

interface NextAction {
    action: string;
    impact: 'high' | 'medium' | 'optional';
    reason: string;
}

interface ImmediateNextActionsProps {
    actions: NextAction[];
}

export function ImmediateNextActions({ actions }: ImmediateNextActionsProps) {
    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'high':
                return '#ef4444'; // red
            case 'medium':
                return '#f59e0b'; // orange
            case 'optional':
                return '#6b7280'; // gray
            default:
                return '#6b7280';
        }
    };

    return (
        <div className="next-actions-widget">
            <h3 className="next-actions-title">Immediate Next Actions</h3>
            <div className="next-actions-list">
                {actions.map((action, index) => (
                    <div key={index} className="next-action-item">
                        <div className="action-header">
                            <span
                                className="action-impact-dot"
                                style={{ backgroundColor: getImpactColor(action.impact) }}
                            />
                            <span className="action-text">{action.action}</span>
                        </div>
                        <p className="action-reason">{action.reason}</p>
                    </div>
                ))}
            </div>
            {actions.length === 0 && (
                <div className="next-actions-empty">
                    Analyzing your profile for recommended actions...
                </div>
            )}
        </div>
    );
}

export default ImmediateNextActions;
