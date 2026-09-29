import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { SpotlightCard } from '../ui/SpotlightCard'
import { ProjectLinks } from './ProjectLinks'
import { ProjectPreview } from './ProjectPreview'

export function ProjectCard({ project }) {
  const detailPath = `/projects/${project.slug}`
  const titleId = `project-${project.slug}-title`

  return (
    <SpotlightCard as="article" className="project-card" data-accent={project.accent} aria-labelledby={titleId}>
      {/* The preview is also a link, but the title link is the one announced to screen readers. */}
      <Link to={detailPath} className="project-card__media" tabIndex={-1} aria-hidden="true">
        <ProjectPreview slug={project.slug} name={project.name} />
      </Link>

      <div className="project-card__body">
        <p className="project-card__meta">
          <span className="project-card__number">{project.number}</span>
          <span>{project.style}</span>
        </p>

        <h3 id={titleId} className="project-card__title">
          <Link to={detailPath}>{project.name}</Link>
        </h3>
        <p className="project-card__description">{project.description}</p>

        <ul className="badge-list" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li key={tech.name}>
              <Badge>{tech.name}</Badge>
            </li>
          ))}
        </ul>

        <ul className="project-card__features" aria-label="Key features">
          {project.highlights.map((feature) => (
            <li key={feature}>
              <Check size={14} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="project-card__actions">
          <Button to={detailPath} iconTrailing={ArrowRight} aria-label={`View project: ${project.name}`}>
            View Project
          </Button>
          <div className="project-card__links">
            <ProjectLinks links={project.links} size="sm" />
          </div>
        </div>
      </div>
    </SpotlightCard>
  )
}
