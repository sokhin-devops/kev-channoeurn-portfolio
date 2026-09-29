import { GraduationCap, School } from 'lucide-react'
import { Badge } from '../components/ui/Badge'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { education } from '../data/profile'

export function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeading
          id="education-title"
          index="05"
          eyebrow="Education"
          title="Where I'm learning."
        />

        <ol className="timeline">
          {education.map((item, index) => {
            const ItemIcon = item.current ? GraduationCap : School
            return (
              <Reveal as="li" key={item.school} delay={index} className="timeline__item">
                <span className="timeline__marker" aria-hidden="true">
                  <ItemIcon size={16} />
                </span>
                <article className="timeline__card card">
                  <div className="timeline__header">
                    <p className="timeline__period">{item.period}</p>
                    {item.current && <Badge tone="success">Currently studying</Badge>}
                  </div>
                  <h3 className="timeline__title">{item.degree}</h3>
                  <p className="timeline__school">{item.school}</p>
                  <p className="timeline__summary">{item.summary}</p>
                </article>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
