import OpenAI from 'openai';

const apiKey = process.env.GROQ_API_KEY;

// Singleton instance to prevent multiple instantiations
let openai: OpenAI | null = null;

if (apiKey) {
    openai = new OpenAI({
        apiKey: apiKey,
        baseURL: 'https://api.groq.com/openai/v1', // Use Groq's OpenAI-compatible endpoint
    });
}

export default openai;
