import { ArrowUpRight } from 'lucide-react'
import { GitHubIcon } from '../ui/GitHubIcon'

/**
 * The whole card opens the project on its own page in a new tab.
 * The GitHub link sits above the card link, so it can still be clicked on its own.
 */
export function ProjectCard({ project }) {
  const alt = `Screenshot of the ${project.name} app`

  return (
    <article className="project-card" data-accent={project.accent}>
      <div className="project-card__shot">
        <img
          className="project-card__img project-card__img--dark"
          src={project.screenshots.dark}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
        <img
          className="project-card__img project-card__img--light"
          src={project.screenshots.light}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">
          <a className="project-card__link" href={`/projects/${project.slug}`} target="_blank" rel="noopener">
            {project.name}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <ArrowUpRight size={18} className="project-card__arrow" aria-hidden="true" />
        </h3>
        <p className="project-card__description">{project.description}</p>

        <div className="project-card__footer">
          <p className="project-card__tech">{project.technologies.join(' · ')}</p>
          <a
            className="project-card__github"
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.name} source code on GitHub`}
          >
            <GitHubIcon size={14} />
            GitHub
          </a>
        </div>
      </div>
    </article>
  )
}
