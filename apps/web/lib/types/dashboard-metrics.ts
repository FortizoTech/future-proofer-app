// Dashboard Metrics TypeScript Interfaces
// These types define the unified response contract from the AI CareerMate and BusinessGuide

// Common Interfaces
export interface NextAction {
    action: string;
    impact: 'high' | 'medium' | 'optional';
    reason: string;
}

export interface EvidenceResource {
    title: string;
    source: string;
    region: string;
    url: string;
}

// -----------------------------------------------------
// CAREER MODE TYPES
// -----------------------------------------------------

export interface CareerReadiness {
    overall_score: number;
    breakdown: {
        skills_match: number;
        market_alignment: number;
        profile_strength: number;
        opportunity_readiness: number;
    };
}

export interface LocalMarketSignal {
    country: string;
    role_demand_index: number;
    trend: string;
    key_drivers: string[];
}

export interface SkillGap {
    skill: string;
    status: 'gap' | 'partial';
}

export interface CareerDashboardMetrics {
    mode: 'CAREER';
    career_readiness: CareerReadiness;
    local_market_signal: LocalMarketSignal;
    skill_gap_radar: SkillGap[];
    immediate_next_actions: NextAction[];
    evidence_and_resources: EvidenceResource[];
}

// -----------------------------------------------------
// BUSINESS MODE TYPES
// -----------------------------------------------------

export interface VentureReadiness {
    overall_score: number;
    breakdown: {
        founder_capability: number;
        market_demand_fit: number;
        business_fundamentals: number;
        execution_readiness: number;
    };
}

export interface BusinessMarketSignal {
    country: string;
    market_demand_index: number;
    trend: string;
    customer_drivers: string[];
}

export interface BusinessGap {
    gap: string;
    status: 'gap' | 'partial';
}

export interface BusinessDashboardMetrics {
    mode: 'BUSINESS';
    venture_readiness: VentureReadiness;
    market_opportunity_signal: BusinessMarketSignal;
    business_gap_radar: BusinessGap[];
    immediate_next_actions: NextAction[];
    evidence_and_resources: EvidenceResource[];
}

// -----------------------------------------------------
// UNIFIED TYPES
// -----------------------------------------------------

export type DashboardMetrics = CareerDashboardMetrics | BusinessDashboardMetrics;

export interface ChatInsight {
    understanding_confirmation: string;
    strongest_skill_cluster?: string[]; // Career specific
    primary_skill_gaps?: string[]; // Career specific
    fastest_opportunity_signal?: string; // Career specific

    // Business specific
    market_reality_check?: string;
    core_opportunity_signal?: string;
    top_business_risks?: string[];

    next_step_primer: string;
}

export interface AIResponse {
    chat_insight: ChatInsight;
    dashboard_metrics: DashboardMetrics;
    next_questions?: {
        items: { text: string }[];
    };
}

// -----------------------------------------------------
// DEFAULTS
// -----------------------------------------------------

export const DEFAULT_CAREER_METRICS: CareerDashboardMetrics = {
    mode: 'CAREER',
    career_readiness: {
        overall_score: 0,
        breakdown: {
            skills_match: 0,
            market_alignment: 0,
            profile_strength: 0,
            opportunity_readiness: 0,
        },
    },
    local_market_signal: {
        country: 'Loading...',
        role_demand_index: 0,
        trend: '--',
        key_drivers: [],
    },
    skill_gap_radar: [],
    immediate_next_actions: [],
    evidence_and_resources: [],
};

export const DEFAULT_BUSINESS_METRICS: BusinessDashboardMetrics = {
    mode: 'BUSINESS',
    venture_readiness: {
        overall_score: 0,
        breakdown: {
            founder_capability: 0,
            market_demand_fit: 0,
            business_fundamentals: 0,
            execution_readiness: 0,
        },
    },
    market_opportunity_signal: {
        country: 'Loading...',
        market_demand_index: 0,
        trend: '--',
        customer_drivers: [],
    },
    business_gap_radar: [],
    immediate_next_actions: [],
    evidence_and_resources: [],
};

