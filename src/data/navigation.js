/**
 * Main navigation. Each item points to a local route that scrolls to that
 * section on the home page. The name in the top-left corner links home.
 */
export const navItems = [
  { id: 'about', label: 'About', path: '/about' },
  { id: 'skills', label: 'Skills', path: '/skills' },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'experience', label: 'Experience', path: '/experience' },
  { id: 'education', label: 'Education', path: '/education' },
  { id: 'contact', label: 'Contact', path: '/contact' },
]

// Section ids that have their own route.
export const sectionIds = navItems.map((item) => item.id)
