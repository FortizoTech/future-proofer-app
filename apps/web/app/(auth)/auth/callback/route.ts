import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation"; // CRITICAL IMPORT

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/dashboard";

    if (code) {
        const supabase = await createClient();

        const { data, error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error && data.user) {
            // SUCCESS: Check if onboarding is completed
            const { data: profile } = await supabase
                .from('profiles')
                .select('onboarding_completed')
                .eq('id', data.user.id)
                .single();

            let redirectUrl = `${origin}/onboarding`;

            if (profile?.onboarding_completed) {
                redirectUrl = `${origin}${next}`;
            } else if (next.includes('/onboarding')) {
                // If they are not onboarded but the 'next' target is already onboarding (with potential params)
                redirectUrl = `${origin}${next}`;
            }

            return redirect(redirectUrl);
        } else {
            console.error("Auth Callback Error:", error);
        }
    }

    // FAILURE:
    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?error=AuthError`);
}
