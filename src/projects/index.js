import { lazy } from 'react'

/**
 * The three demo applications, loaded only when a project page is opened.
 * This keeps the main portfolio bundle small.
 */
export const projectApps = {
  'student-task-manager': lazy(() => import('./task-manager/TaskManagerApp')),
  'mini-shop-dashboard': lazy(() => import('./shop-dashboard/ShopDashboardApp')),
  'weather-explorer': lazy(() => import('./weather-explorer/WeatherExplorerApp')),
}
