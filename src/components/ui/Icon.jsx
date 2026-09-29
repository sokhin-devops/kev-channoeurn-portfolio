import {
  Atom,
  Braces,
  Code,
  Compass,
  Database,
  FileCode,
  GitBranch,
  Hammer,
  HardDrive,
  LayoutTemplate,
  Lightbulb,
  MessageCircle,
  Palette,
  Puzzle,
  RefreshCw,
  Send,
  Server,
  Terminal,
  Users,
  Wrench,
} from 'lucide-react'
import { GitHubIcon } from './GitHubIcon'

// Maps the icon names used in src/data/*.js to icon components.
const icons = {
  atom: Atom,
  braces: Braces,
  code: Code,
  compass: Compass,
  database: Database,
  'file-code': FileCode,
  'git-branch': GitBranch,
  github: GitHubIcon,
  hammer: Hammer,
  'hard-drive': HardDrive,
  layout: LayoutTemplate,
  lightbulb: Lightbulb,
  'message-circle': MessageCircle,
  palette: Palette,
  puzzle: Puzzle,
  refresh: RefreshCw,
  send: Send,
  server: Server,
  terminal: Terminal,
  users: Users,
  wrench: Wrench,
}

export function Icon({ name, size = 18, ...props }) {
  const IconComponent = icons[name] ?? Code
  return <IconComponent size={size} aria-hidden="true" {...props} />
}
