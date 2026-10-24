import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCharity } from '../context/CharityContext'
import StatusBadge from '../components/StatusBadge'
import ConfirmModal from '../components/ConfirmModal'

export default function RecordDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCharityById, deleteCharity } = useCharity()

  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fetchItem = async () => {
      setLoading(true)
      try {
        const data = await getCharityById(id)
        if (isMounted) setRecord(data)
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchItem()
    return () => { isMounted = false }
  }, [id, getCharityById])

  const handleDelete = async () => {
    try {
      await deleteCharity(id)
      navigate('/records')
    } finally {
      setShowDeleteModal(false)
    }
  }

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <div className="text-muted small">Loading fundraiser record details...</div>
      </div>
    )
  }

  if (error || !record) {
    return (
      <div className="card card-saas p-5 text-center my-4">
        <i className="bi bi-search text-muted display-4 mb-3"></i>
        <h5 className="fw-bold">Record Not Found</h5>
        <p className="text-muted small mb-4">No fundraiser record with ID #{id} was found in the database.</p>
        <Link to="/records" className="btn btn-primary rounded-pill px-4 mx-auto">
          Back to Directory
        </Link>
      </div>
    )
  }

  const target = Number(record.targetAmount || 0)
  const raised = Number(record.amountRaised || 0)
  const remaining = Math.max(0, target - raised)
  const percent = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0

  return (
    <div className="py-4">
      {/* Navigation Breadcrumb */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-2">
          <Link to="/records" className="text-decoration-none text-muted small">
            Directory
          </Link>
          <span className="text-muted small">/</span>
          <span className="small fw-semibold text-dark">Record #{id}</span>
        </div>
        <Link to="/records" className="btn btn-outline-secondary btn-sm rounded-pill px-3">
          ← Back to Directory
        </Link>
      </div>

      {/* Hero Header Card */}
      <div className="card card-saas p-4 mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 pb-3 border-bottom mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge-code">ID #{record.id}</span>
              <StatusBadge completed={record.completed} />
            </div>
            <h3 className="fw-bold text-dark mb-1">{record.fundraiserName}</h3>
            <small className="text-muted">Entity: <code>com.klef.soa.docker.entity.CharityEntity</code></small>
          </div>
          <div className="d-flex gap-2">
            <Link to={`/edit/${record.id}`} className="btn btn-success text-white rounded-pill px-4 d-inline-flex align-items-center gap-2 shadow-sm fw-semibold">
              <i className="bi bi-pencil-square"></i>
              <span>Edit Record</span>
            </Link>
            <button
              type="button"
              className="btn btn-danger text-white rounded-pill px-4 d-inline-flex align-items-center gap-2 shadow-sm fw-semibold"
              onClick={() => setShowDeleteModal(true)}
            >
              <i className="bi bi-trash3"></i>
              <span>Delete</span>
            </button>
          </div>
        </div>

        {/* Large Progress Bar */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted small fw-semibold text-uppercase">Funding Progress</span>
            <span className="fw-bold fs-5 text-dark font-monospace">{percent}%</span>
          </div>
          <div className="progress progress-slim" style={{ height: '14px' }}>
            <div
              className={`progress-bar ${record.completed || percent >= 100 ? 'bg-success' : 'bg-primary'}`}
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={percent}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>

        {/* Breakdown Metric Cards */}
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded-3 border">
              <small className="text-muted fw-semibold text-uppercase d-block mb-1">Target Goal</small>
              <h4 className="fw-bold text-dark mb-0 font-monospace">₹{target.toLocaleString('en-IN')}</h4>
              <small className="text-muted">Total financial requirement</small>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded-3 border">
              <small className="text-muted fw-semibold text-uppercase d-block mb-1">Total Raised</small>
              <h4 className="fw-bold text-success mb-0 font-monospace">₹{raised.toLocaleString('en-IN')}</h4>
              <small className="text-muted">Collected so far</small>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded-3 border">
              <small className="text-muted fw-semibold text-uppercase d-block mb-1">Remaining</small>
              <h4 className="fw-bold text-info mb-0 font-monospace">₹{remaining.toLocaleString('en-IN')}</h4>
              <small className="text-muted">Balance needed for goal</small>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Confirm Delete"
        message={`Are you sure you want to delete fundraiser #${record.id} ("${record.fundraiserName}") from the database?`}
        confirmText="Confirm Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  )
}
