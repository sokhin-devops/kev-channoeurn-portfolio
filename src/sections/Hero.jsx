import { ArrowRight } from 'lucide-react'
import { Fragment } from 'react'
import portrait from '../assets/kev-channoeurn.jpg'
import { Button } from '../components/ui/Button'
import { HandUnderline } from '../components/ui/HandUnderline'
import { ParticleGlobe } from '../components/ui/ParticleGlobe'
import { Reveal } from '../components/ui/Reveal'
import { profile } from '../data/profile'
import { useTilt } from '../hooks/useTilt'

const headingWords = ['Hi,', "I'm", ...profile.name.split(' ')]

export function Hero() {
  const stageRef = useTilt(7)

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <Reveal as="p" className="availability">
            <span className="availability__dot" aria-hidden="true" />
            {profile.availability}
          </Reveal>

          {/* Each word fades and sharpens in, one after another. */}
          <h1 id="hero-title" className="hero__title">
            {headingWords.map((word, index) => (
              <Fragment key={word}>
                {index > 0 && ' '}
                <span className="hero__word" style={{ '--word': index }}>
                  {word}
                </span>
              </Fragment>
            ))}
          </h1>

          <Reveal as="p" delay={2} className="hero__role">
            <span className="hero__role-text">
              {profile.role}
              <HandUnderline />
            </span>
          </Reveal>

          <Reveal as="p" delay={3} className="hero__description">
            {profile.heroDescription}
          </Reveal>

          <Reveal delay={4} className="hero__actions">
            <Button to="/projects" iconTrailing={ArrowRight}>
              View Projects
            </Button>
            <Button to="/contact" variant="secondary">
              Contact Me
            </Button>
          </Reveal>
        </div>

        {/* 3D stage: a rotating particle globe behind a portrait that tilts towards the pointer. */}
        <Reveal delay={2} className="hero__photo">
          <div className="hero__stage" ref={stageRef}>
            <ParticleGlobe className="hero__globe" />
            <div className="portrait">
              <img
                src={portrait}
                alt="Portrait of Kev Channoeurn"
                width="720"
                height="948"
                fetchPriority="high"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
