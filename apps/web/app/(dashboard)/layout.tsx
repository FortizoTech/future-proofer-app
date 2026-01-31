import { createClient } from '@/utils/supabase/server';
import careerSidebar from '@/components/CareerSidebar';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// Simple manual check for Next.js redirect errors if the helper is missing
const isRedirectError = (err: any) => err?.digest?.startsWith('NEXT_REDIRECT');

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const cookieStore = await cookies();
    console.log('DashboardLayout Request Cookies:', cookieStore.getAll().map(c => c.name));

    try {
        const {
            data: { user },
            error: authError
        } = await supabase.auth.getUser();

        if (authError || !user) {
            console.error('DashboardLayout Auth Error:', authError?.message || 'No user');
            redirect(`/login?error=${encodeURIComponent(authError?.message || 'Auth session missing!')}`);
        }

        // Profile fetch - don't let this fail the whole layout
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profileError) {
            console.warn('DashboardLayout profile fetch error:', profileError.message);
        }

        return (
            <div className="min-h-screen bg-slate-50 font-sans">
                {children}
            </div>
        );
    } catch (err: any) {
        if (isRedirectError(err)) throw err;
        console.error('DashboardLayout runtime error:', err);
        redirect(`/login?error=${encodeURIComponent(err.message || 'Internal server error in dashboard')}`);
    }
}
