import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML / CSS', 'GSAP'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'MongoDB', 'Python', 'Java', 'MySQL'],
  },
  {
    title: 'Tools & Other',
    skills: ['Git / GitHub', 'VS Code', 'Figma', 'Docker', 'Vercel', 'Linux'],
  },
]

export default function SkillsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    // Stagger skill items per column
    skillCategories.forEach((_, colIndex) => {
      const items = sectionRef.current.querySelectorAll(`.skill-col-${colIndex} .skill-item`)

      gsap.fromTo(
        items,
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="section">
      <div className="container">
        <p className="section-label">(02) Skills</p>
        <div className="w-full h-px bg-surface-lighter mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {skillCategories.map((category, colIndex) => (
            <div key={category.title} className={`skill-col-${colIndex}`}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-8">
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="skill-item group opacity-0"
                  >
                    <span
                      className="block font-display font-bold text-text transition-all duration-200 group-hover:translate-x-2 group-hover:text-accent"
                      style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}
                    >
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
