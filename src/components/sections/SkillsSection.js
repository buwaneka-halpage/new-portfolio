import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS', 'GraphQL', 'GSAP', 'Webpack / Vite'],
  },
  {
    title: 'Backend & Data',
    skills: ['Node.js', 'Python', 'Go', 'Java', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Nginx', 'Linux', 'CI / CD'],
  },
  {
    title: 'Tools & Practices',
    skills: ['Git', 'Figma', 'Jest / Cypress', 'Jira', 'Postman', 'REST APIs', 'Microservices', 'TDD'],
  },
]

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function useScramble() {
  return useCallback((el, original) => {
    let frame = 0
    const total = 18
    const id = setInterval(() => {
      el.textContent = original
        .split('')
        .map((char, i) => {
          if (char === ' ' || char === '/' || char === '.') return char
          if (frame / total > i / original.length) return char
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        })
        .join('')
      frame++
      if (frame > total) {
        el.textContent = original
        clearInterval(id)
      }
    }, 22)
    return id
  }, [])
}

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const scramble = useScramble()

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    skillCategories.forEach((_, colIndex) => {
      const items = sectionRef.current.querySelectorAll(`.skill-col-${colIndex} .skill-item`)
      gsap.fromTo(
        items,
        { y: 24, autoAlpha: 0, filter: 'blur(8px)' },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          stagger: 0.06,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          delay: colIndex * 0.08,
        }
      )
    })

    // Text scramble on hover
    const items = sectionRef.current.querySelectorAll('.skill-item')
    const cleanups = []
    items.forEach((item) => {
      const textEl = item.querySelector('.skill-text')
      if (!textEl) return
      const original = textEl.textContent
      let intervalId = null

      const onEnter = () => {
        if (intervalId) clearInterval(intervalId)
        intervalId = scramble(textEl, original)
      }

      item.addEventListener('mouseenter', onEnter)
      cleanups.push(() => {
        item.removeEventListener('mouseenter', onEnter)
        if (intervalId) clearInterval(intervalId)
        textEl.textContent = original
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [scramble])

  return (
    <section id="skills" ref={sectionRef} className="section">
      <div className="container">
        <p className="section-label">(02) Skills</p>
        <div className="w-full h-px bg-surface-lighter mb-16" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {skillCategories.map((category, colIndex) => (
            <div key={category.title} className={`skill-col-${colIndex}`}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-8">
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.skills.map((skill) => (
                  <li key={skill} className="skill-item group opacity-0">
                    <span
                      className="skill-text block font-display font-bold text-text transition-colors duration-200 group-hover:text-accent"
                      style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}
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
