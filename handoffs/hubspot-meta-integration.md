# Sirf Tents — HubSpot ↔ Meta Ads Integration

**Owner:** Gurvir
**Status:** Lead capture is live on both campaigns. Back-half (HubSpot deal-stage → Meta CAPI conversion events) **not yet implemented**.

---

## Current implemented state

Two campaigns run in parallel with distinct lead paths. Channel routing is by campaign tier — never propose mixing them (`CLAUDE.md` → *Channel routing by campaign tier*).

### Legacy + Premium campaign → instant form → IG Messages → call

- **Ad CTA:** Meta instant form, 5 questions, Higher Intent mode (`is_optimized_for_quality: true`)
- **Form spec:** `handoffs/meta-instant-form.md` — shipped 2026-05-12
- **Form name in Meta:** *SIRF Tents - Legacy & Premium Lead Form*
- **Lead lands in:** HubSpot contact record (form fields + Meta ad attribution `meta_ad_id` / `meta_adset_id` / `meta_campaign_id`) AND Instagram Messages business inbox, in parallel
- **Initial response:** human, on Instagram Messages, by either co-founder
- **Call booking:** inside the IG conversation
- **AOV (per `CLAUDE.md`):** Legacy Standard ~$3,500 / Legacy Signature ~$6,500 / Legacy Grand ~$9,000
- **Deal stages documented in the form handoff:** `Quote Call Booked` (if reply shows call/consultation interest) and `Information Stage` (if reply is questions/browsing). Full pipeline state unconfirmed — see open questions.

### High Peak (Small Tents) campaign → Click-to-WhatsApp → call

- **Ad CTA:** opens WhatsApp directly with prefilled message — no form
- **Initial response:** human, on WhatsApp
- **Call booking:** inside the WhatsApp conversation
- **Pricing:** $500 / $800 / $1,000 (40 / 60 / 80 guests)
- **HubSpot integration today:** unconfirmed — see open questions

---

## What's NOT yet implemented

### Back-half: CAPI conversion events from HubSpot deal stages

No Zapier, Make, or native CAPI integration is live. Meta is still optimizing on raw lead volume, not on quote calls booked or weddings actually booked. This is the attribution problem the integration was created to solve.

### Speed-to-first-response tracking (pending KPI)

- Meta lead created → first IG message sent (Legacy + Premium) / first WhatsApp message (High Peak)
- Targets per form handoff: <15 min ASAP / <1h next-month / <4h 2-3 months / <24h just-exploring (Legacy + Premium only — High Peak has no Q3 urgency bracket since there's no form)
- Currently un-instrumented

### Lead → Booked Consultation conversion rate (pending KPI)

- Target baseline 25–35% blended (hot leads >50%, just-exploring <10%) per form handoff
- Requires deal-stage reporting to be wired

---

## Strategic goal of the back-half

Map HubSpot deal stages → Meta CAPI events so Meta optimizes on real funnel progression, not raw form-fillers.

| HubSpot deal stage | Meta event | Why |
|---|---|---|
| Lead (auto on contact creation) | `Lead` | High volume, low value — never make this the optimization target |
| Quote Call Booked | Custom `QuoteCallBooked` → mapped to Meta `Schedule` | **Primary optimization target.** Mid-funnel, ~5–10× lower volume than leads, much higher quality signal |
| Deposit paid / Booked (stage TBD — pipeline unconfirmed) | `Purchase` (with deal $ value) | Bottom-funnel, lowest volume, highest signal. Secondary target once volume justifies |

**Why `QuoteCallBooked` is primary, not `Purchase`:** at $3.5K–$9K AOV with a 1–8 week cycle, optimizing on `Purchase` alone would give Meta <50 events/week — below the stable-optimization threshold. `QuoteCallBooked` should generate 30–100/week in peak season (May–October).

**Match keys to send via CAPI when wired:**
- **Legacy + Premium:** email, phone, first name, last name, city, `meta_ad_id`, `meta_adset_id`, `meta_campaign_id`
- **High Peak:** same set, plus WhatsApp `ctwa_clid` if capturable (open question)

Target match rate >70% in Meta Events Manager.

---

## Open questions blocking back-half work

1. **How are Legacy + Premium leads syncing to HubSpot today?** The form handoff says "via the Meta ↔ HubSpot Ads connector." That connector may be Marketing Hub Pro-gated, and Gurvir is on Starter — likely actual path is Meta's free native HubSpot integration (Meta-side). Verify via Context7 / current HubSpot docs before assuming either way. Affects whether the back-half can ride the same plumbing or needs an external relay (Zapier / Make / custom webhook).

2. **Are ad attribution fields actually populated on existing HubSpot contacts?** Open 3–5 recent Meta-sourced contacts and confirm `meta_ad_id`, `meta_adset_id`, `meta_campaign_id` are present and non-empty. If any are missing, any CAPI event built later fires without the keys Meta needs to attribute back to ads — match rate craters, algorithm can't learn.

3. **What's the current HubSpot deal pipeline state?** What stages exist beyond the documented `Quote Call Booked` and `Information Stage`? The back-half needs at minimum a stage representing "deposit paid / booked" to fire the `Purchase` event.

4. **High Peak — are leads being entered into HubSpot at all today?** Or do they live only in WhatsApp? Without a HubSpot record there's no deal-stage progression to fire CAPI events from.

5. **High Peak — is the WhatsApp click ID (`ctwa_clid`) captured anywhere on conversation start?** Without it, even if a HubSpot record exists, CAPI events have no match key tying them back to the originating ad. Attribution for this campaign is structurally harder than for Legacy + Premium.

---

## Constraints

- **HubSpot Marketing Hub Starter only.** No upgrade — Gurvir's call. Back-half must work without features gated behind Pro.
- **Channel routing by campaign tier is non-negotiable.** Legacy + Premium → IG Messages. High Peak → WhatsApp. Never propose flows that cross these.
- **Working-style rules in `CLAUDE.md` apply** — stop at OAuth / CAPTCHA / payment, verify platform-specific behavior via Context7 before recommending.

---

## Files & references

- `CLAUDE.md` — business rules, channel routing, copy framework, working style
- `handoffs/meta-instant-form.md` — form spec, qualifying logic, KPIs
- This file — integration state, open questions, back-half goal
