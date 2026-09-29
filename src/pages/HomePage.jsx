import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { navItems } from '../data/navigation'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { prefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Education } from '../sections/Education'
import { Experience } from '../sections/Experience'
import { Hero } from '../sections/Hero'
import { Interests } from '../sections/Interests'
import { Projects } from '../sections/Projects'
import { Skills } from '../sections/Skills'

/**
 * The one-page portfolio. Routes such as /about or /skills render this page
 * and scroll to the matching section (passed in as `sectionId`).
 */
export function HomePage({ sectionId }) {
  const location = useLocation()
  // The navigation this page first rendered with (a direct visit or a link from another page).
  const initialLocationKey = useRef(location.key)
  const sectionLabel = navItems.find((item) => item.id === sectionId)?.label

  useDocumentTitle(sectionLabel)

  // location.key changes on every navigation, even when clicking the current link again.
  useEffect(() => {
    // Jump instantly when the page first opens; scroll smoothly for in-page navigation.
    const isInitialNavigation = location.key === initialLocationKey.current
    const behavior = isInitialNavigation || prefersReducedMotion() ? 'instant' : 'smooth'

    if (!sectionId) {
      window.scrollTo({ top: 0, behavior })
      return
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior, block: 'start' })
  }, [sectionId, location.key])

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Interests />
      <Contact />
    </>
  )
}
