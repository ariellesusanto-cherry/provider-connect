import { useState } from "react";
import { AUDIT_LOG as DEFAULT_AUDIT_LOG } from "../data";

const ACTION_STYLES = {
  viewed: { color: "var(--accent)", bg: "var(--accent-light)", label: "Viewed" },
  confirmed: { color: "var(--green)", bg: "var(--green-bg)", label: "Confirmed" },
  flagged: { color: "var(--amber)", bg: "var(--amber-bg)", label: "Flagged" },
  consent_changed: { color: "var(--purple)", bg: "var(--purple-bg)", label: "Consent Changed" },
  regenerated: { color: "var(--teal)", bg: "var(--teal-bg)", label: "Regenerated" },
  emergency_override: { color: "var(--red)", bg: "var(--red-bg)", label: "Emergency Override" },
  notification: { color: "var(--text-muted)", bg: "var(--surface-alt)", label: "Notification" },
};

const ROLE_ICONS = {
  gp: "\u{1FA7A}",
  physio: "\u{1F9B4}",
  psych: "\u{1F9E0}",
  dietitian: "\u{1F957}",
  patient: "\u{1F464}",
  system: "\u2699\uFE0F",
};

const FILTERS = ["all", "viewed", "confirmed", "flagged", "consent_changed", "emergency_override"];

export default function AuditTab({ auditLog = DEFAULT_AUDIT_LOG }) {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? auditLog
    : auditLog.filter((e) => e.action === filter);

  const stats = {
    total: auditLog.length,
    confirmed: auditLog.filter((e) => e.action === "confirmed").length,
    flagged: auditLog.filter((e) => e.action === "flagged").length,
    emergency: auditLog.filter((e) => e.action === "emergency_override").length,
  };

  return (
    <div>
      <div className="card" style={{ background: "var(--surface-alt)", borderColor: "var(--border)" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
          Audit Trail
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--text-sec)" }}>
          Every view, consent change, flag, and emergency override is logged with timestamp and identity. This creates unambiguous legal clarity: who knew what, when, and why.
        </p>
      </div>

      {/* Stats */}
      <div className="audit-stats-grid">
        <div className="audit-stat">
          <div className="audit-stat-value">{stats.total}</div>
          <div className="audit-stat-label">Total Events</div>
        </div>
        <div className="audit-stat">
          <div className="audit-stat-value" style={{ color: "var(--green)" }}>{stats.confirmed}</div>
          <div className="audit-stat-label">Confirmed Accurate</div>
        </div>
        <div className="audit-stat">
          <div className="audit-stat-value" style={{ color: "var(--amber)" }}>{stats.flagged}</div>
          <div className="audit-stat-label">Flags Raised</div>
        </div>
        <div className="audit-stat">
          <div className="audit-stat-value" style={{ color: "var(--red)" }}>{stats.emergency}</div>
          <div className="audit-stat-label">Emergency Overrides</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: "12px 22px" }}>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`btn btn-sm ${filter === f ? "btn-accent" : "btn-ghost"}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All Events" : ACTION_STYLES[f]?.label || f}
            </button>
          ))}
        </div>
      </div>

      {/* Log Entries */}
      <div className="card">
        <div className="stack stack-sm">
          {filtered.map((entry) => {
            const style = ACTION_STYLES[entry.action] || ACTION_STYLES.notification;
            return (
              <div key={entry.id} className="audit-entry">
                <div className="audit-entry-left">
                  <div className="audit-entry-icon">{ROLE_ICONS[entry.actorRole] || "\u2699\uFE0F"}</div>
                  <div className="audit-entry-time">{entry.timestamp}</div>
                </div>
                <div className="audit-entry-content">
                  <div className="audit-entry-header">
                    <span style={{ fontWeight: 600, color: "var(--text)" }}>{entry.actor}</span>
                    <span
                      className="badge"
                      style={{ color: style.color, background: style.bg, border: `1px solid ${style.color}20`, fontSize: 9 }}
                    >
                      {style.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-sec)", marginTop: 2 }}>
                    {entry.target} &mdash; {entry.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why This Matters */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128161;</span> Why Audit Trails Create Legal Clarity
        </div>
        <div className="stack stack-md">
          <div className="info-block">
            <div className="info-block-title">Resolves &ldquo;should have known&rdquo; disputes</div>
            <div className="info-block-desc">If a practitioner didn&apos;t see information because the patient restricted it, the audit trail proves the consent boundary. No ambiguity, no liability.</div>
          </div>
          <div className="info-block">
            <div className="info-block-title">Emergency overrides are documented, not hidden</div>
            <div className="info-block-desc">When a practitioner breaks glass for emergency access, the system records the reason, notifies the patient, and flags it for governance review. Transparency protects everyone.</div>
          </div>
          <div className="info-block">
            <div className="info-block-title">AI accuracy is continuously tracked</div>
            <div className="info-block-desc">Every confirmation and flag feeds into quality metrics. The system can prove its accuracy rate at any point in time &mdash; critical for regulatory compliance and malpractice defense.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
