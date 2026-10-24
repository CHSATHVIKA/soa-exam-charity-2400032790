const SWAGGER_URL = 'http://localhost:8081/swagger-ui/index.html'

export default function SwaggerInfo() {
  const endpoints = [
    {
      method: 'GET',
      badgeClass: 'bg-success',
      path: '/api/charities',
      desc: 'Retrieves all charity fundraiser records from PostgreSQL database.',
      sampleResponse: `[
  {
    "id": 1,
    "fundraiserName": "Clean Drinking Water Initiative",
    "targetAmount": 50000.0,
    "amountRaised": 32000.0,
    "completed": false
  }
]`,
    },
    {
      method: 'POST',
      badgeClass: 'bg-primary',
      path: '/api/charities',
      desc: 'Registers a new charity fundraiser. Note: ID must NOT be passed in the request body; it is auto-generated.',
      sampleRequest: `{
  "fundraiserName": "Youth Education Scholarship",
  "targetAmount": 75000.0,
  "amountRaised": 15000.0,
  "completed": false
}`,
      sampleResponse: `{
  "id": 2,
  "fundraiserName": "Youth Education Scholarship",
  "targetAmount": 75000.0,
  "amountRaised": 15000.0,
  "completed": false
}`,
    },
    {
      method: 'GET',
      badgeClass: 'bg-success',
      path: '/api/charities/{id}',
      desc: 'Fetches details for a single charity fundraiser by primary key ID.',
      sampleResponse: `{
  "id": 1,
  "fundraiserName": "Clean Drinking Water Initiative",
  "targetAmount": 50000.0,
  "amountRaised": 32000.0,
  "completed": false
}`,
    },
    {
      method: 'PUT',
      badgeClass: 'bg-warning text-dark',
      path: '/api/charities/{id}',
      desc: 'Updates an existing fundraiser record by ID in PostgreSQL.',
      sampleRequest: `{
  "fundraiserName": "Clean Water Initiative - Phase 2",
  "targetAmount": 60000.0,
  "amountRaised": 60000.0,
  "completed": true
}`,
      sampleResponse: `{
  "id": 1,
  "fundraiserName": "Clean Water Initiative - Phase 2",
  "targetAmount": 60000.0,
  "amountRaised": 60000.0,
  "completed": true
}`,
    },
    {
      method: 'DELETE',
      badgeClass: 'bg-danger',
      path: '/api/charities/{id}',
      desc: 'Deletes a fundraiser entity from PostgreSQL database by primary key ID.',
      sampleResponse: `Status: 204 No Content`,
    },
  ]

  return (
    <div className="py-4">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h4 className="fw-bold text-dark mb-0">REST API Documentation &amp; Contract</h4>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill">
              Spring Boot 3.4.4
            </span>
          </div>
          <p className="text-muted small mb-0">
            OpenAPI specification, REST endpoints, and schema contracts for the SOA Exam project.
          </p>
        </div>
        <div>
          <a
            href={SWAGGER_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary rounded-pill px-4 d-inline-flex align-items-center gap-2 shadow-sm"
          >
            <i className="bi bi-box-arrow-up-right"></i>
            <span>Launch Interactive Swagger UI</span>
          </a>
        </div>
      </div>

      {/* Backend & DB Architecture Overview Card */}
      <div className="card card-saas p-4 mb-4">
        <h6 className="fw-bold text-dark mb-3">Backend Architecture &amp; Data Model</h6>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded-3 border h-100">
              <small className="text-muted text-uppercase fw-semibold d-block mb-1">Controller &amp; Service</small>
              <div className="font-monospace text-dark small fw-semibold">com.klef.soa.docker.controller.CharityController</div>
              <small className="text-muted d-block mt-1">Base Path: <code>/api/charities</code></small>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded-3 border h-100">
              <small className="text-muted text-uppercase fw-semibold d-block mb-1">Database &amp; Table</small>
              <div className="font-monospace text-dark small fw-semibold">PostgreSQL (port 5432)</div>
              <small className="text-muted d-block mt-1">Table: <code>exam_2400032790</code></small>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-3 bg-light rounded-3 border h-100">
              <small className="text-muted text-uppercase fw-semibold d-block mb-1">Candidate ID &amp; DTO</small>
              <div className="font-monospace text-primary small fw-semibold">Roll No: 2400032790</div>
              <small className="text-muted d-block mt-1">Payload: <code>CharityDTO</code></small>
            </div>
          </div>
        </div>
      </div>

      {/* Endpoints List */}
      <div className="d-flex flex-column gap-3">
        {endpoints.map((ep, idx) => (
          <div key={idx} className="card card-saas p-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
              <div className="d-flex align-items-center gap-2">
                <span className={`badge ${ep.badgeClass} px-3 py-2 fw-bold font-monospace`} style={{ minWidth: '75px', textAlign: 'center' }}>
                  {ep.method}
                </span>
                <span className="font-monospace fw-bold text-dark fs-6">{ep.path}</span>
              </div>
              <span className="text-muted small">JSON Application Protocol</span>
            </div>
            <p className="text-secondary small mb-3">{ep.desc}</p>

            <div className="row g-3">
              {ep.sampleRequest && (
                <div className="col-12 col-md-6">
                  <small className="text-muted fw-semibold text-uppercase d-block mb-1">Request Body</small>
                  <pre className="p-3 bg-light rounded-3 border text-dark font-monospace small mb-0 overflow-auto" style={{ maxHeight: '180px' }}>
                    {ep.sampleRequest}
                  </pre>
                </div>
              )}
              <div className={ep.sampleRequest ? 'col-12 col-md-6' : 'col-12'}>
                <small className="text-muted fw-semibold text-uppercase d-block mb-1">Expected Response</small>
                <pre className="p-3 bg-light rounded-3 border text-dark font-monospace small mb-0 overflow-auto" style={{ maxHeight: '180px' }}>
                  {ep.sampleResponse}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
