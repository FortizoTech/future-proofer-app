"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logoImage from "@/public/logo-transparent.png";
import "./hero.css";

export default function Hero() {
    return (
        <div className="hero-section">

            {/* LOGO SECTION */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="hero-logo-container"
            >
                <div className="hero-logo-wrapper">
                    <Image
                        src={logoImage}
                        alt="Future Proofer Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </motion.div>

            {/* HEADLINE */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hero-content"
            >
                <h1 className="hero-headline">
                    Navigate Tomorrow&rsquo;s Potential.<br className="hidden md:block" />
                    <span className="hero-headline-sub">Simplify Your Future.</span>
                </h1>

                <p className="hero-subtitle">
                    AI-Powered Foresight for Africa&rsquo;s Innovators
                </p>
            </motion.div>

            {/* ACTION BUTTONS (The Two Modes) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="hero-actions"
            >
                {/* CAREER MODE BUTTON */}
                <Link href="/onboarding?mode=career" className="hero-link-wrapper">
                    <button className="hero-btn-primary">
                        CAREER MODE
                    </button>
                </Link>

                {/* BUSINESS MODE BUTTON */}
                <Link href="/onboarding?mode=business" className="hero-link-wrapper">
                    <button className="hero-btn-secondary">
                        BUSINESS MODE
                    </button>
                </Link>
            </motion.div>

            {/* BOTTOM LINK */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="hero-footer"
            >
                <a
                    href="/mission"
                    className="hero-mission-link group"
                >
                    Learn More about our Mission
                    <ArrowRight className="hero-arrow-icon" />
                </a>
            </motion.div>

        </div>
    );
}