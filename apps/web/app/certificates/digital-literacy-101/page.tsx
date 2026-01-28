"use client";

import Link from "next/link";
import "@/assets/css/thinkforge.css";

export default function DigitalLiteracyCertificatePage() {
  return (
    <div className="tf-shell">
      <div className="tf-layout" style={{ maxWidth: 1200, flexDirection: "column", gap: 12 }}>
        <div className="tf-section-head">
          <div className="tf-section-title">Future Proofer</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="tf-btn-secondary" style={{ padding: "10px 14px" }}>
              Print
            </button>
            <button className="tf-btn-secondary" style={{ padding: "10px 14px" }}>
              Download PDF
            </button>
            <button className="tf-btn-primary" style={{ padding: "10px 14px" }}>
              Share to LinkedIn
            </button>
          </div>
        </div>

        <div className="tf-card">
          <div className="tf-certificate-frame">
            <div className="tf-certificate-inner">
              <div className="tf-eyebrow">Thinkforge Learning Hub</div>
              <div className="tf-title" style={{ fontSize: 34, letterSpacing: "-0.5px" }}>
                CERTIFICATE OF
              </div>
              <div className="tf-title" style={{ fontSize: 34, letterSpacing: "-0.5px" }}>
                ACHIEVEMENT
              </div>
              <div className="tf-muted-text" style={{ marginTop: 12 }}>
                This is to certify that
              </div>
              <div style={{ fontSize: 42, fontWeight: 900, color: "#0f52ba", marginTop: 8, fontStyle: "italic" }}>
                Amina Osei
              </div>

              <div className="tf-muted-text" style={{ marginTop: 14 }}>
                for successfully completing
              </div>
              <div className="tf-section-title" style={{ fontSize: 20, marginTop: 6 }}>
                Digital Literacy 101
              </div>
              <div className="tf-muted-text" style={{ marginTop: 6, fontSize: 12 }}>
                Awarded on Jan 26, 2026
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
                <div style={{ textAlign: "left" }}>
                  <div className="tf-eyebrow">Instructor</div>
                  <div className="tf-section-title" style={{ fontSize: 14, marginTop: 4 }}>
                    Marcus Thorne
                  </div>
                  <div className="tf-muted-text" style={{ fontSize: 12 }}>
                    Lead Instructor, Thinkforge
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="tf-eyebrow">Certificate ID</div>
                  <div className="tf-section-title" style={{ fontSize: 14, marginTop: 4 }}>
                    TF-8829
                  </div>
                  <div className="tf-muted-text" style={{ fontSize: 12 }}>
                    Verification QR (placeholder)
                  </div>
                </div>
              </div>
            </div>
            <div className="tf-certificate-bottom">
              This certificate is issued by Thinkforge’s verification system. You can always access it in your Future Proofer
              dashboard.
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <Link href="/thinkforge/course-completed" className="tf-btn-secondary">
              Back to Celebration Screen
            </Link>
            <Link href="/thinkforge" className="tf-btn-primary">
              Back to Thinkforge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


