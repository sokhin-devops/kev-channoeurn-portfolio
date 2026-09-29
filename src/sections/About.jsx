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

      <Reveal as="dl" delay={1} className="rows">
        {aboutFacts.map((fact) => (
          <div key={fact.label} className="row">
            <dt className="row__label">{fact.label}</dt>
            <dd className="row__value">{fact.value}</dd>
          </div>
        ))}
      </Reveal>
    </SplitSection>
  )
}
