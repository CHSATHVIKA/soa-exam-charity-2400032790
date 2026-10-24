export default function StatCard({ title, value, icon, iconBg, iconColor, subtitle }) {
  return (
    <div className="card stat-card border-0 h-100">
      <div className="card-body p-4 d-flex align-items-center justify-content-between">
        <div>
          <span className="text-muted small fw-semibold text-uppercase tracking-wider">
            {title}
          </span>
          <h3 className="fw-bold text-dark mt-1 mb-0">{value}</h3>
          {subtitle && <small className="text-muted d-block mt-1">{subtitle}</small>}
        </div>
        <div
          className="stat-icon-wrapper flex-shrink-0"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <i className={icon}></i>
        </div>
      </div>
    </div>
  )
}
