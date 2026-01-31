import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import openai from '@/lib/openai';
import { detectContext } from '@/lib/context-detector';
import { retrieveContextData } from '@/lib/data-retriever';
import { buildPrompt } from '@/lib/prompt-builder';
import { validateAIResponse } from '@/lib/response-validator';

export async function POST(req: NextRequest) {
    try {
        console.log('[Chat API] Starting request processing...');

        // 1. AUTHENTICATION - Verify user is logged in
        const supabase = await createClient();
        console.log('[Chat API] Supabase client created');

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        console.log('[Chat API] Auth check result:', { user: !!user, error: !!authError });

        if (authError || !user) {
            console.log('[Chat API] Authentication failed:', authError);
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. RATE LIMITING - Check if user has exceeded limits
        console.log('[Chat API] Checking rate limit for user:', user.id);
        const rateLimit = await checkRateLimit(user.id, supabase);
        console.log('[Chat API] Rate limit result:', rateLimit);

        if (!rateLimit.allowed) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        // 3. PARSE REQUEST
        console.log('[Chat API] Parsing request body...');
        const { message, conversationHistory, attachments } = await req.json();
        console.log('[Chat API] Request parsed:', { messageLength: message?.length, historyLength: conversationHistory?.length, attachmentCount: attachments?.length });

        if ((!message || typeof message !== 'string') && (!attachments || attachments.length === 0)) {
            const errorMsg = `Invalid request: Received message of type ${typeof message} (${message?.length || 0} chars) and ${attachments?.length || 0} attachments.`;
            console.log(`[Chat API] ${errorMsg}`);
            return NextResponse.json({ error: errorMsg }, { status: 400 });
        }

        // 4. GET USER PROFILE - Know their mode, location, etc.
        console.log('[Chat API] Fetching user profile...');
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        console.log('[Chat API] Profile fetch result:', { profile: !!profile, error: !!profileError });

        if (!profile) {
            console.log('[Chat API] Profile not found, creating basic response...');
            // Instead of failing, provide a basic response
            return NextResponse.json({
                response_type: 'answer',
                sections: [
                    {
                        type: 'paragraph',
                        text: 'Welcome! I notice your profile isn\'t fully set up yet. To provide personalized career advice, please complete your profile first.'
                    }
                ],
                next_questions: {
                    type: 'next_questions',
                    items: [
                        { text: 'How do I complete my profile?' },
                        { text: 'What information do you need?' },
                        { text: 'Can you help me get started?' }
                    ]
                }
            });
        }

        // 5. CONTEXT DETECTION
        console.log('[Chat API] Detecting context...');
        const context = detectContext(message, profile);
        console.log('[Chat API] Detected context:', context);

        // 6. DATA RETRIEVAL - Make this more resilient
        console.log('[Chat API] Retrieving context data...');
        let retrievedData;
        try {
            retrievedData = await retrieveContextData(context, supabase);
            console.log('[Chat API] Retrieved data points:', {
                insights: retrievedData.marketInsights.length,
                salaries: retrievedData.salaryData.length,
                skills: retrievedData.skillsDemand.length,
            });
        } catch (dataError) {
            console.log('[Chat API] Data retrieval failed, using empty data:', dataError);
            // Fallback to empty data if database tables don't exist
            retrievedData = {
                marketInsights: [],
                salaryData: [],
                skillsDemand: [],
                businessEnvironment: [],
                sources: []
            };
        }

        // 7. PROMPT CONSTRUCTION
        const { systemPrompt, userMessage } = buildPrompt(
            message,
            retrievedData,
            profile.mode as 'CAREER' | 'BUSINESS',
            context,
            profile,
            attachments
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
                    role: msg.role === 'ai' ? 'assistant' : msg.role,
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
