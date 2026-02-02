import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    try {
        const {
            data: { user },
            error: authError
        } = await supabase.auth.getUser();

        if (authError || !user) {
            console.error('[DashboardLayout] Auth Error:', authError?.message || 'No user session');
            redirect('/login?error=Auth+session+missing');
        }

        console.log('[DashboardLayout] Auth success for:', user.email);

        // Profile fetch - don't let this fail the whole layout
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profileError) {
            console.warn('DashboardLayout profile fetch error:', profileError.message);
        }

        // Enforce onboarding completion
        if (!profile || !profile.onboarding_completed) {
            console.log('[DashboardLayout] Profile incomplete or missing, redirecting to onboarding');
            redirect('/onboarding');
        }

        return (
            <div className="min-h-screen bg-slate-50 font-sans">
                {children}
            </div>
        );
    } catch (err: any) {
        console.error('DashboardLayout runtime error:', err);
        redirect('/login?error=Internal+server+error');
    }
}
