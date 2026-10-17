import { Reveal } from '../components/ui/Reveal'
import { SplitSection } from '../components/ui/SplitSection'
import { education } from '../data/profile'

export function Education() {
  return (
    <SplitSection id="education" title="Education">
      <ol className="timeline">
        {education.map((item, index) => (
          <Reveal as="li" key={item.school} delay={index} className="timeline__item">
            <div className="tile" data-tilt data-spotlight>
              <p className="timeline__period">{item.period}</p>
              <h3 className="timeline__title">{item.degree}</h3>
              <p className="timeline__place">{item.school}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </SplitSection>
  )
}
