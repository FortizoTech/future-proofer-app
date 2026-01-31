"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="cta-section">

            {/* Background Gradients/Glows to match the image */}
            <div className="cta-glow-1" />
            <div className="cta-glow-2" />
            <div className="cta-glow-3" />

            <div className="cta-content">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="cta-title"
                >
                    Ready to Future-Proof Your Path?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="cta-subtitle"
                >
                    Whether you are scaling a venture or mastering a new trade, the journey starts with one choice.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="cta-actions"
                >
                    <Link href="/onboarding?mode=career" className="w-full sm:w-auto">
                        <button className="cta-btn-primary">
                            Launch Career Mode
                            <ArrowRight size={20} />
                        </button>
                    </Link>

                    <Link href="/onboarding?mode=business" className="w-full sm:w-auto">
                        <button className="cta-btn-secondary">
                            Launch Business Mode
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}