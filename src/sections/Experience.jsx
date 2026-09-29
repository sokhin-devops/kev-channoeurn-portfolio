import { Calendar, CheckCircle2, ShoppingBag } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { experience } from '../data/profile'

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          id="experience-title"
          index="04"
          eyebrow="Experience"
          title="Work experience."
          description="My work experience so far is outside tech. It taught me skills I bring to every team."
        />

        <div className="experience-list">
          {experience.map((job) => (
            <Reveal as="article" key={`${job.role}-${job.organization}`} className="experience-card card">
              <div className="experience-card__main">
                <span className="icon-tile icon-tile--lg" aria-hidden="true">
                  <ShoppingBag size={20} />
                </span>
                <div>
                  <h3 className="experience-card__role">{job.role}</h3>
                  <p className="experience-card__org">
                    {job.organization}
                    <span className="experience-card__type">{job.type}</span>
                  </p>
                  <p className="experience-card__period">
                    <Calendar size={14} aria-hidden="true" />
                    {job.period}
                  </p>
                  <p className="experience-card__summary">{job.summary}</p>
                </div>
              </div>

              <div className="experience-card__skills">
                <h4 className="experience-card__skills-title">Transferable skills</h4>
                <ul>
                  {job.transferableSkills.map((skill) => (
                    <li key={skill}>
                      <CheckCircle2 size={15} aria-hidden="true" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
