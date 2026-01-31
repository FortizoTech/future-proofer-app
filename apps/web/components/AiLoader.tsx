"use client";

/**
 * ============================================
 * AI LOADER COMPONENT - FUTURISTIC DESIGN
 * ============================================
 * 
 * A sophisticated loading animation featuring:
 * - Squircle container with blue border (iOS-style superellipse)
 * - Tech-styled circular progress indicator
 * - Decorative circuit-like elements with rotation
 * - Animated progress bars for each task
 * 
 * The design matches the Future Proofer brand with
 * a futuristic, data-driven aesthetic.
 * 
 * @file apps/web/components/AiLoader.tsx
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ============================================
// TYPE DEFINITIONS
// ============================================

interface TaskProgress {
    label: string;
    progress: number;
}

interface AiLoaderProps {
    onComplete?: () => void;
}

// ============================================
// AI LOADER COMPONENT
// ============================================

export default function AiLoader({ onComplete }: AiLoaderProps) {
    const [progress, setProgress] = useState(0);
    const [rotation, setRotation] = useState(0);

    // Task-specific progress
    const [tasks, setTasks] = useState<TaskProgress[]>([
        { label: "Analyzing Skill Gaps...", progress: 0 },
        { label: "Mapping Opportunities", progress: 0 },
        { label: "Crafting Personalized Roadmap...", progress: 0 },
    ]);

    useEffect(() => {
        // Main progress timer
        const timer = setInterval(() => {
            setProgress((old) => {
                if (old >= 100) {
                    clearInterval(timer);
                    // Trigger onComplete callback when done
                    if (onComplete) {
                        setTimeout(onComplete, 500);
                    }
                    return 100;
                }
                return Math.min(old + Math.random() * 2.5, 100);
            });
        }, 80);

        // Rotation for decorative elements
        const rotationTimer = setInterval(() => {
            setRotation((old) => (old + 0.5) % 360);
        }, 20);

        // Task-specific progress (staggered)
        const taskTimer = setInterval(() => {
            setTasks((prev) =>
                prev.map((task, idx) => ({
                    ...task,
                    progress: Math.min(
                        task.progress + Math.random() * 3 * (1 - idx * 0.2),
                        100
                    ),
                }))
            );
        }, 100);

        return () => {
            clearInterval(timer);
            clearInterval(rotationTimer);
            clearInterval(taskTimer);
        };
    }, [onComplete]);

    // Circle progress calculations
    const size = 180;
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ai-loader"
        >
            {/* Squircle Container - iOS-style superellipse */}
            <div className="ai-loader-squircle">
                {/* Tech Circle Container */}
                <div className="ai-loader-tech-container">

                    {/* Outer Decorative Ring - Rotating */}
                    <svg
                        className="ai-loader-outer-ring"
                        viewBox="0 0 220 220"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    >
                        {/* Dashed decorative circle */}
                        <circle
                            cx="110"
                            cy="110"
                            r="100"
                            fill="none"
                            stroke="rgba(59, 130, 246, 0.15)"
                            strokeWidth="1"
                            strokeDasharray="8 4"
                        />
                        {/* Small decorative dots at 8 positions */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                            <circle
                                key={angle}
                                cx={110 + 100 * Math.cos((angle * Math.PI) / 180)}
                                cy={110 + 100 * Math.sin((angle * Math.PI) / 180)}
                                r="3"
                                fill="rgba(59, 130, 246, 0.3)"
                            />
                        ))}
                    </svg>

                    {/* Middle Decorative Ring - Counter-rotating */}
                    <svg
                        className="ai-loader-middle-ring"
                        viewBox="0 0 200 200"
                        style={{ transform: `rotate(${-rotation * 0.5}deg)` }}
                    >
                        {/* Circuit-like decorations */}
                        <circle
                            cx="100"
                            cy="100"
                            r="85"
                            fill="none"
                            stroke="rgba(59, 130, 246, 0.1)"
                            strokeWidth="1"
                        />
                        {/* Tech lines radiating outward */}
                        {[0, 60, 120, 180, 240, 300].map((angle) => (
                            <g key={angle}>
                                <line
                                    x1={100 + 70 * Math.cos((angle * Math.PI) / 180)}
                                    y1={100 + 70 * Math.sin((angle * Math.PI) / 180)}
                                    x2={100 + 90 * Math.cos((angle * Math.PI) / 180)}
                                    y2={100 + 90 * Math.sin((angle * Math.PI) / 180)}
                                    stroke="rgba(59, 130, 246, 0.25)"
                                    strokeWidth="2"
                                />
                                <circle
                                    cx={100 + 90 * Math.cos((angle * Math.PI) / 180)}
                                    cy={100 + 90 * Math.sin((angle * Math.PI) / 180)}
                                    r="2"
                                    fill="rgba(59, 130, 246, 0.4)"
                                />
                            </g>
                        ))}
                    </svg>

                    {/* Main Progress Circle */}
                    <svg className="ai-loader-main-circle" viewBox="0 0 180 180">
                        {/* Background circle */}
                        <circle
                            cx="90"
                            cy="90"
                            r={radius}
                            fill="none"
                            stroke="rgba(59, 130, 246, 0.12)"
                            strokeWidth={strokeWidth}
                        />
                        {/* Gradient definition for progress */}
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60A5FA" />
                                <stop offset="100%" stopColor="#2563EB" />
                            </linearGradient>
                        </defs>
                        {/* Animated progress circle */}
                        <circle
                            cx="90"
                            cy="90"
                            r={radius}
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            transform="rotate(-90 90 90)"
                            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
                        />
                        {/* Inner decorative ring */}
                        <circle
                            cx="90"
                            cy="90"
                            r={radius - 15}
                            fill="none"
                            stroke="rgba(59, 130, 246, 0.08)"
                            strokeWidth="2"
                        />
                    </svg>

                    {/* Percentage Display */}
                    <div className="ai-loader-percentage">
                        <span className="ai-loader-percent-value">{Math.floor(progress)}%</span>
                    </div>

                    {/* Animated Glow Effect */}
                    <div className="ai-loader-glow" />
                </div>

                {/* Title */}
                <h2 className="ai-loader-title">Synthesizing Your Future</h2>

                {/* Subtitle */}
                <p className="ai-loader-subtitle">Analyzing Market Trends in ECOWAS</p>

                {/* Task Progress Bars */}
                <div className="ai-loader-tasks">
                    {tasks.map((task, idx) => (
                        <div key={idx} className="ai-loader-task">
                            <span className="ai-loader-task-label">{task.label}</span>
                            <div className="ai-loader-task-bar">
                                <motion.div
                                    className="ai-loader-task-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${task.progress}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Step Indicator Dots */}
                <div className="ai-loader-dots">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className={`ai-loader-dot ${i === 0 ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}