import { createClient } from '@/utils/supabase/client';
import { DetectedContext } from './context-detector';

// We need to instantiate a client. Since this runs on the server (API route), 
// we should ideally use a server client, but for now we'll use the utility which might be client-side.
// In the API route, we'll pass the client or instantiate one there.
// For this helper, let's assume we pass the client or use a standard one.
// NOTE: In a real Next.js server action/route, we should use createClient from @supabase/ssr or similar.
// Here we will accept the supabase client as an argument to be safe and flexible.

export interface RetrievedData {
    marketInsights: any[];
    salaryData: any[];
    skillsDemand: any[];
    businessEnvironment: any[];
    sources: any[];
}

export async function retrieveContextData(
    context: DetectedContext,
    supabaseClient: any // Pass the authenticated or service client
): Promise<RetrievedData> {
    const data: RetrievedData = {
        marketInsights: [],
        salaryData: [],
        skillsDemand: [],
        businessEnvironment: [],
        sources: []
    };

    // Get country ID
    let countryId: string | undefined;
    if (context.country) {
        const { data: countryData } = await supabaseClient
            .from('countries')
            .select('id')
            .ilike('name', context.country) // Case insensitive match
            .single();
        countryId = countryData?.id;
    }

    // Get sector ID
    let sectorId: string | undefined;
    if (context.sector) {
        const { data: sectorData } = await supabaseClient
            .from('sectors')
            .select('id')
            .ilike('name', context.sector)
            .single();
        sectorId = sectorData?.id;
    }

    // 1. Retrieve Market Insights
    if (countryId || sectorId) {
        let query = supabaseClient
            .from('market_insights')
            .select(`
        *,
        source:data_sources(organization_name, website_url),
        country:countries(name),
        sector:sectors(name),
        source_url,
        source_page_reference
      `)
            .eq('is_current', true)
            .order('year', { ascending: false })
            .limit(5);

        if (countryId) query = query.eq('country_id', countryId);
        if (sectorId) query = query.eq('sector_id', sectorId);

        const { data: insights } = await query;
        if (insights) data.marketInsights = insights;
    }

    // 2. Retrieve Salary Data (if Career Mode or relevant intent)
    if (context.role && countryId) {
        const { data: roleData } = await supabaseClient
            .from('roles')
            .select('id')
            .ilike('title', `%${context.role}%`) // Partial match for roles
            .limit(1)
            .single();

        if (roleData) {
            const { data: salaries } = await supabaseClient
                .from('salary_data')
                .select(`
          *,
          role:roles(title),
          country:countries(name, currency_code),
          source:data_sources(organization_name, website_url)
        `)
                .eq('role_id', roleData.id)
                .eq('country_id', countryId)
                .eq('is_current', true)
                .order('year', { ascending: false })
                .limit(3);

            if (salaries) data.salaryData = salaries;
        }
    }

    // 3. Retrieve Skills Demand
    if (countryId || sectorId) {
        let query = supabaseClient
            .from('skills_demand')
            .select(`
        *,
        country:countries(name),
        sector:sectors(name),
        source:data_sources(organization_name, website_url)
      `)
            .eq('is_current', true)
            .in('demand_level', ['HIGH', 'CRITICAL'])
            .order('job_postings_mentioning', { ascending: false })
            .limit(10);

        if (countryId) query = query.eq('country_id', countryId);
        if (sectorId) query = query.eq('sector_id', sectorId);

        const { data: skills } = await query;
        if (skills) data.skillsDemand = skills;
    }

    // 4. Retrieve Business Environment (if Business Mode or intent)
    if (context.intent === 'business_strategy' && countryId) {
        const { data: bizEnv } = await supabaseClient
            .from('business_environment')
            .select(`
        *,
        country:countries(name),
        sector:sectors(name),
        source:data_sources(organization_name, website_url)
      `)
            .eq('country_id', countryId)
            .eq('is_current', true)
            .order('year', { ascending: false })
            .limit(5);

        if (bizEnv) data.businessEnvironment = bizEnv;
    }

    // 5. Collect all unique sources
    const allSources = new Set();
    [...data.marketInsights, ...data.salaryData, ...data.skillsDemand, ...data.businessEnvironment]
        .forEach(item => {
            if (item.source) allSources.add(JSON.stringify(item.source));
        });

    data.sources = Array.from(allSources).map(s => JSON.parse(s as string));

    return data;
}
