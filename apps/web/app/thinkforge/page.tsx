"use client";

import Link from "next/link";
import "@/assets/css/thinkforge.css";

export default function ThinkforgeJourneyPage() {
  const enrolled = [
    { title: "AI Fundamentals", progress: 45 },
    { title: "Strategic Thinking", progress: 12 },
    { title: "Python Mastery", progress: 88 },
  ];

  return (
    <div className="tf-shell">
      <div className="tf-layout">
        <aside className="tf-sidebar">
          <div className="tf-brand">
            <div className="tf-brand-badge">T</div>
            <div className="tf-brand-title">Thinkforge</div>
          </div>
          <nav className="tf-nav">
            <Link className="tf-nav-item active" href="/thinkforge">
              My Journey
            </Link>
            <Link className="tf-nav-item" href="/thinkforge/catalog">
              Track Catalog
            </Link>
            <Link className="tf-nav-item" href="/thinkforge/paths/web-software-development">
              Path Preview
            </Link>
            <Link className="tf-nav-item" href="/thinkforge/lesson">
              Lesson View
            </Link>
            <Link className="tf-nav-item" href="/dashboard">
              Back to Career Dashboard
            </Link>
          </nav>
        </aside>

        <main className="tf-main">
          <div className="tf-card">
            <div className="tf-hero">
              <div>
                <div className="tf-eyebrow">THINKFORGE</div>
                <div className="tf-title">Your Learning Journey</div>
                <p className="tf-subtitle">
                  Focus on your progress and master new skills. Courses are connected to your Skills Gap so learning feels
                  strategic.
                </p>
              </div>
              <Link href="/thinkforge/catalog" className="tf-btn-primary">
                Explore Catalog
              </Link>
            </div>

            <div className="tf-card tf-hero-card" style={{ marginTop: 16 }}>
              <div className="tf-hero" style={{ alignItems: "center" }}>
                <div>
                  <div className="tf-eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
                    Continue Learning
                  </div>
                  <div className="tf-title" style={{ color: "#fff", fontSize: 22 }}>
                    Digital Literacy 101
                  </div>
                  <div className="tf-subtitle" style={{ color: "rgba(255,255,255,0.8)" }}>
                    Module 7 of 12 • 65% complete
                  </div>
                </div>
                <Link href="/thinkforge/lesson" className="tf-btn-secondary" style={{ background: "#fff", color: "#0f172a" }}>
                  Resume Course
                </Link>
              </div>
              <div className="tf-progress tf-hero-progress" style={{ marginTop: 18 }}>
                <div className="tf-progress-fill" style={{ width: "65%" }} />
              </div>
            </div>

            <section className="tf-section" style={{ marginTop: 18 }}>
              <div className="tf-section-head">
                <div className="tf-section-title">Enrolled Courses</div>
                <Link href="/thinkforge/catalog" className="tf-btn-ghost" style={{ padding: "6px 10px" }}>
                  View All
                </Link>
              </div>
              <div className="tf-grid-3" style={{ marginTop: 12 }}>
                {enrolled.map((c) => (
                  <div key={c.title} className="tf-card" style={{ boxShadow: "none" }}>
                    <div className="tf-section-title" style={{ fontSize: 14, marginBottom: 6 }}>
                      {c.title}
                    </div>
                    <div className="tf-progress" style={{ height: 8 }}>
                      <div className="tf-progress-fill" style={{ width: `${c.progress}%`, height: "100%" }} />
                    </div>
                    <div className="tf-muted-text" style={{ marginTop: 8, fontWeight: 700 }}>
                      {c.progress}%
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="tf-card" style={{ marginTop: 18 }}>
              <div className="tf-section-title">Completed</div>
              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                {["Ethics in Design", "Remote Work Essentials"].map((b) => (
                  <span key={b} className="tf-badge" style={{ background: "#dcfce7", color: "#0f5132" }}>
                    {b}
                  </span>
                ))}
                <Link href="/thinkforge/course-completed" className="tf-btn-primary" style={{ padding: "10px 12px" }}>
                  View “Course Completed” Screen
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}


