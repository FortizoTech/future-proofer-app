export default function MarketIntelPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">Market Intelligence</h2>
            <p className="text-slate-600">Real-time salary data and job trends across Africa.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="aif-card">
                    <h3 className="font-bold mb-4">Salary Trends (Lagos, Nigeria)</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Junior Developer</span>
                            <span className="font-bold">₦400k - ₦600k</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Mid-Level Developer</span>
                            <span className="font-bold">₦800k - ₦1.2M</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-600">Senior Developer</span>
                            <span className="font-bold">₦1.5M - ₦2.5M</span>
                        </div>
                    </div>
                </div>

                <div className="aif-card">
                    <h3 className="font-bold mb-4">Hiring Surge Map</h3>
                    <div className="bg-slate-50 rounded-lg h-48 flex items-center justify-center border border-dashed border-slate-300">
                        <span className="text-slate-400 text-sm">Interactive Map Coming Soon</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
