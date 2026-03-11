import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'

const LENS_RADIUS = 72   // px — size of the pixelated circle
const PIXEL_BLOCK = 12   // px — block size of the pixel art

export default function AboutSection() {
  const sectionRef    = useRef(null)
  const imageWrapRef  = useRef(null)
  const frameRef      = useRef(null)
  const scanRef       = useRef(null)
  const lensCanvasRef = useRef(null)       // transparent canvas — only draws the lens
  const pixSrcRef     = useRef(null)       // pre-computed full-image pixelated canvas
  const rafRef        = useRef(null)       // animation frame id
  const mouseRef      = useRef({ x: 0, y: 0 })

  /* ── Scroll-triggered entrance animations ── */
  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current

    gsap.fromTo(
      section.querySelectorAll('.statement-word'),
      { y: 30, autoAlpha: 0, filter: 'blur(6px)' },
      { y: 0, autoAlpha: 1, filter: 'blur(0px)', stagger: 0.025, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' } }
    )

    if (imageWrapRef.current) {
      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: imageWrapRef.current, start: 'top 80%', toggleActions: 'play none none none' } }
      )
    }

    if (frameRef.current) {
      gsap.fromTo(
        frameRef.current.querySelectorAll('.corner-mark'),
        { autoAlpha: 0, scale: 0.4 },
        { autoAlpha: 1, scale: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out', delay: 0.6,
          scrollTrigger: { trigger: imageWrapRef.current, start: 'top 75%', toggleActions: 'play none none none' } }
      )
    }

    gsap.fromTo(
      section.querySelectorAll('.bio-col'),
      { y: 40, autoAlpha: 0, filter: 'blur(10px)' },
      { y: 0, autoAlpha: 1, filter: 'blur(0px)', stagger: 0.25, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: section.querySelector('.bio-col'), start: 'top 85%', toggleActions: 'play none none none' } }
    )

    if (scanRef.current) {
      gsap.fromTo(
        scanRef.current,
        { y: '-100%' },
        { y: '1200%', duration: 4, ease: 'none', repeat: -1,
          scrollTrigger: { trigger: imageWrapRef.current, start: 'top 80%', toggleActions: 'play none none none' } }
      )
    }
  }, [])

  /* ── Build the pre-pixelated source canvas ── */
  const buildPixelSource = (imgEl, w, h) => {
    // objectFit: cover + objectPosition: center top
    const nw = imgEl.naturalWidth
    const nh = imgEl.naturalHeight
    if (!nw || !nh) return null

    const scale   = Math.max(w / nw, h / nh)
    const dispW   = nw * scale
    const dispH   = nh * scale
    const offX    = (w - dispW) / 2   // center-x
    const offY    = 0                 // top

    // Draw at full container size with correct cover crop
    const full    = document.createElement('canvas')
    full.width    = w
    full.height   = h
    const fCtx    = full.getContext('2d')
    fCtx.drawImage(imgEl, offX, offY, dispW, dispH)

    // Downscale → upscale with nearest-neighbour = pixel art
    const smallW  = Math.max(1, Math.floor(w / PIXEL_BLOCK))
    const smallH  = Math.max(1, Math.floor(h / PIXEL_BLOCK))
    const small   = document.createElement('canvas')
    small.width   = smallW
    small.height  = smallH
    small.getContext('2d').drawImage(full, 0, 0, smallW, smallH)

    const pix     = document.createElement('canvas')
    pix.width     = w
    pix.height    = h
    const pCtx    = pix.getContext('2d')
    pCtx.imageSmoothingEnabled = false
    pCtx.drawImage(small, 0, 0, w, h)

    return pix
  }

  /* ── Draw lens on animation frame ── */
  const drawLens = () => {
    const canvas = lensCanvasRef.current
    const src    = pixSrcRef.current
    if (!canvas || !src) return

    const { x, y } = mouseRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    /* pixelated circle */
    ctx.save()
    ctx.beginPath()
    ctx.arc(x, y, LENS_RADIUS, 0, Math.PI * 2)
    ctx.clip()
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(src, 0, 0)
    ctx.restore()

    /* outer ring */
    ctx.beginPath()
    ctx.arc(x, y, LENS_RADIUS, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(168,255,62,0.85)'
    ctx.lineWidth   = 1.5
    ctx.stroke()

    /* inner dot */
    ctx.beginPath()
    ctx.arc(x, y, 2.5, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(168,255,62,0.9)'
    ctx.fill()

    /* crosshair lines */
    ctx.strokeStyle = 'rgba(168,255,62,0.45)'
    ctx.lineWidth   = 1
    ctx.beginPath()
    ctx.moveTo(x - LENS_RADIUS + 6, y); ctx.lineTo(x - 6, y)
    ctx.moveTo(x + 6, y);              ctx.lineTo(x + LENS_RADIUS - 6, y)
    ctx.moveTo(x, y - LENS_RADIUS + 6); ctx.lineTo(x, y - 6)
    ctx.moveTo(x, y + 6);              ctx.lineTo(x, y + LENS_RADIUS - 6)
    ctx.stroke()

    /* "PIXEL" label above ring */
    ctx.font      = '600 9px "Fira Code", monospace'
    ctx.fillStyle = 'rgba(168,255,62,0.7)'
    ctx.textAlign = 'center'
    ctx.fillText('PIXEL · LENS', x, y - LENS_RADIUS - 8)
  }

  /* ── Portrait mouse handlers ── */
  const handlePortraitEnter = () => {
    const container = imageWrapRef.current
    const canvas    = lensCanvasRef.current
    if (!container || !canvas) return

    const imgEl = container.querySelector('img')
    if (!imgEl?.complete) return

    const { offsetWidth: w, offsetHeight: h } = container
    canvas.width  = w
    canvas.height = h

    try {
      pixSrcRef.current = buildPixelSource(imgEl, w, h)
    } catch {
      return
    }

    // Hide global cursor — the lens ring acts as cursor
    gsap.to(['.cursor-dot', '.cursor-ring', '.cursor-trail'], {
      autoAlpha: 0, scale: 0.5, duration: 0.2,
    })
  }

  const handlePortraitMove = (e) => {
    const container = imageWrapRef.current
    if (!container || !pixSrcRef.current) return

    const rect = container.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(drawLens)
  }

  const handlePortraitLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const canvas = lensCanvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    // Restore global cursor
    gsap.to(['.cursor-dot', '.cursor-ring', '.cursor-trail'], {
      autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power2.out',
    })
  }

  /* ── Data ── */
  const statement =
    "I'm a 2nd year Computer Science & Engineering undergraduate at the University of Moratuwa — I build things obsessively, ship fast, and care deeply about the craft."

  const marqueeSkills = [
    'REACT', 'NEXT.JS', 'TYPESCRIPT', 'NODE.JS', 'PYTHON', 'FASTAPI',
    'KALI LINUX', 'BURP SUITE', 'OSINT', 'CTF',
    'LANGCHAIN', 'OPENAI API', 'N8N', 'PLAYWRIGHT', 'SCRAPY',
    'MONGODB', 'POSTGRESQL', 'TAILWIND', 'GSAP', 'DOCKER',
  ].join(' \u00B7 ') + ' \u00B7 '

  return (
    <section id="about" ref={sectionRef} className="section">
      <div className="container">
        <p className="section-label">(01) About</p>
        <div className="w-full h-px bg-surface-lighter mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start mb-20">

          {/* ── Left: text ── */}
          <div className="lg:col-span-3 flex flex-col gap-12">
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: '#f0ede8' }}
            >
              {statement.split(' ').map((word, i) => (
                <span key={i} className="statement-word inline-block mr-[0.3em] opacity-0">
                  {word}
                </span>
              ))}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bio-col opacity-0">
                <p className="text-text-muted leading-relaxed">
                  I started writing code in school and haven't stopped since. Now studying
                  CSE at UOM, I spend most of my time building full-stack projects,
                  exploring system design patterns, and pushing the boundaries of what I
                  can ship solo or in small teams.
                </p>
              </div>
              <div className="bio-col opacity-0">
                <p className="text-text-muted leading-relaxed">
                  Beyond web dev I'm into cyber security — CTF competitions, ethical hacking,
                  and network analysis. I also build AI agents, workflow automations, and
                  web scrapers. If it can be automated, I'll automate it.
                </p>
              </div>
            </div>

            <div className="bio-col opacity-0 flex flex-wrap gap-x-10 gap-y-4 pt-2 border-t border-surface-lighter">
              {[
                ['Based in',  'Colombo, LK'],
                ['Study',     '2nd Year · UOM'],
                ['Interests', 'Security · AI · Automation'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">{label}</p>
                  <p className="font-display font-bold text-sm text-text mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: portrait ── */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-end">
            <div ref={frameRef} className="relative w-full max-w-[340px]">

              {/* Viewfinder corner marks */}
              <div className="corner-mark absolute -top-2 -left-2  w-6 h-6 border-t-2 border-l-2 border-accent z-20 opacity-0" />
              <div className="corner-mark absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-accent z-20 opacity-0" />
              <div className="corner-mark absolute -bottom-2 -left-2  w-6 h-6 border-b-2 border-l-2 border-accent z-20 opacity-0" />
              <div className="corner-mark absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent z-20 opacity-0" />

              {/* Image container */}
              <div
                ref={imageWrapRef}
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '3 / 4', cursor: 'none' }}
                onMouseEnter={handlePortraitEnter}
                onMouseMove={handlePortraitMove}
                onMouseLeave={handlePortraitLeave}
              >
                <Image
                  src="/Buwaneka.jpeg"
                  alt="Buwaneka Halpage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority
                  crossOrigin="anonymous"
                />

                {/* Lens canvas — transparent bg, only draws the pixel circle + ring */}
                <canvas
                  ref={lensCanvasRef}
                  className="absolute inset-0 z-20 pointer-events-none"
                  style={{ width: '100%', height: '100%' }}
                />

                {/* Bottom gradient */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)' }}
                />

                {/* Scan line */}
                <div
                  ref={scanRef}
                  className="absolute left-0 right-0 z-10 pointer-events-none"
                  style={{
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, rgba(168,255,62,0.5), transparent)',
                    top: '0%',
                  }}
                />
              </div>

              {/* Caption */}
              <div className="flex items-center justify-between pt-3 px-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">BH — 001</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">● Available</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Colombo, LK</span>
              </div>
            </div>

            <p className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.25em] text-text-subtle mt-6 self-end">
              Senior Software Engineer / 2025
            </p>
          </div>
        </div>
      </div>

      {/* Skills marquee */}
      <div className="w-full border-t border-b border-surface-lighter py-4 overflow-hidden">
        <div className="marquee-track whitespace-nowrap">
          <span className="inline-block font-display text-lg md:text-xl font-bold text-text-subtle tracking-wider uppercase">
            {marqueeSkills.repeat(4)}
          </span>
        </div>
      </div>
    </section>
  )
}
