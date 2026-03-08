import { useRef, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Stars, Float } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import AbstractGeometry from './AbstractGeometry'
import { gsap } from 'gsap'

export default function Scene() {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        // Basic bare-bones scroll progress setup for the scene to ingest globally
        const onScroll = () => {
            // Calculate normalized scroll position 0 to 1
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight
            if (totalScroll > 0) {
                setScrollProgress(window.scrollY / totalScroll)
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <div id="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
            <Canvas dpr={[1, 1.5]} style={{ width: '100vw', height: '100vh', display: 'block' }}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />

                {/* Environment & Lighting Setup */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#e82a7a" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#0de2c8" />
                <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#7000ff" castShadow />

                {/* Cinematic Backdrop */}
                <color attach="background" args={['#050508']} />

                {/* Distant Stars for depth */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={1} fade speed={1} />

                {/* The Main Object that reacts to scroll */}
                <AbstractGeometry scrollProgress={scrollProgress} />

                {/* Extra floating geometry based on scroll config */}
                <Float
                    speed={1.5}
                    rotationIntensity={2}
                    floatIntensity={3}
                    position={[-4, 2, -5]}
                >
                    <mesh>
                        <torusGeometry args={[0.8, 0.2, 16, 100]} />
                        <meshStandardMaterial color="#0de2c8" wireframe opacity={0.1} transparent />
                    </mesh>
                </Float>

                <Float
                    speed={2}
                    rotationIntensity={3}
                    floatIntensity={5}
                    position={[4, -3, -8]}
                >
                    <mesh>
                        <octahedronGeometry args={[1.5]} />
                        <meshStandardMaterial color="#e82a7a" emissive="#e82a7a" emissiveIntensity={0.2} wireframe opacity={0.15} transparent />
                    </mesh>
                </Float>

                {/* Post Processing for Cinematic organic feel */}
                <EffectComposer disableNormalPass multisampling={4}>
                    <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.2} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
