import { Check, Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { cx } from '../../utils/cx'
import { MAX_TITLE_LENGTH, PRIORITIES } from './taskUtils'

/**
 * Form used both to add a new task and to edit an existing one.
 * Pass `initialTask` and `onCancel` for edit mode.
 */
export function TaskForm({ initialTask, onSubmit, onCancel }) {
  const isEditing = Boolean(initialTask)
  const [title, setTitle] = useState(initialTask?.title ?? '')
  const [priority, setPriority] = useState(initialTask?.priority ?? 'medium')
  const [dueDate, setDueDate] = useState(initialTask?.dueDate ?? '')
  const [error, setError] = useState('')
  const id = useId()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setError('Please enter a task title.')
      return
    }

    onSubmit({ title: trimmedTitle, priority, dueDate })

    if (!isEditing) {
      setTitle('')
      setPriority('medium')
      setDueDate('')
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape' && onCancel) onCancel()
  }

  return (
    <form
      className={cx('tm-form', isEditing && 'tm-form--edit')}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      noValidate
      aria-label={isEditing ? 'Edit task' : 'Add a task'}
    >
      <label htmlFor={`${id}-title`} className="sr-only">
        Task title
      </label>
      <input
        id={`${id}-title`}
        className="tm-input tm-form__title"
        type="text"
        placeholder={isEditing ? 'Task title' : 'What do you need to do?'}
        value={title}
        maxLength={MAX_TITLE_LENGTH}
        autoComplete="off"
        autoFocus={isEditing}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => {
          setTitle(event.target.value)
          if (error) setError('')
        }}
      />

      <div className="tm-form__row">
        <label className="tm-field">
          <span className="tm-field__label">Priority</span>
          <select className="tm-input tm-select" value={priority} onChange={(event) => setPriority(event.target.value)}>
            {PRIORITIES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="tm-field">
          <span className="tm-field__label">Due date</span>
          <input
            className="tm-input tm-date"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </label>

        <div className="tm-form__actions">
          {onCancel && (
            <button type="button" className="tm-btn tm-btn--ghost" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className="tm-btn tm-btn--primary">
            {isEditing ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
            {isEditing ? 'Save' : 'Add task'}
          </button>
        </div>
      </div>

      {error && (
        <p id={`${id}-error`} className="tm-form__error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
