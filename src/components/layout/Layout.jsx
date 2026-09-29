import { Outlet, useLocation } from 'react-router-dom'
import { AmbientBackground } from './AmbientBackground'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout() {
  const { pathname } = useLocation()
  // All section routes share the home page, so they share one transition key.
  const transitionKey = pathname.startsWith('/projects/') ? pathname : 'home'

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
