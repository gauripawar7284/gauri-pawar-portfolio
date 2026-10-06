# Gauri Pawar — Portfolio (React + Tailwind + Framer Motion)

Dark "blueprint" portfolio: shutter intro, floating pill navbar, hero with a 3D
project carousel, scroll-revealed About, a scroll-pinned Project Shelf, a light
Expertise panel, a tools marquee and a Connect section with a working contact form.

## Run

```bash
npm install
npm run dev
```

`vite.config.js` still has `base: "/frontend-craft/"` (for GitHub Pages), so locally open
**http://localhost:5173/frontend-craft/**. Set `base: "/"` if you deploy elsewhere.

## Where to edit

- `src/data/content.js` — all text, links, projects, stats, expertise, tools.
- `src/components/ShutterIntro.jsx` — intro headline / greetings.
- `src/components/Hero.jsx` — carousel, portrait, mouse parallax.
- `src/components/Projects.jsx` — pinned horizontal shelf (card tilt/scale per scroll position).
- `src/components/Expertise.jsx` — mini UI mockups + marquee.
- `src/components/Connect.jsx` — CTA + Formspree form (endpoint in `content.js`).
- `tailwind.config.js` / `src/index.css` — colors (`#050810`, `#38bdf8`, `#bae6ff`), fonts, keyframes.

## Tips

- Hero portrait: a transparent-background PNG cut-out of you (instead of the JPEG) will look closest to a "standing in front of the carousel" effect. Replace `src/assets/Profile_Image.jpeg`.
- The "Frontend Portfolio" card has no screenshot; add `image` to it in `content.js`.
