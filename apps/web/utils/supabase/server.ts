import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, {
                                ...options,
                                // Force insecure on localhost to avoid "secure cookie on http" rejection
                                secure: process.env.NODE_ENV === 'production',
                                // Ensure the path is root so it applies to the dashboard
                                path: '/',
                                // Explicitly set SameSite to lax for navigation continuity
                                sameSite: 'lax',
                            })
                        );
                    } catch (error) {
                        // This 'try/catch' ignores the error if called from a Server Component
                        // which is expected behavior in Next.js
                    }
                },
            },
        }
    );
}
