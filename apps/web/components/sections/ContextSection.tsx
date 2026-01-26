"use client";
import React from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import "./context-section.css";

const ListItem = ({ type, text }: { type: 'bad' | 'good', text: string }) => (
    <li className="context-list-item">
        <div className={`context-icon-wrapper ${type === 'bad' ? 'context-icon-wrapper--bad' : 'context-icon-wrapper--good'}`}>
            {type === 'bad' ? (
                <X className="context-icon" />
            ) : (
                <Check className="context-icon" />
            )}
        </div>
        <span className="context-text">
            {text}
        </span>
    </li>
);

export default function ContextSection() {
    return (
        <section className="context-section">
            <div className="context-container">

                {/* Centered Header Section */}
                <div className="context-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="context-title"
                    >
                        The Challenge & The Edge
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="context-subtitle"
                    >
                        Bridging Today's Realities with Tomorrow Africa
                    </motion.p>
                </div>

                {/* Grid Container */}
                <div className="context-grid">

                    {/* LEFT CARD: THE CHALLENGE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="context-card"
                    >
                        {/* Image Thumbnail */}
                        <div className="context-thumbnail">
                            <img
                                src="/context/challenge.png"
                                alt="Challenge visualization"
                            />
                        </div>

                        <h3 className="context-card-title context-card-title--challenge">
                            The Challenge
                        </h3>

                        <ul className="context-list">
                            <ListItem type="bad" text="Outdated skills for a 2026 economy" />
                            <ListItem type="bad" text="High business failure rates due lack a lack a data" />
                            <ListItem type="bad" text="Limited access to the strategic mentorship" />
                        </ul>
                    </motion.div>

                    {/* RIGHT CARD: THE EDGE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="context-card"
                    >
                        {/* Tech Map Thumbnail */}
                        <div className="context-thumbnail context-thumbnail--edge">
                            <img
                                src="/context/148873-2196f3.svg"
                                alt="Network nodes visualization"
                            />
                        </div>

                        <h3 className="context-card-title context-card-title--edge">
                            The Future Proofer Edge
                        </h3>

                        <ul className="context-list">
                            <ListItem type="good" text="Real-time market-demand skill mapping" />
                            <ListItem type="good" text="AI Business simulations" />
                            <ListItem type="good" text="AI Business simulations with local data" />
                            <ListItem type="good" text="Direct pathway to the Thinkforge Network" />
                        </ul>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}