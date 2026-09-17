# SIRF Event Productions Website — Phase 1 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a deployed, working Next.js foundation — design system, 3D hero component, core layout/CTA/card components, and a fully wired lead-capture form that creates real contacts + deals in HubSpot — so Phase 2 (building the 23 content pages) can start against a proven, tested platform instead of an empty repo.

**Architecture:** Next.js 15 App Router + TypeScript + Tailwind CSS, deployed on Vercel via CLI (not GitHub-connected — this repo's `gh` auth is currently broken, and a CLI deploy avoids that dependency entirely). The 3D hero uses React Three Fiber, isolated to its own lazily-loaded component so it never blocks the rest of the app's load performance. HubSpot stays the CRM/automation backend, reached from a Next.js API route via the official `@hubspot/api-client` Node SDK — the same contact/deal properties and Pipeline A/B routing logic from the spec, just called via API instead of a native HubSpot form.

**Tech Stack:**
- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 3.4 (tokens from spec §4.2)
- `@react-three/fiber` + `@react-three/drei` + `three` (3D hero only)
- GSAP + ScrollTrigger (2D scroll animation, used from Phase 2 onward)
- `@hubspot/api-client` (official Node SDK — verified current API shape via Context7 2026-09-16)
- `zod` (form validation)
- Vitest + React Testing Library (component/unit tests)
- Vercel (hosting, deployed via `vercel` CLI)

**Source spec:** `docs/superpowers/specs/2026-09-16-sirf-event-productions-website-v2.md` (which itself carries forward package pricing, form fields, and CRM routing from `docs/superpowers/specs/2026-05-19-sirf-tents-website-design.md`)

## Global Constraints

- **Brand name:** "SIRF Event Productions" in all user-facing copy, page titles, and schema — never "Sirf Tents" (spec v2 §1.2)
- **Copy framework:** Hormozi Value Equation is the mandatory structuring logic for all persuasive copy (CLAUDE.md; spec v2 §1.3) — direct-response craft (specificity, curiosity, bucket-brigade transitions) is a technique layer on top, never Schwartz's awareness-ladder as a structure
- **Palette (spec v2 §4.2, exact hex):** background `#F6F4EE`, background-alt `#DADED8`, surface `#FFFFFF`, ink `#20241D`, ink-secondary `#5B5F52`, accent `#4C583E`, accent-hover `#3A4330`, accent-secondary `#768064`, border `#DCD9CC`, error `#A63E3E`
- **Typography:** Cormorant Garamond (display/headings) + Inter (body/UI) — spec v2 §4.1
- **Form fields — never "Other" as an option, ever** (CLAUDE.md absolute rule)
- **Guest-count brackets must match real SKU sizes** (CLAUDE.md): `40-60`, `60-80`, `80-100`, `100-130`, `130-150`, `150+`
- **Pipeline routing:** guest brackets `40-60`/`60-80` (and `80-100` only if `event_type = birthday-anniversary-milestones`) → Pipeline B (High Peak); everything else → Pipeline A (Legacy + Premium) — spec v1 §9.6
- **Phone numbers must be E.164 format** before sending to HubSpot (CLAUDE.md / handoff requirement)
- **The 21GB `Pictures of Setups/` directory must never be committed to git or bundled into the Next.js app** — it stays raw footage on disk until Phase 3's asset-processing plan produces optimized exports
- **Stop at any OAuth screen, credential entry, or payment/billing screen and wait for Gurvir** (CLAUDE.md working-style rule)

---

## File structure (what this plan creates)

```
/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/
├── .gitignore                          # MODIFY — add web/ build artifacts + Pictures of Setups/
└── web/                                 # NEW — the Next.js app lives entirely here
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── postcss.config.js
    ├── vitest.config.ts
    ├── vitest.setup.ts
    ├── .env.local.example
    ├── .gitignore
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx                    # Phase 1 placeholder home page
    │   ├── globals.css
    │   └── api/
    │       └── inquire/
    │           └── route.ts
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   ├── Header.test.tsx
    │   │   ├── Footer.tsx
    │   │   └── Footer.test.tsx
    │   ├── cta/
    │   │   ├── CTABand.tsx
    │   │   └── CTABand.test.tsx
    │   ├── cards/
    │   │   ├── Card.tsx
    │   │   └── Card.test.tsx
    │   ├── hero/
    │   │   ├── TentScene.tsx
    │   │   ├── Hero3D.tsx
    │   │   └── Hero3D.test.tsx
    │   └── forms/
    │       ├── InquiryForm.tsx
    │       ├── InquiryForm.test.tsx
    │       ├── validation.ts
    │       └── validation.test.ts
    └── lib/
        ├── pipeline-routing.ts
        ├── pipeline-routing.test.ts
        ├── hubspot.ts
        └── hubspot.test.ts
```

---

### Task 1: Scaffold the Next.js app + exclude the media library from git

**Files:**
- Create: `web/` (via `create-next-app`)
- Modify: `/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/.gitignore`

**Interfaces:**
- Produces: a running Next.js dev server at `localhost:3000`, and a repo-root `.gitignore` that keeps `Pictures of Setups/` and `web/node_modules` out of git permanently

- [ ] **Step 1: Update the repo-root `.gitignore` before scaffolding anything**

```
.firecrawl/

# Raw event footage — 20GB+, never goes in git. Phase 3 produces
# optimized exports into web/public/media/ instead.
Pictures of Setups/

# Next.js app build artifacts
web/node_modules/
web/.next/
web/.vercel/
web/.env.local
```

- [ ] **Step 2: Scaffold the Next.js app**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
npx create-next-app@latest web --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint --use-npm
```

When prompted, accept the defaults shown above (they're passed as flags, so it should run non-interactively).

- [ ] **Step 3: Verify the dev server runs**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm run dev &
sleep 3
curl -sI http://localhost:3000 | head -1
kill %1
```

Expected: `HTTP/1.1 200 OK`

- [ ] **Step 4: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add .gitignore web/
git commit -m "Scaffold Next.js 15 app in web/, exclude raw media library from git"
```

---

### Task 2: Design tokens — palette + typography

**Files:**
- Modify: `web/tailwind.config.ts`
- Modify: `web/app/layout.tsx`
- Modify: `web/app/globals.css`

**Interfaces:**
- Produces: Tailwind color tokens `bg`, `bg-alt`, `surface`, `ink`, `ink-secondary`, `accent`, `accent-hover`, `accent-secondary`, `border-soft`, `error`; CSS variables `--font-display`, `--font-body`

- [ ] **Step 1: Extend the Tailwind theme with the spec's exact palette**

Replace `web/tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F6F4EE",
        "bg-alt": "#DADED8",
        surface: "#FFFFFF",
        ink: "#20241D",
        "ink-secondary": "#5B5F52",
        accent: "#4C583E",
        "accent-hover": "#3A4330",
        "accent-secondary": "#768064",
        "border-soft": "#DCD9CC",
        error: "#A63E3E",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Load Cormorant Garamond + Inter via `next/font`**

Replace `web/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "SIRF Event Productions",
  description: "Premium tent rentals for GTA weddings, engagements & receptions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA">
      <body className={`${display.variable} ${body.variable} font-body bg-bg text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Set base typography defaults in globals.css**

Replace the contents of `web/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1, h2, h3 {
    font-family: var(--font-display);
    font-weight: 600;
    line-height: 1.15;
  }
}
```

- [ ] **Step 4: Verify tokens render**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm run build
```

Expected: build succeeds with no Tailwind or TypeScript errors.

- [ ] **Step 5: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add web/tailwind.config.ts web/app/layout.tsx web/app/globals.css
git commit -m "Add SIRF Event Productions design tokens: moss palette + Cormorant/Inter"
```

---

### Task 3: Test harness (Vitest + React Testing Library)

**Files:**
- Create: `web/vitest.config.ts`
- Create: `web/vitest.setup.ts`
- Modify: `web/package.json`

**Interfaces:**
- Produces: `npm test` command; `render`/`screen` available in any `*.test.tsx` file via `@testing-library/react`

- [ ] **Step 1: Install test dependencies**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Create `web/vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 3: Create `web/vitest.setup.ts`**

```typescript
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Add the `test` script to `web/package.json`**

In the `"scripts"` block, add:

```json
"test": "vitest run"
```

- [ ] **Step 5: Write a smoke test to prove the harness works**

Create `web/components/smoke.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

function Smoke() {
  return <p>harness works</p>;
}

describe("test harness", () => {
  it("renders and finds text", () => {
    render(<Smoke />);
    expect(screen.getByText("harness works")).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run it**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test
```

Expected: `1 passed`

- [ ] **Step 7: Delete the smoke test (it did its job) and commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
rm components/smoke.test.tsx
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add web/package.json web/package-lock.json web/vitest.config.ts web/vitest.setup.ts
git commit -m "Add Vitest + React Testing Library test harness"
```

---

### Task 4: Header component

**Files:**
- Create: `web/components/layout/Header.tsx`
- Test: `web/components/layout/Header.test.tsx`

**Interfaces:**
- Produces: `Header` component, default export, no props (Phase 1 nav is static; Phase 2 pages will use it as-is)

- [ ] **Step 1: Write the failing test**

Create `web/components/layout/Header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "./Header";

describe("Header", () => {
  it("renders the brand name as a link to home", () => {
    render(<Header />);
    const brandLink = screen.getByRole("link", { name: /sirf event productions/i });
    expect(brandLink).toHaveAttribute("href", "/");
  });

  it("renders primary nav links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "Packages" })).toHaveAttribute("href", "/packages");
    expect(screen.getByRole("link", { name: "Inventory" })).toHaveAttribute("href", "/inventory");
    expect(screen.getByRole("link", { name: "Gallery" })).toHaveAttribute("href", "/gallery");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
  });

  it("renders the persistent CTA", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /get your quote/i })).toHaveAttribute("href", "/inquire");
  });
});
```

- [ ] **Step 2: Run it, confirm it fails**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- Header
```

Expected: FAIL — `Header` module not found.

- [ ] **Step 3: Implement `Header`**

Create `web/components/layout/Header.tsx`:

```tsx
import Link from "next/link";

const NAV_LINKS = [
  { href: "/packages", label: "Packages" },
  { href: "/inventory", label: "Inventory" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border-soft bg-bg/95 px-6 py-4 backdrop-blur">
      <Link href="/" className="font-display text-lg tracking-wide">
        SIRF Event Productions
      </Link>
      <nav className="hidden gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-body text-sm text-ink underline decoration-accent decoration-1 underline-offset-4 hover:decoration-accent-hover"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/inquire"
        className="rounded-full bg-accent px-6 py-3 font-body text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
      >
        Get Your Quote
      </Link>
    </header>
  );
}
```

- [ ] **Step 4: Run the test again**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- Header
```

Expected: `3 passed`

- [ ] **Step 5: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add web/components/layout/Header.tsx web/components/layout/Header.test.tsx
git commit -m "Add Header component with primary nav + persistent CTA"
```

---

### Task 5: Footer component

**Files:**
- Create: `web/components/layout/Footer.tsx`
- Test: `web/components/layout/Footer.test.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: `Footer` component, default export, no props. Location links point to `/locations/<city>` for the 4 v1-launch cities (spec v2 §3)

- [ ] **Step 1: Write the failing test**

Create `web/components/layout/Footer.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("links to all 4 launch-city location pages", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Brampton" })).toHaveAttribute("href", "/locations/brampton");
    expect(screen.getByRole("link", { name: "Mississauga" })).toHaveAttribute("href", "/locations/mississauga");
    expect(screen.getByRole("link", { name: "Milton" })).toHaveAttribute("href", "/locations/milton");
    expect(screen.getByRole("link", { name: "Caledon" })).toHaveAttribute("href", "/locations/caledon");
  });

  it("links to all 3 package category groups", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Legacy Standard" })).toHaveAttribute("href", "/packages/legacy-standard");
    expect(screen.getByRole("link", { name: "High Peak 40" })).toHaveAttribute("href", "/packages/high-peak-40");
  });

  it("renders the social proof line verbatim", () => {
    render(<Footer />);
    expect(screen.getByText("Rated 5 Stars — 200+ GTA Events")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, confirm it fails**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- Footer
```

Expected: FAIL — `Footer` module not found.

- [ ] **Step 3: Implement `Footer`**

Create `web/components/layout/Footer.tsx`:

```tsx
import Link from "next/link";

const PACKAGES = [
  { href: "/packages/legacy-standard", label: "Legacy Standard" },
  { href: "/packages/legacy-signature", label: "Legacy Signature" },
  { href: "/packages/legacy-grand", label: "Legacy Grand" },
  { href: "/packages/high-peak-40", label: "High Peak 40" },
  { href: "/packages/high-peak-60", label: "High Peak 60" },
  { href: "/packages/high-peak-80", label: "High Peak 80" },
];

const LOCATIONS = [
  { href: "/locations/brampton", label: "Brampton" },
  { href: "/locations/mississauga", label: "Mississauga" },
  { href: "/locations/milton", label: "Milton" },
  { href: "/locations/caledon", label: "Caledon" },
];

const EVENTS = [
  { href: "/weddings", label: "Weddings" },
  { href: "/engagements", label: "Engagements" },
  { href: "/corporate", label: "Corporate" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-bg-alt px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
        <div>
          <p className="font-display text-xl">SIRF Event Productions</p>
          <Link
            href="/inquire"
            className="mt-4 inline-block rounded-full bg-accent px-6 py-3 font-body text-sm font-medium text-surface hover:bg-accent-hover"
          >
            Get Your Quote
          </Link>
        </div>

        <div>
          <p className="font-body text-sm font-medium uppercase tracking-wide text-ink-secondary">Packages</p>
          <ul className="mt-3 space-y-2">
            {PACKAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="font-body text-sm text-ink hover:text-accent">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-body text-sm font-medium uppercase tracking-wide text-ink-secondary">Locations</p>
          <ul className="mt-3 space-y-2">
            {LOCATIONS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-body text-sm text-ink hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-body text-sm font-medium uppercase tracking-wide text-ink-secondary">Events</p>
          <ul className="mt-3 space-y-2">
            {EVENTS.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="font-body text-sm text-ink hover:text-accent">
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-4 border-t border-border-soft pt-8 md:flex-row md:items-center">
        <p className="font-body text-sm text-ink-secondary">Rated 5 Stars — 200+ GTA Events</p>
        <p className="font-body text-sm text-ink-secondary">
          © {new Date().getFullYear()} SIRF Event Productions · Brampton, ON
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run the test again**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- Footer
```

Expected: `3 passed`

- [ ] **Step 5: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add web/components/layout/Footer.tsx web/components/layout/Footer.test.tsx
git commit -m "Add Footer component with package/location/event internal-linking hub"
```

---

### Task 6: CTABand component (the CTA-cadence primitive)

**Files:**
- Create: `web/components/cta/CTABand.tsx`
- Test: `web/components/cta/CTABand.test.tsx`

**Interfaces:**
- Produces: `CTABand` component, default export, props `{ headline: string; ctaLabel?: string; ctaHref?: string }` — `ctaLabel` defaults to `"Get Your Quote"`, `ctaHref` defaults to `"/inquire"`. This is the reusable unit spec v2 §6 uses to close CTA-cadence gaps on every long page.

- [ ] **Step 1: Write the failing test**

Create `web/components/cta/CTABand.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CTABand from "./CTABand";

describe("CTABand", () => {
  it("renders the given headline", () => {
    render(<CTABand headline="Like what you see? Check your date." />);
    expect(screen.getByText("Like what you see? Check your date.")).toBeInTheDocument();
  });

  it("defaults to the standard CTA label and href", () => {
    render(<CTABand headline="Test headline" />);
    expect(screen.getByRole("link", { name: "Get Your Quote" })).toHaveAttribute("href", "/inquire");
  });

  it("accepts a custom CTA label and href", () => {
    render(
      <CTABand
        headline="Ready for the Legacy Signature?"
        ctaLabel="Inquire about Legacy Signature"
        ctaHref="/inquire?package=legacy-signature"
      />
    );
    expect(screen.getByRole("link", { name: "Inquire about Legacy Signature" })).toHaveAttribute(
      "href",
      "/inquire?package=legacy-signature"
    );
  });
});
```

- [ ] **Step 2: Run it, confirm it fails**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- CTABand
```

Expected: FAIL — `CTABand` module not found.

- [ ] **Step 3: Implement `CTABand`**

Create `web/components/cta/CTABand.tsx`:

```tsx
import Link from "next/link";

interface CTABandProps {
  headline: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function CTABand({
  headline,
  ctaLabel = "Get Your Quote",
  ctaHref = "/inquire",
}: CTABandProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 border-y border-border-soft bg-surface px-6 py-8 md:flex-row md:px-12">
      <p className="font-display text-xl text-ink">{headline}</p>
      <Link
        href={ctaHref}
        className="whitespace-nowrap rounded-full bg-accent px-6 py-3 font-body text-sm font-medium text-surface transition-colors hover:bg-accent-hover"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
```

- [ ] **Step 4: Run the test again**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- CTABand
```

Expected: `3 passed`

- [ ] **Step 5: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add web/components/cta/CTABand.tsx web/components/cta/CTABand.test.tsx
git commit -m "Add CTABand component — the CTA-cadence primitive for long pages"
```

---

### Task 7: Card component (packages/inventory/gallery grids)

**Files:**
- Create: `web/components/cards/Card.tsx`
- Test: `web/components/cards/Card.test.tsx`

**Interfaces:**
- Produces: `Card` component, default export, props `{ title: string; subtitle?: string; href: string; imageAlt: string }`. Phase 2 package/inventory/gallery pages compose this with real images.

- [ ] **Step 1: Write the failing test**

Create `web/components/cards/Card.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "./Card";

describe("Card", () => {
  it("renders title, subtitle, and a link wrapping the whole card", () => {
    render(
      <Card
        title="High Peak 60"
        subtitle="For 60 guests · From $800"
        href="/packages/high-peak-60"
        imageAlt="High Peak tent setup for 60 guests"
      />
    );
    expect(screen.getByText("High Peak 60")).toBeInTheDocument();
    expect(screen.getByText("For 60 guests · From $800")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/packages/high-peak-60");
  });

  it("renders without a subtitle", () => {
    render(<Card title="Inventory" href="/inventory" imageAlt="Tent inventory" />);
    expect(screen.getByText("Inventory")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, confirm it fails**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- Card
```

Expected: FAIL — `Card` module not found.

- [ ] **Step 3: Implement `Card`**

Create `web/components/cards/Card.tsx`:

```tsx
import Link from "next/link";

interface CardProps {
  title: string;
  subtitle?: string;
  href: string;
  imageAlt: string;
}

export default function Card({ title, subtitle, href, imageAlt }: CardProps) {
  return (
    <Link
      href={href}
      className="block overflow-hidden rounded border border-border-soft bg-surface transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[4/5] bg-bg-alt" role="img" aria-label={imageAlt} />
      <div className="p-6">
        <p className="font-display text-lg">{title}</p>
        {subtitle && <p className="mt-1 font-body text-sm text-ink-secondary">{subtitle}</p>}
      </div>
    </Link>
  );
}
```

*(The `aspect-[4/5] bg-bg-alt` div is a placeholder image slot — Phase 2 replaces it with `next/image` once real processed photos exist from Phase 3's asset pipeline.)*

- [ ] **Step 4: Run the test again**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- Card
```

Expected: `2 passed`

- [ ] **Step 5: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add web/components/cards/Card.tsx web/components/cards/Card.test.tsx
git commit -m "Add Card component for packages/inventory/gallery grids"
```

---

### Task 8: Pipeline routing logic (pure function, TDD-friendly)

**Files:**
- Create: `web/lib/pipeline-routing.ts`
- Test: `web/lib/pipeline-routing.test.ts`

**Interfaces:**
- Produces: `routeToPipeline(guestCountBracket: GuestCountBracket, eventType: EventType): "pipeline-a" | "pipeline-b"` and the `GuestCountBracket` / `EventType` union types, which Task 9 and Task 12 both import.

- [ ] **Step 1: Write the failing tests**

Create `web/lib/pipeline-routing.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { routeToPipeline } from "./pipeline-routing";

describe("routeToPipeline", () => {
  it("routes 40-60 guests to Pipeline B regardless of event type", () => {
    expect(routeToPipeline("40-60", "wedding")).toBe("pipeline-b");
  });

  it("routes 60-80 guests to Pipeline B", () => {
    expect(routeToPipeline("60-80", "wedding")).toBe("pipeline-b");
  });

  it("routes 80-100 guests to Pipeline B only for birthday-anniversary-milestones", () => {
    expect(routeToPipeline("80-100", "birthday-anniversary-milestones")).toBe("pipeline-b");
  });

  it("routes 80-100 guests to Pipeline A for weddings", () => {
    expect(routeToPipeline("80-100", "wedding")).toBe("pipeline-a");
  });

  it("routes 100-130, 130-150, and 150+ to Pipeline A", () => {
    expect(routeToPipeline("100-130", "wedding")).toBe("pipeline-a");
    expect(routeToPipeline("130-150", "wedding")).toBe("pipeline-a");
    expect(routeToPipeline("150+", "corporate")).toBe("pipeline-a");
  });
});
```

- [ ] **Step 2: Run it, confirm it fails**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- pipeline-routing
```

Expected: FAIL — `pipeline-routing` module not found.

- [ ] **Step 3: Implement `routeToPipeline`**

Create `web/lib/pipeline-routing.ts`:

```typescript
export type GuestCountBracket = "40-60" | "60-80" | "80-100" | "100-130" | "130-150" | "150+";

export type EventType =
  | "wedding"
  | "reception-engagement"
  | "corporate"
  | "birthday-anniversary-milestones";

export type Pipeline = "pipeline-a" | "pipeline-b";

/**
 * Guest brackets 40-60 and 60-80 are always Pipeline B (High Peak).
 * 80-100 is Pipeline B only for milestone events; everything else at
 * 80-100+ is Pipeline A (Legacy + Premium). Spec v1 §9.6.
 */
export function routeToPipeline(bracket: GuestCountBracket, eventType: EventType): Pipeline {
  if (bracket === "40-60" || bracket === "60-80") {
    return "pipeline-b";
  }
  if (bracket === "80-100" && eventType === "birthday-anniversary-milestones") {
    return "pipeline-b";
  }
  return "pipeline-a";
}
```

- [ ] **Step 4: Run the tests again**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- pipeline-routing
```

Expected: `6 passed`

- [ ] **Step 5: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add web/lib/pipeline-routing.ts web/lib/pipeline-routing.test.ts
git commit -m "Add pipeline routing logic — guest bracket to Pipeline A/B per spec v1 §9.6"
```

---

### Task 9: HubSpot client wrapper (contact upsert + deal creation)

**Files:**
- Create: `web/lib/hubspot.ts`
- Test: `web/lib/hubspot.test.ts`
- Modify: `web/.env.local.example`

**Interfaces:**
- Consumes: `Pipeline` type from Task 8 (`./pipeline-routing`)
- Produces: `upsertContactAndCreateDeal(input: InquiryPayload): Promise<{ contactId: string; dealId: string }>` and the `InquiryPayload` type, which Task 10's API route imports and calls directly

API shape verified via Context7 (`/hubspot/hubspot-api-nodejs`, queried 2026-09-16): `client.crm.contacts.basicApi.create/update/getById`, `client.crm.deals.basicApi.create` with an `associations` array using `AssociationSpecAssociationCategoryEnum.HubspotDefined` and `AssociationTypes.dealToContact`.

- [ ] **Step 1: Install the SDK**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm install @hubspot/api-client
```

- [ ] **Step 2: Add the required env var to the example file**

Create `web/.env.local.example`:

```
# HubSpot Private App token — Settings > Integrations > Private Apps in HubSpot.
# Needs scopes: crm.objects.contacts.write, crm.objects.deals.write, crm.objects.contacts.read
HUBSPOT_PRIVATE_APP_TOKEN=
```

- [ ] **Step 3: Write the failing test (mocking the HubSpot SDK)**

Create `web/lib/hubspot.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockGetById = vi.fn();
const mockCreateContact = vi.fn();
const mockUpdateContact = vi.fn();
const mockCreateDeal = vi.fn();

vi.mock("@hubspot/api-client", () => {
  return {
    Client: vi.fn().mockImplementation(() => ({
      crm: {
        contacts: {
          basicApi: {
            getById: mockGetById,
            create: mockCreateContact,
            update: mockUpdateContact,
          },
        },
        deals: {
          basicApi: {
            create: mockCreateDeal,
          },
        },
      },
    })),
  };
});

import { upsertContactAndCreateDeal } from "./hubspot";

const basePayload = {
  firstName: "Priya",
  lastName: "Sharma",
  email: "priya@example.com",
  phone: "+14165551234",
  eventType: "wedding" as const,
  guestCountBracket: "150+" as const,
  urgencyBracket: "ASAP — 1-2 weeks" as const,
  eventDateRaw: "June 2027",
  eventCity: "Brampton",
  servicesInterested: ["Tent", "Tent draping"],
  packageInterest: "Legacy Signature",
  eventDescription: "Outdoor wedding for 180 guests",
  formVariant: "homepage",
  leadSource: "website-organic" as const,
};

describe("upsertContactAndCreateDeal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a new contact when none exists, then creates an associated deal in Pipeline A", async () => {
    mockGetById.mockRejectedValueOnce({ code: 404 });
    mockCreateContact.mockResolvedValueOnce({ id: "contact-123" });
    mockCreateDeal.mockResolvedValueOnce({ id: "deal-456" });

    const result = await upsertContactAndCreateDeal(basePayload);

    expect(mockCreateContact).toHaveBeenCalledWith({
      properties: expect.objectContaining({
        email: "priya@example.com",
        firstname: "Priya",
        lastname: "Sharma",
        phone: "+14165551234",
        event_type: "wedding",
        guest_count_bracket: "150+",
      }),
    });

    expect(mockCreateDeal).toHaveBeenCalledWith(
      expect.objectContaining({
        properties: expect.objectContaining({
          pipeline: "pipeline-a",
          dealstage: "new-lead",
        }),
        associations: [
          expect.objectContaining({
            to: { id: "contact-123" },
          }),
        ],
      })
    );

    expect(result).toEqual({ contactId: "contact-123", dealId: "deal-456" });
  });

  it("updates the existing contact when one is found by email", async () => {
    mockGetById.mockResolvedValueOnce({ id: "contact-existing" });
    mockUpdateContact.mockResolvedValueOnce({ id: "contact-existing" });
    mockCreateDeal.mockResolvedValueOnce({ id: "deal-789" });

    const result = await upsertContactAndCreateDeal(basePayload);

    expect(mockCreateContact).not.toHaveBeenCalled();
    expect(mockUpdateContact).toHaveBeenCalledWith(
      "contact-existing",
      expect.objectContaining({ properties: expect.any(Object) })
    );
    expect(result.contactId).toBe("contact-existing");
  });

  it("routes 40-60 guest brackets to Pipeline B", async () => {
    mockGetById.mockRejectedValueOnce({ code: 404 });
    mockCreateContact.mockResolvedValueOnce({ id: "contact-123" });
    mockCreateDeal.mockResolvedValueOnce({ id: "deal-456" });

    await upsertContactAndCreateDeal({ ...basePayload, guestCountBracket: "40-60" });

    expect(mockCreateDeal).toHaveBeenCalledWith(
      expect.objectContaining({
        properties: expect.objectContaining({ pipeline: "pipeline-b" }),
      })
    );
  });
});
```

- [ ] **Step 4: Run it, confirm it fails**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- lib/hubspot
```

Expected: FAIL — `hubspot` module not found.

- [ ] **Step 5: Implement `hubspot.ts`**

Create `web/lib/hubspot.ts`:

```typescript
import { Client } from "@hubspot/api-client";
import { routeToPipeline, type GuestCountBracket, type EventType } from "./pipeline-routing";

export interface InquiryPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventType: EventType;
  guestCountBracket: GuestCountBracket;
  urgencyBracket: string;
  eventDateRaw: string;
  eventCity: string;
  servicesInterested: string[];
  packageInterest: string;
  eventDescription: string;
  formVariant: string;
  leadSource: "website-organic" | "website-paid-google";
}

function getClient() {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    throw new Error("HUBSPOT_PRIVATE_APP_TOKEN is not set");
  }
  return new Client({ accessToken: token });
}

function contactProperties(input: InquiryPayload) {
  return {
    email: input.email,
    firstname: input.firstName,
    lastname: input.lastName,
    phone: input.phone,
    event_type: input.eventType,
    guest_count_bracket: input.guestCountBracket,
    urgency_bracket: input.urgencyBracket,
    event_date_raw: input.eventDateRaw,
    event_city: input.eventCity,
    services_interested: input.servicesInterested.join(";"),
    package_interest: input.packageInterest,
    event_description: input.eventDescription,
    form_variant: input.formVariant,
    lead_source: input.leadSource,
  };
}

async function upsertContact(client: Client, input: InquiryPayload): Promise<string> {
  try {
    const existing = await client.crm.contacts.basicApi.getById(input.email, {
      idProperty: "email",
    } as never);
    await client.crm.contacts.basicApi.update(existing.id, {
      properties: contactProperties(input),
    });
    return existing.id;
  } catch {
    const created = await client.crm.contacts.basicApi.create({
      properties: contactProperties(input),
    });
    return created.id;
  }
}

export async function upsertContactAndCreateDeal(
  input: InquiryPayload
): Promise<{ contactId: string; dealId: string }> {
  const client = getClient();
  const contactId = await upsertContact(client, input);
  const pipeline = routeToPipeline(input.guestCountBracket, input.eventType);

  const deal = await client.crm.deals.basicApi.create({
    properties: {
      dealname: `${input.firstName} ${input.lastName} — ${input.eventType}`,
      pipeline,
      dealstage: "new-lead",
      lead_source: input.leadSource,
      form_variant: input.formVariant,
      event_date_raw: input.eventDateRaw,
      event_city: input.eventCity,
    },
    associations: [
      {
        to: { id: contactId },
        types: [
          {
            associationCategory: "HUBSPOT_DEFINED" as never,
            associationTypeId: 3, // dealToContact
          },
        ],
      },
    ],
  });

  return { contactId, dealId: deal.id };
}
```

- [ ] **Step 6: Run the tests again**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- lib/hubspot
```

Expected: `3 passed`

**Note for later phases:** the exact `dealstage` and `pipeline` internal IDs (`"pipeline-a"` / `"new-lead"`) here are placeholders matching the *names* in spec v1 §9.6 — before Phase 2 goes live, replace them with the real HubSpot-generated pipeline/stage IDs once Pipeline A and Pipeline B are actually created in the HubSpot UI (spec v1 §12.2 pre-launch checklist item).

- [ ] **Step 7: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add web/lib/hubspot.ts web/lib/hubspot.test.ts web/.env.local.example web/package.json web/package-lock.json
git commit -m "Add HubSpot client wrapper — upsert contact by email, create deal with pipeline routing"
```

---

### Task 10: Form validation logic

**Files:**
- Create: `web/components/forms/validation.ts`
- Test: `web/components/forms/validation.test.ts`

**Interfaces:**
- Consumes: `GuestCountBracket`, `EventType` from `@/lib/pipeline-routing`
- Produces: `inquirySchema` (a Zod schema), `validateInquiry(data: unknown): { success: true; data: InquiryFormData } | { success: false; errors: Record<string, string> }`, and the `InquiryFormData` type Task 11 and Task 12 both import

- [ ] **Step 1: Install zod**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm install zod
```

- [ ] **Step 2: Write the failing tests**

Create `web/components/forms/validation.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { validateInquiry } from "./validation";

const validData = {
  eventType: "wedding",
  guestCountBracket: "150+",
  urgencyBracket: "ASAP — 1-2 weeks",
  eventDateRaw: "June 2027",
  eventCity: "Brampton",
  servicesInterested: ["Tent"],
  packageInterest: "Legacy Signature",
  eventDescription: "",
  firstName: "Priya",
  lastName: "Sharma",
  email: "priya@example.com",
  phone: "+14165551234",
};

describe("validateInquiry", () => {
  it("accepts fully valid data", () => {
    const result = validateInquiry(validData);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = validateInquiry({ ...validData, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.email).toBeDefined();
    }
  });

  it("rejects a phone number not in E.164 format", () => {
    const result = validateInquiry({ ...validData, phone: "416-555-1234" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.phone).toBeDefined();
    }
  });

  it("rejects an empty servicesInterested array", () => {
    const result = validateInquiry({ ...validData, servicesInterested: [] });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.servicesInterested).toBeDefined();
    }
  });

  it("rejects a guestCountBracket outside the real SKU brackets", () => {
    const result = validateInquiry({ ...validData, guestCountBracket: "200-300" });
    expect(result.success).toBe(false);
  });

  it("rejects missing firstName", () => {
    const result = validateInquiry({ ...validData, firstName: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.firstName).toBeDefined();
    }
  });
});
```

- [ ] **Step 3: Run it, confirm it fails**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- forms/validation
```

Expected: FAIL — `validation` module not found.

- [ ] **Step 4: Implement `validation.ts`**

Create `web/components/forms/validation.ts`:

```typescript
import { z } from "zod";

const GUEST_COUNT_BRACKETS = ["40-60", "60-80", "80-100", "100-130", "130-150", "150+"] as const;
const EVENT_TYPES = [
  "wedding",
  "reception-engagement",
  "corporate",
  "birthday-anniversary-milestones",
] as const;
const SERVICES = [
  "Tent",
  "Tables & chairs",
  "Tent draping",
  "Fairy lights & lighting",
  "Flooring & floor wrap",
  "All-in-one package",
] as const;

// E.164: + followed by 8-15 digits, first digit 1-9
const E164_REGEX = /^\+[1-9]\d{7,14}$/;

export const inquirySchema = z.object({
  eventType: z.enum(EVENT_TYPES),
  guestCountBracket: z.enum(GUEST_COUNT_BRACKETS),
  urgencyBracket: z.enum([
    "ASAP — 1-2 weeks",
    "Within next month",
    "2-3 months",
    "Just exploring",
  ]),
  eventDateRaw: z.string().min(1, "Event date is required"),
  eventCity: z.string().min(1, "City is required"),
  servicesInterested: z.array(z.enum(SERVICES)).min(1, "Select at least one service"),
  packageInterest: z.string(),
  eventDescription: z.string(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(E164_REGEX, "Phone must be in E.164 format, e.g. +14165551234"),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export function validateInquiry(
  data: unknown
): { success: true; data: InquiryFormData } | { success: false; errors: Record<string, string> } {
  const result = inquirySchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0]?.toString() ?? "form";
    errors[key] = issue.message;
  }
  return { success: false, errors };
}
```

- [ ] **Step 5: Run the tests again**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- forms/validation
```

Expected: `6 passed`

- [ ] **Step 6: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add web/components/forms/validation.ts web/components/forms/validation.test.ts web/package.json web/package-lock.json
git commit -m "Add Zod inquiry form validation — E.164 phone, real SKU brackets, no empty services"
```

---

### Task 11: `/api/inquire` route handler

**Files:**
- Create: `web/app/api/inquire/route.ts`
- Test: `web/app/api/inquire/route.test.ts`

**Interfaces:**
- Consumes: `validateInquiry` from `@/components/forms/validation`, `upsertContactAndCreateDeal` from `@/lib/hubspot`
- Produces: `POST` handler at `/api/inquire` returning `{ ok: true, dealId: string }` on success (200) or `{ ok: false, errors: Record<string,string> }` on validation failure (400)

- [ ] **Step 1: Write the failing test**

Create `web/app/api/inquire/route.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockUpsert = vi.fn();
vi.mock("@/lib/hubspot", () => ({
  upsertContactAndCreateDeal: mockUpsert,
}));

import { POST } from "./route";

const validBody = {
  eventType: "wedding",
  guestCountBracket: "150+",
  urgencyBracket: "ASAP — 1-2 weeks",
  eventDateRaw: "June 2027",
  eventCity: "Brampton",
  servicesInterested: ["Tent"],
  packageInterest: "Legacy Signature",
  eventDescription: "",
  firstName: "Priya",
  lastName: "Sharma",
  email: "priya@example.com",
  phone: "+14165551234",
  formVariant: "homepage",
  leadSource: "website-organic",
};

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/inquire", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/inquire", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 and the deal ID on valid submission", async () => {
    mockUpsert.mockResolvedValueOnce({ contactId: "c1", dealId: "d1" });

    const response = await POST(makeRequest(validBody));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({ ok: true, dealId: "d1" });
    expect(mockUpsert).toHaveBeenCalledWith(expect.objectContaining({ email: "priya@example.com" }));
  });

  it("returns 400 with field errors on invalid submission", async () => {
    const response = await POST(makeRequest({ ...validBody, email: "not-an-email" }));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.ok).toBe(false);
    expect(json.errors.email).toBeDefined();
    expect(mockUpsert).not.toHaveBeenCalled();
  });

  it("returns 500 if HubSpot throws", async () => {
    mockUpsert.mockRejectedValueOnce(new Error("HubSpot down"));

    const response = await POST(makeRequest(validBody));
    expect(response.status).toBe(500);
  });
});
```

- [ ] **Step 2: Run it, confirm it fails**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- api/inquire
```

Expected: FAIL — `route` module not found.

- [ ] **Step 3: Implement the route handler**

Create `web/app/api/inquire/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { validateInquiry } from "@/components/forms/validation";
import { upsertContactAndCreateDeal } from "@/lib/hubspot";

export async function POST(request: Request) {
  const body = await request.json();
  const validation = validateInquiry(body);

  if (!validation.success) {
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
  }

  try {
    const { data } = validation;
    const { dealId } = await upsertContactAndCreateDeal({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      eventType: data.eventType,
      guestCountBracket: data.guestCountBracket,
      urgencyBracket: data.urgencyBracket,
      eventDateRaw: data.eventDateRaw,
      eventCity: data.eventCity,
      servicesInterested: data.servicesInterested,
      packageInterest: data.packageInterest,
      eventDescription: data.eventDescription,
      formVariant: (body as { formVariant?: string }).formVariant ?? "unknown",
      leadSource: (body as { leadSource?: "website-organic" | "website-paid-google" }).leadSource ?? "website-organic",
    });

    return NextResponse.json({ ok: true, dealId });
  } catch (error) {
    console.error("Failed to create HubSpot contact/deal:", error);
    return NextResponse.json({ ok: false, errors: { form: "Something went wrong. Please try again." } }, { status: 500 });
  }
}
```

- [ ] **Step 4: Run the tests again**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- api/inquire
```

Expected: `3 passed`

- [ ] **Step 5: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add web/app/api/inquire/route.ts web/app/api/inquire/route.test.ts
git commit -m "Add /api/inquire route handler — validates then creates HubSpot contact+deal"
```

---

### Task 12: InquiryForm component (multi-step, spec v1 §9.1)

**Files:**
- Create: `web/components/forms/InquiryForm.tsx`
- Test: `web/components/forms/InquiryForm.test.tsx`

**Interfaces:**
- Consumes: `validateInquiry` from `./validation`
- Produces: `InquiryForm` component, default export, props `{ prefill?: Partial<InquiryFormData> }`. POSTs to `/api/inquire` on final submit.

- [ ] **Step 1: Write the failing tests**

Create `web/components/forms/InquiryForm.test.tsx`:

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import InquiryForm from "./InquiryForm";

describe("InquiryForm", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, dealId: "d1" }),
    }) as unknown as typeof fetch;
  });

  it("starts on step 1 and requires an event type before continuing", async () => {
    const user = userEvent.setup();
    render(<InquiryForm />);

    expect(screen.getByText(/tell us about your event/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /continue/i }));
    // still on step 1 — event type wasn't selected
    expect(screen.getByText(/tell us about your event/i)).toBeInTheDocument();
  });

  it("advances through all 4 steps and submits", async () => {
    const user = userEvent.setup();
    render(<InquiryForm />);

    // Step 1
    await user.click(screen.getByLabelText("Wedding"));
    await user.click(screen.getByLabelText("150+"));
    await user.click(screen.getByRole("button", { name: /continue/i }));

    // Step 2
    expect(screen.getByText(/when and where/i)).toBeInTheDocument();
    await user.click(screen.getByLabelText("ASAP — 1-2 weeks"));
    await user.type(screen.getByLabelText(/event date/i), "June 2027");
    await user.type(screen.getByLabelText(/city/i), "Brampton");
    await user.click(screen.getByRole("button", { name: /continue/i }));

    // Step 3
    expect(screen.getByText(/what are you picturing/i)).toBeInTheDocument();
    await user.click(screen.getByLabelText("Tent"));
    await user.click(screen.getByRole("button", { name: /continue/i }));

    // Step 4
    expect(screen.getByText(/how do we reach you/i)).toBeInTheDocument();
    await user.type(screen.getByLabelText(/full name/i), "Priya Sharma");
    await user.type(screen.getByLabelText(/^email/i), "priya@example.com");
    await user.type(screen.getByLabelText(/phone/i), "+14165551234");
    await user.click(screen.getByRole("button", { name: /send my inquiry/i }));

    await waitFor(() => {
      expect(screen.getByText(/thanks/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/inquire",
      expect.objectContaining({ method: "POST" })
    );
  });
});
```

- [ ] **Step 2: Run it, confirm it fails**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- forms/InquiryForm
```

Expected: FAIL — `InquiryForm` module not found.

- [ ] **Step 3: Implement `InquiryForm`**

Create `web/components/forms/InquiryForm.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { InquiryFormData } from "./validation";

type FormState = Partial<InquiryFormData> & { servicesInterested?: string[] };

const EVENT_TYPES = [
  { value: "wedding", label: "Wedding" },
  { value: "reception-engagement", label: "Reception / Engagement" },
  { value: "corporate", label: "Corporate" },
  { value: "birthday-anniversary-milestones", label: "Birthday / Anniversary / Milestone" },
] as const;

const GUEST_BRACKETS = ["40-60", "60-80", "80-100", "100-130", "130-150", "150+"] as const;

const URGENCY_OPTIONS = [
  "ASAP — 1-2 weeks",
  "Within next month",
  "2-3 months",
  "Just exploring",
] as const;

const SERVICE_OPTIONS = [
  "Tent",
  "Tables & chairs",
  "Tent draping",
  "Fairy lights & lighting",
  "Flooring & floor wrap",
  "All-in-one package",
] as const;

interface InquiryFormProps {
  prefill?: FormState;
}

export default function InquiryForm({ prefill = {} }: InquiryFormProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<FormState>({
    servicesInterested: [],
    eventDescription: "",
    ...prefill,
  });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleService(service: string) {
    setForm((f) => {
      const current = f.servicesInterested ?? [];
      const next = current.includes(service)
        ? current.filter((s) => s !== service)
        : [...current, service];
      return { ...f, servicesInterested: next };
    });
  }

  function canContinueFromStep1() {
    return Boolean(form.eventType && form.guestCountBracket);
  }

  function canContinueFromStep2() {
    return Boolean(form.urgencyBracket && form.eventDateRaw && form.eventCity);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch("/api/inquire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, formVariant: "homepage", leadSource: "website-organic" }),
    });
    const json = await response.json();
    if (json.ok) {
      setSubmitted(true);
    } else {
      setErrors(json.errors ?? {});
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <p className="font-display text-2xl">Thanks — we&apos;ll be in touch within the hour.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-8 py-16">
      {step === 1 && (
        <fieldset className="space-y-6">
          <legend className="font-display text-2xl">Tell us about your event</legend>
          <div>
            <p className="font-body text-sm font-medium">What type of event are you planning?</p>
            <div className="mt-2 space-y-2">
              {EVENT_TYPES.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="eventType"
                    checked={form.eventType === opt.value}
                    onChange={() => update("eventType", opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="font-body text-sm font-medium">How many guests are you expecting?</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {GUEST_BRACKETS.map((bracket) => (
                <label key={bracket} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="guestCountBracket"
                    checked={form.guestCountBracket === bracket}
                    onChange={() => update("guestCountBracket", bracket)}
                  />
                  {bracket}
                </label>
              ))}
            </div>
          </div>
          <button
            type="button"
            disabled={!canContinueFromStep1()}
            onClick={() => setStep(2)}
            className="rounded-full bg-accent px-6 py-3 font-body text-sm font-medium text-surface disabled:opacity-40"
          >
            Continue →
          </button>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="space-y-6">
          <legend className="font-display text-2xl">When and where?</legend>
          <div>
            <p className="font-body text-sm font-medium">When are you looking to finalize?</p>
            <div className="mt-2 space-y-2">
              {URGENCY_OPTIONS.map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="urgencyBracket"
                    checked={form.urgencyBracket === opt}
                    onChange={() => update("urgencyBracket", opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <label className="block">
            <span className="font-body text-sm font-medium">Event date</span>
            <input
              type="text"
              value={form.eventDateRaw ?? ""}
              onChange={(e) => update("eventDateRaw", e.target.value)}
              className="mt-1 w-full rounded border border-border-soft px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="font-body text-sm font-medium">City</span>
            <input
              type="text"
              value={form.eventCity ?? ""}
              onChange={(e) => update("eventCity", e.target.value)}
              className="mt-1 w-full rounded border border-border-soft px-3 py-2"
            />
          </label>
          <button
            type="button"
            disabled={!canContinueFromStep2()}
            onClick={() => setStep(3)}
            className="rounded-full bg-accent px-6 py-3 font-body text-sm font-medium text-surface disabled:opacity-40"
          >
            Continue →
          </button>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="space-y-6">
          <legend className="font-display text-2xl">What are you picturing?</legend>
          <div>
            <p className="font-body text-sm font-medium">What services interest you?</p>
            <div className="mt-2 space-y-2">
              {SERVICE_OPTIONS.map((service) => (
                <label key={service} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={(form.servicesInterested ?? []).includes(service)}
                    onChange={() => toggleService(service)}
                  />
                  {service}
                </label>
              ))}
            </div>
          </div>
          <label className="block">
            <span className="font-body text-sm font-medium">Tell us about your event</span>
            <textarea
              value={form.eventDescription ?? ""}
              onChange={(e) => update("eventDescription", e.target.value)}
              rows={5}
              className="mt-1 w-full rounded border border-border-soft px-3 py-2"
            />
          </label>
          <button
            type="button"
            onClick={() => setStep(4)}
            className="rounded-full bg-accent px-6 py-3 font-body text-sm font-medium text-surface"
          >
            Continue →
          </button>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset className="space-y-6">
          <legend className="font-display text-2xl">How do we reach you?</legend>
          <label className="block">
            <span className="font-body text-sm font-medium">Full name</span>
            <input
              type="text"
              onChange={(e) => {
                const [first, ...rest] = e.target.value.split(" ");
                update("firstName", first);
                update("lastName", rest.join(" "));
              }}
              className="mt-1 w-full rounded border border-border-soft px-3 py-2"
            />
          </label>
          <label className="block">
            <span className="font-body text-sm font-medium">Email</span>
            <input
              type="email"
              value={form.email ?? ""}
              onChange={(e) => update("email", e.target.value)}
              className="mt-1 w-full rounded border border-border-soft px-3 py-2"
            />
            {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
          </label>
          <label className="block">
            <span className="font-body text-sm font-medium">Phone</span>
            <input
              type="tel"
              value={form.phone ?? ""}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+14165551234"
              className="mt-1 w-full rounded border border-border-soft px-3 py-2"
            />
            {errors.phone && <p className="mt-1 text-sm text-error">{errors.phone}</p>}
          </label>
          <button
            type="submit"
            className="rounded-full bg-accent px-6 py-3 font-body text-sm font-medium text-surface"
          >
            Send My Inquiry →
          </button>
          <p className="font-body text-xs text-ink-secondary">
            We&apos;ll reply within the hour. By submitting, you agree to receive an email and a text
            from SIRF Event Productions.
          </p>
        </fieldset>
      )}
    </form>
  );
}
```

- [ ] **Step 4: Run the tests again**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm install -D @testing-library/user-event
npm test -- forms/InquiryForm
```

Expected: `2 passed`

- [ ] **Step 5: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add web/components/forms/InquiryForm.tsx web/components/forms/InquiryForm.test.tsx web/package.json web/package-lock.json
git commit -m "Add 4-step InquiryForm component per spec v1 §9.1"
```

---

### Task 13: 3D hero — TentScene + Hero3D wrapper

**Files:**
- Create: `web/components/hero/TentScene.tsx`
- Create: `web/components/hero/Hero3D.tsx`
- Test: `web/components/hero/Hero3D.test.tsx`

**Interfaces:**
- Produces: `Hero3D` component, default export, no props — the only component Phase 2's homepage imports for the hero. `TentScene` is an internal implementation detail (not imported outside `hero/`).

**Design note (spec v2 §5):** the tent assembles (poles rise, canopy scales in, ridge lights ignite in sequence), then rotates slowly. Poster-first, canvas hydrates after, respects `prefers-reduced-motion`.

- [ ] **Step 1: Install 3D dependencies**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

- [ ] **Step 2: Write the failing test for `Hero3D`'s fallback behavior**

3D rendering itself isn't meaningfully unit-testable (no WebGL context in jsdom) — this test covers the part that matters for correctness: the reduced-motion fallback and the poster-first render, which is real, testable logic.

Create `web/components/hero/Hero3D.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import Hero3D from "./Hero3D";

vi.mock("./TentScene", () => ({
  default: () => <div data-testid="tent-scene" />,
}));

function mockReducedMotion(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)" ? matches : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

describe("Hero3D", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("always renders the poster image immediately", () => {
    mockReducedMotion(false);
    render(<Hero3D />);
    expect(screen.getByAltText(/sirf event productions tent/i)).toBeInTheDocument();
  });

  it("does not render the 3D canvas when the user prefers reduced motion", () => {
    mockReducedMotion(true);
    render(<Hero3D />);
    expect(screen.queryByTestId("tent-scene")).not.toBeInTheDocument();
  });

  it("renders the 3D canvas when motion is not reduced", () => {
    mockReducedMotion(false);
    render(<Hero3D />);
    expect(screen.getByTestId("tent-scene")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run it, confirm it fails**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- Hero3D
```

Expected: FAIL — `Hero3D` module not found.

- [ ] **Step 4: Implement `TentScene`**

Create `web/components/hero/TentScene.tsx`:

```tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = "#4C583E";
const CANOPY = "#F6F4EE";

function Tent() {
  const groupRef = useRef<THREE.Group>(null);
  const canopyRef = useRef<THREE.Mesh>(null);
  const poleRefs = useRef<THREE.Mesh[]>([]);
  const lightRefs = useRef<THREE.PointLight[]>([]);
  const startTime = useRef<number | null>(null);

  const polePositions = useMemo(
    () => [
      [-1.4, 0, -1.4],
      [1.4, 0, -1.4],
      [-1.4, 0, 1.4],
      [1.4, 0, 1.4],
    ] as const,
    []
  );

  useFrame((state) => {
    if (startTime.current === null) startTime.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startTime.current;

    // Phase 1 (0-1.2s): poles rise from the ground
    const poleProgress = Math.min(elapsed / 1.2, 1);
    poleRefs.current.forEach((pole) => {
      if (pole) pole.scale.y = poleProgress;
    });

    // Phase 2 (1.0-2.2s): canopy scales in
    const canopyProgress = Math.min(Math.max((elapsed - 1.0) / 1.2, 0), 1);
    if (canopyRef.current) {
      canopyRef.current.scale.setScalar(canopyProgress);
    }

    // Phase 3 (2.0-3.2s): ridge lights ignite one by one
    lightRefs.current.forEach((light, i) => {
      if (!light) return;
      const igniteAt = 2.0 + i * 0.3;
      light.intensity = elapsed > igniteAt ? 1.5 : 0;
    });

    // Phase 4 (after 3.2s): slow continuous rotation
    if (groupRef.current && elapsed > 3.2) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      {polePositions.map((pos, i) => (
        <mesh
          key={i}
          position={[pos[0], 1, pos[2]]}
          ref={(el) => {
            if (el) poleRefs.current[i] = el;
          }}
        >
          <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
          <meshStandardMaterial color={ACCENT} />
        </mesh>
      ))}

      <mesh ref={canopyRef} position={[0, 2, 0]}>
        <coneGeometry args={[2.2, 1.4, 4]} />
        <meshStandardMaterial color={CANOPY} side={THREE.DoubleSide} />
      </mesh>

      {[0, 1, 2, 3, 4].map((i) => (
        <pointLight
          key={i}
          ref={(el) => {
            if (el) lightRefs.current[i] = el;
          }}
          position={[-1.5 + i * 0.75, 2.4, 0]}
          color="#F2C94C"
          intensity={0}
          distance={2}
        />
      ))}
    </group>
  );
}

export default function TentScene() {
  return (
    <Canvas camera={{ position: [4, 3, 4], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <Tent />
    </Canvas>
  );
}
```

- [ ] **Step 5: Implement `Hero3D`**

Create `web/components/hero/Hero3D.tsx`:

```tsx
"use client";

import { useEffect, useState, lazy, Suspense } from "react";

const TentScene = lazy(() => import("./TentScene"));

export default function Hero3D() {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    // Defer mounting the 3D canvas until after first paint so the poster
    // image is what counts toward LCP, per spec v2 §5.2.
    const id = requestAnimationFrame(() => setShowCanvas(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-ink">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/hero-poster.jpg"
        alt="SIRF Event Productions tent setup at dusk"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {showCanvas && (
        <Suspense fallback={null}>
          <div className="absolute inset-0">
            <TentScene />
          </div>
        </Suspense>
      )}
    </div>
  );
}
```

*(`/media/hero-poster.jpg` doesn't exist yet — Task 14 adds a placeholder so the build doesn't 404; Phase 3's asset pipeline replaces it with a real graded frame from the `Pictures of Setups/3/Pictures/Pics/` stills.)*

- [ ] **Step 6: Run the tests again**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test -- Hero3D
```

Expected: `3 passed`

- [ ] **Step 7: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add web/components/hero/ web/package.json web/package-lock.json
git commit -m "Add 3D hero — tent assembly animation, poster-first, reduced-motion fallback"
```

---

### Task 14: Placeholder home page + poster placeholder image

**Files:**
- Modify: `web/app/page.tsx`
- Create: `web/public/media/hero-poster.jpg` (placeholder — see step 1)

**Interfaces:**
- Consumes: `Header`, `Hero3D`, `CTABand`, `Footer`
- Produces: the `/` route, proving the whole Phase 1 stack renders together

- [ ] **Step 1: Generate a placeholder poster image**

Real graded stills come from Phase 3. For now, generate a solid-color placeholder at the right aspect ratio so nothing 404s:

```bash
mkdir -p "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web/public/media"
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web/public/media"
# Requires ImageMagick (brew install imagemagick if not present)
convert -size 1920x1080 xc:'#20241D' hero-poster.jpg
```

If ImageMagick isn't available, any 1920×1080 JPG placed at this path works — the exact pixels don't matter for Phase 1.

- [ ] **Step 2: Build the placeholder home page**

Replace `web/app/page.tsx` with:

```tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero3D from "@/components/hero/Hero3D";
import CTABand from "@/components/cta/CTABand";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero3D />
        <CTABand headline="Like what you see? Check your date." />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify the full page builds and renders**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm run build
npm run start &
sleep 3
curl -s http://localhost:3000 | grep -o "SIRF Event Productions" | head -1
kill %1
```

Expected: build succeeds, and `SIRF Event Productions` appears in the output.

- [ ] **Step 4: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add web/app/page.tsx web/public/media/hero-poster.jpg
git commit -m "Wire Header + 3D hero + CTABand + Footer into the Phase 1 placeholder home page"
```

---

### Task 15: Environment variables + HubSpot Private App setup

**Files:** none (external HubSpot UI + local `.env.local`, which is gitignored)

- [ ] **Step 1: Create the HubSpot Private App (Gurvir does this)**

In HubSpot: **Settings → Integrations → Private Apps → Create a private app.**

- Name: "SIRF Event Productions Website"
- Scopes: `crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.objects.deals.read`, `crm.objects.deals.write`

**STOP-AND-CONFIRM:** this is an OAuth/credentials screen — Gurvir creates the app and copies the token himself.

- [ ] **Step 2: Add the token to local env**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
cp .env.local.example .env.local
```

Gurvir pastes the token into `.env.local` manually (never through a command that would put it in shell history or logs).

- [ ] **Step 3: Verify the dev server can read it**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm run dev &
sleep 3
curl -s -X POST http://localhost:3000/api/inquire \
  -H "Content-Type: application/json" \
  -d '{"eventType":"wedding","guestCountBracket":"150+","urgencyBracket":"ASAP — 1-2 weeks","eventDateRaw":"June 2027","eventCity":"Brampton","servicesInterested":["Tent"],"packageInterest":"Legacy Signature","eventDescription":"test","firstName":"Test","lastName":"Lead","email":"test+phase1@example.com","phone":"+14165551234","formVariant":"phase1-smoketest","leadSource":"website-organic"}'
kill %1
```

Expected: `{"ok":true,"dealId":"..."}`. Then manually check HubSpot CRM for a new "Test Lead" contact and delete the test contact/deal afterward.

- [ ] **Step 4: No commit** — `.env.local` is gitignored by design; nothing to commit here.

---

### Task 16: Deploy to Vercel via CLI

**Files:** none (deployment config only)

- [ ] **Step 1: Install the Vercel CLI**

```bash
npm install -g vercel
```

- [ ] **Step 2: Log in**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
vercel login
```

**STOP-AND-CONFIRM:** this opens a browser OAuth flow — Gurvir completes it.

- [ ] **Step 3: Link and deploy**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
vercel link
vercel env add HUBSPOT_PRIVATE_APP_TOKEN production
# Gurvir pastes the token when prompted
vercel --prod
```

- [ ] **Step 4: Verify the live deployment**

```bash
curl -sI https://<the-vercel-url-from-step-3> | head -1
```

Expected: `HTTP/2 200`

- [ ] **Step 5: Run Lighthouse against the live placeholder**

```bash
npx lighthouse https://<the-vercel-url> --only-categories=performance --output=json --output-path=/tmp/lighthouse-phase1.json --chrome-flags="--headless"
cat /tmp/lighthouse-phase1.json | python3 -c "import json,sys; print(json.load(sys.stdin)['categories']['performance']['score'])"
```

Expected: a score printed between 0 and 1. This is a sanity check that the empty-hero-only page comes in well under budget before 22 more pages get built on top of it — if this placeholder already scores below ~0.85, fix the 3D loading strategy now rather than after Phase 2 makes it worse. Compare against spec v2 §5.3's target (Lighthouse mobile >85, i.e. score >0.85).

- [ ] **Step 6: No git commit needed** — deployment is a Vercel-side action, not a repo change. Note the live preview URL somewhere accessible (not in git) for Gurvir's reference.

---

### Task 17: Phase 1 close-out

**Files:**
- Modify: `/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/CLAUDE.md`

- [ ] **Step 1: Run the full test suite one more time**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS/web"
npm test
```

Expected: all tests across all 8 test files pass.

- [ ] **Step 2: Update CLAUDE.md's "Current progress" section**

Add a bullet under "Current progress":

```markdown
- **Done:** Website Phase 1 (Foundation) complete 2026-XX-XX — Next.js 15 app in `web/`, design system (moss palette + Cormorant/Inter), 3D hero (assembling tent, poster-first, reduced-motion fallback), Header/Footer/CTABand/Card components, 4-step InquiryForm wired end-to-end to HubSpot (contact upsert + Pipeline A/B deal routing) via `/api/inquire`, deployed to Vercel. See `docs/superpowers/plans/2026-09-16-website-phase1-foundation.md`. Next: Phase 2 (23 content pages) + Phase 3 (process the `Pictures of Setups/` footage into web-optimized assets).
```

- [ ] **Step 3: Commit**

```bash
cd "/Users/pawan/Documents/SIRF-EVENT-PRODUCTIONS"
git add CLAUDE.md
git commit -m "Close out website Phase 1 — foundation live, tested, deployed"
```

- [ ] **Step 4: Hand off**

Phase 2 (the 23 content pages from spec v2 §3) and Phase 3 (processing `Pictures of Setups/` into graded, web-optimized exports for the hero poster, gallery, and package pages) are separate plans, written after Phase 1 closes — same pattern the original May 2026 plan used. Return to `superpowers:writing-plans` for each when ready.

---

## Self-review

- **Spec coverage:** every Phase 1-scoped item from spec v2 has a task — design tokens (§4.2 → Task 2), 3D hero (§5 → Task 13), CTA cadence primitive (§6 → Task 6), form fields (§9 carried from v1 → Tasks 10–12), CRM/pipeline routing (§0.2, v1 §9.6 → Tasks 8–9), deployment (§2 → Task 16). Pages themselves (§3) are explicitly Phase 2, not this plan.
- **Placeholder scan:** no TBD/TODO in any step; the two things marked "placeholder" (hero-poster.jpg, HubSpot pipeline/stage IDs) are explicitly flagged as *intentional* Phase 1 stand-ins with a named follow-up (Phase 3, and the pre-launch checklist item respectively) — not unresolved plan gaps.
- **Type consistency:** `GuestCountBracket` and `EventType` defined once in `lib/pipeline-routing.ts` (Task 8) and imported everywhere else that needs them (Task 9, Task 10, Task 12) rather than redefined. `InquiryFormData` defined once in `components/forms/validation.ts` (Task 10) and imported by Task 12.
- **Media safety:** Task 1 excludes `Pictures of Setups/` from git before any other work happens, so the 21GB library can never accidentally get staged in a later task's `git add`.
