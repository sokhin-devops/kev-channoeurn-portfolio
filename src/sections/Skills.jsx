import { Reveal } from '../components/ui/Reveal'
import { SplitSection } from '../components/ui/SplitSection'
import { skillGroups } from '../data/profile'

export function Skills() {
  return (
    <SplitSection id="skills" title="Skills">
      <Reveal as="dl" className="rows rows--flush">
        {skillGroups.map((group) => (
          <div key={group.title} className="row">
            <dt className="row__label">{group.title}</dt>
            <dd className="row__value">
              <ul className="skill-list">
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </Reveal>
    </SplitSection>
  )
}
