export default function ProgressBar({ current, target }) {
  const curr = Number(current || 0)
  const tgt = Number(target || 0)
  const pct = tgt > 0 ? Math.min(100, Math.round((curr / tgt) * 100)) : 0

  // Color code based on progress
  let barColorClass = 'bg-primary'
  if (pct >= 100) {
    barColorClass = 'bg-success'
  } else if (pct < 30) {
    barColorClass = 'bg-warning'
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <div className="progress progress-slim flex-grow-1" style={{ height: '7px' }}>
        <div
          className={`progress-bar ${barColorClass}`}
          role="progressbar"
          style={{ width: `${pct}%` }}
          aria-valuenow={pct}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <span className="small text-muted font-monospace fw-semibold" style={{ minWidth: '38px', textAlign: 'right' }}>
        {pct}%
      </span>
    </div>
  )
}
