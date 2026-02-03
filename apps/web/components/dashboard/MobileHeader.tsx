"use client";

import React from 'react';
import Image from 'next/image';
import { Bell, Menu } from 'lucide-react';

interface MobileHeaderProps {
    isDarkMode: boolean;
    onMenuClick: () => void;
    notificationCount?: number;
}

export function MobileHeader({ isDarkMode, onMenuClick, notificationCount = 0 }: MobileHeaderProps) {
    return (
        <header className="mobile-header">
            <div className="mobile-header-logo">
                <Image
                    src={isDarkMode ? "/logo/logo_white_transparent background.png" : "/logo/logo-transparent.png"}
                    alt="Future Proofer"
                    width={140}
                    height={38}
                    className="mobile-logo-img"
                    priority
                />
            </div>
            <div className="mobile-header-actions">
                <button className="mobile-header-btn" aria-label="Notifications">
                    <Bell size={22} />
                    {notificationCount > 0 && (
                        <span className="mobile-notification-badge">{notificationCount}</span>
                    )}
                </button>
                <button
                    className="mobile-header-btn"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                    aria-expanded="false"
                >
                    <Menu size={22} />
                </button>
            </div>
        </header>
    );
}

export default MobileHeader;
