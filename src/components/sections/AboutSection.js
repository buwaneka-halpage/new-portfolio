import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'

export default function AboutSection() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current

    // Statement text — word-by-word stagger
    const words = section.querySelectorAll('.statement-word')
    gsap.fromTo(
      words,
      { y: 30, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.02,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Image clip-path wipe reveal
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    // Bio columns fade in
    const bioCols = section.querySelectorAll('.bio-col')
    gsap.fromTo(
      bioCols,
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bioCols[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  const statement =
    "I'm a Computer Science student at the University of Moratuwa, driven by curiosity and passionate about building for the web."

  const skillsList = [
    'REACT', 'NEXT.JS', 'NODE', 'PYTHON', 'JAVA',
    'GSAP', 'TAILWIND', 'MONGODB', 'EXPRESS', 'GIT',
  ]
  const marqueeSkills = skillsList.join(' \u00B7 ') + ' \u00B7 '

  return (
    <section id="about" ref={sectionRef} className="section">
      <div className="container">
        {/* Section label */}
        <p className="section-label">(01) About</p>
        <div className="w-full h-px bg-surface-lighter mb-16" />

        {/* Statement text — large display */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl w-full mb-16 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-purple)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <h2
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl relative z-10"
            style={{ color: 'var(--color-text-main)' }}
          >
            {statement.split(' ').map((word, i) => (
              <span key={i} className="statement-word inline-block mr-[0.3em] opacity-0" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Full-width image with clip-path reveal */}
        <div
          ref={imageRef}
          className="relative w-full overflow-hidden rounded-3xl mb-16 border border-white/10 shadow-2xl"
          style={{ height: 'clamp(300px, 50vh, 600px)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
        >
          <Image
            src="/Buwaneka.jpg"
            alt="Buwaneka Halpage"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)]/80 via-transparent to-transparent mix-blend-multiply" />
        </div>

        {/* Two-column biography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bio-col opacity-0 glass-panel p-8 rounded-2xl">
            <p className="leading-relaxed text-lg" style={{ color: 'var(--color-text-muted)' }}>
              My journey began with simple coding challenges and evolved into a passion
              for building efficient, user-friendly applications. I focus on creating
              full-stack solutions that combine clean architecture with engaging interfaces.
            </p>
          </div>
          <div className="bio-col opacity-0 glass-panel p-8 rounded-2xl">
            <p className="leading-relaxed text-lg" style={{ color: 'var(--color-text-muted)' }}>
              Outside academics, I actively work with AIESEC and IEEE, developing
              strong leadership and communication skills. These experiences have shaped
              my approach to collaborative project work and problem-solving.
            </p>
          </div>
        </div>
      </div>

      {/* Skills marquee */}
      <div className="w-full py-6 overflow-hidden glass-panel border-x-0">
        <div className="marquee-track whitespace-nowrap">
          <span className="inline-block font-display text-lg md:text-xl font-bold tracking-wider uppercase" style={{ color: 'var(--color-accent-teal)' }}>
            {marqueeSkills.repeat(4)}
          </span>
        </div>
      </div>
    </section>
  )
}
