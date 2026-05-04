import { ROLES, CONSENT_LABELS, WHY_ITEMS } from "../data";

export default function PatientConsent({ consent, onToggle }) {
  const sharedCount = Object.values(consent).reduce(
    (sum, c) => sum + Object.values(c).filter(Boolean).length, 0
  );
  const totalCategories = Object.values(consent).reduce(
    (sum, c) => sum + Object.keys(c).length, 0
  );

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ background: "#FFF1F2", borderColor: "#FDA4AF" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 22 }}>&#128274;</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#E11D48" }}>Your Privacy Settings</div>
            <div style={{ fontSize: 13, color: "var(--text-sec)", lineHeight: 1.5 }}>
              You control exactly what each of your providers can see. Changes take effect immediately across the system.
            </div>
          </div>
        </div>
        <div className="patient-consent-stats">
          <div className="patient-consent-stat">
            <span className="patient-consent-stat-value">{sharedCount}</span>
            <span className="patient-consent-stat-label">of {totalCategories} shared</span>
          </div>
          <div className="patient-consent-stat-bar">
            <div className="patient-consent-stat-fill" style={{ width: `${(sharedCount / totalCategories) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Per-Provider Controls */}
      {Object.entries(ROLES).map(([rk, ri]) => (
        <div key={rk} className="card patient-consent-provider">
          <div className="consent-provider-header">
            <span style={{ fontSize: 22 }}>{ri.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{ri.label}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{ri.title}</div>
            </div>
            <div className="patient-consent-provider-count" style={{ color: ri.color, background: ri.bg }}>
              {Object.values(consent[rk] || {}).filter(Boolean).length}/4
            </div>
          </div>
          <div className="stack stack-sm">
            {Object.entries(CONSENT_LABELS).map(([key, label]) => (
              <div key={key} className="consent-row">
                <div>
                  <span className="consent-label">{label}</span>
                </div>
                <button
                  className={`toggle ${consent[rk]?.[key] ? "on" : "off"}`}
                  onClick={() => onToggle(rk, key)}
                  aria-label={`Toggle ${label} for ${ri.label}`}
                >
                  <div className="toggle-knob" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Why Patient Control Works */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128274;</span> Why Patient Control Works
        </div>
        <div className="stack stack-md">
          {WHY_ITEMS.map((item, i) => (
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
