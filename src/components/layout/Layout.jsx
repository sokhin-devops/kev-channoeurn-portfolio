import { Outlet, useLocation } from 'react-router-dom'
import { sectionIds } from '../../data/navigation'
import { usePointerEffects } from '../../hooks/usePointerEffects'
import { AmbientBackground } from './AmbientBackground'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout() {
  const { pathname } = useLocation()
  usePointerEffects()
  // All section routes share the home page, so they share one transition key.
  const isHomeRoute = pathname === '/' || sectionIds.includes(pathname.slice(1))
  const transitionKey = isHomeRoute ? 'home' : pathname

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AmbientBackground />
      <Navbar />
      <main id="main" key={transitionKey} className="page-transition" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
