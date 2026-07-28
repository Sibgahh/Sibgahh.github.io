import { Link } from 'react-router-dom'

export type PathCrumb = {
  label: string
  /** Omit `to` for the current page segment. */
  to?: string
}

export default function PathTrail({
  items,
  className = 'portfolio-back',
}: {
  items: PathCrumb[]
  className?: string
}) {
  return (
    <nav className={`path-trail ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="path-trail-seg">
          {index > 0 && (
            <span className="path-trail-sep" aria-hidden="true">
              /
            </span>
          )}
          {item.to ? (
            <Link to={item.to} className="path-trail-link">
              {item.label}
            </Link>
          ) : (
            <span className="path-trail-current" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
