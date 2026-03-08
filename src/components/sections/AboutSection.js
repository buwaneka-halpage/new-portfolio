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
        <h2
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-16 max-w-4xl"
          style={{ color: '#f0ede8' }}
        >
          {statement.split(' ').map((word, i) => (
            <span key={i} className="statement-word inline-block mr-[0.3em] opacity-0">
              {word}
            </span>
          ))}
        </h2>

        {/* Full-width image with clip-path reveal */}
        <div
          ref={imageRef}
          className="relative w-full overflow-hidden rounded-lg mb-16"
          style={{ height: 'clamp(300px, 50vh, 600px)' }}
        >
          <Image
            src="/Buwaneka.jpg"
            alt="Buwaneka Halpage"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Two-column biography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bio-col opacity-0">
            <p className="text-text-muted leading-relaxed">
              My journey began with simple coding challenges and evolved into a passion
              for building efficient, user-friendly applications. I focus on creating
              full-stack solutions that combine clean architecture with engaging interfaces.
            </p>
          </div>
          <div className="bio-col opacity-0">
            <p className="text-text-muted leading-relaxed">
              Outside academics, I actively work with AIESEC and IEEE, developing
              strong leadership and communication skills. These experiences have shaped
              my approach to collaborative project work and problem-solving.
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
