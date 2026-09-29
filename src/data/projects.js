/**
 * Project information shown on the Projects section and the detail pages.
 *
 * `links.github` points to each project's standalone repository.
 * `links.demo` is `null` while the project isn't deployed, so its button shows "Local Project".
 * Replace `null` with a real URL and the button turns into a link.
 */

export const projects = [
  {
    slug: 'student-task-manager',
    number: '01',
    name: 'Student Task Manager',
    tagline: 'Organize assignments, deadlines and daily tasks in one place.',
    description:
      'A responsive task management application designed for students to organize assignments, deadlines and daily tasks.',
    style: 'Minimalist + Ambient',
    accent: 'violet',
    purpose: 'Demonstrates React fundamentals and practical state management.',
    overview:
      'Student Task Manager is a small productivity app built with React. Tasks can be added, edited, completed and deleted, and everything is saved in the browser with LocalStorage, so the list is still there after a page refresh.',
    problem:
      'Students juggle assignments, readings and group work across many subjects. Deadlines get lost in chat messages and paper notes, which makes it hard to see what needs attention first.',
    solution:
      'A focused task list with priorities and due dates. Search and filters make it quick to find what matters today, and clear due-date labels such as "Due today" or "Overdue" highlight what needs attention first.',
    features: [
      'Add, edit and delete tasks',
      'Mark tasks as completed',
      'Search tasks by title',
      'Filter by All, Active or Completed',
      'Low, Medium and High priority',
      'Due dates with overdue highlighting',
      'Saved with LocalStorage',
      'Responsive layout with dark and light mode',
    ],
    highlights: ['Add, edit & delete tasks', 'Search and status filters', 'Priorities & due dates', 'LocalStorage persistence'],
    technologies: [
      { name: 'React', usage: 'Components, useState, useEffect and useMemo' },
      { name: 'JavaScript', usage: 'Filtering, sorting and date logic' },
      { name: 'CSS', usage: 'Responsive layout with container queries' },
      { name: 'LocalStorage', usage: 'Saves tasks between visits' },
    ],
    learnings: [
      'Keeping a single source of truth for state and deriving filtered lists from it',
      'Syncing React state with LocalStorage using a custom hook',
      'Designing helpful empty states and form validation',
    ],
    links: { github: 'https://github.com/sokhin-devops/student-task-manager', demo: null },
  },
  {
    slug: 'mini-shop-dashboard',
    number: '02',
    name: 'Mini Shop Dashboard',
    tagline: 'Manage products and view basic sales information.',
    description:
      'A small e-commerce dashboard for managing products and viewing basic sales information.',
    style: 'Material + SaaS',
    accent: 'blue',
    purpose: 'Demonstrates dashboard UI, CRUD interactions, filtering and data visualization.',
    overview:
      'Mini Shop Dashboard is an admin-style interface for a small online shop. It uses sample data stored in the browser, so products can be added, edited and deleted without a backend.',
    problem:
      'Small shop owners need a simple way to see how their store is doing and keep product information up to date, without learning a complicated system.',
    solution:
      'A dashboard with summary cards, a 7-day sales chart and a recent orders table, plus a product manager with search, category filters, stock status badges and forms for adding and editing products.',
    features: [
      'Summary cards: products, orders, revenue and low stock',
      'Simple 7-day sales chart',
      'Product statistics by category and stock status',
      'Recent orders table',
      'Product list with search and category filter',
      'Add, edit and delete products',
      'Product details view',
      'Stock status badges',
    ],
    highlights: ['Summary cards & sales chart', 'Product CRUD with forms', 'Search & category filter', 'Stock status badges'],
    technologies: [
      { name: 'React', usage: 'Views, forms and derived statistics' },
      { name: 'JavaScript', usage: 'Calculating totals and chart data' },
      { name: 'CSS', usage: 'Dashboard layout, tables and badges' },
      { name: 'Mock data', usage: 'Sample products and orders, saved locally' },
    ],
    learnings: [
      'Structuring a multi-view dashboard with a sidebar',
      'Building reusable form dialogs for creating and editing records',
      'Turning raw order data into chart and summary values',
    ],
    links: { github: 'https://github.com/sokhin-devops/mini-shop-dashboard', demo: null },
  },
  {
    slug: 'weather-explorer',
    number: '03',
    name: 'Weather & Travel Explorer',
    tagline: 'Search cities and check current weather and the 5-day forecast.',
    description:
      'A responsive weather exploration application that allows users to search cities and view current and forecast weather information.',
    style: 'Ambient + Glass',
    accent: 'cyan',
    purpose: 'Demonstrates REST API integration and asynchronous React development.',
    overview:
      'Weather & Travel Explorer fetches real data from the free Open-Meteo API. Search for a city, pick the right match and see the current conditions, a 5-day forecast and a short travel note. The background adapts subtly to the weather.',
    problem:
      'When planning a day out or a trip, people want a quick, clear view of the weather for a specific city, without ads or cluttered screens.',
    solution:
      'A clean search-first interface that calls a public weather API, handles loading, error and empty states, and lets users save favorite cities for one-tap access.',
    features: [
      'Search cities with the Open-Meteo geocoding API',
      'Current temperature and weather condition',
      'Humidity and wind speed',
      '5-day forecast',
      'Favorite cities saved locally',
      'Loading, error and empty states',
      'Weather-based ambient background',
      'Responsive design',
    ],
    highlights: ['Live REST API data', 'Current weather & 5-day forecast', 'Favorite cities', 'Loading, error & empty states'],
    technologies: [
      { name: 'React', usage: 'Async state with useEffect and custom hooks' },
      { name: 'JavaScript', usage: 'fetch, async/await and AbortController' },
      { name: 'CSS', usage: 'Glass panels and weather-based themes' },
      { name: 'REST API', usage: 'Open-Meteo geocoding and forecast (no API key)' },
    ],
    learnings: [
      'Fetching data with async/await and cancelling outdated requests',
      'Handling loading, error and empty states clearly',
      'Mapping API weather codes to readable labels and icons',
    ],
    links: { github: 'https://github.com/sokhin-devops/weather-travel-explorer', demo: null },
  },
]

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}
