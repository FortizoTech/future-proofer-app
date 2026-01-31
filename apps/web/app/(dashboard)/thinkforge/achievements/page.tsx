export default function AchievementsPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">Achievements & Badges</h2>
            <p className="text-slate-600">View your earned certifications and skill badges.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                <div className="aif-card flex flex-col items-center text-center gap-3">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-2xl">🏆</div>
                    <h4 className="font-bold text-xs">Python Master</h4>
                    <p className="text-[10px] text-slate-400">Earned Jan 2026</p>
                </div>
                <div className="aif-card flex flex-col items-center text-center gap-3 opacity-50 grayscale">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-2xl">🎓</div>
                    <h4 className="font-bold text-xs">React Pro</h4>
                    <p className="text-[10px] text-slate-400">In Progress</p>
                </div>
            </div>
        </div>
    );
}
