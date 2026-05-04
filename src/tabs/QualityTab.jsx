const METRICS = [
  {
    cat: "Care Coordination", icon: "\u{1F517}",
    items: [
      { m: "Redundant intake time eliminated", base: "~10 min per new-to-provider visit", target: "< 2 min (pre-populated)", how: "Timestamp: visit start to first clinical action, before vs. after summary access" },
      { m: "Contradictory treatment plans flagged", base: "0 (no cross-provider visibility)", target: "100% auto-detection", how: "AI summary includes contradiction alerts when treatment plans conflict" },
      { m: "Medication interaction alerts surfaced", base: "Only within single prescriber", target: "Cross-provider interactions flagged", how: "Full medication list compared against interaction databases regardless of visibility tier" },
    ],
  },
  {
    cat: "Documentation Quality", icon: "\u{1F4C4}",
    items: [
      { m: "Average note length (CYA proxy)", base: "Measure at launch", target: "No increase over 6 months", how: "Length increase after launch suggests defensive writing \u2014 trigger investigation" },
      { m: "Defensive language frequency", base: "NLP baseline of hedging markers", target: "No increase", how: "NLP scan for \u201Cper patient report,\u201D \u201Cpatient was advised,\u201D etc. \u2014 increase signals CYA behavior" },
      { m: "AI summary accuracy (flag rate)", base: "N/A", target: "< 5% flagged for correction", how: "One-click practitioner flags. High rate = AI quality issue; low rate = trust building" },
    ],
  },
  {
    cat: "Patient Experience", icon: "\u{1F464}",
    items: [
      { m: "\u201CRepeat my history\u201D conversations eliminated", base: "Survey: % requiring full retelling", target: "< 10% of visits", how: "Post-visit survey: \u201CDid you have to repeat information your provider should have known?\u201D" },
      { m: "Consent portal engagement", base: "N/A", target: "> 60% review settings in month 1", how: "Track logins. Low engagement = defaults working OR awareness gap \u2014 distinguish via survey" },
      { m: "Perceived care continuity", base: "Pre-launch survey", target: "20%+ improvement", how: "Quarterly survey: \u201Cmy providers communicate well\u201D score" },
    ],
  },
];

const FEEDBACK_ITEMS = [
  { title: "Monthly team dashboards, not quarterly reports", desc: "Every practitioner sees how the summary affects their patients\u2019 coordination, documentation patterns, and satisfaction. The people doing the work see the impact." },
  { title: "Anomaly triggers, not annual reviews", desc: "If defensive documentation markers increase for a provider, the system flags it immediately. Early detection prevents cultural drift." },
  { title: "AI quality is self-improving", desc: "Every flag becomes training signal. The system tracks which information types are most flagged and prioritizes accuracy where it matters most." },
];

export default function QualityTab() {
  return (
    <div>
      <div className="card" style={{ background: "var(--teal-bg)", borderColor: "var(--teal-border)" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--teal)", marginBottom: 6 }}>
          Quality Metrics Framework
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.7 }}>
          A system that can&apos;t prove it improves care is just a feature, not an intervention. Every metric here is designed to be actionable at the practitioner level, not just reportable to administrators.
        </p>
      </div>

      {METRICS.map((g, i) => (
        <div key={i} className="card">
          <div className="section-title">
            <span className="section-title-icon">{g.icon}</span> {g.cat}
          </div>
          <div className="stack stack-md">
            {g.items.map((item, j) => (
              <div key={j} className="metric-card">
                <div className="metric-name">{item.m}</div>
                <div className="metric-grid">
                  <div className="metric-value" style={{ background: "var(--red-bg)", border: "1px solid var(--red-border)" }}>
                    <div className="metric-value-label" style={{ color: "var(--red)" }}>Baseline</div>
                    <div className="metric-value-text">{item.base}</div>
                  </div>
                  <div className="metric-value" style={{ background: "var(--green-bg)", border: "1px solid var(--green-border)" }}>
                    <div className="metric-value-label" style={{ color: "var(--green)" }}>Target</div>
                    <div className="metric-value-text">{item.target}</div>
                  </div>
                </div>
                <div className="metric-how">
                  <span className="metric-how-label">Measurement: </span>
                  {item.how}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128260;</span> Closing the Feedback Loop
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, marginBottom: 14 }}>
          Collecting metrics without closing the loop is the most common quality program failure:
        </p>
        <div className="stack stack-md">
          {FEEDBACK_ITEMS.map((item, i) => (
            <div key={i} className="info-block" style={{ background: "var(--teal-bg)", borderColor: "var(--teal-border)" }}>
              <div className="info-block-title" style={{ color: "var(--teal)" }}>{item.title}</div>
              <div className="info-block-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
