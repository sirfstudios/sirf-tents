# Sirf Tents — HubSpot ↔ Meta Ads Integration

**Owner:** Gurvir | **Business:** Sirf Tents (premium tent rental, Brampton ON, GTA wedding market)

---

## Objective

Wire bidirectional sync between Meta Ads and HubSpot to fix the attribution problem.

**Current state:** Ads are running. Leads are coming in. Gurvir doesn't know which ads are producing actual *booked* weddings. Meta is optimizing on the wrong target (lead volume, not booked revenue).

**End state:**
1. Every Meta-sourced lead lands in HubSpot with ad/campaign attribution attached
2. HubSpot deal stage progressions fire conversion events back to Meta via Conversions API
3. Meta's algorithm starts optimizing for booked clients, not raw leads

---

## Business Context

- AOV: $3,500 (Standard) / $6,500 (Signature) / $9,000 (Grand)
- Floor: 100+ guest weddings and engagements only
- Funnel: Meta ad → WhatsApp → quote call → site visit/quote → deposit → booking
- Sales cycle: ~1–8 weeks
- Heavy WhatsApp dependence at the lead-to-quote handoff stage

---

## Decision Point: Lead Capture Architecture (ASK GURVIR FIRST)

The integration changes based on which ad format he's running. Confirm before proceeding.

### Option A — Click-to-WhatsApp ads
Ad CTA opens WhatsApp directly. No form.

- Connect HubSpot's WhatsApp Business integration (or Zapier/Make bridge)
- Configure ad URL parameters to pass Meta's `fbclid` into the WhatsApp prefill so it survives into HubSpot
- Connect HubSpot ↔ Meta Ads via App Marketplace (for spend/campaign sync)
- Set up Meta Conversions API in HubSpot

**Caveat:** Messiest attribution path. Click ID matching needs deliberate URL templating. WhatsApp Business API is a paid HubSpot add-on. If attribution is currently broken, recommend migrating to B or C.

### Option B — Meta Lead Forms
Instant form on FB/IG, WhatsApp follow-up.

- Connect HubSpot ↔ Meta Ads via App Marketplace (HubSpot → Marketing → Ads → Connect Accounts → Meta)
- Map Meta lead form fields → HubSpot contact properties
- HubSpot Workflow on new contact → triggers WhatsApp template message
- Set up Meta Conversions API in HubSpot

**Cleanest path.** Each lead carries `ad_id`, `adset_id`, `campaign_id` automatically.

### Option C — Landing page form (the page he's currently building)
Form on Sirf Tents landing page → HubSpot → WhatsApp follow-up.

- Install Meta Pixel on landing page
- Install Meta Conversions API (server-side via HubSpot or via tag manager)
- HubSpot form embed (or HubSpot Forms API)
- Capture `fbclid` from URL into the HubSpot contact record on submission
- HubSpot Workflow on form submission → WhatsApp message
- Set up CAPI back-half

**Most aligned with current landing page work.**

---

## Back-Half: Conversion Events to Meta (same for A, B, and C)

This is what fixes attribution. Map HubSpot deal stages → Meta conversion events via HubSpot's CAPI integration.

| HubSpot Deal Stage | Meta Event | Why |
|---|---|---|
| Lead created (auto) | `Lead` | High volume, low value. Do NOT optimize ad campaigns on this. |
| Quote call booked | Custom: `QuoteCallBooked` (mapped to `Schedule`) | **Primary optimization target.** Mid-funnel, ~5–10x lower volume than leads, much higher quality signal. |
| Deposit paid | `Purchase` (with deal value) | Bottom-funnel, lowest volume, highest signal. Secondary target once volume allows. |

**Why `QuoteCallBooked` is the primary, not `Purchase`:**
At $3.5K–$9K AOV with a 1–8 week cycle, optimizing on `Purchase` alone gives Meta too few events per week (likely <50, below Meta's stable optimization threshold). `QuoteCallBooked` should generate 30–100/week during summer prep — Meta's sweet spot.

**Match keys to send via CAPI:** email, phone, `fbclid`, first name, last name, city. Higher key count = higher match rate. Target >70% match rate in Meta Events Manager.

---

## Execution Sequence

1. **Confirm A / B / C with Gurvir** before touching anything.
2. **Drive HubSpot ↔ Meta Ads connector wizard:**
   - hubspot.com → Marketing → Ads → Connect Accounts → Meta
   - Gurvir handles Meta Business OAuth
   - Select Sirf Tents ad account
   - Authorize lead form sync (if Option B)
3. **Configure Conversions API in HubSpot:**
   - Marketing → Ads → Conversion Events
   - Connect Meta Pixel (Gurvir authorizes)
   - Map deal stages → Meta events per table above
   - Set deal value field for `Purchase` event
4. **Test end-to-end:**
   - Submit a test lead through the live path
   - Verify HubSpot contact has campaign attribution attached
   - Move test deal through stages, verify CAPI events fire in Meta Events Manager
   - Check match rate (>70%)
5. **Wire deal stage automation:**
   - "Quote Call Booked" → triggered by calendar booking webhook or manual stage change
   - "Deposit Paid" → triggered by payment processor webhook

---

## Out of Scope for This Session

- Building HubSpot deal pipeline from scratch (assume exists; create minimal version if not)
- Full email/SMS automation in HubSpot (separate task)
- Ad creative optimization (separate task)

---

## Working Style Notes

- Gurvir prefers CLI/terminal; don't push HubSpot UI for things doable via API
- He's strategic, not technical — explain the *why* behind each step, not just the clicks
- Stop at OAuth and CAPTCHA, let him handle
- Do NOT enter credit card or banking info. If HubSpot upgrade is needed (e.g., WhatsApp Business API tier), surface the cost and let him decide
- He pressure-tests answers — be concrete, not generic
