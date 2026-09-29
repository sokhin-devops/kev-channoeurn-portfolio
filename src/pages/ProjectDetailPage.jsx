import { ArrowLeft, ArrowRight, Check, Lightbulb, Maximize2, Sparkles, Target, Wrench } from 'lucide-react'
import { Suspense, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AppLoading } from '../components/projects/AppLoading'
import { ProjectLinks } from '../components/projects/ProjectLinks'
import { Badge } from '../components/ui/Badge'
import { BrowserFrame } from '../components/ui/BrowserFrame'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { getProjectBySlug, projects } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { projectApps } from '../projects'
import { NotFoundPage } from './NotFoundPage'

function getLinksNote({ github, demo }) {
  if (github && demo) return 'Browse the source code on GitHub or open the live demo.'
  if (github) return 'The source code is on GitHub. A live demo link will be added once the project is deployed.'
  return 'This project currently runs locally. GitHub and live demo links will be added once it is published.'
}

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

  const storyCards = [
    { title: 'Overview', icon: Sparkles, text: project.overview },
    { title: 'Problem', icon: Target, text: project.problem },
    { title: 'Solution', icon: Lightbulb, text: project.solution },
  ]

  return (
    <article className="project-detail" data-accent={project.accent} aria-labelledby="project-title">
      <div className="project-detail__glow" aria-hidden="true" />

      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li aria-current="page">{project.name}</li>
          </ol>
        </nav>

        <header className="project-detail__header">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow__index">{project.number}</span>
              {project.style}
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h1 id="project-title" className="project-detail__title">
              {project.name}
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="project-detail__tagline">{project.description}</p>
          </Reveal>
          <Reveal as="ul" delay={3} className="badge-list" aria-label="Technologies">
            {project.technologies.map((tech) => (
              <li key={tech.name}>
                <Badge tone="accent">{tech.name}</Badge>
              </li>
            ))}
          </Reveal>
          <Reveal delay={4} className="project-detail__actions">
            <Button to={`/projects/${project.slug}/demo`} icon={Maximize2}>
              Open Full Screen
            </Button>
            <ProjectLinks links={project.links} />
          </Reveal>
        </header>

        <Reveal as="section" className="project-detail__preview" aria-labelledby="preview-title">
          <div className="project-detail__section-head">
            <h2 id="preview-title" className="detail-heading">
              Live preview
            </h2>
            <p className="detail-subtext">This is the working app, not a screenshot. Try it out.</p>
          </div>
          <BrowserFrame title={project.name} badge="Interactive">
            <Suspense fallback={<AppLoading />}>
              <ProjectApp />
            </Suspense>
          </BrowserFrame>
        </Reveal>

        <section className="story-grid" aria-label="Project story">
          {storyCards.map(({ title, icon: StoryIcon, text }, cardIndex) => (
            <Reveal as="div" key={title} delay={cardIndex} className="story-card card">
              <span className="icon-tile" aria-hidden="true">
                <StoryIcon size={18} />
              </span>
              <h2 className="story-card__title">{title}</h2>
              <p>{text}</p>
            </Reveal>
          ))}
        </section>

        <div className="detail-columns">
          <Reveal as="section" className="detail-panel card" aria-labelledby="features-title">
            <h2 id="features-title" className="detail-heading">
              Features
            </h2>
            <ul className="check-grid">
              {project.features.map((feature) => (
                <li key={feature}>
                  <span className="check-grid__icon" aria-hidden="true">
                    <Check size={13} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" delay={1} className="detail-panel card" aria-labelledby="tech-title">
            <h2 id="tech-title" className="detail-heading">
              Technologies
            </h2>
            <ul className="tech-usage">
              {project.technologies.map((tech) => (
                <li key={tech.name}>
                  <span className="tech-usage__name">{tech.name}</span>
                  <span className="tech-usage__text">{tech.usage}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="detail-columns">
          <Reveal as="section" className="detail-panel card" aria-labelledby="learnings-title">
            <h2 id="learnings-title" className="detail-heading">
              <Wrench size={17} aria-hidden="true" /> What this project practises
            </h2>
            <ul className="plain-list">
              {project.learnings.map((learning) => (
                <li key={learning}>{learning}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" delay={1} className="detail-panel card" aria-labelledby="links-title">
            <h2 id="links-title" className="detail-heading">
              Source code &amp; demo
            </h2>
            <p className="detail-subtext">{getLinksNote(project.links)}</p>
            <div className="detail-panel__links">
              <ProjectLinks links={project.links} />
            </div>
          </Reveal>
        </div>

        <nav className="project-pager" aria-label="More projects">
          <Link to={`/projects/${previousProject.slug}`} className="project-pager__link card">
            <span className="project-pager__label">
              <ArrowLeft size={15} aria-hidden="true" /> Previous project
            </span>
            <span className="project-pager__name">{previousProject.name}</span>
          </Link>
          <Link to={`/projects/${nextProject.slug}`} className="project-pager__link project-pager__link--next card">
            <span className="project-pager__label">
              Next project <ArrowRight size={15} aria-hidden="true" />
            </span>
            <span className="project-pager__name">{nextProject.name}</span>
          </Link>
        </nav>
      </div>
    </article>
  )
}
