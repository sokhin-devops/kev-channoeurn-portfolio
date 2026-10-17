import { Reveal } from '../components/ui/Reveal'
import { SplitSection } from '../components/ui/SplitSection'
import { skillGroups } from '../data/profile'

export function Skills() {
  return (
    <SplitSection id="skills" title="Skills">
      <div className="tiles tiles--skills">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index} className="tile" data-spotlight>
            <h3 className="tile__label">{group.title}</h3>
            <ul className="chips">
              {group.skills.map((skill) => (
                <li key={skill} className="chip">
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </SplitSection>
  )
}
