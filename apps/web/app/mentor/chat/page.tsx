"use client";

import Link from "next/link";
import "@/assets/css/network.css";

export default function MentorshipChatPage() {
  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <div className="mx-auto max-w-[1400px] px-6 py-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-xs font-semibold tracking-widest text-slate-500">MENTORSHIP</div>
              <h1 className="mt-1 text-3xl font-extrabold text-slate-900">Mentorship Chat &amp; Resource Vault</h1>
              <p className="mt-2 text-sm text-slate-600">
                Split-pane layout: conversation on the left, searchable “Resource Vault” on the right.
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/mentor/inbox" className="rounded-xl border bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
                Back to Inbox
              </Link>
              <Link href="/network" className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700">
                Back to Network
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Chat */}
            <div className="rounded-2xl border bg-white">
              <div className="border-b p-4">
                <div className="text-sm font-extrabold text-slate-900">Alex Mentor &amp; You</div>
                <div className="text-xs text-slate-500">Software Engineering Focus</div>
              </div>

              <div className="h-[520px] overflow-auto p-4">
                <div className="grid gap-3">
                  <div className="max-w-[75%] rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                    Hi! I’ve uploaded the senior-level career roadmap we discussed. It covers the core system design concepts you asked about.
                    <div className="mt-1 text-xs text-slate-500">Yesterday</div>
                  </div>
                  <div className="ml-auto max-w-[75%] rounded-2xl bg-blue-600 p-3 text-sm text-white">
                    Thanks Alex! Checking it out now. The system design section is exactly where I needed more clarity.
                    <div className="mt-1 text-xs text-white/70">Yesterday</div>
                  </div>
                  <div className="max-w-[75%] rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                    Great to hear. Next, I’d like us to pick a free open-source project you can use for your portfolio. Let’s discuss in our next call.
                    <div className="mt-1 text-xs text-slate-500">Today</div>
                  </div>
                </div>
              </div>

              <div className="border-t p-3">
                <div className="flex gap-2">
                  <input
                    className="h-11 flex-1 rounded-xl border px-3 text-sm outline-none focus:border-blue-300"
                    placeholder="Type your message…"
                  />
                  <button className="h-11 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white hover:bg-blue-700">
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Resource Vault */}
            <aside className="rounded-2xl border bg-white">
              <div className="border-b p-4">
                <div className="text-sm font-extrabold text-slate-900">Resource Vault</div>
                <input
                  className="mt-3 h-11 w-full rounded-xl border px-3 text-sm outline-none focus:border-blue-300"
                  placeholder="Search resources..."
                />
              </div>

              <div className="p-4">
                <div className="grid gap-3">
                  {[
                    { title: "Career_Roadmap.pdf", subtitle: "Shared Yesterday" },
                    { title: "Resume_Feedback.docx", subtitle: "Shared 3 days ago" },
                    { title: "System_Design_Interview.md", subtitle: "Shared 1 week ago" },
                    { title: "Portfolio_Examples", subtitle: "Shared 2 weeks ago" },
                  ].map((r) => (
                    <div key={r.title} className="rounded-2xl border p-3">
                      <div className="text-sm font-bold text-slate-900">{r.title}</div>
                      <div className="text-xs text-slate-500">{r.subtitle}</div>
                      <button className="mt-2 rounded-xl border bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
                        Open
                      </button>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800">
                  Upload to Vault
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}


