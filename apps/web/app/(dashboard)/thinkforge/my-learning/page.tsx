export default function MyLearningPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">My Learning</h2>
            <p className="text-slate-600">Track your progress and continue where you left off.</p>

            <div className="aif-card mt-4">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 font-bold text-2xl">
                        65%
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">Digital Literacy 101: The Future of Work</h3>
                        <p className="text-sm text-slate-500 mb-4">Module 4 of 6: AI Collaboration Tools</p>
                        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm font-bold">Continue Learning</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
