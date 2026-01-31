"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Tab {
    label: string;
    href: string;
}

interface TopNavbarProps {
    tabs: Tab[];
}

const TopNavbar = ({ tabs }: TopNavbarProps) => {
    const pathname = usePathname();

    return (
        <nav className="h-16 bg-white border-b border-slate-200 flex items-center px-10 sticky top-0 z-40">
            <div className="flex gap-8 h-full">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`flex items-center h-full text-sm font-semibold no-underline border-b-2 transition-all ${isActive ? 'text-blue-600 border-b-blue-600' : 'text-slate-500 border-transparent hover:text-blue-600'}`}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default TopNavbar;
