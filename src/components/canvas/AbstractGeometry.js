import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

export default function AbstractGeometry({ scrollProgress = 0 }) {
  const meshRef = useRef()
  const materialRef = useRef()
  
  // Cosmic Colors
  const colors = useMemo(() => ({
    teal: new THREE.Color('#0de2c8'),
    magenta: new THREE.Color('#e82a7a'),
    purple: new THREE.Color('#7000ff'),
    dark: new THREE.Color('#050508')
  }), [])

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return

    const time = state.clock.getElapsedTime()
    
    // Smoothly interpolate properties based on scroll
    // scrollProgress goes from 0 to 1 based on page scroll
    
    // 1. Rotation over time + scroll
    meshRef.current.rotation.x = time * 0.1 + scrollProgress * Math.PI * 2
    meshRef.current.rotation.y = time * 0.15 + scrollProgress * Math.PI * 1.5
    
    // 2. Morphing intensity based on scroll (more chaotic as you scroll down)
    materialRef.current.distort = THREE.MathUtils.lerp(0.3, 0.8, scrollProgress)
    materialRef.current.speed = THREE.MathUtils.lerp(1.5, 4.0, scrollProgress)
    
    // 3. Color Shift based on scroll
    // Start Purple -> Mid Magenta -> End Teal
    let targetColor = colors.purple.clone()
    if (scrollProgress < 0.5) {
      targetColor.lerp(colors.magenta, scrollProgress * 2)
    } else {
      targetColor = colors.magenta.clone().lerp(colors.teal, (scrollProgress - 0.5) * 2)
    }
    
    materialRef.current.color.lerp(targetColor, 0.1)
    
    // 4. Subtle scale bounce based on audio/time or just breathing
    const scale = 1 + Math.sin(time * 2) * 0.05
    meshRef.current.scale.set(scale, scale, scale)
  })

  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={1} // XYZ rotation intensity
      floatIntensity={2} // Up/down float intensity
    >
      <Icosahedron ref={meshRef} args={[2, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#7000ff"
          emissive="#2a0066"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </Icosahedron>
      
      {/* Background wireframe ghost for extra dimension */}
      <Icosahedron args={[2.2, 8]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#e82a7a" 
          wireframe 
          transparent 
          opacity={0.05} 
        />
      </Icosahedron>
    </Float>
  )
}
