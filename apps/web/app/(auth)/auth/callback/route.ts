import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

// Helper to chunk a string for cookie storage (max ~3.5KB per cookie)
function chunkString(str: string, size: number): string[] {
    const chunks: string[] = [];
    for (let i = 0; i < str.length; i += size) {
        chunks.push(str.slice(i, i + size));
    }
    return chunks;
}

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const next = requestUrl.searchParams.get('next') || '/dashboard';
    const code = requestUrl.searchParams.get('code');

    const response = NextResponse.redirect(new URL(next, request.url));

    if (code) {
        try {
            const supabase = await createClient(response);
            console.log('Exchanging code for session...');
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);

            if (error) {
                console.error('Auth callback error:', error.message);
                return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url));
            }

            if (!data.session) {
                console.error('No session returned from code exchange');
                return NextResponse.redirect(new URL('/login?error=Session+creation+failed', request.url));
            }

            console.log('Session successfully established for:', data.session.user.email);

            // WORKAROUND: Manually serialize and set session cookies
            // This bypasses Supabase's async cookie handling
            // Supabase SSR stores session as plain JSON (not base64), chunked if needed
            const projectRef = 'dmbgekmtygenbzcentct';
            const sessionData = {
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_at: data.session.expires_at,
                expires_in: data.session.expires_in,
                token_type: data.session.token_type,
                user: data.session.user
            };

            // Supabase stores as JSON string, NOT base64
            const sessionStr = JSON.stringify(sessionData);

            // Chunk the session if it's too large (cookies have size limits)
            // Using 2000 bytes per chunk to stay safely under browser limits
            const chunks = chunkString(sessionStr, 2000);

            // Remove the code verifier cookie
            response.cookies.set(`sb-${projectRef}-auth-token-code-verifier`, '', {
                path: '/',
                maxAge: 0
            });

            // Set the session chunks as cookies
            chunks.forEach((chunk, i) => {
                const cookieName = `sb-${projectRef}-auth-token.${i}`;
                console.log(`Manually setting cookie: ${cookieName} (length: ${chunk.length})`);
                response.cookies.set(cookieName, chunk, {
                    path: '/',
                    sameSite: 'lax',
                    secure: false,
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 365 // 1 year
                });
            });

        } catch (err: any) {
            console.error('Unexpected error during auth callback:', err);
            return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(err.message || 'Unknown network error')}`, request.url));
        }
    }

    // Log final cookies for debugging
    console.log('--- Final Callback Response Cookies ---');
    response.cookies.getAll().forEach(c => console.log(`- ${c.name}`));

    return response;
}
