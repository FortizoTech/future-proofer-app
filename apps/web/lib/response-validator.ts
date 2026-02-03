import { RetrievedData } from './data-retriever';

export function purifyMarkdown(text: string): string {
    if (typeof text !== 'string') return text;
    // Remove bold, italic, and other markdown symbols but keep the text
    return text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
        .replace(/\*(.*?)\*/g, '$1')     // Italic
        .replace(/__(.*?)__/g, '$1')     // Underline-style
        .replace(/_(.*?)_/g, '$1')       // Italic-style
        .replace(/`(.*?)`/g, '$1')       // Code
        .replace(/#+\s+(.*)/g, '$1')     // Headings
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links (just keep label)
        .replace(/^\s*[\*•\-]\s+/gm, ''); // Bullet points
}

export function validateAIResponse(
    response: string,
    retrievedData: RetrievedData
): { isValid: boolean; issues: string[] } {
    const issues: string[] = [];
    let data: any;

    // Check 1: Is it valid JSON?
    try {
        data = JSON.parse(response);
    } catch (e) {
        issues.push('Response is not valid JSON');
        return { isValid: false, issues };
    }

    // Check 2: Does it contain Markdown symbols?
    const markdownRegex = /([#*_\-`]|\[.*?\]\(.*?\))/;
    const checkTextForMarkdown = (text: string) => {
        if (typeof text === 'string' && markdownRegex.test(text)) {
            return true;
        }
        return false;
    };

    let hasMarkdown = false;
    if (data.sections) {
        data.sections.forEach((section: any) => {
            if (checkTextForMarkdown(section.text)) hasMarkdown = true;
            if (section.items) {
                section.items.forEach((item: any) => {
                    if (checkTextForMarkdown(item.title)) hasMarkdown = true;
                    if (checkTextForMarkdown(item.description)) hasMarkdown = true;
                });
            }
        });
    }

    if (hasMarkdown) {
        issues.push('Response contains forbidden Markdown symbols');
    }

    // Check 3: Contains source citations?
    const hasSources = data.sections?.some((s: any) => s.type === 'sources' && s.items?.length > 0);

    // If response has numbers but no sources, that's a warning
    const allText = JSON.stringify(data);
    if (!hasSources && (allText.includes('$') || allText.includes('%') || /\d+/.test(allText))) {
        if (allText.match(/\d+%/)) {
            issues.push('Response contains statistics but no source citations section');
        }
    }

    // Check 4: Mentions wrong country?
    const countriesInData = retrievedData.marketInsights
        .map(i => i.country?.name)
        .filter(Boolean);

    const wrongCountryMentions = ['United States', 'UK', 'Europe', 'Silicon Valley']
        .filter(term => allText.includes(term));

    if (wrongCountryMentions.length > 0 && countriesInData.length > 0) {
        issues.push(`Response mentions Western locations: ${wrongCountryMentions.join(', ')}`);
    }

    // Check 5: Currency matches?
    if (countriesInData.includes('Ghana') && allText.includes('USD') && !allText.includes('GHS')) {
        if (allText.toLowerCase().includes('salary') || allText.toLowerCase().includes('earn')) {
            issues.push('Using USD for Ghana salaries instead of GHS');
        }
    }

    return {
        isValid: issues.length === 0,
        issues
    };
}
