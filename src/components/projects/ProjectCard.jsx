import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProjectPreview } from './ProjectPreview'

export function ProjectCard({ project }) {
  const detailPath = `/projects/${project.slug}`

  return (
    <article className="project" data-accent={project.accent} aria-labelledby={`project-${project.slug}-title`}>
      {/* The preview repeats the title link, so it is hidden from keyboard and screen readers. */}
      <Link to={detailPath} className="project__media" tabIndex={-1} aria-hidden="true">
        <ProjectPreview slug={project.slug} name={project.name} />
      </Link>

      <div className="project__body">
        <h3 id={`project-${project.slug}-title`} className="project__title">
          <Link to={detailPath}>{project.name}</Link>
        </h3>
        <p className="project__description">{project.description}</p>
        <p className="project__tech">{project.technologies.map((tech) => tech.name).join(' · ')}</p>

        <div className="project__links">
          <Link to={detailPath} className="text-link" aria-label={`View project: ${project.name}`}>
            View project
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          {project.links.github && (
            <a
              href={project.links.github}
              className="text-link text-link--muted"
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} source code on GitHub`}
            >
              GitHub
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
