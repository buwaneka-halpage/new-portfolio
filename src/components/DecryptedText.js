import { useEffect, useState, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&'

export default function DecryptedText({
  text,
  className = '',
  encryptedClassName = 'text-text-muted',
  speed = 40,
  revealDelay = 0,
}) {
  // Start with real text so SSR and client initial render match exactly
  const [chars, setChars] = useState(() => text.split(''))
  const containerRef = useRef(null)
  const revealedRef = useRef(0)   // track progress without being a dep
  const intervalRef = useRef(null)

  const startScramble = () => {
    revealedRef.current = 0
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      const revealed = revealedRef.current

      setChars(text.split('').map((ch, i) => {
        if (i < revealed) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }))

      revealedRef.current += 1

      if (revealed >= text.length) {
        clearInterval(intervalRef.current)
        // Settle on real text
        setChars(text.split(''))
      }
    }, speed)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(startScramble, revealDelay)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      clearInterval(intervalRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span ref={containerRef} aria-label={text} className="inline-block whitespace-pre-wrap">
      {chars.map((char, i) => (
        <span key={i} className={i < revealedRef.current ? className : encryptedClassName}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
