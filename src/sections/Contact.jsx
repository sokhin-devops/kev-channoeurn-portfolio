import { Check, Copy, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { FutureLink } from '../components/ui/FutureLink'
import { GitHubIcon } from '../components/ui/GitHubIcon'
import { Reveal } from '../components/ui/Reveal'
import { profile } from '../data/profile'

export function Contact() {
  const [copied, setCopied] = useState(false)

  // Reset the "Copied" message after a short time.
  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      // Clipboard access can be blocked; the email is still visible and selectable.
    }
  }

  // <wbr> lets a long email wrap after the "@" instead of in the middle of a word.
  const [emailUser, emailDomain] = profile.email.split('@')
  const emailValue = (
    <>
      {emailUser}@<wbr />
      {emailDomain}
    </>
  )

  const contactItems = [
    { icon: Mail, label: 'Email', value: emailValue, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
    { icon: MapPin, label: 'Location', value: profile.location },
  ]

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact-panel card">
          <div className="contact-panel__glow" aria-hidden="true" />

          <div className="contact-panel__intro">
            <p className="eyebrow">
              <span className="eyebrow__index">06</span>
              Contact
            </p>
            <h2 id="contact-title" className="section-title">
              Let&apos;s talk about an internship.
            </h2>
            <p className="section-description">
              I&apos;m looking for a Front-End internship where I can learn, contribute and grow. If you have an
              opportunity or a question, I&apos;d be happy to hear from you.
            </p>

            <div className="contact-panel__actions">
              <Button href={`mailto:${profile.email}`} icon={Mail}>
                Email Me
              </Button>
              <Button href={profile.phoneHref} variant="secondary" icon={Phone}>
                Call
              </Button>
              <FutureLink href={profile.links.github} label="GitHub" icon={GitHubIcon} />
            </div>
          </div>

          <ul className="contact-list">
            {contactItems.map(({ icon: ItemIcon, label, value, href }) => (
              <li key={label} className="contact-item">
                <span className="icon-tile" aria-hidden="true">
                  <ItemIcon size={18} />
                </span>
                <div className="contact-item__text">
                  <span className="contact-item__label">{label}</span>
                  {href ? (
                    <a className="contact-item__value" href={href}>
                      {value}
                    </a>
                  ) : (
                    <span className="contact-item__value">{value}</span>
                  )}
                </div>
                {label === 'Email' && (
                  <button
                    type="button"
                    className="icon-btn icon-btn--sm"
                    onClick={copyEmail}
                    aria-label={copied ? 'Email copied' : 'Copy email address'}
                  >
                    {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                  </button>
                )}
              </li>
            ))}
          </ul>
          <p className="sr-only" role="status">
            {copied ? 'Email address copied to clipboard' : ''}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
