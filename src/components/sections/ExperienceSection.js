import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const experiences = [
  {
    number: '01',
    title: 'FOUNDER',
    organization: 'CritiCo',
    period: 'Feb 2026 — Present',
    description:
      'Founded an AI-focused venture building agentic systems and data-driven products. Lead product discovery and delivery across frontend, backend, data, and AI — including an immigration CRM, Temple Gate Solicitors' RAG assistant, and the Prime Apostille website.',
  },
  {
    number: '02',
    title: 'SOFTWARE ENGINEER',
    organization: 'Mobile App Mart',
    period: 'Feb 2026 — Jul 2026',
    description:
      'Independently built an end-to-end invoice automation platform for Studio Nicholson (UK) — Gmail monitoring, AI PDF extraction, invoice-coding rules, Xero sync, and a React review dashboard. Configured Google Cloud, OAuth, and Gmail APIs for secure ingestion.',
  },
  {
    number: '03',
    title: 'SOFTWARE ENGINEER',
    organization: 'AIESEC in Sri Lanka',
    period: 'Mar 2025 — Oct 2025',
    description:
      'Built and maintained the AIESEC Exchange Data Platform and internal apps with Next.js, TypeScript, Node.js, and MongoDB. Migrated exchange data from legacy SQL to MongoDB and developed operational dashboards and data-management tools.',
  },
  {
    number: '04',
    title: 'CHAIRPERSON',
    organization: 'SLIoT Challenge 2026',
    period: 'Dec 2025 — May 2026',
    description:
      'Led a cross-functional committee delivering Sri Lanka's national IoT competition with IESL and SLT-Mobitel across university, school, and open categories over a five-month cycle.',
  },
  {
    number: '05',
    title: 'ASSISTANT DIRECTOR — PARTNERSHIP DEVELOPMENT',
    organization: 'CSE Student Society',
    period: 'Aug 2025 — Present',
    description:
      'Driving partnership development for the Computer Science & Engineering Student Society at the University of Moratuwa.',
  },
  {
    number: '06',
    title: 'oGT MARKET EXPANSION TEAM LEADER',
    organization: 'AIESEC in Sri Lanka',
    period: 'Jul 2024 — Mar 2025',
    description:
      'Led market expansion for outgoing global talent exchanges — facilitating B2B partnerships and coordinating international talent initiatives.',
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
      { y: 40, autoAlpha: 0, filter: 'blur(10px)' },
      {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
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
