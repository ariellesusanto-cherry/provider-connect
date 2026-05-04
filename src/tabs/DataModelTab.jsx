const TIERS = [
  {
    label: "Always Shared",
    color: "var(--green)", bg: "var(--green-bg)", border: "var(--green-border)",
    items: [
      "Active conditions & diagnoses (non-sensitive)",
      "Allergies & contraindications",
      "Non-sensitive medications (name, dose, prescriber)",
      "Patient-reported goals & preferences",
      "Visit dates and provider names",
      "AI-generated shared summaries (role-tailored)",
    ],
  },
  {
    label: "Conditionally Shared (Patient Consent)",
    color: "var(--amber)", bg: "var(--amber-bg)", border: "var(--amber-border)",
    items: [
      "Specific psychiatric diagnoses \u2192 shown as category only without consent",
      "Mental health medication names \u2192 shown as \u2018Centrally-acting medication\u2019 with relevance note",
      "Substance use history \u2192 fully restricted without explicit consent",
      "Interaction flags referencing sensitive medications \u2192 generalized language",
    ],
  },
  {
    label: "Never Shared (Treating Provider Only)",
    color: "var(--red)", bg: "var(--red-bg)", border: "var(--red-border)",
    items: [
      "Detailed psychotherapy session content",
      "Domestic violence / abuse documentation",
      "Sexual health details",
      "HIV / STI status",
      "Raw assessment scores (PHQ-9, GAD-7) \u2014 only trend direction shared",
      "Sensitive differential diagnosis notes",
    ],
  },
];

const AI_INSIGHTS = [
  { title: "AI authors the summary, not practitioners", desc: "No provider \u2018writes\u2019 the shared summary. The system synthesizes from structured data \u2014 the summary is a system artifact, not a clinical note." },
  { title: "Summaries are role-tailored, not universal", desc: "The physio sees MSK-relevant context. The dietitian sees metabolic context. Neither sees a \u2018complete\u2019 record \u2014 they see what helps them do their job safely." },
  { title: "Original notes remain untouched", desc: "Practitioners write in their own style. The shared summary is a separate layer. No incentive to write defensively \u2014 your notes are still yours." },
  { title: "No \u201Cchart wars\u201D", desc: "Practitioners see AI summaries, not each other\u2019s raw notes. No audience effect. A psychologist doesn\u2019t worry how a physio might interpret their clinical language." },
];

export default function DataModelTab() {
  return (
    <div>
      <div className="card" style={{ background: "var(--accent-light)", borderColor: "rgba(37,99,235,0.2)" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--accent)", marginBottom: 6 }}>
          Three-Tier Visibility Model
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.7 }}>
          Every piece of clinical data falls into one of three tiers. The default is always the most restrictive. Patients grant access upward but never need to act to protect their data &mdash; safety is the default, not something requiring effort.
        </p>
      </div>

      {TIERS.map((t, i) => (
        <div key={i} className="card">
          <div className="tier-header" style={{ background: t.bg, border: `1px solid ${t.border}` }}>
            <div className="tier-dot" style={{ background: t.color }} />
            <span className="tier-label" style={{ color: t.color }}>{t.label}</span>
          </div>
          <div className="stack stack-sm">
            {t.items.map((item, j) => (
              <div key={j} className="tier-item">
                <span className="tier-item-dot" style={{ color: t.color }}>&#9679;</span>
                <span className="tier-item-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#10022;</span> How AI Summaries Prevent Liability Creep
        </div>
        <div className="stack stack-md">
          {AI_INSIGHTS.map((item, i) => (
            <div key={i} className="info-block">
              <div className="info-block-title">{item.title}</div>
              <div className="info-block-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
