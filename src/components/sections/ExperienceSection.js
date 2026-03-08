import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const experiences = [
  {
    number: '01',
    title: 'SENIOR SOFTWARE ENGINEER',
    organization: 'TechScale Ltd',
    period: 'Jan 2023 — Present',
    description:
      'Lead a team of 8 engineers building distributed systems for a fintech platform serving 500k+ users. Architected Redis caching layer that reduced p99 API latency by 40%. Designed event-driven microservices on AWS EKS processing 2M+ daily transactions.',
  },
  {
    number: '02',
    title: 'SOFTWARE ENGINEER II',
    organization: 'DataVision Inc',
    period: 'Jun 2021 — Dec 2022',
    description:
      'Built a real-time analytics pipeline ingesting 50M+ daily events using ClickHouse and Kafka. Designed a GraphQL federation layer serving 300+ enterprise clients. Maintained an open-source SDK adopted by 1k+ developers in the data-engineering community.',
  },
  {
    number: '03',
    title: 'SOFTWARE ENGINEER',
    organization: 'CloudBridge Systems',
    period: 'Mar 2020 — May 2021',
    description:
      'Developed microservices and RESTful APIs for a multi-cloud management platform. Implemented Kubernetes HPA policies that cut infrastructure costs by 35%. Introduced integration testing with Cypress, raising coverage from 28% to 78%.',
  },
  {
    number: '04',
    title: 'FRONTEND DEVELOPER',
    organization: 'PixelForge Studio',
    period: 'Aug 2019 — Feb 2020',
    description:
      'Delivered pixel-perfect, accessible interfaces for 15+ client products across fintech and e-commerce. Built a shared React component library that reduced per-project setup time by 50%. Introduced Storybook and visual regression testing to the design-handoff workflow.',
  },
  {
    number: '05',
    title: 'SOFTWARE ENGINEERING INTERN',
    organization: 'MegaSystems International',
    period: 'Jan 2019 — Jul 2019',
    description:
      'Contributed to internal developer-tooling improvements used by 500+ engineers. Shipped a CLI code-scaffolding utility, a CI dashboard widget, and several Node.js performance patches merged into the main monorepo.',
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
