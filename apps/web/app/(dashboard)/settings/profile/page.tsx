export default function ProfilePage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">Public Profile</h2>
            <p className="text-slate-600">Manage your public bio and resume data.</p>

            <div className="aif-card mt-4 max-w-2xl">
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Bio</label>
                        <textarea
                            className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400 h-32"
                            placeholder="Tell us about yourself..."
                        ></textarea>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold w-fit">Save Changes</button>
                </div>
            </div>
        </div>
    );
}
