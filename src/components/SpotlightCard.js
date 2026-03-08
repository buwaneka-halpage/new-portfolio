import { useRef } from 'react'

/**
 * SpotlightCard — from React Bits (react-bits.dev)
 * A card wrapper where a radial-gradient spotlight follows the cursor.
 * Uses CSS custom properties for zero re-renders on mousemove.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(168, 255, 62, 0.07)',
}) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    ref.current.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  )
}
