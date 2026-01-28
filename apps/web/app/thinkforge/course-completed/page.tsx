"use client";

import Link from "next/link";
import "@/assets/css/thinkforge.css";

export default function CourseCompletedPage() {
  return (
    <div className="tf-shell">
      <div className="tf-layout" style={{ maxWidth: 1100, flexDirection: "column" }}>
        <div className="tf-section-head">
          <div className="tf-section-title">Thinkforge</div>
          <Link href="/dashboard" className="tf-btn-primary" style={{ padding: "10px 14px" }}>
            Exit to Dashboard
          </Link>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <div className="tf-card" style={{ width: "100%", maxWidth: 520 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  background: "#fef08a",
                  color: "#854d0e",
                  fontWeight: 900,
                  fontSize: 22,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                ⎔
              </div>
              <div className="tf-title" style={{ fontSize: 24, marginTop: 12 }}>
                Congratulations, Amina!
              </div>
              <p className="tf-subtitle" style={{ marginTop: 6 }}>
                You’ve reached a significant milestone in your learning journey.
              </p>

              <div className="tf-card" style={{ width: "100%", marginTop: 16, padding: 0 }}>
                <div style={{ height: 120, background: "linear-gradient(135deg,#e2e8f0,#f8fafc)", borderRadius: "16px 16px 0 0" }} />
                <div style={{ padding: 16 }}>
                  <div className="tf-eyebrow">Course Completed</div>
                  <div className="tf-section-title" style={{ fontSize: 16, marginTop: 4 }}>
                    Digital Literacy 101
                  </div>
                  <div className="tf-muted-text" style={{ fontSize: 12, marginTop: 4 }}>
                    Issued on Jan 26, 2026 • Certificate ID: TF-8829
                  </div>
                  <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <Link href="/certificates/digital-literacy-101" className="tf-btn-primary" style={{ justifyContent: "center" }}>
                      Download Certificate
                    </Link>
                    <button className="tf-btn-secondary" style={{ justifyContent: "center" }}>
                      Share
                    </button>
                  </div>
                </div>
              </div>

              <div className="tf-card" style={{ marginTop: 12, background: "#f8fafc", width: "100%", textAlign: "left", boxShadow: "none" }}>
                <div className="tf-eyebrow">Market Insight</div>
                <div className="tf-subtitle" style={{ color: "#0f172a", marginTop: 6 }}>
                  You are now <span style={{ fontWeight: 800 }}>15%</span> more compatible with Junior Developer roles in West Africa.
                </div>
                <Link href="/thinkforge" className="tf-btn-ghost" style={{ padding: 0, marginTop: 8 }}>
                  View Career Path →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


