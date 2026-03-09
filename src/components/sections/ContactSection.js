import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import { FiGithub, FiLinkedin, FiMail, FiArrowRight, FiCheck } from 'react-icons/fi'
import SpotlightCard from '../SpotlightCard'

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

export default function ContactSection() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const submitRef = useRef(null)
  const dividerRef = useRef(null)
  const orbRef = useRef(null)
  const successRef = useRef(null)
  const iconRefs = useRef([])

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Something went wrong')
      }

      setFormStatus({ isSubmitting: false, isSubmitted: true, error: null })
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setFormStatus((prev) => ({ ...prev, isSubmitted: false })), 5000)
    } catch (err) {
      setFormStatus({ isSubmitting: false, isSubmitted: false, error: err.message })
    }
  }

  // Animate success message in whenever it appears
  useEffect(() => {
    if (!formStatus.isSubmitted || !successRef.current) return
    gsap.fromTo(
      successRef.current,
      { autoAlpha: 0, y: 12, filter: 'blur(6px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }
    )
  }, [formStatus.isSubmitted])

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current

    // ── Divider line draws itself in ─────────────────────
    if (dividerRef.current) {
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // ── Ambient orb floats slowly ─────────────────────────
    if (orbRef.current) {
      gsap.to(orbRef.current, {
        y: -40, x: 30,
        duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
    }

    // ── CTA heading character reveal ──────────────────────
    const lines = ['.cta-line-1 .char', '.cta-line-2 .char']
    lines.forEach((selector, i) => {
      gsap.fromTo(
        selector,
        { y: '110%', filter: 'blur(8px)' },
        {
          y: '0%',
          filter: 'blur(0px)',
          stagger: 0.03,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.22,
        }
      )
    })

    // ── Form fields: slide from left + blur ───────────────
    if (formRef.current) {
      const fields = formRef.current.querySelectorAll('.form-field')
      gsap.fromTo(
        fields,
        { x: -40, autoAlpha: 0, filter: 'blur(10px)' },
        {
          x: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          stagger: 0.14,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // ── Contact info: slide from right + blur ─────────────
    const infoItems = section.querySelectorAll('.contact-info')
    gsap.fromTo(
      infoItems,
      { x: 40, autoAlpha: 0, filter: 'blur(10px)' },
      {
        x: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        stagger: 0.14,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: infoItems[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    // ── Social icons: scale bounce entrance ───────────────
    const icons = iconRefs.current.filter(Boolean)
    gsap.fromTo(
      icons,
      { scale: 0, rotation: -30, autoAlpha: 0 },
      {
        scale: 1,
        rotation: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: icons[0],
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    )

    // ── Submit button: idle glow pulse ────────────────────
    const btn = submitRef.current
    if (btn) {
      gsap.to(btn, {
        boxShadow: '0 0 40px rgba(168,255,62,0.55), 0 0 80px rgba(168,255,62,0.2)',
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5,
      })

      // Magnetic pull
      const handleMouseMove = (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: 'power2.out' })
      }
      const handleMouseLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      }

      btn.addEventListener('mousemove', handleMouseMove)
      btn.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        btn.removeEventListener('mousemove', handleMouseMove)
        btn.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  const socialLinks = [
    { href: 'https://github.com/hhh-berzerk', label: 'GitHub', icon: <FiGithub size={22} /> },
    { href: 'https://lk.linkedin.com/in/buwaneka-halpage-4351122a7', label: 'LinkedIn', icon: <FiLinkedin size={22} /> },
    { href: 'mailto:hhhbhuwaneka@gmail.com', label: 'Email', icon: <FiMail size={22} /> },
  ]

  return (
    <section id="contact" ref={sectionRef} className="section relative overflow-hidden">

      {/* Floating ambient orb */}
      <div
        ref={orbRef}
        className="pointer-events-none absolute"
        style={{
          top: '5%', right: '-5%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(168,255,62,0.07) 0%, transparent 65%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
        }}
        aria-hidden="true"
      />

      <div className="container relative">
        {/* Section label */}
        <p className="section-label">(05) Contact</p>

        {/* Animated divider */}
        <div
          ref={dividerRef}
          className="w-full h-px bg-surface-lighter mb-16"
          style={{ transformOrigin: 'left center' }}
        />

        {/* Massive CTA heading */}
        <div className="mb-16">
          <h2
            className="font-display font-extrabold leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 7.5vw, 8rem)' }}
          >
            <span className="block overflow-hidden whitespace-nowrap">
              <SplitChars text="LET'S WORK" className="cta-line-1" />
            </span>
            <span className="block overflow-hidden whitespace-nowrap">
              <SplitChars text="TOGETHER." className="cta-line-2" />
            </span>
          </h2>
        </div>

        {/* Form + Info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Form ─────────────────────────────────────── */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">

            {/* Name */}
            <div className="form-field opacity-0">
              <label className="block font-mono text-xs uppercase tracking-widest text-text-muted mb-3">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="peer w-full bg-transparent py-3 text-text text-lg focus:outline-none"
                  style={{ borderBottom: '1px solid #222' }}
                />
                {/* Accent underline that draws in on focus */}
                <span className="absolute bottom-0 left-0 h-px w-full bg-accent scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100" />
              </div>
            </div>

            {/* Email */}
            <div className="form-field opacity-0">
              <label className="block font-mono text-xs uppercase tracking-widest text-text-muted mb-3">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="peer w-full bg-transparent py-3 text-text text-lg focus:outline-none"
                  style={{ borderBottom: '1px solid #222' }}
                />
                <span className="absolute bottom-0 left-0 h-px w-full bg-accent scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100" />
              </div>
            </div>

            {/* Message */}
            <div className="form-field opacity-0">
              <label className="block font-mono text-xs uppercase tracking-widest text-text-muted mb-3">
                Message
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="peer w-full bg-transparent py-3 text-text text-lg focus:outline-none resize-none"
                  style={{ borderBottom: '1px solid #222' }}
                />
                <span className="absolute bottom-0 left-0 h-px w-full bg-accent scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:scale-x-100" />
              </div>
            </div>

            {/* Submit */}
            <div className="form-field opacity-0">
              <button
                ref={submitRef}
                type="submit"
                disabled={formStatus.isSubmitting}
                className="inline-flex items-center gap-3 bg-accent text-bg font-display font-bold text-lg px-10 py-4 transition-transform duration-200 disabled:opacity-60"
              >
                {formStatus.isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="block w-1.5 h-1.5 rounded-full bg-bg"
                          style={{ animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite` }}
                        />
                      ))}
                    </span>
                    SENDING
                  </span>
                ) : (
                  <>
                    SEND MESSAGE
                    <FiArrowRight size={20} />
                  </>
                )}
              </button>
            </div>

            {/* Success message */}
            {formStatus.isSubmitted && (
              <p
                ref={successRef}
                className="flex items-center gap-2 text-accent font-mono text-sm opacity-0"
              >
                <FiCheck size={16} />
                Message sent — I&apos;ll be in touch soon.
              </p>
            )}

            {formStatus.error && (
              <p className="text-red-400 font-mono text-sm">{formStatus.error}</p>
            )}
          </form>

          {/* ── Contact info ──────────────────────────────── */}
          <SpotlightCard
            className="flex flex-col justify-center space-y-8 border border-surface-lighter p-8 md:p-12"
            spotlightColor="rgba(168, 255, 62, 0.06)"
          >
            <div className="contact-info opacity-0">
              <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-2">Email</p>
              <Link
                href="mailto:hhhbhuwaneka@gmail.com"
                className="font-display text-xl md:text-2xl font-bold text-accent hover:underline transition-all duration-200"
              >
                hhhbhuwaneka@gmail.com
              </Link>
            </div>

            <div className="contact-info opacity-0">
              <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-2">Phone</p>
              <Link
                href="tel:+94740224877"
                className="font-display text-xl md:text-2xl font-bold text-text hover:text-accent transition-colors duration-200"
              >
                +94 74 022 4877
              </Link>
            </div>

            <div className="contact-info opacity-0">
              <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-2">Location</p>
              <p className="font-display text-xl md:text-2xl font-bold text-text">
                Colombo, Sri Lanka
              </p>
            </div>

            {/* Social icons with bounce entrance */}
            <div className="contact-info opacity-0 flex gap-5 pt-4">
              {socialLinks.map(({ href, label, icon }, i) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  ref={(el) => (iconRefs.current[i] = el)}
                  className="text-text-subtle hover:text-accent hover:scale-110 transition-all duration-200"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>

      {/* Bouncing dots keyframe */}
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  )
}
