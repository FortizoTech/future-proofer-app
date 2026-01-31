"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Compass,
    Briefcase,
    TrendingUp,
    Library,
    Settings
} from "lucide-react";

interface CareerSidebarProps {
    userProfile: any;
}

/**
 * --- CareerSidebar Component ---
 * A shared navigation panel used across all career-mode pages.
 * Supports active item highlighting and user profile display.
 */
const CareerSidebar = ({ userProfile }: CareerSidebarProps) => {
    const pathname = usePathname();

    const getActiveItem = () => {
        if (pathname === '/dashboard') return 'overview';
        if (pathname.startsWith('/career-guide')) return 'career-guide';
        if (pathname.startsWith('/thinkforge')) return 'thinkforge';
        if (pathname.startsWith('/network')) return 'network';
        if (pathname.startsWith('/settings')) return 'settings';
        return '';
    };

    const activeItem = getActiveItem();
    return (
        <aside className="bg-white border-r border-slate-200 py-6 flex flex-col fixed w-[200px] h-screen z-50">
            {/* Logo Section */}
            <div className="flex items-center gap-[10px] px-6 mb-10">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-white w-4 h-4" />
                </div>
                <span className="font-extrabold text-[12px] leading-[1.1] text-slate-900 tracking-tight uppercase">FUTURE<br />PROOFER</span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col gap-1">
                <Link
                    href="/dashboard"
                    className={`flex items-center gap-3 px-6 py-[10px] no-underline text-sm font-medium transition-all border-r-[3px] ${activeItem === 'overview' ? 'text-blue-600 bg-blue-50 border-r-blue-600' : 'text-slate-500 border-transparent hover:text-blue-600 hover:bg-slate-50'}`}
                >
                    <LayoutDashboard size={18} />
                    <span>Overview</span>
                </Link>
                <Link
                    href="/career-guide"
                    className={`flex items-center gap-3 px-6 py-[10px] no-underline text-sm font-medium transition-all border-r-[3px] ${activeItem === 'career-guide' ? 'text-blue-600 bg-blue-50 border-r-blue-600' : 'text-slate-500 border-transparent hover:text-blue-600 hover:bg-slate-50'}`}
                >
                    <Compass size={18} />
                    <span>CareerGuide AI</span>
                </Link>
                <Link
                    href="/thinkforge"
                    className={`flex items-center gap-3 px-6 py-[10px] no-underline text-sm font-medium transition-all border-r-[3px] ${activeItem === 'thinkforge' ? 'text-blue-600 bg-blue-50 border-r-blue-600' : 'text-slate-500 border-transparent hover:text-blue-600 hover:bg-slate-50'}`}
                >
                    <Library size={18} />
                    <span>Thinkforge</span>
                </Link>
                <Link
                    href="/network"
                    className={`flex items-center gap-3 px-6 py-[10px] no-underline text-sm font-medium transition-all border-r-[3px] ${activeItem === 'network' ? 'text-blue-600 bg-blue-50 border-r-blue-600' : 'text-slate-500 border-transparent hover:text-blue-600 hover:bg-slate-50'}`}
                >
                    <Briefcase size={18} />
                    <span>Network</span>
                </Link>
                <Link
                    href="/settings"
                    className={`flex items-center gap-3 px-6 py-[10px] no-underline text-sm font-medium transition-all border-r-[3px] ${activeItem === 'settings' ? 'text-blue-600 bg-blue-50 border-r-blue-600' : 'text-slate-500 border-transparent hover:text-blue-600 hover:bg-slate-50'}`}
                >
                    <Settings size={18} />
                    <span>Settings</span>
                </Link>
            </nav>

            {/* User Profile Section (Bottom) */}
            <div className="px-6 py-5 border-t border-slate-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-sm overflow-hidden text-slate-700">
                    {userProfile?.full_name?.[0] || 'A'}
                </div>
                <div className="flex flex-col">
                    <span className="text-[13px] font-semibold text-slate-900">{userProfile?.full_name || 'Amara Okoro'}</span>
                    <span className="text-[11px] text-slate-500">Career Mode Active</span>
                </div>
            </div>
        </aside>
    );
};

export default CareerSidebar;
