"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-slate-200 relative z-10 w-full">
            <div className="max-w-6xl mx-auto px-6 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Left: Logo & Copyright */}
                    <div className="flex items-center gap-4">
                        {/* Logo Image */}
                        <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0">
                            <Image
                                src="/logo-transparent.png"
                                alt="Future Proofer Logo"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="flex flex-col">
                            <span className="text-slate-800 font-black tracking-tight text-sm md:text-base leading-none mb-0.5">
                                FUTURE PROOFER
                            </span>
                            <p className="text-slate-400 text-[10px] md:text-xs font-medium">
                                Forging the future of African innovation © 5.20212 GMT
                            </p>
                        </div>

                        {/* Links (Desktop) */}
                        <div className="hidden md:flex items-center gap-4 ml-6 border-l border-slate-200 pl-6">
                            <Link href="#" className="text-slate-500 hover:text-[#003DA5] text-xs font-semibold underline decoration-slate-300 underline-offset-2 transition-colors">
                                Privacy
                            </Link>
                            <Link href="#" className="text-slate-500 hover:text-[#003DA5] text-xs font-semibold underline decoration-slate-300 underline-offset-2 transition-colors">
                                Terms
                            </Link>
                            <Link href="#" className="text-slate-500 hover:text-[#003DA5] text-xs font-semibold underline decoration-slate-300 underline-offset-2 transition-colors">
                                Terms
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Links (Visible only on mobile) */}
                    <div className="flex md:hidden items-center gap-4">
                        <Link href="#" className="text-slate-500 text-xs font-semibold underline decoration-slate-300 underline-offset-2">Privacy</Link>
                        <Link href="#" className="text-slate-500 text-xs font-semibold underline decoration-slate-300 underline-offset-2">Terms</Link>
                    </div>

                    {/* Right: Support Button */}
                    <div>
                        <button className="flex items-center gap-2 px-5 py-2 bg-white border-2 border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white rounded-full font-bold text-sm transition-all shadow-sm hover:shadow-md group">
                            <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
                            <span>Support</span>
                        </button>
                    </div>

                </div>
            </div>
        </footer>
    );
}