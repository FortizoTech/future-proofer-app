import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const next = requestUrl.searchParams.get("next") ?? "/dashboard";

    if (code) {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error && data.user) {
            // Check if user has completed onboarding
            const { data: profile } = await supabase
                .from('profiles')
                .select('onboarding_completed')
                .eq('id', data.user.id)
                .maybeSingle();

            let target = '/onboarding';

            if (profile?.onboarding_completed) {
                // Fully onboarded - go to dashboard or intended target
                target = next;
            } else if (next.includes('/onboarding')) {
                // If they are not onboarded but the 'next' target is already onboarding (with params)
                target = next;
            }

            console.log('[AuthCallback] Redirecting to:', target);
            return NextResponse.redirect(new URL(target, request.url));
        } else {
            console.error("Auth Callback Error:", error);
        }
    }

    // Return the user to login page with error
    return NextResponse.redirect(new URL('/login?error=AuthError', request.url));
}
