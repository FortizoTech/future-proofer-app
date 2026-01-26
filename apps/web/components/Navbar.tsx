"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import logoImage from "@/assets/future-proofer-logo.png";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4"
        >
            {/* Glass Morphism Container */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-[24px] shadow-lg shadow-slate-900/5 px-6 py-3 flex items-center justify-between">

                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-32 h-10">
                        <Image
                            src={logoImage}
                            alt="Future Proofer Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Navigation Links & CTA */}
                <div className="flex items-center gap-6">
                    {/* Features Link */}
                    <Link
                        href="#features"
                        className="text-[#003DA5] font-semibold text-sm hover:text-[#002875] transition-colors hidden sm:block"
                    >
                        Features
                    </Link>

                    {/* Launch App Button */}
                    <Link href="/onboarding">
                        <button className="bg-[#003DA5] hover:bg-[#002875] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0">
                            LAUNCH APP
                        </button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
