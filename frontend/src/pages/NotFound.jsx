import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="py-5 text-center my-4">
      <div className="card card-saas p-5 mx-auto" style={{ maxWidth: '540px' }}>
        <div className="bg-primary-subtle text-primary d-inline-flex p-4 rounded-circle mx-auto mb-3" style={{ width: '80px', height: '80px', alignItems: 'center', justifyContent: 'center' }}>
          <i className="bi bi-compass display-6"></i>
        </div>
        <h1 className="fw-bold text-dark display-4 font-monospace mb-1">404</h1>
        <h4 className="fw-bold text-dark mb-2">Page Not Found</h4>
        <p className="text-muted small mb-4">
          The view or route you requested could not be located in the CharityHub portal. Check the URL or return to the main dashboard.
        </p>
        <div className="d-flex justify-content-center gap-2">
          <Link to="/" className="btn btn-primary rounded-pill px-4 shadow-sm">
            <i className="bi bi-house-door me-2"></i>
            <span>Dashboard Home</span>
          </Link>
          <Link to="/records" className="btn btn-light border rounded-pill px-4">
            <i className="bi bi-table me-2"></i>
            <span>View Records</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
