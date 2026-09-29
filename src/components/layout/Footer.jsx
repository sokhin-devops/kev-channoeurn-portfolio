import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile } from '../../data/profile'
import { FutureLink } from '../ui/FutureLink'
import { GitHubIcon } from '../ui/GitHubIcon'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="brand" aria-label={`${profile.name}, home`}>
              <span className="brand__mark" aria-hidden="true">
                {profile.initials}
              </span>
              <span className="brand__name">{profile.name}</span>
            </Link>
            <p className="footer__role">{profile.role}</p>
            <p className="footer__tagline">“{profile.tagline}”</p>
          </div>

          <div className="footer__links">
            <a className="footer__link" href={`mailto:${profile.email}`}>
              <Mail size={15} aria-hidden="true" />
              {profile.email}
            </a>
            <FutureLink
              href={profile.links.github}
              label="GitHub"
              icon={GitHubIcon}
              variant="ghost"
              size="sm"
              className="footer__future"
            />
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>Built with React and Vite.</p>
        </div>
      </div>
    </footer>
  )
}
