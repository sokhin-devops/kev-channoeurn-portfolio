import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { SplitSection } from '../components/ui/SplitSection'
import { aboutFacts, aboutParagraph, aboutStatement, interests } from '../data/profile'

export function About() {
  return (
    <SplitSection id="about" title="About">
      <Reveal as="p" className="statement">
        {aboutStatement.before}
        <span className="statement__accent">{aboutStatement.highlight}</span>
        {aboutStatement.after}
      </Reveal>
      <Reveal as="p" delay={1} className="about__text">
        {aboutParagraph}
      </Reveal>

      <ul className="fact-grid">
        {aboutFacts.map((fact, index) => (
          <Reveal as="li" key={fact.label} delay={index} className="card-cell">
            <div className="tile fact" data-tilt data-spotlight>
              <span className="fact__icon" aria-hidden="true">
                <Icon name={fact.icon} size={17} />
              </span>
              <span className="tile__label">{fact.label}</span>
              <span className="fact__value">{fact.value}</span>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal className="interests" delay={2}>
        <h3 className="tile__label">Interests</h3>
        <ul className="chips">
          {interests.map((interest) => (
            <li key={interest.label} className="chip">
              <Icon name={interest.icon} size={14} />
              {interest.label}
            </li>
          ))}
        </ul>
      </Reveal>
    </SplitSection>
  )
}
