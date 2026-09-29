import { profile } from '../../data/profile'
import { GitHubIcon } from '../ui/GitHubIcon'

/** GitHub icon for the navigation. Shown only once `profile.links.github` is set. */
export function GitHubLink() {
  if (!profile.links.github) return null

  return (
    <a className="icon-btn" href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
      <GitHubIcon size={17} />
    </a>
  )
}
