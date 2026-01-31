export default function FeedPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">Community Feed</h2>
            <p className="text-slate-600">Stay updated with the latest posts and updates from the community.</p>

            <div className="flex flex-col gap-4 mt-4">
                <div className="aif-card">
                    <div className="flex gap-3 items-start">
                        <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                        <div>
                            <h4 className="font-bold text-sm">Amara Okoro</h4>
                            <p className="text-xs text-slate-500">Just completed the Python Advanced module! 🚀</p>
                            <span className="text-[10px] text-slate-400 mt-2 block">2 hours ago</span>
                        </div>
                    </div>
                </div>
                <div className="aif-card">
                    <div className="flex gap-3 items-start">
                        <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                        <div>
                            <h4 className="font-bold text-sm">David Kone</h4>
                            <p className="text-xs text-slate-500">Looking for a study buddy for the React track. Anyone interested?</p>
                            <span className="text-[10px] text-slate-400 mt-2 block">5 hours ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
