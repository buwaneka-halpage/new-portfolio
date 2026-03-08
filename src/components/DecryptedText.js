import { useEffect, useState, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&'

/**
 * DecryptedText — inspired by React Bits (react-bits.dev).
 * Rewritten without Framer Motion to match our GSAP-only stack.
 * Animates on scroll into view. Each character is revealed left-to-right
 * while unresolved chars cycle through random glyphs.
 */
export default function DecryptedText({
  text,
  className = '',
  encryptedClassName = 'text-text-muted',
  speed = 40,
  revealDelay = 0,
}) {
  const [display, setDisplay] = useState(() => text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]))
  const [revealedCount, setRevealedCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  // Trigger when in view
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), revealDelay)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [revealDelay])

  // Reveal chars one by one + scramble unrevealed
  useEffect(() => {
    if (!started) return

    const interval = setInterval(() => {
      setRevealedCount((prev) => {
        const next = prev + 1
        if (next > text.length) {
          clearInterval(interval)
          return text.length
        }
        return next
      })

      setDisplay((prev) =>
        prev.map((_, i) => {
          if (i < revealedCount) return text[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
      )
    }, speed)

    return () => clearInterval(interval)
  }, [started, revealedCount, text, speed])

  return (
    <span ref={ref} aria-label={text} className="inline-block whitespace-pre-wrap">
      {display.map((char, i) => (
        <span
          key={i}
          className={i < revealedCount ? className : encryptedClassName}
        >
          {text[i] === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
