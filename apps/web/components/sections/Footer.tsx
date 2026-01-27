"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const WhatsAppIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
);

export default function Footer() {
    return (
        <footer className="footer-root">
            <div className="footer-container">
                <div className="footer-content">

                    {/* Left: Logo & Copyright */}
                    <div className="footer-brand">
                        {/* Logo Image */}
                        <div className="footer-logo-img">
                            <Image
                                src="/logo/logo-white.png"
                                alt="Future Proofer Logo"
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </div>

                        <div className="footer-info">
                            <p className="footer-copyright">
                                Forging the future of African innovation © 2026
                            </p>
                        </div>
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="footer-links">
                        <Link href="/privacy" className="footer-link">
                            Privacy
                        </Link>
                        <Link href="/terms" className="footer-link">
                            Terms
                        </Link>
                        <Link href="/partners" className="footer-link">
                            Partners
                        </Link>
                    </div>

                    {/* Right: Support Button */}
                    <div className="footer-support-wrapper">
                        <button className="footer-support-btn">
                            <WhatsAppIcon />
                            <span>Support</span>
                        </button>
                    </div>

                </div>
            </div>
        </footer>
    );
}