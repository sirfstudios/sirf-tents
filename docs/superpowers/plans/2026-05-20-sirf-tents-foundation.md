# Sirf Tents Website — Phase 1 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up the foundation layer for Sirf Tents' website — domain, DNS, HubSpot CMS Hub Starter, brand baseline, Google Business Profile claim/verify, analytics + tracking pixels, custom HubSpot theme, and HubSpot CRM properties + pipelines — so Phase 2 (page-by-page build) can begin against a fully prepared platform.

**Architecture:** Stand up the empty shell of the site at `sirftents.com` (or chosen alternative) on HubSpot CMS Hub Starter, with all tracking and CRM plumbing in place but no marketing pages built yet. Kick off the longest-running external dependencies first (GBP postcard verification, Google Ads account approval) so they complete in parallel with code/config work. The output is a live URL serving a blank theme-styled page, with analytics firing, GBP claimed, all custom contact + deal properties created, and Pipelines A and B configured per `handoffs/hubspot-meta-integration.md`.

**Tech Stack:**
- **CMS:** HubSpot CMS Hub Starter (~$25/mo)
- **CLI:** `hs` (HubSpot CMS CLI v6+) for local theme dev
- **Theme:** Custom theme scaffold via `hs init` + `hs upload`
- **Fonts:** Cormorant Garamond + Inter (Google Fonts, self-hosted via theme)
- **Analytics:** Google Analytics 4 + Meta Pixel + Google Ads conversion tag + HubSpot tracking
- **Local repo:** `/Users/pawan/sirf-tents/` — HubSpot theme code committed under `theme/` directory

**Source spec:** `docs/superpowers/specs/2026-05-19-sirf-tents-website-design.md`

**Related handoffs:**
- `handoffs/hubspot-meta-integration.md` — Pipeline A/B definitions, CAPI event mapping
- `handoffs/meta-instant-form.md` — existing Meta form field structure (reference for property naming consistency)

---

## File structure (what gets created locally in this repo)

```
/Users/pawan/sirf-tents/
├── theme/                              # NEW — HubSpot theme source (synced via `hs`)
│   ├── theme.json                      # Theme manifest + color/font settings
│   ├── fields.json                     # Editable theme fields
│   ├── templates/
│   │   ├── base.html                   # Base template (head, head injection, footer)
│   │   └── blank.html                  # Blank page template (Phase 1 placeholder)
│   ├── modules/
│   │   └── .gitkeep                    # Empty for now; Phase 2 populates
│   └── css/
│       └── base.css                    # Typography, colors, spacing base
├── assets/
│   ├── brand/                          # NEW — Logo files, color swatches
│   │   ├── logo-color.svg
│   │   ├── logo-monochrome.svg
│   │   └── logo-white.svg
│   └── photography/                    # NEW — Curated event photos
│       ├── hero/                       # ~10 hero candidates
│       ├── inventory/                  # ~12 inventory shots
│       ├── gallery/                    # ~6 case-study event shots
│       └── testimonials/               # ~6 testimonial backgrounds
└── docs/superpowers/plans/
    └── 2026-05-20-sirf-tents-foundation.md   # This file
```

**Out of scope for Phase 1:** any page templates beyond `blank.html`, any custom modules (homepage hero, package card, etc.), any form fields, any schema markup. All of that is Phase 2/3.

---

## Critical sequencing notes

- **Task 1 (GBP claim)** kicks off first — postcard verification takes 5–7 calendar days. Anything that follows can happen in parallel during the wait.
- **Task 2 (domain) + Task 3 (HubSpot subscription)** are mutually independent and can be done in either order.
- **Task 4 (DNS connect)** requires Tasks 2 and 3 complete.
- **Tasks 5–11 (theme, analytics)** require Task 4 complete.
- **Tasks 12–14 (CRM properties, pipelines, GSC)** are independent of the theme work; can run in parallel.
- **Task 15 (GBP verification finish)** unblocks when postcard arrives.
- **Task 16 (Phase 1 close-out)** is the final checkpoint before Phase 2.

**STOP-AND-CONFIRM points (Gurvir does, Claude waits):**
- Domain registrar payment screen (Task 2)
- HubSpot subscription upgrade payment screen (Task 3)
- GBP verification card entry (Task 1 follow-up — Task 15)
- Any OAuth/credentials screen
- Any third-party billing setup

---

## Tasks

### Task 1: Claim Google Business Profile (kick off the 5–7 day clock NOW)

**Why first:** Postcard verification is the longest blocking dependency in Phase 1. Starting Day 1 means it completes inside the foundation week instead of delaying Phase 2.

**Files:** None local (manual + GBP web app)

**External:** business.google.com

- [ ] **Step 1: Open GBP claim flow**

Gurvir signs in to https://business.google.com with the account he wants to own the listing. Use the account that will manage it long-term — transferring later is friction.

- [ ] **Step 2: Search for existing listing**

Search for "Sirf Tents Brampton" in the GBP dashboard. Two possibilities:
- Listing exists (auto-generated by Google from web mentions) → click **Claim this business**
- No listing → click **Add your business to Google** → enter "Sirf Tents"

- [ ] **Step 3: Fill in minimum required fields**

Provide ONLY the minimum needed to submit:
- **Business name:** Sirf Tents
- **Category (primary):** Wedding Service
- **Address:** the verified Brampton business address (the address that will receive the postcard)
- **Phone:** primary business phone in E.164 format (`+1...`) — CLAUDE.md / `hubspot-meta-integration.md` requires E.164 site-wide

Full optimization (categories, hours, photos, description, services) happens later in Task 15. Right now we just want to start the verification clock.

- [ ] **Step 4: Request postcard verification**

When prompted, choose **Verify by postcard**. Expected mail: 5–7 business days.

If GBP offers **Verify by video** or **Verify by phone** as alternatives, prefer those — they're instant. Postcard is the fallback.

- [ ] **Step 5: Verification status check**

Verify status now reads **Verification pending**.

Take a screenshot of the dashboard showing "Verification pending" and save to `/Users/pawan/sirf-tents/assets/brand/gbp-verification-pending.png` (optional — for the project record).

- [ ] **Step 6: Commit (only if screenshot saved)**

```bash
cd /Users/pawan/sirf-tents
git add assets/brand/gbp-verification-pending.png
git commit -m "GBP claim submitted, postcard verification pending"
```

---

### Task 2: Register the domain

**Files:** None local (domain registrar)

**External:** Cloudflare Registrar / Namecheap / Google Domains (Squarespace Domains)

- [ ] **Step 1: Check `sirftents.com` availability**

Run on local:
```bash
whois sirftents.com 2>&1 | grep -E "Domain Name:|No match|NOT FOUND" | head -3
```

Three possible outcomes:
- "No match" or "NOT FOUND" → available, proceed to Step 2
- "Domain Name: SIRFTENTS.COM" → already registered (Gurvir may own it, or someone else does). If Gurvir owns it, skip Step 2 → Step 4. If someone else, see Step 1b.
- Other registrar gibberish → use https://whois.cloudflare.com/lookup as backup

- [ ] **Step 1b (only if domain is owned by someone else)**

Decide on an alternative. Strong candidates in order:
1. `sirftents.ca` (Canadian — local SEO bonus, geo-targeting clarity)
2. `sirftents.com` (if available via backorder/auction — may take time)
3. `sirftentrentals.com`
4. `sirftents.events`

Run `whois <alternative>.com` for each. Pick the first available `.com` or `.ca`. Avoid hyphens, never go below 4 letters in the brand name.

- [ ] **Step 2: Choose registrar**

**Recommended: Cloudflare Registrar.** Reasons:
- At-cost pricing (no markup)
- Free WHOIS privacy
- Free DNS hosting (we'll use Cloudflare DNS regardless of registrar — see Task 4)
- 2FA enforced by default

Alternatives:
- Namecheap (slightly higher renewal, but better UI for non-technical owners)
- Squarespace Domains / Google Domains (consolidates with Gmail if used)

**STOP-AND-CONFIRM:** Gurvir picks the registrar before continuing.

- [ ] **Step 3: Register the domain**

In the chosen registrar:
1. Add domain to cart
2. Enable WHOIS privacy (Cloudflare and Namecheap include free; Squarespace charges)
3. Choose 1-year registration (renew annually; 10-year locks in but ties up cash)
4. Complete checkout

**STOP-AND-CONFIRM:** Gurvir is at the payment screen. Claude waits.

- [ ] **Step 4: Verify registration**

```bash
whois sirftents.com 2>&1 | grep -E "Registrar:|Creation Date:|Registry Expiry Date:"
```

Expected: shows the registrar name + creation date matching today + expiry one year out.

- [ ] **Step 5: Note registrar admin URL and credentials location**

Add a note to your password manager (NOT to git):
- Registrar: <chosen>
- Admin URL: <URL>
- Email used: <email>

This is operational info — never committed.

- [ ] **Step 6: Commit (no code change, just track progress)**

No commit needed for this task. Mark it complete in your local tracking when domain is confirmed registered.

---

### Task 3: Activate HubSpot CMS Hub Starter

**Files:** None local (HubSpot UI)

**External:** HubSpot account at `app.hubspot.com`

- [ ] **Step 1: Audit current subscription**

Gurvir signs in to HubSpot → top-right account icon → **Account & Billing** → **Products & Add-ons**.

Confirm current state: Marketing Hub Starter is active. CMS Hub Starter is NOT yet active.

- [ ] **Step 2: Add CMS Hub Starter to subscription**

Click **Add CMS Hub Starter**. Expected price: ~$25 CAD/mo (Canadian pricing on HubSpot's Canadian portal; check vs. USD if charged in USD).

**STOP-AND-CONFIRM:** Gurvir is at the payment / contract screen. Claude waits.

- [ ] **Step 3: Confirm CMS access**

After billing confirms, navigate to **Marketing → Website Pages** in the top nav. The CMS Hub tools should now be available.

Also visit **Settings → Website → Domains & URLs** — this is where Task 4 happens.

- [ ] **Step 4: Verify page count limit**

In Settings → Account Defaults, confirm that CMS Hub Starter shows in active subscriptions. The page cap is ~30; we plan for 27 in Phase 2.

- [ ] **Step 5: Commit (no code change)**

No commit. Confirm CMS Hub Starter active in your tracking system.

---

### Task 4: Connect domain to HubSpot (DNS setup)

**Files:** None local (DNS config at registrar + HubSpot UI)

**External:** registrar DNS panel + HubSpot domain settings

- [ ] **Step 1: Initiate domain connection in HubSpot**

In HubSpot: **Settings → Website → Domains & URLs → Connect a domain**.

- Domain type: **Primary domain**
- Domain: `sirftents.com`
- Subdomain: `www` (also recommended)
- Content type: **Website pages, Landing pages, Blog, Email** (check all — Phase 2 will need them)

HubSpot generates a set of DNS records — typically a CNAME for `www` and either an A record or an apex CNAME flattening for the root.

Take a screenshot of these records (you'll need to enter them at the registrar) and save to `/Users/pawan/sirf-tents/assets/brand/hubspot-dns-records.png` — temporary, will delete after DNS is verified.

- [ ] **Step 2: Move DNS to Cloudflare (recommended) or use registrar DNS**

**If Cloudflare Registrar:** DNS is already on Cloudflare. Skip to Step 3.

**If Namecheap / Squarespace / Google Domains:**
1. Create a free Cloudflare account at https://dash.cloudflare.com
2. Add the domain → choose **Free plan**
3. Cloudflare scans existing DNS and provides 2 nameservers (e.g., `aria.ns.cloudflare.com`, `theo.ns.cloudflare.com`)
4. At the registrar: update nameservers to the Cloudflare-provided pair
5. Wait 1–48 hours for propagation (usually <30 min for fresh domains with no existing DNS)

Why Cloudflare: free SSL/CDN cushion (HubSpot's CDN is fine but Cloudflare in front adds DDoS protection + analytics + speed for any non-HubSpot subdomain you'd ever want).

- [ ] **Step 3: Add DNS records in Cloudflare (or registrar DNS)**

Add the records HubSpot generated in Step 1. Typically:

| Type | Name | Content | Proxy | TTL |
|---|---|---|---|---|
| CNAME | `www` | `<your-hub-id>.hs-sites.com` (HubSpot provides) | DNS only (gray cloud) | Auto |
| A | `@` (root) | HubSpot's IP (HubSpot provides) | DNS only | Auto |

OR (HubSpot now prefers):

| Type | Name | Content | Proxy | TTL |
|---|---|---|---|---|
| CNAME | `@` (root) | `<your-hub-id>.hs-sites.com` | DNS only | Auto |
| CNAME | `www` | `<your-hub-id>.hs-sites.com` | DNS only | Auto |

**Important:** keep Cloudflare proxy set to **DNS only** (gray cloud, not orange). HubSpot terminates SSL itself; proxying through Cloudflare creates a double-SSL handshake that breaks.

- [ ] **Step 4: Verify DNS propagation**

Wait 5–30 minutes. Then test:

```bash
dig sirftents.com +short
dig www.sirftents.com +short
```

Expected: both resolve to HubSpot-provided values from Step 3. If empty or stale, wait another 15 min and retry.

- [ ] **Step 5: Trigger HubSpot SSL provisioning**

Back in HubSpot → Settings → Domains & URLs → click **Verify** on the pending domain.

HubSpot validates DNS, then auto-provisions Let's Encrypt SSL (5–15 min). Status changes from "Verifying" → "Verified" → "SSL provisioned."

- [ ] **Step 6: Test the live URL**

```bash
curl -sI https://sirftents.com | head -5
```

Expected: `HTTP/2 200` or `HTTP/2 404` (404 is fine — no page exists yet at root, just confirms HubSpot is serving). NOT expected: connection refused, SSL handshake error, or non-200/404 status.

Also load `https://sirftents.com` in browser. Expected: blank HubSpot default page with green padlock (SSL active).

- [ ] **Step 7: Set primary domain redirect**

In HubSpot → Domains & URLs:
- Set `sirftents.com` (apex) as **Primary domain**
- Configure `www.sirftents.com` → 301 redirect to `sirftents.com`

Apex over www is a brand choice (cleaner URL); both work, but pick one canonical and 301 the other.

- [ ] **Step 8: Delete the temporary DNS screenshot**

```bash
cd /Users/pawan/sirf-tents
rm -f assets/brand/hubspot-dns-records.png
```

(No need to keep DNS records in git — they're in the registrar/HubSpot UI.)

- [ ] **Step 9: Commit (no code yet)**

No code commit. Just verify the domain status in HubSpot is **Verified + SSL active**.

---

### Task 5: Photo asset curation + organization

**Files:**
- Create directory: `/Users/pawan/sirf-tents/assets/photography/`
- Create subdirectories: `hero/`, `inventory/`, `gallery/`, `testimonials/`, `locations/`

**External:** Gurvir's existing professional photo library (wherever it lives — Drive/Dropbox/local drive)

- [ ] **Step 1: Create the photography directory structure**

```bash
cd /Users/pawan/sirf-tents
mkdir -p assets/photography/{hero,inventory,gallery,testimonials,locations}
```

- [ ] **Step 2: Curate photos with Gurvir's guidance**

Gurvir reviews his professional photo library and selects ~40 photos total, distributed:

| Bucket | Count | Purpose | Aspect ratio |
|---|---|---|---|
| `hero/` | 8–10 | Homepage + package detail hero candidates | Wide 16:9 or 21:9 + a few 4:5 vertical |
| `inventory/` | 12–15 | Inventory page category illustrations: tents (3), chairs (3), tables (2), flooring (1), draping (1), fairy lights (1), bars (1–2) | Square 1:1 |
| `gallery/` | 8–10 | Real past events for gallery page + homepage Section F | Mixed 3:2 + 4:5 |
| `testimonials/` | 5–7 | Background blur photos behind testimonial quotes (won't show client faces, just event setting) | Square 1:1 |
| `locations/` | 5+ | One real photo per city served (Brampton, Mississauga, Toronto, Vaughan, Markham, Oakville). If a city has no photo, leave the folder empty (per spec §6.3 — no fake content). | Wide 16:9 |

Photos are placed in the matching subdirectory using descriptive filenames per spec §11.6:

Format: `<event-type>-<city>-<package>-<seq>.jpg`

Example: `sikh-wedding-brampton-legacy-signature-1.jpg`

- [ ] **Step 3: Apply consistent warm-tone color grading (Gurvir, in Lightroom)**

Gurvir defines a single Lightroom preset:
- Warmth: +8 to +15
- Tint: 0 to +5 (slight magenta neutralizer)
- Shadows: +20 (lift)
- Highlights: -10 (contained)
- Saturation: -5 to 0 (slightly muted = premium)

Apply preset to ALL photos in the curated set. Consistency across the site = the visual difference from H&H's mixed grade.

If photos already match the warm cream/gold palette by default, this step is shorter. If they skew cool, this step is essential — otherwise the site palette won't match the imagery.

- [ ] **Step 4: Export at multiple sizes**

For each photo, export 4 sizes in 2 formats:

| Width | Format | Quality | Use |
|---|---|---|---|
| 1920 | AVIF | 70 | Hero/full-bleed desktop |
| 1280 | AVIF | 75 | Standard desktop |
| 768 | AVIF | 75 | Tablet |
| 480 | AVIF | 80 | Mobile |
| 1920 | JPG | 80 | Browser fallback (Safari <16) |
| 1280 | JPG | 80 | Browser fallback |

Filename convention: `<base-name>-w<width>.{avif,jpg}` (e.g., `sikh-wedding-brampton-legacy-signature-1-w1280.avif`).

If Lightroom export is bottlenecked, ship at 1920 + 1280 JPG only for v1 — the AVIF/responsive optimization can be a Phase 4 polish task.

- [ ] **Step 5: Verify directory structure**

```bash
cd /Users/pawan/sirf-tents
find assets/photography -type f | wc -l
ls assets/photography/hero/ | head -5
ls assets/photography/inventory/ | head -5
```

Expected: ~80–160 files total (40 photos × 4 sizes for AVIF + JPG, or fewer if shipping JPG only at 2 sizes).

- [ ] **Step 6: Commit photo library**

```bash
cd /Users/pawan/sirf-tents
git add assets/photography/
git commit -m "Add curated event photo library — warm-tone graded, multi-size exports

40 photos across hero/inventory/gallery/testimonials/locations buckets.
Filename convention: <event-type>-<city>-<package>-<seq>-w<width>.<ext>.
Phase 2 will reference these by exact filename in module configs."
```

**Note:** If photos are large (>20MB total in repo), consider Git LFS. For Phase 1, normal git is fine if the library is <100MB.

---

### Task 6: Brand baseline lock — logo, color, typography decisions

**Files:**
- Create: `/Users/pawan/sirf-tents/assets/brand/logo-color.svg`
- Create: `/Users/pawan/sirf-tents/assets/brand/logo-monochrome.svg`
- Create: `/Users/pawan/sirf-tents/assets/brand/logo-white.svg`
- Create: `/Users/pawan/sirf-tents/assets/brand/palette.md`

- [ ] **Step 1: Locate current logo source file**

Gurvir provides the logo source file (SVG, AI, or PDF preferred — never just a PNG, since the site needs multiple sizes/colors).

If only PNG is available: convert to SVG via https://www.adobe.com/express/feature/image/convert/png-to-svg or hire a designer for a 4-hour cleanup task. Logos NEED to be vector for crisp display at any size.

- [ ] **Step 2: Export logo variants**

Save three versions:

1. **`logo-color.svg`** — full-color brand logo. Used on light backgrounds (cream `#F8F4ED` page background).
2. **`logo-monochrome.svg`** — single-color black version. Used in low-color contexts (footer, business documents).
3. **`logo-white.svg`** — single-color white version. Used over hero photos with dark gradient overlays.

Place in `/Users/pawan/sirf-tents/assets/brand/`.

- [ ] **Step 3: Validate palette against a hero photo**

Open one hero photo (`assets/photography/hero/` — pick the strongest) and a swatch of the proposed palette side-by-side:

| Role | Hex | Use |
|---|---|---|
| Background | `#F8F4ED` | Page bg |
| Ink (primary) | `#1A1A1A` | Body text |
| Ink (secondary) | `#4A4A4A` | Captions |
| Gold accent | `#B08D57` | CTA, key numbers |
| Gold hover | `#937340` | CTA hover |
| Soft border | `#E8E1D5` | Hairlines |

**Check:** does the gold `#B08D57` appear in the photo (warm metals, candle glow, ambient lighting)? If yes → palette confirmed. If the photo skews cooler (silver chiavari, white-only draping, daytime ceremony with overcast sky), the gold may feel disconnected — adjust to a warmer cream-gold like `#A8845C` or a softer brass like `#9D7A52`.

Gurvir makes the final palette call.

- [ ] **Step 4: Document final palette**

Write `/Users/pawan/sirf-tents/assets/brand/palette.md`:

```markdown
# Sirf Tents Brand Palette

| Role | Hex | RGB | Use |
|---|---|---|---|
| Background | `#F8F4ED` | 248, 244, 237 | Page background — warm cream |
| Surface | `#FFFFFF` | 255, 255, 255 | Cards, form fields |
| Ink primary | `#1A1A1A` | 26, 26, 26 | Body + headlines |
| Ink secondary | `#4A4A4A` | 74, 74, 74 | Captions + meta |
| Gold accent | `#B08D57` | 176, 141, 87 | CTA, key numbers, dividers |
| Gold hover | `#937340` | 147, 115, 64 | CTA hover state |
| Soft border | `#E8E1D5` | 232, 225, 213 | Hairlines + card borders |
| Error | `#A63E3E` | 166, 62, 62 | Form error states only |
```

If Gurvir adjusted any color in Step 3, reflect those values here.

- [ ] **Step 5: Confirm typography choice**

Spec defaults: Cormorant Garamond (display) + Inter (body), both from Google Fonts.

**Validate:** does Cormorant render well at the brand-text sizes? Open https://fonts.google.com/specimen/Cormorant+Garamond, look at the live preview at 64px (homepage H1 desktop) and at 14px (caption). Cormorant should feel elegant at 64 and still legible at 14.

If Gurvir wants alternatives at this gate, candidates:
- **Cormorant Garamond** (spec recommendation) — elegant, slightly italic-leaning serif
- **EB Garamond** — more classical, slightly heavier
- **Playfair Display** — common in wedding industry (spec advised against, but available as fallback)

Body font is Inter unless Gurvir wants a different sans-serif. Other safe choices: Söhne (paid), Söhne Schmal (paid), Source Sans (free), Manrope (free).

- [ ] **Step 6: Commit brand assets**

```bash
cd /Users/pawan/sirf-tents
git add assets/brand/
git commit -m "Add brand baseline — logo variants + locked palette + typography choices

Logos: color, monochrome, white. Palette documented in assets/brand/palette.md.
Typography confirmed: Cormorant Garamond (display) + Inter (body)."
```

---

### Task 7: Initialize HubSpot CMS theme scaffold locally

**Files:**
- Create: `/Users/pawan/sirf-tents/theme/theme.json`
- Create: `/Users/pawan/sirf-tents/theme/fields.json`
- Create: `/Users/pawan/sirf-tents/theme/templates/base.html`
- Create: `/Users/pawan/sirf-tents/theme/templates/blank.html`
- Create: `/Users/pawan/sirf-tents/theme/css/base.css`
- Create: `/Users/pawan/sirf-tents/.hsignore`

- [ ] **Step 1: Install or verify HubSpot CLI**

```bash
which hs && hs --version
```

If `hs` is not installed:
```bash
npm install -g @hubspot/cli
hs --version
```

Expected: `hs 6.x.x` or newer.

Per memory: Node/Bun were installed via tarball into `~/.local/bin`. If `npm` isn't on PATH, add `~/.local/bin` to PATH or use the absolute path.

- [ ] **Step 2: Authenticate `hs` with the HubSpot portal**

```bash
cd /Users/pawan/sirf-tents
hs init
```

This launches a browser OAuth flow.

**STOP-AND-CONFIRM:** Gurvir completes the OAuth flow in browser. Claude waits.

After OAuth, the CLI writes `hubspot.config.yml` to the working directory. **This file contains the auth token — do NOT commit it.**

- [ ] **Step 3: Add config to `.gitignore`**

```bash
cd /Users/pawan/sirf-tents
echo "hubspot.config.yml" >> .gitignore
echo "" >> .gitignore
echo "# HubSpot CLI cache" >> .gitignore
echo ".hs-cache/" >> .gitignore
```

- [ ] **Step 4: Verify CLI connection**

```bash
cd /Users/pawan/sirf-tents
hs accounts list
```

Expected: lists the Sirf Tents HubSpot account with a Portal ID.

- [ ] **Step 5: Create `.hsignore` (controls what `hs upload` sends)**

```bash
cd /Users/pawan/sirf-tents
cat > .hsignore <<'EOF'
# Repo files that should NEVER be uploaded to HubSpot
.git
.gitignore
docs/
handoffs/
README.md
CLAUDE.md
*.md
hubspot.config.yml
.firecrawl/
.hs-cache/
node_modules/
*.xlsx
*.pdf
assets/
EOF
```

Note: `assets/` is excluded because photos and logos are uploaded separately via HubSpot File Manager, NOT bundled into the theme.

- [ ] **Step 6: Create theme directory**

```bash
cd /Users/pawan/sirf-tents
mkdir -p theme/templates theme/modules theme/css
```

- [ ] **Step 7: Create `theme/theme.json` (theme manifest)**

```json
{
  "label": "Sirf Tents",
  "preview_path": "./templates/blank.html",
  "screenshot_path": "./screenshot.png",
  "enable_domain_stylesheets": false,
  "version": "1.0.0",
  "responsive_breakpoints": [
    { "name": "mobile", "mediaQuery": "(max-width: 767px)" },
    { "name": "tablet", "mediaQuery": "(min-width: 768px) and (max-width: 1023px)" },
    { "name": "desktop", "mediaQuery": "(min-width: 1024px)" }
  ]
}
```

- [ ] **Step 8: Create `theme/fields.json` (color + font config)**

```json
[
  {
    "name": "global_colors",
    "label": "Global colors",
    "type": "group",
    "children": [
      { "name": "background", "label": "Background", "type": "color", "default": { "color": "#F8F4ED", "opacity": 100 } },
      { "name": "surface", "label": "Surface (white)", "type": "color", "default": { "color": "#FFFFFF", "opacity": 100 } },
      { "name": "ink_primary", "label": "Ink primary", "type": "color", "default": { "color": "#1A1A1A", "opacity": 100 } },
      { "name": "ink_secondary", "label": "Ink secondary", "type": "color", "default": { "color": "#4A4A4A", "opacity": 100 } },
      { "name": "gold_accent", "label": "Gold accent", "type": "color", "default": { "color": "#B08D57", "opacity": 100 } },
      { "name": "gold_hover", "label": "Gold hover", "type": "color", "default": { "color": "#937340", "opacity": 100 } },
      { "name": "soft_border", "label": "Soft border", "type": "color", "default": { "color": "#E8E1D5", "opacity": 100 } },
      { "name": "error", "label": "Error red", "type": "color", "default": { "color": "#A63E3E", "opacity": 100 } }
    ]
  },
  {
    "name": "global_fonts",
    "label": "Global fonts",
    "type": "group",
    "children": [
      { "name": "display", "label": "Display font", "type": "font", "default": { "font": "Cormorant Garamond", "font_set": "GOOGLE", "fallback": "Georgia, serif" } },
      { "name": "body", "label": "Body font", "type": "font", "default": { "font": "Inter", "font_set": "GOOGLE", "fallback": "system-ui, sans-serif" } }
    ]
  }
]
```

- [ ] **Step 9: Create `theme/templates/base.html` (base template)**

```html
<!--
  templateType: page
  label: Sirf Tents Base
  screenshotPath: ../images/templates/base.png
  isAvailableForNewContent: false
-->
<!DOCTYPE html>
<html lang="en-CA">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="light">
  {{ standard_header_includes }}
</head>
<body>
  <main role="main">
    {% block body %}{% endblock %}
  </main>
  {{ standard_footer_includes }}
</body>
</html>
```

- [ ] **Step 10: Create `theme/templates/blank.html` (Phase 1 placeholder template)**

```html
<!--
  templateType: page
  label: Sirf Tents — Blank
  screenshotPath: ../images/templates/blank.png
  isAvailableForNewContent: true
-->
{% extends "./base.html" %}
{% block body %}
  <section style="min-height: 60vh; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem;">
    <div style="text-align: center; max-width: 720px;">
      <h1 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(2.5rem, 6vw, 5rem); color: {{ theme.global_colors.ink_primary.color }}; margin: 0 0 1rem;">Sirf Tents</h1>
      <p style="font-family: 'Inter', system-ui, sans-serif; font-size: 1.125rem; color: {{ theme.global_colors.ink_secondary.color }}; margin: 0;">Coming soon.</p>
    </div>
  </section>
{% endblock %}
```

- [ ] **Step 11: Create `theme/css/base.css` (typography + spacing primitives)**

```css
/* Sirf Tents — Base CSS
 * Loaded site-wide. Defines typography scale, spacing primitives, color custom properties.
 */

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');

:root {
  /* Colors (synced from theme.json defaults — HubSpot also surfaces these as theme.global_colors.* for HUBL) */
  --bg: #F8F4ED;
  --surface: #FFFFFF;
  --ink-primary: #1A1A1A;
  --ink-secondary: #4A4A4A;
  --gold: #B08D57;
  --gold-hover: #937340;
  --soft-border: #E8E1D5;
  --error: #A63E3E;

  /* Spacing — 8px base */
  --s-1: 8px;
  --s-2: 16px;
  --s-3: 24px;
  --s-4: 32px;
  --s-5: 48px;
  --s-6: 64px;
  --s-7: 96px;
  --s-8: 128px;

  /* Type scale */
  --display: clamp(2.5rem, 6vw, 5rem);
  --h1: clamp(2rem, 4.5vw, 3.5rem);
  --h2: clamp(1.5rem, 3vw, 2.25rem);
  --h3: clamp(1.25rem, 2.25vw, 1.5rem);
  --body: 1rem;
  --small: 0.875rem;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--ink-primary);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: var(--body);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 600;
  line-height: 1.15;
  margin: 0 0 var(--s-3);
}

p { margin: 0 0 var(--s-3); }

a {
  color: var(--ink-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--gold);
  text-decoration-thickness: 1px;
  transition: text-decoration-color 200ms ease;
}
a:hover { text-decoration-color: var(--gold-hover); }

/* Pill CTA primitive — used everywhere */
.cta-pill {
  display: inline-block;
  padding: 14px 32px;
  background: var(--gold);
  color: var(--surface);
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 9999px;
  border: 1px solid var(--gold);
  transition: background 200ms ease, border-color 200ms ease;
}
.cta-pill:hover { background: var(--gold-hover); border-color: var(--gold-hover); }
```

- [ ] **Step 12: Upload the theme to HubSpot**

```bash
cd /Users/pawan/sirf-tents
hs upload theme sirf-tents-theme
```

Expected output: `Uploaded 5 files to sirf-tents-theme in HubSpot`

- [ ] **Step 13: Activate the theme as default site theme**

In HubSpot UI:
1. Go to **Settings → Website → Themes**
2. Find "Sirf Tents" in the theme list
3. Click **Set as active theme**

- [ ] **Step 14: Create a placeholder homepage from the blank template**

In HubSpot UI:
1. **Marketing → Website Pages → Create → Website page**
2. Choose the **Sirf Tents — Blank** template
3. Page title: "Sirf Tents — Coming Soon"
4. URL slug: `/` (root)
5. Click **Publish**

- [ ] **Step 15: Verify live**

```bash
curl -sI https://sirftents.com | head -3
```

Expected: `HTTP/2 200`.

Load `https://sirftents.com` in browser. Expected: blank page with **Sirf Tents** in Cormorant Garamond on cream background + "Coming soon." subline in Inter.

- [ ] **Step 16: Commit the theme**

```bash
cd /Users/pawan/sirf-tents
git add theme/ .hsignore .gitignore
git commit -m "Add HubSpot CMS theme scaffold — typography, color tokens, blank template

Theme manifest, color/font fields, base.html + blank.html templates, base.css
with typography scale + spacing primitives + pill CTA component.
Activated as site theme; placeholder homepage live at sirftents.com."
```

---

### Task 8: Install Google Analytics 4

**Files:** None local (GA4 web app + HubSpot UI)

**External:** analytics.google.com

- [ ] **Step 1: Create GA4 property**

Go to https://analytics.google.com → **Admin (gear icon)** → **Create property**.

- Property name: **Sirf Tents Website**
- Time zone: **(GMT-05:00) Eastern Time — Toronto**
- Currency: **CAD**
- Industry: **Other**
- Business size: **Small**

- [ ] **Step 2: Set up a Data Stream**

After property creation, click **Set up a data stream → Web**.

- Website URL: `https://sirftents.com`
- Stream name: **Sirf Tents Main Site**

Click **Create stream**.

- [ ] **Step 3: Copy the Measurement ID**

Format: `G-XXXXXXXXXX`.

Save this ID — needed in Step 4.

- [ ] **Step 4: Install GA4 in HubSpot**

In HubSpot: **Settings → Tracking & Analytics → Integrations → Google Analytics**.

Paste the Measurement ID.

Click **Save**.

HubSpot injects the GA4 gtag.js snippet into every page's `<head>` automatically.

- [ ] **Step 5: Verify GA4 firing**

Open https://sirftents.com in browser. In a second browser tab, open GA4 → **Reports → Realtime**.

Expected: within 30s, the Realtime report shows 1 active user on the property.

- [ ] **Step 6: Configure enhanced measurement events**

In GA4 → **Admin → Data Streams → click the web stream → Enhanced measurement**:

Confirm enabled:
- ✅ Page views
- ✅ Scrolls
- ✅ Outbound clicks
- ✅ Site search (won't trigger until search exists, but enable)
- ✅ Video engagement
- ✅ File downloads

- [ ] **Step 7: Set up conversion events (placeholder for Phase 3)**

In GA4 → **Admin → Events → Conversions**:

Mark events as conversions when they exist:
- `form_submission_inquiry` (Phase 3)
- `phone_call_click` (Phase 2 if tap-to-call wired)
- `email_click` (Phase 2)

For Phase 1, leave the list empty — no conversion events yet to fire.

- [ ] **Step 8: Commit (no code change)**

No commit. Note GA4 Measurement ID in operational tracking (NOT in git).

---

### Task 9: Install Meta Pixel

**Files:** None local (Meta Business + HubSpot UI)

**External:** business.facebook.com

- [ ] **Step 1: Locate existing Meta Pixel ID**

A Meta Pixel likely already exists for the Meta Lead Ads campaigns (per `handoffs/meta-instant-form.md`, leads are flowing already, which requires Pixel + Events Manager setup).

In Meta Business Suite: **Events Manager → Data Sources**. Look for an existing Pixel labeled "Sirf Tents" or similar.

If yes → copy the Pixel ID (format: 15–16 digit number). Skip to Step 3.

If no Pixel exists → continue to Step 2.

- [ ] **Step 2: Create new Meta Pixel (only if none exists)**

In Events Manager: **Connect Data Source → Web → Get started**.

- Pixel name: **Sirf Tents Website**
- Website URL: `https://sirftents.com`

After creation, copy the Pixel ID.

- [ ] **Step 3: Install Pixel in HubSpot**

In HubSpot: **Settings → Tracking & Analytics → Integrations → Facebook Pixel**.

Paste the Pixel ID.

Click **Save**.

HubSpot injects the Pixel base code into every page's `<head>`.

- [ ] **Step 4: Verify with Meta Pixel Helper**

Install **Meta Pixel Helper** Chrome extension from the Chrome Web Store.

Load `https://sirftents.com`. Click the Pixel Helper extension icon. Expected: shows the Pixel ID + a `PageView` event fired with a green checkmark.

- [ ] **Step 5: Verify in Events Manager**

Back in Meta Events Manager → the Pixel data source → **Test Events** tab.

Open `https://sirftents.com` in browser. Within 30 seconds, the Test Events panel should show a `PageView` event.

- [ ] **Step 6: Configure standard events (placeholders)**

The form-submission `Lead` event and the `Schedule` / `Purchase` events will be configured in Phase 3 (form wiring) and Phase 4 (HubSpot deal stage automation) per `handoffs/hubspot-meta-integration.md`. For Phase 1, only `PageView` is required.

- [ ] **Step 7: Commit (no code change)**

No commit. Pixel ID stays out of git.

---

### Task 10: Install Google Ads conversion tag (placeholder for Phase 4)

**Why Phase 1:** Even though Google Ads campaigns aren't running until Phase 4, the conversion tag must be present on the site BEFORE any traffic arrives — otherwise early conversions go unattributed. Install now, conversion actions get configured in Phase 4.

**Files:** None local (Google Ads + HubSpot UI)

**External:** ads.google.com

- [ ] **Step 1: Create Google Ads account if not exists**

Go to https://ads.google.com.

If Gurvir has an existing Ads account → skip to Step 2.

If creating new:
1. Sign in with the business Google account
2. Click **Switch to Expert Mode** (otherwise you're stuck in Smart Campaigns which doesn't expose full conversion tracking)
3. Set up account preferences (Canada / English / CAD)

**STOP-AND-CONFIRM:** Gurvir is on the billing setup screen. Claude waits — billing info isn't required for tag-only install, but Gurvir may want to set it up now.

- [ ] **Step 2: Get Conversion ID (the global site tag ID)**

In Google Ads: **Tools & Settings → Measurement → Conversions → Tag Setup**.

Copy the **Conversion ID** — format `AW-XXXXXXXXXX`.

- [ ] **Step 3: Install in HubSpot**

In HubSpot: **Settings → Tracking & Analytics → Integrations → Google Ads**.

Paste the Conversion ID.

Click **Save**.

HubSpot injects the Google Ads global site tag into every page's `<head>`.

- [ ] **Step 4: Create placeholder Conversion Actions (Phase 4 will populate these)**

In Google Ads → **Conversions**:

Create 3 placeholder conversion actions (DO NOT mark any as active yet):
1. **Inquiry Form Submission** — Category: Submit lead form, Value: dynamic (Phase 3 wires the value)
2. **Quote Call Booked** — Category: Book appointment (mapped to HubSpot Meetings)
3. **Phone Call** — Category: Phone call lead

For Phase 1, these are placeholder definitions. Phase 3 + 4 wires them up.

- [ ] **Step 5: Verify tag firing**

Install **Google Tag Assistant Legacy** Chrome extension.

Load `https://sirftents.com`. Click Tag Assistant. Expected: shows Google Ads global site tag fired with a green status.

Alternatively, in Google Ads → **Conversions → Diagnostics → Tag**: should show "Tag active" once a page has loaded.

- [ ] **Step 6: Commit (no code change)**

No commit. Conversion ID stays out of git.

---

### Task 11: HubSpot CRM custom contact properties

**Files:** None local (HubSpot UI)

**External:** HubSpot CRM settings

These properties match the spec §9.1 form fields and §9.2 hidden fields. They MUST exist before Phase 3 wires up the form — better to create them now in Phase 1 so they're ready.

- [ ] **Step 1: Navigate to Contact Properties**

In HubSpot: **Settings → Objects → Contacts → Properties**.

- [ ] **Step 2: Create custom contact properties (one per row below)**

For each property: **Create property → Contact → Property type → Field type → Save**.

| Property name | Internal name | Group | Field type | Options (if enum) |
|---|---|---|---|---|
| Event Type | `event_type` | Lead Info | Single-line dropdown select | wedding · reception-engagement · corporate · birthday-anniversary-milestones |
| Guest Count Bracket | `guest_count_bracket` | Lead Info | Single-line dropdown select | 40-60 · 60-80 · 80-100 · 100-130 · 130-150 · 150+ |
| Urgency Bracket | `urgency_bracket` | Lead Info | Single-line dropdown select | ASAP — 1-2 weeks · Within next month · 2-3 months · Just exploring |
| Event Date Raw | `event_date_raw` | Lead Info | Single-line text | — (free text; tolerant parser handles "summer 2026", "TBD", "6/15") |
| Event City | `event_city` | Lead Info | Single-line text | — |
| Services Interested | `services_interested` | Lead Info | Multiple checkboxes | Tent · Tables & chairs · Tent draping · Fairy lights & lighting · Flooring & floor wrap · All-in-one package |
| Package Interest | `package_interest` | Lead Info | Single-line dropdown select | High Peak 40 · High Peak 60 · High Peak 80 · Legacy Standard · Legacy Signature · Legacy Grand · Not sure |
| Event Description | `event_description` | Lead Info | Multi-line text | — |
| Form Variant | `form_variant` | Attribution | Single-line text | — |
| First Landing Page | `first_landing_page` | Attribution | Single-line text | — |
| Original Referrer | `original_referrer` | Attribution | Single-line text | — |
| Submitted From Page | `submitted_from_page` | Attribution | Single-line text | — |
| Google Click ID | `gclid` | Attribution | Single-line text | — |
| Meta Click ID | `fbclid` | Attribution | Single-line text | — |
| UTM Source | `utm_source` | Attribution | Single-line text | — |
| UTM Medium | `utm_medium` | Attribution | Single-line text | — |
| UTM Campaign | `utm_campaign` | Attribution | Single-line text | — |
| UTM Content | `utm_content` | Attribution | Single-line text | — |
| UTM Term | `utm_term` | Attribution | Single-line text | — |
| Lead Source | `lead_source` | Attribution | Single-line dropdown select | website-organic · website-paid-google · meta-form-legacy · meta-ad-whatsapp · referral · direct |

**Note on field types:** the spec mentioned multi-select for `services_interested` — in HubSpot, this is implemented as **Multiple checkboxes** field type, which stores values semicolon-separated.

- [ ] **Step 3: Group properties under sensible labels**

In **Settings → Objects → Contacts → Property Groups**, create two groups if they don't exist:
- **Lead Info** (for event/guest/urgency/services properties)
- **Attribution** (for UTM/click ID/referrer properties)

Assign each property to its group during creation (Step 2 column).

- [ ] **Step 4: Set property privacy/GDPR consent settings**

For each `Attribution` property, set **Sensitive** = No, **Required GDPR consent** = No.

For each `Lead Info` property, same: not sensitive, no GDPR.

These are all standard event-rental data, not sensitive PII beyond contact info.

- [ ] **Step 5: Verify properties via API (smoke test)**

Use the HubSpot MCP tool `mcp__hubspot__get_properties` to confirm all properties exist:

```
mcp__hubspot__get_properties (objectType: contacts)
```

Expected: response includes all 21 custom properties created above.

- [ ] **Step 6: Commit (no code change)**

No git commit. Property structure lives in HubSpot, not in repo.

Update operational tracker: 21 custom contact properties created and verified via API.

---

### Task 12: HubSpot CRM custom deal properties + pipelines

**Files:** None local (HubSpot UI)

**External:** HubSpot CRM settings

Phase 1 also creates Pipeline A (Legacy + Premium, 5 stages) and Pipeline B (High Peak, 4 stages) per `handoffs/hubspot-meta-integration.md` Decision 2 — these are prerequisites for Phase 3 form deal-creation logic.

- [ ] **Step 1: Audit current deal pipeline state**

In HubSpot: **Settings → Objects → Deals → Pipelines**.

Per `handoffs/hubspot-meta-integration.md`, the current pipeline is likely a 3-stage default: `New Lead → Opportunity → Deposit Paid`.

Decision point: do we **rename + expand the default pipeline** (saves migration on existing deals) OR **create two new pipelines and leave the default for history**?

**Recommended:** rename the default to "Legacy + Premium" and expand to 5 stages, then create "High Peak" as a second pipeline. Reasons:
- HubSpot deal-stage history cannot be edited/deleted (per `handoffs/hubspot-meta-integration.md`)
- Existing deals stay attached to their original pipeline's history
- New website + Meta leads use the correct pipeline going forward

If Gurvir prefers a different approach, deviate here.

- [ ] **Step 2: Create / rename Pipeline A — Legacy + Premium (5 stages)**

| # | Stage name | Win probability |
|---|---|---|
| 1 | New Lead | 10% |
| 2 | Conversation Active | 20% |
| 3 | Quote Call Booked | 40% |
| 4 | Site Visit / Quote Sent | 65% |
| 5 | Deposit Paid / Closed Won | 100% |
| — | Closed Lost (default) | 0% |

Save Pipeline.

- [ ] **Step 3: Create Pipeline B — High Peak (4 stages)**

Click **Create pipeline → Pipeline name: High Peak**.

| # | Stage name | Win probability |
|---|---|---|
| 1 | New WhatsApp Lead | 15% |
| 2 | Qualified Conversation | 35% |
| 3 | Quote Sent | 60% |
| 4 | Deposit Paid | 100% |
| — | Closed Lost (default) | 0% |

Save Pipeline.

- [ ] **Step 4: Create custom deal properties**

In **Settings → Objects → Deals → Properties**:

| Property name | Internal name | Group | Field type | Options |
|---|---|---|---|---|
| Lead Source | `lead_source` | Deal Info | Single-line dropdown | (same as contact `lead_source` enum) |
| Form Variant | `form_variant` | Deal Info | Single-line text | — |
| Event Date Raw | `event_date_raw` | Deal Info | Single-line text | — |
| Event City | `event_city` | Deal Info | Single-line text | — |
| Quote Call Booked | `quote_call_booked` | Deal Info | Single checkbox (boolean) | — |
| Deposit Paid | `deposit_paid` | Deal Info | Single checkbox (boolean) | — |
| Meta Ad ID | `meta_ad_id` | Attribution | Single-line text | — |
| Meta Adset ID | `meta_adset_id` | Attribution | Single-line text | — |
| Meta Campaign ID | `meta_campaign_id` | Attribution | Single-line text | — |
| `ctwa_clid` (WhatsApp click ID) | `ctwa_clid` | Attribution | Single-line text | — |
| gclid | `gclid` | Attribution | Single-line text | — |

These properties feed Phase 3 form-to-deal mapping and Phase 4 CAPI event triggers (per `handoffs/hubspot-meta-integration.md`).

- [ ] **Step 5: Verify pipelines via API**

```
mcp__hubspot__get_crm_objects (objectType: pipelines)
```

Expected: lists both Pipeline A (5 stages) and Pipeline B (4 stages) with correct stage names and win probabilities.

- [ ] **Step 6: Update the integration handoff**

Mark Pipeline setup complete in `handoffs/hubspot-meta-integration.md`:

```bash
cd /Users/pawan/sirf-tents
```

Edit `handoffs/hubspot-meta-integration.md` — in the "Execution sequence" section, mark Step 0 (Build the two pipelines) as ✅ DONE 2026-05-XX (use actual date).

- [ ] **Step 7: Commit handoff update**

```bash
cd /Users/pawan/sirf-tents
git add handoffs/hubspot-meta-integration.md
git commit -m "Mark Pipeline A + B setup complete in CAPI integration handoff

Pipeline A (Legacy + Premium, 5 stages) and Pipeline B (High Peak, 4 stages)
created in HubSpot per Decision 2 of the verified plan. Custom deal
properties added for lead_source, form_variant, event_date_raw, event_city,
quote_call_booked, deposit_paid, plus Meta + Google attribution IDs.
Phase 3 form wiring and Phase 4 CAPI events can now build on this."
```

---

### Task 13: Submit sitemap.xml to Google Search Console

**Files:** None local (GSC web app)

**External:** search.google.com/search-console

- [ ] **Step 1: Verify domain ownership in GSC**

Go to https://search.google.com/search-console.

**Add property → Domain**: `sirftents.com`.

GSC asks for DNS TXT record verification.

- [ ] **Step 2: Add the TXT verification record**

Copy the TXT record value GSC provides (looks like `google-site-verification=AbCdEfGh...`).

In Cloudflare (or registrar DNS):
- **Type:** TXT
- **Name:** `@`
- **Content:** `google-site-verification=...`
- **TTL:** Auto

Save. Wait 5–30 min for propagation.

- [ ] **Step 3: Confirm verification**

Back in GSC → click **Verify**. Expected: green checkmark, "Ownership verified."

- [ ] **Step 4: Verify HubSpot auto-generates sitemap.xml**

```bash
curl -sI https://sirftents.com/sitemap.xml | head -3
```

Expected: `HTTP/2 200`. HubSpot's CMS auto-generates and serves a sitemap at `/sitemap.xml`.

- [ ] **Step 5: Submit sitemap in GSC**

GSC → **Sitemaps → Add a new sitemap → URL: `sitemap.xml`** → Submit.

Status will read "Pending" initially; check back in 24–48 hours.

- [ ] **Step 6: Configure GSC settings**

- **Settings → Crawl rate**: leave as Google-default (let Google decide)
- **Settings → International targeting**: confirm Country = Canada (improves local SERP weighting)
- **Settings → Ownership verification**: ensure DNS verification stays attached (don't remove the TXT record)

- [ ] **Step 7: Commit (no code change)**

No git commit. Note GSC property URL in operational tracker.

---

### Task 14: Wait for GBP postcard arrival (parallel; not blocking)

This task is the 5–7 day wait that started in Task 1. The other tasks in this plan should be running in parallel.

- [ ] **Step 1: Monitor mail**

Postcard arrives within 5–7 business days from Task 1 Step 4. Sometimes 14 days. If it doesn't arrive within 14 days, request a re-send in GBP → **Get verified → Request another postcard**.

- [ ] **Step 2: Enter PIN in GBP**

When postcard arrives:
1. Sign in to https://business.google.com
2. The listing should prompt "Enter your verification code"
3. Enter the 4–6 digit PIN
4. Click **Verify**

- [ ] **Step 3: Confirm verified status**

Listing status changes from "Pending" → **Verified**.

- [ ] **Step 4: Test public visibility**

Search "Sirf Tents Brampton" in incognito Google. Expected: the GBP listing appears in the local pack within minutes (initial appearance) and stabilizes in 24–48 hours.

- [ ] **Step 5: Quick optimization pass (full optimization comes in Phase 4)**

For now, add the minimum to make the listing useful:
- **Hours:** Mon–Fri 9am–7pm, Sat 10am–4pm, Sun closed
- **Website:** `https://sirftents.com`
- **Phone:** confirm E.164 formatted
- **Description (750 chars):** Short version is fine for now — *"Premium tent rentals for GTA weddings, engagements & receptions. Rated 5 stars over 200+ events. Brampton-based, GTA-wide delivery. Built for Sikh, Hindu, Muslim, and fusion weddings."*
- **Photos:** upload 5 best photos from `assets/photography/hero/` — full photo upload happens in Phase 4

Full optimization (categories, services, posts, Q&A pre-seeding, photo cadence) is Phase 4 Task X.

- [ ] **Step 6: Commit (no code change)**

No git commit. Update operational tracker: GBP verified, basic optimization complete.

---

### Task 15: Phase 1 verification + close-out

**Files:**
- Modify: `/Users/pawan/sirf-tents/docs/superpowers/plans/2026-05-20-sirf-tents-foundation.md` (mark complete)

- [ ] **Step 1: Run end-to-end verification checklist**

Open this plan file. For each task above, confirm all checkboxes are checked.

If any task is incomplete, finish it before proceeding.

- [ ] **Step 2: Live-site smoke test**

```bash
curl -sI https://sirftents.com | head -3
curl -sI https://www.sirftents.com | head -3
curl -sI https://sirftents.com/sitemap.xml | head -3
```

Expected: all return `HTTP/2 200` (or `HTTP/2 301` for www if redirect to apex is set up).

Load `https://sirftents.com` in browser. Expected:
- Green SSL padlock
- "Sirf Tents" rendered in Cormorant Garamond
- "Coming soon." rendered in Inter
- Cream `#F8F4ED` background

- [ ] **Step 3: Analytics smoke test**

In one browser tab, load `https://sirftents.com`. In a second tab:

- **GA4 → Realtime**: shows 1 active user ✅
- **Meta Pixel Helper** (Chrome extension): shows `PageView` event fired ✅
- **Google Tag Assistant**: shows Google Ads tag fired ✅

If any of the three is failing, debug before Phase 2 begins.

- [ ] **Step 4: HubSpot CRM smoke test (via MCP)**

Test contact creation with all custom properties via the HubSpot MCP:

```
mcp__hubspot__manage_crm_objects (
  objectType: contacts,
  operation: create,
  properties: {
    firstname: "Test",
    lastname: "Lead",
    email: "test+phase1@sirftents.com",
    phone: "+14165551234",
    event_type: "wedding",
    guest_count_bracket: "150+",
    urgency_bracket: "ASAP — 1-2 weeks",
    event_date_raw: "October 2026",
    event_city: "Brampton",
    services_interested: "Tent;Tables & chairs;Tent draping",
    package_interest: "Legacy Signature",
    event_description: "Phase 1 smoke test contact",
    form_variant: "phase1-smoketest",
    lead_source: "website-organic"
  }
)
```

Expected: contact created successfully, returns contact ID.

Then delete the test contact:

```
mcp__hubspot__manage_crm_objects (
  objectType: contacts,
  operation: archive,
  recordId: <returned ID>
)
```

If create succeeded but archive failed, that's fine — leave the test contact and manually delete in HubSpot UI later.

- [ ] **Step 5: Pipeline smoke test**

In HubSpot CRM: **Deals → Pipelines → switch between Legacy + Premium and High Peak**. Confirm both pipelines render with correct stages.

Manually create a test deal in Pipeline A (Legacy + Premium):
1. Create deal → "Phase 1 Test Deal" → Pipeline: Legacy + Premium → Stage: New Lead → Amount: $6,500
2. Save.
3. Move it through each stage (New Lead → Conversation Active → Quote Call Booked → Site Visit → Deposit Paid). Verify each stage transition saves.
4. Delete the test deal.

Repeat for Pipeline B with a $800 test deal.

- [ ] **Step 6: Update CLAUDE.md with Phase 1 progress note**

Edit `/Users/pawan/sirf-tents/CLAUDE.md` — under the "Current progress" section, add a bullet:

```markdown
- **Done:** Phase 1 (Foundation) of website project complete 2026-XX-XX. Domain registered, DNS + HubSpot CMS Hub Starter live at sirftents.com, GBP verified, custom theme deployed (Cormorant + Inter, cream/ink/gold palette), GA4 + Meta Pixel + Google Ads tag installed, 21 custom contact properties + 11 deal properties + Pipelines A & B created. See `docs/superpowers/plans/2026-05-20-sirf-tents-foundation.md`.
```

- [ ] **Step 7: Commit Phase 1 close-out**

```bash
cd /Users/pawan/sirf-tents
git add CLAUDE.md docs/superpowers/plans/2026-05-20-sirf-tents-foundation.md
git commit -m "Close out Phase 1 Foundation — site live, tracking firing, CRM ready

Verified: HTTPS live at sirftents.com with theme rendering; GA4 + Meta
Pixel + Google Ads tag all firing; HubSpot CRM has 21 contact + 11 deal
custom properties; Pipelines A (Legacy+Premium, 5 stages) and B (High
Peak, 4 stages) configured per hubspot-meta-integration.md. GBP verified.
Ready for Phase 2 (page-by-page build)."
```

- [ ] **Step 8: Hand off to Phase 2 planning**

Return to the writing-plans skill (or brainstorming if Phase 2 scope needs refinement first) and produce Phase 2: page-by-page build plan. The spec sections covered in Phase 2:
- Homepage (§4)
- Package detail pages × 6 (§5.1, §5.2, §5.3)
- Inventory showcase (§5.4)
- Location pages × 6 (§6)
- Event-type pages × 3 (§7)
- Google Ads LPs × 3 (§8)
- Gallery, About, FAQ, Contact, Inquire, Thank-you (one-offs)
- Schema markup (§11)

Total: 27 pages + universal schema deployment + universal nav/footer/CTA modules.

---

## Self-review checklist (for Claude after writing this plan)

- ✅ **Spec coverage:** Every Phase 1 component in spec §12.2 (pre-launch website checklist) has a task in this plan. The remaining items in §12.2 (form creation, Twilio SMS, Meetings link, schema validation, end-to-end test, GBP optimization, soft launch) are explicitly Phase 2/3/4 scope and not covered here.
- ✅ **Placeholder scan:** No "TBD" / "implement later" / "fill in details" in any step. Where Gurvir's call is needed (domain choice, registrar choice, palette adjustment), the step explicitly says "Gurvir decides" with clear options.
- ✅ **Type consistency:** Property internal names are lowercase_snake_case and consistent across contact (Task 11) and deal (Task 12) tables. `lead_source` appears in both with the same enum values.
- ✅ **Stop-and-confirm points** flagged at every payment/OAuth/credentials screen per CLAUDE.md working-style rule.
- ✅ **Critical path identified:** Task 1 (GBP postcard) is the longest blocking dependency — kicked off first so it parallels everything else.
- ✅ **Verification at every step:** every task ends with an explicit check (curl, browser inspection, MCP call, GA4 Realtime, Pixel Helper, etc.).
- ✅ **Handoffs respected:** Pipeline A/B definitions match `handoffs/hubspot-meta-integration.md` exactly. Property `quote_call_booked` matches the CAPI event mapping.

---

## What's NOT in Phase 1 (explicitly out of scope)

- ❌ Any marketing page beyond the blank placeholder (homepage, packages, locations, etc.)
- ❌ The multi-step inquiry form (Phase 3)
- ❌ Twilio + Zapier SMS automation (Phase 3)
- ❌ HubSpot Meetings tool configuration (Phase 3)
- ❌ Auto-confirmation email template (Phase 3)
- ❌ Schema markup JSON-LD on any page (Phase 2 — deployed alongside the pages they describe)
- ❌ Google Ads campaign creation + budget allocation (Phase 4)
- ❌ Meta CAPI integration backhalf (Phase 4 — per existing `handoffs/hubspot-meta-integration.md` plan)
- ❌ Full GBP optimization — review velocity engine, GBP Posts, full photo cadence (Phase 4)
- ❌ Lighthouse / Core Web Vitals tuning (Phase 4 polish — Phase 2/3 ship working pages, Phase 4 makes them fast)
- ❌ Soft launch + public launch sequence (Phase 4)

Each of these maps to a future Phase 2/3/4 plan, written when Phase 1 closes.

---

## Estimated calendar duration

**5–9 business days**, dominated by GBP postcard wait. Active work time is 8–14 hours across Gurvir + Claude:

- Day 1: Tasks 1, 2, 3, 4 kicked off (GBP claim, domain register, HubSpot subscribe, DNS connect). Active time: 3–4h.
- Day 1–2: Tasks 5, 6 (photos + brand baseline). Active time (mostly Gurvir): 3–4h.
- Day 2–3: Tasks 7, 8, 9, 10 (theme upload + GA4/Pixel/GoogleAds tags). Active time: 3–4h.
- Day 3–4: Tasks 11, 12, 13 (CRM properties + pipelines + GSC). Active time: 2–3h.
- Day 5–9: Wait on GBP postcard. Other tasks complete in parallel.
- Day 9+: Task 14 (GBP verify) + Task 15 (close-out). Active time: 1h.

Phase 2 cannot start until Phase 1 close-out (Task 15) is complete — specifically the theme must be live, custom properties must exist, and Pipelines A/B must be configured. GBP verification is *not* a Phase 2 blocker (it can verify any time before launch).
