import { useState } from "react";
import { ROLES, ALLERGIES } from "../data";

const STEPS = [
  {
    id: 1,
    title: "The Situation",
    narrative: "Astrid arrives at physiotherapy with an acute back pain flare-up (8/10). She\u2019s in significant distress. Tom Dunn (physio) considers recommending her GP prescribe codeine for short-term pain relief.",
    systemState: "waiting",
    role: "physio",
  },
  {
    id: 2,
    title: "Allergy Flag \u2014 Always Shared",
    narrative: "Before Tom can even finish his thought, the system displays a prominent allergy alert. Codeine is flagged as a moderate allergy \u2014 nausea and severe dizziness. This information is in the Always Shared tier and visible to ALL practitioners regardless of consent settings.",
    systemState: "allergy_caught",
    role: "physio",
    highlight: "ALLERGY ALERT: Codeine \u2014 Nausea, severe dizziness (moderate severity)",
    highlightType: "red",
  },
  {
    id: 3,
    title: "Medication Interaction \u2014 Redacted but Safe",
    narrative: "Tom also sees that Astrid is on a \u201Ccentrally-acting medication that may affect pain perception.\u201D He doesn\u2019t know it\u2019s sertraline (an SSRI) \u2014 but he doesn\u2019t need to. The system tells him what he needs: this medication affects how Astrid perceives pain and could cause dizziness, making codeine even more dangerous.",
    systemState: "interaction_shown",
    role: "physio",
    highlight: "Centrally-acting medication \u2014 may affect pain perception & appetite. Caution with additional CNS depressants.",
    highlightType: "amber",
  },
  {
    id: 4,
    title: "Safe Outcome",
    narrative: "Tom doesn\u2019t recommend codeine. Instead, he coordinates with Astrid\u2019s GP through the system, noting the acute flare-up and requesting an alternative pain management approach. The GP, who has full medication visibility, can make a safe prescribing decision with full context.",
    systemState: "resolved",
    role: "gp",
    highlight: "Coordination note sent to Dr. Sarah Liu: \u201CAcute flare-up, 8/10 pain. Codeine contraindicated (allergy). Current centrally-acting med noted. Requesting alternative short-term pain management.\u201D",
    highlightType: "green",
  },
  {
    id: 5,
    title: "The Counterfactual",
    narrative: "Without this system: Tom calls Astrid\u2019s GP, but it\u2019s after hours. Astrid mentions she\u2019s taken codeine before \u201Cwith just a bit of nausea.\u201D Tom has no allergy record, no medication list, no way to know about the SSRI interaction. A well-meaning physio, an unreliable patient history, and a dangerous drug interaction \u2014 this is how adverse events happen.",
    systemState: "counterfactual",
    role: null,
  },
];

export default function ScenarioTab({ consent }) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];

  return (
    <div>
      <div className="card" style={{ background: "var(--red-bg)", borderColor: "var(--red-border)" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--red)", marginBottom: 6 }}>
          Interactive Safety Scenario
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.7 }}>
          Walk through a real clinical scenario where the shared summary prevents a dangerous adverse event &mdash; demonstrating that privacy controls and clinical safety aren&apos;t in conflict.
        </p>
      </div>

      {/* Progress */}
      <div className="card" style={{ padding: "16px 22px" }}>
        <div className="scenario-progress">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              className={`scenario-step-dot${i === currentStep ? " active" : ""}${i < currentStep ? " done" : ""}`}
              onClick={() => setCurrentStep(i)}
            >
              {i < currentStep ? "\u2713" : i + 1}
            </button>
          ))}
          <div className="scenario-progress-line">
            <div className="scenario-progress-fill" style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Current Step */}
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          {step.role && (
            <span style={{ fontSize: 22 }}>{ROLES[step.role]?.icon}</span>
          )}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}>
              STEP {step.id} OF {STEPS.length}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>{step.title}</div>
          </div>
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--text)", marginBottom: step.highlight ? 16 : 0 }}>
          {step.narrative}
        </p>

        {step.highlight && (
          <div
            className="scenario-highlight"
            style={{
              background: step.highlightType === "red" ? "var(--red-bg)"
                : step.highlightType === "amber" ? "var(--amber-bg)"
                : "var(--green-bg)",
              borderColor: step.highlightType === "red" ? "var(--red-border)"
                : step.highlightType === "amber" ? "var(--amber-border)"
                : "var(--green-border)",
              borderLeftColor: step.highlightType === "red" ? "var(--red)"
                : step.highlightType === "amber" ? "var(--amber)"
                : "var(--green)",
            }}
          >
            <div style={{
              fontSize: 10, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: 0.5, marginBottom: 4,
              color: step.highlightType === "red" ? "var(--red)"
                : step.highlightType === "amber" ? "var(--amber)"
                : "var(--green)",
            }}>
              {step.highlightType === "red" ? "SYSTEM ALERT" : step.highlightType === "amber" ? "SYSTEM NOTE" : "SYSTEM ACTION"}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text)" }}>{step.highlight}</div>
          </div>
        )}

        {step.systemState === "counterfactual" && (
          <div style={{ marginTop: 16, padding: 16, borderRadius: 8, background: "#1A1D26", color: "#F3F4F6" }}>
            <div style={{ fontSize: 10, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: "#EF4444", marginBottom: 8, letterSpacing: 0.5 }}>
              POTENTIAL ADVERSE EVENT
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 12, display: "flex", gap: 8 }}>
                <span style={{ color: "#EF4444" }}>&#10005;</span>
                <span>Codeine prescribed despite moderate allergy</span>
              </div>
              <div style={{ fontSize: 12, display: "flex", gap: 8 }}>
                <span style={{ color: "#EF4444" }}>&#10005;</span>
                <span>Codeine + SSRI interaction: serotonin syndrome risk</span>
              </div>
              <div style={{ fontSize: 12, display: "flex", gap: 8 }}>
                <span style={{ color: "#EF4444" }}>&#10005;</span>
                <span>Patient self-reported history unreliable under pain</span>
              </div>
              <div style={{ fontSize: 12, display: "flex", gap: 8 }}>
                <span style={{ color: "#EF4444" }}>&#10005;</span>
                <span>No audit trail, no liability clarity</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <button
          className="btn btn-sm btn-ghost"
          onClick={() => setCurrentStep((p) => Math.max(0, p - 1))}
          disabled={currentStep === 0}
        >
          &larr; Previous
        </button>
        <button
          className="btn btn-sm btn-accent"
          onClick={() => setCurrentStep((p) => Math.min(STEPS.length - 1, p + 1))}
          disabled={currentStep === STEPS.length - 1}
        >
          Next &rarr;
        </button>
      </div>

      {/* Key Takeaways */}
      <div className="card">
        <div className="section-title">
          <span className="section-title-icon">&#128161;</span> Key Takeaways
        </div>
        <div className="stack stack-md">
          <div className="info-block" style={{ background: "var(--green-bg)", borderColor: "var(--green-border)" }}>
            <div className="info-block-title" style={{ color: "var(--green)" }}>Privacy and safety are not in tension</div>
            <div className="info-block-desc">The physio never learned Astrid has anxiety or takes an SSRI. But the system still prevented the dangerous prescription. Redaction preserved clinical safety.</div>
          </div>
          <div className="info-block" style={{ background: "var(--green-bg)", borderColor: "var(--green-border)" }}>
            <div className="info-block-title" style={{ color: "var(--green)" }}>Allergies are always shared for a reason</div>
            <div className="info-block-desc">The three-tier model puts allergies in &ldquo;Always Shared&rdquo; because there is no clinical scenario where hiding an allergy protects the patient. This is the minimum necessary standard in action.</div>
          </div>
          <div className="info-block" style={{ background: "var(--green-bg)", borderColor: "var(--green-border)" }}>
            <div className="info-block-title" style={{ color: "var(--green)" }}>The right abstraction level matters</div>
            <div className="info-block-desc">&ldquo;Centrally-acting medication that may affect pain perception&rdquo; gives the physio exactly what they need without exposing the diagnosis. This is what HIPAA&apos;s minimum necessary standard looks like in software.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
