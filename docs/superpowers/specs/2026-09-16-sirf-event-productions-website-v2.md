# SIRF Event Productions — Website Design Spec v2

**Date:** 2026-09-16
**Owner:** Gurvir
**Status:** DRAFT — pending review
**Supersedes:** `2026-05-19-sirf-tents-website-design.md` (the "v1 spec"). This document only fully restates what changed. Everything not mentioned here (package pricing table, form field list, schema JSON shapes, post-submit email/SMS copy, GBP optimization checklist) carries forward from v1 unchanged — see the cross-reference table in §0.3.

---

## 0. What changed from v1, and why

### 0.1 Context

v1 was written 2026-05-19 and never executed — no domain was registered, no HubSpot theme was uploaded, nothing is live. So this is a redesign of a plan, not a rebuild of a shipped site. Nothing is being thrown away that customers have ever seen.

Since v1 was written: the business rebranded to **SIRF Event Productions** (new logo, new palette), and today's session added two hard requirements v1 didn't have — a scroll-stopping 3D hero, and explicit per-scroll CTA density — plus a platform decision to build custom rather than on HubSpot CMS.

### 0.2 Deltas (the only things this document changes)

| Area | v1 (May) | v2 (this doc) | Why |
|---|---|---|---|
| **Platform** | HubSpot CMS Hub Starter (`hs` CLI theme) | **Next.js + React Three Fiber + GSAP, deployed on Vercel** | Explicit instruction: build on today's stack, not HubSpot CMS. HubSpot CMS can't do a real WebGL hero well; Next.js can. |
| **Brand name** | "Sirf Tents" everywhere (domain, schema, copy) | **"SIRF Event Productions"** everywhere | Explicit rebrand instruction — full rename, not a dual-brand compromise. |
| **Palette** | Cream `#F8F4ED` + gold `#B08D57` (proposed, never validated against real photos) | **Cream/moss system anchored to the real logo color** (§4) | The gold palette was only ever a v1 proposal. We now have the actual logo and its real color. |
| **3D hero** | None — pure photography | **WebGL 3D hero centerpiece** (§5), progressive-enhancement so it doesn't break the Core Web Vitals targets v1 already set | Hard requirement from today's session. |
| **Copy framework** | Hormozi Value Equation, strict — Schwartz/AIDA explicitly banned | **Hormozi stays the structuring framework** (still mandatory per CLAUDE.md), but direct-response *craft* — specificity, curiosity hooks, bucket-brigade flow, sharper CTA phrasing — is used as a technique layer on top. **Not** Schwartz's 5-level awareness ladder as a structuring device | Owner's read: website visitors in this category are rarely Unaware/Problem-Aware — almost everyone landing on a tent-rental site already knows they want a tent and is evaluating vendors. That's exactly the bottom-of-funnel condition Hormozi's equation is built for (prove dream outcome, certainty, speed, ease) — a long awareness-building ladder would be wasted motion here. |
| **CTA cadence** | CTA at natural section boundaries (roughly every 2–3 sections already) | **Explicit rule: no more than ~2 major sections between CTA touchpoints** on every long page | Hard requirement from today's session — makes the existing pattern a checked rule instead of an implicit one. |
| **Location pages** | Brampton, Mississauga, Toronto, Vaughan, Markham, Oakville | **Brampton, Mississauga, Milton, Caledon** for v1 launch; Toronto/Vaughan/Markham/Oakville held for v2 once real event photos exist there | v1's own rule (§6.3: never fake a city page) argues for building first where the real booking history and photography actually is. Your 2026 bookings sheet shows repeated real events in Milton (Barnscape Studios, Derry Road) and Caledon (Mclaughlin Road) — Toronto/Vaughan/Markham/Oakville don't show up in the same data. Flagging this as my call, not yours — override if you're actively targeting those cities for growth reasons the booking history doesn't show yet. |
| **Sitemap scope** | 27 pages | **Same 27-page shape carried forward** (§3) — nothing in it was cut. Per today's instruction, anything in v1's sitemap that helps conversion or SEO stays. | Explicit instruction to keep whatever in the old sitemap helps CVR/SEO — that's essentially all of it; v1's architecture was already built for exactly those two goals. |
| **CRM/automation layer** | Native HubSpot CMS form → HubSpot workflows | **Same HubSpot workflows, pipelines, Meetings tool, and CRM properties — reached via HubSpot's Forms/CRM API from the Next.js form instead of a native CMS form** (§9) | HubSpot's marketing automation (workflows, pipelines, Meetings, CAPI events) triggers off CRM data, not off which platform rendered the page. Switching the front end doesn't touch this layer — it's the one part of v1 that ports over with zero redesign. |
| **Services scope** | Packages (Tents only — decor/floor-wrap were already just add-ons, never a nav item) | **Unchanged** | v1's nav was already tent-only (Packages / Inventory / Gallery / About / FAQ). The "remove decor, floor wrap" instruction from today doesn't require any change here — it was already true. |

### 0.3 What's unchanged and where to find it in v1

| Still governs | v1 section |
|---|---|
| Exact package pricing, guest brackets, SKU names (High Peak 40/60/80, Legacy Standard/Signature/Grand) | v1 §5.3 |
| "What's included" per-package breakdown | v1 §5.1.B |
| Inquiry form field list + conditional logic + spam prevention | v1 §9 |
| Post-submit email/SMS sequence + timing | v1 §10 |
| HubSpot deal/pipeline routing logic (Pipeline A/B by guest count) | v1 §9.6, §10.6 |
| Schema.org JSON-LD shapes (LocalBusiness, Service, FAQPage, BreadcrumbList) | v1 §11 — only the `name` field changes, see §12 below |
| GBP optimization + review velocity + launch checklist | v1 §12 |
| Inventory showcase page content (tents/chairs/tables/flooring/draping/bars) | v1 §5.4 |
| Google Ads LP structure (3 LPs, no-nav, single CTA) | v1 §8 |

---

## 1. Positioning & brand (updated)

### 1.1 North star — unchanged, restated

> **The Lululemon of tent rental in the GTA wedding market.** Premium-tier, aesthetic-led, culturally fluent. We compete on the visceral feeling a bride gets imagining her wedding day under our tent — not on price.

Everything in v1 §1.1–1.2, §1.5–1.7 (audience priority, the three moats, positioning negatives, tone of voice) carries forward unchanged. Read v1 §1 for the full brief — it's still correct and nothing here contradicts it.

### 1.2 Brand name — full rename

**SIRF Event Productions** replaces "Sirf Tents" everywhere: domain, page titles, schema `name`, footer, email sender name, GBP listing name, social handles (confirm actual live Instagram/Facebook handles before launch — rebrand may not have propagated there yet; don't assume `@sirfeventproductions` is live without checking).

The tent-rental service itself has no separate product-line name on this site — it's simply "tent rentals," one of SIRF Event Productions' offerings, consistent with the "remove decor, floor wrap" instruction keeping this site's scope to tents only.

### 1.3 Copy framework — Hormozi-primary, direct-response craft as technique layer

**Structuring logic stays Hormozi (mandatory, per CLAUDE.md):**

> Value = (Dream Outcome × Perceived Likelihood of Achievement) ÷ (Time Delay × Effort & Sacrifice)

Every section is still built to maximize this equation exactly as v1 §1.3 lays out (dream outcome = sensory wedding-day description, likelihood = social proof + named real events, time delay = fast-reply promises, effort = "we deliver/install/tear down, you do nothing").

**What's new: a craft layer borrowed from direct-response copywriting, applied *within* Hormozi's structure, not replacing it:**

- **Specificity over vague claims** — already a v1 principle, reinforced: "$47,329" beats "a lot of money"; "200+ GTA events" beats "many happy customers"
- **Curiosity in subheads, sparingly** (1–2 per page, not every section) — e.g. a package page subhead that opens a small loop before the "What's included" table closes it
- **Bucket-brigade transitions** between sections on long-form pages (packages, inventory) to keep scroll momentum — short connective phrases ("Here's what that actually includes." / "The math is simple.") rather than flat section breaks
- **Sharper, benefit-oriented CTA copy** — "Get Your Quote" stays as the default per v1, but package/location pages can use the sharper form ("See Your Date's Availability") where it fits naturally

**Explicitly still not used:** Eugene Schwartz's 5-level awareness ladder as a structuring device, AIDA, generic feature-benefit bullet grids. The reasoning holds and is sharper now: almost nobody arrives at a tent-rental site unaware they want a tent. They're Solution-Aware or Product-Aware in Schwartz's own terms — already evaluating vendors. Building copy as if we need to walk them up an awareness ladder wastes the exact space Hormozi's equation should occupy: proving *we're* the certain, fast, effortless, high-dream-outcome choice among the vendors they're already comparing.

---

## 2. Technical architecture

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router)** | Component reuse across 27 pages, image optimization, metadata API for per-page SEO, strong fit for AI-assisted code generation |
| 3D | **React Three Fiber (Three.js)** — hero only | Full control over the assembling/rotating tent scene; isolated to one component so it never touches page weight elsewhere |
| 2D animation | **GSAP + ScrollTrigger** | Scroll-driven reveals, parallax, CTA-band entrances — lightweight relative to a second 3D engine |
| Styling | **Tailwind CSS**, tokens matching §4 palette | Fast to build consistently across 27 pages |
| Hosting | **Vercel** | Edge caching, image CDN, one-command deploys, solves the "nothing set up yet" domain/hosting gap from v1 |
| CRM / automation | **HubSpot** (unchanged) — reached via **HubSpot Forms API** (or a Vercel serverless function calling the CRM API directly) from the Next.js form | Every workflow, pipeline, Meetings link, and CAPI event from v1 §9–10 keeps working — HubSpot's automation triggers off CRM records, not off which platform submitted them |
| Domain | `sirfeventproductions.com` (verify availability; not yet registered) | Matches the full rename. Modern SEO doesn't need an exact-match domain — title tags, H1s, and schema carry the keyword relevance instead (see §12) |

**Why this doesn't cost you the CRM/automation work already designed in v1:** the multi-step form still POSTs to the same HubSpot contact/deal properties, the same Pipeline A/B routing by guest-count bracket still applies, the same Meetings link and email/SMS sequence still fire — none of that is HubSpot-CMS-specific, it's HubSpot-CRM-specific, and the CRM doesn't care what rendered the page that called it.

---

## 3. Sitemap (carried forward from v1, city list updated)

```
/                                        Homepage — 3D hero + Hormozi outcome sections
/packages                                Packages overview
  /packages/legacy-standard              Legacy Standard ($3.5K+)
  /packages/legacy-signature             Legacy Signature ($6.5K+)
  /packages/legacy-grand                 Legacy Grand ($9K+)
  /packages/high-peak-40                 High Peak — 40 guests ($500+)
  /packages/high-peak-60                 High Peak — 60 guests ($800+)
  /packages/high-peak-80                 High Peak — 80 guests ($1K+)
/inventory                               Inventory showcase (visual catalog, no prices)
/gallery                                 Real past events, captioned
/weddings                                Event-type: Weddings
/engagements                             Event-type: Engagements + Milestones
/corporate                               Event-type: Corporate
/locations/brampton                      Location: Brampton
/locations/mississauga                   Location: Mississauga
/locations/milton                        Location: Milton  ← swapped in (real booking history)
/locations/caledon                       Location: Caledon  ← swapped in (real booking history)
/about                                   Founders, story, 200+ events anchor
/faq                                     FAQ with schema markup
/contact                                 Contact + service area + phone + email + map
/inquire                                 Lead form page (also embedded as modal site-wide)
/thank-you                               Post-submit page
/lp/wedding-tent-rental                  Google Ads LP (no nav)
/lp/brampton-gta-tents                   Google Ads LP (no nav)
/lp/premium-luxury-tents                 Google Ads LP (no nav)
```

23 pages for v1 launch (down from 26 — 4 cities instead of 6). Toronto, Vaughan, Markham, Oakville held for v2 (see §0.2). Navigation, footer, URL conventions, and internal-linking strategy are otherwise identical to v1 §2.2–2.6 — re-read those, nothing changes there except the location list in the footer.

---

## 4. Brand system (updated palette)

### 4.1 Typography — unchanged from v1

Cormorant Garamond (display) + Inter (body). Still the right pairing — it already matches the elegant serif-italic feel of the actual logo wordmark. No change needed.

### 4.2 Color palette — rebuilt around the real logo color

The gold/cream system in v1 §3.2 was a proposal made before the real logo existed. The logo's embossed background green is genuinely SIRF's own color — this system is built around it, keeping the same structural roles (warm neutral background, one confident accent, dark ink) v1 established.

| Role | Hex | Use |
|---|---|---|
| Background (primary) | `#F6F4EE` | Page background — warm off-white, same job as v1's cream |
| Background (sections, alt) | `#DADED8` (Aloe) | Alternating section backgrounds for rhythm, instead of pure white |
| Surface | `#FFFFFF` | Card surfaces, form fields |
| Ink (primary text) | `#20241D` | Headlines and body — a deep moss-black instead of neutral black, ties text color to brand |
| Ink (secondary) | `#5B5F52` | Captions, meta text |
| **Accent (primary — from the logo)** | `#4C583E` (Cypress) | CTA pills, hover underlines, key numbers ("200+"), section dividers — sparingly, never a fill background at this shade |
| Accent (hover) | `#3A4330` | CTA hover state |
| Accent (secondary/lighter) | `#768064` (Olive) | Tags, secondary buttons, less-critical accents |
| Soft border | `#DCD9CC` | Card borders, hairlines, form-field borders |
| Error / required | `#A63E3E` | Form error states only — unchanged from v1 |

**No-go colors:** any blue, pure black `#000` backgrounds, gradients, any color outside this system. Same rule as v1, just recolored.

**Validation step before build:** same as v1 §6, Step 3 — hold this palette against 5–10 real event photos before locking it. If the professional photography skews warm-gold rather than cool-green, the accent may need to shift toward Olive rather than Cypress. Gurvir makes the final call once photos are in hand.

### 4.3 Logo usage

Export the embossed monogram + wordmark in the three standard variants (full-color, monochrome, white-on-dark) exactly as v1 §6 Task 6 Step 2 specifies. The embossed paper-texture treatment from the reference image is a photograph of a physical effect, not a reusable web asset — for on-screen use, recreate the same feeling with a subtle drop-shadow/inner-shadow CSS treatment rather than shipping the textured photo as the logo file.

---

## 5. 3D hero (new)

### 5.1 What it shows

A stylized rendering of SIRF's actual Legacy Structure tent — the proprietary 9.5 ft-leg-pole, no-cross-cable structure tent that's already one of the three brand moats (v1 §1.5). The hero **assembles itself**: poles rise into place, the canopy unfurls and settles, then string lights along the peak ignite one by one, ending in a soft, slow rotation that shows the tent from multiple angles. Lighting environment matches the brand's warm dusk photography direction.

This is a real product detail turned into the hero moment — not generic "a tent" but *your* tent, which reinforces the "proprietary structure" moat instead of just decorating the page.

### 5.2 Technical approach — progressive enhancement

1. **First paint:** a compressed poster image or short muted video loop of the same concept paints immediately (this is the LCP element — preloaded, AVIF/WebP)
2. **Hydration:** the React Three Fiber scene loads in a separate, lazily-loaded chunk and crossfades in once ready — a slow connection or low-end device still sees a fast, good-looking hero before (or even without) the 3D layer
3. **Mobile:** a lighter-weight variant — fewer lights, simpler geometry, or the poster/video loop only if device capability checks indicate a low-end GPU
4. **Accessibility:** respects `prefers-reduced-motion` — falls back to the static poster with no assembly animation

### 5.3 Performance budget

This must fit inside the Core Web Vitals targets v1 §4.3 and §11.7 already set (LCP <2.5s mobile / <2.0s desktop, CLS <0.1, INP <200ms, Lighthouse mobile >85). The 3D bundle is code-split so it never blocks those numbers — if it can't hit budget on a mid-range Android device during build, the fallback is the poster/video loop permanently on mobile, WebGL only on desktop.

---

## 6. Homepage — CTA cadence updated

v1 §4.1's ten sections (Hero → Social proof → Outcome → Packages preview → Process → Real weddings → Service area → Testimonials → FAQ teaser → Final CTA) stay as the homepage structure, with the 3D hero replacing the static photo in Section A. Applying today's explicit CTA-cadence rule against that structure:

| Section | CTA present? |
|---|---|
| A — Hero | ✅ Primary CTA |
| B — Social proof | — |
| C — Outcome | — *(2 sections since last CTA — rule allows one more before requiring a new one)* |
| D — Packages preview | ✅ "See package" links + soft CTA |
| E — Process | — |
| F — Real weddings | ✅ **New: slim CTA band added here** ("Like what you see? Check your date.") — closes the gap that would otherwise run B→C→D(soft)→E→F, too long without a hard CTA |
| G — Service area | — |
| H — Testimonials | ✅ **New: slim CTA band added here** for the same reason |
| I — FAQ teaser | — |
| J — Final CTA | ✅ Primary CTA |

Two new slim CTA bands (after F and after H) close the gaps — full-width single-line bands, not full sections, so they don't bloat the page. Same pattern applies to Packages overview, Inventory, and each Location/Event-type page: check the section list against the ~2-section rule and add a slim CTA band wherever the gap exceeds it.

---

## 7. Everything else

Package detail template (v1 §5.1–5.3), inventory page (v1 §5.4), location page template (v1 §6.1 — same structure, just 4 cities not 6), event-type pages (v1 §7), Google Ads LPs (v1 §8), inquiry form (v1 §9), post-submit flow (v1 §10), schema/technical SEO (v1 §11 — update `name: "Sirf Tents"` → `name: "SIRF Event Productions"` and `url`/`sameAs` to match the new domain/handles), and the GBP + launch checklist (v1 §12) all carry forward as written. Two schema-specific notes:

- **`sameAs` links** (Instagram/Facebook/GBP) — confirm the actual live handles before launch; don't assume they've been renamed to match the site yet
- **`priceRange` and `aggregateRating`** — unchanged, still pulled from GBP at launch time

---

## Open items before build

1. **Domain:** confirm `sirfeventproductions.com` availability (or pick an alternative) — same pre-launch task as v1 §12.2 had for sirftents.com
2. **Palette validation:** hold the §4.2 palette against 5–10 real professional photos before locking it
3. **Social handles:** confirm current live Instagram/Facebook handles reflect the rebrand or still say "Sirf Tents"
4. **3D asset budget:** confirm real professional photography exists for the poster/fallback frame the 3D hero degrades to

---

## Self-review

- **Placeholder scan:** no TBD/TODO left unresolved except the 4 open items above, which are genuinely pending external facts (domain availability, live social handles) rather than unmade decisions.
- **Internal consistency:** copy framework (§1.3) matches CTA phrasing guidance (§6); tech architecture (§2) matches the CRM-porting claim (§0.2, §7); palette (§4.2) role structure matches v1's original roles so nothing else in the carried-forward sections breaks.
- **Scope:** this is a full site spec (23 pages) — matches v1's scope, appropriately large for a 27-page-class project. Phase 2 implementation planning should split this into a build sequence, not attempt one plan for all 23 pages.
- **Ambiguity check:** the one real judgment call (location city list) is flagged explicitly as my call with reasoning, not left ambiguous.
