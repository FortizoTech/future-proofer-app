"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MentorshipRequestModal, type MentorshipProfile } from "@/components/mentorship/MentorshipRequestModal";
import "@/assets/css/network.css";

export default function MentorDiscoveryPage() {
  const [open, setOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<MentorshipProfile | null>(null);

  const mentors = useMemo<MentorshipProfile[]>(
    () => [
      {
        name: "Sarah Jenkins",
        headline: "Senior Software Engineer • 12 years exp.",
        location: "San Francisco, CA (Remote)",
        avatarUrl: "https://randomuser.me/api/portraits/women/12.jpg",
      },
      {
        name: "Michael Chen",
        headline: "Staff ML Engineer • Tech",
        location: "Remote",
        avatarUrl: "https://randomuser.me/api/portraits/men/10.jpg",
      },
      {
        name: "Elena Rodriguez",
        headline: "Product Manager • SaaS",
        location: "London (Remote)",
        avatarUrl: "https://randomuser.me/api/portraits/women/22.jpg",
      },
      {
        name: "David Park",
        headline: "Senior Architect • Distributed Systems",
        location: "Seattle (Remote)",
        avatarUrl: "https://randomuser.me/api/portraits/men/27.jpg",
      },
    ],
    []
  );

  const topMentor = mentors[0];

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <div className="mx-auto max-w-[1400px] px-6 py-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-xs font-semibold tracking-widest text-slate-500">MENTOR DISCOVERY</div>
              <h1 className="mt-1 text-3xl font-extrabold text-slate-900">AI Match for You</h1>
              <p className="mt-2 max-w-[760px] text-sm text-slate-600">
                A proactive AI view that suggests the most relevant mentor based on the user’s specific career goal.
              </p>
            </div>
            <Link href="/network" className="rounded-xl border bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Back to Feed
            </Link>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
            {/* Filters */}
            <aside className="rounded-2xl border bg-white p-4">
              <div className="text-sm font-extrabold text-slate-900">Filters</div>
              <div className="mt-4 grid gap-3">
                <label className="grid gap-1">
                  <span className="text-xs font-semibold text-slate-600">Role</span>
                  <select className="h-11 rounded-xl border px-3 text-sm outline-none focus:border-blue-300">
                    <option>All</option>
                    <option>Software Engineer</option>
                    <option>Product Manager</option>
                    <option>Data Scientist</option>
                  </select>
                </label>
                <label className="grid gap-1">
                  <span className="text-xs font-semibold text-slate-600">Location</span>
                  <select className="h-11 rounded-xl border px-3 text-sm outline-none focus:border-blue-300">
                    <option>Remote only</option>
                    <option>West Africa</option>
                    <option>Global</option>
                  </select>
                </label>
                <label className="grid gap-1">
                  <span className="text-xs font-semibold text-slate-600">Availability</span>
                  <select className="h-11 rounded-xl border px-3 text-sm outline-none focus:border-blue-300">
                    <option>Accepting mentors</option>
                    <option>Limited</option>
                  </select>
                </label>
              </div>
            </aside>

            {/* Match card + list */}
            <div className="grid gap-4">
              <div className="rounded-2xl border bg-white p-5">
                <div className="text-xs font-semibold tracking-widest text-slate-500">TOP AI RECOMMENDATION</div>
                <div className="mt-3 flex items-start gap-4">
                  <div className="h-20 w-20 overflow-hidden rounded-2xl bg-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {topMentor?.avatarUrl ? (
                      <img src={topMentor.avatarUrl} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-extrabold text-slate-900">{topMentor?.name ?? "Top Mentor"}</div>
                    <div className="mt-1 text-sm text-slate-600">{topMentor?.headline ?? ""}</div>
                    <div className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                      “I specialize in scaling distributed systems and have mentored 20+ developers transitioning from junior to senior roles.”
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
                        onClick={() => {
                          if (!topMentor) return;
                          setSelectedMentor(topMentor);
                          setOpen(true);
                        }}
                        disabled={!topMentor}
                      >
                        Request Mentorship
                      </button>
                      <button className="rounded-xl border bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border bg-white p-5">
                <div className="text-sm font-extrabold text-slate-900">Other Matches</div>
                <div className="mt-4 grid gap-3">
                  {mentors.slice(1).map((m) => (
                    <div key={m.name} className="flex items-center justify-between rounded-2xl border p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={m.avatarUrl} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-extrabold text-slate-900">{m.name}</div>
                          <div className="truncate text-xs text-slate-500">{m.headline}</div>
                        </div>
                      </div>
                      <button
                        className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700"
                        onClick={() => {
                          setSelectedMentor(m);
                          setOpen(true);
                        }}
                      >
                        Request
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MentorshipRequestModal open={open} mentor={selectedMentor} onOpenChange={setOpen} />
    </div>
  );
}


