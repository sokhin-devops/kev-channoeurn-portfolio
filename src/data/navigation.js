/**
 * Main navigation. Each item points to a local route.
 * Section routes (/about, /skills, ...) scroll to that section on the home page.
 */
export const navItems = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'skills', label: 'Skills', path: '/skills' },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'experience', label: 'Experience', path: '/experience' },
  { id: 'education', label: 'Education', path: '/education' },
  { id: 'contact', label: 'Contact', path: '/contact' },
]

// Section ids that have their own route.
export const sectionIds = navItems.filter((item) => item.id !== 'home').map((item) => item.id)
