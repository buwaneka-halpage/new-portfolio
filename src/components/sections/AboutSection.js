import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'

export default function AboutSection() {
  const sectionRef = useRef(null)
  const imageWrapRef = useRef(null)
  const frameRef = useRef(null)
  const scanRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current

    // Statement — word-by-word blur-in
    const words = section.querySelectorAll('.statement-word')
    gsap.fromTo(
      words,
      { y: 30, autoAlpha: 0, filter: 'blur(6px)' },
      {
        y: 0, autoAlpha: 1, filter: 'blur(0px)',
        stagger: 0.025, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
      }
    )

    // Image — clip-path wipe from bottom
    if (imageWrapRef.current) {
      gsap.fromTo(
        imageWrapRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: imageWrapRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      )
    }

    // Corner frame marks draw in after image reveals
    if (frameRef.current) {
      const corners = frameRef.current.querySelectorAll('.corner-mark')
      gsap.fromTo(
        corners,
        { autoAlpha: 0, scale: 0.4 },
        {
          autoAlpha: 1, scale: 1,
          stagger: 0.08, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: imageWrapRef.current, start: 'top 75%', toggleActions: 'play none none none' },
          delay: 0.6,
        }
      )
    }

    // Bio columns
    const bioCols = section.querySelectorAll('.bio-col')
    gsap.fromTo(
      bioCols,
      { y: 40, autoAlpha: 0, filter: 'blur(10px)' },
      {
        y: 0, autoAlpha: 1, filter: 'blur(0px)',
        stagger: 0.25, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: bioCols[0], start: 'top 85%', toggleActions: 'play none none none' },
      }
    )

    // Scan line — loops endlessly once image is in view
    if (scanRef.current) {
      gsap.fromTo(
        scanRef.current,
        { y: '-100%' },
        {
          y: '1200%',
          duration: 4,
          ease: 'none',
          repeat: -1,
          scrollTrigger: { trigger: imageWrapRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      )
    }
  }, [])

  const statement =
    "I'm a Senior Software Engineer with 6+ years shipping production systems — from fintech microservices to open-source tooling trusted by thousands of developers worldwide."

  const skillsList = [
    'REACT', 'NEXT.JS', 'TYPESCRIPT', 'NODE.JS', 'PYTHON', 'GO',
    'AWS', 'KUBERNETES', 'DOCKER', 'POSTGRESQL', 'REDIS', 'GRAPHQL',
    'TAILWIND', 'GSAP', 'TERRAFORM', 'MONGODB', 'FASTAPI', 'GIT',
  ]
  const marqueeSkills = skillsList.join(' \u00B7 ') + ' \u00B7 '

  return (
    <section id="about" ref={sectionRef} className="section">
      <div className="container">
        {/* Section label */}
        <p className="section-label">(01) About</p>
        <div className="w-full h-px bg-surface-lighter mb-16" />

        {/* Two-column layout: text left, portrait right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start mb-20">

          {/* ── Left: text ────────────────────────────── */}
          <div className="lg:col-span-3 flex flex-col gap-12">
            {/* Statement */}
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

            {/* Bio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bio-col opacity-0">
                <p className="text-text-muted leading-relaxed">
                  Over six years I've built distributed systems processing millions of
                  daily transactions, led cross-functional engineering teams, and contributed
                  to open-source tools with thousands of active users. I care deeply about
                  clean architecture, developer experience, and software that scales.
                </p>
              </div>
              <div className="bio-col opacity-0">
                <p className="text-text-muted leading-relaxed">
                  I've worked across fintech, SaaS, and cloud infrastructure — from
                  early-stage startups to enterprise teams at TechScale and DataVision.
                  Outside of code I mentor junior engineers, speak at local meetups, and
                  contribute to open-source in the Node.js and Kubernetes ecosystems.
                </p>
              </div>
            </div>

            {/* Quick facts strip */}
            <div className="bio-col opacity-0 flex flex-wrap gap-x-10 gap-y-4 pt-2 border-t border-surface-lighter">
              {[
                ['Based in', 'Colombo, LK'],
                ['Available', 'Freelance / Full-time'],
                ['Focus', 'Distributed Systems'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">{label}</p>
                  <p className="font-display font-bold text-sm text-text mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: portrait with frame ───────────────── */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-end">
            <div ref={frameRef} className="relative w-full max-w-[340px]">

              {/* Corner viewfinder marks */}
              {/* Top-left */}
              <div className="corner-mark absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent z-20 opacity-0" />
              {/* Top-right */}
              <div className="corner-mark absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-accent z-20 opacity-0" />
              {/* Bottom-left */}
              <div className="corner-mark absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-accent z-20 opacity-0" />
              {/* Bottom-right */}
              <div className="corner-mark absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent z-20 opacity-0" />

              {/* Image container */}
              <div
                ref={imageWrapRef}
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '3 / 4' }}
              >
                <Image
                  src="/Buwaneka.jpeg"
                  alt="Buwaneka Halpage"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority
                />

                {/* Subtle dark gradient at bottom */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)' }}
                />

                {/* Scanning line */}
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

              {/* Caption bar below image */}
              <div className="flex items-center justify-between pt-3 px-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  BH — 001
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  ● Available
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  Colombo, LK
                </span>
              </div>
            </div>

            {/* Vertical label beside image on large screens */}
            <p
              className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.25em] text-text-subtle mt-6 self-end"
              style={{ writingMode: 'horizontal-tb' }}
            >
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
