"use client";

import React from 'react';
import { TrendingUp, CheckCircle } from 'lucide-react';

interface LocalMarketSignalProps {
    country: string;
    demandIndex: number;
    trend: string;
    drivers: string[];
    title?: string;
    demandLabel?: string;
    driversLabel?: string;
}

// Simple country flag emoji mapping for common African countries
const getCountryFlag = (country: string): string => {
    const flags: Record<string, string> = {
        'Gambia': '🇬🇲',
        'Ghana': '🇬🇭',
        'Nigeria': '🇳🇬',
        'Kenya': '🇰🇪',
        'South Africa': '🇿🇦',
        'Rwanda': '🇷🇼',
        'Ethiopia': '🇪🇹',
        'Tanzania': '🇹🇿',
        'Uganda': '🇺🇬',
        'Senegal': '🇸🇳',
        'Ivory Coast': '🇨🇮',
        'Cameroon': '🇨🇲',
        'Morocco': '🇲🇦',
        'Egypt': '🇪🇬',
        'Tunisia': '🇹🇳',
        'Algeria': '🇩🇿',
        'Zimbabwe': '🇿🇼',
        'Botswana': '🇧🇼',
        'Namibia': '🇳🇦',
        'Zambia': '🇿🇲',
        'Malawi': '🇲🇼',
        'Mozambique': '🇲🇿',
    };
    return flags[country] || '🌍';
};

export function LocalMarketSignal({
    country,
    demandIndex,
    trend,
    drivers,
    title = 'Local Market Signal',
    demandLabel = 'Role Demand Index',
    driversLabel = 'Key hiring drivers'
}: LocalMarketSignalProps) {
    const flag = getCountryFlag(country);

    return (
        <div className="market-signal-widget">
            <div className="market-signal-header">
                <span className="market-flag">{flag}</span>
                <span className="market-title">{title}: <strong>{country}</strong></span>
            </div>

            <div className="market-demand">
                <span className="demand-label">{demandLabel}:</span>
                <span className="demand-value">{demandIndex}%</span>
            </div>

            <div className="market-trend">
                <TrendingUp size={14} className="trend-icon" />
                <span className="trend-value">{trend}</span>
            </div>

            <div className="market-drivers">
                <div className="drivers-label">{driversLabel}:</div>
                <ul className="drivers-list">
                    {drivers.map((driver, index) => (
                        <li key={index} className="driver-item">
                            <CheckCircle size={12} className="driver-check" />
                            <span>{driver}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default LocalMarketSignal;
