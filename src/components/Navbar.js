import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

const navLinks = [
  { number: '01', name: 'About',      href: '#about'      },
  { number: '02', name: 'Skills',     href: '#skills'     },
  { number: '03', name: 'Projects',   href: '#projects'   },
  { number: '04', name: 'Experience', href: '#experience' },
  { number: '05', name: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const overlayRef  = useRef(null)   // mobile full-screen menu
  const wipeRef     = useRef(null)   // nav transition wipe
  const linksRef    = useRef([])

  // ── Mobile menu animation ──────────────────────────────────────
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return
    document.body.style.overflow = 'hidden'

    gsap.fromTo(overlayRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.3, ease: 'power2.out' }
    )
    gsap.fromTo(linksRef.current.filter(Boolean),
      { y: 60, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.6, ease: 'power4.out', delay: 0.15 }
    )

    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ── Nav click: wipe transition then scroll ─────────────────────
  const handleNavClick = (e, href) => {
    e.preventDefault()

    const target = document.querySelector(href)
    if (!target || !wipeRef.current) return

    setIsOpen(false)

    const tl = gsap.timeline()

    // 1. Wipe IN — lime bar sweeps left → right
    tl.fromTo(wipeRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.42, ease: 'power3.inOut' }
    )

    // 2. Jump scroll behind the bar
    tl.call(() => {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { immediate: true, offset: -80 })
      } else {
        target.scrollIntoView()
      }
    })

    // 3. Wipe OUT — bar sweeps left, revealing section
    tl.fromTo(wipeRef.current,
      { scaleX: 1, transformOrigin: 'right center' },
      { scaleX: 0, duration: 0.42, ease: 'power3.inOut' }
    )
  }

  return (
    <>
      {/* ── Transition wipe overlay ─────────────────────────────── */}
      <div
        ref={wipeRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{ background: '#a8ff3e', transform: 'scaleX(0)', transformOrigin: 'left center' }}
        aria-hidden="true"
      />

      <header className="fixed top-0 w-full z-50 mix-blend-difference">
        <nav className="container flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-display text-xl font-bold text-white tracking-tight cursor-pointer"
          >
            BH
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative font-mono text-xs uppercase tracking-wider text-white py-2 cursor-pointer"
                >
                  <span className="text-text-subtle mr-1">({link.number})</span>
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-px bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-[60] w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </nav>

        {/* Mobile full-screen overlay */}
        {isOpen && (
          <div
            ref={overlayRef}
            className="fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center opacity-0"
          >
            <button
              className="absolute top-6 right-6 w-8 h-8 flex flex-col justify-center items-center"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <span className="block w-6 h-px bg-white rotate-45 translate-y-[0.5px]" />
              <span className="block w-6 h-px bg-white -rotate-45 -translate-y-[0.5px]" />
            </button>

            <nav className="text-center">
              <ul className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <li key={link.name}>
                    <a
                      ref={(el) => (linksRef.current[i] = el)}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block font-display text-4xl sm:text-5xl font-bold text-white hover:text-accent transition-colors duration-200 opacity-0 cursor-pointer"
                    >
                      <span className="font-mono text-sm text-text-subtle mr-3">
                        {link.number}
                      </span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
