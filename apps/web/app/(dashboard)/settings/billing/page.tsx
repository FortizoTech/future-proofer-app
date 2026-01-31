export default function BillingPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">Billing & Subscriptions</h2>
            <p className="text-slate-600">Manage your plan and payment methods.</p>

            <div className="aif-card mt-4 max-w-2xl">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div>
                        <h4 className="font-bold text-sm text-blue-900">Pro Plan</h4>
                        <p className="text-xs text-blue-700">Next billing date: Feb 29, 2026</p>
                    </div>
                    <span className="font-bold text-blue-900">$19/mo</span>
                </div>
            </div>
        </div>
    );
}
