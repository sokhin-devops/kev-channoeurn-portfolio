import { Reveal } from '../components/ui/Reveal'
import { SplitSection } from '../components/ui/SplitSection'
import { experience } from '../data/profile'

export function Experience() {
  return (
    <SplitSection id="experience" title="Experience">
      <ol className="timeline">
        {experience.map((job) => (
          <Reveal as="li" key={`${job.role}-${job.organization}`} className="timeline__item tile" data-spotlight>
            <p className="timeline__period">{job.period}</p>
            <h3 className="timeline__title">{job.role}</h3>
            <p className="timeline__place">{job.organization}</p>
            <p className="timeline__text">{job.summary}</p>
            <p className="timeline__meta">{job.skills.join(' · ')}</p>
          </Reveal>
        ))}
      </ol>
    </SplitSection>
  )
}
