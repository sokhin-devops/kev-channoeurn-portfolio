import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SpotlightCard } from '../components/ui/SpotlightCard'
import { skillGroups, softSkills } from '../data/profile'

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          index="02"
          eyebrow="Skills"
          title="Technologies I work with."
          description="The languages and tools I've learned and use in my projects, grouped by where they fit."
        />

        <div className="skills-grid">
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.id} delay={groupIndex} className={`skills-grid__item skills-grid__item--${group.id}`}>
              <SpotlightCard as="article" className="skill-group" aria-labelledby={`skill-group-${group.id}`}>
                <header className="skill-group__header">
                  <span className="icon-tile" aria-hidden="true">
                    <Icon name={group.icon} size={18} />
                  </span>
                  <div>
                    <h3 id={`skill-group-${group.id}`} className="skill-group__title">
                      {group.title}
                    </h3>
                    <p className="skill-group__description">{group.description}</p>
                  </div>
                  <span className="skill-group__count">
                    {group.skills.length} {group.skills.length === 1 ? 'skill' : 'skills'}
                  </span>
                </header>

                <ul className="skill-list">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="skill-item">
                      <span className="skill-item__icon" aria-hidden="true">
                        <Icon name={skill.icon} size={17} />
                      </span>
                      <span className="skill-item__text">
                        <span className="skill-item__name">{skill.name}</span>
                        <span className="skill-item__note">{skill.note}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2} className="soft-skills card">
          <h3 className="soft-skills__title">Soft skills</h3>
          <ul className="soft-skills__list">
            {softSkills.map((skill) => (
              <li key={skill.name} className="chip">
                <Icon name={skill.icon} size={15} />
                {skill.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
