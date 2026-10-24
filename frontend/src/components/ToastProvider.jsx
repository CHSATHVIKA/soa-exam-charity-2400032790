import { useCharity } from '../context/CharityContext'

export default function ToastProvider() {
  const { toasts, removeToast } = useCharity()

  if (toasts.length === 0) return null

  return (
    <div className="toast-container-fixed">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success'

        return (
          <div
            key={toast.id}
            className="toast-custom p-3 d-flex align-items-center justify-content-between gap-3"
            style={{
              borderLeft: `4px solid ${isSuccess ? 'var(--success)' : 'var(--danger)'}`,
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <i
                className={`bi ${isSuccess ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'} fs-5`}
              ></i>
              <div className="small fw-medium text-dark">{toast.message}</div>
            </div>
            <button
              type="button"
              className="btn-close btn-sm flex-shrink-0"
              aria-label="Close"
              onClick={() => removeToast(toast.id)}
            ></button>
          </div>
        )
      })}
    </div>
  )
}
