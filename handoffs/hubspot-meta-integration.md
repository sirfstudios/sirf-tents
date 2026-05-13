# Sirf Tents — HubSpot ↔ Meta Ads Integration

**Owner:** Gurvir
**Status:** Lead capture is live on both campaigns. Back-half (HubSpot deal-stage → Meta CAPI conversion events) **plan verified 2026-05-13, execution pending Gurvir's UI work.** See "VERIFIED PLAN" section below.

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

## VERIFIED PLAN (2026-05-13)

After expert subagent verification (Meta optimization expert + HubSpot pipeline architect, both researching 2026 sources via WebSearch + Context7), the back-half plan is locked. Two key decisions diverge from earlier assumptions:

### Decision 1: Optimize on `Schedule`, not `Purchase` (but fire BOTH)

Confirms the original strategy in this doc, with stronger 2026 evidence:
- Meta's **March 2026 Andromeda update** *tightened* the 50-events/week threshold (didn't relax). Sub-threshold ad sets get elevated CPMs and deprioritization.
- Meta's Conversion Leads docs require optimization event to occur **within 28 days** of lead creation. Deposit Paid often takes longer at Sirf Tents AOV — structurally disqualified as primary optimization target.
- Fire `Purchase` (with deal value) as supporting/value signal. Reassess switching to value-based bidding on Purchase at ~4–8 weeks if Purchase clears 30/week with ≥5 distinct deal values.

### Decision 2: Build TWO pipelines with 5/4 stages NOW (not refactor later)

Resolves open question #3 in this doc. Current 3-stage pipeline (`New Lead → Opportunity → Deposit Paid`) is too coarse and mixes two motions.

**Why now, not after MCP connection:**
- HubSpot deal-stage history **cannot be edited or deleted** (open community feature request since 2018). Refactoring later breaks funnel reports for cohorts that lived through the change.
- Pipeline customization is a **free CRM-side UI action** on Marketing Hub Starter — doesn't require MCP.
- Mixing two sales motions in one pipeline is the #1 forecast-distortion mistake per 2026 wedding-vendor sources (BookMoreBrides, Tripleseat).

### Pipeline A — Legacy + Premium (5 stages)

| # | Stage | Win % | Definition | CAPI event |
|---|---|---|---|---|
| 1 | New Lead | 10% | Meta instant form submitted, no human reply yet | none (auto via lead form sync) |
| 2 | Conversation Active | 20% | IG DM exchange started ("Information Stage" from form doc) | none |
| 3 | Quote Call Booked | 40% | Calendar event confirmed | **`Schedule` (PRIMARY OPTIMIZATION)** |
| 4 | Site Visit / Quote Sent | 65% | Visit scheduled OR written quote delivered | optional `InitiateCheckout` (reserve a CAPI slot) |
| 5 | Deposit Paid / Closed Won | 100% | Deposit received | **`Purchase` with deal value (CAD)** |
| — | Closed Lost | 0% | Lost or ghosted | none |

### Pipeline B — High Peak (4 stages, no site visit)

| # | Stage | Win % | Definition | CAPI event |
|---|---|---|---|---|
| 1 | New WhatsApp Lead | 15% | Click-to-WhatsApp lead arrived | none |
| 2 | Qualified Conversation | 35% | Guest count + date + venue confirmed | **`Schedule` (PRIMARY OPTIMIZATION)** |
| 3 | Quote Sent | 60% | Written quote delivered via WhatsApp | none |
| 4 | Deposit Paid | 100% | Deposit received | **`Purchase` with deal value (CAD)** |

**CAPI event slot usage:** 4 of 5 (one in reserve).

### Resolved open questions

- **Q1 (sync path):** Verified — Marketing Hub Starter supports native HubSpot ↔ Meta CAPI integration (5-event cap). No Pro upgrade or external relay needed. Source: HubSpot KB.
- **Q3 (pipeline state):** Confirmed by Gurvir 2026-05-13 — current is `New Lead → Opportunity → Deposit Paid`. Plan is to expand to the structure above (Step 0 of execution).

### Still-open questions (need Gurvir verification before/during execution)

- **Q2 (attribution fields populated):** open — verify on 3–5 recent Meta-sourced contacts
- **Q4 (High Peak in HubSpot):** open — verify if WhatsApp leads are entering HubSpot today or living only in WhatsApp
- **Q5 (`ctwa_clid` captured):** open — confirmed as critical 2026 requirement; without it High Peak attribution breaks

### Execution sequence (full detail in plan file)

0. **Build the two pipelines** (Gurvir, manual HubSpot UI, ~10 min)
1. **Create custom conversions in Meta Events Manager** (~15 min): `QuoteCallBooked` → `Schedule`, `DepositPaid` → `Purchase`
2. **Connect HubSpot ↔ Meta** (Gurvir handles OAuth, ~10 min)
3. **Create 4 Conversion Events in HubSpot** (~20 min) mapped to deal stages above
4. **Wire deal stage automation** (~30 min) — v1 manual via `quote_call_booked` boolean property + workflow
5. **End-to-end test on BOTH pipelines** (~30 min) — confirm EMQ >70%
6. **Switch Meta optimization** (after 7 days of event data) from `Lead` → `Schedule`. Don't change budget for 14 days post-switch.
7. **Reassess for value-based bidding** (4–8 weeks out) if Purchase clears 30/week consistently

### Critical gotchas (verified)

1. Phone numbers must be **E.164 format** (`+14165551234`) for hashing to match Meta
2. **`ctwa_clid` AND `action_source=business_messaging`** required for High Peak attribution (new 2026 requirement)
3. Don't fragment ad sets — splits starve the 50-events/week signal
4. Watch the **`Schedule → Purchase` ratio weekly** — if it drops, Meta is finding cheap "scheduled" leads that don't deposit; tighten the Quote Call Booked definition
5. Deal-stage history is permanent — why we're building 5 stages on day one
6. Marketing Hub Starter caps CAPI at 5 events — we use 4, save the 5th for future high-signal events

### Verification (success criteria)

After Step 5: test deals in both pipelines fire all CAPI events, EMQ >70%, `ctwa_clid` captured on High Peak.

After Step 6 (14 days post-switch): cost per `Schedule` drops 20–40% vs baseline on both campaigns; no drop in absolute booking volume; Schedule → Purchase ratio holds.

### Sources verified (2026-05-13)

- HubSpot Developer Docs (Context7: `/websites/developers_hubspot`)
- Facebook CAPI Param Builder SDK (Context7: `/facebook/capi-param-builder`)
- HubSpot KB: Meta Conversions API integration
- Meta Andromeda update guidance (March 2026)
- Wedding-vendor pipeline benchmarks (BookMoreBrides, Tripleseat)
- HubSpot Community: deal-stage history limitations (open since 2018)
- Subagent reports:
  - `/Users/pawan/.claude/plans/summarize-this-entire-polished-curry-agent-a24aa3c0b65dd61bd.md` (Meta optimization)
  - `/Users/pawan/.claude/plans/summarize-this-entire-polished-curry-agent-ae6b5edf554bea6dc.md` (HubSpot pipeline)
- Full plan: `/Users/pawan/.claude/plans/summarize-this-entire-polished-curry.md`

---

## Files & references

- `CLAUDE.md` — business rules, channel routing, copy framework, working style
- `handoffs/meta-instant-form.md` — form spec, qualifying logic, KPIs
- This file — integration state, open questions, back-half goal, verified plan
