import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { interests } from '../data/profile'

export function Interests() {
  return (
    <section id="interests" className="section section--compact" aria-labelledby="interests-title">
      <div className="container">
        <SectionHeading id="interests-title" eyebrow="Interests" title="What keeps me learning." />

        <ul className="interest-grid">
          {interests.map((interest, index) => (
            <Reveal as="li" key={interest.title} delay={index} className="interest-grid__item">
              <article className="interest-card card">
                <span className="icon-tile" aria-hidden="true">
                  <Icon name={interest.icon} size={18} />
                </span>
                <h3 className="interest-card__title">{interest.title}</h3>
                <p className="interest-card__description">{interest.description}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
