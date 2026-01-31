"use client";

import React from "react";
import Image from "next/image";

/**
 * A reusable world map background using the provided image.
 */
export default function MapBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-white">
            {/* 1. The World Map Image */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
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