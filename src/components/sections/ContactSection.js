import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from 'react-icons/fi'

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

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

    // Simulated submission
    setTimeout(() => {
      setFormStatus({ isSubmitting: false, isSubmitted: true, error: null })
      setFormData({ name: '', email: '', message: '' })

      setTimeout(() => {
        setFormStatus((prev) => ({ ...prev, isSubmitted: false }))
      }, 5000)
    }, 1500)
  }

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current

    // Character reveal for "LET'S WORK" and "TOGETHER."
    const lines = ['.cta-line-1 .char', '.cta-line-2 .char']
    lines.forEach((selector, i) => {
      gsap.to(selector, {
        y: '0%',
        stagger: 0.03,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
        delay: i * 0.2,
      })
    })

    // Form fields stagger in
    if (formRef.current) {
      const fields = formRef.current.querySelectorAll('.form-field')
      gsap.fromTo(
        fields,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Contact info fade in
    const infoItems = section.querySelectorAll('.contact-info')
    gsap.fromTo(
      infoItems,
      { y: 20, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: infoItems[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Magnetic button effect
    const btn = submitRef.current
    if (btn) {
      const handleMouseMove = (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' })
      }
      const handleMouseLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
      }

      btn.addEventListener('mousemove', handleMouseMove)
      btn.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        btn.removeEventListener('mousemove', handleMouseMove)
        btn.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="section">
      <div className="container">
        {/* Massive CTA heading */}
        <div className="mb-16">
          <h2
            className="font-display font-extrabold leading-[0.9] tracking-tight"
            style={{ fontSize: 'clamp(3rem, 10vw, 9rem)' }}
          >
            <span className="block overflow-hidden">
              <SplitChars text="LET'S WORK" className="cta-line-1" />
            </span>
            <span className="block overflow-hidden">
              <SplitChars text="TOGETHER." className="cta-line-2" />
            </span>
          </h2>
        </div>

        {/* Form + Info grid */}
        <div className="glass-panel rounded-3xl p-8 lg:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative overflow-hidden">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="form-field opacity-0">
              <label className="block font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent-purple)' }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-[var(--color-accent-teal)] transition-colors duration-300"
                style={{ color: 'var(--color-text-main)' }}
              />
            </div>

            <div className="form-field opacity-0">
              <label className="block font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent-purple)' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-[var(--color-accent-teal)] transition-colors duration-300"
                style={{ color: 'var(--color-text-main)' }}
              />
            </div>

            <div className="form-field opacity-0">
              <label className="block font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent-purple)' }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-[var(--color-accent-teal)] transition-colors duration-300 resize-none"
                style={{ color: 'var(--color-text-main)' }}
              />
            </div>

            <div className="form-field opacity-0 pt-4">
              <button
                ref={submitRef}
                type="submit"
                disabled={formStatus.isSubmitting}
                className="inline-flex items-center gap-3 font-display font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'var(--color-accent-magenta)',
                  color: 'var(--color-bg-deep)',
                  boxShadow: '0 0 20px rgba(232, 42, 122, 0.4)'
                }}
              >
                {formStatus.isSubmitting ? (
                  'SENDING...'
                ) : (
                  <>
                    SEND MESSAGE
                    <FiArrowRight size={20} />
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 min-h-[24px]">
              {formStatus.isSubmitted && (
                <p className="font-mono text-sm" style={{ color: 'var(--color-accent-teal)' }}>
                  Message sent successfully.
                </p>
              )}
              {formStatus.error && (
                <p className="text-red-400 font-mono text-sm">
                  {formStatus.error}
                </p>
              )}
            </div>
          </form>

          {/* Contact info */}
          <div className="flex flex-col justify-center space-y-10 relative z-10 border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0 lg:pl-12">
            <div className="contact-info opacity-0">
              <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>
                Email
              </p>
              <Link
                href="mailto:hhhbhuwaneka@gmail.com"
                className="font-display text-xl md:text-2xl font-bold transition-all duration-300 hover:opacity-80 inline-block"
                style={{ color: 'var(--color-accent-teal)' }}
              >
                hhhbhuwaneka@gmail.com
              </Link>
            </div>

            <div className="contact-info opacity-0">
              <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>
                Phone
              </p>
              <Link
                href="tel:+94740224877"
                className="font-display text-xl md:text-2xl font-bold transition-colors duration-300 hover:opacity-80 inline-block"
                style={{ color: 'var(--color-text-main)' }}
              >
                +94 74 022 4877
              </Link>
            </div>

            <div className="contact-info opacity-0">
              <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-muted)' }}>
                Location
              </p>
              <p className="font-display text-xl md:text-2xl font-bold" style={{ color: 'var(--color-text-main)' }}>
                Colombo, Sri Lanka
              </p>
            </div>

            <div className="contact-info opacity-0 flex gap-6 pt-6">
              <Link
                href="https://github.com/hhh-berzerk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="transition-colors duration-300 hover:-translate-y-1"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-teal)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                <FiGithub size={28} />
              </Link>
              <Link
                href="https://lk.linkedin.com/in/buwaneka-halpage-4351122a7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-colors duration-300 hover:-translate-y-1"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-teal)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                <FiLinkedin size={28} />
              </Link>
              <Link
                href="mailto:hhhbhuwaneka@gmail.com"
                aria-label="Email"
                className="transition-colors duration-300 hover:-translate-y-1"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent-teal)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                <FiMail size={28} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
