import { ClipboardList, Moon, SearchX, Sun } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useTheme } from '../../hooks/useTheme'
import { TaskForm } from './TaskForm'
import { TaskItem } from './TaskItem'
import { TaskToolbar } from './TaskToolbar'
import { createId, createSampleTasks, filterTasks, sortTasks, STORAGE_KEY } from './taskUtils'
import './task-manager.css'

export default function TaskManagerApp() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, () => createSampleTasks())
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [today] = useState(() => new Date())
  const { resolvedTheme, setMode } = useTheme()

  // Everything below is derived from `tasks`, so there is only one source of truth.
  const counts = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length
    return { all: tasks.length, active: tasks.length - completed, completed }
  }, [tasks])

  const visibleTasks = useMemo(
    () => sortTasks(filterTasks(tasks, { query, status, priority })),
    [tasks, query, status, priority],
  )

  const progress = counts.all === 0 ? 0 : Math.round((counts.completed / counts.all) * 100)
  const hasActiveFilters = query.trim() !== '' || status !== 'all' || priority !== 'all'
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'

  function addTask(values) {
    const newTask = { id: createId(), completed: false, createdAt: Date.now(), ...values }
    setTasks((current) => [newTask, ...current])
  }

  function updateTask(id, changes) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, ...changes } : task)))
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
    if (editingId === id) setEditingId(null)
  }

  function clearCompleted() {
    setTasks((current) => current.filter((task) => !task.completed))
  }

  function clearFilters() {
    setQuery('')
    setStatus('all')
    setPriority('all')
  }

  return (
    <div className="tm" data-accent="violet">
      <div className="tm__ambient" aria-hidden="true" />

      <div className="tm__inner">
        <header className="tm__header">
          <div>
            <p className="tm__date">
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h2 className="tm__title">My tasks</h2>
          </div>

          <div className="tm__header-side">
            <div className="tm-progress">
              <div className="tm-progress__text">
                <span>
                  {counts.completed} of {counts.all} done
                </span>
                <span className="tm-progress__percent">{progress}%</span>
              </div>
              <div
                className="tm-progress__track"
                role="progressbar"
                aria-label="Tasks completed"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
            <button
              type="button"
              className="tm-icon-btn tm-icon-btn--bordered"
              onClick={() => setMode(nextTheme)}
              aria-label={`Switch to ${nextTheme} mode`}
              title={`Switch to ${nextTheme} mode`}
            >
              {resolvedTheme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            </button>
          </div>
        </header>

        <TaskForm onSubmit={addTask} />

        <TaskToolbar
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
          priority={priority}
          onPriorityChange={setPriority}
          counts={counts}
        />

        <p className="sr-only" aria-live="polite">
          {visibleTasks.length} {visibleTasks.length === 1 ? 'task' : 'tasks'} shown
        </p>

        {visibleTasks.length > 0 ? (
          <ul className="tm-list" aria-label="Tasks">
            {visibleTasks.map((task) =>
              editingId === task.id ? (
                <li key={task.id} className="tm-list__editing">
                  <TaskForm
                    initialTask={task}
                    onSubmit={(values) => {
                      updateTask(task.id, values)
                      setEditingId(null)
                    }}
                    onCancel={() => setEditingId(null)}
                  />
                </li>
              ) : (
                <TaskItem
                  key={task.id}
                  task={task}
                  today={today}
                  onToggle={toggleTask}
                  onEdit={setEditingId}
                  onDelete={deleteTask}
                />
              ),
            )}
          </ul>
        ) : tasks.length === 0 ? (
          <div className="tm-empty">
            <span className="tm-empty__icon" aria-hidden="true">
              <ClipboardList size={22} />
            </span>
            <h3 className="tm-empty__title">No tasks yet</h3>
            <p className="tm-empty__text">Add your first assignment, reading or reminder above to get started.</p>
            <button type="button" className="tm-btn tm-btn--ghost" onClick={() => setTasks(createSampleTasks())}>
              Load sample tasks
            </button>
          </div>
        ) : (
          <div className="tm-empty">
            <span className="tm-empty__icon" aria-hidden="true">
              <SearchX size={22} />
            </span>
            <h3 className="tm-empty__title">No matching tasks</h3>
            <p className="tm-empty__text">
              {status === 'completed' && !query && priority === 'all'
                ? 'Nothing is completed yet. Tick off a task to see it here.'
                : 'Try a different search or filter.'}
            </p>
            {hasActiveFilters && (
              <button type="button" className="tm-btn tm-btn--ghost" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>
        )}

        {tasks.length > 0 && (
          <footer className="tm__footer">
            <span>
              {counts.active} {counts.active === 1 ? 'task' : 'tasks'} left
            </span>
            <button
              type="button"
              className="tm-link-btn"
              onClick={clearCompleted}
              disabled={counts.completed === 0}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  )
}
