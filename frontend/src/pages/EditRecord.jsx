import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCharity } from '../context/CharityContext'

export default function EditRecord() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getCharityById, updateCharity } = useCharity()

  const [form, setForm] = useState({
    fundraiserName: '',
    targetAmount: '',
    amountRaised: '',
    completed: false,
  })

  const [fetching, setFetching] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const loadRecord = async () => {
      setFetching(true)
      try {
        const data = await getCharityById(id)
        if (isMounted) {
          setForm({
            fundraiserName: data.fundraiserName || '',
            targetAmount: data.targetAmount !== undefined ? String(data.targetAmount) : '',
            amountRaised: data.amountRaised !== undefined ? String(data.amountRaised) : '',
            completed: Boolean(data.completed),
          })
        }
      } catch (err) {
        if (isMounted) setFetchError(err.message)
      } finally {
        if (isMounted) setFetching(false)
      }
    }
    loadRecord()
    return () => { isMounted = false }
  }, [id, getCharityById])

  const validate = () => {
    const errs = {}
    if (!form.fundraiserName.trim()) {
      errs.fundraiserName = 'Fundraiser name is required.'
    } else if (form.fundraiserName.trim().length < 3) {
      errs.fundraiserName = 'Name must be at least 3 characters.'
    } else if (form.fundraiserName.trim().length > 100) {
      errs.fundraiserName = 'Name cannot exceed 100 characters.'
    }

    if (form.targetAmount === '' || form.targetAmount === null) {
      errs.targetAmount = 'Target goal is required.'
    } else if (Number(form.targetAmount) <= 0) {
      errs.targetAmount = 'Target goal must be a positive number greater than 0.'
    }

    if (form.amountRaised === '' || form.amountRaised === null) {
      errs.amountRaised = 'Amount raised is required.'
    } else if (Number(form.amountRaised) < 0) {
      errs.amountRaised = 'Amount raised cannot be negative.'
    }

    return errs
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setForm((prev) => ({ ...prev, [name]: val }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        fundraiserName: form.fundraiserName.trim(),
        targetAmount: Number(form.targetAmount),
        amountRaised: Number(form.amountRaised),
        completed: Boolean(form.completed),
      }
      await updateCharity(id, payload)
      navigate(`/details/${id}`)
    } catch {
      // Error handled by context toast
    } finally {
      setSubmitting(false)
    }
  }

  if (fetching) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <div className="text-muted small">Retrieving record #{id} from database...</div>
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="card card-saas p-5 text-center my-4">
        <i className="bi bi-exclamation-triangle text-danger display-5 mb-3"></i>
        <h5 className="fw-bold">Record Not Found</h5>
        <p className="text-muted small mb-4">{fetchError}</p>
        <Link to="/records" className="btn btn-primary rounded-pill px-4 mx-auto">
          Back to Directory
        </Link>
      </div>
    )
  }

  return (
    <div className="py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <h4 className="fw-bold text-dark mb-0">Edit Fundraiser</h4>
                <span className="badge bg-primary font-monospace">Record #{id}</span>
              </div>
              <p className="text-muted small mb-0">
                Update details for this campaign and persist changes via <code>PUT /Update/{id}</code>.
              </p>
            </div>
            <Link to={`/details/${id}`} className="btn btn-outline-secondary btn-sm rounded-pill px-3">
              ← View Record
            </Link>
          </div>

          {/* Form Card */}
          <div className="card card-saas p-4">
            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3">
                {/* ID Badge Display (Read Only) */}
                <div className="col-12">
                  <div className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-muted d-block">Entity Identification</small>
                      <strong>Database Primary Key: #{id}</strong>
                    </div>
                    <span className="badge bg-secondary font-monospace">Auto-Generated (Read-Only)</span>
                  </div>
                </div>

                {/* Fundraiser Name */}
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className={`form-control ${errors.fundraiserName ? 'is-invalid' : form.fundraiserName ? 'is-valid' : ''}`}
                      id="floatingEditName"
                      placeholder="Fundraiser Name"
                      name="fundraiserName"
                      value={form.fundraiserName}
                      onChange={handleChange}
                      maxLength={100}
                      required
                    />
                    <label htmlFor="floatingEditName">Fundraiser Campaign Name *</label>
                    {errors.fundraiserName && (
                      <div className="invalid-feedback">{errors.fundraiserName}</div>
                    )}
                  </div>
                </div>

                {/* Target Amount */}
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className={`form-control ${errors.targetAmount ? 'is-invalid' : form.targetAmount ? 'is-valid' : ''}`}
                      id="floatingEditTarget"
                      placeholder="50000"
                      name="targetAmount"
                      min="1"
                      step="0.01"
                      value={form.targetAmount}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="floatingEditTarget">Target Budget Goal (₹) *</label>
                    {errors.targetAmount && (
                      <div className="invalid-feedback">{errors.targetAmount}</div>
                    )}
                  </div>
                </div>

                {/* Amount Raised */}
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className={`form-control ${errors.amountRaised ? 'is-invalid' : form.amountRaised ? 'is-valid' : ''}`}
                      id="floatingEditRaised"
                      placeholder="10000"
                      name="amountRaised"
                      min="0"
                      step="0.01"
                      value={form.amountRaised}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="floatingEditRaised">Current Amount Collected (₹) *</label>
                    {errors.amountRaised && (
                      <div className="invalid-feedback">{errors.amountRaised}</div>
                    )}
                  </div>
                </div>

                {/* Completed Toggle */}
                <div className="col-12">
                  <div className="p-3 bg-light rounded-3 border">
                    <div className="form-check form-switch mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="editCompletedSwitch"
                        name="completed"
                        checked={form.completed}
                        onChange={handleChange}
                      />
                      <label className="form-check-label fw-semibold text-dark ms-2" htmlFor="editCompletedSwitch">
                        Campaign Status: Goal Achieved / Completed
                      </label>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="col-12 d-flex gap-2 pt-3 border-top mt-4">
                  <button
                    type="submit"
                    className="btn btn-warning text-dark px-4 py-2 rounded-pill fw-semibold d-inline-flex align-items-center gap-2 shadow-sm"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status"></span>
                        <span>Saving Changes...</span>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-floppy"></i>
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-light border px-4 py-2 rounded-pill"
                    onClick={() => navigate(`/details/${id}`)}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
