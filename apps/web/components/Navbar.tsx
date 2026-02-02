"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import "../assets/css/navbar.css";

const RealTimeClock = () => {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // Format: Monday, January 26, 2026 at 11:53:15 AM GMT
            const options: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short'
            };
            setTime(now.toLocaleDateString('en-US', options));
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="navbar-clock">
            {time}
        </div>
    );
};

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="navbar-root"
        >
            {/* Real Time Clock Display */}
            <RealTimeClock />

            {/* Glass Morphism Panel */}
            <div className="navbar-glass-panel">

                {/* Logo Section */}
                <Link href="/" className="navbar-logo-container group">
                    <div className="navbar-logo-wrapper">
                        <Image
                            src="/logo/logo-transparent.png"
                            alt="Future Proofer Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Navigation Links */}
                <div className="navbar-links">
                    <Link
                        href="#features"
                        className="navbar-link-item group"
                    >
                        Features
                        <span className="navbar-link-underline" />
                    </Link>
                    <Link
                        href="#pricing"
                        className="navbar-link-item group"
                    >
                        Pricing
                        <span className="navbar-link-underline" />
                    </Link>
                </div>

                {/* Primary CTA */}
                <div className="navbar-cta-container">
                    <Link href="/login" className="navbar-link-item group" style={{ marginRight: '1rem' }}>
                        Login
                        <span className="navbar-link-underline" />
                    </Link>
                    <Link href="/login">
                        <button className="navbar-launch-btn">
                            Launch App
                        </button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}