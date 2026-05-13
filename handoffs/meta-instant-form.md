# Meta Instant Form — Legacy + Premium Campaign

**Owner:** Gurvir | **Status:** Live as of 2026-05-12 | **Channel:** Meta (Facebook + Instagram) Lead Ads

---

## What this is

The shipped Meta instant form attached to the **Legacy + Premium tents** campaign — the
ad campaigns running our Crystal Affair, Open Sky Experience, and other premium-tier
creatives. It replaces a 4-question form that produced too many low-quality leads (kids'
birthdays, sub-60 guest events, "still researching" tire-kickers).

A separate **High Peak campaign** owns the smaller tents (20x20 / 20x30 / 20x40 → 40-80
guests, $500–$1,000). That campaign has its own form and is *not* covered here. Anyone
under 60 guests should land there, not here.

**Meta form name:** *SIRF Tents - Legacy & Premium Lead Form* (confirm exact name in Ads Manager)
**Form ID:** TBD — capture from Meta Ads Manager → Lead Forms once confirmed
**Campaign / ad set attached:** TBD — capture from Ads Manager

---

## Form spec — exactly what shipped

**Form mode:** `is_optimized_for_quality: true` (Higher Intent — adds a review-and-confirm step that filters tire-kickers ~15-20%)
**Block organic shares:** `block_display_for_non_targeted_viewer: true`

### Intro / Greeting screen

- **Hero image:** Open Sky Experience creative (clear-top with starlight ceiling)
- **Headline:** *Custom tents for unforgettable celebrations*
- **Description:** *Premium tent rentals for weddings, engagements, receptions, corporate events, and milestone celebrations across the GTA. Tell us about your event in 60 seconds — we'll text you within 1 hour.*

### Autofill fields (Meta pre-fills from FB profile)

`FULL_NAME` · `EMAIL` · `PHONE`

### Questions (5 total, in Meta-mandated order: multi-choice → short answer)

**Q1 — multi-choice — "What type of event are you planning?"**
- Wedding
- Reception/Engagement
- Corporate
- Birthday, Anniversary or Milestones

**Q2 — multi-choice — "How many guests are you expecting?"**
- 60–80
- 80–100
- 100–130
- 130–150
- 150+

**Q3 — multi-choice — "When are you looking to finalize your event team?"**
- ASAP — Within 1-2 weeks
- Within the next month
- Within 2-3 months
- Just exploring

**Q4 — short answer — "What is your event location? (City)"**

**Q5 — short answer — "What is your event date? (Month and/or Day)"**

### Thank-you screen

- **Headline:** *Got it — talk soon.*
- **Body:** *We'll text you within 1 hour. A 15-min call lets us lock your final quote on the spot — usually faster than back-and-forth on chat.*
- **CTA button:** *See past weddings → @sirftents on Instagram* (→ `https://instagram.com/sirftents`)

### Custom disclaimer

> *By submitting, you agree to receive a text from SIRF Tents within 1 hour.*

(TCPA-compliant — sets the expectation that an SMS will follow.)

---

## Why each field exists

| Field | Job it does | Why it's in the form (vs. asked on the call) |
|---|---|---|
| `FULL_NAME` / `EMAIL` / `PHONE` | Identity + contact | Pre-filled by Meta — zero friction, near-100% completion |
| **Q1 — Event type** | First-pass qualification filter | The event-type list is the filter. No "Other" option means no junk. Combined with Q2, this is the binary wedding-vs-backyard-party gate. |
| **Q2 — Guest count** | Package routing + size filter | Gurvir can match Legacy or Premium tier *before* the call. Brackets are aligned to actual tent inventory so there's no "let me check what size that needs" round-trip. |
| **Q3 — Urgency to finalize** | Lead prioritization & SMS routing | The most important question on the form. Splits leads into Hot (ASAP/next month) vs. Cool (2-3 months) vs. Cold (just exploring) so the post-submit SMS workflow can send the right message at the right speed. Replaces what was originally going to be an in-form appointment slot picker. |
| **Q4 — Location (city)** | Delivery cost & service area | Cost of delivery varies widely between Brampton (close) and Niagara/Hamilton/Pickering (far). Knowing city up-front means Gurvir can quote delivery-included pricing on the call instead of a follow-up. |
| **Q5 — Event date** | Peak/off-peak pricing + delivery scheduling | Free-text so the lead can write "June 15" or "summer 2026" or "TBD." The parser handles the variation; manual review catches the rest. |

---

## What we cut and why

| Cut | Why |
|---|---|
| **"Other" as an event-type option** | Junk magnet. Birthdays, grad parties, baby showers, "thinking about it" inquiries — all the leads Gurvir spent time disqualifying. Removed entirely. |
| **"How would you like us to contact you?" question with IG DM / WhatsApp / Call options** | Instagram DM is the lowest-converting channel for this audience (mid-aged GTA wedding clients ignore Instagram DMs). Removing it forces the funnel through phone/SMS where Gurvir has real engagement. |
| **In-form `DATE_TIME` appointment slot picker (was v3 plan)** | Considered and tested in design. Replaced by Q3 (urgency filter), which turned out to be a stronger qualifier — a calendar slot only tells you *when they can talk*, not *whether they're ready to buy*. The SMS workflow books the call instead. |
| **Relative date brackets ("under 4 weeks / 4-8 weeks" — the old form)** | Provided neither peak/off-peak info nor a real date for delivery scheduling. Replaced by Q5 (exact date short-answer) + Q3 (urgency, which the old date question was conflating). |
| **Postal code in Q4** | Considered for delivery-distance precision. Cut for completion-rate reasons — postal code feels invasive; city is enough for Gurvir to estimate delivery and refine on the call. |

---

## Qualifying logic — the wedding vs. backyard party filter

There's no single binary question doing this work — the filter is the **combination of Q1 and Q2**.

- **Q1** restricts to four legitimate event categories. There is no "casual gathering," no "party," no "Other." A kid's birthday party host has to either lie (pick "Birthday, Anniversary or Milestones") or drop off.
- **Q2** sets the 60-guest floor. Typical backyard-party size is 20–50 guests, so anyone marking 60+ is implicitly committing to a real event, not a casual one. The "Birthday, Anniversary or Milestones" bucket only makes sense at 60+ for actual milestone celebrations (50th anniversary, 60th birthday) — not kids' parties.
- **Higher Intent review screen** is a third soft filter: Meta adds a "review your answers" step before submission, which causes some fraction of casual / accidental leads to bounce.

If a backyard-party lead slips through (say, a 60-person milestone birthday that's actually a backyard event), Gurvir filters on the call. But the form is doing 90% of the work.

---

## Where leads route after submission

1. **Meta → HubSpot:** Lead syncs to HubSpot via the Meta ↔ HubSpot Ads connector. All 5 form fields plus ad attribution (`meta_ad_id`, `meta_adset_id`, `meta_campaign_id`) attach to the contact record.
2. **HubSpot workflow fires** — branches on `Q3 — urgency`:

   | Q3 answer | SMS sent within | Template (sender: TBD — confirm SMS number / WhatsApp Business number Gurvir wants used) |
   |---|---|---|
   | ASAP — Within 1-2 weeks | 5 min | *"Hi {first_name}, Gurvir from SIRF Tents — got your {event_type} inquiry for {guest_count} guests on {event_date} in {event_location}. Sounds like you're moving fast. Can we hop on a 15-min call today or tomorrow to lock your quote? Reply with 2 times that work."* |
   | Within the next month | 1 hour | *"Hi {first_name}, Gurvir from SIRF Tents — got your {event_type} inquiry. Want to lock a 15-min call this week? Reply with 2 times that work."* |
   | Within 2-3 months | 1 hour | *"Hi {first_name}, Gurvir from SIRF Tents — got your {event_type} inquiry. Happy to send a starter quote — and a 15-min call gets you exact pricing locked. Reply with 2 times that work next week."* |
   | Just exploring | 4 hours | *"Hi {first_name}, Gurvir from SIRF Tents — got your {event_type} inquiry. Sending some inspo photos and rough pricing later today. Whenever you're ready to lock a date, we'll set up a quick call."* |

3. **Reply triggers next stage:**
   - Reply with call time → HubSpot deal stage `Quote Call Booked` → fires Meta CAPI `QuoteCallBooked` (mapped to Meta `Schedule` event — primary optimization target per `handoffs/hubspot-meta-integration.md`)
   - Reply asking for info only / wanting WhatsApp first → HubSpot deal stage `WhatsApp / Info Nurture` → Gurvir engages manually, attempts call upgrade later
   - No reply within 24h → automated follow-up SMS

**WhatsApp number used as soft opt-out:** TBD — confirm Gurvir's WhatsApp Business number. The SMS workflow needs to know where to send leads who text back asking for WhatsApp instead of a call.

---

## Copy + CTA decisions

- **Intro headline ("Custom tents for unforgettable celebrations") and event-type list in the description** do the soft filter together — anyone planning a kid's party reads this and self-disqualifies. No price disclosure (range is $1,600–$10K+, disclosing would confuse more than filter).
- **"We'll text you within 1 hour"** is repeated in the intro, the disclaimer, and the thank-you screen. This is a deliberate expectation-setter — it conditions the lead to expect an SMS (not an Instagram DM, not a phone call out of nowhere) and frames the texting cadence as a feature, not a delay.
- **"A 15-min call lets us lock your final quote on the spot — usually faster than back-and-forth on chat"** in the thank-you screen is the nudge toward a call without forcing it in the form. Frames the call as efficient (15 min, on-the-spot quote) rather than as a sales pressure.
- **Thank-you CTA to @sirftents Instagram** is warm-up content during the SMS wait, not a contact channel. Instagram is a portfolio surface for this audience — they look at past weddings — but they don't message there.
- **Hero image: Open Sky Experience** over the Crystal Affair because Open Sky shows the experience (the dinner, the lights, the people) where Crystal Affair shows just the tent. Open Sky converts to "I want my wedding to feel like that" faster.

---

## What to test or change if this underperforms

Watch the form-quality dashboard for 14 days post-launch. Key metrics:

| Metric | Healthy | Unhealthy → action |
|---|---|---|
| **Cost per lead** | Will rise vs. old form (expected — Higher Intent filters volume) | If it *also* doesn't shift cost-per-`QuoteCallBooked`, the form is over-filtering |
| **Cost per `QuoteCallBooked`** (primary metric) | Should drop 20-40% vs. old form | If flat or worse → see "if underperforms" below |
| **SMS reply rate** | >50% within 24h | Below 40% → SMS templates are too generic or sending from a number leads don't recognize |
| **Show-up rate to booked calls** | >70% | Below 60% → call confirmation flow needs work, not the form |
| **Quote-to-deposit conversion** | Noisy, watch the trend | This is the true success metric; the form's job is to feed it cleaner leads |

### If it underperforms — ordered fixes to try

1. **Test the SMS templates first, not the form.** If reply rate is low, the form is doing its job and the post-submit handoff is leaking. Re-write templates by Q3 segment. Consider sending the SMS from Gurvir's personal-feeling number rather than a corporate sender.
2. **Soften Q3 if "just exploring" is over-selected.** If >40% of leads pick "just exploring," they're hedging because the other options feel like commitments. Rename "Just exploring" to *"More than 3 months out — taking my time"* and see if the distribution rebalances.
3. **Add a postal-code field to Q4 if delivery quotes are wrong on the call.** Only do this if Gurvir is consistently mis-quoting delivery. The cost is ~5-10% completion-rate drop.
4. **Re-test Q2 lowest bracket.** If the 60–80 bracket converts noticeably worse than the 80+ brackets, the 60-floor is too generous for the Legacy+Premium campaign and those should be routed to High Peak instead. Cut the 60–80 bracket and let the floor become 80.
5. **Re-test the Higher Intent setting** (`is_optimized_for_quality: true`). If lead volume drops sharply but quality doesn't rise proportionally, the review screen is filtering people you wanted. Toggle off and compare 7-day windows.
6. **Test an in-form `DATE_TIME` appointment slot (the cut v3 design) as Q6.** Only if Q3 + SMS-booking flow isn't closing fast enough. Adds friction; reserve for a quality push.
7. **Last resort — split the form by event type.** Wedding-only form vs. corporate-only form. Different intro screens, different brackets, different SMS templates. Higher operational overhead, but if corporate leads are dragging down the wedding-funnel metrics, splitting them out fixes that.

---

## Files & references

- **Plan / build notes:** `/Users/pawan/.claude/plans/act-as-warm-mist.md` (full design rationale, draft history v1→v3, JSON spec for `POST /{page_id}/leadgen_forms`)
- **HubSpot ↔ Meta integration:** `handoffs/hubspot-meta-integration.md` (CAPI mapping, `QuoteCallBooked` as primary optimization target)
- **Project rules:** `CLAUDE.md` (lead-gen form principles applied here)
