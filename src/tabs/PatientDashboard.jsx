import {
  ROLES, PATIENT, ALLERGIES,
  getVisibleConditions, getVisibleMedications, getVisibleVisits, getVisiblePlans, getAISummary,
} from "../data";

const FULL_CONSENT = {
  patient: { mental_health_detail: true, all_medications: true, session_content: false, substance_history: false },
};

export default function PatientDashboard({ consent }) {
  const conditions = getVisibleConditions("patient", FULL_CONSENT);
  const medications = getVisibleMedications("patient", FULL_CONSENT);
  const visits = getVisibleVisits("patient", FULL_CONSENT);
  const plans = getVisiblePlans("patient", FULL_CONSENT);
  const summary = getAISummary("patient", consent);

  const sharedCount = Object.values(consent).reduce(
    (sum, c) => sum + Object.values(c).filter(Boolean).length, 0
  );
  const totalCategories = Object.values(consent).reduce(
    (sum, c) => sum + Object.keys(c).length, 0
  );

  return (
    <div>
      {/* Welcome Banner */}
      <div className="patient-welcome">
        <div className="patient-welcome-avatar">&#128100;</div>
        <div>
          <div className="patient-welcome-name">Welcome, {PATIENT.name.split(" ")[0]}</div>
          <div className="patient-welcome-sub">
            Your unified health view &mdash; {Object.keys(ROLES).length} providers coordinating your care
          </div>
        </div>
        <div className="patient-welcome-stat">
          <div className="patient-welcome-stat-value">{sharedCount}/{totalCategories}</div>
          <div className="patient-welcome-stat-label">data points shared</div>
        </div>
      </div>

      {/* Health Summary */}
      <div className="card patient-summary-card">
        <div className="ai-summary-header">
          <div className="ai-summary-icon" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>&#10022;</div>
          <div style={{ flex: 1 }}>
            <div className="ai-summary-label" style={{ color: "var(--accent)" }}>Your Health Summary</div>
            <div className="ai-summary-sublabel">Written in plain language from your health records</div>
          </div>
        </div>
        <p className="ai-summary-text">{summary}</p>
      </div>

      {/* Your Care Team */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128101;</span> Your Care Team
        </div>
        <div className="patient-team-grid">
          {Object.entries(ROLES).map(([key, r]) => (
            <div key={key} className="patient-team-card" style={{ borderTopColor: r.color }}>
              <span style={{ fontSize: 24 }}>{r.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{r.label}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Conditions */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128203;</span> Your Conditions
        </div>
        <div className="stack stack-sm">
          {conditions.map((c) => (
            <div key={c.id} className="row-item">
              <div>
                <div className="row-item-primary">{c.display}</div>
                <div className="row-item-secondary">
                  Managed by: {c.managedBy.split(",").map((r) => ROLES[r]?.label).join(", ")}
                </div>
              </div>
              <span className={`badge ${c.severity === "moderate" ? "badge-amber" : "badge-green"}`}>
                {c.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Medications */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128138;</span> Your Medications
        </div>
        <div className="stack stack-sm">
          {medications.map((m, i) => (
            <div key={i} className="row-item">
              <div>
                <div className="row-item-primary">{m.display}</div>
                <div className="row-item-secondary">
                  {m.dose} &bull; Prescribed by {ROLES[m.prescriber]?.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128680;</span> Allergies & Contraindications
          <span className="badge badge-green" style={{ marginLeft: "auto" }}>Shared with all providers</span>
        </div>
        <div className="allergy-grid">
          {ALLERGIES.map((a, i) => (
            <div key={i} className="allergy-item">
              <div className="allergy-name">{a.allergen}</div>
              <div className="allergy-reaction">{a.reaction}</div>
              <span className="badge badge-red">{a.severity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Your Goals */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#127919;</span> Your Goals
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.75, fontStyle: "italic", color: "var(--text-sec)" }}>
          &ldquo;{PATIENT.patientGoals}&rdquo;
        </p>
      </div>

      {/* Recent Appointments */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128197;</span> Your Recent Appointments
        </div>
        <div className="stack stack-md">
          {visits.map((v) => {
            const vR = ROLES[v.provider];
            return (
              <div key={v.id} className="visit-card">
                <div className="visit-header">
                  <div className="visit-provider">
                    <span className="visit-provider-icon">{vR.icon}</span>
                    <div>
                      <div className="visit-title">{v.title}</div>
                      <div className="visit-meta">{v.providerName} &bull; {v.date}</div>
                    </div>
                  </div>
                </div>
                <p className="visit-body">{v.sharedSummary}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Care Plans */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128221;</span> Your Care Plans
        </div>
        <div className="stack stack-md">
          {plans.map((tp, i) => {
            const pR = ROLES[tp.provider];
            return (
              <div key={i} className="visit-card">
                <div className="visit-header">
                  <div className="visit-provider">
                    <span className="visit-provider-icon">{pR.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{pR.label}</span>
                  </div>
                </div>
                <p className="visit-body">{tp.sharedPlan}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
