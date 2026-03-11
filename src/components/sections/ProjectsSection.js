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

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)

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
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="section">
      <div className="container">
        <p className="section-label">(03) Projects</p>
        <div className="w-full h-px bg-surface-lighter mb-16" />

        <div>
          {projects.map((project) => (
            <div key={project.number}>
              <Link
                href={project.liveLink !== '#' ? project.liveLink : (project.githubLink || '#')}
                target="_blank"
                rel="noopener noreferrer"
                className="project-row group flex flex-col md:flex-row md:items-center gap-6 py-8 md:py-10 opacity-0 cursor-pointer transition-colors duration-200 hover:bg-surface/50"
              >
                {/* Left: number + title + description */}
                <div className="flex items-start md:items-center gap-6 flex-1 min-w-0">
                  <span className="font-display text-2xl md:text-3xl font-bold text-text-subtle group-hover:text-text transition-all duration-200 group-hover:translate-x-2 flex-shrink-0">
                    {project.number}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-text group-hover:translate-x-2 transition-transform duration-200">
                        {project.title}
                      </h3>
                      {project.inProgress && (
                        <span className="text-accent text-xs font-mono uppercase tracking-wider flex-shrink-0">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-text-muted text-sm mt-1">{project.description}</p>
                  </div>
                </div>

                {/* Center: image — fades in on hover, desktop only */}
                <div className="hidden md:block flex-shrink-0 w-[220px] h-[140px] relative rounded-lg overflow-hidden opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Right: tags + arrow */}
                <div className="flex items-center gap-4 md:flex-shrink-0 pl-12 md:pl-0">
                  <div className="hidden lg:flex gap-2 flex-wrap justify-end">
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
                    className="text-text-subtle group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                  />
                </div>
              </Link>

              <div className="h-px bg-surface-lighter" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
