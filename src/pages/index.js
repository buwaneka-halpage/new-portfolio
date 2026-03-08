import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Layout from '@/components/Layout'
import HeroSection from '@/components/sections/HeroSection'
import ChapterBridge from '@/components/ChapterBridge'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import EducationSection from '@/components/sections/EducationSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh(true)
    }, 500)

    return () => clearTimeout(refreshTimeout)
  }, [])

  return (
    <Layout>
      <HeroSection />
      <ChapterBridge number="01" label="THE ORIGIN" />
      <AboutSection />
      <ChapterBridge number="02" label="THE TOOLKIT" />
      <SkillsSection />
      <ChapterBridge number="03" label="THE WORK" />
      <ProjectsSection />
      <ChapterBridge number="04" label="THE JOURNEY" />
      <ExperienceSection />
      <ChapterBridge number="05" label="THE FOUNDATION" />
      <EducationSection />
      {/* No bridge before contact — it's the climax */}
      <ContactSection />
    </Layout>
  )
}
