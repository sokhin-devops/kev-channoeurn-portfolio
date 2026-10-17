import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Reveal } from '../components/ui/Reveal'
import { SplitSection } from '../components/ui/SplitSection'
import { profile } from '../data/profile'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [emailUser, emailDomain] = profile.email.split('@')

  // Reset the "Copied" state after a short time.
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

  return (
    <SplitSection id="contact" title="Contact">
      <Reveal>
        <div className="tile contact-card" data-tilt data-spotlight>
          <p className="lead">I&apos;m looking for a Front-End internship. The best way to reach me is by email.</p>

          <div className="contact__email-row">
            {/* <wbr> lets the address wrap after the "@" on small screens. */}
            <a className="contact__email" href={`mailto:${profile.email}`}>
              {emailUser}@<wbr />
              {emailDomain}
            </a>
            <button
              type="button"
              className="icon-btn"
              onClick={copyEmail}
              aria-label={copied ? 'Email copied' : 'Copy email address'}
              title={copied ? 'Copied' : 'Copy email'}
            >
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            </button>
          </div>

          <p className="contact__details">
            <a href={profile.phoneHref}>{profile.phone}</a>
            <span aria-hidden="true">·</span>
            <span>{profile.location}</span>
          </p>
        </div>
      </Reveal>

      <p className="sr-only" role="status">
        {copied ? 'Email address copied to clipboard' : ''}
      </p>
    </SplitSection>
  )
}
