# chirag-dewan.github.io — Personal Site

## Overview
Static personal site. Terminal aesthetic — JetBrains Mono, CRT scanlines, phosphor green (#00ff41), amber (#ffb000) on dark (#0a0a0a).

**Stack:** Vanilla HTML/CSS/JS. No frameworks. No build step.

## Structure
```
├── index.html              # Homepage — name + 3 project cards
├── about.html              # About + career + research + certs + contact
├── projects/
│   ├── index.html          # Projects overview — 3 cards with tags
│   ├── parallax.html       # PARALLAX narrative (origin → failure → fix)
│   ├── parallax-demo.html  # Interactive detection pipeline demo
│   ├── kestrel.html        # KESTREL narrative
│   └── kestrel-demo.html   # Interactive cloud anomaly demo
├── timeline/
│   └── index.html          # Redirect → /about.html
├── css/main.css            # All styles + design system variables
├── js/main.js              # Nav toggle, scroll reveal, footer tagline, push counter
├── og-image.png            # 1200x630 OG card
├── favicon.png / .ico      # CD monogram
└── Chirag_Dewan_Resume.pdf
```

## Pages
- **Home**: name, one-liner, 3 clickable project cards (PARALLAX, KESTREL, ReconAI)
- **About**: combined about + career timeline + research + certs + contact. Terminal $ commands as section headers.
- **Projects**: 3 cards with tags, status, links. Narrative lead line.
- **PARALLAX**: full narrative arc (origin → thesis → build → failure → fix → evasion → why now)
- **KESTREL**: same arc structure
- **Demos**: interactive JS simulations, noscript fallbacks

## Conventions
- Nav shared across all pages — change it everywhere if you change it anywhere
- Nav links: about, projects (no timeline — redirects to about)
- Email: chirag0728@gmail.com
- GitHub: github.com/chirag-dewan
- All pages have: `<main>`, single `<h1>`, `defer` on scripts, OG tags, favicon, canonical URL
- Footer: links + copyright + rotating tagline + live push counter
- No location references (removed "Targeting Boston")
