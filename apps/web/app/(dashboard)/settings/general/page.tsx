export default function GeneralSettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">General Settings</h2>
            <p className="text-slate-600">Manage your account details and security.</p>

            <div className="aif-card mt-4 max-w-2xl">
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Full Name</label>
                            <input
                                type="text"
                                className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400"
                                placeholder="Kwame Mensah"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 mb-2 uppercase">Email Address</label>
                            <input
                                type="email"
                                className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400"
                                placeholder="kwame@example.com"
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                        <h3 className="font-bold text-sm mb-4">Change Password</h3>
                        <div className="flex flex-col gap-4">
                            <input
                                type="password"
                                className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400"
                                placeholder="Current Password"
                            />
                            <input
                                type="password"
                                className="w-full p-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-blue-400"
                                placeholder="New Password"
                            />
                        </div>
                    </div>

                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold w-fit">Save Changes</button>
                </div>
            </div>
        </div>
    );
}
