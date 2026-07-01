# chirag-dewan.github.io, Personal Site

## Overview
Static personal site. Editorial "dossier" aesthetic: the site reads like a case file. Fraunces (display) + Source Serif 4 (body) + JetBrains Mono (labels/data), dark ink on warm paper (#F5F1E8) with a dotted ground. Accent system: attack-red (#9B2C2C), slate (#2A5560), amber/memory (#9C6A12). Matches the long-form essays in /blog.

**Stack:** Vanilla HTML/CSS/JS. No frameworks. No build step.

## Structure
```
├── index.html              # Homepage, kicker + name + 3 dated work items + writing list
├── projects/
│   ├── index.html          # Projects overview, unified cards (meta / name / summary / tags / links)
│   ├── parallax.html       # PARALLAX narrative
│   ├── parallax-demo.html  # Interactive detection pipeline demo (uses main.css)
│   ├── kestrel.html        # KESTREL narrative
│   ├── kestrel-demo.html   # Interactive cloud anomaly demo (uses main.css)
│   ├── mcp-poison-bench.html        # MCP-Poison-Bench narrative
│   ├── mcp-poison-bench-demo.html   # Interactive demo (self-contained styles)
│   └── ai-security.html    # CTF Records detail
├── blog/
│   ├── index.html          # Writing index, static cards linking the standalone essays
│   ├── ten-thousand-agents.html      # Standalone essay (Part 1), bespoke paper/serif layout
│   └── autonomous-red-team.html      # Standalone essay (Part 2), bespoke paper/serif layout
├── timeline/index.html     # Redirect
├── 404.html                # Branded not-found page (uses main.css)
├── css/main.css            # Global design system (tokens + components + dossier layer). Fonts load via <link> in each page head, not @import.
├── js/main.js              # Active-nav highlight, mobile nav toggle, scroll reveal, footer push counter (GitHub events)
├── og-image.png            # 1200x630 OG card
├── favicon.png / .ico      # CD monogram
└── Chirag_Dewan_Resume.pdf
```

## Card pattern (home / projects / writing share it)
`meta line (date · status, mono)` → `name/title (Fraunces)` → `one-line summary (serif)` → `tags (mono, middot-separated)` → `→ link(s) (mono, attack-red)`. Keep projects and writing visually consistent. Canonical helpers live in main.css: `.card-meta` (with `.no` case number), `.card-evidence` (the headline metric line), `.card-links`. Don't redefine these inline per page.

## Dossier component layer (main.css, shared across pages)
The site reads as a set of case files. Reusable pieces, all themed through the token block:
- `.crumb` — breadcrumb over a page title (`.crumb__no` = case number in red).
- `.meta-row` — one mono line under a title: dates · status · stack · links.
- `.ledger` / `.ledger__item` (`__v` value, `__k` key) — the numbers-behind-the-work strip (homepage).
- `.verdict` (`.verdict__tab`, `--slate` variant) — the stamped one-line finding.
- `.pull` — pull-quote (Fraunces italic) with optional `<cite>`.
- `.story-section h2 .hnum` / `.sec-label .hnum` — numbered section heads (01, 02, …).
- `.dropcap` — drop cap on a narrative opening paragraph.
- `.work-rail` / `.rail-item` (`--held` = green node) — dated timeline entries (homepage).
- `.chips` / `.chip` (`--red`, `--amber`) — OWASP/ATLAS mappings and small facts.
- `.pn` — prev/next case navigation at the foot of narrative pages.
- `.ctf-log`, `.ladder` — CTF raw solve log + escalation-ladder table.
- `[data-reveal]` — opt into scroll reveal (see below).

## Scroll reveal
Add `data-reveal` to any block to fade-and-rise it in on scroll. The hidden state is applied by `js/main.js` at runtime **only** to elements below the fold, never in markup, so no-JS and reduced-motion users get the full page immediately. A 3s timeout fallback force-reveals anything the observer missed: content can never stay hidden.

## Blog
- Each post is a standalone static HTML page in `blog/` (e.g. `ten-thousand-agents.html`), reachable in raw source with no JS. New posts are added by creating the page and hand-adding a static card to both `blog/index.html` and the homepage Writing section.
- The standalone essays carry their own inline `<style>` (they predate / drive the site palette), a paper-styled masthead nav, and a `footer.colophon`. They do NOT use main.css.

## Conventions
- Nav shared across all pages (links: projects, writing), change it everywhere if you change it anywhere.
- No em dashes anywhere, use commas, periods, colons, or middots.
- Title separator is `·` (e.g. "Projects · Chirag Dewan"), not an em dash.
- Email: chirag0728@gmail.com · GitHub: github.com/chirag-dewan
- All pages: `<main>`, single `<h1>`, `defer` on scripts, OG tags, favicon, canonical URL, and the font `<link>` block (preconnect + Google Fonts stylesheet) in `<head>` before the CSS link.
- SEO: `robots.txt` + `sitemap.xml` at root (add new pages to the sitemap); JSON-LD (`Person` on home, `BlogPosting` on essays); branded `404.html`.
- Footer: links + copyright + tagline "see the pattern, not the content." + colophon line ("set in Fraunces…") + live push counter.
- Narrative project pages (parallax / kestrel / mcp-poison-bench / ai-security) follow one template: `.crumb` (case file NN) → hero → `.meta-row` → `.verdict` → at-a-glance `.arc3` → numbered `.story-section`s → `.cta-section` → `.pn` prev/next. Case numbering: 01 MCP-Poison-Bench, 02 PARALLAX, 03 KESTREL, 04 CTF Records, 05 ReconAI.
- No location references.
