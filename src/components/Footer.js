import Link from 'next/link'
import { FiGithub, FiLinkedin, FiFacebook, FiMail, FiInstagram } from 'react-icons/fi'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/hhh-berzerk', icon: FiGithub },
  { name: 'LinkedIn', href: 'https://lk.linkedin.com/in/buwaneka-halpage-4351122a7', icon: FiLinkedin },
  { name: 'Facebook', href: 'https://www.facebook.com/people/Buwaneka-Halpage/pfbid02bCvYdYkPNsYqUeaTDS2f55nHRkXyHpvUvccSDFnuy5C4XN3rW4hy8rLTS1QUWEBPl/', icon: FiFacebook },
  { name: 'Instagram', href: 'https://www.instagram.com/hhh_berzerk/', icon: FiInstagram },
  { name: 'Email', href: 'mailto:hhhbhuwaneka@gmail.com', icon: FiMail },
]

export default function Footer() {
  return (
    <footer className="border-t border-surface-lighter py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-subtle text-sm">
          &copy; {new Date().getFullYear()} Buwaneka Halpage
        </p>

        <div className="flex items-center gap-5">
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="text-text-subtle hover:text-accent transition-colors duration-200"
              >
                <Icon size={18} />
              </Link>
            )
          })}
        </div>

        <p className="text-text-subtle text-xs font-mono">
          Built with Next.js & GSAP
        </p>
      </div>
    </footer>
  )
}
