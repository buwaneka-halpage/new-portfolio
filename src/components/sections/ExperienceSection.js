import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const experiences = [
  {
    number: '01',
    title: 'SOFTWARE ENGINEER',
    organization: 'AIESEC in Sri Lanka',
    period: 'Feb 2025 — Present',
    description:
      'Developed and maintained software applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality solutions.',
  },
  {
    number: '02',
    title: 'oGT MED TEAM LEADER',
    organization: 'AIESEC',
    period: 'Jul 2024 — Feb 2025',
    description:
      'Led a team to facilitate global talent exchanges. Handled outgoing talent management and supported the selection and training of new members.',
  },
  {
    number: '03',
    title: 'FIELD REPRESENTATIVE',
    organization: 'University of Moratuwa',
    period: 'Mar 2025 — Present',
    description:
      'Elected as a Field representative for 23rd batch of Computer Science and Engineering. Coordinated between faculty and students to address academic concerns.',
  },
]

export default function ExperienceSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const rows = sectionRef.current.querySelectorAll('.exp-row')
    gsap.fromTo(
      rows,
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="section">
      <div className="container">
        <p className="section-label">(04) Experience</p>
        <div className="w-full h-px bg-surface-lighter mb-16" />

        <div>
          {experiences.map((exp) => (
            <div key={exp.number}>
              <div className="exp-row group flex flex-col md:flex-row md:items-start justify-between py-8 md:py-10 opacity-0">
                {/* Left side */}
                <div className="flex items-start gap-6 mb-4 md:mb-0 flex-1">
                  <span className="font-display text-2xl md:text-3xl font-bold text-text-subtle group-hover:text-text transition-all duration-200 group-hover:translate-x-2">
                    {exp.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-text group-hover:translate-x-2 transition-transform duration-200">
                      {exp.title}
                    </h3>
                    <p className="text-accent text-sm font-mono mt-1">
                      {exp.organization}
                    </p>
                    <p className="text-text-muted text-sm mt-2 max-w-xl">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Right side — period */}
                <span className="font-mono text-xs text-text-subtle uppercase tracking-wider pl-12 md:pl-0 md:text-right whitespace-nowrap mt-1">
                  {exp.period}
                </span>
              </div>

              {/* Separator */}
              <div className="h-px bg-surface-lighter" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
