import { useState } from "react";
import "./App.css";
import { ROLES, PATIENT, DEFAULT_CONSENT, AUDIT_LOG, CONSENT_LABELS } from "./data";
import SummaryTab from "./tabs/SummaryTab";
import CompareTab from "./tabs/CompareTab";
import DataModelTab from "./tabs/DataModelTab";
import ScenarioTab from "./tabs/ScenarioTab";
import AuditTab from "./tabs/AuditTab";
import RegulatoryTab from "./tabs/RegulatoryTab";
import QualityTab from "./tabs/QualityTab";
import SafetyTab from "./tabs/SafetyTab";
import RationaleTab from "./tabs/RationaleTab";
import PatientDashboard from "./tabs/PatientDashboard";
import PatientConsent from "./tabs/PatientConsent";
import TransparencyTab from "./tabs/TransparencyTab";

const PROVIDER_TABS = [
  { id: "summary", label: "Patient Summary", icon: "\u{1F4CB}" },
  { id: "compare", label: "Compare Views", icon: "\u{1F500}" },
  { id: "scenario", label: "Safety Scenario", icon: "\u{1F6E1}" },
];

const PATIENT_TABS = [
  { id: "dashboard", label: "My Health", icon: "\u{1F49A}" },
  { id: "consent", label: "Privacy", icon: "\u{1F510}" },
  { id: "transparency", label: "Who Sees What", icon: "\u{1F441}" },
];

const SYSTEM_TABS = [
  { id: "data", label: "Data Model", icon: "\u{1F5C2}" },
  { id: "audit", label: "Audit Trail", icon: "\u{1F4DC}" },
  { id: "reg", label: "Regulatory", icon: "⚖" },
  { id: "quality", label: "Quality", icon: "\u{1F4CA}" },
  { id: "safety", label: "AI Safety", icon: "\u{1F9E0}" },
  { id: "rationale", label: "Rationale", icon: "\u{1F4A1}" },
];

const MODES = [
  { id: "provider", label: "Provider", icon: "\u{1FA7A}" },
  { id: "patient", label: "Patient", icon: "\u{1F464}" },
];

export default function App() {
  const [mode, setMode] = useState("provider");
  const [role, setRole] = useState("gp");
  const [tab, setTab] = useState("summary");
  const [consent, setConsent] = useState(DEFAULT_CONSENT);
  const [auditLog, setAuditLog] = useState(AUDIT_LOG);

  const appendAudit = (entry) => {
    const now = new Date();
    const ts = now.toISOString().slice(0, 19).replace("T", " ");
    setAuditLog((prev) => [
      { id: Date.now(), timestamp: ts, ...entry },
      ...prev,
    ]);
  };

  const toggleConsent = (targetRole, key) => {
    const newValue = !consent[targetRole]?.[key];
    setConsent((prev) => ({
      ...prev,
      [targetRole]: { ...prev[targetRole], [key]: newValue },
    }));
    appendAudit({
      actor: PATIENT.name,
      actorRole: "patient",
      action: "consent_changed",
      target: `${ROLES[targetRole]?.title} → ${key}`,
      detail: `${newValue ? "Granted" : "Revoked"}: ${CONSENT_LABELS[key]}`,
    });
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    if (newMode === "provider" && !PROVIDER_TABS.find((t) => t.id === tab)) {
      setTab("summary");
    }
    if (newMode === "patient" && !PATIENT_TABS.find((t) => t.id === tab)) {
      setTab("dashboard");
    }
    if (newMode === "system" && !SYSTEM_TABS.find((t) => t.id === tab)) {
      setTab("data");
    }
  };

  const activeTabs =
    mode === "provider" ? PROVIDER_TABS :
    mode === "patient" ? PATIENT_TABS :
    SYSTEM_TABS;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="header-logo">P</div>
            <div>
              <div className="header-title">ProviderConnect</div>
              <div className="header-subtitle">Shared Patient Summary</div>
            </div>
          </div>
          <div className="header-right">
            <div className="header-patient">
              {PATIENT.name}, {PATIENT.age} &middot; DOB: {PATIENT.dob}
            </div>
            <button
              className={`header-settings-btn${mode === "system" ? " active" : ""}`}
              onClick={() => switchMode(mode === "system" ? "provider" : "system")}
              title="System Settings"
              aria-label="System settings"
            >
              &#9881;&#65039;
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="app-layout">
        {/* Mode Switcher */}
        <div className="mode-bar">
          <div className="mode-switcher">
            {MODES.map((m) => (
              <button
                key={m.id}
                className={`mode-btn${mode === m.id ? " active" : ""}${m.id === "patient" ? " mode-btn-patient" : ""}`}
                onClick={() => switchMode(m.id)}
              >
                <span className="mode-btn-icon">{m.icon}</span>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Role Selector (provider mode only) */}
        {mode === "provider" && (
          <div className="role-section">
            <div className="role-section-label">Viewing as</div>
            <div className="role-grid">
              {Object.entries(ROLES).map(([key, r]) => (
                <button
                  key={key}
                  className={`role-btn${role === key ? " active" : ""}`}
                  onClick={() => setRole(key)}
                  style={
                    role === key
                      ? { borderColor: r.color, background: r.bg, color: r.color }
                      : undefined
                  }
                >
                  <span className="role-icon">{r.icon}</span>
                  <div className="role-info">
                    <div
                      className="role-name"
                      style={role === key ? { color: r.color } : undefined}
                    >
                      {r.label}
                    </div>
                    <div className="role-title">{r.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sub-Tab Navigation */}
        <div className="tab-nav">
          {activeTabs.map((t) => (
            <button
              key={t.id}
              className={`tab-btn${tab === t.id ? " active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.icon && <span className="tab-btn-icon" aria-hidden="true">{t.icon}</span>}
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content" key={tab === "summary" ? tab + role : tab}>
          {/* Provider tabs */}
          {tab === "summary" && <SummaryTab role={role} consent={consent} onEmergencyOverride={appendAudit} />}
          {tab === "compare" && <CompareTab consent={consent} />}
          {tab === "scenario" && <ScenarioTab consent={consent} />}

          {/* Patient tabs */}
          {tab === "dashboard" && <PatientDashboard consent={consent} />}
          {tab === "consent" && <PatientConsent consent={consent} onToggle={toggleConsent} />}
          {tab === "transparency" && <TransparencyTab consent={consent} />}

          {/* System tabs */}
          {tab === "data" && <DataModelTab />}
          {tab === "audit" && <AuditTab auditLog={auditLog} />}
          {tab === "reg" && <RegulatoryTab />}
          {tab === "quality" && <QualityTab />}
          {tab === "safety" && <SafetyTab />}
          {tab === "rationale" && <RationaleTab />}
        </div>
      </div>
    </div>
  );
}
