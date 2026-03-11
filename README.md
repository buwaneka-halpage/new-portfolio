# Portfolio — Buwaneka Halpage

A cinematic, single-page developer portfolio built with Next.js 14. Every visual detail — from cursor trails to page transitions — is hand-crafted without UI kits or animation libraries beyond GSAP.

---

## Getting Started

```bash
npm install
npm run dev   # http://localhost:3000
```

```bash
npm run build && npm run start   # Production
```

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| Styling | Tailwind CSS v3 + global CSS |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth Scroll | Lenis (`@studio-freight/lenis`) |
| Backend | Next.js API Routes |
| Database | Supabase (PostgreSQL) |
| Icons | `react-icons` |

---

## Project Structure

```
src/
├── components/
│   ├── sections/          # One component per page section
│   │   ├── HeroSection
│   │   ├── AboutSection
│   │   ├── SkillsSection
│   │   ├── ProjectsSection
│   │   ├── ExperienceSection
│   │   ├── EducationSection
│   │   └── ContactSection
│   ├── AmbientOrbs        # Background floating glow orbs
│   ├── ChapterBridge      # Numbered dividers between sections
│   ├── ClickSpark         # Canvas click-burst effect
│   ├── CustomCursor       # Dot + ring + 3-layer ghost trails
│   ├── DecryptedText      # Scramble-reveal text on scroll
│   ├── Layout             # Shell: cursor, orbs, sparks, navbar, footer
│   ├── Navbar             # Fixed nav with wipe transition
│   ├── ScrollProgress     # Reading progress bar
│   └── SpotlightCard      # CSS-var cursor-tracking spotlight
├── pages/
│   ├── _app.js            # Global GSAP + Lenis init
│   ├── _document.js       # Font imports (Google Fonts)
│   ├── index.js           # Page composition
│   └── api/contact.js     # Supabase insert handler
└── styles/globals.css
```

---

## Technical Implementation Notes

### 1. GSAP + Lenis Integration

Lenis is initialised in `_app.js` and wired into GSAP's RAF ticker so `ScrollTrigger` always has an accurate scroll position — even with smooth scrolling active:

```js
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

The Lenis instance is exposed as `window.__lenis` so the Navbar can call `lenis.scrollTo()` from outside the React tree without prop-drilling or context overhead.

### 2. Custom Cursor — `quickTo` for Performance

`gsap.quickTo()` pre-compiles a setter function instead of queuing new tweens on every `mousemove` event, keeping CPU usage flat at high pointer speeds:

```js
const xDot  = gsap.quickTo(dot,  'x', { duration: 0.05, ease: 'power2.out' })
const xRing = gsap.quickTo(ring, 'x', { duration: 0.15, ease: 'power2.out' })
```

Three ghost trail elements (T1, T2, T3) share the same mouse position but have progressively longer durations (0.35s → 0.55s → 0.75s), creating a jellyfish-tail effect with zero extra event listeners.

### 3. Navbar Wipe Transition

A full-viewport `scaleX` lime bar masks the instant scroll jump between sections:

1. Wipe **in**: `scaleX 0 → 1` sweeps left-to-right, covering the screen
2. `lenis.scrollTo(target, { immediate: true })` — jump happens invisibly
3. Wipe **out**: `scaleX 1 → 0` retreats right-to-left, revealing the new section

This creates the illusion of a smooth page transition without any client-side routing changes.

### 4. `DecryptedText` — Scramble Reveal

Characters initialise as real text so the SSR and client renders match, preventing hydration mismatches. On first scroll into view (IntersectionObserver at 30% threshold), characters cycle through random symbols and resolve left-to-right:

```js
// Match SSR output exactly — no hydration mismatch
const [chars, setChars] = useState(() => text.split(''))
```

Reveal progress is tracked in a `useRef` (`revealedRef`) rather than state so the interval ticks without triggering React re-renders.

### 5. `SpotlightCard` — Zero Re-renders on Mousemove

Cursor position is written directly to CSS custom properties instead of React state, keeping the spotlight effect entirely outside the React render cycle:

```js
ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
```

The radial gradient is consumed purely in CSS — React is never involved in the hot path.

### 6. `ClickSpark` — Canvas RAF Loop

A `position: fixed`, `pointer-events: none` canvas covers the full viewport. On every click, 8 spark objects are pushed into a **ref** (not state). A continuous `requestAnimationFrame` loop reads the array, calculates eased distances, and filters out expired sparks:

```js
sparksRef.current = sparksRef.current.filter((spark) => {
  const elapsed = ts - spark.startTime
  if (elapsed >= duration) return false
  // ... draw spark
  return true
})
```

Ref instead of state means the draw loop is never interrupted or reset by React re-renders.

### 7. `AmbientOrbs` — Staggered Sine Motion

Four radial-gradient `div`s drift on independent sine paths with mismatched `duration` and `delay` values, preventing them from ever synchronising:

```js
gsap.to(orb1.current, { x: 130, y: 90,   duration: 14, repeat: -1, yoyo: true, delay: 0 })
gsap.to(orb2.current, { x: -110, y: 140, duration: 20, repeat: -1, yoyo: true, delay: 4 })
gsap.to(orb3.current, { x: 80, y: -120,  duration: 24, repeat: -1, yoyo: true, delay: 8 })
gsap.to(orb4.current, { x: -70, y: 80,   duration: 18, repeat: -1, yoyo: true, delay: 2 })
```

All orbs use `pointer-events: none` and `overflow: hidden` on the wrapper so they never interfere with interaction.

### 8. Film Grain + Vignette — Pure CSS

Both atmospheric effects are applied via `body::before` and `body::after` pseudo-elements with `pointer-events: none`. The grain uses an inline SVG `feTurbulence` filter as a `background-image` data URI — no external asset, no HTTP request. An 8-step CSS animation shifts the noise pattern over time for a subtle animated texture.

### 9. Contact API — Service Role Key

The form POSTs to `/api/contact`. Supabase RLS would block unauthenticated inserts, so the API route uses `SUPABASE_SERVICE_ROLE_KEY` — a server-only secret, never shipped to the browser — to perform trusted server-side writes:

```js
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY  // server-side only
)
```

### 10. Typography System

Three typeface roles with semantic Tailwind aliases:

| Token | Family | Use |
|---|---|---|
| `font-display` | Syne | Headings, hero, nav logo |
| `font-sans` | Inter | Body copy, descriptions |
| `font-mono` | Fira Code | Labels, numbers, metadata |

---

## Design Tokens

```
Background:   #0a0a0a
Surface:      #111111 / #1a1a1a / #222222
Accent:       #a8ff3e   ← lime green, the single interactive colour
Text:         #f0ede8 / #888888 / #555555
```

The accent colour is reused across every interactive state — text selection, hover glow, wipe transition, click sparks, spotlight tint — for visual consistency.

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=      # Safe for client bundles
SUPABASE_SERVICE_ROLE_KEY=     # Server-only — never expose to browser
```

---

## Deployment

Deployed to Vercel. Set both env vars in the Vercel project settings before deploying.

```bash
npx vercel
```

---

## License

MIT — see [LICENSE](LICENSE).
