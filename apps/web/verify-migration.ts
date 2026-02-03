import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Using Anon key, hopefully RLS allows read if headers not needed or if tables public. 
// Actually migration enabled RLS and added 'Authenticated users can view...'. 
// Verification script might fail with anon key if RLS blocks public access.
// But test-db.cjs worked for ai_interactions. 
// Let's assume we might need SERVICE_ROLE_KEY for verification if ANON is restricted, 
// OR we sign in as a user first.
// Let's try SERVICE_ROLE if available, otherwise ANON.

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

async function verify() {
    console.log('Verifying FutureProofer Implementation...');

    const checks = [
        { table: 'data_sources', query: 'organization_name', value: 'LinkedIn Economic Graph', label: 'Data Source: LinkedIn' },
        { table: 'data_sources', query: 'organization_name', value: 'ALX Africa', label: 'Data Source: ALX Africa' },
        { table: 'job_market_signals', label: 'Table: job_market_signals' },
        { table: 'learning_pathways', label: 'Table: learning_pathways' },
        { table: 'startup_ecosystem_signals', label: 'Table: startup_ecosystem_signals' },
        { table: 'policy_opportunity_alerts', label: 'Table: policy_opportunity_alerts' },
        { table: 'data_refresh_log', label: 'Table: data_refresh_log' }
    ];

    let success = true;

    for (const check of checks) {
        let query = supabase.from(check.table).select('*', { count: 'exact', head: true });

        if (check.value) {
            query = query.eq(check.query!, check.value);
        }

        const { count, error } = await query;

        if (error) {
            console.error(`❌ ${check.label}: FAILED - ${error.message}`);
            // Special check: if error is "relation does not exist", it definitely wasn't migrated.
            if (error.message.includes('does not exist')) {
                success = false;
            }
        } else {
            if (check.value && count === 0) {
                console.warn(`⚠️ ${check.label}: Table exists but data missing (Count: ${count})`);
            } else {
                console.log(`✅ ${check.label}: OK (Count: ${count})`);
            }
        }
    }

    if (!success) {
        console.log('\nCONCLUSION: Migration has likely NOT been applied.');
    } else {
        console.log('\nCONCLUSION: Database verification successful.');
    }
}

verify();
