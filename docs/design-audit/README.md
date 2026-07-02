# Full-Site UI/UX Audit, cdewan.me

**Auditor's lens:** a senior design lead's first day. The question is not "is this pretty?" (it is, the editorial paper system is genuinely tasteful) but "can a normal visitor understand what this is, trust it, and finish the core action without reading docs?"

**Product read:** this is a personal site for an AI security researcher. There is no signup, cart, or checkout, so the "core action" (conversion) is: *understand who Chirag is and what he does → trust the work is real → take a next step (contact, hire, read a project, download the resume, follow on GitHub/LinkedIn).* The whole audit is oriented around that funnel.

**Date:** 2026-07-02
**Method:** Site served locally (`python3 -m http.server`), driven headless in Chromium (Playwright) at desktop (1280w) and mobile (390w). Every page captured full-page in both viewports plus the mobile nav-open state. Screenshots in [`assets/`](assets/).

> **Screenshot caveat:** the sandbox blocks outbound HTTPS, so Google Fonts (Fraunces / Source Serif 4 / JetBrains Mono) and the GitHub events API did not load during capture. Screenshots therefore render in fallback serif/mono. Layout, spacing, hierarchy, color, and structure are faithful; exact letterforms are not. All findings below are independent of that caveat.

---

## Pages covered

| Page | Desktop | Mobile |
|---|---|---|
| Home (`/`) | [home-desktop](assets/home-desktop.png) | [home-mobile](assets/home-mobile.png) · [nav-open](assets/home-mobile-nav-open.png) |
| Projects index (`/projects/`) | [projects-desktop](assets/projects-desktop.png) | [projects-mobile](assets/projects-mobile.png) |
| MCP-Poison-Bench writeup | [mcp-poison-bench-desktop](assets/mcp-poison-bench-desktop.png) | [mobile](assets/mcp-poison-bench-mobile.png) |
| MCP-Poison-Bench demo | [mcp-poison-bench-demo-desktop](assets/mcp-poison-bench-demo-desktop.png) | [mobile](assets/mcp-poison-bench-demo-mobile.png) |
| PARALLAX writeup | [parallax-desktop](assets/parallax-desktop.png) | [mobile](assets/parallax-mobile.png) |
| PARALLAX demo | [parallax-demo-desktop](assets/parallax-demo-desktop.png) | [mobile](assets/parallax-demo-mobile.png) |
| KESTREL writeup | [kestrel-desktop](assets/kestrel-desktop.png) | [mobile](assets/kestrel-mobile.png) |
| KESTREL demo | [kestrel-demo-desktop](assets/kestrel-demo-desktop.png) | [mobile](assets/kestrel-demo-mobile.png) |
| CTF Records (`ai-security.html`) | [ai-security-desktop](assets/ai-security-desktop.png) | [mobile](assets/ai-security-mobile.png) |
| Writing index (`/blog/`) | [blog-desktop](assets/blog-desktop.png) | [mobile](assets/blog-mobile.png) |
| Essay: Ten thousand agents | [blog-post-1-desktop](assets/blog-post-1-desktop.png) | [mobile](assets/blog-post-1-mobile.png) |
| Essay: Autonomous red team | [blog-post-2-desktop](assets/blog-post-2-desktop.png) | [mobile](assets/blog-post-2-mobile.png) |

`/timeline/` is a meta-refresh redirect to `/` (verified, no UI).

---

## Scorecard by dimension

| Dimension | Grade | One-line verdict |
|---|---|---|
| First impressions | B | Beautiful, credible, clear *identity*, but no clear *next step* and a slow-to-reveal hero. |
| Navigation | B− | Clean and minimal, but demos break the shared nav and contact/resume live only in the footer. |
| Visual hierarchy | A− | Consistent editorial scale; type does the work. Minor demo-title divergence. |
| Component consistency | B | One page shipped with undefined CSS (now fixed); two visual languages for "demo." |
| Loading / empty / error | B | MCP demo nails its idle state; PARALLAX demo's default reads as "nothing happened." |
| Trust signals | A− | Standout honesty (real datasets, negative results, CIs). Missing bio / external proof. |
| Conversion paths | C+ | The single weakest area. Every contact route is a tiny footer link with no CTA. |
| Mobile | B | Stacks well; one control overflowed off-screen (now fixed). |

---

## How to read a finding

Each finding is tagged **Pn** (severity), the funnel stage it hurts (**Understanding / Trust / Conversion**), and a specific fix. Severity:

- **P0** blocks the core action or breaks the page.
- **P1** materially costs conversions or credibility.
- **P2** noticeable friction / inconsistency.
- **P3** polish.

Items marked ✅ **FIXED** were safe, small changes applied during this audit. Items marked 💡 **RECOMMEND** are larger and left as proposals (no payment/delete/publish actions were touched).

---

## Findings

### First impressions

**F1 · P1 · Conversion, Understanding — No call to action anywhere above the footer.** 💡 RECOMMEND
The hero states *who* ("AI security researcher, red teaming LLMs & agents") but never tells the visitor *what to do*. There is no "get in touch," "available for X," or primary button on any page. A hiring manager who is sold in the first 10 seconds has nowhere obvious to click.
*Fix:* add one primary CTA in the hero, e.g. a `mailto:` "Get in touch" plus "Resume" as a secondary link, styled like the existing `.cta-link` pattern already used on project pages. Keep it to two actions to preserve the minimal aesthetic.

**F2 · P2 · Understanding — The hero reveals slowly.** 💡 RECOMMEND
On desktop there is a large empty band between the nav and the kicker (`nav` margin + `.lead { margin-top: 2.4rem }`), so the first meaningful words sit well below the fold-top. It reads as intentional whitespace but costs the strongest real estate on the site.
*Fix:* reduce `.lead` top margin (~1.2rem) or pull the kicker up so the name + one-line identity are the first thing seen.

**F3 · P3 · Understanding — "Offensive security background." is an orphan line.** 💡 RECOMMEND
The sub-identity is a fragment with no verb, floating under the main identity. It parses as a leftover.
*Fix:* fold it into the identity ("...red teaming LLMs & agents, from an offensive security background.") or promote it to a one-sentence value line.

### Navigation

**F4 · P2 · Understanding, Conversion — The MCP demo runs a different nav and is a dead-end.** ✅ PARTIAL / 💡 RECOMMEND
`mcp-poison-bench-demo.html` ships its own header (brand `mcp-poison-bench`; links: `← writeup / architecture / github ↗`) with no path to `/projects/` or `/blog/`. Every other page shares the `cdewan / projects / writing` nav. A visitor who lands on the demo (a likely share target) cannot reach the rest of the site.
*Applied:* the brand wordmark is now a link to `/` (was an inert `<span>`), restoring a way home.
*Fix (recommend):* give the demo the standard shared nav, or add `projects`/`writing` links to its bar. Per the repo's own convention ("Nav shared across all pages"), this page is the exception.

**F5 · P2 · Conversion — Contact and resume are not in the nav.** 💡 RECOMMEND
The global nav has only `projects` and `writing`. The two highest-intent links (email, resume) exist only in the footer, forcing a full-page scroll to convert.
*Fix:* add `resume` (and/or `contact`) to the nav, or add a persistent header CTA.

**F6 · P2 · Conversion, Navigation — No in-body route from the homepage to the projects index.** ✅ FIXED
The homepage listed 3 work items linking to detail pages but offered no link to the full `/projects/` index except the top nav; the Writing block similarly had no continuation.
*Applied:* added an `all projects →` link after the Selected Work list, styled to match the existing `read →` affordance.

**F7 · P3 · Conversion — Outbound links open in the same tab.** 💡 RECOMMEND
Project `→ source` / `→ github` / `→ practice repo` and footer social links navigate away in-place (no `target="_blank"`). Sending a visitor to GitHub mid-visit ends the session on-site.
*Fix:* add `target="_blank" rel="noopener"` to external links.

### Visual hierarchy

**F8 · A− overall — Strong.** No action.
The type scale (Fraunces display / Source Serif body / JetBrains mono for data) creates clear, consistent hierarchy without boxes or shadows. Section labels (mono, slate, uppercase, rule above) read as a coherent system across home, projects, and writing.

**F9 · P3 · Consistency — Demo page titles diverge from the site title style.** 💡 RECOMMEND
PARALLAX and KESTREL demos use a *centered, mono, uppercase* H1 ("PARALLAX DETECTION PIPELINE"), whereas every other page uses a left-aligned Fraunces title. It's a subtle "different app" signal.
*Fix:* align demo titles to the `.section-header` / `.parallax-title` treatment for one visual voice.

### Component consistency

**F10 · P2 · Trust, Understanding — CTF Records page shipped with undefined CSS classes.** ✅ FIXED
`ai-security.html` used `.page-header`, `.ctf-entry`, `.ctf-header`, `.back-link` which had **no definitions** in `main.css`. Result: the challenge metadata ("Gandalf (Lakera)" / date / status) stacked as unstyled serif blocks instead of the site's inline mono-meta line, entries had no dividers, and "Back to Projects" was a bare link. On a research site, an inconsistent page quietly erodes credibility.
*Applied:* added definitions to `main.css` so the CTF header renders as a proper inline meta line, entries get dividers/spacing, and the back-link matches the mono link style. Verified in [ai-security-desktop.png](assets/ai-security-desktop.png).

**F11 · P2 · Trust, Consistency — CTF Records footer differed from every other page.** ✅ FIXED
Its footer was missing the `resume` link, the tagline, and the push-counter line, and it listed a "practice repository" link the other footers don't.
*Applied:* normalized the footer to match the site (github / linkedin / email / resume + tagline + push line).

**F12 · P3 · Understanding — Card click-target model is inconsistent.** 💡 RECOMMEND
Writing cards (`/blog/`) are fully clickable (the whole card is wrapped in an `<a>`). Project cards (`/projects/`) are *not*, only their `→ details / → live demo / → source` links are. Homepage work items make the title a link and repeat a `read →`. Three interaction models for the same visual card.
*Fix:* pick one, ideally make the whole card clickable to its primary destination and keep secondary links as explicit sub-actions.

**F13 · P3 · Consistency — Two visual languages for "demo."** 💡 RECOMMEND
PARALLAX and KESTREL demos inherit `main.css`; the MCP demo is fully self-styled. They feel like two different products.
*Fix:* migrate the MCP demo onto the shared tokens, or extract a small shared "demo" stylesheet.

### Loading / empty / error states

**F14 · P2 · Understanding, Trust — PARALLAX demo's default state reads as "nothing happened."** 💡 RECOMMEND
The demo auto-runs with the **normal user** archetype selected, which (correctly) produces `composite_score 0.00`, badge `NONE`, all 15 detectors at `0.00`, and "not recommended." This is accurate behavior, but to a first-time viewer it looks like an empty/broken widget, the product's whole point (detectors lighting up) is invisible on load.
*Fix:* default the demo to the **attacker** archetype so detectors visibly fire immediately, or add a one-line cue ("normal user = no alerts; try *attacker*"). Contrast with the MCP demo, which handles idle state well ("press 'run trial' to replay…").

**F15 · P3 · Trust — Footer "last push" line is unlabeled and network-dependent.** 💡 RECOMMEND
The push counter fetches the GitHub events API and fails silently (good), but when present it's a tiny gray line with no context, and when the API is blocked/rate-limited it simply never appears, so the footer height shifts between loads.
*Fix:* reserve its space, and prefix consistently ("last commit: …"). Low priority.

**F16 · P3 · Performance — Fonts load via CSS `@import`.** 💡 RECOMMEND
`main.css` starts with `@import url(...Google Fonts...)`, which serializes: the browser must fetch the CSS, then discover and fetch fonts. This delays first paint of styled text.
*Fix:* move fonts to `<link rel="preconnect">` + `<link rel="stylesheet">` in the HTML head, or self-host. `font-display: swap` is already in the URL (good).

### Trust signals

**F17 · A− — Credibility is the site's superpower.** No action.
Real, named datasets (LANL 16.9M auth events; 34K CloudTrail events), **honest negative results** ("0.45 AUC, worse than a coin flip", "0.0005 recall"), Wilson confidence intervals, and "failed attempts included" language. This is far more trustworthy than the usual polished-but-empty portfolio. Preserve this voice.

**F18 · P2 · Trust, Conversion — No "about," no face, no external validation.** 💡 RECOMMEND
There is no short bio, photo, or third-party proof (talks, publications, affiliations, CVEs, testimonials). For a solo researcher asking a stranger to trust and contact them, a two-sentence "who am I" and any external signal materially raises willingness to reach out.
*Fix:* add a compact About block (2, 3 sentences + optional headshot) and surface any external proof points.

**F19 · P3 · Trust — Personal Gmail as the only contact.** 💡 RECOMMEND
`chirag0728@gmail.com` is the contact across the site while the domain is `cdewan.me`. A `you@cdewan.me` address reads more professional. Optional.

### Mobile

**F20 · P2 · Conversion, Understanding — MCP demo controls overflowed off-screen on mobile.** ✅ FIXED
The `attack class` segmented control (`tool_description / schema_field / rug_pull / cross_server`) was `inline-flex` with no wrap; on a 390px viewport `cross_server` was clipped past the right edge, so one core option was invisible/unusable.
*Applied:* added a `max-width:600px` rule so the segment wraps into a 2×2 grid. Verified in [mcp-poison-bench-demo-mobile.png](assets/mcp-poison-bench-demo-mobile.png).

**F21 · P3 · Consistency — MCP demo mobile header wraps awkwardly.** 💡 RECOMMEND
On mobile the demo's brand ("mcp-poison-bench") and "← writeup" each wrap to two lines, producing a ragged header.
*Fix:* folds out naturally once the demo adopts the shared nav (F4); otherwise shorten the brand or reduce header font size at small widths.

**F22 · P3 · Understanding — Demo pages are extremely tall on mobile.** 💡 RECOMMEND
The PARALLAX/KESTREL demos are ~12,000px tall on a phone. They stack correctly and remain readable, but there's no in-page anchor to jump between the interactive widget and the real-world results.
*Fix:* optional "jump to results" anchor near the top of the demo.

### Accessibility (supports Understanding + Trust)

**F23 · P3 · Understanding — Low-contrast meta text.** 💡 RECOMMEND
`--text-dim (#8A8275)` on paper is used for small mono meta lines and dates; contrast is ~3:1, borderline for small text under WCAG AA (4.5:1).
*Fix:* darken meta text one step (toward `--ink-soft`) for the smallest sizes.

**F24 · P3 — Positives worth keeping.** No action.
Nav toggle has an `aria-label` and swaps `≡`/`×`; the demo defense toggle uses `role="switch"` + `aria-checked`; body links are underlined; `prefers-reduced-motion` is respected. Good baseline.

---

## Changes applied during this audit (safe, small)

All changes are copy/CSS/markup only. No payment, delete, or publish actions were touched.

| # | File | Change |
|---|---|---|
| F6 | `index.html` | Added `all projects →` link after Selected Work. |
| F10 | `css/main.css` | Added definitions for `.page-header`, `.ctf-entry`, `.ctf-header`, `.ctf-notes`, `.back-link` so CTF Records matches the site meta pattern. |
| F11 | `projects/ai-security.html` | Normalized footer (added resume, tagline, push line; dropped the one-off link). |
| F4 | `projects/mcp-poison-bench-demo.html` | Made the brand wordmark a link home (was inert `<span>`). |
| F20 | `projects/mcp-poison-bench-demo.html` | Added mobile rule so the attack-class control wraps instead of clipping off-screen. |

Each was re-screenshotted and verified after the change.

---

## The 5 issues hurting conversion most

1. **No call to action, anywhere (F1, P1).** The site sells the person but never asks for the click. Highest-leverage single fix: a hero CTA ("Get in touch" + "Resume").
2. **Contact & resume buried in the footer only (F5, P1/P2).** The two highest-intent links require scrolling past the entire page. Promote them into the nav or a persistent header.
3. **No trust-beyond-the-work signals (F18, P2).** No bio, face, or external proof. Great work + a stranger with no context = hesitation to reach out. A 2-sentence About closes this cheaply.
4. **The MCP demo is a navigational dead-end (F4, P2).** A likely share/landing target that couldn't return to the site (brand link now restored; full nav still recommended). Visitors who land there leave there.
5. **PARALLAX demo shows "nothing" on load (F14, P2).** The flagship interactive proof-point looks empty/broken by defaulting to the no-alert archetype, wasting the strongest "this is real" moment.

## 5 quick wins fixable today

1. ✅ **CTF Records now renders consistently (F10/F11).** Undefined CSS and a mismatched footer fixed, one page no longer looks half-finished.
2. ✅ **MCP demo mobile control fixed (F20).** A core option is no longer clipped off-screen on phones.
3. ✅ **Homepage → projects index link added (F6)**, and ✅ **MCP demo brand links home (F4).** Two dead-ends removed.
4. 💡 **Add `resume` (and `contact`) to the nav (F5).** One `<li>` per page, minutes of work, removes the biggest scroll-to-convert tax.
5. 💡 **Default the PARALLAX demo to the `attacker` archetype (F14).** A one-word change in `startSimulation('normal')` → `('attacker')` makes the detectors visibly fire on load.

---

*Bottom line: the craft and, unusually, the honesty are already top-tier. The gap is not aesthetics, it's that the site never converts the trust it earns into an action. Give the visitor one clear thing to do, keep the demos on-site, and add two sentences about who's behind the work.*
