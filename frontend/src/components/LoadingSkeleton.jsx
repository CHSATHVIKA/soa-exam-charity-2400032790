export default function LoadingSkeleton({ rows = 5 }) {
  return (
    <div className="p-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="d-flex align-items-center gap-3 py-3 border-bottom">
          <div className="skeleton-line" style={{ width: '40px' }}></div>
          <div className="skeleton-line flex-grow-1" style={{ maxWidth: '240px' }}></div>
          <div className="skeleton-line" style={{ width: '100px' }}></div>
          <div className="skeleton-line" style={{ width: '100px' }}></div>
          <div className="skeleton-line" style={{ width: '120px' }}></div>
          <div className="skeleton-line" style={{ width: '80px' }}></div>
          <div className="skeleton-line" style={{ width: '70px' }}></div>
        </div>
      ))}
    </div>
  )
}
