"use client";

import Link from "next/link";
import "@/assets/css/thinkforge.css";

export default function WebSoftwareDevelopmentPathPage() {
  return (
    <div className="tf-shell">
      <div className="tf-layout" style={{ maxWidth: "1320px" }}>
        <div className="tf-card">
          <div className="tf-hero">
            <div>
              <div className="tf-eyebrow">THINKFORGE</div>
              <div className="tf-title">Web &amp; Software Development</div>
              <p className="tf-subtitle" style={{ maxWidth: 760 }}>
                Master modern full‑stack engineering with industry‑standard tools and practices. Bridge the gap between
                theory and production‑ready code.
              </p>
              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span className="tf-pill">14 weeks</span>
                <span className="tf-pill">Intermediate</span>
              </div>
            </div>

            <div className="tf-card" style={{ width: 360, background: "#f8fafc", boxShadow: "none" }}>
              <div className="tf-eyebrow">Path Impact</div>
              <div className="tf-muted-text" style={{ color: "#0f172a", fontWeight: 800, marginTop: 4 }}>
                Bridges your gap in
              </div>
              <div className="tf-section-title" style={{ color: "#0f52ba", marginTop: 4, fontSize: 15 }}>
                Backend Architecture + Cloud Scaling
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginTop: 12 }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#0f172a" }}>+38%</div>
                <div className="tf-muted-text" style={{ paddingBottom: 6 }}>
                  Career readiness
                </div>
              </div>
              <button className="tf-btn-primary" style={{ width: "100%", marginTop: 12, justifyContent: "center" }}>
                Enroll Now
              </button>
              <button className="tf-btn-secondary" style={{ width: "100%", marginTop: 8, justifyContent: "center" }}>
                Save for Later
              </button>
              <div className="tf-card" style={{ marginTop: 12, boxShadow: "none", borderColor: "#e2e8f0" }}>
                <div className="tf-eyebrow">Expert Mentor</div>
                <div className="tf-section-title" style={{ fontSize: 14, marginTop: 4 }}>
                  Sarah Chen
                </div>
                <div className="tf-muted-text" style={{ fontSize: 12 }}>
                  Senior Engineer • Vercel
                </div>
              </div>
            </div>
          </div>

          <div className="tf-layout" style={{ padding: 0, maxWidth: "100%", marginTop: 24, gap: 18 }}>
            <div className="tf-card" style={{ flex: 1 }}>
              <div className="tf-section-title">Course Overview</div>
              <div className="tf-card" style={{ marginTop: 12, boxShadow: "none" }}>
                <div className="tf-section-title" style={{ fontSize: 14 }}>
                  Curriculum
                </div>
                <div style={{ marginTop: 12 }}>
                  {[
                    { id: "01", title: "Foundations of Modern Web Architecture" },
                    { id: "02", title: "Advanced React & State Management" },
                    { id: "03", title: "Node.js & Backend Logic Orchestration" },
                    { id: "04", title: "Deployment & DevOps Lifecycle" },
                  ].map((m) => (
                    <div
                      key={m.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: "1px solid #e2e8f0",
                      }}
                    >
                      <div>
                        <div className="tf-eyebrow">Module {m.id}</div>
                        <div className="tf-section-title" style={{ fontSize: 14 }}>
                          {m.title}
                        </div>
                      </div>
                      <button className="tf-btn-secondary" style={{ padding: "8px 12px" }}>
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <Link href="/thinkforge" className="tf-btn-secondary">
                  Back to My Journey
                </Link>
                <Link href="/thinkforge/lesson" className="tf-btn-primary">
                  Open Lesson View
                </Link>
              </div>
            </div>

            <div className="tf-card" style={{ width: 360 }}>
              <div className="tf-section-title">Connect this to your Skills Gap</div>
              <div className="tf-subtitle" style={{ marginTop: 6 }}>
                This page is meant to answer: “If I take this path, how much does it close my gap?”
              </div>
              <div className="tf-card" style={{ marginTop: 12, background: "#e8f0ff", boxShadow: "none" }}>
                <div className="tf-eyebrow" style={{ color: "#0f52ba" }}>
                  Recommended next
                </div>
                <div className="tf-section-title" style={{ fontSize: 14 }}>
                  Start with React + TypeScript
                </div>
                <div className="tf-muted-text" style={{ fontSize: 12 }}>
                  Matches high-demand job postings in West Africa.
                </div>
              </div>
              <Link href="/skills-gap" className="tf-btn-primary" style={{ marginTop: 12, width: "100%", justifyContent: "center" }}>
                Open Skills Gap Analysis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


