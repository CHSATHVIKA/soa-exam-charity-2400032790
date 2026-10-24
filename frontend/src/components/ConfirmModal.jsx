export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', isDanger = true }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-dialog-custom" onClick={(e) => e.stopPropagation()}>
        <div className="p-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
              style={{
                width: '44px',
                height: '44px',
                backgroundColor: isDanger ? 'var(--danger-subtle)' : 'var(--primary-subtle)',
                color: isDanger ? 'var(--danger)' : 'var(--primary)',
              }}
            >
              <i className={isDanger ? 'bi bi-exclamation-triangle-fill fs-5' : 'bi bi-info-circle-fill fs-5'}></i>
            </div>
            <div>
              <h5 className="fw-bold mb-1 text-dark">{title}</h5>
              <div className="text-muted small">Action Confirmation</div>
            </div>
          </div>
          <p className="text-secondary mb-4">{message}</p>
          <div className="d-flex justify-content-end gap-2 pt-2 border-top">
            <button
              type="button"
              className="btn btn-sm btn-light border px-3 rounded-3"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`btn btn-sm ${isDanger ? 'btn-danger' : 'btn-primary'} px-3 rounded-3 fw-semibold`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
