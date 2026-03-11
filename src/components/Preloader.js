import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  const counterRef = useRef(null)
  const barRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const counter = counterRef.current
    const bar = barRef.current
    const label = labelRef.current
    if (!container) return

    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onComplete?.()
      },
    })

    // Label fades in
    tl.fromTo(
      label,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )

    // Counter 000 → 100 + progress bar
    tl.fromTo(
      counter,
      { textContent: 0 },
      {
        textContent: 100,
        duration: 2,
        ease: 'power2.inOut',
        snap: { textContent: 1 },
        onUpdate() {
          counter.textContent = String(Math.round(parseFloat(counter.textContent))).padStart(3, '0')
        },
      },
      0.3
    )
    tl.fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: 1, duration: 2, ease: 'power2.inOut' },
      0.3
    )

    // Hold at 100
    tl.to({}, { duration: 0.3 })

    // Exit — fade out counter + label
    tl.to([counter, label], {
      autoAlpha: 0,
      y: -30,
      filter: 'blur(6px)',
      duration: 0.4,
      ease: 'power3.in',
    })
    tl.to(bar, { autoAlpha: 0, duration: 0.3, ease: 'power2.in' }, '-=0.3')

    // Wipe overlay up
    tl.to(container, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power4.inOut',
    })
    tl.set(container, { display: 'none' })

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{ background: '#0a0a0a' }}
    >
      <p
        ref={labelRef}
        className="font-mono text-xs tracking-widest uppercase text-text-muted mb-6 invisible"
      >
        Loading
      </p>
      <span
        ref={counterRef}
        className="font-display font-bold text-text"
        style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}
      >
        000
      </span>
      <div className="absolute bottom-0 left-0 w-full h-[2px]">
        <div
          ref={barRef}
          className="h-full w-full bg-accent origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  )
}
