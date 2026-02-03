"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { DashboardMetrics, DEFAULT_CAREER_METRICS } from '@/lib/types/dashboard-metrics';
import CareerReadinessScore from './widgets/CareerReadinessScore';
import CareerReadinessBreakdown, { BreakdownItem } from './widgets/CareerReadinessBreakdown';
import LocalMarketSignal from './widgets/LocalMarketSignal';
import SkillGapRadar, { GapItem } from './widgets/SkillGapRadar';
import ImmediateNextActions from './widgets/ImmediateNextActions';
import EvidenceResources from './widgets/EvidenceResources';

interface IntelligenceSnapshotProps {
    metrics: DashboardMetrics | null;
    isLoading?: boolean;
}

export function IntelligenceSnapshot({ metrics, isLoading = false }: IntelligenceSnapshotProps) {
    const data = metrics || DEFAULT_CAREER_METRICS;
    const isBusiness = data.mode === 'BUSINESS';

    // --- MAPPING LOGIC ---

    // 1. READINESS SCORE
    const readinessTitle = isBusiness ? 'Venture Readiness Score' : 'Overall Readiness Score';
    const readinessScore = isBusiness
        ? data.venture_readiness.overall_score
        : data.career_readiness.overall_score;

    // 2. BREAKDOWN ITEMS
    let breakdownItems: BreakdownItem[] = [];
    let breakdownTitle = 'Career Readiness';

    if (isBusiness) {
        breakdownTitle = 'Venture Readiness';
        const br = data.venture_readiness.breakdown;
        breakdownItems = [
            { label: 'Founder Capability', value: br.founder_capability, color: '#3b82f6' }, // Blue
            { label: 'Market Demand Fit', value: br.market_demand_fit, color: '#10b981' }, // Green
            { label: 'Business Fundamentals', value: br.business_fundamentals, color: '#f59e0b' }, // Amber
            { label: 'Execution Readiness', value: br.execution_readiness, color: '#8b5cf6' }, // Purple
        ];
    } else {
        breakdownTitle = 'Career Readiness';
        const br = data.career_readiness.breakdown;
        breakdownItems = [
            { label: 'Skills Match', value: br.skills_match, color: '#3b82f6' },
            { label: 'Market Alignment', value: br.market_alignment, color: '#10b981' },
            { label: 'Profile Strength', value: br.profile_strength, color: '#f59e0b' },
            { label: 'Opportunity Readiness', value: br.opportunity_readiness, color: '#6366f1' },
        ];
    }

    // 3. MARKET SIGNAL
    const marketSignalTitle = isBusiness ? 'Market Opportunity Signal' : 'Local Market Signal';
    const demandLabel = isBusiness ? 'Market Demand Index' : 'Role Demand Index';
    const driversLabel = isBusiness ? 'Customer drivers' : 'Key hiring drivers';

    const marketSignalData = isBusiness ? {
        country: data.market_opportunity_signal.country,
        demandIndex: data.market_opportunity_signal.market_demand_index,
        trend: data.market_opportunity_signal.trend,
        drivers: data.market_opportunity_signal.customer_drivers
    } : {
        country: data.local_market_signal.country,
        demandIndex: data.local_market_signal.role_demand_index,
        trend: data.local_market_signal.trend,
        drivers: data.local_market_signal.key_drivers
    };

    // 4. GAP RADAR
    const gapTitle = isBusiness ? 'Business Gap Radar' : 'Skill Gap Radar';
    const gapItems: GapItem[] = isBusiness
        ? data.business_gap_radar.map(g => ({ name: g.gap, status: g.status }))
        : data.skill_gap_radar.map(g => ({ name: g.skill, status: g.status }));

    return (
        <div className="glass-panel intelligence-panel flex flex-col h-full">
            <div className="flex-1 overflow-y-auto no-scrollbar pr-1 space-y-4">
                {/* Overall Readiness Score */}
                <CareerReadinessScore
                    score={readinessScore}
                    title={readinessTitle}
                />

                {/* Readiness Breakdown */}
                <CareerReadinessBreakdown
                    items={breakdownItems}
                    title={breakdownTitle}
                />

                {/* Local Market Signal */}
                <LocalMarketSignal
                    country={marketSignalData.country}
                    demandIndex={marketSignalData.demandIndex}
                    trend={marketSignalData.trend}
                    drivers={marketSignalData.drivers}
                    title={marketSignalTitle}
                    demandLabel={demandLabel}
                    driversLabel={driversLabel}
                />

                {/* Gap Radar */}
                <SkillGapRadar
                    items={gapItems}
                    title={gapTitle}
                />

                {/* Immediate Next Actions */}
                <ImmediateNextActions
                    actions={data.immediate_next_actions}
                />

                {/* Evidence & Resources */}
                <EvidenceResources
                    resources={data.evidence_and_resources}
                />
            </div>

            {/* WhatsApp Support Button at the bottom */}
            <div className="mt-auto pt-4">
                <button
                    className="support-btn-sticky"
                    onClick={() => window.open('https://wa.me/2202350530', '_blank')}
                >
                    <MessageCircle size={15} fill="currentColor" />
                    Support
                </button>
            </div>
        </div>
    );
}

export default IntelligenceSnapshot;

