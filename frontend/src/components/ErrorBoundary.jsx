import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center p-4 bg-light">
          <div className="card card-saas p-5 text-center shadow-sm" style={{ maxWidth: '520px' }}>
            <div className="bg-danger-subtle text-danger p-3 rounded-circle d-inline-flex mx-auto mb-3" style={{ width: '64px', height: '64px', alignItems: 'center', justifyContent: 'center' }}>
              <i className="bi bi-exclamation-triangle-fill fs-3"></i>
            </div>
            <h4 className="fw-bold text-dark mb-2">Something went wrong</h4>
            <p className="text-muted small mb-3">
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            <div>
              <button className="btn btn-primary rounded-pill px-4" onClick={this.handleReload}>
                Reload Application
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
