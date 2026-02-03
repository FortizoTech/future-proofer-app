const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
    const { count, error } = await supabase
        .from('ai_interactions')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('Error checking ai_interactions:', error);
    } else {
        console.log('ai_interactions count:', count);
    }
}

test();
