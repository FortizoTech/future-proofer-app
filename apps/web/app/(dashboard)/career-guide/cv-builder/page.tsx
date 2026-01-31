export default function CVBuilderPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">AI CV Builder</h2>
            <p className="text-slate-600">Generate a professional, ATS-optimized resume based on your profile and target role.</p>

            <div className="aif-card mt-4">
                <div className="flex flex-col gap-4">
                    <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-3 bg-slate-50">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                        </div>
                        <p className="font-bold text-sm">Upload Current Resume</p>
                        <p className="text-xs text-slate-400">PDF, DOCX (Max 5MB)</p>
                    </div>

                    <button className="bg-blue-600 text-white w-full py-3 rounded-xl font-bold text-sm">Generate AI Optimized CV</button>
                </div>
            </div>
        </div>
    );
}
