import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function ChapterBridge({ number, label }) {
  const bridgeRef = useRef(null)

  useEffect(() => {
    if (!bridgeRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const els = bridgeRef.current.querySelectorAll('.bridge-el')

    gsap.fromTo(
      els,
      { y: 30, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bridgeRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [])

  return (
    <div ref={bridgeRef} className="chapter-bridge">
      <span className="bridge-el block font-display text-[8rem] md:text-[12rem] leading-none font-bold text-surface-lighter opacity-0">
        {number}
      </span>
      <span className="bridge-el block font-mono text-sm tracking-[0.3em] uppercase text-text-muted mt-4 opacity-0">
        {label}
      </span>
    </div>
  )
}
