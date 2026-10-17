import { Reveal } from '../components/ui/Reveal'
import { SplitSection } from '../components/ui/SplitSection'
import { aboutFacts, aboutParagraphs } from '../data/profile'

export function About() {
  return (
    <SplitSection id="about" title="About">
      <Reveal className="prose">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Reveal>

      <dl className="tiles tiles--facts">
        {aboutFacts.map((fact, index) => (
          <Reveal key={fact.label} delay={index} className="tile">
            <dt className="tile__label">{fact.label}</dt>
            <dd className="tile__value">{fact.value}</dd>
          </Reveal>
        ))}
      </dl>
    </SplitSection>
  )
}
