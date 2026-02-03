"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionMenuItem {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: 'default' | 'danger';
}

interface ActionMenuProps {
    items: ActionMenuItem[];
    trigger?: React.ReactNode;
    position?: 'bottom-left' | 'bottom-right';
}

export function ActionMenu({ items, trigger, position = 'bottom-right' }: ActionMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node) &&
                triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
                triggerRef.current?.focus();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleItemClick = (item: ActionMenuItem) => {
        item.onClick();
        setIsOpen(false);
    };

    return (
        <div className="action-menu-container">
            <button
                ref={triggerRef}
                className="action-menu-trigger"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="menu"
            >
                {trigger || <MoreHorizontal size={20} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className={`action-menu-popover ${position}`}
                        role="menu"
                    >
                        {items.map((item, index) => (
                            <button
                                key={index}
                                className={`action-menu-item ${item.variant === 'danger' ? 'danger' : ''}`}
                                onClick={() => handleItemClick(item)}
                                role="menuitem"
                            >
                                {item.icon && <span className="action-menu-item-icon">{item.icon}</span>}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ActionMenu;
