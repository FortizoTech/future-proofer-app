export interface DetectedContext {
    country?: string;
    sector?: string;
    role?: string;
    skills?: string[];
    intent: 'career_planning' | 'skill_advice' | 'business_strategy' | 'market_research' | 'general';
    keywords: string[];
}

export function detectContext(userMessage: string, userProfile: any): DetectedContext {
    const message = userMessage.toLowerCase();

    // 1. Detect Country
    let country: string | undefined;

    // Explicit mentions
    if (message.includes('ghana') || message.includes('accra') || message.includes('kumasi')) {
        country = 'Ghana';
    } else if (message.includes('gambia') || message.includes('banjul') || message.includes('serekunda')) {
        country = 'Gambia';
    } else if (message.includes('nigeria') || message.includes('lagos') || message.includes('abuja')) {
        country = 'Nigeria';
    }

    // Fall back to user profile
    if (!country && userProfile?.location) {
        // Assuming userProfile.location might be a string or object, adjust based on actual profile structure
        // For now, let's assume it's a string or has a country property
        country = typeof userProfile.location === 'string' ? userProfile.location : userProfile.location?.country;
    }

    // 2. Detect Sector
    let sector: string | undefined;

    const sectorKeywords: Record<string, string[]> = {
        'Technology': ['software', 'developer', 'programming', 'tech', 'app', 'website', 'ai', 'data'],
        'Agriculture': ['farm', 'agriculture', 'crops', 'agribusiness', 'livestock'],
        'Fashion': ['fashion', 'clothing', 'boutique', 'apparel', 'design'],
        'Healthcare': ['health', 'medical', 'doctor', 'nurse', 'clinic', 'hospital'],
        'Education': ['teaching', 'teacher', 'school', 'education', 'training'],
        'Finance': ['banking', 'finance', 'accounting', 'fintech', 'investment']
    };

    for (const [sectorName, keywords] of Object.entries(sectorKeywords)) {
        if (keywords.some(kw => message.includes(kw))) {
            sector = sectorName;
            break;
        }
    }

    // 3. Detect Role (for Career Mode)
    let role: string | undefined;

    const roleKeywords: Record<string, string[]> = {
        'Software Developer': ['developer', 'programmer', 'coding', 'software engineer'],
        'Data Analyst': ['data analyst', 'data science', 'analytics'],
        'Accountant': ['accountant', 'accounting', 'bookkeeper'],
        'Teacher': ['teacher', 'educator', 'instructor']
    };

    for (const [roleName, keywords] of Object.entries(roleKeywords)) {
        if (keywords.some(kw => message.includes(kw))) {
            role = roleName;
            break;
        }
    }

    // 4. Detect Intent
    let intent: DetectedContext['intent'] = 'general';

    if (message.includes('start') && message.includes('business')) {
        intent = 'business_strategy';
    } else if (message.includes('learn') || message.includes('skill')) {
        intent = 'skill_advice';
    } else if (message.includes('career') || message.includes('job')) {
        intent = 'career_planning';
    } else if (message.includes('market') || message.includes('trends')) {
        intent = 'market_research';
    }

    // 5. Extract skills from user profile
    const skills: string[] = userProfile?.skills || [];

    return {
        country,
        sector,
        role,
        skills,
        intent,
        keywords: message.split(' ').filter(word => word.length > 3)
    };
}
