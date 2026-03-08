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
    title: 'THE COMPLETE WEB DEVELOPMENT BOOTCAMP',
    institution: 'Udemy — Dr. Angela Yu',
    period: '2023',
  },
  {
    number: '04',
    title: 'HACKERRANK GOLD IN PYTHON',
    institution: 'HackerRank',
    period: '2023',
  },
  {
    number: '05',
    title: 'C++ BEGINNER COURSE',
    institution: 'Sololearn',
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
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.12,
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
    <section id="education" ref={sectionRef} className="section">
      <div className="container">
        <p className="section-label">(05) Education</p>
        <div className="w-full h-px bg-surface-lighter mb-16" />

        {/* Education */}
        <div className="glass-panel rounded-3xl overflow-hidden p-2 md:p-6 pb-0 shadow-2xl mb-16">
          {education.map((item) => (
            <div key={item.number}>
              <div className="edu-row group flex flex-col md:flex-row md:items-start justify-between p-6 md:p-8 opacity-0 transition-colors duration-300 hover:bg-white/5 rounded-2xl mb-2">
                <div className="flex items-start gap-6 mb-4 md:mb-0 flex-1">
                  <span className="font-display text-2xl md:text-3xl font-bold transition-all duration-300 group-hover:translate-x-2" style={{ color: 'var(--color-text-muted)' }}>
                    {item.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold transition-transform duration-300 group-hover:translate-x-2" style={{ color: 'var(--color-text-main)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm font-mono mt-2" style={{ color: 'var(--color-accent-teal)' }}>
                      {item.institution}
                    </p>
                    {item.description && (
                      <p className="text-sm mt-3 max-w-xl font-light leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <span className="font-mono text-xs uppercase tracking-wider pl-12 md:pl-0 md:text-right whitespace-nowrap mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  {item.period}
                </span>
              </div>
              <div className="h-px bg-white/5" />
            </div>
          ))}
        </div>

        {/* Certifications sub-header */}
        <h3 className="font-mono text-xs uppercase tracking-widest mt-16 mb-8 pl-4" style={{ color: 'var(--color-accent-purple)' }}>
          Certifications
        </h3>

        <div className="glass-panel rounded-3xl overflow-hidden p-2 md:p-6 pb-0 shadow-2xl">
          {certifications.map((item) => (
            <div key={item.number}>
              <div className="edu-row group flex flex-col md:flex-row md:items-start justify-between p-6 md:p-8 opacity-0 transition-colors duration-300 hover:bg-white/5 rounded-2xl mb-2">
                <div className="flex items-start gap-6 mb-4 md:mb-0 flex-1">
                  <span className="font-display text-2xl md:text-3xl font-bold transition-all duration-300 group-hover:translate-x-2" style={{ color: 'var(--color-text-muted)' }}>
                    {item.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold transition-transform duration-300 group-hover:translate-x-2" style={{ color: 'var(--color-text-main)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm font-mono mt-2" style={{ color: 'var(--color-accent-teal)' }}>
                      {item.institution}
                    </p>
                  </div>
                </div>

                <span className="font-mono text-xs uppercase tracking-wider pl-12 md:pl-0 md:text-right whitespace-nowrap mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  {item.period}
                </span>
              </div>
              <div className="h-px bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
