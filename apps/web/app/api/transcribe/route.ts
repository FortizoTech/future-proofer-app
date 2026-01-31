import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import OpenAI from 'openai';

// Initialize OpenAI client with Groq configuration for Whisper
const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(req: NextRequest) {
    try {
        // Authenticate user
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
        }

        // Send to Groq Whisper
        // Note: Groq expects a File object or Buffer
        const transcription = await groq.audio.transcriptions.create({
            file: file,
            model: 'whisper-large-v3',
            response_format: 'json',
            language: 'en', // Can be dynamic based on profile if needed
            temperature: 0, // High accuracy, low creativity
        });

        return NextResponse.json({ text: transcription.text });
    } catch (error: any) {
        console.error('Transcription API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Transcriptions failed' },
            { status: 500 }
        );
    }
}
