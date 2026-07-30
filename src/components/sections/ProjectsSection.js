import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

const projects = [
  {
    number: '01',
    title: 'SMART CAMPUS DIGITAL TWIN',
    description:
      'Multi-service IoT platform for sensor ingestion, real-time streaming, analytics, ML, and campus-state visualization',
    tags: ['FastAPI', 'Kafka', 'MQTT', 'TimescaleDB', 'Spark', 'React'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    liveLink: '#',
    githubLink: '#',
  },
  {
    number: '02',
    title: 'HEMASMIND — AITHON 2026 ELITE 10',
    description:
      'AI pharmaceutical supply-chain intelligence for Hemas Pharmaceuticals — agentic procurement workflows with live Socket.IO dashboards',
    tags: ['Next.js', 'FastAPI', 'CrewAI', 'PostgreSQL', 'Socket.IO'],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80',
    liveLink: 'https://criti-co.vercel.app',
    githubLink: 'https://github.com/buwaneka-halpage/CritiCo',
  },
  {
    number: '03',
    title: 'FRESHLENS',
    description:
      'AI inventory and spoilage monitoring for retailers — Expo vendor app, Next.js dashboard, and PyTorch CNN pipeline via Celery',
    tags: ['FastAPI', 'PyTorch', 'Expo', 'Next.js', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
    liveLink: '#',
    githubLink: 'https://github.com/FreshLens-AI/FreshLens-AI',
  },
  {
    number: '04',
    title: 'SPOT THE DIFFERENCE — OCTWAVE FINALIST',
    description:
      'ML pipeline detecting added, removed, and changed objects between image pairs with open-vocabulary detection and ensemble box fusion',
    tags: ['Python', 'OWL-ViT', 'CLIP', 'PyTorch'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80',
    liveLink: '#',
    githubLink: 'https://github.com/buwaneka-halpage/spot-the-difference',
  },
  {
    number: '05',
    title: 'SMART GROCERY PLANNER — AGENTRIX 2026',
    description:
      'Multi-agent meal planner for Sri Lankan households — budget nutrition guidance, supermarket price RAG, and basket optimization',
    tags: ['CrewAI', 'Gemini', 'RAG', 'Next.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
    liveLink: '#',
    githubLink: 'https://github.com/Agentrix-ComES/AGENTRIX26-TEAM38-CritiCo',
  },
  {
    number: '06',
    title: 'KANDYPACK LOGISTICS PLATFORM',
    description:
      'Multi-role logistics platform with warehouse RBAC, order workflows, truck and rail scheduling, and fleet analytics',
    tags: ['FastAPI', 'React', 'MySQL', 'Docker', 'JWT'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
    liveLink: '#',
    githubLink: 'https://github.com/buwaneka-halpage/kandypack-logistics-platform',
  },
  {
    number: '07',
    title: 'PRIME APOSTILLE',
    description:
      'SEO-ready website for a UK document-legalisation provider — apostille, embassy attestation, translation, and document orders',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    liveLink: 'https://primeapostille.vercel.app',
    githubLink: 'https://github.com/buwaneka-halpage/primeapostille',
  },
  {
    number: '08',
    title: 'TEMPLE GATE RAG ASSISTANT',
    description:
      'Responsive SEO website and retrieval-augmented assistant for Temple Gate Solicitors, grounded in the firm's case studies',
    tags: ['RAG', 'Next.js', 'AI'],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
    liveLink: '#',
    githubLink: 'https://github.com/buwaneka-halpage/temple-gate-rag',
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
