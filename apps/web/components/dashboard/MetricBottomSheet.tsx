"use client";

import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Clock, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MetricDetail {
    label: string;
    value: number;
    color: string;
    explanation?: string;
    dataSource?: string;
    lastUpdated?: string;
}

interface MetricBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    metric?: MetricDetail;
    evidenceLinks?: { title: string; url: string; source: string }[];
}

export function MetricBottomSheet({
    isOpen,
    onClose,
    title,
    metric,
    evidenceLinks = []
}: MetricBottomSheetProps) {
    const sheetRef = useRef<HTMLDivElement>(null);

    // Close on Escape
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
                        className="bottom-sheet-overlay"
                        onClick={onClose}
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        ref={sheetRef}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="bottom-sheet"
                        role="dialog"
                        aria-modal="true"
                        aria-label={title}
                    >
                        {/* Handle bar */}
                        <div className="bottom-sheet-handle">
                            <div className="bottom-sheet-handle-bar" />
                        </div>

                        {/* Header */}
                        <div className="bottom-sheet-header">
                            <h3 className="bottom-sheet-title">{title}</h3>
                            <button className="bottom-sheet-close" onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="bottom-sheet-content">
                            {metric && (
                                <div className="bottom-sheet-metric">
                                    <div className="bottom-sheet-metric-header">
                                        <span
                                            className="bottom-sheet-metric-dot"
                                            style={{ backgroundColor: metric.color }}
                                        />
                                        <span className="bottom-sheet-metric-label">{metric.label}</span>
                                        <span className="bottom-sheet-metric-value">{metric.value}%</span>
                                    </div>

                                    <div className="bottom-sheet-metric-bar">
                                        <div
                                            className="bottom-sheet-metric-fill"
                                            style={{
                                                width: `${metric.value}%`,
                                                backgroundColor: metric.color
                                            }}
                                        />
                                    </div>

                                    {metric.explanation && (
                                        <p className="bottom-sheet-explanation">{metric.explanation}</p>
                                    )}

                                    <div className="bottom-sheet-meta">
                                        {metric.dataSource && (
                                            <div className="bottom-sheet-meta-item">
                                                <FileText size={14} />
                                                <span>Source: {metric.dataSource}</span>
                                            </div>
                                        )}
                                        {metric.lastUpdated && (
                                            <div className="bottom-sheet-meta-item">
                                                <Clock size={14} />
                                                <span>{metric.lastUpdated}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Evidence Links */}
                            {evidenceLinks.length > 0 && (
                                <div className="bottom-sheet-evidence">
                                    <h4 className="bottom-sheet-evidence-title">Evidence & Resources</h4>
                                    <div className="bottom-sheet-evidence-list">
                                        {evidenceLinks.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bottom-sheet-evidence-item"
                                            >
                                                <div className="bottom-sheet-evidence-info">
                                                    <span className="bottom-sheet-evidence-name">{link.title}</span>
                                                    <span className="bottom-sheet-evidence-source">{link.source}</span>
                                                </div>
                                                <ExternalLink size={16} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* View Evidence CTA */}
                            <button className="bottom-sheet-cta">
                                View All Evidence
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default MetricBottomSheet;
