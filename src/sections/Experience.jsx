import { Reveal } from '../components/ui/Reveal'
import { SplitSection } from '../components/ui/SplitSection'
import { experience } from '../data/profile'

export function Experience() {
  return (
    <SplitSection id="experience" title="Experience">
      <ol className="rows rows--flush">
        {experience.map((job) => (
          <Reveal as="li" key={`${job.role}-${job.organization}`} className="row">
            <p className="row__label">{job.period}</p>
            <div className="row__value">
              <h3 className="entry__title">
                {job.role}
                <span className="entry__org">{job.organization}</span>
              </h3>
              <p className="entry__text">{job.summary}</p>
              <p className="entry__meta">{job.skills.join(' · ')}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </SplitSection>
  )
}
