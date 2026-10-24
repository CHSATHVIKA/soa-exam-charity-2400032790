import { NavLink } from 'react-router-dom'
import { useCharity, SWAGGER_URL } from '../context/CharityContext'


export default function Navbar() {
  const { charities, loading, fetchCharities } = useCharity()

  return (
    <nav className="navbar navbar-expand-lg app-navbar sticky-top">
      <div className="container">
        {/* Brand */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
          <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
            <i className="bi bi-heart-fill fs-6"></i>
          </div>
          <div className="d-flex flex-column">
            <span className="fw-bold text-dark lh-1">CharityHub</span>
            <small className="text-muted" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>
              MANAGEMENT PORTAL
            </small>
          </div>
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle ms-2 fs-8 px-2 py-1 rounded-pill">
            SOA 2400032790
          </span>
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#topNavbarContent"
          aria-controls="topNavbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-3"></i>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="topNavbarContent">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1 mt-2 mt-lg-0">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`} end>
                <i className="bi bi-grid-1x2"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/records" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
                <i className="bi bi-table"></i>
                <span>Directory</span>
                <span className="badge bg-secondary-subtle text-secondary ms-1 rounded-pill fs-8">
                  {charities.length}
                </span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/add" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>
                <i className="bi bi-plus-circle"></i>
                <span>Add Record</span>
              </NavLink>
            </li>


            <li className="nav-item ms-lg-2">
              <a
                className="btn btn-sm btn-outline-info text-info fw-semibold rounded-pill px-3 d-inline-flex align-items-center gap-1"
                href={SWAGGER_URL}
                target="_blank"
                rel="noreferrer"
                title="Launch OpenAPI Swagger UI"
              >
                <i className="bi bi-lightning-charge-fill"></i>
                <span>Swagger UI</span>
              </a>
            </li>

            <li className="nav-item ms-lg-1">
              <button
                type="button"
                className="btn btn-sm btn-light border rounded-pill px-3 d-inline-flex align-items-center gap-1 text-secondary"
                onClick={fetchCharities}
                disabled={loading}
                title="Refresh database records"
              >
                <i className={`bi bi-arrow-clockwise ${loading ? 'spin' : ''}`}></i>
                <span>Refresh</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
