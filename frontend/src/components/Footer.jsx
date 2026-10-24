export default function Footer() {
  return (
    <footer className="footer py-4 bg-white border-top mt-auto">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-muted small">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-semibold text-dark">SOA Exam Task</span>
            <span>•</span>
            <span>Candidate Roll No: <strong className="text-dark font-monospace">2400032790</strong></span>
          </div>
          <div>
            Spring Boot REST (<code>com.klef.soa.docker</code>) • PostgreSQL • React + Bootstrap 5
          </div>
        </div>
      </div>
    </footer>
  )
}
