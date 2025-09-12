import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { FiDownload, FiMail } from 'react-icons/fi'

export default function HeroSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)
  const buttonsRef = useRef(null)
  const particlesRef = useRef(null)
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Create a dedicated container for particles that won't affect content visibility
    const particlesContainer = document.createElement('div')
    particlesContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none z-0'
    sectionRef.current.appendChild(particlesContainer)
    
    const numParticles = 25 // Slightly more particles
    const particles = []
    
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div')
      // Make particles darker (opacity 0.2 instead of 0.1)
      particle.className = 'absolute rounded-full bg-primary opacity-20'
      
      const size = Math.random() * 25 + 5 // Slightly larger particles
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      
      // Position particles across the entire section
      const leftPosition = Math.random() * 100
      const topPosition = Math.random() * 100
      
      particle.style.left = `${leftPosition}%`
      particle.style.top = `${topPosition}%`
      particle.style.zIndex = '0' // Ensure particles are below content
      
      particlesContainer.appendChild(particle)
      particles.push(particle)
      
      // More dynamic and faster animations
      gsap.to(particle, {
        x: Math.random() * 150 - 75, // Same movement range
        y: Math.random() * 150 - 75, // Same movement range
        duration: Math.random() * 3 + 2, // Much shorter duration for faster movement (was 8+6)
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }
    
    // Create additional fast-moving smaller particles for variety
    for (let i = 0; i < 10; i++) {
      const fastParticle = document.createElement('div')
      fastParticle.className = 'absolute rounded-full bg-primary opacity-15'
      
      const size = Math.random() * 10 + 3 // Smaller particles
      fastParticle.style.width = `${size}px`
      fastParticle.style.height = `${size}px`
      
      const leftPosition = Math.random() * 100
      const topPosition = Math.random() * 100
      
      fastParticle.style.left = `${leftPosition}%`
      fastParticle.style.top = `${topPosition}%`
      
      particlesContainer.appendChild(fastParticle)
      particles.push(fastParticle)
      
      // Very fast animations for these particles
      gsap.to(fastParticle, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        duration: Math.random() * 1.5 + 1, // Very fast movement
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut', // Different easing for variety
      })
    }
    
    // Fixed animations for content - Using from animations with autoAlpha for better visibility handling
    gsap.fromTo(headingRef.current, 
      { y: 50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }
    )
    
    gsap.fromTo(textRef.current, 
      { y: 50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' }
    )
    
    gsap.fromTo(buttonsRef.current, 
      { y: 50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, delay: 0.6, ease: 'power3.out' }
    )
    
    return () => {
      if (particles.length) {
        particles.forEach(particle => {
          gsap.killTweensOf(particle)
        })
      }
      
      particlesContainer?.remove();
    }
  }, [])
  
  return (
    <section 
      id="hero"
      ref={sectionRef}
      className="relative flex items-center min-h-screen pt-20 overflow-hidden"
    >
      {/* Static background gradient for additional visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 z-0"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            ref={headingRef}
            className="mb-6 opacity-0" // Start with opacity 0 to avoid flash
          >
            Buwaneka Halpage
            <span className="block text-2xl md:text-3xl font-normal mt-2 text-primary">
              Aspiring Software Engineer
            </span>
          </h1>
          
          <p 
            ref={textRef}
            className="mb-8 text-lg md:text-xl text-gray-700 dark:text-gray-300 opacity-0" // Start with opacity 0
          >
            A Computer Science and Engineering undergraduate at the University of Moratuwa,
            driven by curiosity and passionate about technology. Ready to bring innovative
            solutions to the digital world.
          </p>
          
          <div 
            ref={buttonsRef}
            className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center opacity-0" // Start with opacity 0
          >
            <Link 
              href="/newresume.pdf"
              className="btn-primary"
              target="_blank"
            >
              <FiDownload className="mr-2" />
              Download CV
            </Link>
            
            <Link 
              href="#contact"
              className="btn-outline"
            >
              <FiMail className="mr-2" />
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 