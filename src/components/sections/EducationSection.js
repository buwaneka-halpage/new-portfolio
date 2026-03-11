import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const education = [
  {
    number: '01',
    title: 'B.SC (HONS) IN COMPUTER SCIENCE & ENGINEERING',
    institution: 'University of Moratuwa',
    period: '2024 — Present',
    description:
      'Currently pursuing a bachelor\'s degree with a focus on Cyber Security, software engineering, and artificial intelligence.',
  },
  {
    number: '02',
    title: 'ADVANCED LEVEL EDUCATION',
    institution: 'Rahula College Matara',
    period: '2020 — 2023',
    description:
      'Completed advanced level studies in Mathematics, Physics, and Chemistry, achieving excellent results that secured admission to the University of Moratuwa.',
  },
]

const certifications = [
  {
    number: '03',
    title: 'MACHINE LEARNING SPECIALIZATION',
    institution: 'DeepLearning.AI / Coursera',
    period: '2024',
  },
  {
    number: '04',
    title: 'JR PENETRATION TESTER PATH',
    institution: 'TryHackMe',
    period: '2024',
  },
  {
    number: '05',
    title: 'AWS CLOUD FOUNDATIONS',
    institution: 'Amazon Web Services',
    period: '2024',
  },
  {
    number: '06',
    title: 'CI/CD PIPELINE BUILDER LAB',
    institution: 'Amazon Web Services',
    period: '2024',
  },
  {
    number: '07',
    title: 'THE COMPLETE WEB DEVELOPMENT BOOTCAMP',
    institution: 'Udemy — Dr. Angela Yu',
    period: '2022',
  },
  {
    number: '08',
    title: 'TYPESCRIPT: THE COMPLETE DEVELOPER\'S GUIDE',
    institution: 'Udemy — Stephen Grider',
    period: '2022',
  },
]

export default function EducationSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const rows = sectionRef.current.querySelectorAll('.edu-row')
    gsap.fromTo(
      rows,
      { y: 40, autoAlpha: 0, filter: 'blur(10px)' },
      {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        stagger: 0.1,
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
    <section id="education" ref={sectionRef} className="section">
      <div className="container">
        <p className="section-label">(05) Education</p>
        <div className="w-full h-px bg-surface-lighter mb-16" />

        {/* Education */}
        <div>
          {education.map((item) => (
            <div key={item.number}>
              <div className="edu-row group flex flex-col md:flex-row md:items-start justify-between py-8 md:py-10 opacity-0">
                <div className="flex items-start gap-6 mb-4 md:mb-0 flex-1">
                  <span className="font-display text-2xl md:text-3xl font-bold text-text-subtle group-hover:text-text transition-all duration-200 group-hover:translate-x-2">
                    {item.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-text group-hover:translate-x-2 transition-transform duration-200">
                      {item.title}
                    </h3>
                    <p className="text-accent text-sm font-mono mt-1">
                      {item.institution}
                    </p>
                    {item.description && (
                      <p className="text-text-muted text-sm mt-2 max-w-xl">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <span className="font-mono text-xs text-text-subtle uppercase tracking-wider pl-12 md:pl-0 md:text-right whitespace-nowrap mt-1">
                  {item.period}
                </span>
              </div>
              <div className="h-px bg-surface-lighter" />
            </div>
          ))}
        </div>

        {/* Certifications sub-header */}
        <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted mt-16 mb-8">
          Certifications
        </h3>
        <div className="h-px bg-surface-lighter mb-0" />

        <div>
          {certifications.map((item) => (
            <div key={item.number}>
              <div className="edu-row group flex flex-col md:flex-row md:items-start justify-between py-8 md:py-10 opacity-0">
                <div className="flex items-start gap-6 mb-4 md:mb-0 flex-1">
                  <span className="font-display text-2xl md:text-3xl font-bold text-text-subtle group-hover:text-text transition-all duration-200 group-hover:translate-x-2">
                    {item.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold text-text group-hover:translate-x-2 transition-transform duration-200">
                      {item.title}
                    </h3>
                    <p className="text-accent text-sm font-mono mt-1">
                      {item.institution}
                    </p>
                  </div>
                </div>

                <span className="font-mono text-xs text-text-subtle uppercase tracking-wider pl-12 md:pl-0 md:text-right whitespace-nowrap mt-1">
                  {item.period}
                </span>
              </div>
              <div className="h-px bg-surface-lighter" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
