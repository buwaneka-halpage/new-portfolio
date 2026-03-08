import '@/styles/globals.css'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)
    gsap.config({ nullTargetWarn: false })

    // Initialize Lenis smooth scroll
    let lenis
    const initLenis = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default
      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      })

      // Expose globally so Navbar can call lenis.scrollTo()
      window.__lenis = lenis

      // Connect Lenis to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
    }

    initLenis()

    // Force refresh after mount
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true)
    }, 500)

    return () => {
      clearTimeout(refreshTimeout)
      if (lenis) lenis.destroy()
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
