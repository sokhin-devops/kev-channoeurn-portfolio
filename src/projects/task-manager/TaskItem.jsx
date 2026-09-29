import { CalendarDays, Flag, Pencil, Trash2 } from 'lucide-react'
import { useId } from 'react'
import { cx } from '../../utils/cx'
import { getDueInfo, getPriorityLabel } from './taskUtils'

export function TaskItem({ task, today, onToggle, onEdit, onDelete }) {
  const checkboxId = useId()
  const due = getDueInfo(task, today)

  return (
    <li className={cx('tm-task', task.completed && 'is-completed')}>
      <input
        id={checkboxId}
        type="checkbox"
        className="tm-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      <div className="tm-task__body">
        <label htmlFor={checkboxId} className="tm-task__title">
          {task.title}
        </label>
        <div className="tm-task__meta">
          <span className={`tm-tag tm-tag--${task.priority}`}>
            <Flag size={12} aria-hidden="true" />
            {getPriorityLabel(task.priority)}
            <span className="sr-only"> priority</span>
          </span>
          {due && (
            <span className={`tm-tag tm-due tm-due--${due.tone}`}>
              <CalendarDays size={12} aria-hidden="true" />
              {due.label}
            </span>
          )}
        </div>
      </div>

      <div className="tm-task__actions">
        <button
          type="button"
          className="tm-icon-btn"
          onClick={() => onEdit(task.id)}
          aria-label={`Edit task: ${task.title}`}
          title="Edit"
        >
          <Pencil size={15} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="tm-icon-btn tm-icon-btn--danger"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete task: ${task.title}`}
          title="Delete"
        >
          <Trash2 size={15} aria-hidden="true" />
        </button>
      </div>
    </li>
  )
}
