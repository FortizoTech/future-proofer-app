import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    // 1. Create an initial unmodified response
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    // Update internal request cookies so server components see the new state
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )

                    // CRITICAL FIX: Do not recreate 'response = NextResponse.next()' here repeatedly.
                    // Instead, re-create it ONCE if you need to pass updated request cookies,
                    // OR just act on the 'response' object we defined at the top.
                    // For safest behavior with Supabase + Next 15:
                    response = NextResponse.next({
                        request,
                    })

                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // 2. Refresh the token
    // This will trigger 'setAll' if the token needs refreshing or wasn't properly synced
    const { data: { user } } = await supabase.auth.getUser()

    // 3. Protected Routes Logic
    // Customize this list to match your actual route structure
    const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/onboarding')

    if (isProtectedRoute && !user) {
        const next = request.nextUrl.pathname + request.nextUrl.search;
        return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(next)}`, request.url))
    }

    // If user is logged in, redirect them away from Auth pages
    if (request.nextUrl.pathname === '/login' && user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('id', user.id)
            .single();

        if (!profile?.onboarding_completed) {
            return NextResponse.redirect(new URL('/onboarding', request.url))
        }

        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Special case for landing page: if logged in and onboarding done, go to dashboard.
    // IF NOT DONE: Allow them to stay on the landing page (this allows "exiting" the onboarding flow).
    if (request.nextUrl.pathname === '/' && user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('id', user.id)
            .single();

        if (profile?.onboarding_completed) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return response
}
