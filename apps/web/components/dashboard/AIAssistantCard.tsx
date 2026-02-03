"use client";

import React from 'react';
import { Sparkles, Bell, MoreHorizontal, Zap, CheckCircle, AlertTriangle, Square } from 'lucide-react';

interface AIAssistantCardProps {
    mode: 'CAREER' | 'BUSINESS';
    content: string;
    suggestions?: string[];
    onSuggestionClick?: (suggestion: string) => void;
}

export function AIAssistantCard({ mode, content, suggestions = [], onSuggestionClick }: AIAssistantCardProps) {
    const isBusiness = mode === 'BUSINESS';

    const title = isBusiness ? 'AI BusinessDesk' : 'AI CareerMate';
    const subtitle = isBusiness ? 'AI Foresight Guide' : 'AI Career Guide';

    // Parse content sections for structured display
    const renderContent = () => {
        if (!content) return null;

        // Split content into sections
        const lines = content.split('\n').filter(line => line.trim());

        return (
            <div className="ai-card-content">
                {lines.map((line, index) => {
                    // Check for section headers
                    if (line.includes('STRONGEST SKILL CLUSTER:') || line.includes('Strongest Skill Cluster:')) {
                        return (
                            <div key={index} className="ai-section">
                                <div className="ai-section-header">
                                    <Zap size={14} className="ai-section-icon text-amber-500" />
                                    <span className="ai-section-title">Strongest Skill Cluster:</span>
                                </div>
                            </div>
                        );
                    }

                    if (line.includes('PRIMARY SKILL GAPS:') || line.includes('Primary Skill Gaps:')) {
                        return (
                            <div key={index} className="ai-section">
                                <div className="ai-section-header">
                                    <AlertTriangle size={14} className="ai-section-icon text-orange-500" />
                                    <span className="ai-section-title">Primary Skill Gaps:</span>
                                    <span className="ai-section-subtitle">Backend frameworks</span>
                                </div>
                            </div>
                        );
                    }

                    if (line.includes('FASTEST OPPORTUNITY SIGNAL:') || line.includes('Fastest Opportunity Signal:')) {
                        return (
                            <div key={index} className="ai-section">
                                <div className="ai-section-header">
                                    <Zap size={14} className="ai-section-icon text-blue-500" />
                                    <span className="ai-section-title">Fastest Opportunity Signal:</span>
                                </div>
                            </div>
                        );
                    }

                    if (line.includes('MARKET REALITY CHECK:') || line.includes('Market-Solution Fit:')) {
                        return (
                            <div key={index} className="ai-section">
                                <div className="ai-section-header business">
                                    <Square size={10} className="ai-section-bullet text-blue-500" fill="#3b82f6" />
                                    <span className="ai-section-title business">Market-Solution Fit:</span>
                                </div>
                            </div>
                        );
                    }

                    if (line.includes('CORE OPPORTUNITY SIGNAL:') || line.includes('Key Execution Gaps:')) {
                        return (
                            <div key={index} className="ai-section">
                                <div className="ai-section-header business">
                                    <Square size={10} className="ai-section-bullet text-amber-500" fill="#f59e0b" />
                                    <span className="ai-section-title business">Key Execution Gaps:</span>
                                </div>
                            </div>
                        );
                    }

                    // Check for bullet points
                    if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('·')) {
                        const text = line.replace(/^[\s•\-·]+/, '').trim();
                        const isGap = text.toLowerCase().includes('(gap)');
                        const isPartial = text.toLowerCase().includes('(partial)');

                        return (
                            <div key={index} className={`ai-bullet-item ${isGap ? 'gap' : ''} ${isPartial ? 'partial' : ''}`}>
                                {isGap && <AlertTriangle size={12} className="text-red-500" />}
                                {isPartial && <CheckCircle size={12} className="text-amber-500" />}
                                {!isGap && !isPartial && <span className="ai-bullet">•</span>}
                                <span>{text}</span>
                            </div>
                        );
                    }

                    // Regular paragraph
                    if (line.trim()) {
                        return <p key={index} className="ai-paragraph">{line}</p>;
                    }

                    return null;
                })}
            </div>
        );
    };

    return (
        <div className="ai-assistant-card">
            <div className="ai-card-header">
                <div className="ai-card-title-row">
                    <div className="ai-card-icon">
                        <Sparkles size={18} fill="white" />
                    </div>
                    <div className="ai-card-titles">
                        <h3 className="ai-card-title">{title}</h3>
                        <p className="ai-card-subtitle">{subtitle}</p>
                    </div>
                </div>
                <div className="ai-card-actions">
                    <button className="ai-card-action-btn">
                        <Bell size={18} />
                    </button>
                    <button className="ai-card-action-btn">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>

            <div className="ai-card-body">
                {renderContent()}
            </div>

            {suggestions.length > 0 && (
                <div className="ai-card-suggestions">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            className="ai-suggestion-link"
                            onClick={() => onSuggestionClick?.(suggestion)}
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AIAssistantCard;
