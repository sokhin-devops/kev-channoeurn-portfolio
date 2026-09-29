import { ArrowUp } from 'lucide-react'
import { profile } from '../../data/profile'
import { prefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export function Footer() {
  const year = new Date().getFullYear()

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'instant' : 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {year} {profile.name}
        </p>
        <p className="footer__tagline">{profile.tagline}</p>
        <button type="button" className="footer__top" onClick={scrollToTop}>
          Back to top
          <ArrowUp size={14} aria-hidden="true" />
        </button>
      </div>
    </footer>
  )
}
