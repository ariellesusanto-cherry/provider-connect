import {
  ROLES, CONSENT_LABELS,
  getVisibleConditions, getVisibleMedications, getAISummary,
} from "../data";

function VisibilityItem({ original, display, redacted }) {
  return (
    <div className={`transparency-item${redacted ? " transparency-redacted" : ""}`}>
      {redacted ? (
        <>
          <span className="transparency-item-icon" style={{ color: "var(--amber)" }}>&#9679;</span>
          <div>
            <div className="transparency-item-sees">They see: <em>{display}</em></div>
            <div className="transparency-item-actual">Actual: {original}</div>
          </div>
        </>
      ) : (
        <>
          <span className="transparency-item-icon" style={{ color: "var(--green)" }}>&#9679;</span>
          <span>{display}</span>
        </>
      )}
    </div>
  );
}

export default function TransparencyTab({ consent }) {
  return (
    <div>
      {/* Header */}
      <div className="card" style={{ background: "#FFF1F2", borderColor: "#FDA4AF" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#E11D48", marginBottom: 6 }}>
          Who Sees What
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.7 }}>
          See exactly what each of your providers can access based on your current privacy settings. Green items are fully visible; amber items are shown in a redacted form that protects your privacy while preserving clinical safety.
        </p>
      </div>

      {/* Per-Provider Visibility */}
      {Object.entries(ROLES).map(([rk, ri]) => {
        const conditions = getVisibleConditions(rk, consent);
        const medications = getVisibleMedications(rk, consent);
        const aiSummary = getAISummary(rk, consent);
        const grantedCount = Object.values(consent[rk] || {}).filter(Boolean).length;
        const grantedLabels = Object.entries(consent[rk] || {})
          .filter(([, v]) => v)
          .map(([k]) => CONSENT_LABELS[k]);
        const restrictedLabels = Object.entries(consent[rk] || {})
          .filter(([, v]) => !v)
          .map(([k]) => CONSENT_LABELS[k]);

        return (
          <div key={rk} className="card transparency-provider">
            <div className="transparency-provider-header" style={{ borderLeftColor: ri.color }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                <span style={{ fontSize: 24 }}>{ri.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: ri.color }}>{ri.label}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{ri.title}</div>
                </div>
              </div>
              <div className="transparency-score" style={{ color: ri.color, background: ri.bg }}>
                {grantedCount}/4 shared
              </div>
            </div>

            {/* Consent summary */}
            <div className="transparency-consent-summary">
              {grantedLabels.length > 0 && (
                <div className="transparency-consent-group">
                  <span className="transparency-consent-dot" style={{ color: "var(--green)" }}>&#10003;</span>
                  <span style={{ fontSize: 12, color: "var(--text-sec)" }}>
                    {grantedLabels.join(" · ")}
                  </span>
                </div>
              )}
              {restrictedLabels.length > 0 && (
                <div className="transparency-consent-group">
                  <span className="transparency-consent-dot" style={{ color: "var(--amber)" }}>&#128274;</span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {restrictedLabels.join(" · ")}
                  </span>
                </div>
              )}
            </div>

            {/* AI Summary they see */}
            <div className="transparency-section">
              <div className="transparency-section-label">AI Summary they receive</div>
              <p style={{ fontSize: 12.5, lineHeight: 1.65, color: "var(--text-sec)", margin: 0 }}>{aiSummary}</p>
            </div>

            {/* Conditions */}
            <div className="transparency-section">
              <div className="transparency-section-label">Conditions they see</div>
              <div className="stack stack-sm">
                {conditions.map((c) => (
                  <VisibilityItem
                    key={c.id}
                    original={c.name}
                    display={c.display}
                    redacted={c.redacted}
                  />
                ))}
              </div>
            </div>

            {/* Medications */}
            <div className="transparency-section">
              <div className="transparency-section-label">Medications they see</div>
              <div className="stack stack-sm">
                {medications.map((m, i) => (
                  <VisibilityItem
                    key={i}
                    original={m.name}
                    display={m.display}
                    redacted={m.redacted}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
