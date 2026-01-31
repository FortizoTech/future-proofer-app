export default function MessagesPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">Messages</h2>
            <p className="text-slate-600">Direct chats with your mentors and connections.</p>

            <div className="aif-card mt-4 p-0 overflow-hidden">
                <div className="flex h-[400px]">
                    <div className="w-1/3 border-r border-slate-100 p-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                                <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
                                <div>
                                    <h4 className="font-bold text-xs">Fatou Bah</h4>
                                    <p className="text-[10px] text-slate-500">How is the project going?</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                        Select a conversation to start chatting
                    </div>
                </div>
            </div>
        </div>
    );
}
