import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    if (!barRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
  }, [])

  return <div ref={barRef} className="scroll-progress" />
}
