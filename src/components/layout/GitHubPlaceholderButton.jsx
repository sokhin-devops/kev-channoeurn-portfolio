import { GitHubIcon } from '../ui/GitHubIcon'
import { profile } from '../../data/profile'

/**
 * Icon button for the navigation. Shows a "coming soon" tooltip until
 * `profile.links.github` is set in src/data/profile.js.
 */
export function GitHubPlaceholderButton() {
  const githubUrl = profile.links.github

  if (githubUrl) {
    return (
      <a className="icon-btn" href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub profile">
        <GitHubIcon size={17} />
      </a>
    )
  }

  return (
    <button
      type="button"
      className="icon-btn icon-btn--placeholder has-tooltip"
      aria-disabled="true"
      aria-label="GitHub profile, coming soon"
      data-tooltip="GitHub — Coming Soon"
    >
      <GitHubIcon size={17} />
    </button>
  )
}
