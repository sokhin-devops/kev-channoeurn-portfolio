import { ProjectCard } from '../components/projects/ProjectCard'
import { Reveal } from '../components/ui/Reveal'
import { SplitSection } from '../components/ui/SplitSection'
import { projects } from '../data/projects'

export function Projects() {
  return (
    <SplitSection id="projects" title="Projects">
      <Reveal as="p" className="lead">
        Three small apps I built to practise real-world front-end work. Each one runs right here in the browser.
      </Reveal>

      <ul className="project-list">
        {projects.map((project) => (
          <Reveal as="li" key={project.slug}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>
    </SplitSection>
  )
}
