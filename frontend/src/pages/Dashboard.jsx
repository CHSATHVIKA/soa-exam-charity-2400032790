import { Link } from 'react-router-dom'
import { useCharity } from '../context/CharityContext'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import ProgressBar from '../components/ProgressBar'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function Dashboard() {
  const { charities, stats, loading, error, fetchCharities } = useCharity()

  // Recent 5 fundraisers
  const recentCharities = [...charities].reverse().slice(0, 5)

  if (error && charities.length === 0) {
    return (
      <div className="card card-saas p-5 text-center my-4">
        <i className="bi bi-exclamation-circle text-danger display-4 mb-3"></i>
        <h4 className="fw-bold">Unable to Connect to Backend</h4>
        <p className="text-muted mx-auto" style={{ maxWidth: '450px' }}>
          {error}. Please verify that the Spring Boot server is active on port 8081.
        </p>
        <div>
          <button className="btn btn-primary px-4 rounded-pill" onClick={fetchCharities}>
            Retry Connection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-4">
      {/* Welcome Banner */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">Executive Dashboard</h4>
          <p className="text-muted small mb-0">
            Real-time telemetry and overview for charity fundraisers connected to PostgreSQL.
          </p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/add" className="btn btn-primary rounded-pill px-3 d-inline-flex align-items-center gap-2 shadow-sm">
            <i className="bi bi-plus-lg"></i>
            <span>Add Fundraiser</span>
          </Link>
          <Link to="/records" className="btn btn-light border rounded-pill px-3 d-inline-flex align-items-center gap-2">
            <i className="bi bi-table"></i>
            <span>View All</span>
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Total Campaigns"
            value={stats.count}
            subtitle={`${stats.completed} fully achieved`}
            icon="bi bi-folder2-open"
            iconBg="var(--primary-subtle)"
            iconColor="var(--primary)"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Target Goal"
            value={`₹${stats.target.toLocaleString('en-IN')}`}
            subtitle="Combined budget across all"
            icon="bi bi-bullseye"
            iconBg="var(--info-subtle)"
            iconColor="var(--info)"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Total Collected"
            value={`₹${stats.raised.toLocaleString('en-IN')}`}
            subtitle="Direct public funding"
            icon="bi bi-cash-stack"
            iconBg="var(--success-subtle)"
            iconColor="var(--success)"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Completed Rate"
            value={`${stats.percent}%`}
            subtitle={`${stats.completed} of ${stats.count} completed`}
            icon="bi bi-check-circle"
            iconBg="var(--warning-subtle)"
            iconColor="var(--warning)"
          />
        </div>
      </div>

      {/* Analytics Chart & Progress Overview */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card card-saas p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h6 className="fw-bold mb-0 text-dark">Funding Progress Overview</h6>
                <small className="text-muted">Target budget vs Collected contributions comparison</small>
              </div>
              <span className="badge bg-light text-secondary border font-monospace">Live Metrics</span>
            </div>

            {/* Visual Progress Bar Chart */}
            <div className="p-3 bg-light rounded-3 mb-3">
              <div className="d-flex justify-content-between text-muted small mb-2">
                <span>Overall Funding Completed</span>
                <span className="fw-bold text-dark font-monospace">{stats.percent}%</span>
              </div>
              <div className="progress progress-slim mb-3" style={{ height: '12px' }}>
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: `${stats.percent}%` }}
                  aria-valuenow={stats.percent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="d-flex justify-content-between small text-muted">
                <span>Raised: <strong className="text-success">₹{stats.raised.toLocaleString('en-IN')}</strong></span>
                <span>Target: <strong className="text-dark">₹{stats.target.toLocaleString('en-IN')}</strong></span>
              </div>
            </div>

            {/* Comparison Bars for Recent Campaigns */}
            <h6 className="text-secondary small fw-semibold text-uppercase tracking-wider mb-2 mt-3">
              Top Campaigns Distribution
            </h6>
            <div className="d-flex flex-column gap-3">
              {recentCharities.map((item) => {
                const target = Number(item.targetAmount || 0)
                const raised = Number(item.amountRaised || 0)
                const pct = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0
                return (
                  <div key={item.id} className="border-bottom pb-2">
                    <div className="d-flex justify-content-between small mb-1">
                      <span className="fw-semibold text-dark">{item.fundraiserName}</span>
                      <span className="text-muted font-monospace">₹{raised.toLocaleString('en-IN')} / ₹{target.toLocaleString('en-IN')}</span>
                    </div>
                    <ProgressBar current={raised} target={target} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Donut Style Summary Card */}
        <div className="col-12 col-lg-4">
          <div className="card card-saas p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <h6 className="fw-bold mb-1 text-dark">Campaign Status</h6>
              <small className="text-muted">Breakdown by completion status</small>
            </div>

            {/* Circular Donut Graphic */}
            <div className="text-center my-4 position-relative">
              <svg width="160" height="160" viewBox="0 0 36 36" className="d-block mx-auto">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3.8"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--success)"
                  strokeWidth="3.8"
                  strokeDasharray={`${stats.count > 0 ? Math.round((stats.completed / stats.count) * 100) : 0}, 100`}
                />
              </svg>
              <div className="position-absolute top-50 start-50 translate-middle text-center">
                <span className="fs-3 fw-bold text-dark">{stats.completed}</span>
                <div className="text-muted small" style={{ fontSize: '0.7rem' }}>COMPLETED</div>
              </div>
            </div>

            <div className="pt-2 border-top">
              <div className="d-flex justify-content-between small py-1">
                <span className="d-flex align-items-center gap-2">
                  <span className="badge rounded-circle p-1 bg-success"> </span> Completed
                </span>
                <span className="fw-bold text-dark">{stats.completed}</span>
              </div>
              <div className="d-flex justify-content-between small py-1">
                <span className="d-flex align-items-center gap-2">
                  <span className="badge rounded-circle p-1 bg-warning"> </span> In Progress
                </span>
                <span className="fw-bold text-dark">{stats.count - stats.completed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Fundraisers Table */}
      <div className="table-card">
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-white">
          <div>
            <h6 className="fw-bold text-dark mb-0">Recent Fundraisers</h6>
            <small className="text-muted">Latest entries registered into the database</small>
          </div>
          <Link to="/records" className="btn btn-sm btn-outline-primary rounded-pill px-3">
            View All ({charities.length})
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton rows={3} />
        ) : recentCharities.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox text-muted display-6"></i>
            <h6 className="fw-bold mt-2">No fundraisers yet</h6>
            <p className="text-muted small">Register your first fundraiser to see it here.</p>
            <Link to="/add" className="btn btn-sm btn-primary rounded-pill px-3">
              + Add Fundraiser
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th style={{ width: '70px' }}>ID</th>
                  <th>Campaign Name</th>
                  <th className="text-end">Target Goal</th>
                  <th className="text-end">Amount Raised</th>
                  <th style={{ width: '160px' }}>Progress</th>
                  <th>Status</th>
                  <th className="text-center" style={{ width: '150px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentCharities.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span className="badge-code">#{item.id}</span>
                    </td>
                    <td>
                      <Link to={`/details/${item.id}`} className="text-dark fw-semibold text-decoration-none">
                        {item.fundraiserName}
                      </Link>
                    </td>
                    <td className="text-end font-monospace">₹{Number(item.targetAmount).toLocaleString('en-IN')}</td>
                    <td className="text-end font-monospace text-success fw-semibold">₹{Number(item.amountRaised).toLocaleString('en-IN')}</td>
                    <td>
                      <ProgressBar current={item.amountRaised} target={item.targetAmount} />
                    </td>
                    <td>
                      <StatusBadge completed={item.completed} />
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center gap-1">
                        <Link to={`/details/${item.id}`} className="btn btn-sm btn-outline-secondary px-2 py-1 rounded-2" title="View details">
                          <i className="bi bi-eye"></i>
                        </Link>
                        <Link to={`/edit/${item.id}`} className="btn btn-sm btn-success text-white px-2 py-1 rounded-2 fw-semibold d-inline-flex align-items-center gap-1 shadow-sm" title="Edit">
                          <i className="bi bi-pencil-square"></i>
                          <span>Edit</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
