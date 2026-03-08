import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function SplitChars({ text, className = '' }) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ transform: 'translateY(110%)' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default function HeroSection() {
  const sectionRef = useRef(null)
  const statsRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const glowRef = useRef(null)

  // Entrance animation
  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(
      '.hero-label',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    tl.to(
      '.line-1 .char',
      { y: '0%', filter: 'blur(0px)', stagger: 0.04, duration: 1.2, ease: 'power4.out' },
      '-=0.2'
    )
    tl.to(
      '.line-2 .char',
      { y: '0%', filter: 'blur(0px)', stagger: 0.04, duration: 1.2, ease: 'power4.out' },
      '-=0.8'
    )
    tl.fromTo(
      '.hero-subtitle',
      { autoAlpha: 0, y: 20, filter: 'blur(6px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )

    if (statsRef.current) {
      const statNumbers = statsRef.current.querySelectorAll('.stat-number')
      tl.fromTo(
        statsRef.current.querySelectorAll('.stat-item'),
        { autoAlpha: 0, y: 30, filter: 'blur(8px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.12, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      )
      statNumbers.forEach((el) => {
        const target = parseInt(el.getAttribute('data-value'), 10)
        if (!isNaN(target)) {
          gsap.fromTo(
            el,
            { textContent: 0 },
            { textContent: target, duration: 1.8, ease: 'power2.out', snap: { textContent: 1 }, delay: 1.4 }
          )
        }
      })
    }

    tl.fromTo(
      '.hero-marquee',
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1 },
      '-=0.4'
    )

    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.6 },
        '-=0.3'
      )
      gsap.to(scrollIndicatorRef.current, {
        y: 12,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.5,
      })
    }

    return () => { tl.kill() }
  }, [])

  // Mouse parallax — text layers at different depths
  useEffect(() => {
    const handleParallax = (e) => {
      const xPct = e.clientX / window.innerWidth - 0.5
      const yPct = e.clientY / window.innerHeight - 0.5

      gsap.to(line1Ref.current, {
        x: xPct * 28, y: yPct * 14,
        duration: 1.6, ease: 'power2.out',
      })
      gsap.to(line2Ref.current, {
        x: xPct * -18, y: yPct * -10,
        duration: 2, ease: 'power2.out',
      })
      gsap.to('.hero-label', {
        x: xPct * 10,
        duration: 2.2, ease: 'power2.out',
      })
      if (statsRef.current) {
        gsap.to(statsRef.current, {
          x: xPct * 8, y: yPct * 6,
          duration: 2.4, ease: 'power2.out',
        })
      }
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: xPct * -40, y: yPct * -30,
          duration: 3, ease: 'power2.out',
        })
      }
    }

    window.addEventListener('mousemove', handleParallax)
    return () => window.removeEventListener('mousemove', handleParallax)
  }, [])

  const marqueeText = 'AVAILABLE FOR WORK \u00B7 SENIOR SOFTWARE ENGINEER \u00B7 REACT \u00B7 NODE.JS \u00B7 TYPESCRIPT \u00B7 AWS \u00B7 KUBERNETES \u00B7 PYTHON \u00B7 GRAPHQL \u00B7 '

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex flex-col justify-center min-h-screen pt-20 pb-10 overflow-hidden"
    >
      {/* Floating accent glow — behind the title, parallax layer */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute"
        style={{
          top: '20%', left: '30%',
          width: 700, height: 400,
          background: 'radial-gradient(ellipse, rgba(168,255,62,0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
        }}
        aria-hidden="true"
      />

      <div className="container relative">
        {/* Top label */}
        <p className="hero-label font-mono text-xs tracking-widest uppercase text-text-muted mb-12 opacity-0">
          Portfolio &middot; 2025
        </p>

        {/* Name — massive display type */}
        <div className="mb-6">
          <h1
            className="font-display font-extrabold leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 8.5vw, 9rem)' }}
          >
            <span ref={line1Ref} className="block">
              <span className="block overflow-hidden whitespace-nowrap">
                <SplitChars text="BUWANEKA" className="line-1" />
              </span>
            </span>
            <span ref={line2Ref} className="block">
              <span className="block overflow-hidden whitespace-nowrap pl-[5vw] md:pl-[10vw]">
                <SplitChars text="HALPAGE" className="line-2" />
              </span>
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle font-mono text-sm md:text-base text-text-muted tracking-wider uppercase mb-16 opacity-0">
          Senior Software Engineer
        </p>

        {/* Stats Row */}
        <div ref={statsRef} className="flex gap-12 md:gap-20 mb-20">
          <div className="stat-item opacity-0">
            <span className="stat-number block font-display text-4xl md:text-5xl font-bold text-text" data-value="6">
              0
            </span>
            <span className="block font-mono text-xs text-text-muted uppercase tracking-wider mt-1">
              Yrs Exp
            </span>
          </div>
          <div className="stat-item opacity-0">
            <span className="stat-number block font-display text-4xl md:text-5xl font-bold text-text" data-value="25">
              0
            </span>
            <span className="block font-mono text-xs text-text-muted uppercase tracking-wider mt-1">
              Projects
            </span>
          </div>
          <div className="stat-item opacity-0">
            <span className="stat-number block font-display text-4xl md:text-5xl font-bold text-text" data-value="8">
              0
            </span>
            <span className="block font-mono text-xs text-text-muted uppercase tracking-wider mt-1">
              Companies
            </span>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="hero-marquee w-full border-t border-b border-surface-lighter py-4 opacity-0">
        <div className="marquee-track whitespace-nowrap">
          <span className="inline-block font-mono text-sm text-text-muted tracking-widest uppercase">
            {marqueeText.repeat(6)}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase text-text-subtle rotate-90 origin-center mb-4">
          Scroll
        </span>
        <span className="block w-px h-8 bg-text-subtle" />
      </div>
    </section>
  )
}
