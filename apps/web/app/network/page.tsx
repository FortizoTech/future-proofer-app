"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MentorshipRequestModal, type MentorshipProfile } from "@/components/mentorship/MentorshipRequestModal";
import "@/assets/css/network.css";

export default function NetworkFeedPage() {
  const [open, setOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<MentorshipProfile | null>(null);

  const mentors = useMemo<MentorshipProfile[]>(
    () => [
      {
        name: "Dr. Sarah Boateng",
        headline: "Senior Scientist • Accra",
        location: "Ghana",
        avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      {
        name: "Ibrahim Kone",
        headline: "AI Researcher • Abidjan",
        location: "Côte d’Ivoire",
        avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
      },
      {
        name: "Nia Zulu",
        headline: "CTO • Product | Cape Town",
        location: "South Africa",
        avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg",
      },
    ],
    []
  );

  return (
    <div className="nw-shell">
      <div className="nw-layout">
        <aside className="nw-sidebar">
          <div className="nw-brand">
            <div className="nw-brand-badge">FP</div>
            <div className="tf-brand-title">Future Proofer</div>
          </div>
          <nav className="nw-nav">
            <Link className="nw-nav-item" href="/dashboard">
              Dashboard
            </Link>
            <Link className="nw-nav-item active" href="/network">
              Network
            </Link>
            <Link className="nw-nav-item" href="/network/mentors">
              Mentor Discovery
            </Link>
            <Link className="nw-nav-item" href="/mentor/inbox">
              Mentor Inbox (demo)
            </Link>
          </nav>
          <button className="nw-btn nw-btn-primary" style={{ width: "100%", marginTop: 12 }}>
            Post Insight
          </button>
        </aside>

        <main className="nw-main">
          <div className="nw-card">
            <div className="nw-section-title" style={{ marginBottom: 12 }}>
              Professional Feed
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
              <input
                className="nw-btn"
                style={{ flex: 1, textAlign: "left", borderColor: "#e2e8f0", background: "#f8fafc" }}
                placeholder="Find peers and mentors..."
              />
              <button className="nw-btn">Refresh</button>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {[
                {
                  name: "Amina Okafor",
                  subtitle: "Just finished an amazing 2024 research project on grid management with AI.",
                  ago: "2h ago",
                },
                {
                  name: "David Diep",
                  subtitle: "I’m looking for 2 mentees interested in Generative Design. DM if you have a portfolio.",
                  ago: "5h ago",
                },
              ].map((p) => (
                <div key={p.name} className="nw-feed-card">
                  <div className="nw-feed-meta">
                    <div className="tf-section-title" style={{ fontSize: 14 }}>
                      {p.name}
                    </div>
                    <span style={{ fontSize: 12 }}>{p.ago}</span>
                  </div>
                  <div style={{ marginTop: 4, fontSize: 14, color: "#0f172a" }}>{p.subtitle}</div>
                  <div className="nw-stats" style={{ marginTop: 6 }}>
                    <span>❤️ 28</span>
                    <span>💬 12</span>
                    <span>↗ Share</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <aside className="nw-rail">
          <div className="nw-card">
            <div className="nw-section-head" style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="nw-section-title">Mentor Matching</div>
              <Link href="/network/mentors" className="tf-btn-ghost" style={{ padding: 0 }}>
                See all
              </Link>
            </div>
            <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
              {mentors.map((m) => (
                <div key={m.name} className="nw-mentor-item">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", background: "#e2e8f0" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div className="tf-section-title" style={{ fontSize: 13 }}>
                        {m.name}
                      </div>
                      <div className="tf-muted-text" style={{ fontSize: 12 }}>
                        {m.headline}
                      </div>
                    </div>
                  </div>
                  <button
                    className="nw-btn nw-btn-primary"
                    style={{ padding: "8px 12px" }}
                    onClick={() => {
                      setSelectedMentor(m);
                      setOpen(true);
                    }}
                  >
                    Connect
                  </button>
                </div>
              ))}
            </div>
            <div className="nw-card" style={{ marginTop: 12, background: "#f8fafc", boxShadow: "none" }}>
              <div className="tf-eyebrow">Trending Foresight</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                {["#AIforAfrica", "#WestAfricaJobs", "#Sustainability", "#RemoteWork"].map((t) => (
                  <span key={t} className="nw-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <MentorshipRequestModal open={open} mentor={selectedMentor} onOpenChange={setOpen} />
    </div>
  );
}


