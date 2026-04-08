# cdewan.me — Personal Site

## Overview
Static personal site for Chirag Dewan (chirag-dewan.github.io). Terminal/hacker aesthetic with monospace typography, CRT effects, and command-line inspired navigation. Dark background (#0a0a0a), phosphor green (#00ff41) as the primary accent, amber (#ffb000) as secondary.

**Stack:** Vanilla HTML/CSS/JS. No frameworks. No build step.

**Deploy:** Static files. Push `index.html`, `css/`, `js/`, `projects/`, `timeline/` to GitHub Pages.

## Project Structure
```
chirag-dewan.github.io/
├── CLAUDE.md
├── index.html            # Landing page (hero + now section)
├── css/
│   └── main.css          # All styles, CSS variables, CRT effects
├── js/
│   └── main.js           # Typing animations, nav, terminal effects
├── projects/
│   ├── index.html        # Projects overview
│   ├── parallax.html     # PARALLAX detail page
│   └── kestrel.html      # KESTREL detail page
└── timeline/
    └── index.html        # Career timeline
```

## Design System
- **Font:** JetBrains Mono (Google Fonts)
- **BG:** #0a0a0a
- **Primary:** #00ff41 (phosphor green)
- **Secondary:** #ffb000 (amber)
- **Muted text:** #666666
- **Borders:** #1a1a1a
- **CRT scanline overlay:** CSS pseudo-element on body
- **Cursor blink:** CSS animation on `::after` pseudo-elements
- **Navigation:** Styled as terminal commands (`$ projects`, `$ timeline`)
- **Page transitions:** Content fades in line-by-line like terminal output
- **Mobile:** Hamburger toggle (≡/×) for nav links

## Conventions
- All pages share the same `<head>` with main.css and main.js
- Navigation is a shared `<nav>` component — if you change it, change it in ALL .html files
- Dates display as YYYY-MM-DD (ISO format, terminal style)
- No external JS dependencies
- Keep everything accessible — real links, semantic HTML, aria labels under the aesthetic
- GitHub: github.com/chirag-dewan (not cdewan)
- LinkedIn: linkedin.com/in/cdewan
- Email: chirag@cdewan.me

## Agents

### agent:design
**Scope:** `css/main.css`, `js/main.js`
**Role:** Styling, animations, CRT effects, responsive design, typography, and all visual/interaction work. Owns the design system variables at the top of `main.css`. Can add new CSS animations or JS interactions.
**Do NOT touch:** Content files
**Aesthetic rules:**
- Monospace only (JetBrains Mono)
- Dark bg, green/amber accents — no other colors unless explicitly asked
- CRT scanlines must remain subtle (opacity < 0.05)
- All animations should feel like terminal output rendering, not web transitions
- No rounded corners > 2px

### agent:projects
**Scope:** `projects/`
**Role:** Create and edit project detail pages (PARALLAX, KESTREL, future projects). Each project page should include: project name, one-line thesis, architecture overview, tech stack, current status, and links (GitHub, demo). Follow the terminal aesthetic — present info as if it's `cat README.md` output.
**Do NOT touch:** `css/`, `js/`, `timeline/`

### agent:timeline
**Scope:** `timeline/`
**Role:** Maintain the career timeline page. Entries should be styled as terminal log entries with timestamps. Covers: education, certifications, roles, key milestones.
**Do NOT touch:** `css/`, `js/`, `projects/`
