/**
 * Projects shown in the Projects section.
 *
 * Each project opens full screen on its own route (/projects/<slug>) in a new tab.
 * `links.github` points to the project's standalone repository.
 * `hasOwnThemeToggle` hides the top bar's theme button for apps that already have one.
 */

import shopDark from '../assets/projects/mini-shop-dashboard-dark.jpg'
import shopLight from '../assets/projects/mini-shop-dashboard-light.jpg'
import taskDark from '../assets/projects/student-task-manager-dark.jpg'
import taskLight from '../assets/projects/student-task-manager-light.jpg'
import weatherDark from '../assets/projects/weather-explorer-dark.jpg'
import weatherLight from '../assets/projects/weather-explorer-light.jpg'

// Screenshots of the real apps, one per theme (taken from /projects/<slug>).
export const projects = [
  {
    slug: 'student-task-manager',
    name: 'Student Task Manager',
    description:
      'A responsive task management application designed for students to organize assignments, deadlines and daily tasks.',
    technologies: ['React', 'JavaScript', 'CSS', 'LocalStorage'],
    accent: 'violet',
    hasOwnThemeToggle: true,
    screenshots: { dark: taskDark, light: taskLight },
    links: { github: 'https://github.com/sokhin-devops/student-task-manager' },
  },
  {
    slug: 'mini-shop-dashboard',
    name: 'Mini Shop Dashboard',
    description: 'A small e-commerce dashboard for managing products and viewing basic sales information.',
    technologies: ['React', 'JavaScript', 'CSS', 'Mock data'],
    accent: 'blue',
    hasOwnThemeToggle: false,
    screenshots: { dark: shopDark, light: shopLight },
    links: { github: 'https://github.com/sokhin-devops/mini-shop-dashboard' },
  },
  {
    slug: 'weather-explorer',
    name: 'Weather & Travel Explorer',
    description:
      'A responsive weather app that lets users search cities and view current weather and a 5‑day forecast.',
    technologies: ['React', 'JavaScript', 'CSS', 'REST API'],
    accent: 'cyan',
    hasOwnThemeToggle: false,
    screenshots: { dark: weatherDark, light: weatherLight },
    links: { github: 'https://github.com/sokhin-devops/weather-travel-explorer' },
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
