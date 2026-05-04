import { useState } from "react";
import { ROLES, getVisibleConditions, getVisibleMedications, getAISummary } from "../data";

const ROLE_KEYS = Object.keys(ROLES);

export default function CompareTab({ consent }) {
  const [leftRole, setLeftRole] = useState("gp");
  const [rightRole, setRightRole] = useState("physio");

  const leftRI = ROLES[leftRole];
  const rightRI = ROLES[rightRole];
  const leftSummary = getAISummary(leftRole, consent);
  const rightSummary = getAISummary(rightRole, consent);
  const leftConditions = getVisibleConditions(leftRole, consent);
  const rightConditions = getVisibleConditions(rightRole, consent);
  const leftMeds = getVisibleMedications(leftRole, consent);
  const rightMeds = getVisibleMedications(rightRole, consent);

  function RoleSelector({ value, onChange, side }) {
    return (
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
        {ROLE_KEYS.map((k) => {
          const r = ROLES[k];
          return (
            <button
              key={k}
              className={`btn btn-sm ${value === k ? "btn-accent" : "btn-ghost"}`}
              onClick={() => onChange(k)}
              style={value === k ? { background: r.color, borderColor: r.color } : undefined}
            >
              {r.icon} {r.title.split(" ")[0]}
            </button>
          );
        })}
      </div>
    );
  }


  return (
    <div>
      <div className="card" style={{ background: "var(--accent-light)", borderColor: "rgba(37,99,235,0.2)" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--accent)", marginBottom: 6 }}>
          Side-by-Side Role Comparison
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.7 }}>
          See exactly how the same patient data appears to different practitioners. The visual difference demonstrates how role-based filtering works in practice &mdash; same patient, different clinical lenses.
        </p>
      </div>

      <div className="compare-grid">
        {/* Left Panel */}
        <div className="compare-panel">
          <div className="compare-panel-header" style={{ background: leftRI.bg, borderColor: leftRI.color + "30" }}>
            <span style={{ fontSize: 22 }}>{leftRI.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: leftRI.color }}>{leftRI.label}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{leftRI.title}</div>
            </div>
          </div>
          <RoleSelector value={leftRole} onChange={setLeftRole} side="left" />

          {/* AI Summary */}
          <div className="compare-section">
            <div className="section-title" style={{ fontSize: 10 }}>
              <span className="section-title-icon">&#10022;</span> AI Summary

            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.65, color: "var(--text-sec)" }}>{leftSummary}</p>
          </div>

          {/* Conditions */}
          <div className="compare-section">
            <div className="section-title" style={{ fontSize: 10 }}>
              <span className="section-title-icon">&#128203;</span> Conditions
            </div>
            <div className="stack stack-sm">
              {leftConditions.map((c) => (
                <div key={c.id} className={`compare-item${c.redacted ? " compare-redacted" : ""}`}>
                  <span>{c.display}</span>
                  {c.redacted && <span className="badge badge-amber" style={{ fontSize: 8, padding: "1px 5px" }}>Redacted</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Medications */}
          <div className="compare-section">
            <div className="section-title" style={{ fontSize: 10 }}>
              <span className="section-title-icon">&#128138;</span> Medications
            </div>
            <div className="stack stack-sm">
              {leftMeds.map((m, i) => (
                <div key={i} className={`compare-item${m.redacted ? " compare-redacted" : ""}`}>
                  <span>{m.display}</span>
                  {m.redacted && <span className="badge badge-amber" style={{ fontSize: 8, padding: "1px 5px" }}>Redacted</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="compare-divider">
          <div className="compare-divider-line" />
          <div className="compare-divider-label">VS</div>
          <div className="compare-divider-line" />
        </div>

        {/* Right Panel */}
        <div className="compare-panel">
          <div className="compare-panel-header" style={{ background: rightRI.bg, borderColor: rightRI.color + "30" }}>
            <span style={{ fontSize: 22 }}>{rightRI.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: rightRI.color }}>{rightRI.label}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{rightRI.title}</div>
            </div>
          </div>
          <RoleSelector value={rightRole} onChange={setRightRole} side="right" />

          {/* AI Summary */}
          <div className="compare-section">
            <div className="section-title" style={{ fontSize: 10 }}>
              <span className="section-title-icon">&#10022;</span> AI Summary

            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.65, color: "var(--text-sec)" }}>{rightSummary}</p>
          </div>

          {/* Conditions */}
          <div className="compare-section">
            <div className="section-title" style={{ fontSize: 10 }}>
              <span className="section-title-icon">&#128203;</span> Conditions
            </div>
            <div className="stack stack-sm">
              {rightConditions.map((c) => (
                <div key={c.id} className={`compare-item${c.redacted ? " compare-redacted" : ""}`}>
                  <span>{c.display}</span>
                  {c.redacted && <span className="badge badge-amber" style={{ fontSize: 8, padding: "1px 5px" }}>Redacted</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Medications */}
          <div className="compare-section">
            <div className="section-title" style={{ fontSize: 10 }}>
              <span className="section-title-icon">&#128138;</span> Medications
            </div>
            <div className="stack stack-sm">
              {rightMeds.map((m, i) => (
                <div key={i} className={`compare-item${m.redacted ? " compare-redacted" : ""}`}>
                  <span>{m.display}</span>
                  {m.redacted && <span className="badge badge-amber" style={{ fontSize: 8, padding: "1px 5px" }}>Redacted</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Differences */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128161;</span> What This Demonstrates
        </div>
        <div className="stack stack-md">
          <div className="info-block">
            <div className="info-block-title">Same patient, different clinical lenses</div>
            <div className="info-block-desc">Each practitioner sees information tailored to their clinical role. The GP sees full mental health context for prescribing. The physio sees musculoskeletal focus with only clinically relevant medication effects.</div>
          </div>
          <div className="info-block">
            <div className="info-block-title">Redaction preserves clinical utility</div>
            <div className="info-block-desc">When a medication is redacted, the practitioner still sees its clinical relevance (&ldquo;may affect pain perception&rdquo;) without knowing the specific drug or diagnosis. Safety without exposure.</div>
          </div>
          <div className="info-block">
            <div className="info-block-title">Try changing consent</div>
            <div className="info-block-desc">Open the Patient Consent Settings panel (purple button at the top) and toggle permissions &mdash; then come back here to see the view change in real-time. This is the core demo: consent directly controls what each role sees.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
