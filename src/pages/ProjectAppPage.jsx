import { ArrowLeft } from 'lucide-react'
import { Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppLoading } from '../components/projects/AppLoading'
import { GitHubIcon } from '../components/ui/GitHubIcon'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { getProjectBySlug } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { projectApps } from '../projects'
import { NotFoundPage } from './NotFoundPage'

/**
 * A project on its own page: a slim top bar and the app filling the screen.
 * Project cards open this route in a new tab.
 */
export function ProjectAppPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  useDocumentTitle(project?.name ?? 'Page not found')

  if (!project) {
    return (
      <main id="main" className="app-page app-page--missing">
        <NotFoundPage />
      </main>
    )
  }

  const ProjectApp = projectApps[project.slug]

  return (
    <div className="app-page" data-accent={project.accent}>
      <header className="app-bar">
        <Link to="/" className="app-bar__back">
          <ArrowLeft size={15} aria-hidden="true" />
          <span>Kev Channoeurn</span>
        </Link>
        <h1 className="app-bar__title">{project.name}</h1>
        <div className="app-bar__actions">
          <a
            className="icon-btn"
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.name} source code on GitHub`}
            title="Source code on GitHub"
          >
            <GitHubIcon size={16} />
          </a>
          {!project.hasOwnThemeToggle && <ThemeToggle />}
        </div>
      </header>

      <main id="main" className="app-page__main">
        <Suspense fallback={<AppLoading />}>
          <ProjectApp />
        </Suspense>
      </main>
    </div>
  )
}
