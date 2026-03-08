import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

const projects = [
  {
    number: '01',
    title: 'FULL-STACK PRODUCT STORE',
    description: 'E-commerce platform with auth, search, cart, payments',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: '/ecom.webp',
    liveLink: '#',
    githubLink: '#',
    inProgress: true,
  },
  {
    number: '02',
    title: 'MY HUMBLE PORTFOLIO',
    description: 'Personal portfolio with smooth animations',
    tags: ['Next.js', 'Tailwind', 'GSAP'],
    image: '/portfolio.png',
    liveLink: '#',
    githubLink: 'https://github.com/hhh-berzerk/new-portfolio.git',
  },
  {
    number: '03',
    title: 'TINDOG WEBSITE CLONE',
    description: 'Creative dog-themed website clone',
    tags: ['HTML', 'CSS', 'Bootstrap'],
    image: '/TinDog.png',
    liveLink: 'https://hhh-berzerk.github.io/TinDog/',
    githubLink: 'https://github.com/hhh-berzerk/TinDog.git',
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const previewRefs = useRef([])
  const rowRefs = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    // Row entrance animations
    const rows = sectionRef.current.querySelectorAll('.project-row')
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

    // Cursor-following image preview for each project
    const quickToX = []
    const quickToY = []

    projects.forEach((_, i) => {
      const preview = previewRefs.current[i]
      const row = rowRefs.current[i]
      if (!preview || !row) return

      const qx = gsap.quickTo(preview, 'x', { duration: 0.3, ease: 'power2.out' })
      const qy = gsap.quickTo(preview, 'y', { duration: 0.3, ease: 'power2.out' })
      quickToX.push(qx)
      quickToY.push(qy)

      const handleMouseEnter = () => {
        gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
      }

      const handleMouseLeave = () => {
        gsap.to(preview, { autoAlpha: 0, scale: 0.9, duration: 0.2, ease: 'power2.in' })
      }

      const handleMouseMove = (e) => {
        qx(e.clientX - 150)
        qy(e.clientY - 100)
      }

      row.addEventListener('mouseenter', handleMouseEnter)
      row.addEventListener('mouseleave', handleMouseLeave)
      row.addEventListener('mousemove', handleMouseMove)

      row._cleanup = () => {
        row.removeEventListener('mouseenter', handleMouseEnter)
        row.removeEventListener('mouseleave', handleMouseLeave)
        row.removeEventListener('mousemove', handleMouseMove)
      }
    })

    return () => {
      projects.forEach((_, i) => {
        if (rowRefs.current[i]?._cleanup) rowRefs.current[i]._cleanup()
      })
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section">
      <div className="container">
        <p className="section-label">(03) Projects</p>
        <div className="w-full h-px bg-surface-lighter mb-16" />

        <div>
          {projects.map((project, i) => (
            <div key={project.number}>
              <Link
                href={project.liveLink !== '#' ? project.liveLink : (project.githubLink || '#')}
                target="_blank"
                rel="noopener noreferrer"
                ref={(el) => (rowRefs.current[i] = el)}
                className="project-row group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-10 opacity-0 cursor-pointer transition-colors duration-200 hover:bg-surface/50"
              >
                {/* Left side */}
                <div className="flex items-start md:items-center gap-6 mb-4 md:mb-0">
                  <span className="font-display text-2xl md:text-3xl font-bold text-text-subtle group-hover:text-text transition-all duration-200 group-hover:translate-x-2">
                    {project.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-text group-hover:translate-x-2 transition-transform duration-200">
                        {project.title}
                      </h3>
                      {project.inProgress && (
                        <span className="text-accent text-xs font-mono uppercase tracking-wider">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-text-muted text-sm mt-1">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-6 pl-12 md:pl-0">
                  <div className="hidden md:flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wider text-text-subtle border border-surface-lighter px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <FiArrowRight
                    size={20}
                    className="text-text-subtle group-hover:text-accent group-hover:translate-x-1 transition-all duration-200"
                  />
                </div>

                {/* Cursor-following image preview (desktop only) */}
                <div
                  ref={(el) => (previewRefs.current[i] = el)}
                  className="hidden md:block fixed pointer-events-none z-50 opacity-0"
                  style={{ transform: 'scale(0.9)' }}
                >
                  <div className="relative w-[300px] h-[200px] rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </Link>

              {/* Separator */}
              <div className="h-px bg-surface-lighter" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
