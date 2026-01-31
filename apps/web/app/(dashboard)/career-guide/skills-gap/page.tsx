export default function SkillsGapPage() {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-slate-900">Skills Gap Analysis</h2>
            <p className="text-slate-600">See how your current skills match up against your target role.</p>

            <div className="aif-card mt-4">
                <div className="aif-skills-content">
                    <div className="aif-skills-bars">
                        <div className="aif-skill-bar">
                            <div className="aif-skill-info">
                                <span className="aif-skill-name">Python / Django</span>
                                <span className="aif-skill-level">Advanced</span>
                            </div>
                            <div className="aif-skill-track">
                                <div className="aif-skill-fill bg-blue-600" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                        <div className="aif-skill-bar">
                            <div className="aif-skill-info">
                                <span className="aif-skill-name">React / Next.js</span>
                                <span className="aif-skill-level">Intermediate</span>
                            </div>
                            <div className="aif-skill-track">
                                <div className="aif-skill-fill bg-blue-400" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                        <div className="aif-skill-bar">
                            <div className="aif-skill-info">
                                <span className="aif-skill-name">PostgreSQL</span>
                                <span className="aif-skill-level">Advanced</span>
                            </div>
                            <div className="aif-skill-track">
                                <div className="aif-skill-fill bg-blue-600" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="aif-radial-container">
                        <div className="aif-radial-progress">
                            <svg className="aif-radial-svg" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#2563eb" strokeWidth="8" strokeDasharray="283" strokeDashoffset="62" strokeLinecap="round" transform="rotate(-90 50 50)" />
                            </svg>
                            <div className="aif-radial-content">
                                <div className="aif-radial-value">78%</div>
                                <div className="text-[10px] font-bold text-slate-400">READY</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
