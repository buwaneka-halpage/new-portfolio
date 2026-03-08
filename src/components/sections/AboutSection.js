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

    // Statement text — word-by-word stagger with blur
    const words = section.querySelectorAll('.statement-word')
    gsap.fromTo(
      words,
      { y: 30, autoAlpha: 0, filter: 'blur(6px)' },
      {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        stagger: 0.025,
        duration: 0.9,
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

    // Bio columns — blur + slide
    const bioCols = section.querySelectorAll('.bio-col')
    gsap.fromTo(
      bioCols,
      { y: 40, autoAlpha: 0, filter: 'blur(10px)' },
      {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        stagger: 0.25,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bioCols[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
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
            src="/Buwaneka.jpeg"
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
              contribute to open-source projects in the Node.js and Kubernetes ecosystems.
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
