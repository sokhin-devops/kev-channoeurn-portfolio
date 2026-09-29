import { Reveal } from '../components/ui/Reveal'
import { SplitSection } from '../components/ui/SplitSection'
import { education } from '../data/profile'

export function Education() {
  return (
    <SplitSection id="education" title="Education">
      <ol className="rows rows--flush">
        {education.map((item, index) => (
          <Reveal as="li" key={item.school} delay={index} className="row">
            <p className="row__label">{item.period}</p>
            <div className="row__value">
              <h3 className="entry__title">
                {item.degree}
                <span className="entry__org">{item.school}</span>
              </h3>
            </div>
          </Reveal>
        ))}
      </ol>
    </SplitSection>
  )
}
