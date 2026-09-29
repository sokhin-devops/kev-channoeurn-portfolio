import { ArrowLeft } from 'lucide-react'
import { Suspense, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AmbientBackground } from '../components/layout/AmbientBackground'
import { AppLoading } from '../components/projects/AppLoading'
import { ThemeSwitcher } from '../components/ui/ThemeSwitcher'
import { getProjectBySlug } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { projectApps } from '../projects'
import { NotFoundPage } from './NotFoundPage'

/** Full-screen version of a project app, without the portfolio navigation. */
export function ProjectDemoPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  useDocumentTitle(project ? `${project.name} (Demo)` : 'Page not found')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!project) {
    return (
      <div className="app-shell">
        <AmbientBackground />
        <main id="main">
          <NotFoundPage />
        </main>
      </div>
    )
  }

  const ProjectApp = projectApps[project.slug]

  return (
    <div className="app-shell demo-page" data-accent={project.accent}>
      <a href="#main" className="skip-link">
        Skip to app
      </a>
      <AmbientBackground />
      <header className="demo-bar">
        <div className="demo-bar__inner">
          <Link to={`/projects/${project.slug}`} className="btn btn--ghost btn--sm">
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Project details</span>
          </Link>
          <p className="demo-bar__title">
            {project.name}
            <span className="demo-bar__style">{project.style}</span>
          </p>
          <ThemeSwitcher />
        </div>
      </header>
      <main id="main" className="demo-page__main page-transition" tabIndex={-1}>
        <h1 className="sr-only">{project.name} demo</h1>
        <Suspense fallback={<AppLoading />}>
          <ProjectApp />
        </Suspense>
      </main>
    </div>
  )
}
