# platfform-web-animation

Custom front-end animation/interaction code for the **Platfform** (Platform / WFG) Webflow site
(`platfform.webflow.io`). All modules live in [`src/`](src/) and are concatenated into
[`bundle.js`](bundle.js), which Webflow loads via **jsDelivr** through a single loader script.

This replaces ~13 individual Webflow "registered inline scripts" (which were capped at **15 per
block** and **2000 chars each**). One loader → one bundle = no caps, no char limit, and edits are a
single `git push`.

## How it's wired

Webflow has ONE applied footer script (a loader) that injects:

```
https://cdn.jsdelivr.net/gh/workplace-futures-group/platfform-web-animation@main/bundle.js
```

Each module is an IIFE that **self-gates** — home-only ones bail via
`if(location.pathname.length>1)return;`, others act only where their target elements exist — so the
single bundle can load site-wide and each piece runs only where it should.

## Modules (run order = footer order)

| File | Page(s) | What it does |
|------|---------|--------------|
| `01-mobilenav` | all | Mobile burger nav |
| `02-aboutgalleryaccordion` | About | Gallery accordion |
| `03-homegalleryaccordion` | Home | Gallery accordion |
| `04-introrevealv9` | Home/About/Contact | Grey→black scroll ink-reveal of intro text |
| `05-citymarquee` | Contact | Endless city-list marquee |
| `06-portfolioscrollanim2` | Portfolio | Scroll animation |
| `07-ffeorbit5` | Home | FF&E orbit / click-to-centre |
| `08-wcsetup5` + `09-wcdeal4` | Home | Workplace Consultancy "deal off the top" scrubbed gallery |
| `10-specanim` | Home | Furniture Spec trim-path line-draw |
| `11-physdropengine4` + `12-physdroploader4` | Home | Design illustration → drops into FF&E physics pile (Matter.js) |
| `13-svcpin7` | Home | Generic service-row scroll pinning |

## Editing / deploying

```bash
# 1. edit a module in src/
# 2. rebuild + syntax-check the bundle
./build.sh
# 3. commit & push
git add -A && git commit -m "tweak X" && git push
# 4. bust jsDelivr's cache so the change goes live within seconds
curl -s https://purge.jsdelivr.net/gh/workplace-futures-group/platfform-web-animation@main/bundle.js
```

No Webflow change needed for code edits — the loader always points at `@main`.

## Notes / gotchas
- jsDelivr only serves **public** repos — keep this public (it's just front-end code).
- jsDelivr caches `@main`; use the purge URL above (or a `@<tag>`/commit ref) to force updates.
- Matter.js (physics) is pulled at runtime from jsDelivr inside the phys modules.
- `bundle.js` is generated — never hand-edit it; edit `src/` and run `./build.sh`.
