import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { SplitSection } from '../components/ui/SplitSection'
import { TechLogo } from '../components/ui/TechLogo'
import { skillGroups, softSkills } from '../data/profile'
import { techIcons } from '../data/techIcons'
import { cx } from '../utils/cx'

// GitHub's brand colour is near-black, so it uses the text colour on hover instead.
function brandColor(logo) {
  if (!logo || logo === 'github') return 'var(--text)'
  return techIcons[logo].hex
}

export function Skills() {
  return (
    <SplitSection id="skills" title="Skills">
      <div className="stack-grid">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.title}
            delay={index}
            className={cx('tile stack-group', group.columns && 'stack-group--wide')}
            style={group.columns ? { '--columns': group.columns } : undefined}
            data-spotlight
          >
            <h3 className="stack-group__title">
              <Icon name={group.icon} size={15} />
              {group.title}
            </h3>
            <ul className="stack-list">
              {group.skills.map((skill) => (
                <li key={skill.name} className="stack-item" style={{ '--brand': brandColor(skill.logo) }}>
                  <span className="stack-item__logo" aria-hidden="true">
                    {skill.logo ? <TechLogo name={skill.logo} size={20} /> : <Icon name={skill.icon} size={18} />}
                  </span>
                  <span className="stack-item__name">{skill.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        <Reveal delay={4} className="tile stack-group stack-group--wide" data-spotlight>
          <h3 className="stack-group__title">
            <Icon name="users" size={15} />
            Soft skills
          </h3>
          <ul className="chips">
            {softSkills.map((skill) => (
              <li key={skill.name} className="chip">
                <Icon name={skill.icon} size={14} />
                {skill.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </SplitSection>
  )
}
