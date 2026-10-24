export default function StatusBadge({ completed }) {
  const isCompleted = Boolean(completed)

  return (
    <span className={`status-pill ${isCompleted ? 'status-completed' : 'status-progress'}`}>
      <span className="status-dot"></span>
      <span>{isCompleted ? 'Completed' : 'In Progress'}</span>
    </span>
  )
}
