# CLAUDE.md — Sirf Tents

## Business

Premium tent rental, Brampton ON, serving the GTA South Asian wedding market. Owner: Gurvir.

- **Event scope:** Weddings and engagements only.
- **Size floors:**
  - Legacy Tent Packages → 100+ guests
  - High Peak Packages → 40 / 60 / 80 guest sizes
- **Package categories:** High Peak Packages, Legacy Tent Packages
- **Tent types:** High Peak, Frame, Legacy Structure
- **SKU + price anchors:**
  - High Peak 40 guests — $500
  - High Peak 60 guests — $800
  - High Peak 80 guests — $1,000
  - Legacy Standard (100+ guests) — ~$3,500 AOV
  - Legacy Signature — ~$6,500 AOV
  - Legacy Grand — ~$9,000 AOV
- **Social proof line (use verbatim):** *"Rated 5 Stars — 200+ GTA Events"*
- **Funnel:** Meta ad → WhatsApp or IG Messages (tier-dependent, see Channel routing) → quote call → site visit → deposit → booking
- **Sales cycle:** ~1–8 weeks. Peak season: May–October.

## Copywriting — use the Hormozi Value Equation

Value = (Dream Outcome × Perceived Likelihood of Achievement) ÷ (Time Delay × Effort & Sacrifice).

- Default framework for all ads, landing copy, and follow-up scripts.
- **Not** Eugene Schwartz, AIDA, or generic ad-copy templates.
- Numerator levers: vivid outcome, social proof, certainty.
- Denominator levers: fast turnaround, done-for-you, zero stress.
- Open with the social proof line — it's the credibility anchor.
- Audience: brides, mothers, wedding planners. Outcome-led, not feature-led. Never B2B.

## Working style — Gurvir

- Direct and substantive. No fluff, no filler intros, no recap of what was just said.
- Explain the *why*, not just the *what*. He's strategic, not technical, and he pressure-tests answers — be concrete, not generic.
- Prefer CLI / API / code over UI walkthroughs when both work.
- **IMPORTANT — Stop** at OAuth, CAPTCHA, and any payment or credit-card screen. Surface the cost, let him decide.
- Before recommending platform-specific behavior (Meta Lead Forms, HubSpot workflows, Conversions API, etc.), verify current behavior via Context7 — don't rely on training data alone.
- **IMPORTANT — `handoffs/*.md` are session-spanning memory.** When a topic touches an open initiative (HubSpot↔Meta CAPI, Meta instant form, etc.), read the relevant handoff *before* answering. Update it when state changes.

## Lead-gen forms — durable rules

Rules that apply to *every* Sirf Tents lead-gen form (Meta instant form, landing page, anywhere). Form-specific spec lives in `handoffs/<form>.md`.

- **Never use "Other" as a multi-choice option.** It's a junk magnet. Either the option list is complete or the option list is wrong — don't paper over it.
- **Multi-choice brackets (guest count, budget, size) must align to actual SKU sizes.** If brackets don't match what we sell, the form has created a follow-up question that has to happen on the call. The form's job is to eliminate that follow-up.
- **Meta Lead Form question order is mandatory: multi-choice → short answer → appointment-scheduling (`DATE_TIME`).** Meta's API enforces it; `DATE_TIME` must come last when used.
- **Don't offer Instagram DM as a contact-method *field* in a lead form.** When leads pick IG DM themselves, it's a black hole — no notification urgency, easy to ignore. *But* IG Messages **are** the response channel after a Legacy/Premium form submit (see *Channel routing by campaign tier* below). The distinction matters: we control the channel, the lead doesn't choose it.
- **Follow-up cadence: 1–2 messages if no response, branched by Q3 urgency.** Initial response is always human and fast. After the 2nd follow-up, the lead is cold — move on; revisit in 30 days or when ad cadence brings them back.
  - *ASAP — Within 1-2 weeks:* 1st @ 4h, 2nd @ 24h
  - *Within the next month:* 1st @ 24h, 2nd @ 4 days
  - *Within 2-3 months:* 1st @ 24h, 2nd @ 7 days
  - *Just exploring:* 1st @ 48h, 2nd @ 7 days (nurture-flavored, not chase)
- **Primary Meta CAPI optimization target is `QuoteCallBooked` (mapped to Meta `Schedule`), never `Lead`.** Optimizing on `Lead` makes Meta chase volume; we need quality. See `handoffs/hubspot-meta-integration.md`.
- **Meta lead forms default to `is_optimized_for_quality: true`** (Higher Intent — adds a review-and-confirm step). Turn off only with a specific reason and a planned A/B test.
- **Free-text date fields require a tolerant parser + manual-review fallback property.** Leads write "summer", "TBD", "6/15", "next August" — plan for it.
- **The form is the filter, not the call.** If a question can be asked in the form and answered consistently, ask it in the form. The call is for personalization, not qualification.

## Channel routing by campaign tier

Channel is determined by the *campaign tier*, not by lead preference. Each tier has a known audience profile and a single channel that works for it. Don't mix them.

### Legacy + Premium campaign — rich form → IG Messages

- **Lead flow:** Meta ad → instant form (5 questions, see `handoffs/meta-instant-form.md`) → HubSpot + IG Messages
- **Response channel:** Instagram Messages, human-handled by the two co-founders with fast notifications on their phones.
- **Why:** The rich Higher-Intent form already pre-qualifies. Anyone who finishes 5 questions is serious — and the Legacy/Premium audience skews IG-fluent and expects IG-quality visuals during the conversation (real past-event photos, story replies, reels). The form filters; IG converts.
- **Follow-up cadence:** Branched by Q3 urgency, per the rule above.

### High Peak campaign — no form → WhatsApp direct

- **Lead flow:** Meta ad → Click-to-WhatsApp (no instant form) → manual WhatsApp conversation
- **Response channel:** WhatsApp.
- **Why:** Smaller events, lower spend, often older demographic that lives in WhatsApp and finds IG friction-y. A form would add friction without adding filter-value — the High Peak SKUs are simple ($500 / $800 / $1,000, 40 / 60 / 80 guests). Faster to hop straight into a WhatsApp quote.
- **Follow-up cadence:** Same 1–2 message rule, judged in-conversation since there's no Q3 to branch on.

**IMPORTANT — Cross-tier rule:** Never propose flows that mix these (e.g., "Legacy lead but route to WhatsApp" or "High Peak lead but build a form"). Tier-routing is the rule, not a default.

## Current progress

- **Done:** Optimized Meta instant form shipped 2026-05-12 on the Legacy + Premium campaign. Spec at `handoffs/meta-instant-form.md`. Option B (Meta Lead Forms) effectively chosen.
- **Open:** HubSpot ↔ Meta CAPI back-half — deal-stage → conversion-event mapping; verify `QuoteCallBooked` and `Purchase` events fire end-to-end. See `handoffs/hubspot-meta-integration.md`.
