export default function DiscoveryPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">Career Discovery</h2>
            <p className="text-slate-600">Take our personality and career path quizzes to find your ideal role.</p>
            {/* Quiz components will go here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="aif-card">
                    <h3 className="font-bold mb-2">Personality Quiz</h3>
                    <p className="text-sm text-slate-500 mb-4">Discover your strengths and work style.</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Start Quiz</button>
                </div>
                <div className="aif-card">
                    <h3 className="font-bold mb-2">Career Path Matcher</h3>
                    <p className="text-sm text-slate-500 mb-4">Find roles that match your interests and skills.</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Start Matcher</button>
                </div>
            </div>
        </div>
    );
}
