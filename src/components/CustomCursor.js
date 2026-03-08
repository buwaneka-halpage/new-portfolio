import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const t1Ref = useRef(null)
  const t2Ref = useRef(null)
  const t3Ref = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (!dotRef.current || !ringRef.current) return

    const dot = dotRef.current
    const ring = ringRef.current
    const t1 = t1Ref.current
    const t2 = t2Ref.current
    const t3 = t3Ref.current

    // Dot: snaps instantly
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power2.out' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power2.out' })
    // Primary ring: slight lag
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.15, ease: 'power2.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.15, ease: 'power2.out' })
    // Ghost trails: increasing lag for a jellyfish tail
    const xT1 = gsap.quickTo(t1, 'x', { duration: 0.35, ease: 'power2.out' })
    const yT1 = gsap.quickTo(t1, 'y', { duration: 0.35, ease: 'power2.out' })
    const xT2 = gsap.quickTo(t2, 'x', { duration: 0.55, ease: 'power2.out' })
    const yT2 = gsap.quickTo(t2, 'y', { duration: 0.55, ease: 'power2.out' })
    const xT3 = gsap.quickTo(t3, 'x', { duration: 0.75, ease: 'power2.out' })
    const yT3 = gsap.quickTo(t3, 'y', { duration: 0.75, ease: 'power2.out' })

    const handleMouseMove = (e) => {
      xDot(e.clientX - 3);   yDot(e.clientY - 3)
      xRing(e.clientX - 20); yRing(e.clientY - 20)
      xT1(e.clientX - 14);   yT1(e.clientY - 14)
      xT2(e.clientX - 10);   yT2(e.clientY - 10)
      xT3(e.clientX - 7);    yT3(e.clientY - 7)
    }

    const handleEnter = () => ring.classList.add('hovering')
    const handleLeave = () => ring.classList.remove('hovering')

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor="hover"], input, textarea')
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })
      return interactives
    }

    window.addEventListener('mousemove', handleMouseMove)
    let interactives = addHoverListeners()

    const rescanInterval = setInterval(() => {
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
      interactives = addHoverListeners()
    }, 2000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(rescanInterval)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={t1Ref} className="cursor-trail cursor-trail-1" />
      <div ref={t2Ref} className="cursor-trail cursor-trail-2" />
      <div ref={t3Ref} className="cursor-trail cursor-trail-3" />
    </>
  )
}
