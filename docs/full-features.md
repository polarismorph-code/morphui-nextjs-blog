# Morph — Full feature catalogue

The landing pricing card on [morphui.dev](https://morphui.dev) shows the
**7 highest-signal features** of the Professional plan to stay scannable.
This file is the **complete catalogue** across the React SDK, the Flutter
SDK, the engines that run automatically, the opt-out mechanisms, the
plan tiers, and the privacy contract.

> Linked from the landing as **"See all 20+ features →"** below the
> pricing grid.  
> Source of truth lives in:
> - `src/lib/pricing/features-by-sdk.ts` (plan-gated features)
> - `src/app/docs/react/page.tsx` (React docs)
> - `src/app/docs/flutter/page.tsx` (Flutter docs)
>
> If a feature is in the SDKs but missing here, open an issue.

---

## Quick legend

| Symbol | Meaning |
|---|---|
| 🟢 | Free tier — always on |
| 🔵 | Professional — beta $19/mo · cancel anytime (first 50 founders) → $29/mo public |
| 🟠 | Business — $99/mo |
| 🟣 | Enterprise — custom |

---

## 1. Auto-engines (React) — zero-config, always on

These run the moment `<MorphProvider>` mounts. Each is independently
toggleable via a provider prop.

| Engine | Plan | What it does |
|---|---|---|
| **Auto dark mode** | 🟢 | Detects `prefers-color-scheme`, time of day, accessibility needs → generates a brand-aware palette via Claude (cached) or HSL fallback when offline. |
| **PreNavSkeleton** | 🟢 | Intercepts internal link clicks, paints the destination's structural skeleton in ~80 ms before the route resolves. Per-link opt-out via `data-morph-no-prenav`. |
| **WhiteIslandFixer** | 🟢 | Cross-origin iframes (Stripe / YouTube), white logos, late-injected widgets get a subtle blend in dark mode so they stop blinding the user. |
| **ScrollRestoration** | 🟢 | Back / Forward restores scroll position + last-clicked element with a 600 ms highlight pulse. Owns `history.scrollRestoration`. |
| **ImproperTapDetector** | 🟢 | On mobile, when a near-miss tap lands on a destructive button next to the intended one, an Undo banner slides in for 4 s. |
| **LostTapDetector** | 🟢 | Visual clicks that never reached the React handler (z-index war, ghost overlay, pointer-events bug) get diagnosed in the dev console. |
| **Background fixer** | 🟢 | Cards staying white in Tailwind / MUI after auto-dark get repainted from CSS variable inspection. |
| **Portal fixer** | 🟢 | Dropdowns / modals / tooltips rendered through portals get the active theme propagated. |
| **WCAG validator** | 🟢 | Every text element verified against its real background before applying. If Claude misses a contrast issue, the SDK corrects automatically. |
| **safeMode** | 🟢 | Detect-only mode: every signal runs (theme, contrast, language, behavior) but nothing applies. Use for testing, audit, gradual rollout. |

## 2. Drop-in components (React)

Same API as your existing components, production behaviour built-in.

| Component | Plan | What it adds |
|---|---|---|
| **`<MorphForm>`** | 🟢 | A `<form>` that survives refresh, crash, and back-button. Auto-saves field values to local storage as the user types. Per-field opt-out via `data-morph-no-save`. |
| **`<MorphLoader>`** | 🟢 | Loading indicator that adapts to actual wait time: nothing < 200 ms, shimmer 200 ms – 1 s, skeleton 1 – 3 s, "still working / cancel" 3 s+. |
| **`<MorphDialog>`** | 🟢 | Modal with focus trap, escape-stack management, focus restoration to the trigger. Cmd+F searches inside the dialog (not behind it). |
| **`<MorphPhoneInput>`** | 🟢 | Phone input that accepts any paste format (spaces, dashes, parens, country codes) and outputs E.164. |
| **`<MorphZone>`** | 🔵 | Container that reorders its children based on observed behavior (after consent). Renders fallback static order on Free. |

## 3. Hooks (React)

Tree-shakable — only the ones you import ship in your bundle.

| Hook | Plan | Returns |
|---|---|---|
| **`useMorph()`** | 🟢 | Full state: theme, systemPreference, timeOfDay, appBrightness, adaptation, wcag, highContrast, forcedColors, colorBlindMode, prefersReducedMotion, language, framework, safeMode, plan, features, limits, featuresReady |
| **`useTheme()`** | 🟢 | Just `{ theme, prefersReducedMotion }` (lighter) |
| **`useAccessibility()`** | 🟢 | `{ highContrast, forcedColors, colorBlindMode }` |
| **`useStorage(key, default)`** | 🟢 | useState clone that persists across reloads. Falls back IndexedDB → localStorage → sessionStorage → memory. Survives private mode. |
| **`useTabSync(key, initial)`** | 🟢 | State that syncs across browser tabs in ~5 ms. Carts, drafts, notifications. |
| **`useAutoFillGuard()`** | 🟢 | Detects password-manager auto-fill, lets you compare with what the user typed. |
| **`useBehavior()`** | 🔵 | Full V2 surface (`v2Enabled`, patterns, getZoneOrder, getNextFor, getZoneStats, getDashboard, reset, registerZone). Frozen no-op on Free so callers don't need to guard each read. |

## 4. Theming (React)

| Feature | Plan | Notes |
|---|---|---|
| **CSS variables (`--cml-*`)** | 🟢 | All adaptation surfaces emit standard CSS variables — wire your own design system to them. |
| **Tailwind compatibility** | 🟢 | Detected automatically; theme tokens are emitted as Tailwind-compatible CSS variables. |
| **shadcn compatibility** | 🟢 | Same — shadcn primitives just work. |
| **MUI / Ant Design / Chakra / Radix** | 🟢 | All detected and supported. |
| **Plain CSS / SCSS** | 🟢 | Works without any framework. |
| **AI theme generation (Haiku)** | 🟢 | Claude Haiku — fits the 100 calls/day Free limit. |
| **AI theme generation (Sonnet)** | 🔵 | Claude Sonnet — better palette generation, more nuanced contrast. |
| **HSL fallback** | 🟢 | Deterministic local generation when Claude is unreachable. Mathematically-correct dark/light variant of your palette. |

## 5. Opt-out mechanisms (React)

Fine-grained control via HTML `data-*` attributes. "Closest attribute wins."

| Attribute | Effect |
|---|---|
| `data-morph-skip` | Subtree untouched — no theming, no tracking, no engine. |
| `data-morph-force` | Re-enables Morph in a skipped subtree. |
| `data-morph-no-prenav` | Skip PreNavSkeleton on this link. |
| `data-morph-no-shield` | Skip dark-mode dimming on this iframe. |
| `data-morph-no-dim` | Skip mix-blend dimming on this image. |
| `data-morph-critical` | Mark button as destructive — ImproperTapDetector protects it. |
| `data-morph-undo="fnName"` | Wire Undo banner to a window-global function. |
| `data-morph-no-save` | Skip this field in MorphForm auto-save (use for credit cards, OTP, etc.). |

---

## 6. Flutter SDK — theme

| Feature | Plan | Notes |
|---|---|---|
| **Provider setup** | 🟢 | One `MorphProvider` wraps `MaterialApp` — three flavours of inputs supported (ThemeData only, AppColors via MorphColors, both mixed). |
| **AppColors integration** | 🟢 | Pass your existing color palette via `MorphColors`. Morph reads it as-is. |
| **Palette stops (s25 → s950)** | 🟢 | 11-stop generated palette for every semantic color, ready to plug into `ThemeData`. |
| **System settings detection** | 🟢 | High contrast, reduced motion, bold text, text scale, OS brightness. |
| **HSL fallback** | 🟢 | Same offline behaviour as React. |

## 7. Flutter SDK — behavioural intelligence

| Feature | Plan | Notes |
|---|---|---|
| **Zone reordering** | 🔵 | Sections reorganize based on tap frequency + dwell. Always requires user consent. Always reversible. |
| **Suggestion system** | 🔵 | After 20 interactions, surfaces next-likely actions in context. |
| **Navigation pattern detection** | 🔵 | Tracks which routes / tabs the user actually uses. |
| **Personal heatmap** | 🔵 | Per-user zone-engagement map, exposed to the dev via `getHeatmap()`. |
| **Reading speed adaptation** | 🔵 | Paragraph spacing tuned to detected reading pace. |
| **Circadian rhythm UI** | 🔵 | Interface evolves with time of day (morning / noon / evening). |

## 8. Flutter SDK — interruption recovery

| Feature | Plan | Notes |
|---|---|---|
| **Basic recovery (scroll position)** | 🟢 | Restores scroll after pauses < 30 s. No content reload. |
| **Pause bucketing** | 🟢 | Distinguishes ambient pauses (notification, app-switch) from real interruptions (30 s+). |
| **Recovery strategies (advanced)** | 🔵 | Per-context behavior: cart restore, transfer resume, KYC step preservation, multi-step form. |
| **Multi-step workflows** | 🔵 | Tracks step state across pauses; resume points to the exact step. |
| **Per-context TTL** | 🔵 | Different decay per workflow (KYC 24 h, cart 7 days, checkout 30 min). |
| **Local learning** | 🔵 | Recovery preferences learned per user (preferred resume point, dismiss rate). |

## 9. Flutter SDK — adaptive UI (context-aware)

| Feature | Plan | Notes |
|---|---|---|
| **Grip detection** | 🔵 | Accelerometer-based; UI repositions for left-hand vs right-hand thumb reach. |
| **Battery-aware UI** | 🔵 | Simplifies interface and reduces animations on low battery. |
| **ChargePatternPredictor** | 🔵 | Learns when the user typically charges; pre-shifts to medium mode 60 min before known windows. |
| **BatterySessionSnapshot** | 🔵 | Per-session battery delta exposed to the dev. |
| **Fatigue detection** | 🟠 | Detects user fatigue via tap accuracy and typing speed — simplifies forms automatically. |
| **Fatigue baseline** | 🟠 | Per-user baseline learned over the first 3 sessions. |
| **GPS context UI** | 🟠 | Adapts when user is walking / cycling / in vehicle / stationary. |
| **Accelerometer fusion** | 🟠 | Combines GPS + accelerometer for finer-grained movement classification. |
| **Industry presets** | 🟠 | E-commerce and fintech optimized configurations. |

## 10. Flutter SDK — BuildContext extensions

| Extension | Plan | What it gives you |
|---|---|---|
| `context.morph` | 🟢 | Full MorphState |
| `context.morphTheme` | 🟢 | Current MorphTheme |
| `context.morphPalette` | 🟢 | Flat slot palette (MorphAdaptedColors?) |
| `context.systemSettings` | 🟢 | OS-level settings snapshot |
| `context.adaptedTheme` | 🟢 | ThemeData ready for MaterialApp |
| `context.zoneOrder` | 🔵 | Current zone reorder map |
| `context.morphDB` | 🔵 | Direct BehaviorDB handle |
| `context.morphReorder` | 🔵 | Programmatic reorder controls |
| `context.morphPlan` | 🟢 | Resolved plan enum |
| `context.morphSetCheckoutContext(...)` | 🔵 | Declare e-commerce checkout context |
| `context.morphSetCartContext(...)` | 🔵 | Declare cart context |
| `context.morphSetTransferContext(...)` | 🔵 | Declare money-transfer context |
| `context.morphSetKycContext(...)` | 🔵 | Declare KYC step context |
| `context.morphAnalyticsConfig` | 🟢 | Read analytics config |
| `context.morphUserConsented` | 🟢 | Read user consent state |
| `context.morphStorageSize` | 🟢 | KB used by Morph locally |
| `context.clearMorphData()` | 🟢 | GDPR-compliant wipe |
| `context.requireMorphPro(...)` | 🔵 | Imperative gate to Pro features |
| `context.requireMorphAgency(...)` | 🟠 | Imperative gate to Business features |

---

## 11. Privacy by default

| Aspect | Behavior |
|---|---|
| **Behavioral data location** | Always on-device (IndexedDB on React, Hive on Flutter). |
| **AI theme generation payload** | Color palette + opaque app hash (sha256). No user data. Cached forever per palette signature. |
| **Analytics opt-in** | Requires both `enabled: true` AND `userConsent: true`. Otherwise silently dropped. |
| **Per-user data deletion** | `context.clearMorphData()` (Flutter) / `window.morph.clearAll()` (React) wipes everything. |
| **Origin binding** | Pro+ keys bound to the iOS bundle id / Android package / web domain. Leaked keys can't be reused in another app. |
| **GDPR-compliant by default** | No opt-in configuration needed. |
| **Zero new permissions** | Grip detection uses the accelerometer already active for screen rotation — no new permission popup. |

---

## 12. Analytics & dashboard (Business+)

| Feature | Plan | Notes |
|---|---|---|
| **Analytics dashboard** | 🟠 | Aggregated anonymized signals at `app.morphui.dev`. |
| **AI-powered recommendations** | 🟠 | Claude analyzes app usage and generates actionable insights. |
| **A/B testing** | 🟠 | Split-test UI variants natively. |
| **Webhooks + data export** | 🟠 | Push aggregated signals to your warehouse. |
| **White-label** | 🟠 | Strip Morph branding from customer-facing surfaces. |
| **Cross-app pattern analysis** | 🟠 | Aggregate patterns across multiple React apps under one org. |

---

## 13. Enterprise

| Feature | Plan | Notes |
|---|---|---|
| **SSO** | 🟣 | SAML / OIDC. |
| **SLA** | 🟣 | 99.9 % uptime contract. |
| **Custom infrastructure** | 🟣 | Dedicated tenant, on-prem option. |
| **Priority support** | 🟣 | Slack channel, named TAM. |
| **Custom contracts** | 🟣 | DPA, MNDA, custom terms. |

---

## 14. Performance & bundle

| Metric | Value |
|---|---|
| **Free tier bundle (React)** | ~12 KB gzipped (all V1 engines included) |
| **`<MorphZone>` (V2 lazy)** | +25 KB only when imported |
| **Auto TL;DR / TOC engines** | +18 KB only when used |
| **First Contentful Paint impact** | +0 ms (engines mount post-FCP) |
| **Largest Contentful Paint impact** | +0 ms (auto-engines lazy-loaded) |
| **Time to Interactive impact** | +0 – 50 ms |
| **First license validation** | +200 – 400 ms one-shot, then cached 24 h |
| **Flutter app-size impact** | +180 KB (Android arm64), +200 KB (iOS) |
| **Flutter cold-start impact** | +50 – 100 ms (provider boot + Hive open) |
| **Flutter memory** | +2 – 4 MB |
| **Flutter battery (8 h foreground)** | < 0.5 % impact, measured |
| **License-validate (Flutter)** | +150 – 300 ms one-shot, then cached 24 h |

---

## 15. Plan feature matrix

| Capability | 🟢 Free | 🔵 Pro | 🟠 Business | 🟣 Enterprise |
|---|:---:|:---:|:---:|:---:|
| Auto dark / light mode | ✓ | ✓ | ✓ | ✓ |
| WCAG AA auto-check | ✓ | ✓ | ✓ | ✓ |
| AI theme generation | Haiku | Sonnet | Sonnet | Sonnet |
| PreNavSkeleton + scroll restoration | ✓ | ✓ | ✓ | ✓ |
| MorphForm / Loader / Dialog / PhoneInput | ✓ | ✓ | ✓ | ✓ |
| useMorph / useTheme / useStorage / useTabSync / useAutoFillGuard | ✓ | ✓ | ✓ | ✓ |
| System preferences detection | ✓ | ✓ | ✓ | ✓ |
| Interruption recovery (basic, Flutter) | ✓ | ✓ | ✓ | ✓ |
| useBehavior / MorphZone | — | ✓ | ✓ | ✓ |
| Behavioural tracking (local) | — | ✓ | ✓ | ✓ |
| Interruption recovery (advanced, Flutter) | — | ✓ | ✓ | ✓ |
| Grip detection (Flutter) | — | ✓ | ✓ | ✓ |
| Battery-aware UI + predictor (Flutter) | — | ✓ | ✓ | ✓ |
| Zone reorder + suggestions + heatmap | — | ✓ | ✓ | ✓ |
| Interface morphing | — | ✓ | ✓ | ✓ |
| Auto TL;DR / TOC / progress (React) | — | ✓ | ✓ | ✓ |
| Circadian rhythm UI (Flutter) | — | ✓ | ✓ | ✓ |
| Same key — React + Flutter | — | ✓ | ✓ | ✓ |
| Analytics dashboard | — | — | ✓ | ✓ |
| AI insights | — | — | ✓ | ✓ |
| A/B testing | — | — | ✓ | ✓ |
| Fatigue detection (Flutter) | — | — | ✓ | ✓ |
| GPS context UI (Flutter) | — | — | ✓ | ✓ |
| Industry presets (Flutter) | — | — | ✓ | ✓ |
| White-label | — | — | ✓ | ✓ |
| SSO / SLA / on-prem | — | — | — | ✓ |

---

## 16. Pricing snapshot

| Plan | Price | API calls / day | License keys |
|---|---|---|---|
| 🟢 Free | $0 | 100 | 1 |
| 🔵 Professional (beta) | **$19 / mo · cancel anytime** | 5,000 | 5 |
| 🔵 Professional (post-beta) | $29 / mo | 5,000 | 5 |
| 🟠 Business | $99 / mo | 50,000 | unlimited |
| 🟣 Enterprise | Custom | Custom | Custom |

**Beta pricing**: first 50 founders only. Founder price is locked
forever (audit Phase 1). After 50 founders, Pro reverts to $29/mo
for new signups.

---

## 17. Compatibility

| Stack | Status |
|---|---|
| React 18+ | ✓ |
| Next.js 13+ (App Router, Pages Router) | ✓ |
| Vite | ✓ |
| Create React App | ✓ |
| Tailwind / shadcn / MUI / Ant Design / Chakra / Radix | ✓ |
| Plain CSS / SCSS | ✓ |
| Flutter 3.10+ | ✓ |
| Dart 3+ | ✓ |
| Material 3 / Cupertino / Provider / Riverpod | ✓ |
| iOS 13+ | ✓ |
| Android 8+ (API 26+) | ✓ |
| Hive (Flutter local storage) | bundled |

---

## 18. What Morph never does

- Read user content (text, photos, files, messages)
- Read personal info (name, email, phone, payment data)
- Read browsing history
- Read other apps on device
- Read location (you pipe it in if needed)
- Access microphone, camera, or contacts
- Request any permission Morph doesn't strictly need
- Send identifiable data to our servers
- Sell user data — ever

---

*Catalogue maintained alongside the SDK. Last sync: built from
`features-by-sdk.ts` + `/docs/react` + `/docs/flutter` doc pages.*
