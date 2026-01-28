"use client";

import Link from "next/link";
import "@/assets/css/thinkforge.css";

export default function ThinkforgeLessonPage() {
  return (
    <div className="tf-shell">
      <div className="tf-layout" style={{ maxWidth: "1320px", display: "grid", gridTemplateColumns: "1fr 360px" }}>
        <main className="tf-card">
          <div className="tf-hero">
            <div>
              <div className="tf-eyebrow">THINKFORGE</div>
              <div className="tf-title" style={{ fontSize: 24 }}>
                Module 1: Introduction to Digital Literacy
              </div>
              <p className="tf-subtitle">
                This is the “lesson view” screen: video hero, module content, and a right-side lesson list with progress.
              </p>
            </div>
            <Link href="/thinkforge/course-completed" className="tf-btn-primary">
              Mark Complete →
            </Link>
          </div>

          <div className="tf-lesson-hero" style={{ marginTop: 16 }}>
            <div className="tf-lesson-play">
              <button>▶</button>
            </div>
          </div>

          <div className="tf-card" style={{ marginTop: 18, boxShadow: "none" }}>
            <div className="tf-section-title" style={{ fontSize: 15 }}>
              Lesson Notes
            </div>
            <p className="tf-subtitle" style={{ marginTop: 8 }}>
              Digital literacy is about understanding how digital ecosystems work, how to stay safe, and how to use tools effectively.
            </p>
            <ul className="tf-list" style={{ marginTop: 10 }}>
              {[
                "Understand the “pillars” of the Future Proofer framework.",
                "Learn the shift from digital consumption to digital creation.",
                "Practice safe behaviors and basic privacy hygiene.",
              ].map((item) => (
                <li key={item} className="tf-list-item" style={{ borderBottom: "none" }}>
                  <span style={{ fontSize: 14, color: "#0f172a" }}>• {item}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>

        <aside className="tf-card">
          <div className="tf-section-head">
            <div className="tf-section-title">Lesson Contents</div>
            <span className="tf-badge-outline" style={{ background: "#e8f0ff", borderColor: "#c7d2fe", color: "#0f52ba" }}>
              65%
            </span>
          </div>

          <div className="tf-row" style={{ marginTop: 12 }}>
            {[
              { title: "1. Introduction", active: true },
              { title: "2. Computer Fundamentals", active: false },
              { title: "3. Internet & Information", active: false },
              { title: "4. Digital Productivity", active: false },
              { title: "5. Digital Safety", active: false },
            ].map((l) => (
              <button
                key={l.title}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: l.active ? "1px solid #c7d2fe" : "1px solid #e2e8f0",
                  background: l.active ? "#e8f0ff" : "#fff",
                  color: l.active ? "#0f52ba" : "#0f172a",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {l.title}
              </button>
            ))}
          </div>

          <div className="tf-card" style={{ marginTop: 14, background: "#f8fafc", boxShadow: "none" }}>
            <div className="tf-eyebrow">Module Summary</div>
            <p className="tf-subtitle" style={{ marginTop: 6 }}>
              After completing this module, you’ll understand what digital literacy means and why it matters in today’s economy.
            </p>
          </div>

          <div className="tf-row" style={{ marginTop: 14 }}>
            <Link href="/thinkforge" className="tf-btn-secondary" style={{ justifyContent: "center" }}>
              Back to My Journey
            </Link>
            <Link href="/certificates/digital-literacy-101" className="tf-btn-primary" style={{ justifyContent: "center" }}>
              View Certificate Page
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}


