export default function MentorsPage() {
    const mentors = [
        { name: 'Fatou Bah', title: 'Senior Lead at Google Inc', location: 'California' },
        { name: 'David Kone', title: 'CTO at FintechHub', location: 'Accra' }
    ];

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">Find a Mentor</h2>
            <p className="text-slate-600">Connect with experienced professionals in your field.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {mentors.map((mentor) => (
                    <div key={mentor.name} className="aif-card flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                            {mentor.name[0]}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm">{mentor.name}</h4>
                            <p className="text-xs text-slate-500">{mentor.title}</p>
                            <p className="text-[10px] text-slate-400">{mentor.location}</p>
                        </div>
                        <button className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold">Connect</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
