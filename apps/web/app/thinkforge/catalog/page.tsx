"use client";

import Link from "next/link";
import "@/assets/css/thinkforge.css";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-6">
    <div className="text-sm font-extrabold text-slate-900">{title}</div>
    <div className="mt-3 grid gap-4 md:grid-cols-3">{children}</div>
  </section>
);

export default function TrackCatalogPage() {
  return (
    <div className="tf-shell">
      <div className="tf-layout">
        <aside className="tf-sidebar">
          <div className="tf-brand">
            <div className="tf-brand-badge">T</div>
            <div className="tf-brand-title">Thinkforge</div>
          </div>
          <nav className="tf-nav">
            <Link className="tf-nav-item" href="/thinkforge">
              My Journey
            </Link>
            <Link className="tf-nav-item active" href="/thinkforge/catalog">
              Track Catalog
            </Link>
            <Link className="tf-nav-item" href="/dashboard">
              Career Dashboard
            </Link>
          </nav>
        </aside>

        <main className="tf-main">
          <div className="tf-card">
            <div className="tf-hero">
              <div>
                <div className="tf-eyebrow">THINKFORGE</div>
                <div className="tf-title">Thinkforge Track Catalog</div>
                <p className="tf-subtitle">Explore core tracks designed for your radical career progression.</p>
              </div>
              <Link href="/thinkforge/paths/web-software-development" className="tf-btn-primary">
                View Path Preview
              </Link>
            </div>

            <Section title="Data Sovereignty">
              {[
                { title: "Ethics in Data", subtitle: "Beginner • 6 hours" },
                { title: "Privacy Laws", subtitle: "Intermediate • 8 hours" },
                { title: "Data Governance", subtitle: "Advanced • 10 hours" },
              ].map((c) => (
                <div key={c.title} className="tf-card" style={{ boxShadow: "none", padding: 16 }}>
                  <div
                    style={{
                      height: 96,
                      borderRadius: 12,
                      background: "linear-gradient(135deg,#e2e8f0,#f8fafc)",
                    }}
                  />
                  <div className="tf-section-title" style={{ fontSize: 14, marginTop: 10 }}>
                    {c.title}
                  </div>
                  <div className="tf-muted-text" style={{ fontSize: 12 }}>
                    {c.subtitle}
                  </div>
                  <button className="tf-btn-secondary" style={{ marginTop: 10, width: "100%", justifyContent: "center" }}>
                    Course Details
                  </button>
                </div>
              ))}
            </Section>

            <Section title="Green Tech">
              {[
                { title: "Solar Grid Systems", subtitle: "Intermediate • 12 hours" },
                { title: "Sustainable AgriTech", subtitle: "Beginner • 10 hours" },
                { title: "Circular Economy Basics", subtitle: "Beginner • 8 hours" },
              ].map((c) => (
                <div key={c.title} className="tf-card" style={{ boxShadow: "none", padding: 16 }}>
                  <div
                    style={{
                      height: 96,
                      borderRadius: 12,
                      background: "linear-gradient(135deg,#d1fae5,#f8fafc)",
                    }}
                  />
                  <div className="tf-section-title" style={{ fontSize: 14, marginTop: 10 }}>
                    {c.title}
                  </div>
                  <div className="tf-muted-text" style={{ fontSize: 12 }}>
                    {c.subtitle}
                  </div>
                  <button className="tf-btn-secondary" style={{ marginTop: 10, width: "100%", justifyContent: "center" }}>
                    Course Details
                  </button>
                </div>
              ))}
            </Section>

            <div className="tf-card" style={{ marginTop: 18, background: "#eaf3ff", borderColor: "#dbeafe" }}>
              <div className="tf-section-title">Need help choosing a track?</div>
              <div className="tf-subtitle" style={{ color: "#1f2937", marginTop: 4 }}>
                Use Skills Gap + Path Impact to pick what closes your gaps fastest.
              </div>
              <Link
                href="/skills-gap"
                className="tf-btn-primary"
                style={{ marginTop: 12, background: "#fff", color: "#0f52ba", boxShadow: "none", border: "1px solid #bfdbfe" }}
              >
                Open Skills Gap
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


