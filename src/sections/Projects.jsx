import { ProjectCard } from '../components/projects/ProjectCard'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { projects } from '../data/projects'

export function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          index="03"
          eyebrow="Projects"
          title="Practical projects built with React."
          description="Three working applications that practise real-world front-end patterns: state management, CRUD, data visualization and REST APIs. Each one can be tried right here in the browser."
        />

        <ul className="project-list">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.slug} delay={index % 2}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
