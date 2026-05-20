# Sirf Tents — Website Design Spec

**Date:** 2026-05-19
**Owner:** Gurvir
**Status:** DRAFT — sections 1–4 written, sections 5–12 pending review.

---

## Context (load-bearing facts, frozen at spec write)

- **HubSpot tier:** CMS Hub Starter (~$25/mo). No HubDB dynamic pages, no A/B testing, no smart content, ~30-page cap. Custom domain supported.
- **HubSpot MCP available in Claude Code is CRM-only** (no `create_page` / `create_module` / `publish_page`). Page assembly happens in HubSpot UI / Design Manager; custom modules via `hs` CLI from local.
- **Domain:** not yet registered. Pre-launch task.
- **Primary site goals:** (1) local SEO #1 in GTA wedding-tent searches, (2) high-converting landing surface for Google Ads ($1.5K–$5K/mo mid-scale spend).
- **Channel routing already live (do NOT cross):** Legacy + Premium Meta ad → instant form → IG Messages. High Peak Meta ad → Click-to-WhatsApp. **Website lead → email + SMS + consultation call (new third channel, all leads).**
- **Service area for location pages:** Brampton + immediate neighbors (Brampton, Mississauga, Caledon, Vaughan) + Wider GTA core (Toronto, Markham, Richmond Hill, Oakville, Burlington). Outer GTA + beyond GTA only on $5,000+ AOV bookings — handled as case-by-case, no dedicated LP.
- **Inventory model:** packages priced publicly with "starting at $X". Individual add-ons (tables, chairs, draping, fairy lights, floor wrap, flooring) shown visually as catalog without per-item prices.
- **Photography:** professional cinematic shots already exist and are ready to ship.
- **Positioning:** "Lululemon of tent rental" — premium luxury aesthetic, competes on taste not price, filters cost-shoppers.
- **GBP status:** exists but unverified/unoptimized → pre-launch task, single largest local-SEO unlock.
- **Brand assets:** logo exists; full type/color system TBD — this spec proposes one.
- **Catalog PDF:** owner has a brand-styled print catalog shared with clients; not yet in project folder. Spec proceeds with package/inventory structure inferred from CLAUDE.md SKU anchors + Meta form; refine when PDF arrives.

---

## Architecture decision (locked)

**Option C — Conversion-First with SEO Wings.** 27 pages total, within Starter's ~30-page cap with buffer for seasonal LPs:

| Group | Count | Pages |
|---|---|---|
| Marketing core | 7 | Homepage / Packages overview / Inventory showcase / Gallery / About / FAQ / Contact |
| Package detail | 6 | Legacy Standard / Legacy Signature / Legacy Grand / High Peak 40 / High Peak 60 / High Peak 80 |
| Location | 6 | Brampton / Mississauga / Toronto / Vaughan / Markham / Oakville (Burlington folds into Oakville copy; Caledon + Richmond Hill mentioned on nearest neighbor pages — add as v2 if traffic warrants) |
| Event-type | 3 | Weddings / Engagements / Corporate (Milestones folds into homepage + Engagement page) |
| Google Ads LPs (no nav) | 3 | Wedding-tent LP / Brampton-GTA LP / Premium-luxury LP |
| Conversion plumbing | 2 | Inquiry form (page + reusable modal) / Thank-you |
| **Total** | **27** | **3 pages of buffer remain** |

---

# 1. Positioning & creative brief

## 1.1 North star

> **The Lululemon of tent rental in the GTA wedding market.**
>
> Premium-tier, aesthetic-led, culturally fluent. We don't compete on price. We compete on the visceral feeling a bride gets when she imagines her wedding day under our tent.

## 1.2 Audience priority (in order)

1. **The bride** (decision-maker, emotion-led, visually driven, on Instagram daily)
2. **The mother of the bride/groom** (gatekeeper, trust-led, asks "have you done weddings like ours?")
3. **The wedding planner** (efficiency-led, repeat buyer, wants reliable partners she can stake her reputation on)

Every page is written for the bride first. The mother and planner are served by trust signals layered around the primary copy (named past events, "200+ GTA events," real photos with credit), not by separate landing pages.

## 1.3 Copy framework — Hormozi value equation (mandatory)

> **Value = (Dream Outcome × Perceived Likelihood of Achievement) ÷ (Time Delay × Effort & Sacrifice)**

Every section on every page is checked against this equation. Specifically:

| Lever | What we say to maximize it |
|---|---|
| **Dream outcome** (numerator) | Vivid, sensory description of the wedding day — *"the moment your guests step under the clear-top and look up at 200 hanging bulbs"* — not feature lists |
| **Perceived likelihood** (numerator) | *"Rated 5 Stars — 200+ GTA Events"* (verbatim), real named events (Crystal Affair, Open Sky Experience), real client testimonials with photos, real venues mentioned by name |
| **Time delay** (denominator, minimize) | "Reply within 1 hour," "15-min call locks your quote," "Book your date in under a week" |
| **Effort & sacrifice** (denominator, minimize) | "We deliver, set up, tear down — you do nothing," "One number to call for tent + tables + chairs + draping + lights" |

**Not allowed:** Eugene Schwartz framework, AIDA, generic feature-benefit grids, "Why choose us" bullet lists with checkmarks. Those signal small-business-template. Hormozi value-equation phrasing signals premium specialist.

## 1.4 Social proof line (verbatim, never modified)

> **"Rated 5 Stars — 200+ GTA Events"**

This appears in the hero of every page, in the footer, and in the email signature of the auto-response. It is the single most important credibility anchor on the site.

## 1.5 The two moats

| Moat | What it means in copy/imagery |
|---|---|
| **Cultural fluency** (South Asian wedding specialists) | Mention sangeet, mehndi, reception, baraat by name — never generic "South Asian wedding." Show clear-top tents for daytime ceremonies (cultural preference). Photo selection includes Sikh, Hindu, Muslim weddings explicitly. Brand voice uses Indian wedding industry vocabulary natively, not as a translation. |
| **Premium aesthetic** (taste over price) | Cinematic photography, generous whitespace, serif display type, transparent floor pricing ("starting at $3,500") that signals premium without hiding the number. We're not the cheapest — and we say so by what we don't say. |

## 1.6 What Sirf Tents is *not* (positioning negatives)

- Not a generic party rental vendor (no kids' birthdays, no baby showers, no graduations under 60 guests)
- Not a backyard/casual event vendor
- Not the cheapest option (and not embarrassed about it)
- Not a self-serve catalog (no "add to cart" — every booking is consultative)
- Not B2B (no corporate-event-vendor positioning even on the corporate page — corporate is sold as "experiences," not as "AV + tent")

## 1.7 Tone of voice

- **Direct and confident** — no hedging, no "we'd love to help you"
- **Sensory and specific** — describe the day, not the tent
- **Warm but premium** — never sales-y, never cute, never emoji-heavy
- **Indian-English fluent** — comfortable using *sangeet*, *baraat*, *reception* without italics or footnotes, but never othering or self-orientalizing

---

# 2. Sitemap, URL structure, navigation

## 2.1 Full sitemap (26 pages)

```
/                                        Homepage
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
/locations/toronto                       Location: Toronto
/locations/vaughan                       Location: Vaughan
/locations/markham                       Location: Markham
/locations/oakville                      Location: Oakville (+ Burlington mentioned in copy)
/about                                   Founders, story, 200+ events anchor
/faq                                     FAQ with schema markup
/contact                                 Contact + service area + phone + email + map
/inquire                                 Lead form page (also embedded as modal site-wide)
/thank-you                               Post-submit page
/lp/wedding-tent-rental                  Google Ads LP (no nav)
/lp/brampton-gta-tents                   Google Ads LP (no nav)
/lp/premium-luxury-tents                 Google Ads LP (no nav)
```

## 2.2 URL conventions

- Lowercase, hyphen-separated, no trailing slash, no dates, no IDs
- No `/blog` for v1 (defer blog to a post-launch SEO push if traffic warrants — every blog post eats a slot in the 30-page cap)
- Google Ads LPs live under `/lp/*` and are explicitly disallowed in `robots.txt` from organic indexing — keeps Quality Score scoped to ads
- All location pages use `/locations/<city>` (not `/<city>-tent-rental`) — keeps URL structure crawl-friendly and lets us add more cities without slug collisions

## 2.3 Primary navigation

```
[ SIRF TENTS logo ]   Packages   Inventory   Gallery   About   FAQ        [ Inquire → ] (gold pill button, always visible)
```

- 5 main links + 1 persistent CTA. Contact is in the footer, not the nav — the CTA *is* the contact path.
- Locations and event-type pages live in the footer (so they have a single internal-linking parent and don't dilute the primary nav)
- No mega-menu, no dropdowns — premium brands don't need them

## 2.4 Footer (universal)

```
SIRF TENTS                                            Inquire
                                                      Call: (XXX) XXX-XXXX
                                                      Email: hello@sirftents.com

Packages                  Locations                   Events
- Legacy Standard         - Brampton                  - Weddings
- Legacy Signature        - Mississauga               - Engagements
- Legacy Grand            - Toronto                   - Corporate
- High Peak 40            - Vaughan
- High Peak 60            - Markham
- High Peak 80            - Oakville

Inventory · Gallery · About · FAQ · Contact

Rated 5 Stars — 200+ GTA Events     @sirftents on Instagram

© 2026 Sirf Tents · Brampton, ON · Privacy · Terms
```

The footer is the SEO internal-linking hub — every location page, every package page, every event-type page is linked once site-wide here.

## 2.5 Mobile navigation

- Hamburger top-right, logo top-left
- Sticky bottom bar: `[ Call ] [ Inquire ]` — gold pill, always visible
- Hamburger expands to full-screen overlay, not a tray (premium feel)
- Sticky bar is suppressed on `/inquire` and `/thank-you` to avoid double-CTA

## 2.6 Internal linking strategy

| From | Link to | Reason |
|---|---|---|
| Every package page | All other packages (in a "compare" rail at bottom) | Anchor link equity across SKUs |
| Every location page | The 3 most-relevant package pages | Local-intent → product-intent conversion |
| Every event-type page | All 6 package pages + relevant testimonials | Event-intent → product-intent conversion |
| Homepage | Top 3 packages + top 3 locations + gallery | Surface SEO targets from the highest-PR page |
| FAQ | Every package mentioned by name (anchor-linked) | Spreads link equity from FAQ schema impressions |
| Google Ads LPs | Nowhere (no internal links out — single CTA only) | Maximize ad Quality Score and reduce bounce |

---

# 3. Brand baseline (proposed — approve or redirect)

## 3.1 Typography

| Role | Family | Fallback | Notes |
|---|---|---|---|
| Display (H1, hero, named callouts) | **Cormorant Garamond** (700, italic 400) | `Georgia, serif` | Serif with character. Italic for accents. Premium-wedding-vendor signature without being clichéd. |
| Heading (H2, H3) | **Cormorant Garamond** (500–600) | `Georgia, serif` | Same family, lighter weights, builds visual hierarchy |
| Body | **Inter** (400, 500, 600) | `system-ui, -apple-system, sans-serif` | Clean, neutral, modern. Reads well on mobile. Pairs with Cormorant. |
| UI / forms / nav | **Inter** (500) | same | Same family as body for consistency |

**Why not:**
- *Playfair Display* — overused by every wedding vendor since 2016. Signals "I picked a Google Font."
- *Lulo Clean* — the H&H Tents heading font. Industrial, not premium.
- *Bodoni / Didot* — too high-fashion magazine, reads cold for the warmth we want
- *Cinzel* — wedding-vendor cliché tier-2

## 3.2 Color palette

| Role | Hex | Use |
|---|---|---|
| Background (primary) | `#F8F4ED` | Page background — warm cream, not cold white. Reads luxe and photographic. |
| Background (sections) | `#FFFFFF` | Card surfaces, form fields, contrast sections |
| Ink (primary text) | `#1A1A1A` | All body and headline text |
| Ink (secondary) | `#4A4A4A` | Captions, meta, secondary copy |
| Gold accent | `#B08D57` | CTA pills, hover underlines, key numbers ("200+"), section dividers — used **sparingly**, never as a fill background |
| Gold (hover) | `#937340` | CTA hover state |
| Soft border | `#E8E1D5` | Card borders, hairlines, form-field borders |
| Error / required | `#A63E3E` | Form error states only — never used elsewhere |

**Explicit no-go colors:** any blue (would echo H&H's `#0000EE` accidental palette), any pure black `#000` background, any rainbow brand palette, any gradient.

## 3.3 Spacing & layout

- **Base unit:** 8px. All padding/margin in multiples (8, 16, 24, 32, 48, 64, 96, 128).
- **Section vertical rhythm:** desktop 128px top/bottom; mobile 80px top/bottom. Generous — premium brands breathe.
- **Max content width:** 1280px for marketing pages; 720px for body-copy zones (improves readability).
- **Grid:** 12-column, 24px gutter desktop; 4-column, 16px gutter mobile.
- **Border radius:** 4px on inputs and small cards; 0px on hero images and full-bleed photos (sharp = premium); 9999px (pill) on CTAs only.

## 3.4 Photography direction

| Use case | Specification |
|---|---|
| Hero images | Real past events. Wide aspect (16:9 or 21:9). Low-key, warm-toned, dusk/golden-hour preferred. Tent fills frame, people present but soft-focus. |
| Package page heroes | Vertical 4:5 portrait orientation. Single hero photo per package, no carousel. The image *is* the proof. |
| Inventory showcase | Square 1:1, even lighting, isolated product against neutral backdrop OR in-context detail crops |
| Gallery | Mix of 3:2 landscape and 4:5 portrait. Captioned with event name + venue + month. No watermarks (premium brands don't watermark — they ARE the watermark). |
| Testimonials | Real client photo (square crop, 1:1, ~120px round) + their actual wedding photo as background blur OR rectangular cover |
| Location pages | One hero photo from an actual wedding in that city. Caption: *"Brampton wedding — Aug 2024"* — proves we've worked there. |

**Color grading:** consistent warm-tone treatment across all imagery — slight orange/cream cast, lifted shadows, contained highlights. We'll define a single Lightroom preset and apply it to every hero image so the site reads as one visual brand, not a stock collage.

## 3.5 Component patterns

- **CTAs:** gold pill (`#B08D57`), Inter 500 16px, 16px vertical / 32px horizontal padding, slight 1px gold border for definition on hover (border darkens to `#937340`)
- **Cards:** white background, 1px `#E8E1D5` border, 4px radius, generous internal padding (32px desktop / 24px mobile)
- **Forms:** label above input (never placeholder-only labels — accessibility + premium feel), 1px `#E8E1D5` border, focus state = 2px gold inner ring
- **Section dividers:** 1px gold hairline `#B08D57` at 30% opacity, centered, 40px wide — used between major sections on long pages

## 3.6 Photography asset request

For brand baseline approval, I need to see 5–10 of the existing professional photos to confirm the warm-tone palette is right (vs. cool-tone if the existing photography skews that way). Drop them in `/Users/pawan/sirf-tents/assets/photography/` whenever convenient — spec assumes warm-tone direction for now.

---

# 4. Homepage spec

The homepage is the highest-trafficked page and the only page Google Ads campaigns can rely on for organic-driven trust signals. It does five jobs:

1. **Convince the bride this is the visual feeling she wants** (hero)
2. **Establish credibility instantly** (social proof bar, immediately below hero)
3. **Route to the right SKU** (packages preview)
4. **Reduce perceived risk** (process + testimonials + named case studies)
5. **Close** (final CTA + form anchor)

## 4.1 Section-by-section

### Section A — Hero (above the fold)

- **Background:** full-bleed cinematic hero photo (recommended: a clear-top dusk shot with table setting + soft hanging-bulb glow — the visual that says "this is the wedding I want"). Subtle dark gradient overlay (top-to-bottom 20% → 60%) to preserve text legibility.
- **Headline (H1, Cormorant Garamond 64–80px desktop / 40–48px mobile, white):**
  > *Tented weddings, made unforgettable.*
- **Sub-line (Inter 400, 18–20px, cream-white):**
  > *Premium tent rentals for GTA weddings, engagements & receptions. Delivered, set up, torn down — you do nothing.*
- **Social proof anchor (Inter 500, 14px, gold caps tracking):**
  > **★ ★ ★ ★ ★   RATED 5 STARS — 200+ GTA EVENTS**
- **Primary CTA (gold pill):** `[ Get Your Quote → ]` (anchors to inquire form modal)
- **Secondary CTA (text link, gold underline on hover):** `See packages`
- **Sticky elements:** none above fold — let the hero breathe.

### Section B — Social proof bar (immediately below hero)

Thin horizontal band, `#FFFFFF` background, 64px tall. Four columns, divider hairlines between:

| ★ ★ ★ ★ ★ | 200+ | 6+ Years | GTA-Wide |
|---|---|---|---|
| Rated 5 Stars | GTA Events | Premium Specialists | Brampton-Based |

Inter 600 24px headline, Inter 400 14px subline. Gold numerals. No images, no logos — just numbers. Builds credibility before the lead has seen a single package.

### Section C — "Built for the moment" (Hormozi outcome section)

H2: *"Built for the moment your guests stop and look up."*

Three-column visual grid, photo-led. Each column = one outcome the customer is buying (not a feature):

| Column | Photo | One-line outcome |
|---|---|---|
| 1 | Clear-top dusk shot, hanging bulbs | *"The look that makes your wedding the one everyone talks about."* |
| 2 | Bride and family under tent, golden-hour | *"The tent fits your day — Sikh, Hindu, Muslim, fusion, all of it."* |
| 3 | Setup-in-progress + finished setup split | *"You don't lift a finger. We deliver, install, tear down."* |

These are the three numerator levers (outcome × likelihood) plus one denominator lever (effort) in three sentences.

### Section D — Packages preview (the SKU router)

H2: *"Pick the size of your day."*

Six cards in a 3×2 grid (desktop) / 1-column stack (mobile). Each card:

```
┌─────────────────────────────────┐
│ [ Hero photo — 4:5 vertical ]   │
│                                 │
│ HIGH PEAK 60                    │ ← Inter 600 14px caps gold
│ For 60 guests · From $800       │ ← Inter 500 18px
│                                 │
│ "Intimate. Elegant. Done in a   │ ← Cormorant italic 18px
│  weekend."                      │
│                                 │
│ See package →                   │ ← gold text link
└─────────────────────────────────┘
```

Three High Peak cards first (left-to-right on desktop: 40, 60, 80 — entry-tier), three Legacy cards second row (Standard, Signature, Grand — premium-tier). Visual hierarchy mirrors how Gurvir actually sells: smaller events get the simpler card treatment, Legacy gets the larger photo per card (within the same grid — done via cropping, not column-span).

### Section E — Process (denominator-reducer)

H2: *"Four steps. We handle three of them."*

Horizontal 4-step row (desktop) / vertical timeline (mobile):

| # | Step | Sub-copy |
|---|---|---|
| 1 | **Inquire** | 60-second form. Tell us your date, guest count, and what you're picturing. |
| 2 | **Consult** | 15-minute call to lock the tent, the date, and the quote. |
| 3 | **Confirm** | We hold your date with a deposit. You stop worrying. |
| 4 | **Celebrate** | We deliver, install, tear down. You enjoy your wedding. |

This is the *effort & sacrifice* denominator lever made literal — three of four steps are *us* doing the work.

### Section F — Real weddings showcase

H2: *"Real weddings, real tents."*

A 6-photo grid pulled from actual past events. No fictional event names, no invented case-study titles — just real photography captioned with the facts that build trust:

```
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│                      │  │                      │  │                      │
│  [ Wedding photo 1 ] │  │  [ Wedding photo 2 ] │  │  [ Wedding photo 3 ] │
│                      │  │                      │  │                      │
│  Sikh wedding        │  │  Hindu reception     │  │  Engagement          │
│  Brampton · Aug 2024 │  │  Mississauga · 2024  │  │  Vaughan · Oct 2024  │
│  Legacy Signature    │  │  Legacy Grand        │  │  High Peak 80        │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘

(grid continues — 6 photos total on desktop, 3 stacked on mobile)
```

Caption format: **event type · city · month-year · package used**. Truthful, specific, no marketing puffery. Built for the bride who's checking *"have they actually done a wedding like mine, in my city, recently."*

Below the grid: `See full gallery →` (links to `/gallery`).

**No client names on the homepage.** Real names + photos appear only in Section H (Testimonials), where the explicit signal is *the person, not the event*. Separating the two surfaces means the gallery feels like portfolio (no overclaiming) and the testimonials feel like personal endorsement (no commodity-isation).

### Section G — Service area (local SEO + trust)

H2: *"GTA-wide. Brampton-based."*

Left column (desktop): map of GTA with 6 markers pulsing softly on Brampton, Mississauga, Toronto, Vaughan, Markham, Oakville. Right column: linked list of location pages — *"Wedding tents in Brampton, Mississauga, Toronto, Vaughan, Markham, Oakville. Outside the GTA? We travel for bookings over $5,000."*

Each city name is a link to the matching location page. Footer-equivalent internal linking, but visually featured on the homepage where it earns organic CTR.

### Section H — Testimonials

H2: *"What 200+ brides have said."*

Three testimonials, real names, real photos, real event credit. Carousel on mobile, 3-column grid on desktop.

```
┌─────────────────────────────────┐
│ [Round photo of bride/family]   │
│                                 │
│ "They handled everything. The   │ ← Cormorant 22px italic
│  tent looked exactly like the   │
│  inspo pics. My mom cried."     │
│                                 │
│ — Priya & Karan                 │ ← Inter 600 14px
│   Sikh wedding · Mississauga    │ ← Inter 400 12px gray
│   August 2024                   │
└─────────────────────────────────┘
```

**No five-star icons next to each quote** — the social proof bar already established the rating. Repeating it here makes it feel cheap.

### Section I — FAQ teaser (SEO + objection-handling)

H2: *"Quick answers."*

3 expanded FAQ items (not collapsed — they're load-bearing for SEO and trust):

1. *How much does a tent wedding cost?* → Direct answer with price floors, link to packages
2. *How far in advance should I book?* → Honest answer (peak May–Oct books 3–6 months out, off-peak 4–8 weeks), urgency without scarcity-bro vibes
3. *Do you deliver outside the GTA?* → "$5K+ AOV minimum, case-by-case" — frames the boundary as exclusivity, not exclusion

Link below: *"See all FAQs →"* (to `/faq`).

### Section J — Final CTA / inquiry anchor

Full-bleed cream `#F8F4ED` background. Centered:

> **Ready to start?**
>
> *Tell us about your day. We'll get back to you within the hour.*
>
> `[ Get Your Quote → ]` (large gold pill)
>
> Or call us: (XXX) XXX-XXXX · hello@sirftents.com

This is the homepage's final close. Single CTA, no distractions.

## 4.2 Mobile-specific behavior

- Section A hero: photo cropped to 9:16 portrait, headline shrinks to 40px, CTA stays gold pill
- Sticky bottom bar appears after user scrolls past Section A: `[ Call ] [ Inquire ]`
- Sections C and D collapse to single-column with full-width photos
- Section H testimonials become swipeable carousel
- Section G map becomes static image with cities listed below

## 4.3 Page-speed targets

| Metric | Target | Notes |
|---|---|---|
| LCP (Largest Contentful Paint) | <2.5s | Hero image is the LCP element — preload, AVIF format, responsive `srcset` |
| CLS (Cumulative Layout Shift) | <0.1 | Reserve hero image space with aspect-ratio CSS to prevent reflow |
| INP (Interaction to Next Paint) | <200ms | Minimal JS on homepage — defer non-critical scripts |
| Lighthouse Mobile | >85 | Achievable on HubSpot CMS with image optimization and minimal third-party scripts |

## 4.4 SEO on-page (homepage-specific)

- **Title tag (≤60 chars):** *Premium Tent Rentals GTA · Sirf Tents · Brampton*
- **Meta description (≤155 chars):** *Premium tent rentals for GTA weddings, engagements & receptions. Rated 5 stars over 200+ events. Brampton-based. Delivered, set up, torn down.*
- **H1:** *Tented weddings, made unforgettable.* (single H1 per page)
- **Image alt text:** Every image labeled with what it shows + city + event type (e.g., *"Sikh wedding clear-top tent Mississauga"*) — not stuffed, descriptive
- **Schema:** LocalBusiness + AggregateRating + Service (one Service entity per package) — full schema spec in section 11

---

# 5. Package detail page template

Applies to all 6 package pages (`/packages/legacy-standard`, `/packages/legacy-signature`, `/packages/legacy-grand`, `/packages/high-peak-40`, `/packages/high-peak-60`, `/packages/high-peak-80`). Same skeleton, different copy + photography + price floor per page.

## 5.1 Section-by-section

### 5.1.A Hero (above the fold)

- **Layout:** two-column on desktop (60/40 photo-left, copy-right), single-column stack on mobile (photo first, copy below)
- **Photo:** vertical 4:5 portrait of a real setup using this exact package. Warm-tone graded. No carousel — one image. The photo is the proof.
- **Headline (Cormorant Garamond 56–72px desktop):** the package name, e.g. *"Legacy Signature."* No verb, no adjective string — just the noun. Premium brands name their products like cars (Range Rover Velar, not "the Premium Mid-Size SUV").
- **Sub-headline (Inter 400, 18–20px):** one sentence outcome. Example for Legacy Signature: *"For 150–200 guests who want the wedding their families will talk about for a decade."*
- **Price anchor (Inter 600, 24px, gold):** `Starting at $6,500` — no asterisk, no "and up," no hidden caveat. The floor is the floor.
- **Primary CTA (gold pill):** `[ Inquire about Legacy Signature → ]` (pre-fills the inquiry form with this package selected)
- **Secondary CTA:** `Call us: (XXX) XXX-XXXX` as a tap-to-call text link below the primary

### 5.1.B "What's included" (the value-equation breakdown)

Three-column visual list. Each column is a category with icon/illustration + line items. No prices on add-ons — just visibility.

| Tent | Furniture | Add-ons |
|---|---|---|
| 40×80 Legacy structure tent · Clear top OR white top (your choice) · Side walls included · LED-rated power distribution | 200 chiavari chairs (gold or silver) · 25 round tables (60" diameter) · Linens included · 4 high-tops + spandex | Drape lining included · 200 fairy bulbs · Hardwood-look flooring · Floor wrap (white or ivory) |

Below the table, a single line:
> *Everything you see in the photos above is included in the package price. Upgrades available on the call.*

This eliminates the #1 friction in tent rental — *"is the [thing in the photo] included or extra?"*. Direct answer, no asterisk hunting.

### 5.1.C The vibe (Hormozi outcome paragraph)

H2: *"What it feels like."*

One 60–80 word paragraph, written in second-person, sensory, time-located. Example for Legacy Signature:

> *Your families have been waiting for this day. The tent goes up Friday morning. By Saturday at 4pm, 200 of your closest people walk in, look up, and see the bulbs catching the light through the clear top. The hardwood-look floor underfoot. The chiavari chairs. The draped walls. Nothing improvised, nothing rushed, nothing missing. By Sunday night we're gone — and you have the photos for the rest of your life.*

This is *Dream Outcome × Likelihood × (no Time delay) × (no Effort)* in one paragraph.

### 5.1.D Specs (the rational check)

For the bride who's converted; for the planner / mother who needs to verify. Plain table, dense, no marketing language.

| Spec | Value |
|---|---|
| Tent type | Legacy structure (white or clear top, your choice) |
| Dimensions | 40' × 80' (3,200 sq ft) |
| Capacity (seated, banquet style) | 150–200 guests |
| Capacity (cocktail/standing) | up to 250 |
| Wind rating | up to 70 km/h |
| Side walls | Included (4 walls, removable) |
| Setup time | 1 full day (we deliver Friday for Saturday events) |
| Tear-down | Day after event |
| Permit required | Yes — varies by city. We file the application (included). |
| Service area | Brampton + GTA. Outside GTA $5,000+ AOV only. |

### 5.1.E Compatible add-ons (visual rail)

Horizontal scrolling rail (desktop) / 2-column grid (mobile). 6–8 cards, each showing an add-on photo + name only (no price):

```
[ Photo ]            [ Photo ]            [ Photo ]
Chiavari upgrade     Chandelier package   Custom floor wrap
```

Click → expands an inline modal or scrolls to `/inventory#chandeliers`. No prices anywhere — pricing is consultative on the call (consistent with the "starting at $X" floor pricing strategy).

### 5.1.F One testimonial (tier-relevant)

Inline blockquote, real client name + event type + city + month, photo if available. **Only one** — multiple testimonials live on the homepage. On a package page, more would dilute. Pick the testimonial that mentions this specific tier or guest count.

### 5.1.G FAQ (3–5 Q's specific to this tier)

Accordion-style, expanded for top 3, collapsed for the rest. Examples for Legacy Signature:

1. *Will this fit on my venue?* (linked to a venue-size guide section in `/faq`)
2. *Can we customize the drape color?* (yes, free, picked on the call)
3. *What's the deposit?* (30% to hold the date, balance due 30 days before)
4. *Do you handle the permit?* (yes, included)
5. *What if it rains?* (built for rain — and we have a weather playbook)

Each FAQ Q&A also feeds the FAQPage schema (section 11).

### 5.1.H Compare other packages (anchor link equity)

Horizontal rail at the bottom: the 5 other packages with thumbnail photo + name + starting-at price + `View →`. Spreads link equity across all 6 package pages.

### 5.1.I Final CTA / inquiry anchor

Same as homepage Section J, but with the package pre-selected:

> **Ready for the Legacy Signature?**
>
> *Tell us your date and venue. We'll get back to you within the hour.*
>
> `[ Inquire about Legacy Signature → ]`

## 5.2 Page-level metadata per package

| Field | Template | Example (Legacy Signature) |
|---|---|---|
| Title tag | `<Package Name> Wedding Tent · <Guest Range> · Sirf Tents GTA` | *Legacy Signature Wedding Tent · 150–200 Guests · Sirf Tents GTA* |
| Meta description | `<Package outcome sentence>. Starting at $<price>. Brampton-based, GTA-wide.` | *Premium wedding tent for 150–200 guests with chiavari, draping, and clear-top option. Starting at $6,500. Brampton-based, GTA-wide.* |
| H1 | The package name | *Legacy Signature* |
| Schema | Service + Offer + AggregateRating (section 11) | — |

## 5.3 Per-package variant detail

The 6 pages share structure but vary on:

| Package | Hero outcome line | Starting price | Capacity | Hero photo direction |
|---|---|---|---|---|
| High Peak 40 | *"For 40 guests who want the polish, not the production."* | $500 | 30–40 | Intimate engagement, white-top, small-scale |
| High Peak 60 | *"For 60 guests when the day deserves more than a backyard."* | $800 | 50–60 | Garden engagement, white-top, mid-scale |
| High Peak 80 | *"For 80 guests, the sweet spot of intimate and elegant."* | $1,000 | 70–80 | Reception, white or clear top, fuller setup |
| Legacy Standard | *"For 100–150 guests when the wedding has to look serious."* | $3,500 | 100–150 | Sikh/Hindu wedding, mid-Legacy structure |
| Legacy Signature | *"For 150–200 guests who want the wedding their families will talk about for a decade."* | $6,500 | 150–200 | Full Legacy with clear top + draping |
| Legacy Grand | *"For 200+ guests when the only thing scaled up should be your guest list."* | $9,000 | 200–350 | Largest setup, full lighting + drape package |

Pricing intentionally shows the *floor*. Real quotes flex above based on add-ons, location, date.

---

# 6. Location page template

Applies to 6 cities (`/locations/brampton`, `/locations/mississauga`, `/locations/toronto`, `/locations/vaughan`, `/locations/markham`, `/locations/oakville`).

Each page is a real local landing page — not a templated keyword swap. Google penalizes thin location pages (the *"we serve [city]"* one-paragraph approach). We earn each one.

## 6.1 Section-by-section

### 6.1.A Hero

- **Photo:** real event from that city if available (caption confirms). If no photo from that city exists yet, use a Brampton photo with no city-claim caption.
- **Headline (Cormorant Garamond):** *"Wedding tents in [City]."* — exact match to primary search intent. No cleverness here, this is the SEO-load-bearing H1.
- **Sub-headline:** *"Premium tent rentals for [City] weddings, engagements & receptions. Delivered, set up, torn down — within [X km] of Brampton, [X minutes] drive."*
- **Social proof anchor:** *"★ ★ ★ ★ ★   200+ GTA Events"* — same as homepage
- **Primary CTA:** `[ Get Your Quote → ]`

### 6.1.B Local trust line

Single sentence band, white background, 56px tall:

> *"We've delivered weddings in [City] including [Venue 1], [Venue 2], [Venue 3] and private estates."*

If venue names aren't confirmed (likely on v1), replace with neighborhood names: *"...including Mount Pleasant, Castlemore, Springdale, and private estates."* — this is the part that turns "are they real here?" into "yes, they know my area."

### 6.1.C Top 3 packages for this city

Curated subset of the package rail based on what actually books in that city. Brampton/Mississauga skew Legacy (larger Sikh/Hindu weddings); Vaughan/Markham may skew either; Toronto may skew High Peak (smaller venues, more intimate). Gurvir confirms the mix per city.

### 6.1.D Local logistics paragraph (the questions a [City] bride actually has)

H2: *"How it works in [City]."*

Four short paragraphs:

1. **Delivery zone & drive time.** *"Brampton-based. Drive time to [City] is ~[X] min. We deliver Friday for Saturday weddings, tear down Sunday morning."*
2. **Common venues.** *"We've set up at private estates, hotel grounds, backyard properties, and banquet hall yards across [City]. If your venue isn't a tent-rental regular, we'll walk the site with you on the consult call."*
3. **Permits.** *"[City] requires a temporary structure permit for tents over [X sq ft]. We file the application as part of the package — it's included."*
4. **Best season.** *"May–October is peak, with September the single most-booked month for [City] weddings. Book 4–6 months ahead in peak. Off-peak (November–April) we can usually accommodate inside 6 weeks."*

This block does double duty: SEO (city-specific language, local context, permit info Google rewards) + sales (answers the four highest-friction questions before the call).

### 6.1.E Real wedding from [City] (if available)

If we have a photo + date from a real event in that city, one wide horizontal showcase:

```
┌────────────────────────────────┬──────────────────────┐
│ [ Photo of [City] wedding ]    │ Sikh wedding         │
│                                │ [City] · [Month YYYY]│
│                                │ Legacy Signature     │
│                                │ + clear top          │
│                                │ + draping            │
│                                │                      │
│                                │ See gallery →        │
└────────────────────────────────┴──────────────────────┘
```

If no real photo exists from that city, **omit this section entirely** — don't fake it. Better to have 5 sections of truth than 6 sections with one lie that breaks trust.

### 6.1.F Testimonial from [City] (only if real)

Same rule: real-only. If we have a [City]-based testimonial, surface it here. Otherwise skip.

### 6.1.G Local FAQ (3–4 Q's)

City-specific objection handling:

- *"Do you need a permit in [City]?"* (Yes, we file it, included)
- *"Can you set up at my [City] venue?"* (Most likely yes; we walk the site on the call)
- *"What's the delivery cost to [City]?"* (Included in the package price for the listed service area)
- *"How far in advance should I book a [City] wedding tent?"* (4–6 months in peak)

### 6.1.H Final CTA

> **Wedding in [City]?**
>
> *Tell us your date and venue. We'll get back to you within the hour.*
>
> `[ Get Your Quote → ]`

## 6.2 Metadata per location page

| Field | Template | Example (Brampton) |
|---|---|---|
| Title tag | `Wedding Tent Rentals <City> · Sirf Tents · GTA` | *Wedding Tent Rentals Brampton · Sirf Tents · GTA* |
| Meta description | `Premium tent rentals for <City> weddings, engagements & receptions. Rated 5 stars over 200+ events. Delivered, set up, torn down.` | *Premium tent rentals for Brampton weddings, engagements & receptions. Rated 5 stars over 200+ events. Delivered, set up, torn down.* |
| H1 | `Wedding tents in <City>` | *Wedding tents in Brampton* |
| Schema | LocalBusiness with `areaServed: <City>` + Service + Breadcrumb | — |

## 6.3 What we will NOT do on location pages

- ❌ Copy-paste the same paragraph with city find/replace
- ❌ Stuff "wedding tent rental [city]" 30 times into copy
- ❌ Create location pages for cities we don't actually serve (Burlington in v1 lives only as a mention on the Oakville page until we have a real Burlington photo or testimonial)
- ❌ Use generic Google Maps screenshots as hero photos
- ❌ Auto-generate via HubDB-style templating (we don't have HubDB on Starter anyway — but even if we did)

Each page is hand-tuned by Gurvir for accuracy on venues, drive times, and permit specifics. The local SEO win comes from *being right about [City]*, not from quantity of pages.

---

# 7. Event-type page template

Applies to 3 pages: `/weddings`, `/engagements`, `/corporate`. Milestones folds into `/engagements` (engagement = pre-wedding milestone; we don't make a separate page for 60th anniversaries — keeps the page count and brand focus tight).

## 7.1 Why event-type pages exist

The bride searches *"wedding tent rental Toronto"* (location intent) but also searches *"outdoor wedding tent ideas"* (event-type intent). Event-type pages capture the second kind. They are also where we lean into cultural fluency — `/weddings` mentions sangeet, mehndi, baraat, reception by name in a way no other page does.

## 7.2 Section-by-section (using `/weddings` as canonical)

### 7.2.A Hero

- **Photo:** wide cinematic shot, real wedding, warm-tone
- **Headline:** *"Wedding tents, built for the day you've been picturing."*
- **Sub-headline:** *"Sikh, Hindu, Muslim, fusion, civil — every wedding fits under our tents. Premium tent rentals for 40 to 350+ guests across the GTA."*
- **Social proof anchor:** *"★ ★ ★ ★ ★   200+ GTA Events"*
- **Primary CTA:** `[ Get Your Quote → ]`

### 7.2.B Cultural-fluency band

H2: *"For every kind of wedding day."*

Four-column visual band, no copy padding — just type + small photo per column:

| Sangeet & Mehndi | Wedding Day | Reception | Baraat-Ready Setups |
|---|---|---|---|
| [Photo] | [Photo] | [Photo] | [Photo] |
| Indoor-to-outdoor flow. Cooled in summer, heated in shoulder season. | Clear-top for daytime ceremonies. Drape walls for privacy. Cooled. | Hardwood-look flooring. Chandelier-rated power. Dance floor space. | Open-front for grand entries. Wide drive-up clearance for horse / car. |

This is the section where cultural fluency does the heaviest lifting. Notice: we don't say "South Asian" anywhere — we say *sangeet*, *baraat* by name. That's the difference between *translating* the audience and *being from* the audience.

### 7.2.C Packages best suited for weddings

All 6 packages, grouped:

- **Intimate (40–80 guests):** High Peak 40, 60, 80
- **Standard (100–200 guests):** Legacy Standard, Legacy Signature
- **Grand (200+ guests):** Legacy Grand

### 7.2.D Gallery preview

H2: *"Real GTA weddings."*

6-photo grid, same caption format as the homepage Section F. Link out: `See full gallery →`.

### 7.2.E Process (Hormozi denominator)

Same 4-step process from the homepage (Inquire → Consult → Confirm → Celebrate). Repeated here because event-type pages are entry points from Google Ads and may be the first page a paid visitor sees — we can't assume they've read the homepage.

### 7.2.F FAQ (wedding-specific)

5–7 Q's:

1. *Can we have a Sikh ceremony under your tent?* (yes, clear-top + open-front + sound considerations)
2. *Do you do haldi/mehndi setups?* (yes, smaller-tier packages or add-on to larger packages)
3. *How does the tent handle rain?* (sealed, sloped, included rain plan)
4. *Can the tent be heated/cooled?* (yes, included for shoulder season)
5. *How early should we book a [season] wedding?* (4–6 months peak, 6 weeks off-peak)
6. *Do you do destination weddings outside the GTA?* ($5,000+ AOV only)

### 7.2.G Testimonials (wedding-specific)

3 testimonials, each a real bride/family from a real wedding. Same format as homepage.

### 7.2.H Final CTA

Same anchor pattern. Pre-fills inquiry form with `event_type = wedding`.

## 7.3 Variants for `/engagements` and `/corporate`

### `/engagements`

- Hero: *"Engagements & milestone celebrations under our tents."*
- Includes engagements, milestone birthdays (60th, 50th anniversaries — for the 60+ guest bracket only)
- Cultural fluency band: Sangeet, Engagement Dinner, Roka/Ring Ceremony, Milestone Anniversary
- Packages featured: High Peak 60, High Peak 80, Legacy Standard
- FAQ leans on smaller-event logistics (parking, neighbor permits, sound)

### `/corporate`

- Hero: *"Corporate events under our tents."*
- Frames as "experiences," not AV-vendor work — *"For brand activations, milestone company events, awards nights, founders' dinners. The kind of corporate event nobody calls a corporate event."*
- Cultural-fluency band swaps to: Brand Activation / Milestone Event / Awards Dinner / Private Founder Dinner
- Packages featured: Legacy Standard, Legacy Signature, Legacy Grand (corporate skews larger and more formal)
- FAQ leans on permits, insurance, alcohol licensing, AV integration
- **Important:** corporate is on the site to capture inbound search and Google Ads — Sirf Tents' brand identity stays wedding-first. Corporate page doesn't deviate from the brand voice or premium positioning.

## 7.4 Metadata per event-type page

| Field | `/weddings` | `/engagements` | `/corporate` |
|---|---|---|---|
| Title | *Wedding Tent Rentals GTA · Sirf Tents* | *Engagement & Milestone Tent Rentals GTA · Sirf Tents* | *Corporate Event Tent Rentals GTA · Sirf Tents* |
| Meta description | Premium tent rentals for GTA weddings — Sikh, Hindu, Muslim, fusion, civil. Rated 5 stars over 200+ events. | Premium tent rentals for engagements, sangeets, milestone birthdays & anniversaries. Rated 5 stars over 200+ GTA events. | Premium tent rentals for corporate brand activations, milestone events & private dinners. Rated 5 stars over 200+ GTA events. |
| H1 | *Wedding tents, built for the day you've been picturing.* | *Engagement & milestone tents, made memorable.* | *Corporate event tents, premium-grade.* |

---

# 8. Google Ads landing page template

Applies to 3 LPs (`/lp/wedding-tent-rental`, `/lp/brampton-gta-tents`, `/lp/premium-luxury-tents`). These are **structurally different** from the rest of the site:

- **No primary nav, no footer nav** — header is the logo only, footer is phone + email + legal only
- **Single CTA per page** (no secondary actions competing)
- **Ad-headline-matched H1** (improves Quality Score, lowers CPC)
- **Excluded from organic indexing** (`robots.txt` disallow + canonical to organic equivalent) — keeps Quality Score scoped to ads and prevents diluting the organic ranking of `/weddings` or `/locations/brampton`

## 8.1 Section-by-section (single template)

### 8.1.A Hero (above the fold)

- **Background:** full-bleed cinematic photo, single, no carousel
- **Headline (Cormorant Garamond):** matches the ad's headline word-for-word
  - `/lp/wedding-tent-rental` → *"Wedding tent rentals in the GTA."*
  - `/lp/brampton-gta-tents` → *"Brampton's premium wedding tent rentals."*
  - `/lp/premium-luxury-tents` → *"Premium luxury tents for weddings & engagements."*
- **Sub-headline:** *"Delivered, set up, torn down. Rated 5 stars over 200+ events. Get your quote in under an hour."*
- **Single CTA (gold pill):** `[ Get Your Quote → ]`
- **No secondary CTA, no "see packages" link, no nav** — every pixel pushes toward the single conversion

### 8.1.B Social proof bar

Identical to homepage Section B. Four numerals, gold-on-cream.

### 8.1.C Three outcome bullets (Hormozi)

Three cards, photo + outcome only:

| Photo | Bullet |
|---|---|
| [Tent photo] | *"The look that makes your wedding the one everyone talks about."* |
| [Setup photo] | *"You don't lift a finger. We deliver, install, tear down."* |
| [Map photo] | *"GTA-wide. Brampton-based. 200+ events delivered."* |

### 8.1.D Mini gallery (3 photos)

3-photo wide horizontal band. Caption: city + month + package only. No links out — gallery doesn't exist on the LP (no nav to it).

### 8.1.E Inline testimonial

One testimonial, the strongest available, real name + city + month + event type. Inline (not a carousel — no swiping interactions on an LP).

### 8.1.F Embedded inquiry form

Form embedded directly on the LP (no separate `/inquire` redirect). Multi-step progressive (section 9). Reduces clicks-to-conversion to zero — the form is the page.

### 8.1.G FAQ (4 Q's — load-bearing for ad relevance)

Top 4 highest-friction questions:

1. *How much does a wedding tent cost?*
2. *How far in advance do I need to book?*
3. *Do you cover all of the GTA?*
4. *What's included in the package?*

### 8.1.H Footer (minimal)

```
SIRF TENTS · Brampton, ON · (XXX) XXX-XXXX · hello@sirftents.com · Privacy · Terms
```

Single line. No site nav, no internal links out. Phone is tap-to-call.

## 8.2 Technical specifics

- **Page load target:** LCP <2.0s (faster than organic pages — Google Ads Quality Score is sensitive to LP speed)
- **Mobile-first** — paid traffic is ~80% mobile in this category
- **`robots.txt`:** `Disallow: /lp/` — prevents organic indexing
- **Canonical tag:** points to the closest organic equivalent (e.g., `/lp/wedding-tent-rental` canonicals to `/weddings`) — tells Google "this is a paid variant of that page"
- **No tracking pixels above the fold** that delay first paint
- **Pixel inventory:** Google Ads conversion tag, Meta Pixel (for retargeting), GA4 — all loaded async after hero render

## 8.3 LP-specific copy variations

| LP | Ad-headline-matched H1 | Sub-headline (city/intent variation) |
|---|---|---|
| `/lp/wedding-tent-rental` | *Wedding tent rentals in the GTA.* | Premium wedding tents — Sikh, Hindu, Muslim, fusion. Brampton-based. 200+ events. |
| `/lp/brampton-gta-tents` | *Brampton's premium wedding tent rentals.* | Local to Brampton. GTA-wide delivery. 200+ events. |
| `/lp/premium-luxury-tents` | *Premium luxury tents for weddings & engagements.* | The Lululemon of tent rental. 200+ GTA events. Premium-grade only. |

---

# 9. Inquiry form spec

The form is the conversion endpoint of the entire site. Every page CTA points here.

## 9.1 Multi-step structure (4 steps + thank-you)

Multi-step beats single-page-9-fields. Reasons:

1. **Higher completion rate** — progressive disclosure feels lighter
2. **Better psychological commitment** — completing step 1 creates sunk-cost momentum to complete step 2
3. **Field-level analytics** — we see exactly where leads drop off and can iterate
4. **Mobile-friendlier** — each step fits on screen without scroll

### Step 1 — "Tell us about your event" (qualification)

| Field | Type | Required | Mapped to HubSpot property |
|---|---|---|---|
| What type of event are you planning? | Multi-choice radio | ✓ | `event_type` (custom enum: wedding / reception-engagement / corporate / birthday-anniversary-milestones) |
| How many guests are you expecting? | Multi-choice radio | ✓ | `guest_count_bracket` (custom enum: 40–60 / 60–80 / 80–100 / 100–130 / 130–150 / 150+) |

CTA: `[ Continue → ]`

**Mirrors Meta form Q1+Q2.** Identical option list — keeps HubSpot reporting unified.

### Step 2 — "When and where?"

| Field | Type | Required | Mapped to HubSpot property |
|---|---|---|---|
| When are you looking to finalize? | Multi-choice radio (ASAP 1-2 weeks / next month / 2-3 months / just exploring) | ✓ | `urgency_bracket` (custom enum) |
| Event date | Short answer free-text | ✓ | `event_date_raw` (free text — tolerant parser + manual review fallback) |
| City | Short answer free-text | ✓ | `event_city` |

CTA: `[ Continue → ]`

**Mirrors Meta form Q3, Q4, Q5.**

### Step 3 — "What are you picturing?" (the divergence from Meta form)

This step is **website-only**, doesn't exist on the Meta form. It's where the richer-form-for-colder-traffic logic kicks in.

| Field | Type | Required | Mapped to HubSpot property |
|---|---|---|---|
| What services interest you? | Multi-select checkboxes (Tent / Tables & chairs / Tent draping / Fairy lights & lighting / Flooring & floor wrap / All-in-one package) | ✓ | `services_interested` (multi-select) |
| Tent size if known | Multi-choice radio + "not sure" option (High Peak 40 / High Peak 60 / High Peak 80 / Legacy Standard / Legacy Signature / Legacy Grand / Not sure — help me pick) | optional | `package_interest` |
| Tell us about your event | Long-form textarea (5 rows, no character limit) | optional | `event_description` |

CTA: `[ Continue → ]`

**Why this step exists:** Website traffic is colder than Meta-form traffic. The bride arriving from Google may have only just discovered we exist. This step lets her articulate what she's picturing in her own words — the textarea is the highest-trust field on the form because she's already spent 30 seconds typing it, she's not bouncing.

### Step 4 — "How do we reach you?"

| Field | Type | Required | Mapped to HubSpot property |
|---|---|---|---|
| Full name | Short answer | ✓ | `firstname` + `lastname` (auto-split on first space) |
| Email | Email input | ✓ | `email` |
| Phone | Phone input (E.164 formatter for SMS) | ✓ | `phone` (E.164 format mandatory per `hubspot-meta-integration.md` Step 1 gotchas) |

CTA: `[ Send My Inquiry → ]` (large gold pill)

Below the CTA, small print:
> *We'll reply within the hour. By submitting, you agree to receive an email and a text from Sirf Tents.* (TCPA consent disclosure.)

### Step 5 — Thank-you page (`/thank-you`)

Not a form step — a dedicated page after submission. Section 10 covers what fires.

## 9.2 Hidden fields (attribution + analytics)

Every form submission also writes:

| Field | Source | HubSpot property |
|---|---|---|
| UTM source | URL params | `utm_source` |
| UTM medium | URL params | `utm_medium` |
| UTM campaign | URL params | `utm_campaign` |
| UTM content | URL params | `utm_content` |
| UTM term | URL params | `utm_term` |
| Google Click ID (`gclid`) | URL param | `gclid` |
| Meta Click ID (`fbclid`) | URL param | `fbclid` |
| Landing page URL | first-touch page | `first_landing_page` |
| Referrer | `document.referrer` | `original_referrer` |
| Page submitted from | window.location | `submitted_from_page` |
| Form variant ID | static per page | `form_variant` (e.g., `homepage`, `lp-wedding-tent`, `package-legacy-signature`) |

`gclid` is the single most important hidden field for Google Ads conversion tracking — without it, Google Ads can't tie conversions back to keywords.

## 9.3 Spam prevention

- **Honeypot field** (hidden `email_address_2` that real users never see — bots fill it, we discard those submissions)
- **reCAPTCHA v3** (invisible, score-based — no checkbox interruption)
- **HubSpot's built-in form spam protection** (enabled by default on CMS Hub Starter)
- **No email-only or phone-only short-circuit** — requires name + email + phone, which most bots botch

## 9.4 Conditional logic

| Trigger | Effect |
|---|---|
| `event_type = corporate` (Step 1) | Step 3 textarea placeholder changes to: *"Tell us about your event — type, vibe, AV needs, anything specific."* |
| `guest_count_bracket = 40-60` (Step 1) | Step 3 `package_interest` defaults to High Peak tier (auto-checks High Peak 40/60 — user can change) |
| `urgency_bracket = ASAP — Within 1-2 weeks` (Step 2) | Submission triggers an internal HubSpot task flagged URGENT — owners get notified by email immediately, not just the auto-flow |
| `event_city` NOT in service area | Submission still accepted, but conditional thank-you page note: *"Your city is outside our standard service area. We'll reach out about $5,000+ AOV options."* |

## 9.5 Form variants per page

The form is the same multi-step structure everywhere it appears, but pre-fills based on context:

| Page | Pre-fills |
|---|---|
| Homepage modal | none |
| Package detail (e.g., Legacy Signature) | `package_interest = Legacy Signature`, `services_interested` auto-checks tent + relevant add-ons |
| Event-type (e.g., Weddings) | `event_type = wedding` |
| Location page (e.g., Brampton) | `event_city = Brampton` |
| Google Ads LP | `utm_*` from URL, `form_variant = lp-...`, otherwise blank |

Pre-fills reduce friction by saving the user a click — the form is shorter for them because we already know what they were looking at.

## 9.6 HubSpot deal & contact creation logic

On submission:

1. **Contact created or updated** in HubSpot by email match. All form fields written to contact properties.
2. **Deal created in Pipeline A or Pipeline B** depending on `guest_count_bracket`:
   - 40–60, 60–80 (and possibly 80–100 if `event_type = birthday-anniversary-milestones`) → **Pipeline B (High Peak)**, stage 1: *New WhatsApp Lead* — note: website lead, not WhatsApp, but uses the same High Peak pipeline since AOV bracket matches
   - 80–100, 100–130, 130–150, 150+ → **Pipeline A (Legacy + Premium)**, stage 1: *New Lead*
3. **`lead_source = website-organic`** OR **`lead_source = website-paid-google`** (based on `gclid` presence + utm_source)
4. **Lead owner auto-assigned** to whichever co-founder has fewer open deals (round-robin or load-balanced in HubSpot)
5. **Initial `Lead` CAPI event fires** (informational only, never the optimization target — per `handoffs/hubspot-meta-integration.md`)

## 9.7 What we explicitly do NOT add to the form

- ❌ "Other" as an option anywhere (CLAUDE.md absolute rule)
- ❌ "How would you like us to contact you?" (CLAUDE.md absolute rule — IG DM as a field is a black hole)
- ❌ Budget field (transparent floor pricing on each package page already does the filtering; asking budget on the form drops completion ~15%)
- ❌ "How did you hear about us?" (UTMs + Google Ads + Meta Pixel already capture this with attribution accuracy; asking the user is unreliable and adds friction)
- ❌ Date-time appointment slot picker (Q3 urgency + the post-submit calendar booking link in the auto-email handle this — see section 10)

---

# 10. Post-submit flow (email + SMS + booking link)

This is the website's equivalent of the Meta-form-to-IG handoff. Different mechanics, same goal: be the first vendor the bride hears from, and turn the lead into a booked call as fast as possible.

## 10.1 Timing & sequence

```
t = 0          → Form submitted, contact + deal created in HubSpot
t = +30 sec    → Confirmation email fires (HubSpot workflow)
t = +2 min     → Auto-SMS fires (Twilio + HubSpot integration via Zapier — see section 10.5)
t = +5 min     → HubSpot task created for owner: "Reply personally within 1 hour"
t = +1 hour    → If owner hasn't replied yet, escalation email to both co-founders
t = +4 hours   → If still no reply, second internal escalation
t = +24 hours  → If lead hasn't booked the call yet, automated reminder email with calendar link
t = +3 days    → If still no booking, second reminder (urgency-branched per Q3 bracket)
t = +7 days    → Lead marked Cold; revisit in 30 days
```

The first hour is everything. CLAUDE.md's existing 1-2 message follow-up rule (1st @ 4h, 2nd @ 24h for ASAP brackets) applies *after* the initial response — it doesn't mean *delay* the initial response.

## 10.2 Confirmation email (fires at t = +30 sec)

**Subject:** *Got it — we'll be in touch within the hour.*

**From:** Gurvir at Sirf Tents `<hello@sirftents.com>` (warm, personal sender — not `no-reply@`)

**Body:**

> Hi {{firstname}},
>
> Thanks for telling us about your {{event_type}} on {{event_date_raw}}. We've got your inquiry, and one of us will personally text and email you within the next hour to lock in a 15-minute call.
>
> If you want to skip the back-and-forth, you can book that call directly here:
>
> **[ Book my 15-min call → ]** (gold pill button, links to HubSpot Meetings)
>
> On the call we'll lock the tent, the date, and the quote — usually on the spot.
>
> While you wait, here's a peek at how we've delivered weddings like yours:
>
> [ Instagram thumbnail row — 4 recent posts pulled from @sirftents ]
>
> Talk soon,
> Gurvir
> Sirf Tents · Brampton · Rated 5 Stars over 200+ GTA Events
> (XXX) XXX-XXXX · hello@sirftents.com

**HubSpot workflow:** Trigger = form submission. Delay 30s. Send email with all template tokens populated. Set deal property `confirmation_email_sent = true`.

## 10.3 Auto-SMS (fires at t = +2 min)

**Sender:** Sirf Tents (registered short code or 10-digit long code via Twilio)

**Body:**

> Hi {{firstname}} — Gurvir from Sirf Tents. Got your inquiry for {{event_date_raw}}. I'll personally reach out within the hour. If you want to lock a 15-min call now: {{meetings_link}}

**Constraints:**
- Phone must be E.164 (per CLAUDE.md / `hubspot-meta-integration.md` Step 1 gotcha)
- TCPA consent must be on file (covered by Step 4 disclosure copy)
- STOP / HELP keywords handled by Twilio default
- If phone field on submission is blank or invalid → SMS step is skipped, email-only

## 10.4 HubSpot Meetings link

HubSpot Meetings tool (included on Marketing Hub Starter and CMS Hub Starter — no upgrade required). One meeting type configured:

| Field | Value |
|---|---|
| Meeting name | *Sirf Tents — 15 min Quote Call* |
| Duration | 15 min |
| Available times | Mon–Fri 9am–7pm + Sat 10am–4pm, EST |
| Round-robin | Yes — between Gurvir + co-founder |
| Buffer | 10 min between meetings |
| Pre-meeting form | None (form already collected the info) |
| Confirmation email | Auto-fires from HubSpot with calendar invite + Zoom/phone link |
| Reschedule allowed | Yes, up to 4h before |
| Reminder | 1 hour before meeting (email + SMS) |

When the lead books a slot, HubSpot's deal-stage automation moves the deal from `New Lead` → `Quote Call Booked` in Pipeline A (or Pipeline B equivalent), which is the **primary Meta CAPI optimization event** (mapped to Meta `Schedule`) per `handoffs/hubspot-meta-integration.md`.

## 10.5 SMS tool decision (cost flag)

HubSpot CMS Hub Starter does NOT include native SMS sending. Three options:

| Option | Cost | Setup effort | Tradeoff |
|---|---|---|---|
| **HubSpot Marketing Hub Professional upgrade** | ~$890/mo+ | Low (native integration, no third-party) | Massive overkill — only buying it for SMS doesn't make sense |
| **Twilio + HubSpot via Zapier** | Twilio $0.0075/SMS + Zapier $30/mo Starter | Medium (Twilio account, A2P 10DLC registration, Zapier workflow) | Recommended for v1. Total run-rate ~$50/mo at 1,000 SMS/mo. Industry-standard. |
| **No SMS — email only** | $0 | None | Loses ~30% of speed-to-lead lift. Acceptable v0 if Twilio setup blocks launch. |

**Recommendation:** Twilio + Zapier. Set up in week 2 of build. If A2P 10DLC registration takes longer than expected (sometimes 1–2 weeks), launch with email-only and turn SMS on when approved.

## 10.6 Deal stage progression for website leads

Pipeline A (Legacy + Premium, used for guest counts 80+):

| Stage | When the website lead reaches this | CAPI event |
|---|---|---|
| New Lead | Form submitted | informational `Lead` event (auto) |
| Conversation Active | Owner has replied via email or SMS | none |
| Quote Call Booked | Lead books HubSpot Meetings slot | **`Schedule` event (PRIMARY OPTIMIZATION)** |
| Site Visit / Quote Sent | Visit scheduled OR quote delivered | optional `InitiateCheckout` |
| Deposit Paid / Closed Won | Deposit received | **`Purchase` with deal value (CAD)** |

Pipeline B (High Peak, used for guest counts 40–80) follows the same pattern with 4 stages, per `handoffs/hubspot-meta-integration.md` Pipeline B definition.

**Important:** website leads don't fragment into a third pipeline. They use the existing Pipeline A or B based on guest-count bracket. `lead_source = website-organic` or `website-paid-google` is a *property* on the deal, not a separate pipeline. This keeps the verified back-half integration intact (one set of pipelines, one set of CAPI events, just more sources feeding them).

---

# 11. Schema markup + technical SEO

This is where the SEO ranking work compounds. Schema markup is also the single biggest gap in H&H Tents' site — they have none. Getting this right gives Sirf Tents rich snippets, knowledge-panel eligibility, and visibility on terms H&H literally cannot compete on.

## 11.1 Schema entities per page type

### Site-wide (in `<head>` of every page)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://sirftents.com/#localbusiness",
  "name": "Sirf Tents",
  "image": "https://sirftents.com/og-image.jpg",
  "url": "https://sirftents.com",
  "telephone": "+1-XXX-XXX-XXXX",
  "email": "hello@sirftents.com",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "TBD",
    "addressLocality": "Brampton",
    "addressRegion": "ON",
    "postalCode": "TBD",
    "addressCountry": "CA"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "TBD", "longitude": "TBD" },
  "areaServed": [
    "Brampton", "Mississauga", "Toronto", "Vaughan", "Markham", "Oakville",
    "Burlington", "Richmond Hill", "Caledon"
  ],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:00",
    "closes": "19:00"
  }],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "TBD (pull from GBP after launch)"
  },
  "sameAs": [
    "https://instagram.com/sirftents",
    "https://www.facebook.com/sirftents",
    "https://g.page/sirftents"
  ]
}
```

`reviewCount` and address fields fill in pre-launch from GBP.

### Package detail pages (Service + Offer)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Wedding Tent Rental",
  "name": "Legacy Signature Wedding Tent Package",
  "provider": { "@id": "https://sirftents.com/#localbusiness" },
  "areaServed": "GTA, Ontario, Canada",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "CAD",
    "price": "6500",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": "6500",
      "priceCurrency": "CAD"
    },
    "availability": "https://schema.org/InStock"
  }
}
```

One Service entity per package page. The `price` value is the floor.

### Event-type pages (Service with broader scope)

Same Service schema but at the category level — `serviceType: "Wedding Tent Rental"` for `/weddings`, `"Engagement Tent Rental"` for `/engagements`, etc.

### Location pages (LocalBusiness with `areaServed` override)

Each location page gets a Service entity with `areaServed` set specifically to that city, increasing the chance Google associates Sirf Tents with that locale on the knowledge graph.

### FAQ page + any page with FAQ section (FAQPage)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How much does a wedding tent cost in the GTA?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Sirf Tents wedding tent packages start at $500 for 40 guests (High Peak) and $3,500 for 100+ guests (Legacy). Full pricing on each package page."
    }
  }, /* ...more Q's */ ]
}
```

FAQPage schema is the single highest-ROI schema for new sites — it earns visible rich snippets in search results within 2–4 weeks of indexing.

### Gallery / case studies (ImageObject + optional Event)

Each gallery item gets ImageObject schema. If we have full event metadata (date, venue, photographer credit), we can add Event schema — but only for confirmed real events.

### All pages (BreadcrumbList)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sirftents.com" },
    { "@type": "ListItem", "position": 2, "name": "Packages", "item": "https://sirftents.com/packages" },
    { "@type": "ListItem", "position": 3, "name": "Legacy Signature", "item": "https://sirftents.com/packages/legacy-signature" }
  ]
}
```

BreadcrumbList gives Google the breadcrumb display in SERPs — better CTR than raw URL display.

## 11.2 Meta tags + Open Graph (per page)

Every page has:

```html
<title>{{Page-specific title, ≤60 chars}}</title>
<meta name="description" content="{{Page-specific, ≤155 chars, action-led}}" />
<link rel="canonical" href="{{Canonical URL}}" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="{{Page title}}" />
<meta property="og:description" content="{{Meta description, same as above}}" />
<meta property="og:image" content="{{Page hero image, 1200x630}}" />
<meta property="og:url" content="{{Canonical URL}}" />
<meta property="og:site_name" content="Sirf Tents" />
<meta property="og:locale" content="en_CA" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{{Page title}}" />
<meta name="twitter:description" content="{{Meta description}}" />
<meta name="twitter:image" content="{{Same as og:image}}" />
```

## 11.3 robots.txt

```
User-agent: *
Allow: /
Disallow: /lp/
Disallow: /thank-you
Disallow: /inquire

Sitemap: https://sirftents.com/sitemap.xml
```

`/lp/` blocked for organic to keep Quality Score scoped. `/thank-you` and `/inquire` blocked because they shouldn't appear in SERPs.

## 11.4 sitemap.xml

Auto-generated by HubSpot CMS (built-in). Submitted to Google Search Console pre-launch. Re-submitted on any major nav change.

## 11.5 Canonical URLs

- Every organic page canonicals to itself
- Each `/lp/*` page canonicals to its closest organic equivalent (e.g., `/lp/wedding-tent-rental` → canonical = `/weddings`)
- Pagination + filter URLs (if added later) canonical to the base

## 11.6 Image SEO

| Practice | Implementation |
|---|---|
| Alt text | Descriptive + specific. Format: *"<Event type> <package> <city> <month-year>"*. Not keyword-stuffed. |
| File naming | `<event-type>-<city>-<package>-<seq>.jpg` (e.g., `sikh-wedding-brampton-legacy-signature-1.jpg`) — descriptive, hyphen-separated |
| Format | AVIF with WebP fallback, JPEG only as last resort |
| Responsive | `srcset` with 480 / 768 / 1280 / 1920 widths |
| Lazy-loading | All below-fold images use `loading="lazy"` |
| Hero LCP | First hero image is `<link rel="preload" as="image">` in the document head |

## 11.7 Core Web Vitals targets (site-wide)

| Metric | Mobile target | Desktop target |
|---|---|---|
| LCP | <2.5s | <2.0s |
| CLS | <0.1 | <0.1 |
| INP | <200ms | <200ms |
| TTFB | <800ms | <600ms |
| Lighthouse | >85 | >90 |

HubSpot's edge CDN handles most of this; the rest is image discipline (section 11.6) and minimal JS.

## 11.8 Internal linking depth

- Every page reachable in ≤3 clicks from homepage
- Footer surfaces all 6 location pages + all 3 event-type pages (already specified in section 2.4) — guarantees they're 1 click from any page
- Package pages link to each other via "Compare" rail (section 5.1.H)
- Location pages link to top 3 relevant packages (section 6.1.C)

## 11.9 What we will NOT do for SEO

- ❌ Build a blog for v1 (the 30-page cap is precious; defer to v2)
- ❌ Buy backlinks or use any link-farm tactics
- ❌ Stuff keywords into footer / hidden text / meta-keywords (Google ignores meta-keywords; stuffing is a penalty)
- ❌ Auto-generate location pages (each is hand-tuned per section 6)
- ❌ Use AI-generated stock content as primary page copy

---

# 12. Google Business Profile optimization + launch checklist

GBP is **the single largest local SEO unlock** available — independent of the website. Half the local-pack ranking signal lives there, not on the website. Spec sequence below.

## 12.1 GBP pre-launch sequence (Week -2 to -1)

### Step 1 — Claim & verify (Day 1)

- Sign in to business.google.com
- Search for "Sirf Tents Brampton"
- If listing exists → claim it. If not → create new listing
- Verify via mail postcard (5–7 days) OR phone (if available) OR Google video call (immediate)

**Critical:** verification takes time. This is week -2 work, not week -1.

### Step 2 — Optimize listing data (Day 2)

| Field | Value |
|---|---|
| Business name | Sirf Tents |
| Category (primary) | Wedding Service |
| Category (secondary, up to 9) | Event Rental Service, Tent Rental Service, Party Equipment Rental Service, Wedding Planner |
| Address | TBD (Gurvir's confirmed business address) |
| Service area | Brampton, Mississauga, Toronto, Vaughan, Markham, Oakville, Burlington, Richmond Hill, Caledon |
| Hours | Mon–Fri 9am–7pm, Sat 10am–4pm, Sun closed (or appointment only) |
| Phone | (XXX) XXX-XXXX (consistent with website — NAP citation match is a ranking signal) |
| Website | sirftents.com (post-launch URL) |
| Booking link | HubSpot Meetings URL |
| Description | 750 chars max, lead with "Premium tent rentals for GTA weddings, engagements & receptions. Rated 5 stars over 200+ events. Brampton-based."  + service area + cultural specialties |
| Photos (minimum) | 20+ real event photos, 5+ team/setup photos, 1 logo, 1 cover photo. Geotagged where possible. |
| Services list | Each package as a Service with name, description, "starting at" price (mirrors website) |
| Q&A (pre-seed) | Add 5–8 likely customer questions + answers (don't wait for randoms to ask) |

### Step 3 — Review velocity engine (Day 3 onward, ongoing)

GBP ranking weighting includes review count + recency + diversity (not just rating). To rank #1 we need a steady flow of new reviews, not just a stockpile of old ones.

| Tactic | Cadence |
|---|---|
| Post-event review request via SMS to every client | 2 days post-event (per `confirmation_email_sent` workflow extension) |
| Post-event review request via email with direct GBP review link | 5 days post-event |
| QR code on the on-site invoice / handoff document | Always |
| Each photo upload by Gurvir is a small ranking lift | Weekly cadence — upload 3–5 new event photos to GBP every week |
| Reply to every review (positive AND negative) within 48h | Always |

**Target:** 30+ reviews within 90 days of launch, with at least 5 added each month thereafter.

### Step 4 — GBP Posts (weekly)

Posts are mini-content updates on GBP — they rank in the local pack with their own card.

Weekly cadence:
- Mon: package highlight (e.g., "Legacy Signature — starting at $6,500, GTA-wide")
- Wed: real event photo + caption + city
- Fri: seasonal note (peak season urgency, off-peak deals, holiday CTA)

GBP Posts have a 7-day live window — keep the cadence to keep them ranking.

## 12.2 Pre-launch website checklist (Week -1 to 0)

| Item | Owner | Done when |
|---|---|---|
| Domain registered (sirftents.com or alternative) | Gurvir | Domain in HubSpot DNS |
| DNS pointed to HubSpot | Claude + Gurvir | HubSpot status: Verified |
| SSL cert provisioned (auto via HubSpot) | Auto | Padlock green in browser |
| Brand assets approved (logo, colors, photos selected) | Gurvir | Spec finalized |
| All 26 pages built in HubSpot | Claude → Gurvir final review | URLs return 200, internal links work |
| All schema JSON-LD validated | Claude | Google Rich Results Test passes for each schema entity |
| HubSpot form created & wired | Claude | Test submission lands in HubSpot, fires confirmation email, creates deal |
| Twilio + Zapier SMS workflow | Claude → Gurvir auth | Test SMS arrives within 2 min of test submission |
| HubSpot Meetings link configured | Gurvir | Round-robin between co-founders works, calendar invite delivers |
| Google Search Console verified | Gurvir | sitemap.xml submitted |
| Google Analytics 4 installed | Claude | Realtime traffic confirms install |
| Meta Pixel installed | Claude | Test event fires in Events Manager |
| Google Ads conversion tag installed | Claude | Test conversion fires |
| robots.txt + sitemap.xml live | Claude | URLs return correctly |
| Page-speed test on all template pages | Claude | Lighthouse mobile >85 |
| Mobile QA on real devices | Gurvir | iPhone Safari + Android Chrome both clean |
| GBP listing verified + optimized | Gurvir | Status: Verified, all fields filled |
| Email + SMS automation tested end-to-end | Claude + Gurvir | Real test from Gurvir's phone shows full sequence |

## 12.3 Launch sequence (Week 0)

1. **Day -3:** soft-launch URL shared with 5 trusted friends/clients for feedback. No public link, no Google Ads, no Meta retargeting yet.
2. **Day -1:** final QA pass. Fix any issues. Submit sitemap to GSC.
3. **Day 0:** point primary marketing URLs to live site. Switch Meta ad bio link. Update Instagram bio to point to website. Update GBP to point to website.
4. **Day +1:** Google Ads campaigns launched, pointing to `/lp/*` LPs.
5. **Day +3:** Meta retargeting audiences begin populating (Pixel data).
6. **Day +7:** first review velocity push — all clients from the previous 30 days asked for GBP reviews.
7. **Day +14:** first SEO check — GSC impressions report, identify any indexing issues.
8. **Day +30:** first KPI checkpoint (section 12.4).

## 12.4 Post-launch KPIs (30 / 60 / 90 day checkpoints)

| Metric | 30 days | 60 days | 90 days |
|---|---|---|---|
| GBP reviews count | +10 | +20 | +30 |
| GBP photo uploads | +12 | +24 | +36 |
| Organic GSC impressions | 1,000+ | 5,000+ | 15,000+ |
| Organic clicks | 50+ | 250+ | 750+ |
| Indexed pages in GSC | 24/26 | 26/26 | 26/26 |
| Google Ads CPC | <$5 | <$3.50 | <$2.50 |
| Google Ads conversion rate (LP submission) | >3% | >5% | >7% |
| Website-source HubSpot leads | 10+ | 30+ | 75+ |
| Website-source `Quote Call Booked` events | 3+ | 12+ | 30+ |
| Lighthouse mobile score | >85 | >85 | >90 |

## 12.5 What we hold for v2 (out of scope for launch)

- Blog (defer until we know which content drives traffic)
- 7th+ location pages (add after Brampton/Mississauga/Toronto/Vaughan/Markham/Oakville rank)
- Customer portal / account login (no booking online; consultative sales preserved)
- French-language version (only if Quebec leads ever materialize meaningfully)
- A/B testing infrastructure (Starter doesn't support; defer to potential Pro upgrade if ROI justifies)
- E-commerce / online deposit collection (preserves consultative model; deposit collected via Stripe link on the call)

## 12.6 What we'll learn in the first 30 days that will reshape v2

The 30-day data will tell us:
- Which keywords actually rank for which pages → informs page-copy iteration
- Which location pages convert vs. just attract traffic → keep or cut
- Which Google Ads LPs convert best → pour budget into winner, kill losers
- Whether SMS is worth the Twilio cost (compare website-with-SMS lead-to-booking rate vs. Meta-form-IG lead-to-booking rate)
- Whether the multi-step form's Step 3 (services + textarea) actually adds signal or just adds friction → if completion rate of Step 3 is <60%, collapse it back into Step 2

---

## Spec complete — review checkpoint

All 12 sections written.

**Please review the full spec and tell me where to redirect.** Specific things worth pressure-testing:

- **Section 5 (package detail template)** — is the "What's included" table approach right, or do you want a different breakdown? Are the package-variant outcome lines (5.3) on-brand?
- **Section 6 (location template)** — agree with "no fake content" rule (omit sections if we don't have real city-specific photos/testimonials)?
- **Section 7 (event-type)** — corporate page positioned as "experiences not AV" — does that land or does it lose corporate leads who genuinely want AV-vendor framing?
- **Section 8 (Google Ads LPs)** — three LPs the right starting set? Or do you want one per event-type (wedding/engagement/corporate) instead?
- **Section 9 (form)** — Step 3 (services multi-select + tent size + textarea) is the website-only addition. Worth the friction, or trim to 3 steps?
- **Section 10 (post-submit)** — Twilio + Zapier SMS at ~$50/mo run-rate — approve or hold and launch email-only?
- **Section 11 (schema)** — anything to add (Review snippets, Event schema for past confirmed events)?
- **Section 12 (GBP)** — review-velocity targets realistic (10/20/30 over 30/60/90 days)?

Once you approve, I'll commit the spec and invoke the `writing-plans` skill to produce the phased implementation plan.
