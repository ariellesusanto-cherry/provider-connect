const PIPELINE_STEPS = [
  { n: "1", t: "Structured input, not free-text parsing", d: "Summaries from structured data (diagnoses, medications, visit metadata) \u2014 not free-text notes. Dramatically reduces hallucination. Free-text notes never fed to the AI." },
  { n: "2", t: "Every claim traceable to source", d: "\u201CPain improving (5/10, down from 7/10)\u201D traces to the exact visit record. No orphan claims \u2014 nothing exists without a source." },
  { n: "3", t: "Confidence thresholds with human fallback", d: "Below-threshold confidence flags that section with \u201CVerify with treating provider\u201D rather than presenting uncertainty as fact." },
  { n: "4", t: "Practitioner feedback loop", d: "One-click flag on every summary. Flagged summaries regenerated, error patterns logged. Practitioners see the system responds to corrections." },
];

const LIABILITY_ITEMS = [
  { title: "AI summary = system artifact, not clinical document", desc: "No practitioner authors the summary. It\u2019s decision-support \u2014 analogous to a drug interaction alert. It informs; it doesn\u2019t replace clinical judgment." },
  { title: "\u201CSaw it vs. Should have seen it\u201D", desc: "Sees info and ignores it \u2192 existing clinical liability. Doesn\u2019t see it because patient restricted it \u2192 consent provides legal protection. Clear, auditable boundaries." },
  { title: "Full audit trail", desc: "Every view, consent change, and flag logged with timestamp and identity. Unambiguous answer to who knew what and when." },
];

const PHASES = [
  { phase: "Week 1\u20132", title: "Shadow Mode", desc: "AI summaries generated but only visible to pilot group. No workflow changes. Goal: validate accuracy.", color: "var(--amber)" },
  { phase: "Week 3\u20134", title: "Read-Only", desc: "Summaries visible to all as supplementary info. Labeled \u2018informational only.\u2019 Flag buttons prominent. Goal: build trust.", color: "var(--teal)" },
  { phase: "Month 2", title: "Integrated", desc: "Summaries in standard workflow before encounters. Patient consent live. Quality metrics tracking begins.", color: "var(--green)" },
  { phase: "Month 3+", title: "Full Operation", desc: "All guardrails active. Monthly quality reviews. Quarterly accuracy audits. System earns its place through data.", color: "var(--accent)" },
];

export default function SafetyTab() {
  return (
    <div>
      <div className="card" style={{ background: "var(--amber-bg)", borderColor: "var(--amber-border)" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--amber)", marginBottom: 6 }}>
          AI Safety Guardrails
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.7 }}>
          The biggest gap in healthcare AI isn&apos;t technical capability &mdash; it&apos;s organizational readiness. These guardrails are designed for real clinical practice, not demo environments.
        </p>
      </div>

      {/* Validation Pipeline */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128269;</span> AI Summary Validation Pipeline
        </div>
        <div className="stack stack-md">
          {PIPELINE_STEPS.map((s, i) => (
            <div key={i} className="pipeline-step">
              <div className="pipeline-step-header">
                <div className="pipeline-step-number">{s.n}</div>
                <div className="pipeline-step-title">{s.t}</div>
              </div>
              <p className="pipeline-step-desc">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Liability */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#9878;&#65039;</span> Liability Model
        </div>
        <div className="stack stack-md">
          {LIABILITY_ITEMS.map((item, i) => (
            <div key={i} className="info-block" style={{ background: "var(--amber-bg)", borderColor: "var(--amber-border)" }}>
              <div className="info-block-title" style={{ color: "var(--amber)" }}>{item.title}</div>
              <div className="info-block-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Phased Adoption */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128678;</span> Phased Adoption
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, marginBottom: 14 }}>
          The #1 healthcare AI failure: launching capable systems without workflow integration. This phased approach prevents that.
        </p>
        <div className="stack stack-md">
          {PHASES.map((p, i) => (
            <div key={i} className="phase-item">
              <div className="phase-badge" style={{ background: `color-mix(in srgb, ${p.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${p.color} 20%, transparent)` }}>
                <div className="phase-badge-label" style={{ color: p.color }}>{p.phase}</div>
              </div>
              <div>
                <div className="phase-title">{p.title}</div>
                <div className="phase-desc">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
