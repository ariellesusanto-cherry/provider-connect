// ProviderConnect — Data Layer

export const ROLES = {
  gp: { label: "Dr. Sarah Jones", title: "General Practitioner", initials: "SJ", icon: "\u{1FA7A}", color: "#1E3A5F", bg: "#DCE4F0" },
  physio: { label: "Tom Dunn", title: "Physiotherapist", initials: "TD", icon: "\u{1F9B4}", color: "#A04222", bg: "#F2DDD0" },
  psych: { label: "Dr. Anya Mehta", title: "Psychologist", initials: "AM", icon: "\u{1F9E0}", color: "#7A2E3D", bg: "#EFD8DC" },
  dietitian: { label: "Rachel Lee", title: "Dietitian", initials: "RL", icon: "\u{1F957}", color: "#8B6420", bg: "#EFE4C4" },
};

export const PATIENT = {
  name: "Astrid Chen",
  age: 58,
  dob: "1967-09-14",
  patientGoals:
    "Reduce back pain enough to return to gardening. Manage weight without extreme diets. Feel less anxious about health and reduce day-to-day anxiety.",
};

export const CONDITIONS = [
  { id: "c1", name: "Chronic lower back pain (L4-L5 disc degeneration)", category: "musculoskeletal", severity: "moderate", managedBy: "gp,physio", sensitive: false },
  { id: "c2", name: "Generalized Anxiety Disorder", category: "mental_health", severity: "moderate", managedBy: "psych,gp", sensitive: true, redactedView: "Mood disorder (managed, stable)" },
  { id: "c3", name: "Pre-diabetes (HbA1c 6.2%)", category: "metabolic", severity: "mild", managedBy: "gp,dietitian", sensitive: false },
  { id: "c4", name: "Mild obesity (BMI 31.4)", category: "metabolic", severity: "mild", managedBy: "gp,dietitian", sensitive: false },
  { id: "c5", name: "Insomnia (secondary to anxiety)", category: "mental_health", severity: "mild", managedBy: "psych,gp", sensitive: true, redactedView: "Sleep disturbance (under treatment)" },
];

export const MEDICATIONS = [
  {
    name: "Sertraline 50mg", dose: "daily", prescriber: "gp", sensitive: true,
    redactedView: "Centrally-acting medication — may affect pain perception & appetite",
    interactionFlag: null,
    roleRelevance: {
      physio: "May affect pain perception and cause dizziness during exercises. Monitor for postural instability.",
      dietitian: "May affect appetite regulation. Weight changes are a known side effect — relevant to nutrition planning.",
    },
  },
  { name: "Paracetamol 500mg", dose: "as needed, max 4x/day", prescriber: "gp", sensitive: false, interactionFlag: null, roleRelevance: {} },
  { name: "Meloxicam 7.5mg", dose: "daily with food", prescriber: "gp", sensitive: false, interactionFlag: "Monitor GI symptoms — long-term NSAID use with pre-diabetes", roleRelevance: {} },
  {
    name: "Melatonin 2mg", dose: "nightly", prescriber: "psych", sensitive: true,
    redactedView: "Sleep aid (non-prescription)",
    interactionFlag: null,
    roleRelevance: {
      physio: "May cause morning drowsiness. Consider scheduling sessions later in the day.",
      dietitian: "No significant dietary interactions.",
    },
  },
];

export const ALLERGIES = [
  { allergen: "Codeine", reaction: "Nausea, severe dizziness", severity: "moderate" },
  { allergen: "Latex", reaction: "Contact dermatitis", severity: "mild" },
];

export const VISITS = [
  {
    id: "v1", date: "2026-02-28", provider: "gp", providerName: "Dr. Sarah Jones",
    title: "Quarterly metabolic review + back pain follow-up",
    summary: "HbA1c stable at 6.2%. Weight unchanged at 84kg. Astrid reports back pain is 5/10, improved from 7/10 three months ago — attributes improvement to physiotherapy. Discussed continuing current NSAID regimen with periodic liver function monitoring. Referred to dietitian for structured pre-diabetes nutrition plan.",
    sensitivePortion: "Astrid mentioned increased worry about her mother’s recent Alzheimer’s diagnosis. Discussed whether current sertraline dose is adequate — agreed to monitor for 4 weeks before considering adjustment. PHQ-9 score: 8 (mild).",
    sharedSummary: "Quarterly review. HbA1c stable at 6.2%, weight 84kg. Back pain improving (5/10, down from 7/10). Continuing current pain management. Dietitian referral placed for pre-diabetes nutrition support.",
    tags: ["metabolic", "pain", "referral"],
  },
  {
    id: "v2", date: "2026-02-21", provider: "physio", providerName: "Tom Dunn",
    title: "Session 8 — Lower back rehabilitation",
    summary: "Progressed to Stage 2 core stability program. Astrid completing home exercises 4/7 days (up from 2/7). Lumbar flexion ROM improved 15° since baseline. Pain during posterior chain loading reduced. Introduced gentle deadlift pattern with 5kg. Next session: reassess and consider hydrotherapy.",
    sensitivePortion: null,
    sharedSummary: "Physiotherapy session 8. Core stability progressing well. Home exercise compliance improving. Range of motion gains noted. Advancing rehabilitation program.",
    tags: ["musculoskeletal", "rehabilitation"],
  },
  {
    id: "v3", date: "2026-02-14", provider: "psych", providerName: "Dr. Anya Mehta",
    title: "Session 12 — CBT for anxiety management",
    summary: "Continued cognitive restructuring around health anxiety. Astrid identified catastrophizing pattern linked to mother’s Alzheimer’s diagnosis — fear of own cognitive decline. Practiced thought record exercise in session. Sleep diary shows improvement: average onset now 25min (down from 50min). GAD-7: 9 (mild-moderate, down from 14 at intake).",
    sensitivePortion: "Full session content is restricted. Astrid processing grief around mother’s diagnosis and childhood caregiving dynamics. Exploring relationship between unresolved family role expectations and current anxiety presentation.",
    sharedSummary: "Psychology session. Anxiety management ongoing — clinically improving. Sleep quality improving with current approach.",
    tags: ["mental_health"],
  },
  {
    id: "v4", date: "2026-02-07", provider: "dietitian", providerName: "Rachel Lee",
    title: "Initial nutrition assessment — pre-diabetes management",
    summary: "Comprehensive dietary assessment completed. Current intake: high refined carbohydrates, irregular meal timing, low fibre. Astrid motivated but reports emotional eating when anxious. Designed initial meal plan: Mediterranean-style, 3 meals + 2 snacks, emphasis on low-GI foods and increased vegetable intake. Goal: reduce HbA1c to <6.0% over 6 months without calorie restriction.",
    sensitivePortion: null,
    sharedSummary: "Initial nutrition assessment. Mediterranean-style meal plan initiated for pre-diabetes management. Targeting HbA1c reduction through dietary modification. Patient motivated.",
    tags: ["metabolic", "nutrition"],
  },
];

export const TREATMENT_PLANS = [
  {
    provider: "gp",
    plan: "Continue meloxicam with quarterly liver function monitoring. Track HbA1c every 3 months. Review mental health medication in 4 weeks. Coordinate with physio on pain trajectory.",
    sensitivePlan: "Monitor sertraline efficacy given increased anxiety around family health concerns. Consider dose adjustment if PHQ-9 or GAD-7 worsen at next review.",
    sharedPlan: "Pain management ongoing with periodic monitoring. Metabolic tracking every 3 months. Coordinating with physiotherapy and dietetics.",
  },
  {
    provider: "physio",
    plan: "Progress to Stage 3 core stability by end of March. Target 5/7 day home exercise compliance. Reassess for hydrotherapy candidacy. Long-term goal: return to gardening by May.",
    sensitivePlan: null,
    sharedPlan: "Rehabilitation progressing through staged core stability program. Targeting return to gardening activities by May 2026.",
  },
  {
    provider: "psych",
    plan: "Continue weekly CBT sessions (4 more planned). Focus on health anxiety and grief processing. Reassess GAD-7 monthly. Coordinate with GP on medication review if anxiety worsens.",
    sensitivePlan: "Deeper grief work around mother’s diagnosis likely needed. May recommend extending beyond 16-session initial plan.",
    sharedPlan: "Psychological support ongoing. Anxiety improving with current treatment approach.",
  },
  {
    provider: "dietitian",
    plan: "Follow-up in 3 weeks to assess meal plan adherence. Track food diary. Coordinate with GP on HbA1c trajectory. Explore cooking strategies that accommodate back pain limitations.",
    sensitivePlan: null,
    sharedPlan: "Nutrition plan in progress. Follow-up scheduled to assess adherence. Coordinating with GP on metabolic targets.",
  },
];

export const DEFAULT_CONSENT = {
  gp: { mental_health_detail: true, all_medications: true, session_content: false, substance_history: false },
  physio: { mental_health_detail: false, all_medications: false, session_content: false, substance_history: false },
  psych: { mental_health_detail: true, all_medications: true, session_content: true, substance_history: false },
  dietitian: { mental_health_detail: false, all_medications: false, session_content: false, substance_history: false },
};

// AI summaries stored as ordered segments, each with a list of source IDs
// (visit IDs like "v1" or condition IDs like "c1") so the UI can render inline
// citation pills. Plain text for a role is the segments joined with spaces.

export const AI_SUMMARY_SEGMENTS = {
  gp: [
    { text: "Astrid is a 58-year-old woman managing chronic lower back pain, generalized anxiety, and pre-diabetes.", sources: ["c1", "c2", "c3"] },
    { text: "Her back pain is improving with physiotherapy (5/10, down from 7/10).", sources: ["v1", "v2"] },
    { text: "HbA1c is stable at 6.2% — dietitian has initiated a Mediterranean-style nutrition plan.", sources: ["v1", "v4"] },
    { text: "Anxiety is being managed through CBT with Dr. Mehta — GAD-7 trending down.", sources: ["v3"] },
    { text: "Current sertraline dose under review.", sources: ["v1"] },
    { text: "Key coordination point: emotional eating pattern may link anxiety management to metabolic outcomes.", sources: ["v3", "v4"] },
  ],
  physio: [
    { text: "Astrid presents for ongoing lower back rehabilitation (L4-L5 disc degeneration).", sources: ["c1"] },
    { text: "She is progressing well through Stage 2 core stability and reports improved home exercise compliance (4/7 days).", sources: ["v2"] },
    { text: "Pain has decreased from 7/10 to 5/10.", sources: ["v1", "v2"] },
    { text: "She is on daily NSAIDs and a centrally-acting medication that may affect pain perception.", sources: ["v1"] },
    { text: "Goal: return to gardening by May.", sources: [] },
    { text: "Also managing a metabolic condition through dietary changes, which may affect energy levels.", sources: ["c3", "v4"] },
  ],
  psych: [
    { text: "Astrid is in Session 12 of CBT for generalized anxiety disorder.", sources: ["v3", "c2"] },
    { text: "GAD-7 has improved from 14 to 9.", sources: ["v3"] },
    { text: "Primary triggers include health concerns and her mother’s recent Alzheimer’s diagnosis.", sources: ["v1", "v3"] },
    { text: "Sleep improving (onset 25min, down from 50min).", sources: ["v3"] },
    { text: "On sertraline 50mg (GP — dose review pending).", sources: ["v1"] },
    { text: "Chronic pain managed by physiotherapy may interact with anxiety presentation.", sources: ["c1", "v2"] },
    { text: "Emotional eating noted by dietitian — potential integrated approach.", sources: ["v4"] },
  ],
  dietitian: [
    { text: "Astrid referred for pre-diabetes nutrition management (HbA1c 6.2%, BMI 31.4).", sources: ["v1", "c3", "c4"] },
    { text: "High refined carb intake, irregular meal timing.", sources: ["v4"] },
    { text: "Mediterranean-style meal plan initiated.", sources: ["v4"] },
    { text: "Motivated but reports emotional eating linked to stress.", sources: ["v4"] },
    { text: "Chronic back pain (physiotherapy) may limit food preparation.", sources: ["c1"] },
    { text: "On a centrally-acting medication that may affect appetite.", sources: ["v1"] },
    { text: "Coordinate with GP on metabolic trajectory.", sources: ["v1"] },
  ],
  patient: [
    { text: "Here’s a summary of your current health picture, Astrid.", sources: [] },
    { text: "You’re being treated for chronic lower back pain, which is improving with physiotherapy — your pain has gone from 7/10 to 5/10.", sources: ["v1", "v2", "c1"] },
    { text: "You’re also working with a dietitian on a Mediterranean-style eating plan to help manage your blood sugar levels (HbA1c 6.2%).", sources: ["v4", "c3"] },
    { text: "Your anxiety management sessions with Dr. Mehta are helping, and your sleep is improving.", sources: ["v3"] },
    { text: "Your GP is coordinating your care across all providers.", sources: ["v1"] },
  ],
};

const RESTRICTED_MEDS_PHYSIO = [
  { text: "Astrid presents for ongoing lower back rehabilitation (L4-L5 disc degeneration).", sources: ["c1"] },
  { text: "She is progressing well through Stage 2 core stability and reports improved home exercise compliance (4/7 days).", sources: ["v2"] },
  { text: "Pain has decreased from 7/10 to 5/10.", sources: ["v1", "v2"] },
  { text: "She is on daily NSAIDs.", sources: ["v1"] },
  { text: "Goal: return to gardening by May.", sources: [] },
  { text: "Also managing a metabolic condition through dietary changes, which may affect energy levels.", sources: ["c3", "v4"] },
];
const RESTRICTED_MEDS_DIETITIAN = [
  { text: "Astrid referred for pre-diabetes nutrition management (HbA1c 6.2%, BMI 31.4).", sources: ["v1", "c3", "c4"] },
  { text: "High refined carb intake, irregular meal timing.", sources: ["v4"] },
  { text: "Mediterranean-style meal plan initiated.", sources: ["v4"] },
  { text: "Motivated but reports emotional eating linked to stress.", sources: ["v4"] },
  { text: "Chronic back pain (physiotherapy) may limit food preparation.", sources: ["c1"] },
  { text: "Coordinate with GP on metabolic trajectory.", sources: ["v1"] },
];

export const AI_SUMMARY_SEGMENTS_RESTRICTED_MEDS = {
  physio: RESTRICTED_MEDS_PHYSIO,
  dietitian: RESTRICTED_MEDS_DIETITIAN,
};

export const AI_SUMMARY_SEGMENTS_RESTRICTED_MH = {
  gp: [
    { text: "Astrid is a 58-year-old woman managing chronic lower back pain and pre-diabetes.", sources: ["c1", "c3"] },
    { text: "Her back pain is improving with physiotherapy (5/10, down from 7/10).", sources: ["v1", "v2"] },
    { text: "HbA1c is stable at 6.2% — dietitian has initiated a Mediterranean-style nutrition plan.", sources: ["v1", "v4"] },
    { text: "A mood disorder is being managed and is stable.", sources: ["c2"] },
    { text: "Key coordination point: emotional eating pattern may link current treatment to metabolic outcomes.", sources: ["v4"] },
  ],
  physio: RESTRICTED_MEDS_PHYSIO,
  dietitian: RESTRICTED_MEDS_DIETITIAN,
};

// Visibility helpers
export function getVisibleConditions(role, consent) {
  return CONDITIONS.map((c) => {
    if (!c.sensitive) return { ...c, display: c.name };
    return consent[role]?.mental_health_detail
      ? { ...c, display: c.name }
      : { ...c, display: c.redactedView, redacted: true };
  });
}

export function getVisibleMedications(role, consent) {
  return MEDICATIONS.map((m) => {
    if (!m.sensitive) return { ...m, display: m.name };
    return consent[role]?.all_medications
      ? { ...m, display: m.name }
      : { ...m, display: m.redactedView, redacted: true };
  });
}

export function getVisibleVisits(role, consent) {
  return VISITS.map((v) => {
    if (v.provider === role)
      return {
        ...v,
        displaySummary: v.summary + (v.sensitivePortion ? "\n\n" + v.sensitivePortion : ""),
        access: "full",
      };
    if (v.tags.includes("mental_health") && !consent[role]?.mental_health_detail)
      return { ...v, displaySummary: v.sharedSummary, access: "limited" };
    return { ...v, displaySummary: v.sharedSummary, access: "shared" };
  });
}

export function getVisiblePlans(role, consent) {
  return TREATMENT_PLANS.map((tp) => {
    if (tp.provider === role)
      return {
        ...tp,
        displayPlan: tp.plan + (tp.sensitivePlan ? "\n⚕️ " + tp.sensitivePlan : ""),
        access: "full",
      };
    return { ...tp, displayPlan: tp.sharedPlan, access: "shared" };
  });
}

export function getAISummarySegments(role, consent) {
  if (role === "patient") return AI_SUMMARY_SEGMENTS.patient;
  const hasMeds = consent[role]?.all_medications;
  const hasMH = consent[role]?.mental_health_detail;
  if (!hasMH && AI_SUMMARY_SEGMENTS_RESTRICTED_MH[role]) {
    return AI_SUMMARY_SEGMENTS_RESTRICTED_MH[role];
  }
  if (!hasMeds && AI_SUMMARY_SEGMENTS_RESTRICTED_MEDS[role]) {
    return AI_SUMMARY_SEGMENTS_RESTRICTED_MEDS[role];
  }
  return AI_SUMMARY_SEGMENTS[role];
}

export function getAISummary(role, consent) {
  return getAISummarySegments(role, consent).map((s) => s.text).join(" ");
}

// Resolve a source ID ("v1", "c1") to a display-friendly object for citation popovers.
// Visits always return the shared (non-sensitive) summary so citations are safe
// to show regardless of who's reading.
export function lookupSource(id) {
  const v = VISITS.find((x) => x.id === id);
  if (v) {
    return {
      type: "visit",
      id,
      title: v.title,
      date: v.date,
      provider: v.providerName,
      snippet: v.sharedSummary,
    };
  }
  const c = CONDITIONS.find((x) => x.id === id);
  if (c) {
    return {
      type: "condition",
      id,
      title: c.name,
      snippet: `Severity: ${c.severity} · Managed by: ${c.managedBy.split(",").map((r) => ROLES[r]?.title).filter(Boolean).join(", ")}`,
    };
  }
  return null;
}

// Cross-provider coordination findings — surfaces the "conflict / consistency
// check" story the Quality Metrics tab promises. Each finding declares who
// can see it and optionally requires consent for the detail form.
export const COORDINATION_FINDINGS = [
  {
    id: "cf1",
    severity: "warning",
    title: "Medication timing affects physio scheduling",
    detail: "Patient's nightly melatonin 2mg (prescribed by Dr. Mehta) may cause morning drowsiness. Physio has reported mild dizziness during early-morning sessions. Recommend scheduling physio after 10am while sleep pattern stabilizes.",
    redactedDetail: "Patient is on a sleep aid that may cause morning drowsiness. Recommend scheduling physio sessions after 10am.",
    involvedRoles: ["psych", "physio"],
    visibleTo: ["gp", "psych", "physio"],
    requiresConsent: { role: "physio", key: "all_medications" },
    status: "open",
    sources: ["v2", "v3"],
  },
  {
    id: "cf2",
    severity: "info",
    title: "NSAID + pre-diabetes — monitoring active",
    detail: "Long-term meloxicam 7.5mg with HbA1c 6.2% requires periodic GI symptom review and quarterly liver function monitoring. GP plan includes both. Dietitian's Mediterranean meal plan (3+2) supports the 'with food' directive.",
    involvedRoles: ["gp", "dietitian"],
    visibleTo: ["gp", "dietitian"],
    status: "monitoring",
    sources: ["v1", "v4"],
  },
  {
    id: "cf3",
    severity: "ok",
    title: "Treatment consistency check passed",
    detail: "Dietitian's Mediterranean meal plan aligns with GP's meloxicam 'with food' directive. Physiotherapy home-exercise schedule is compatible with meal timing. No conflicts detected.",
    involvedRoles: ["gp", "dietitian", "physio"],
    visibleTo: ["gp", "dietitian", "physio"],
    status: "resolved",
    sources: ["v1", "v2", "v4"],
  },
];

export function getVisibleCoordinationFindings(role, consent) {
  return COORDINATION_FINDINGS
    .filter((f) => f.visibleTo.includes(role))
    .map((f) => {
      if (f.requiresConsent && f.requiresConsent.role === role) {
        const granted = consent?.[role]?.[f.requiresConsent.key];
        if (!granted && f.redactedDetail) {
          return { ...f, detail: f.redactedDetail, redacted: true };
        }
      }
      return f;
    });
}

// Consent labels (shared between patient and provider views)
export const CONSENT_LABELS = {
  mental_health_detail: "See specific mental health diagnoses",
  all_medications: "See all medication names (including psychiatric)",
  session_content: "See detailed therapy session notes",
  substance_history: "See substance use history",
};

export const WHY_ITEMS = [
  { title: "Safe by default, open by choice", desc: "Astrid never has to act to protect herself. She only acts to share more — like giving her GP access to psychiatric details for medication coordination." },
  { title: "Granular but not overwhelming", desc: "Four categories, four providers. “Do I want my physio to know I take sertraline?” is a question Astrid can actually answer." },
  { title: "Revocable at any time", desc: "Consent can be adjusted instantly. Previously shared summaries don’t retroactively change, but new information stops flowing." },
  { title: "Reduces liability for everyone", desc: "Practitioners can’t be blamed for not knowing something the patient chose not to share, or for seeing something the patient chose to reveal." },
];

// Audit log mock data
export const AUDIT_LOG = [
  { id: 1, timestamp: "2026-03-07 09:14:22", actor: "Dr. Sarah Jones", actorRole: "gp", action: "viewed", target: "Patient Summary", detail: "Full access view" },
  { id: 2, timestamp: "2026-03-07 09:15:01", actor: "Dr. Sarah Jones", actorRole: "gp", action: "confirmed", target: "AI Summary", detail: "Marked as accurate" },
  { id: 3, timestamp: "2026-03-07 10:32:15", actor: "Tom Dunn", actorRole: "physio", action: "viewed", target: "Patient Summary", detail: "Role-filtered view (physio)" },
  { id: 4, timestamp: "2026-03-07 10:33:44", actor: "Tom Dunn", actorRole: "physio", action: "flagged", target: "AI Summary", detail: "Flagged: ‘centrally-acting medication’ wording unclear for exercise safety" },
  { id: 5, timestamp: "2026-03-06 14:02:30", actor: "Astrid Chen", actorRole: "patient", action: "consent_changed", target: "Physio → all_medications", detail: "Revoked: See all medication names" },
  { id: 6, timestamp: "2026-03-06 14:02:45", actor: "System", actorRole: "system", action: "regenerated", target: "AI Summary (physio view)", detail: "Summary regenerated after consent change" },
  { id: 7, timestamp: "2026-03-06 11:20:00", actor: "Dr. Anya Mehta", actorRole: "psych", action: "viewed", target: "Patient Summary", detail: "Full access view (mental health)" },
  { id: 8, timestamp: "2026-03-05 16:45:12", actor: "Rachel Lee", actorRole: "dietitian", action: "viewed", target: "Patient Summary", detail: "Role-filtered view (dietitian)" },
  { id: 9, timestamp: "2026-03-05 16:46:30", actor: "Rachel Lee", actorRole: "dietitian", action: "confirmed", target: "AI Summary", detail: "Marked as accurate" },
  { id: 10, timestamp: "2026-03-05 09:00:00", actor: "Astrid Chen", actorRole: "patient", action: "consent_changed", target: "GP → mental_health_detail", detail: "Granted: See specific mental health diagnoses" },
  { id: 11, timestamp: "2026-03-04 13:22:18", actor: "Dr. Sarah Jones", actorRole: "gp", action: "emergency_override", target: "Full Record Access", detail: "Emergency override activated — reason: acute medication reaction assessment" },
  { id: 12, timestamp: "2026-03-04 13:22:19", actor: "System", actorRole: "system", action: "notification", target: "Astrid Chen", detail: "Patient notified of emergency access override" },
];
