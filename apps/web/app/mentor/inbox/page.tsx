"use client";

import Link from "next/link";
import "@/assets/css/network.css";

export default function MentorInboxPage() {
  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <div className="mx-auto max-w-[1200px] px-6 py-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-xs font-semibold tracking-widest text-slate-500">MENTOR CONSOLE</div>
              <h1 className="mt-1 text-3xl font-extrabold text-slate-900">Request Inbox</h1>
              <p className="mt-2 text-sm text-slate-600">
                A list-centric view that prioritizes new requests so mentors can make fast decisions.
              </p>
            </div>
            <Link href="/network" className="rounded-xl border bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Back to Network
            </Link>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-3">
              {[
                { name: "Amina Osei", role: "Software Developer", ago: "2h ago", msg: "Hi! I’m transitioning to full‑stack and want help with system design and interview prep." },
                { name: "Marcus Chen", role: "Data Scientist", ago: "5h ago", msg: "I want to learn about building ML pipelines and production environments." },
                { name: "Elena Rodriguez", role: "Product Manager", ago: "1d ago", msg: "Seeking mentorship for breaking into tech leadership and stakeholder management." },
              ].map((r) => (
                <div key={r.name} className="rounded-2xl border bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{r.name}</div>
                      <div className="text-xs text-slate-500">
                        {r.role} • {r.ago}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700">
                        Accept
                      </button>
                      <button className="rounded-xl border bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
                        Decline
                      </button>
                      <Link
                        href="/mentor/chat"
                        className="rounded-xl border bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                  <div className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">{r.msg}</div>
                </div>
              ))}
            </div>

            <aside className="rounded-2xl border bg-slate-50 p-4">
              <div className="text-sm font-extrabold text-slate-900">Impact Score</div>
              <div className="mt-4 rounded-2xl bg-white p-4">
                <div className="text-5xl font-extrabold text-slate-900">92%</div>
                <div className="mt-1 text-xs font-semibold text-slate-500">Overall rating (demo)</div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs font-semibold text-slate-500">Mentees</div>
                    <div className="mt-1 text-xl font-extrabold text-slate-900">24</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs font-semibold text-slate-500">Hours</div>
                    <div className="mt-1 text-xl font-extrabold text-slate-900">120</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-slate-700">
                <div className="text-xs font-semibold tracking-widest text-slate-500">MENTOR TIP</div>
                <div className="mt-2">
                  Responding quickly increases your impact score and improves mentee retention.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}


