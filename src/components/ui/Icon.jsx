import {
  Code,
  Compass,
  Database,
  GraduationCap,
  Hammer,
  Languages,
  LayoutTemplate,
  Lightbulb,
  MapPin,
  MonitorSmartphone,
  Network,
  Puzzle,
  RefreshCw,
  Server,
  Target,
  Users,
  Wrench,
} from 'lucide-react'

// Maps the icon names used in src/data/profile.js to Lucide icons.
const icons = {
  api: Network,
  code: Code,
  compass: Compass,
  database: Database,
  'graduation-cap': GraduationCap,
  hammer: Hammer,
  languages: Languages,
  layout: LayoutTemplate,
  lightbulb: Lightbulb,
  'map-pin': MapPin,
  puzzle: Puzzle,
  refresh: RefreshCw,
  responsive: MonitorSmartphone,
  server: Server,
  target: Target,
  users: Users,
  wrench: Wrench,
}

export function Icon({ name, size = 16, ...props }) {
  const IconComponent = icons[name] ?? Code
  return <IconComponent size={size} aria-hidden="true" {...props} />
}
