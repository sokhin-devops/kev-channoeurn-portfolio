import { Globe } from 'lucide-react'
import { FutureLink } from '../ui/FutureLink'
import { GitHubIcon } from '../ui/GitHubIcon'

/** GitHub and Live Demo links for a project, with placeholders while they don't exist. */
export function ProjectLinks({ links, size = 'md' }) {
  return (
    <>
      <FutureLink href={links.github} label="GitHub" placeholder="Coming Soon" icon={GitHubIcon} size={size} />
      <FutureLink href={links.demo} label="Live Demo" placeholder="Local Project" icon={Globe} size={size} />
    </>
  )
}
