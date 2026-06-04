# chirag-dewan.github.io, Personal Site

## Overview
Static personal site. Editorial paper aesthetic: Fraunces (display) + Source Serif 4 (body) + JetBrains Mono (labels/data), dark ink on warm paper (#F5F1E8) with a dotted ground. Accent system: attack-red (#9B2C2C), slate (#2A5560), amber/memory (#9C6A12). Matches the long-form essays in /blog.

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
│   ├── index.html          # Writing index, cards rendered from posts.json
│   ├── post.html           # Slug renderer for posts with `bodyHtml` (uses ?slug=)
│   ├── posts.json          # Post registry; entries may set `url` to link a standalone page
│   ├── ten-thousand-agents.html      # Standalone essay (Part 1), bespoke paper/serif layout
│   └── autonomous-red-team.html      # Standalone essay (Part 2), bespoke paper/serif layout
├── timeline/index.html     # Redirect
├── css/main.css            # Global design system (tokens + components). @imports the Google fonts.
├── js/main.js              # Nav toggle, scroll reveal, footer tagline, push counter
├── og-image.png            # 1200x630 OG card
├── favicon.png / .ico      # CD monogram
└── Chirag_Dewan_Resume.pdf
```

## Card pattern (home / projects / writing share it)
`meta line (date · status, mono)` → `name/title (Fraunces)` → `one-line summary (serif)` → `tags (mono, middot-separated)` → `→ link(s) (mono, attack-red)`. Keep projects and writing visually consistent.

## Blog
- Posts live in `posts.json`. A post with a `url` field links to its own standalone HTML page (the two essays). A post without `url` is rendered by `post.html?slug=` from its `bodyHtml`.
- The standalone essays carry their own inline `<style>` (they predate / drive the site palette) and a paper-styled `footer.colophon`. They do NOT use main.css.

## Conventions
- Nav shared across all pages (links: projects, writing), change it everywhere if you change it anywhere.
- No em dashes anywhere, use commas, periods, colons, or middots.
- Title separator is `·` (e.g. "Projects · Chirag Dewan"), not an em dash.
- Email: chirag0728@gmail.com · GitHub: github.com/chirag-dewan
- All pages: `<main>`, single `<h1>`, `defer` on scripts, OG tags, favicon, canonical URL.
- Footer: links + copyright + tagline "see the pattern, not the content." + live push counter.
- No location references.
