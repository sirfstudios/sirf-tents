# CLAUDE.md — Sirf Tents

## Business

Premium tent rental, Brampton ON, serving the GTA South Asian wedding market. Owner: Gurvir.

- **Event scope:** Weddings and engagements only.
- **Size floors:**
  - Legacy Tent Packages → 100+ guests
  - High Peak Packages → 40 / 60 / 80 guest sizes
- **Package categories:** High Peak Packages, Legacy Tent Packages
- **Tent types:** High Peak, Frame, Legacy Structure
- **Social proof line (use verbatim):** *"Rated 5 Stars — 200+ GTA Events"*
- **Funnel:** Meta ad → WhatsApp → quote call → site visit → deposit → booking
- **Sales cycle:** ~1–8 weeks. Peak season: May–October.
- **Lead handoff:** WhatsApp is the workhorse between ad-click and quote call. Don't propose flows that bypass it.

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
- **Stop** at OAuth, CAPTCHA, and any payment or credit-card screen. Surface the cost, let him decide.
- Before recommending platform-specific behavior (Meta Lead Forms, HubSpot workflows, Conversions API, etc.), verify current behavior via Context7 — don't rely on training data alone.

## Lead-gen forms — durable rules

Rules that apply to *every* Sirf Tents lead-gen form (Meta instant form, landing page, anywhere). Form-specific spec lives in `handoffs/<form>.md`.

- **Never use "Other" as a multi-choice option.** It's a junk magnet. Either the option list is complete or the option list is wrong — don't paper over it.
- **Multi-choice brackets (guest count, budget, size) must align to actual SKU sizes.** If brackets don't match what we sell, the form has created a follow-up question that has to happen on the call. The form's job is to eliminate that follow-up.
- **Meta Lead Form question order is mandatory: multi-choice → short answer → appointment-scheduling (`DATE_TIME`).** Meta's API enforces it; `DATE_TIME` must come last when used.
- **Instagram DM is never offered as a contact channel.** The GTA mid-aged wedding audience doesn't check IG DMs reliably. Don't add it back "as an option" — it's a black hole.
- **Primary Meta CAPI optimization target is `QuoteCallBooked` (mapped to Meta `Schedule`), never `Lead`.** Optimizing on `Lead` makes Meta chase volume; we need quality. See `handoffs/hubspot-meta-integration.md`.
- **Meta lead forms default to `is_optimized_for_quality: true`** (Higher Intent — adds a review-and-confirm step). Turn off only with a specific reason and a planned A/B test.
- **Free-text date fields require a tolerant parser + manual-review fallback property.** Leads write "summer", "TBD", "6/15", "next August" — plan for it.
- **The form is the filter, not the call.** If a question can be asked in the form and answered consistently, ask it in the form. The call is for personalization, not qualification.

## Current progress

- **Done:** Optimized Meta instant form shipped 2026-05-12 on the Legacy + Premium campaign. Spec at `handoffs/meta-instant-form.md`. Option B (Meta Lead Forms) effectively chosen.
- **Open:** HubSpot ↔ Meta CAPI back-half — deal-stage → conversion-event mapping; verify `QuoteCallBooked` and `Purchase` events fire end-to-end. See `handoffs/hubspot-meta-integration.md`.
