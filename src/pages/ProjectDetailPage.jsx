import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2 } from 'lucide-react'
import { Suspense, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppLoading } from '../components/projects/AppLoading'
import { BrowserFrame } from '../components/ui/BrowserFrame'
import { Button } from '../components/ui/Button'
import { GitHubIcon } from '../components/ui/GitHubIcon'
import { Reveal } from '../components/ui/Reveal'
import { getProjectBySlug, projects } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { projectApps } from '../projects'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  useDocumentTitle(project?.name ?? 'Page not found')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!project) return <NotFoundPage />

  const ProjectApp = projectApps[project.slug]
  const index = projects.indexOf(project)
  const previousProject = projects[(index - 1 + projects.length) % projects.length]
  const nextProject = projects[(index + 1) % projects.length]

  const story = [
    { title: 'Overview', text: project.overview },
    { title: 'Problem', text: project.problem },
    { title: 'Solution', text: project.solution },
  ]

  return (
    <article className="project-detail" data-accent={project.accent} aria-labelledby="project-title">
      <div className="container">
        <Link to="/projects" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          All projects
        </Link>

        <header className="detail-header">
          <Reveal as="h1" id="project-title" className="detail-header__title">
            {project.name}
          </Reveal>
          <Reveal as="p" delay={1} className="detail-header__lead">
            {project.description}
          </Reveal>
          <Reveal as="p" delay={2} className="detail-header__tech">
            {project.technologies.map((tech) => tech.name).join(' · ')}
          </Reveal>
          <Reveal delay={3} className="detail-header__actions">
            <Button to={`/projects/${project.slug}/demo`} icon={Maximize2}>
              Open Full Screen
            </Button>
            {project.links.github && (
              <Button
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                icon={GitHubIcon}
                iconTrailing={ArrowUpRight}
              >
                Source Code
              </Button>
            )}
            {project.links.demo && (
              <Button href={project.links.demo} target="_blank" rel="noreferrer" variant="ghost" iconTrailing={ArrowUpRight}>
                Live Demo
              </Button>
            )}
          </Reveal>
        </header>

        <Reveal as="section" className="detail-preview" aria-label="Live preview">
          <BrowserFrame title={project.name}>
            <Suspense fallback={<AppLoading />}>
              <ProjectApp />
            </Suspense>
          </BrowserFrame>
          <p className="detail-preview__caption">Live preview — this is the working app. Give it a try.</p>
        </Reveal>

        <div className="detail-columns">
          {story.map((item, itemIndex) => (
            <Reveal as="section" key={item.title} delay={itemIndex} className="detail-block">
              <h2 className="detail-block__title">{item.title}</h2>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>

        <div className="detail-columns">
          <Reveal as="section" className="detail-block">
            <h2 className="detail-block__title">Features</h2>
            <ul className="dash-list">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" delay={1} className="detail-block">
            <h2 className="detail-block__title">Built with</h2>
            <dl className="tech-list">
              {project.technologies.map((tech) => (
                <div key={tech.name}>
                  <dt>{tech.name}</dt>
                  <dd>{tech.usage}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal as="section" delay={2} className="detail-block">
            <h2 className="detail-block__title">What I practised</h2>
            <ul className="dash-list">
              {project.learnings.map((learning) => (
                <li key={learning}>{learning}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <nav className="pager" aria-label="More projects">
          <Link to={`/projects/${previousProject.slug}`} className="pager__link">
            <span className="pager__label">
              <ArrowLeft size={14} aria-hidden="true" /> Previous
            </span>
            <span className="pager__name">{previousProject.name}</span>
          </Link>
          <Link to={`/projects/${nextProject.slug}`} className="pager__link pager__link--next">
            <span className="pager__label">
              Next <ArrowRight size={14} aria-hidden="true" />
            </span>
            <span className="pager__name">{nextProject.name}</span>
          </Link>
        </nav>
      </div>
    </article>
  )
}
