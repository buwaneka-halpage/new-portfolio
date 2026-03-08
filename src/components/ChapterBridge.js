import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import DecryptedText from './DecryptedText'

export default function ChapterBridge({ number, label }) {
  const bridgeRef = useRef(null)

  useEffect(() => {
    if (!bridgeRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const numEl = bridgeRef.current.querySelector('.bridge-num')
    const labelEl = bridgeRef.current.querySelector('.bridge-label')

    // Number: scale down from oversized + blur out
    gsap.fromTo(
      numEl,
      { autoAlpha: 0, scale: 1.25, filter: 'blur(20px)' },
      {
        autoAlpha: 1, scale: 1, filter: 'blur(0px)',
        duration: 1.4, ease: 'expo.out',
        scrollTrigger: {
          trigger: bridgeRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Label: letters slide in + blur after number
    gsap.fromTo(
      labelEl,
      { autoAlpha: 0, y: 16, filter: 'blur(8px)', letterSpacing: '0.6em' },
      {
        autoAlpha: 1, y: 0, filter: 'blur(0px)', letterSpacing: '0.3em',
        duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: bridgeRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        delay: 0.2,
      }
    )
  }, [])

  return (
    <div ref={bridgeRef} className="chapter-bridge">
      <span className="bridge-num block font-display text-[8rem] md:text-[12rem] leading-none font-bold text-surface-lighter opacity-0">
        {number}
      </span>
      <span className="bridge-label block font-mono text-sm tracking-[0.3em] uppercase text-text-muted mt-4 opacity-0">
        <DecryptedText
          text={label}
          className="text-text-muted"
          encryptedClassName="text-accent/40"
          speed={35}
          revealDelay={400}
        />
      </span>
    </div>
  )
}
