# Horizons AI — Product & Engineering Brief

> **READ THIS FIRST.** This is the ground-truth description of what this product is and how to work in
> this repo. If you are an AI assistant asked to explain the product, or given a coding task without
> other context, start here before touching any file. `CLAUDE.md` imports this file, so Claude Code
> loads it automatically at the start of every session.

---

## 1. What Horizons is (the one-paragraph pitch)

**Horizons AI** is an AI-powered *behavioral-intelligence* web app for conversion-rate optimization.
You give it a website URL; it crawls the page and runs it past **four AI "personas"** (synthetic
visitors rooted in behavioral psychology). Each persona simulates how a real visitor would react,
surfacing **trust gaps, cognitive friction, and "conversion leaks."** The output is a report with a
**0–100 "Horizons Score,"** per-persona sentiment, a categorized list of leaks, and an **estimated
monthly revenue-impact range.**

Positioning line used throughout the copy: **"Traditional analytics tell you *what*; Horizons tells
you *why*."** It is contrasted with Lighthouse (performance benchmarking) and Hotjar (past heatmaps)
because it *simulates future visitor behavior* before you spend on ads. The marketing brands this as
**"Behavioral Swarm Intelligence."**

- **Product name:** Horizons AI. **npm package name:** `plugin` (scaffold leftover — do not rename casually; it's referenced in Vercel config).
- **Category (JSON-LD):** `BusinessApplication` — "AI-powered behavioral intelligence platform that simulates user behavior to detect conversion leaks."

## 2. The core loop (how a scan works, end to end)

```
Landing hero URL form
  └─ validate + push → /progress?url=<encoded>
       └─ POST /api/analyze { url }
            ├─ if OPENAI_API_KEY set → LIVE pipeline:
            │     crawl (puppeteer-core) → 3× gpt-4o-mini agents (Promise.all) → scoring
            │
            └─ if no key OR any error → generateDemoReport(url)  (demoMode: true)
       └─ response { id, report } returned INLINE
            └─ client writes sessionStorage["horizons_report_<id>"] = report
            └─ router.push(/report/<id>)
                 └─ report page reads sessionStorage FIRST,
                    falls back to GET /api/report/<id> (DB) for shared/refreshed links
```

**Key point:** the report is delivered *inline in the POST response and cached in `sessionStorage`* —
that is the primary path. The database (`GET /api/report/[id]`) is only a fallback for shared/refreshed
links, and on serverless it is **not durable** (see Gotchas).

The advertised 4-step pipeline in the UI is: **01 Crawl & Map → 02 Deploy Personas → 03 Track
Behavior → 04 Apply Diagnostics.**

## 3. The four personas — CANONICAL, single source of truth

**`lib/constants.ts` → `PERSONAS` is the ONLY source of truth.** Every surface (progress screen,
`/persona-insights/*` routes, report page, and the OpenAI prompts in `lib/ai-agents.ts`) must derive
persona identity from it. Never hardcode a new persona list, color, or emoji — import `PERSONAS`.

| id | name | icon | color | tagline |
|----|------|------|-------|---------|
| `skeptical-buyer` | Skeptical Buyer | 🤨 | `#f87171` | Questions credibility and demands proof before trusting. |
| `value-seeker` | Value Seeker | 💸 | `#34d399` | Hunts for clear value and transparent, justified pricing. |
| `impulse-evaluator` | Impulse Evaluator | ⚡ | `#fbbf24` | Impatient and mobile-first; judges within seconds and bounces fast. |
| `enterprise-evaluator` | Enterprise Evaluator | 🏢 | `#a78bfa` | Vets security, compliance, integrations, and ability to scale. |

Each persona also carries a `prompt` field (the system prompt used for its OpenAI analysis). There are
**exactly 4** personas — the "swarm"/"thousands of journeys" framing is *marketing copy*, not the data
model.

> ⚠️ Marketing pages (`app/page.tsx`, `app/about/page.tsx`) currently **hardcode their own persona
> arrays** with divergent order/descriptions. That is existing drift, not a second source of truth. When
> you add or edit persona UI, wire it to `PERSONAS`.

## 4. Scoring & revenue impact

Computed deterministically in `lib/scoring.ts` using constants from `lib/constants.ts`:

- **Start at 100**, subtract penalties, clamp to **0–100** (`Math.max(0, Math.min(100, round))`).
- **Load time** (else-if ladder): `>3000ms → −15`, `>2000ms → −10`, `>1000ms → −5`.
- **No SSL → −20**, **broken links → −10**.
- **Per issue:** `high → −8`, `medium → −5`, `low → −2`.
- **Revenue-impact bands** (`estimateRevenueImpact`, % of revenue lost): `≥90 → 1–3%`, `≥80 → 3–7%`,
  `≥70 → 7–12%`, `≥60 → 12–18%`, `≥50 → 18–25%`, `else → 25–40%`. Stored as `revenueImpact:{min,max}`.
- **Demo reports** use the same penalty model but clamp to a narrower **38–92** band.

## 5. Monetization / paywall

Freemium, **pay-per-scan** (NOT a subscription):

- **Free Scan — $0:** overall Conversion/Horizons Score only, **1 scan per domain**. Full leak detail
  and persona insight reports are **locked**. CTA → `/progress`. "No credit card required."
- **Precision Report — $29 (one-time, "ONE-TIME ACCESS", "$29 USD / Site scan"):** unlocks the complete
  breakdown, all leaks, the diagnostic code inspector, all 4 persona sentiment analyses, and the revenue
  uplift forecast. CTA → `/checkout`.

Gate full content behind `ScanReport.isPaid` **and** `user.isPro`. On the report page, free users see
`FREE_VISIBLE = 3` findings; the rest are blurred behind `/checkout`. **The paywall is cosmetic** —
`isPro` is set purely client-side (demo button / `upgradeToPro` / mock checkout), with no server payment
verification.

## 6. Tech stack & commands

- **Framework:** Next.js 14 (App Router) · React 18 · TypeScript (strict, `@/*` → repo root).
- **Styling:** Tailwind CSS 3.4 (Material Design 3-derived tokens) · `@tailwindcss/forms` · `@tailwindcss/container-queries`.
- **Crawler:** `puppeteer-core` + `@sparticuz/chromium` (serverless) / `chromium` (local).
- **AI:** OpenAI `gpt-4o-mini` (all calls).
- **Payments:** Stripe (mock checkout in-app).
- **Ids / storage:** `nanoid` · flat JSON files (no real DB).
- **Analytics:** `@vercel/speed-insights`.

```bash
npm install            # install deps
npm run dev            # dev server on http://localhost:3001  (NOTE: port 3001, not 3000)
npm run build          # production build
npm start              # serve the production build
npm run lint           # next lint
```

Environment variables (`.env.example`): `OPENAI_API_KEY` (server; enables the live pipeline),
`STRIPE_SECRET_KEY` (server), `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (**the only public var**),
`CHROME_EXECUTABLE_PATH` (optional local Chromium path). Platform-injected `VERCEL` /
`AWS_LAMBDA_FUNCTION_NAME` are read in code to detect serverless.

## 7. Repo map

```
app/
  page.tsx                     Marketing homepage (hero scan form, how-it-works, personas, pricing, FAQ, JSON-LD)
  about/ pricing/ faq/ legal/ resource-center/ success-stories/   Marketing (mostly server components)
  login/ register/             Client auth forms (+ "explore demo" instant-Pro shortcut)
  checkout/                    Mock Stripe paywall → login + upgradeToPro
  upgrade/                     Server component; just redirect('/checkout')
  progress/                    Client scan driver: reads ?url=, POSTs /api/analyze, caches report, → /report/[id]
  report/[id]/                 Client report view: sessionStorage first, then GET /api/report/[id]
  dashboard/ leaks/ reports/ settings/ team/ integrations/        Authed app pages (Navbar + Sidebar + Footer)
  persona-insights/            Hub + /skeptical-buyer /value-seeker /impulse-evaluator /enterprise-evaluator
  persona-comparison/          Authed persona comparison
  sitemap.ts                   Public routes only (placeholder baseUrl horizons.example.com)
  api/
    analyze/route.ts           POST — run a scan, returns { id, report }
    report/[id]/route.ts       GET — look up a persisted report
    settings/route.ts          GET+POST — per-user settings (file-based)
    integrations/route.ts      GET+POST — integration toggles + webhook test
    team/invite/route.ts       GET+POST+DELETE — team members
lib/
  constants.ts                 ★ PERSONAS (single source of truth) + SCORE_PENALTIES + PERFORMANCE_THRESHOLDS
  ai-agents.ts                 3 gpt-4o-mini agents: analyzeWithPersonas, detectTrustIssues, detectConversionLeaks
  crawler.ts                   Puppeteer crawl; chooses @sparticuz/chromium vs chromium
  scoring.ts                   calculateHorizonsScore + estimateRevenueImpact
  db.ts                        JSON-file report store (data/scans.json local, /tmp/scans.json serverless)
  demo-data.ts                 Deterministic URL-seeded fallback report (demoMode: true)
  AuthContext.tsx              Client-only mock auth (localStorage 'horizons_user')
  stripe.ts                    Stripe helper
components/
  Navbar.tsx Sidebar.tsx Footer.tsx Providers.tsx    Layout shell (imported per page — no global nav)
  ui/Button.tsx ui/Card.tsx ui/ProgressRing.tsx      Primitives
  Features.tsx Testimonials.tsx NewsletterSignup.tsx ToolDemo.tsx
data/                          integrations.json, settings.json, team.json  (file-based "DB", committed seed)
types/index.ts                 ScanRequest, CrawlData, Issue, PersonaInsight, ScanReport
```

Core types (`types/index.ts`):
- `Issue` (a "leak") = `{ id, category: 'performance'|'trust'|'conversion', severity: 'high'|'medium'|'low', title, description, impact, fix }`.
- `PersonaInsight` = `{ persona, icon, observations: string[] }`.
- `ScanReport` = `{ id, url, score, createdAt, issues[], personaInsights[] (4), revenueImpact:{min,max}, isPaid, demoMode? }`.

## 8. Architecture notes

- **Auth is a client-only mock.** `lib/AuthContext.tsx` stores `{email, isPro, name?, company?}` in
  `localStorage['horizons_user']`. No backend auth, no cookies/JWT, **no `middleware.ts`, no server-side
  protection.** `login(email, opts?: { isPro?, name?, company? })`; default `isPro=false`. Other helpers:
  `logout()`, `upgradeToPro()`, `updateProfile(patch)`. Access via `useAuth()`.
- **No global layout for nav.** The root `app/layout.tsx` renders only `<Providers>` + children. Each page
  imports its own `Navbar`/`Sidebar`/`Footer`. Marketing pages = Navbar + Footer; the 8 authed app pages
  (dashboard, leaks, reports, settings, team, integrations, persona-insights, persona-comparison) add the
  `Sidebar`.
- **File-based "DB" pattern** (repeated in `lib/db.ts` and all 3 aux API routes):
  `isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME`; path is
  `/tmp/<x>.json` on serverless else `<cwd>/data/<x>.json`. Keyed by email. Non-atomic read-modify-write.
- **Live pipeline always has a safety net.** The entire live path in `app/api/analyze/route.ts` is one
  `try/catch`; *any* failure (no key, Chromium launch fail, >30s timeout, OpenAI error) falls back to
  `generateDemoReport(url)`. The product never hard-fails a scan.

## 9. Design system & house style

Use these tokens/values instead of reinventing them (defined in `tailwind.config.ts` + `app/globals.css`):

- **Surfaces:** `bg-background` `#f4f7ff`; cards `bg-surface-container-lowest` `#ffffff`; surface ramp
  `surface-container-low/…/highest` (`#eff4ff`→`#d3e4fe`).
- **Text/ink:** `text-on-surface` `#0b1c30` (primary), `text-on-surface-variant` `#45464d` (muted).
- **Accents:** **`secondary` `#0058be` is the real blue brand accent.** Emerald `#34d399` is the second
  accent (used in `gradient-border`, `glow-pulse`). ⚠️ **`primary` AND `tertiary` are both `#000000`** —
  `bg-primary`/`text-primary` render *black*, not blue.
- **Lines:** `border-outline-variant` `#c6c6cd` (cards use `/60`), `error` `#ba1a1a`.
- **Corners are sharp:** every named `borderRadius` = `0px`; only `rounded-full` = `9999px`. Default to
  `rounded-none`; use `rounded-full` only for pills/badges/avatars.
- **Typography** (paired family+size tokens — apply `font-<x>` and the size comes with it): Newsreader
  serif for headings (`font-display-xl`, `font-headline-lg`, `font-headline-md`); Inter for body
  (`font-body-lg/md/sm`); `font-label-mono` = small uppercase-tracked label (**Inter, not monospace**).
  Fonts load via Google Fonts `<link>` in `app/layout.tsx` (**not** `next/font`).
- **Icons:** Material Symbols Outlined — `<span className="material-symbols-outlined">ligature_name</span>`.
- **Spacing tokens:** `p-md` (24) `gap-gutter` (24) `py-lg` (48) `px-xl` (80) `max-w-container-max` (1280).
- **Reusable animations/effects in `globals.css`** (use, don't re-author): `animate-fade-in-up`,
  `animate-glow-pulse`, `animate-shimmer`, `animate-scan`, `animate-float-slow/medium/fast`, `animate-orb-1/2`,
  `gradient-border`, `glass`/`glass-surface`/`glass-dark`, `bg-grid-pattern`, `scrollbar-hide`, `custom-scrollbar`.
- **Imports** use the `@/` alias (repo root), e.g. `import { PERSONAS } from '@/lib/constants'`.
- **Primitive APIs:** `Button` (**named export**; `variant: 'primary'|'secondary'`, renders `next/link`
  when `href` set); `Card` (default export; `title?`, `footer?`); `ProgressRing` (default export;
  `progress`, `size`, `strokeWidth`).
  ⚠️ `Button` and `ProgressRing` **hardcode raw indigo/amber/red** (`indigo-600`, `#4f46e5→#d97706→#ba1a1a`)
  instead of tokens — they are off-system. In *new* markup, prefer the tokens above; don't copy those raw colors.
- **Light mode is hardcoded** (`<html className="light">`); dark-mode plumbing exists but is inert.

## 10. Conventions to follow when coding

1. **Personas & scoring come from `lib/constants.ts`** — import `PERSONAS`, `SCORE_PENALTIES`,
   `PERFORMANCE_THRESHOLDS`; never duplicate them.
2. **New API routes:** put under `app/api/.../route.ts` and export `runtime = 'nodejs'`,
   `dynamic = 'force-dynamic'`, `revalidate = 0`. For persisted data, replicate the `isServerless ? /tmp
   : ./data` branch.
3. **Auth:** read state via `useAuth()`; treat `user === null` as logged-out and `user.isPro === true` as
   Pro. Mutate only through AuthContext helpers. Gate authed pages client-side:
   `useEffect(() => { if (!isLoading && !user) router.push('/login') }, [user, isLoading, router])`.
4. **Client vs server components:** add `'use client'` to any page using hooks; keep static marketing
   pages (about/legal/resource-center/success-stories) as server components. Per-section metadata goes in
   a metadata-only `layout.tsx` (client pages can't export `metadata`).
5. **Keep the demo fallback intact** — features that call the scan pipeline must still work with no
   `OPENAI_API_KEY`.
6. **Match existing style:** M3 tokens, sharp corners, the font/spacing tokens, and the existing animation
   utilities. Reuse `Card`/`Button` where they fit.
7. **Product vocabulary is load-bearing** — use it consistently: *swarm / Behavioral Swarm Intelligence,
   personas / lenses, conversion leaks, trust gaps, cognitive friction, Horizons Score, revenue impact /
   uplift forecast, Precision Report.*

## 11. Gotchas & traps

- **Serverless persistence is ephemeral.** `/tmp/*.json` is per-invocation and wiped on cold start; it is
  not shared across instances. Shared/refreshed `/report/[id]` links that miss the `sessionStorage` cache
  frequently 404 in production — by design. Settings/integrations/team saves also don't durably persist on
  Vercel.
- **A "successful" scan can be fake data.** Any error in the live path silently produces a demo report
  (`demoMode: true`); the only signal is the amber "Demo data" badge, and the score band differs (demo
  38–92 vs live 0–100).
- **`hasSSL` is a string check** (`url.startsWith('https://')`) and the analyze route auto-prepends
  `https://`, so the −20 NO_SSL penalty almost never fires. It does not verify a real certificate.
- **`loadTime` includes browser launch** (measured from function entry), so it inflates on serverless cold
  starts — not a pure page-load metric.
- **All AI-detected trust/conversion issues are forced to `severity: 'high'`** (−8 each). Only performance
  and demo issues have graded severity; severity is not a meaningful signal for AI findings.
- **Rate limiting is in-memory** (`global.rateLimitMap`) → per-instance, resets on cold start; "demo
  purposes" only.
- **Persona copy drifts** across `app/page.tsx` and `app/about/page.tsx` (each hardcodes its own array).
  `lib/constants.ts` is canonical; don't propagate the drift.
- **`/pricing` and `/faq` standalone pages are orphaned from nav** — the Navbar/Footer link to homepage
  anchors `/#pricing` and `/#faq` instead.

## 12. Known cruft — do NOT treat as source of truth / do NOT commit

- **`api/settings/route.ts` at the repo ROOT is DEAD** — App Router only serves route handlers under
  `app/`. It's an in-memory theme stub, never served, though it's committed. The live settings API is
  `app/api/settings/route.ts`. Safe to delete; do not edit it expecting an effect.
- **`components/ToolDemo.tsx` is unused/orphaned** (imported nowhere).
- **`next-env.d.ts` is auto-generated and must not be edited**, yet it's tracked in git despite being in
  `.gitignore` (ignore rules don't apply to already-tracked files).
- **`data/*.json` are runtime-mutable but committed** — running the app locally rewrites them (working-tree
  churn). Treat their contents as disposable seed, not canonical config. `data/settings.json` ships a
  plaintext test key; don't add real secrets there. `data/scans.json` is created at runtime and absent from
  the tree (not a bug).
- **Never commit:** `tsconfig.tsbuildinfo`, `.DS_Store`, `.vercel/` (all gitignored; `.vercel/project.json`
  is Vercel link metadata — keep it private).

---

*This file is the canonical brief. `CLAUDE.md` imports it. If product facts change (personas, pricing,
scoring, the scan flow), update this file so every AI assistant stays in sync.*
