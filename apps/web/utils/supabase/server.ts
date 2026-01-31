import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function createClient(response?: NextResponse) {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        const cookieOptions = { ...options };
                        // Some environments/browsers have issues with partitioned cookies on localhost
                        if (cookieOptions.partitioned) delete cookieOptions.partitioned;

                        // Force permissive settings for local development
                        cookieOptions.secure = false;
                        cookieOptions.sameSite = 'lax';

                        console.log(`[Supabase Server] Setting cookie: ${name}`);

                        cookieStore.set({ name, value, ...cookieOptions });
                        if (response) {
                            response.cookies.set({ name, value, ...cookieOptions });
                        }
                    } catch (error) {
                        // The `set` method was called from a Server Component.
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        const cookieOptions = { ...options };
                        if (cookieOptions.partitioned) delete cookieOptions.partitioned;

                        cookieOptions.secure = false;
                        cookieOptions.sameSite = 'lax';

                        console.log(`[Supabase Server] Removing cookie: ${name}`);

                        cookieStore.set({ name, value: '', ...cookieOptions });
                        if (response) {
                            response.cookies.set({ name, value: '', ...cookieOptions });
                        }
                    } catch (error) {
                        // The `delete` method was called from a Server Component.
                    }
                },
            },
        }
    );
}
