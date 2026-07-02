# chirag-dewan.github.io, Personal Site

## Overview
Personal site for an AI security researcher. Content-first and typography-driven, modeled on the restraint of leerob.com: a well-typeset document, not a UI. **Monochrome** (no accent color; links distinguished by underline only), light/dark by `prefers-color-scheme` plus a manual toggle. Type is **Geist Sans** (body + headings) and **Geist Mono** (labels, dates, code), self-hosted. The signature moves: no navigation chrome (you navigate by reading), an `h1` barely larger than body text, and a single centered 640px column.

The design's job: make a hiring manager read one research writeup. Nothing on the page should exist for another reason.

**Stack:** Astro 5 + MDX, static output. Deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`). Custom domain `www.cdewan.me` via `public/CNAME`.

> Pages source must be set to **GitHub Actions** in repo settings (Settings → Pages → Build and deployment → Source), not "Deploy from a branch." The workflow builds `dist/` and deploys it on push to `main`.

## Commands
- `npm install` then `npm run dev` (local dev server), `npm run build` (outputs `dist/`), `npm run preview`.

## Structure
```
├── astro.config.mjs            # site url, MDX integration, directory output
├── src/
│   ├── content.config.ts       # `writing` collection schema (glob loader over MDX)
│   ├── content/writing/*.mdx    # one file per writeup; frontmatter drives everything
│   ├── layouts/
│   │   ├── Base.astro          # <head>, no-flash theme script, footer, theme toggle
│   │   └── Prose.astro         # writeup shell: masthead, kicker/h1/standfirst, demo/source CTA, back link
│   ├── pages/
│   │   ├── index.astro         # home: bio prose + selected-research list (from collection)
│   │   ├── bio.astro           # extended background
│   │   ├── writing/index.astro # reverse-chron list, title + date
│   │   ├── writing/[...slug].astro  # renders each collection entry via Prose
│   │   └── 404.astro
│   └── styles/global.css       # all design tokens + components (single stylesheet)
└── public/                     # copied to site root verbatim
    ├── fonts/geist-sans.woff2, geist-mono.woff2   # self-hosted variable fonts (latin subset)
    ├── CNAME, favicon.*, og-image.png, Chirag_Dewan_Resume.pdf
    ├── css/main.css, js/main.js                    # ONLY for the legacy demos below
    ├── projects/*-demo.html                        # 3 interactive demos, kept from the old site
    └── blog/*, projects/*, timeline/               # meta-refresh redirect stubs (old URLs → new)
```

## Content model
- A writeup is an MDX file in `src/content/writing/`. Frontmatter fields (see `content.config.ts`): `title`, `description`, `kind` (`essay` | `research` | `log`), `date` (ISO), `kicker`, `standfirst`, `weight` (homepage ordering, lower first), `demo`, `source`, `unlisted`.
- The homepage "Selected research" list and `/writing` index are generated from the collection. **To add a post: create the MDX file.** No hand-edited cards anywhere.
- `Prose.astro` renders the kicker/title/standfirst from frontmatter, so the MDX body starts with the first section. It also renders the `demo`/`source` CTA and the "all writing" back link.

## Design system (`src/styles/global.css`)
- Tokens: `--bg --fg --muted --border --code-bg`, remapped under `:root[data-theme='dark']` and `@media (prefers-color-scheme: dark)`. Fonts: `--sans` (Geist Sans), `--mono` (Geist Mono). Column `--measure: 640px`.
- Reusable classes: `.column` (page frame), `.link-list` (writing index), `.plain-list`, `.stats/.stat` (metric figures), `.defs/.d` (feature grids), `.results` (data tables), `.diagram` (SVG figure frame + monochrome primitives).
- **Diagrams** ported from the old site keep their SVG markup but recolor through `.diagram` primitive classes (`.box`, `.box-em`, `.box-ghost`, `.t`, `.ts`, `.flow`, `.flow-em`, `.flow-ghost`, `.flow-dash`) so they stay two-tone monochrome in both themes. Arrowhead markers `#ah` / `#ahE` are defined inline per page. `mcp-poison-bench.mdx` carries a small scoped `<style>{`...`}`}` block for its `.mpb-fig` diagram classes.

## The three demos (kept, not restyled)
`public/projects/{parallax,kestrel,mcp-poison-bench}-demo.html` are heavy interactive JS pages retained from the previous design at their **original URLs**. They keep the old paper aesthetic on purpose (they're a click deeper from the writeup, linked via each writeup's `demo` frontmatter). parallax/kestrel demos load `public/css/main.css` + `public/js/main.js`; the MCP demo is self-contained. If you touch a demo, only fix links/bugs, don't try to reskin it to the new system unless asked.

## Conventions
- **Monochrome only.** No accent color. Links are underlined; hover deepens the underline. Don't introduce hues.
- No navigation bar. Interior pages get a single "Chirag Dewan" masthead link (home) at top; the footer carries github/linkedin/email/resume + a theme toggle.
- No em dashes anywhere; use commas, periods, colons, or middots. Title separator is `·`.
- No self-praising adjectives in copy; let the work speak. Publish negative results (it's the site's credibility signal).
- No location references.
- Email: chirag0728@gmail.com · GitHub: github.com/chirag-dewan.
- Every page: single `<h1>`, canonical URL + OG tags (via `Base.astro` props), favicon.
- Old URLs (`/blog/*.html`, `/projects/*.html`) are preserved as redirect stubs in `public/`; keep them if you rename slugs.
