"use client";

import React from "react";
import Image from "next/image";

/**
 * A reusable world map background using the provided image.
 */
export default function MapBackground({ inline = false }: { inline?: boolean }) {
    return (
        <div className={`${inline ? 'absolute' : 'fixed'} inset-0 z-[-1] overflow-hidden ${!inline ? 'bg-[var(--bg-color,#ffffff)]' : ''} transition-colors duration-500 map-bg-container`}>
            {/* 1. The World Map Image */}
            <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
                style={{ opacity: 'var(--map-opacity, 0.2)' }}
            >
                <Image
                    src="/world-map.png"
                    alt="World Map Background"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* Noise Overlay (Texture for premium feel) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
        </div>
    );
}