import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems, sectionIds } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { cx } from '../../utils/cx'
import { ThemeSwitcher } from '../ui/ThemeSwitcher'
import { GitHubLink } from './GitHubLink'

const spyIds = ['home', ...sectionIds]

export function Navbar() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 8)
  const menuButtonRef = useRef(null)

  const routeSection = pathname === '/' ? 'home' : pathname.slice(1)
  const isHomePage = spyIds.includes(routeSection)
  const spiedSection = useScrollSpy(spyIds, { enabled: isHomePage, preferredId: isHomePage ? routeSection : null })

  // On the home page the scroll position decides the active link.
  const activeId = isHomePage ? (spiedSection ?? routeSection) : null

  // Add a glass background once the page is scrolled.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // While the mobile menu is open: lock page scroll and close it with Escape.
  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    // Close the menu if the window grows to the desktop layout.
    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    const handleResize = () => desktopQuery.matches && setIsMenuOpen(false)

    document.body.classList.add('menu-open')
    document.addEventListener('keydown', handleKeyDown)
    desktopQuery.addEventListener('change', handleResize)
    return () => {
      document.body.classList.remove('menu-open')
      document.removeEventListener('keydown', handleKeyDown)
      desktopQuery.removeEventListener('change', handleResize)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={cx('navbar', (isScrolled || isMenuOpen) && 'is-solid')}>
      <div className="container navbar__container">
        <nav className="navbar__inner" aria-label="Main">
          <Link to="/" className="brand" onClick={closeMenu}>
            {profile.name}
          </Link>

          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={cx('nav-link', activeId === item.id && 'is-active')}
                  aria-current={activeId === item.id ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <ThemeSwitcher className="navbar__theme" />
            <GitHubLink />
            <button
              ref={menuButtonRef}
              type="button"
              className="icon-btn menu-toggle"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div id="mobile-menu" className="mobile-menu">
            <ul className="mobile-menu__links">
              {navItems.map((item, index) => (
                <li key={item.id} style={{ '--i': index }}>
                  <Link
                    to={item.path}
                    className={cx('mobile-menu__link', activeId === item.id && 'is-active')}
                    aria-current={activeId === item.id ? 'page' : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mobile-menu__footer">
              <span className="mobile-menu__label">Theme</span>
              <ThemeSwitcher showLabels />
            </div>
          </div>
        )}
      </div>

      {/* Dims the page behind the open menu; tapping it closes the menu. */}
      {isMenuOpen && <div className="mobile-menu__backdrop" onClick={closeMenu} aria-hidden="true" />}
    </header>
  )
}
