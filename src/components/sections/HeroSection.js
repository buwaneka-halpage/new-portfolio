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

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({ delay: 0.3 })

    // Top label fade in
    tl.fromTo(
      '.hero-label',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )

    // Character-by-character reveal for BUWANEKA
    tl.to(
      '.line-1 .char',
      {
        y: '0%',
        stagger: 0.04,
        duration: 1,
        ease: 'power4.out',
      },
      '-=0.2'
    )

    // Character-by-character reveal for HALPAGE
    tl.to(
      '.line-2 .char',
      {
        y: '0%',
        stagger: 0.04,
        duration: 1,
        ease: 'power4.out',
      },
      '-=0.7'
    )

    // Subtitle
    tl.fromTo(
      '.hero-subtitle',
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )

    // Stats counter animation
    if (statsRef.current) {
      const statNumbers = statsRef.current.querySelectorAll('.stat-number')
      tl.fromTo(
        statsRef.current.querySelectorAll('.stat-item'),
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )

      statNumbers.forEach((el) => {
        const target = parseInt(el.getAttribute('data-value'), 10)
        if (!isNaN(target)) {
          gsap.fromTo(
            el,
            { textContent: 0 },
            {
              textContent: target,
              duration: 1.5,
              ease: 'power2.out',
              snap: { textContent: 1 },
              delay: 1.2,
            }
          )
        }
      })
    }

    // Marquee fade in
    tl.fromTo(
      '.hero-marquee',
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.8 },
      '-=0.5'
    )

    // Scroll indicator bob animation
    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5 },
        '-=0.3'
      )

      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      })
    }

    return () => {
      tl.kill()
    }
  }, [])

  const marqueeText = 'AVAILABLE FOR WORK \u00B7 CS & ENGINEERING \u00B7 UNIVERSITY OF MORATUWA \u00B7 '

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex flex-col justify-center min-h-screen pt-20 pb-10 overflow-hidden"
    >
      <div className="container">
        {/* Top label */}
        <p className="hero-label font-mono text-xs tracking-widest uppercase text-text-muted mb-12 opacity-0">
          Portfolio &middot; 2025
        </p>

        {/* Name — massive display type */}
        <div className="mb-6">
          <h1 className="font-display font-extrabold leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)' }}
          >
            <span className="block overflow-hidden">
              <SplitChars text="BUWANEKA" className="line-1" />
            </span>
            <span className="block overflow-hidden pl-[5vw] md:pl-[10vw]">
              <SplitChars text="HALPAGE" className="line-2" />
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle font-mono text-sm md:text-base tracking-wider uppercase mb-16 opacity-0" style={{ color: 'var(--color-accent-teal)' }}>
          Aspiring Software Engineer
        </p>

        {/* Stats Row */}
        <div ref={statsRef} className="flex gap-12 md:gap-20 mb-20 p-8 glass-panel rounded-2xl w-fit">
          <div className="stat-item opacity-0">
            <span className="stat-number block font-display text-4xl md:text-5xl font-bold" style={{ color: 'var(--color-text-main)' }} data-value="3">
              0
            </span>
            <span className="block font-mono text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Projects
            </span>
          </div>
          <div className="stat-item opacity-0">
            <span className="stat-number block font-display text-4xl md:text-5xl font-bold" style={{ color: 'var(--color-text-main)' }} data-value="3">
              0
            </span>
            <span className="block font-mono text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Roles
            </span>
          </div>
          <div className="stat-item opacity-0">
            <span className="block font-display text-4xl md:text-5xl font-bold" style={{ color: 'var(--color-accent-magenta)' }}>
              UOM
            </span>
            <span className="block font-mono text-xs uppercase tracking-wider mt-1" style={{ color: 'var(--color-text-muted)' }}>
              University
            </span>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="hero-marquee w-full py-4 opacity-0 glass-panel border-x-0">
        <div className="marquee-track whitespace-nowrap">
          <span className="inline-block font-mono text-sm tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
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
