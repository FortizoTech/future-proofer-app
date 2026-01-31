export default function EventsPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">Events & Workshops</h2>
            <p className="text-slate-600">Join webinars, workshops, and networking events.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="aif-card">
                    <div className="bg-blue-600 text-white p-3 rounded-lg text-[10px] font-bold w-fit mb-3">UPCOMING WEBINAR</div>
                    <h3 className="font-bold mb-2">Future of AI in West Africa</h3>
                    <p className="text-xs text-slate-500 mb-4">Join industry leaders to discuss the impact of AI on the local job market.</p>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400">FEB 15, 2026 • 2:00 PM</span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold">Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
