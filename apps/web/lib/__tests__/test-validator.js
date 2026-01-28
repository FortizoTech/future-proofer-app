function validateAIResponse(
    response,
    retrievedData
) {
    const issues = [];
    let data;

    try {
        data = JSON.parse(response);
    } catch (e) {
        issues.push('Response is not valid JSON');
        return { isValid: false, issues };
    }

    const markdownRegex = /([#*_\-`]|\[.*?\]\(.*?\))/;
    const checkTextForMarkdown = (text) => {
        if (typeof text === 'string' && markdownRegex.test(text)) {
            return true;
        }
        return false;
    };

    let hasMarkdown = false;
    if (data.sections) {
        data.sections.forEach((section) => {
            if (checkTextForMarkdown(section.text)) hasMarkdown = true;
            if (section.items) {
                section.items.forEach((item) => {
                    if (checkTextForMarkdown(item.title)) hasMarkdown = true;
                    if (checkTextForMarkdown(item.description)) hasMarkdown = true;
                });
            }
        });
    }

    if (hasMarkdown) {
        issues.push('Response contains forbidden Markdown symbols');
    }

    const hasSources = data.sections?.some((s) => s.type === 'sources' && s.items?.length > 0);
    const allText = JSON.stringify(data);
    if (!hasSources && (allText.includes('$') || allText.includes('%') || /\d+/.test(allText))) {
        if (allText.match(/\d+%/)) {
            issues.push('Response contains statistics but no source citations section');
        }
    }

    return { isValid: issues.length === 0, issues };
}

const mockRetrievedData = {
    marketInsights: [{ country: { name: 'Ghana' }, title: 'Tech Growth', description: 'Growing fast', source: { organization_name: 'GSS' }, year: 2023 }],
    salaryData: [],
    skillsDemand: [],
    businessEnvironment: [],
    sources: []
};

const validJsonResponse = JSON.stringify({
    response_type: "answer",
    sections: [
        { type: "heading", level: 1, text: "Career Path in Ghana" },
        { type: "paragraph", text: "The tech sector is growing." },
        { type: "emphasis", intent: "important", text: "Focus on local skills." },
        { type: "sources", items: [{ label: "GSS 2023", url: "https://statsghana.gov.gh" }] }
    ],
    next_questions: ["How to start?", "What skills?"]
});

const invalidJsonResponse = "This is not JSON";

const markdownResponse = JSON.stringify({
    response_type: "answer",
    sections: [
        { type: "heading", level: 1, text: "# Career Path" },
        { type: "paragraph", text: "This is **bold**." }
    ]
});

console.log("Testing Valid JSON:");
console.log(validateAIResponse(validJsonResponse, mockRetrievedData));

console.log("\nTesting Invalid JSON:");
console.log(validateAIResponse(invalidJsonResponse, mockRetrievedData));

console.log("\nTesting Markdown in JSON:");
console.log(validateAIResponse(markdownResponse, mockRetrievedData));
