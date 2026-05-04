const STAKEHOLDERS = [
  {
    title: "\u{1FA7A} Providers: reduced charting burden",
    desc: "The AI summary eliminates the most repetitive part of documentation \u2014 reconstructing context from other providers. Instead of spending the first 10 minutes asking Maria to retell her history, the provider opens a pre-populated summary and goes straight to clinical work.",
    color: "var(--accent)", bg: "var(--accent-light)", border: "rgba(37,99,235,0.15)",
  },
  {
    title: "\u{1F464} Patients: one place to see their full health picture",
    desc: "Maria has visibility into her own shared record. She can see what each provider knows, control what\u2019s shared, and stop being the human message relay.",
    color: "var(--purple)", bg: "var(--purple-bg)", border: "var(--purple-border)",
  },
  {
    title: "\u23F1\uFE0F Operations: reduced wait times and intake friction",
    desc: "Pre-populated context collapses check-in and intake workflows. Across a 20-patient day, this recovers 30\u201360 minutes per provider \u2014 time that translates directly into capacity and revenue.",
    color: "var(--teal)", bg: "var(--teal-bg)", border: "var(--teal-border)",
  },
  {
    title: "\u{1F3E5} Clinic leadership: better outcomes, lower risk",
    desc: "Cross-provider coordination reduces missed interactions, contradictory treatments, and duplicated care. The audit trail provides compliance documentation automatically.",
    color: "var(--green)", bg: "var(--green-bg)", border: "var(--green-border)",
  },
];

const SCALE_ITEMS = [
  { title: "More practitioners", desc: "Visibility model handles N providers. Adding a specialty requires defining their default visibility tier." },
  { title: "More clinics", desc: "Same model across boundaries. Cross-clinic sharing adds organizational consent layer; architecture stays identical." },
  { title: "More conditions", desc: "Each condition tagged with sensitivity category. Three-tier model auto-applies. No manual config needed." },
];

export default function RationaleTab() {
  return (
    <div>
      <div className="card" style={{ background: "var(--accent-light)", borderColor: "rgba(37,99,235,0.2)" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--accent)", marginBottom: 6 }}>
          Design Rationale
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.75 }}>
          This system was designed around one principle: <strong>the shared Patient Summary should make care coordination effortless without making any practitioner&apos;s life harder or riskier.</strong>
        </p>
      </div>

      {/* Core Problem */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#10067;</span> The Core Problem
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 12 }}>
          In a multidisciplinary clinic, the patient is the information bridge. Maria tells her physio about medications, reminds her dietitian about back pain limitations, and explains anxiety to her GP. This is inefficient, error-prone, and burdens the sickest patients most.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.75 }}>
          But &ldquo;just share all notes&rdquo; creates three problems: sensitive information exposure, liability expansion, and defensive documentation. This system addresses all three.
        </p>
      </div>

      {/* Insight: Accreditation */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#127973;</span> Insight: Healthcare Accreditation
        </div>
        <div className="insight-block">
          <div className="insight-problem">
            <div className="insight-label" style={{ color: "var(--purple)" }}>Observation</div>
            <p className="insight-text">
              Working on JCI accreditation for a cancer hospital, I saw a recurring pattern: <strong>when auditors arrived, teams scrambled to retrofit documentation rather than having it ready.</strong> Notes were written to pass inspections, not to coordinate care.
            </p>
          </div>
          <div className="insight-solution">
            <div className="insight-label" style={{ color: "var(--green)" }}>Design principle</div>
            <p className="insight-text">
              The shared summary must be generated from data practitioners already create for their own clinical purposes &mdash; not as a separate task. The AI synthesizes from existing structured data: the summary is a byproduct of normal practice, not an additional burden.
            </p>
          </div>
        </div>
      </div>

      {/* Insight: Quality Measurement */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128202;</span> Insight: Quality Measurement
        </div>
        <div className="insight-block">
          <div className="insight-problem">
            <div className="insight-label" style={{ color: "var(--purple)" }}>Observation</div>
            <p className="insight-text">
              Analyzing quality programs for aging populations, I observed the most common failure: <strong>data was reported upward to regulators and leadership, but never flowed back to the people doing the work.</strong>
            </p>
          </div>
          <div className="insight-solution">
            <div className="insight-label" style={{ color: "var(--green)" }}>Design principle</div>
            <p className="insight-text">
              Every quality metric has a practitioner-facing feedback mechanism, not just upward reporting. Monthly dashboards show each provider how the summary affects their patients. Data exists to change behavior closest to the patient.
            </p>
          </div>
        </div>
      </div>

      {/* Insight: AI Strategy */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#129302;</span> Insight: Healthcare AI Strategy
        </div>
        <div className="insight-block">
          <div className="insight-problem">
            <div className="insight-label" style={{ color: "var(--purple)" }}>Observation</div>
            <p className="insight-text">
              Working on agentic AI strategy for a large health insurer, I observed the pattern that kills most healthcare AI: <strong>leadership excitement without workflow integration planning.</strong> Capable systems nobody uses.
            </p>
          </div>
          <div className="insight-solution">
            <div className="insight-label" style={{ color: "var(--green)" }}>Design principle</div>
            <p className="insight-text">
              The phased adoption plan is the core implementation strategy. Shadow Mode lets AI prove itself before anyone depends on it. Every phase has success criteria. The system earns its place rather than being imposed.
            </p>
          </div>
        </div>
      </div>

      {/* CYA */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128737;&#65039;</span> How This Avoids CYA Note Inflation
        </div>
        <div className="cya-grid">
          <div className="cya-item" style={{ background: "var(--red-bg)", border: "1px solid var(--red-border)" }}>
            <div className="cya-label" style={{ color: "var(--red)" }}>Without this system</div>
            <p className="cya-text" style={{ color: "var(--text)" }}>
              &ldquo;If other providers read my notes, I need to be careful. I&apos;ll add disclaimers. Notes become legal artifacts. Length increases 40&ndash;60%, clinical utility decreases.&rdquo;
            </p>
          </div>
          <div className="cya-item" style={{ background: "var(--green-bg)", border: "1px solid var(--green-border)" }}>
            <div className="cya-label" style={{ color: "var(--green)" }}>With this system</div>
            <p className="cya-text" style={{ color: "var(--text)" }}>
              &ldquo;My notes are still mine. Others see an AI summary, not my words. I write for clinical accuracy. The shared layer is the system&apos;s responsibility.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Stakeholders */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128161;</span> Why Every Stakeholder Wants This
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, marginBottom: 14 }}>
          A system only gets adopted if every stakeholder sees direct value:
        </p>
        <div className="stack stack-md">
          {STAKEHOLDERS.map((item, i) => (
            <div key={i} className="info-block" style={{ background: item.bg, borderColor: item.border }}>
              <div className="info-block-title" style={{ color: item.color }}>{item.title}</div>
              <div className="info-block-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scale */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128260;</span> How This Scales
        </div>
        <div className="stack stack-sm">
          {SCALE_ITEMS.map((item, i) => (
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
