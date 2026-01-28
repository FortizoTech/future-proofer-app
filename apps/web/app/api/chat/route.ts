import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import openai from '@/lib/openai';
import { detectContext } from '@/lib/context-detector';
import { retrieveContextData } from '@/lib/data-retriever';
import { buildPrompt } from '@/lib/prompt-builder';
import { validateAIResponse } from '@/lib/response-validator';

export async function POST(req: NextRequest) {
    try {
        // 1. AUTHENTICATION - Verify user is logged in
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. RATE LIMITING - Check if user has exceeded limits
        const rateLimit = await checkRateLimit(user.id, supabase);
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        // 3. PARSE REQUEST
        const { message, conversationHistory } = await req.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
        }

        // 4. GET USER PROFILE - Know their mode, location, etc.
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (!profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        // 5. CONTEXT DETECTION
        const context = detectContext(message, profile);
        console.log('Detected context:', context);

        // 6. DATA RETRIEVAL
        const retrievedData = await retrieveContextData(context, supabase);
        console.log('Retrieved data points:', {
            insights: retrievedData.marketInsights.length,
            salaries: retrievedData.salaryData.length,
            skills: retrievedData.skillsDemand.length,
        });

        // 7. PROMPT CONSTRUCTION
        const { systemPrompt, userMessage } = buildPrompt(
            message,
            retrievedData,
            profile.mode as 'CAREER' | 'BUSINESS',
            context,
            profile
        );

        // 8. CALL OPENAI API
        if (!openai) {
            console.error('OpenAI client not initialized');
            return NextResponse.json(
                { error: 'AI service configuration error' },
                { status: 500 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: 'llama-3.3-70b-versatile', // High-performance Llama 3 model on Groq
            messages: [
                { role: 'system', content: systemPrompt },
                ...(conversationHistory || []).map((msg: any) => ({
                    role: msg.role,
                    content: msg.content
                })),
                { role: 'user', content: userMessage },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7, // Balanced creativity and consistency
            max_tokens: 2000, // Increased limit for JSON structure
        });

        const rawResponse = completion.choices?.[0]?.message?.content ?? '{}';
        let structuredResponse: any;

        try {
            structuredResponse = JSON.parse(rawResponse);
        } catch (parseError) {
            console.error('Failed to parse AI JSON response:', parseError);
            // Fallback if JSON is malformed
            structuredResponse = {
                response_type: 'answer',
                sections: [{ type: 'paragraph', text: rawResponse }],
                next_questions: []
            };
        }

        // 9. RESPONSE VALIDATION
        const validation = validateAIResponse(rawResponse, retrievedData);

        if (!validation.isValid) {
            console.warn('AI response validation issues:', validation.issues);
        }

        // 10. LOG INTERACTION
        try {
            await logInteraction({
                userId: user.id,
                userMessage: message,
                aiResponse: rawResponse,
                context,
                retrievedDataCount: retrievedData.marketInsights.length,
                validationIssues: validation.issues,
                tokensUsed: completion.usage?.total_tokens,
            }, supabase);
        } catch (logError) {
            console.error('Failed to log interaction:', logError);
        }

        // 11. RETURN RESPONSE
        return NextResponse.json({
            ...structuredResponse,
            sources: retrievedData.sources, // Keep original sources for backward compatibility or UI use
            context: {
                country: context.country,
                sector: context.sector,
            },
        });

    } catch (error: any) {
        console.error('Chat API error:', error);

        // Don't expose internal errors to users
        return NextResponse.json(
            { error: error.message || 'An error occurred processing your request' },
            { status: 500 }
        );
    }
}

// Helper: Rate limiting
async function checkRateLimit(userId: string, supabase: any): Promise<{ allowed: boolean; remaining: number }> {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { count } = await supabase
        .from('ai_interactions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', oneHourAgo);

    const limit = 50; // 50 messages per hour for free tier
    const remaining = Math.max(0, limit - (count || 0));

    return {
        allowed: (count || 0) < limit,
        remaining,
    };
}

// Helper: Log interaction
async function logInteraction(data: any, supabase: any) {
    await supabase.from('ai_interactions').insert({
        user_id: data.userId,
        user_message: data.userMessage,
        ai_response: data.aiResponse,
        context: data.context,
        retrieved_data_count: data.retrievedDataCount,
        validation_issues: data.validationIssues,
        tokens_used: data.tokensUsed,
        created_at: new Date().toISOString(),
    });
}
