# Capsule — Live Demo Script

**Total time:** ~5-6 minutes

---

## INTRO (15 sec)

"This is Capsule — a shared patient summary for multidisciplinary clinics. The core challenge: how do you coordinate care across providers without exposing sensitive patient data or creating liability? I'll walk through the system from three perspectives: the provider, the patient, and the architecture underneath."

---

## PROVIDER VIEW — Patient Summary (60 sec)

*[Start on Provider View, GP selected, Patient Summary tab]*

"We're looking at Dr. Sarah Liu's view — Maria Chen's GP. The system generates an AI summary tailored to this role. It mentions Maria's anxiety and sertraline because Maria has granted her GP access to mental health details — that's a consent decision, not a default."

*[Point to the consent indicator banner at top]*

"This banner tells the GP what Maria has shared with them — 2 of 4 categories. The GP doesn't control this. Maria does."

*[Scroll to medications — point to Meloxicam interaction flag]*

"Medication interaction flags surface cross-provider risks. This NSAID + pre-diabetes warning comes from connecting data across the GP and dietitian."

*[Scroll to AI Feedback buttons]*

"Every AI summary has a feedback loop. Practitioners can confirm accuracy or flag errors. This feeds into a quality dashboard — 97.2% accuracy across 338 reviews this month. The system improves from use."

---

## SWITCHING ROLES (45 sec)

*[Click Physio role button]*

"Now watch what happens when we switch to Tom Dunn, the physiotherapist."

*[Point to AI summary change]*

"The summary is completely different. It's musculoskeletal-focused. And notice — it doesn't mention anxiety or sertraline. Instead it says 'a centrally-acting medication that may affect pain perception.' Maria hasn't shared mental health details with her physio."

*[Scroll to medications — point to redacted Sertraline]*

"Sertraline shows as 'Centrally-acting medication' with a 'Why relevant?' button. The physio gets exactly what they need — this drug might cause dizziness during exercises — without knowing the diagnosis or the drug name. That's HIPAA's minimum necessary standard, implemented in software."

---

## COMPARE VIEWS (30 sec)

*[Click Compare Views tab]*

"The Compare Views tab makes this concrete. GP on the left, physio on the right. Same patient, completely different clinical lenses. The 'Different' badge on the AI summary shows these aren't copies — they're role-tailored. Toggle consent in the patient portal and these views update in real-time."

---

## SAFETY SCENARIO (45 sec)

*[Click Safety Scenario tab]*

"Here's why this matters clinically."

*[Click through steps 1-2]*

"Maria arrives at physio with 8/10 pain. Tom considers recommending codeine. But the system immediately flags a codeine allergy — this is in the 'Always Shared' tier. Allergies are never redactable because there's no scenario where hiding an allergy protects the patient."

*[Click step 3]*

"The system also flags the centrally-acting medication interaction. Tom doesn't know it's an SSRI, but he knows codeine plus this drug is dangerous."

*[Click step 4]*

"Instead of a dangerous prescription, Tom sends a coordination note to the GP. Safe outcome."

*[Click step 5]*

"And here's the counterfactual — without this system: after-hours, unreliable patient self-report, codeine prescribed despite allergy and SSRI interaction risk. This is how adverse events actually happen."

---

## PATIENT PORTAL — My Health (30 sec)

*[Click Patient Portal mode]*

"Now let's flip to what Maria sees. This is a completely separate product surface — different tone, plain language, no clinical jargon."

*[Point to welcome banner and care team grid]*

"She sees her full care team, her unified health summary, all her conditions and medications — everything. The patient always has full visibility into their own record."

---

## PATIENT PORTAL — My Privacy Settings (45 sec)

*[Click My Privacy Settings tab]*

"This is where consent lives. Maria controls four categories for each of her four providers. Right now she's shared mental health details with her GP and psychologist, but not her physio or dietitian."

*[Toggle ON physio → all_medications]*

"Watch — I'll let the physio see all medication names."

*[Switch back to Provider View → Physio → Patient Summary]*

"Now Sertraline appears by name instead of 'centrally-acting medication.' That toggle Maria just flipped changed what the physio's AI summary says, what medications are visible, everything. Real-time, granular, revocable."

*[Switch back to Patient Portal → toggle it OFF again]*

"And she can revoke it just as easily. Previously shared summaries don't retroactively change, but new information stops flowing."

---

## PATIENT PORTAL — Who Sees What (30 sec)

*[Click Who Sees What tab]*

"This is the transparency view — Maria can see exactly what each provider sees. Green means fully visible, amber means redacted. For the physio, 'Generalized Anxiety Disorder' becomes 'Mood disorder, managed, stable.' 'Sertraline 50mg' becomes 'Centrally-acting medication.' She can verify that redaction works the way she expects."

---

## HOW IT WORKS — Quick Highlights (60 sec)

*[Click How It Works mode]*

"Under the hood — three quick things."

*[Data Model tab — scroll to three tiers]*

"First, the data model. Every piece of clinical data falls into one of three tiers: Always Shared, Conditionally Shared, or Never Shared. The default is always the most restrictive. Patients grant access upward — they never need to act to protect themselves."

*[Click Audit Trail tab]*

"Second, the audit trail. Every view, consent change, flag, and emergency override is logged with timestamp and identity. This creates unambiguous legal clarity — if a practitioner didn't see something because the patient restricted it, that's documented. No 'should have known' liability."

*[Click AI Safety tab — scroll to Phased Adoption]*

"Third, phased adoption. Shadow mode first — summaries generated but only visible to a pilot group. Then read-only, then integrated, then full operation. The system earns its place through data, not a mandate."

---

## CLOSE (15 sec)

*[Click Design Rationale tab — scroll to core principle]*

"The design principle behind all of this: the shared summary should make care coordination effortless without making any practitioner's life harder or riskier. Privacy and safety aren't in tension — with the right abstractions, they reinforce each other."

---

## RECORDING NOTES

- **Total time:** ~5-6 min. You can cut the "How It Works" section to ~30 sec if you need to tighten.
- **Key demo moment:** Toggling consent in Patient Portal then switching to Provider View to see the change. Practice this transition — it's the money shot.
- **Don't rush** the physio Sertraline → "centrally-acting medication" moment. That's the core insight.
- **If you want to show emergency override:** Do it after the role-switching section. Click Break Glass, type "Acute medication reaction assessment," activate, show the banner, then deactivate. Adds ~20 sec.
