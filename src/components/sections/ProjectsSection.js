import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

const projects = [
  {
    number: '01',
    title: 'FULL-STACK E-COMMERCE PLATFORM',
    description: 'Complete online store with JWT auth, product search, cart, and Stripe payment integration',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    liveLink: '#',
    githubLink: '#',
    inProgress: true,
  },
  {
    number: '02',
    title: 'AI CODE ANALYSIS TOOL',
    description: 'Browser-based tool that uses the OpenAI API to review code, flag bugs, and suggest improvements',
    tags: ['Python', 'FastAPI', 'OpenAI API', 'React'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80',
    liveLink: '#',
    githubLink: '#',
  },
  {
    number: '03',
    title: 'REAL-TIME ANALYTICS DASHBOARD',
    description: 'Live data visualisation dashboard built with WebSockets and D3.js — tracks custom events in real time',
    tags: ['React', 'WebSockets', 'D3.js', 'Node.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    liveLink: '#',
    githubLink: '#',
  },
  {
    number: '04',
    title: 'WORKFORCE MANAGEMENT APP',
    description: 'Multi-role HR web app with attendance tracking, leave management, and role-based access control',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    liveLink: '#',
    githubLink: '#',
  },
  {
    number: '05',
    title: 'DEV ENVIRONMENT AUTOMATOR',
    description: 'Shell + GitHub Actions setup that spins up a full dev environment with one command using Docker',
    tags: ['Docker', 'GitHub Actions', 'Bash', 'AWS EC2'],
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
    liveLink: '#',
    githubLink: '#',
  },
  {
    number: '06',
    title: 'PROJECT SCAFFOLDING CLI',
    description: 'npm CLI tool to scaffold Node.js and React projects with opinionated folder structure and configs',
    tags: ['TypeScript', 'Node.js', 'Jest'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80',
    liveLink: '#',
    githubLink: '#',
  },
  {
    number: '07',
    title: 'MOBILE SOCIAL APP',
    description: 'React Native app prototype for student networking with real-time chat and profile matching',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    liveLink: '#',
    githubLink: 'https://github.com/hhh-berzerk/new-portfolio.git',
  },
  {
    number: '08',
    title: 'AI AGENT AUTOMATION SUITE',
    description: 'Multi-step AI agent workflows built with LangChain and n8n — automates research, summarisation, and email reporting pipelines',
    tags: ['Python', 'LangChain', 'n8n', 'OpenAI API'],
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    liveLink: '#',
    githubLink: '#',
  },
  {
    number: '09',
    title: 'WEB SCRAPING DATA PIPELINE',
    description: 'Automated scraper using Playwright and BeautifulSoup to collect structured data, clean it, and push to a MongoDB store',
    tags: ['Python', 'Playwright', 'BeautifulSoup', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    liveLink: '#',
    githubLink: '#',
  },
  {
    number: '10',
    title: 'CTF CHALLENGE TOOLKIT',
    description: 'Personal collection of recon, exploitation, and OSINT scripts built and refined while competing in CTF competitions',
    tags: ['Python', 'Bash', 'Kali Linux', 'OSINT'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
    liveLink: '#',
    githubLink: '#',
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
      { y: 40, autoAlpha: 0, filter: 'blur(10px)' },
      {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Cursor-following image preview for each project
    const cleanups = []

    projects.forEach((_, i) => {
      const preview = previewRefs.current[i]
      const row = rowRefs.current[i]
      if (!preview || !row) return

      const qx = gsap.quickTo(preview, 'x', { duration: 0.3, ease: 'power2.out' })
      const qy = gsap.quickTo(preview, 'y', { duration: 0.3, ease: 'power2.out' })

      const onEnter = () => gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
      const onLeave = () => gsap.to(preview, { autoAlpha: 0, scale: 0.9, duration: 0.2, ease: 'power2.in' })
      const onMove  = (e) => { qx(e.clientX - 150); qy(e.clientY - 100) }

      row.addEventListener('mouseenter', onEnter)
      row.addEventListener('mouseleave', onLeave)
      row.addEventListener('mousemove',  onMove)

      cleanups.push(() => {
        row.removeEventListener('mouseenter', onEnter)
        row.removeEventListener('mouseleave', onLeave)
        row.removeEventListener('mousemove',  onMove)
      })
    })

    // Scroll doesn't fire mouseleave — hide every preview immediately on any scroll
    const hideAll = () => {
      previewRefs.current.forEach((p) => {
        if (p) gsap.to(p, { autoAlpha: 0, scale: 0.9, duration: 0.15, overwrite: true })
      })
    }
    window.addEventListener('scroll', hideAll, { passive: true })

    return () => {
      cleanups.forEach((fn) => fn())
      window.removeEventListener('scroll', hideAll)
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
