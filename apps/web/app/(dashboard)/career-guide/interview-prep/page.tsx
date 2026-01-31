export default function InterviewPrepPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">AI Interview Prep</h2>
            <p className="text-slate-600">Practice with AI-powered mock interviews tailored to your target role and skill level.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="aif-card">
                    <h3 className="font-bold mb-2">Technical Interview</h3>
                    <p className="text-sm text-slate-500 mb-4">Focus on coding, system design, and technical problem solving.</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Start Session</button>
                </div>
                <div className="aif-card">
                    <h3 className="font-bold mb-2">Behavioral Interview</h3>
                    <p className="text-sm text-slate-500 mb-4">Practice STAR method responses for common behavioral questions.</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Start Session</button>
                </div>
            </div>
        </div>
    );
}
