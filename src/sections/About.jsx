import { Check, GraduationCap, Languages, MapPin, Target } from 'lucide-react'
import portrait from '../assets/kev-channoeurn.jpg'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { aboutParagraphs, education, profile, skillGroups } from '../data/profile'
import { projects } from '../data/projects'

const focusPoints = [
  'Studying Computer Science at RUPP',
  'Learning React and modern web development',
  'Building practical, real-world projects',
  'Looking for a Front-End internship',
]

// These numbers are counted from the data files, so they always stay accurate.
const technologyCount = skillGroups.reduce((total, group) => total + group.skills.length, 0)
const currentStudy = education.find((item) => item.current)

export function About() {
  const stats = [
    { value: 'BSc', label: 'Computer Science' },
    { value: projects.length, label: 'React projects' },
    { value: technologyCount, label: 'Technologies' },
  ]

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about">
        <div className="about__content">
          <SectionHeading
            id="about-title"
            index="01"
            eyebrow="About"
            title="A student developer who learns by building."
          />

          <div className="about__text">
            {aboutParagraphs.map((paragraph, index) => (
              <Reveal as="p" key={index} delay={index}>
                {paragraph}
              </Reveal>
            ))}
          </div>

          <Reveal as="ul" delay={3} className="focus-list" aria-label="Current focus">
            {focusPoints.map((point) => (
              <li key={point}>
                <span className="focus-list__icon" aria-hidden="true">
                  <Check size={14} />
                </span>
                {point}
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal delay={1} className="profile-card card">
          <div className="profile-card__header">
            <img
              className="profile-card__avatar"
              src={portrait}
              alt=""
              width="72"
              height="72"
              loading="lazy"
            />
            <div>
              <p className="profile-card__name">{profile.name}</p>
              <p className="profile-card__role">
                {profile.role} · {profile.subtitle}
              </p>
            </div>
          </div>

          <dl className="profile-card__details">
            <div>
              <dt>
                <MapPin size={15} aria-hidden="true" /> Location
              </dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>
                <GraduationCap size={15} aria-hidden="true" /> Education
              </dt>
              <dd>
                {currentStudy.school}
                <span className="profile-card__muted">{currentStudy.period}</span>
              </dd>
            </div>
            <div>
              <dt>
                <Languages size={15} aria-hidden="true" /> Languages
              </dt>
              <dd>{profile.languages.join(', ')}</dd>
            </div>
            <div>
              <dt>
                <Target size={15} aria-hidden="true" /> Looking for
              </dt>
              <dd>Front-End internship</dd>
            </div>
          </dl>

          <ul className="profile-card__stats" aria-label="At a glance">
            {stats.map((stat) => (
              <li key={stat.label}>
                <span className="profile-card__stat-value">{stat.value}</span>
                <span className="profile-card__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
