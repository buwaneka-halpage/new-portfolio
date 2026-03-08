import { useRef, useEffect } from 'react'

/**
 * ClickSpark — from React Bits (react-bits.dev), adapted for GSAP-only stack
 * Renders canvas sparks radiating outward from every click point.
 */
export default function ClickSpark({
  sparkColor = '#a8ff3e',
  sparkSize = 8,
  sparkRadius = 22,
  sparkCount = 8,
  duration = 500,
  children,
}) {
  const canvasRef = useRef(null)
  const sparksRef = useRef([])

  // Resize canvas buffer to match the viewport (canvas is position:fixed)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)
    resize()
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Draw loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId

    const draw = (ts) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = ts - spark.startTime
        if (elapsed >= duration) return false

        const t = elapsed / duration
        const eased = t * (2 - t) // ease-out
        const dist = eased * sparkRadius
        const len = sparkSize * (1 - eased)

        const x1 = spark.x + dist * Math.cos(spark.angle)
        const y1 = spark.y + dist * Math.sin(spark.angle)
        const x2 = spark.x + (dist + len) * Math.cos(spark.angle)
        const y2 = spark.y + (dist + len) * Math.sin(spark.angle)

        ctx.globalAlpha = 1 - eased
        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        return true
      })

      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [sparkColor, sparkSize, sparkRadius, duration])

  // Attach click to window — no wrapper div needed, no layout impact
  useEffect(() => {
    const handleClick = (e) => {
      if (!canvasRef.current) return
      const now = performance.now()
      const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
        x: e.clientX,
        y: e.clientY,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      }))
      sparksRef.current.push(...newSparks)
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [sparkCount])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9990,
        }}
      />
      {children}
    </>
  )
}
