/** Helper functions and constants for the Student Task Manager. */

export const STORAGE_KEY = 'kev-portfolio:student-tasks'
export const MAX_TITLE_LENGTH = 120

export const PRIORITIES = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

export const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

export function getPriorityLabel(value) {
  return PRIORITIES.find((priority) => priority.value === value)?.label ?? value
}

export function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

// ---------- Dates ----------
// Due dates are stored as "YYYY-MM-DD" strings (the format of <input type="date">).

export function toDateInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseDateInputValue(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function daysBetween(fromDate, toDate) {
  const start = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate())
  const end = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())
  return Math.round((end - start) / 86_400_000)
}

/** Returns a readable due-date label and a tone used for styling. */
export function getDueInfo(task, today) {
  if (!task.dueDate) return null

  const dueDate = parseDateInputValue(task.dueDate)
  const days = daysBetween(today, dueDate)
  const shortDate = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  if (task.completed) return { label: shortDate, tone: 'muted' }
  if (days < 0) return { label: `Overdue · ${shortDate}`, tone: 'overdue' }
  if (days === 0) return { label: 'Due today', tone: 'soon' }
  if (days === 1) return { label: 'Due tomorrow', tone: 'soon' }
  if (days < 7) return { label: `Due in ${days} days`, tone: 'normal' }
  return { label: `Due ${shortDate}`, tone: 'normal' }
}

// ---------- Filtering & sorting ----------

export function filterTasks(tasks, { query, status, priority }) {
  const search = query.trim().toLowerCase()

  return tasks.filter((task) => {
    if (status === 'active' && task.completed) return false
    if (status === 'completed' && !task.completed) return false
    if (priority !== 'all' && task.priority !== priority) return false
    if (search && !task.title.toLowerCase().includes(search)) return false
    return true
  })
}

const priorityOrder = { high: 0, medium: 1, low: 2 }

/** Active tasks first, then by due date (no date last), then by priority. */
export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1

    if (a.dueDate !== b.dueDate) {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return a.dueDate < b.dueDate ? -1 : 1
    }

    if (a.priority !== b.priority) return priorityOrder[a.priority] - priorityOrder[b.priority]
    return b.createdAt - a.createdAt
  })
}

// ---------- Sample data ----------

/** Example tasks shown the first time the app opens (or after "Load sample tasks"). */
export function createSampleTasks(today = new Date()) {
  const inDays = (days) => toDateInputValue(addDays(today, days))
  const now = Date.now()

  return [
    { title: 'Prepare slides for the group presentation', priority: 'high', dueDate: inDays(0) },
    { title: 'Finish the database assignment (ER diagram)', priority: 'high', dueDate: inDays(1) },
    { title: 'Read chapter 4: Linked lists', priority: 'medium', dueDate: inDays(3) },
    { title: 'Practise React hooks with a small exercise', priority: 'low', dueDate: inDays(6) },
    { title: 'Submit the networking lab report', priority: 'medium', dueDate: inDays(-1), completed: true },
  ].map((task, index) => ({
    id: createId(),
    completed: false,
    createdAt: now - index * 1000,
    ...task,
  }))
}
