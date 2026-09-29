import { ArrowRight, GraduationCap, Mail, MapPin, Sparkles } from 'lucide-react'
import portrait from '../assets/kev-channoeurn.jpg'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { profile } from '../data/profile'

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <Reveal>
            <p className="status-pill">
              <span className="status-pill__dot" aria-hidden="true" />
              {profile.availability}
            </p>
          </Reveal>

          <Reveal delay={1}>
            <h1 id="hero-title" className="hero__title">
              <span className="hero__greeting">Hi, I&apos;m</span>{' '}
              <span className="hero__name">{profile.name}</span>
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="hero__role">
              <span className="text-gradient">{profile.role}</span>
              <span className="hero__role-divider" aria-hidden="true" />
              <span className="hero__role-sub">{profile.subtitle}</span>
            </p>
          </Reveal>

          <Reveal delay={3}>
            <p className="hero__description">{profile.heroDescription}</p>
          </Reveal>

          <Reveal delay={4} className="hero__actions">
            <Button to="/projects" iconTrailing={ArrowRight}>
              View Projects
            </Button>
            <Button to="/contact" variant="secondary" icon={Mail}>
              Contact Me
            </Button>
          </Reveal>

          <Reveal as="ul" delay={5} className="hero__facts" aria-label="Quick facts">
            <li>
              <GraduationCap size={16} aria-hidden="true" />
              BSc Computer Science, RUPP
            </li>
            <li>
              <MapPin size={16} aria-hidden="true" />
              {profile.city}
            </li>
            <li>
              <Sparkles size={16} aria-hidden="true" />
              Learning React every day
            </li>
          </Reveal>
        </div>

        <Reveal delay={2} className="hero__visual">
          <div className="hero__glow" aria-hidden="true" />
          <figure className="portrait-card">
            <img
              src={portrait}
              alt="Portrait of Kev Channoeurn wearing a black suit and blue tie"
              width="720"
              height="948"
              fetchPriority="high"
            />
          </figure>

          {/* Decorative summary. The same information appears as text on the page. */}
          <div className="code-card" aria-hidden="true">
            <div className="code-card__bar">
              <span className="code-card__dots">
                <span />
                <span />
                <span />
              </span>
              <span className="code-card__file">kev.js</span>
            </div>
            <pre className="code-card__code">
              <code>
                <span className="tok-keyword">const</span> <span className="tok-var">kev</span>{' '}
                <span className="tok-punct">=</span> <span className="tok-punct">{'{'}</span>
                {'\n  '}
                <span className="tok-prop">role</span>
                <span className="tok-punct">:</span> <span className="tok-string">&apos;Front-End Developer&apos;</span>
                <span className="tok-punct">,</span>
                {'\n  '}
                <span className="tok-prop">studying</span>
                <span className="tok-punct">:</span> <span className="tok-string">&apos;Computer Science&apos;</span>
                <span className="tok-punct">,</span>
                {'\n  '}
                <span className="tok-prop">stack</span>
                <span className="tok-punct">: [</span>
                <span className="tok-string">&apos;React&apos;</span>
                <span className="tok-punct">, </span>
                <span className="tok-string">&apos;JavaScript&apos;</span>
                <span className="tok-punct">],</span>
                {'\n  '}
                <span className="tok-prop">lookingFor</span>
                <span className="tok-punct">:</span> <span className="tok-string">&apos;Internship&apos;</span>
                <span className="tok-punct">,</span>
                {'\n'}
                <span className="tok-punct">{'}'}</span>
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
