import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AmbientOrbs() {
  const orb1 = useRef(null)
  const orb2 = useRef(null)
  const orb3 = useRef(null)
  const orb4 = useRef(null)

  useEffect(() => {
    // Each orb drifts on its own slow sine path — different speeds + phases for organic feel
    gsap.to(orb1.current, {
      x: 130, y: 90,
      duration: 14, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })
    gsap.to(orb2.current, {
      x: -110, y: 140,
      duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 4,
    })
    gsap.to(orb3.current, {
      x: 80, y: -120,
      duration: 24, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 8,
    })
    gsap.to(orb4.current, {
      x: -70, y: 80,
      duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2,
    })
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Primary accent orb — top-right */}
      <div
        ref={orb1}
        style={{
          position: 'absolute',
          top: '8%', right: '12%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(168,255,62,0.07) 0%, transparent 68%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
        }}
      />
      {/* Warm ghost orb — center left */}
      <div
        ref={orb2}
        style={{
          position: 'absolute',
          top: '38%', left: '-5%',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(240,237,232,0.035) 0%, transparent 68%)',
          filter: 'blur(70px)',
          borderRadius: '50%',
        }}
      />
      {/* Dim accent orb — bottom-right */}
      <div
        ref={orb3}
        style={{
          position: 'absolute',
          bottom: '10%', right: '5%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(168,255,62,0.045) 0%, transparent 68%)',
          filter: 'blur(60px)',
          borderRadius: '50%',
        }}
      />
      {/* Subtle mid orb — center */}
      <div
        ref={orb4}
        style={{
          position: 'absolute',
          top: '65%', left: '35%',
          width: 450, height: 450,
          background: 'radial-gradient(circle, rgba(168,255,62,0.03) 0%, transparent 68%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
        }}
      />
    </div>
  )
}
