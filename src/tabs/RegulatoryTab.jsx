const HIPAA_ITEMS = [
  {
    title: "Role-based views automate minimum necessary",
    desc: "Rather than relying on practitioners to decide what is \u201Cminimum necessary\u201D per-request \u2014 which HIPAA acknowledges is impractical \u2014 the system automates it. A physio view is pre-filtered to MSK-relevant information. The architecture enforces the standard.",
  },
  {
    title: "Sensitive medications at the right abstraction level",
    desc: "When the physio sees \u201CCentrally-acting medication \u2014 may affect pain perception,\u201D this is minimum necessary in practice. They get the clinical effect without the diagnosis or drug name.",
  },
  {
    title: "Treatment exception preserved",
    desc: "HIPAA exempts treatment-purpose disclosures. When Astrid grants her GP full mental health access for medication coordination, that mirrors HIPAA\u2019s treatment exception \u2014 the GP needs full context to prescribe safely.",
  },
];

const INTL_ITEMS = [
  { title: "Purpose limitation (GDPR Article 5)", desc: "Each practitioner\u2019s view is scoped to their clinical purpose. The dietitian doesn\u2019t see psychology notes because nutrition management doesn\u2019t require them." },
  { title: "Data minimization by design", desc: "The AI summary layer is itself a data minimization tool \u2014 synthesizing minimum clinically relevant information per role rather than exposing raw notes." },
  { title: "Dynamic consent (emerging best practice)", desc: "Research on My Health Record failures recommended dynamic consent \u2014 interactive, granular, revocable. ProviderConnect\u2019s consent portal implements exactly this." },
];

export default function RegulatoryTab() {
  return (
    <div>
      <div className="card" style={{ background: "var(--indigo-bg)", borderColor: "var(--indigo-border)" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--indigo)", marginBottom: 6 }}>
          Regulatory Grounding
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.7 }}>
          Every major design decision maps to established regulatory principles and lessons from real-world health information sharing systems &mdash; including where those systems failed.
        </p>
      </div>

      {/* My Health Record */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#127462;&#127482;</span> Lesson from Australia&apos;s My Health Record
        </div>
        <div className="insight-block">
          <div className="insight-problem">
            <div className="insight-label" style={{ color: "var(--red)" }}>What went wrong</div>
            <p className="insight-text">
              Australia&apos;s national health record started as opt-in, but after spending billions, fewer than 25% enrolled. The government switched to opt-out in 2018, automatically enrolling everyone &mdash; sparking a major privacy backlash. Citizens found opting out difficult and sometimes paradoxical. The core failure: the system was designed around government data needs, not patient trust. Recent 2025 legislation has continued pushing toward mandatory sharing with civil penalties for providers who don&apos;t upload.
            </p>
          </div>
          <div className="insight-solution">
            <div className="insight-label" style={{ color: "var(--green)" }}>How ProviderConnect avoids this</div>
            <p className="insight-text">
              Our system uses &ldquo;safe by default, open by choice&rdquo; &mdash; the opposite approach. The shared summary exists within a single clinic, not a centralized government database. Patients don&apos;t need to act to be protected; they only act to share more. Consent is granular and revocable, not binary. The lesson: if you make sharing feel safe, people share. If you make it feel forced, they revolt.
            </p>
          </div>
        </div>
      </div>

      {/* HIPAA */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#127482;&#127480;</span> HIPAA Minimum Necessary Standard &mdash; Embedded in Architecture
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, marginBottom: 14 }}>
          HIPAA&apos;s Privacy Rule requires covered entities to limit PHI disclosure to the minimum necessary to accomplish the intended purpose. This principle is the foundation of ProviderConnect&apos;s role-based views.
        </p>
        <div className="stack stack-md">
          {HIPAA_ITEMS.map((item, i) => (
            <div key={i} className="info-block" style={{ background: "var(--accent-light)", borderColor: "rgba(37,99,235,0.15)" }}>
              <div className="info-block-title" style={{ color: "var(--accent)" }}>{item.title}</div>
              <div className="info-block-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* International */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#127760;</span> International Design Principles
        </div>
        <div className="stack stack-md">
          {INTL_ITEMS.map((item, i) => (
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
