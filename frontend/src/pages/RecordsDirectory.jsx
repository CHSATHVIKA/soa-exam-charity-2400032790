import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCharity } from '../context/CharityContext'
import StatusBadge from '../components/StatusBadge'
import ProgressBar from '../components/ProgressBar'
import ConfirmModal from '../components/ConfirmModal'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function RecordsDirectory() {
  const { charities, loading, error, deleteCharity, fetchCharities } = useCharity()

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL') // 'ALL' | 'COMPLETED' | 'PROGRESS'
  const [sortBy, setSortBy] = useState('NEWEST') // 'NEWEST' | 'TARGET_DESC' | 'RAISED_DESC' | 'NAME_ASC'

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null) // { id, name }

  // Filter & Sort Logic
  const processedCharities = useMemo(() => {
    let result = [...charities]

    // 1. Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (c) =>
          c.fundraiserName?.toLowerCase().includes(term) ||
          String(c.id).includes(term)
      )
    }

    // 2. Status filter
    if (statusFilter === 'COMPLETED') {
      result = result.filter((c) => Boolean(c.completed))
    } else if (statusFilter === 'PROGRESS') {
      result = result.filter((c) => !c.completed)
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === 'NEWEST') return Number(b.id) - Number(a.id)
      if (sortBy === 'TARGET_DESC') return Number(b.targetAmount) - Number(a.targetAmount)
      if (sortBy === 'RAISED_DESC') return Number(b.amountRaised) - Number(a.amountRaised)
      if (sortBy === 'NAME_ASC') return (a.fundraiserName || '').localeCompare(b.fundraiserName || '')
      return 0
    })

    return result
  }, [charities, searchTerm, statusFilter, sortBy])

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    try {
      await deleteCharity(deleteTarget.id)
    } finally {
      setDeleteTarget(null)
    }
  }

  return (
    <div className="py-4">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h4 className="fw-bold text-dark mb-1">Fundraiser Records Directory</h4>
          <p className="text-muted small mb-0">
            Browse, inspect, filter, and manage all charity records persisted in PostgreSQL.
          </p>
        </div>
        <div>
          <Link to="/add" className="btn btn-primary rounded-pill px-4 d-inline-flex align-items-center gap-2 shadow-sm">
            <i className="bi bi-plus-lg"></i>
            <span>Add New Record</span>
          </Link>
        </div>
      </div>

      {/* Control Bar: Search, Status Filter, Sort */}
      <div className="card card-saas p-3 mb-4">
        <div className="row g-2 align-items-center">
          {/* Search Input */}
          <div className="col-12 col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0 shadow-none"
                placeholder="Search by fundraiser name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-outline-secondary border-start-0"
                  type="button"
                  onClick={() => setSearchTerm('')}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div className="col-6 col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white text-muted small">
                <i className="bi bi-funnel"></i>
              </span>
              <select
                className="form-select shadow-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="COMPLETED">Completed Only</option>
                <option value="PROGRESS">In Progress Only</option>
              </select>
            </div>
          </div>

          {/* Sort Option */}
          <div className="col-6 col-md-3">
            <div className="input-group">
              <span className="input-group-text bg-white text-muted small">
                <i className="bi bi-sort-down"></i>
              </span>
              <select
                className="form-select shadow-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="NEWEST">Newest First</option>
                <option value="TARGET_DESC">Highest Target</option>
                <option value="RAISED_DESC">Highest Raised</option>
                <option value="NAME_ASC">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between p-3 rounded-3 mb-4 shadow-sm">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill fs-5"></i>
            <div>{error}</div>
          </div>
          <button className="btn btn-sm btn-outline-danger px-3 rounded-pill" onClick={fetchCharities}>
            Retry
          </button>
        </div>
      )}

      {/* Table Card */}
      <div className="table-card">
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-white">
          <div className="d-flex align-items-center gap-2">
            <h6 className="fw-bold text-dark mb-0">Records List</h6>
            <span className="badge bg-light text-secondary border font-monospace">
              {processedCharities.length} of {charities.length} total
            </span>
          </div>
          <small className="text-muted font-monospace">PostgreSQL Entity: exam_2400032790</small>
        </div>

        {loading ? (
          <LoadingSkeleton rows={5} />
        ) : charities.length === 0 ? (
          /* Empty Database State */
          <div className="text-center py-5 px-3">
            <div className="bg-light d-inline-flex p-4 rounded-circle mb-3">
              <i className="bi bi-folder-x display-4 text-muted"></i>
            </div>
            <h5 className="fw-bold text-dark">No Fundraiser Records in Database</h5>
            <p className="text-muted small mx-auto" style={{ maxWidth: '400px' }}>
              Your database is connected and ready. Click below to add your first charity fundraiser record.
            </p>
            <Link to="/add" className="btn btn-primary rounded-pill px-4 shadow-sm">
              + Register First Record
            </Link>
          </div>
        ) : processedCharities.length === 0 ? (
          /* No matching search/filter */
          <div className="text-center py-5">
            <i className="bi bi-search text-muted fs-1 mb-2 d-block"></i>
            <h6 className="fw-bold text-dark">No Matching Results</h6>
            <p className="text-muted small mb-3">
              No fundraiser matches your search "{searchTerm}" or selected filters.
            </p>
            <button
              className="btn btn-sm btn-outline-secondary rounded-pill px-3"
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('ALL')
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Main Records Table */
          <div className="table-responsive">
            <table className="table table-custom mb-0">
              <thead>
                <tr>
                  <th style={{ width: '80px' }} className="ps-3">ID</th>
                  <th>Fundraiser Campaign</th>
                  <th className="text-end">Target Goal</th>
                  <th className="text-end">Amount Raised</th>
                  <th style={{ width: '180px' }}>Progress</th>
                  <th>Status</th>
                  <th className="text-center pe-3" style={{ width: '200px' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {processedCharities.map((item) => {
                  const target = Number(item.targetAmount || 0)
                  const raised = Number(item.amountRaised || 0)

                  return (
                    <tr key={item.id}>
                      <td className="ps-3">
                        <span className="badge-code">#{item.id}</span>
                      </td>
                      <td>
                        <Link
                          to={`/details/${item.id}`}
                          className="fw-bold text-dark text-decoration-none d-block text-truncate"
                          style={{ maxWidth: '240px' }}
                          title={item.fundraiserName}
                        >
                          {item.fundraiserName}
                        </Link>
                        <small className="text-muted">Entity ID: {item.id}</small>
                      </td>
                      <td className="text-end font-monospace">
                        ₹{target.toLocaleString('en-IN')}
                      </td>
                      <td className="text-end font-monospace text-success fw-semibold">
                        ₹{raised.toLocaleString('en-IN')}
                      </td>
                      <td>
                        <ProgressBar current={raised} target={target} />
                      </td>
                      <td>
                        <StatusBadge completed={item.completed} />
                      </td>
                      <td className="text-center pe-3">
                        <div className="d-flex justify-content-center align-items-center gap-1">
                          {/* View Details Button */}
                          <Link
                            to={`/details/${item.id}`}
                            className="btn btn-sm btn-outline-secondary px-2 py-1 rounded-2"
                            title="View Details"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>

                          {/* Green Edit Button */}
                          <Link
                            to={`/edit/${item.id}`}
                            className="btn btn-sm btn-success text-white px-2 py-1 rounded-2 fw-semibold d-inline-flex align-items-center gap-1 shadow-sm"
                            title="Edit Record"
                          >
                            <i className="bi bi-pencil-square"></i>
                            <span>Edit</span>
                          </Link>

                          {/* Red Delete Button */}
                          <button
                            type="button"
                            className="btn btn-sm btn-danger text-white px-2 py-1 rounded-2 fw-semibold d-inline-flex align-items-center gap-1 shadow-sm"
                            title="Delete Record"
                            onClick={() => setDeleteTarget({ id: item.id, name: item.fundraiserName })}
                          >
                            <i className="bi bi-trash3"></i>
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Delete */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Confirm Record Deletion"
        message={`Are you sure you want to permanently delete fundraiser #${deleteTarget?.id} ("${deleteTarget?.name}") from PostgreSQL? This action cannot be undone.`}
        confirmText="Yes, Delete Record"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
