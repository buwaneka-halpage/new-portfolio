import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only show custom cursor on devices with fine pointer (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (!dotRef.current || !ringRef.current) return

    const dot = dotRef.current
    const ring = ringRef.current

    // Use quickTo for performant cursor tracking
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power2.out' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power2.out' })
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.15, ease: 'power2.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.15, ease: 'power2.out' })

    const handleMouseMove = (e) => {
      xDot(e.clientX - 3)
      yDot(e.clientY - 3)
      xRing(e.clientX - 20)
      yRing(e.clientY - 20)
    }

    const handleMouseEnterInteractive = () => {
      ring.classList.add('hovering')
    }

    const handleMouseLeaveInteractive = () => {
      ring.classList.remove('hovering')
    }

    // Add hover detection to all interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor="hover"], input, textarea')
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive)
        el.addEventListener('mouseleave', handleMouseLeaveInteractive)
      })
      return interactives
    }

    window.addEventListener('mousemove', handleMouseMove)
    let interactives = addHoverListeners()

    // Re-scan for interactive elements periodically (handles dynamic content)
    const rescanInterval = setInterval(() => {
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive)
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive)
      })
      interactives = addHoverListeners()
    }, 2000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(rescanInterval)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive)
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
