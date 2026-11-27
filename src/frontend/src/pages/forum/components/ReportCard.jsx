import { Link } from 'react-router-dom'
import { Avatar } from '../../../components/common/Avatar'
import { ImagePlaceholder } from '../../../components/common/ImagePlaceholder'
import { WORK_ORDER_STATUS_LABELS } from '../../../constants/domain'
import { formatDateTime, formatLocation, timeAgo } from '../../../utils/format'
import styles from './ReportCard.module.css'

function AssignedTechnicians({ technicians }) {
  if (technicians.length === 0) return null
  const [first, ...rest] = technicians
  const names = technicians.map((t) => t.fullName).join(', ')

  return (
    <span className={styles.assigned}>
      <span>Assigned to</span>
      <span className={styles.avatars} aria-hidden="true">
        {technicians.slice(0, 2).map((technician) => (
          <Avatar key={technician.id} user={technician} size={22} />
        ))}
      </span>
      <span title={names}>
        {first.fullName}
        {rest.length > 0 && ` +${rest.length}`}
      </span>
    </span>
  )
}

// One report in the S01 feed. The whole card opens S03 Report detail.
export function ReportCard({ report }) {
  const statusLabel = WORK_ORDER_STATUS_LABELS[report.workOrderStatus]
  const title = report.isUpdated ? `[Updated] ${report.title}` : report.title

  return (
    <article className={styles.card}>
      <header className={styles.top}>
        <Avatar user={report.requester} size={30} />
        <p className={styles.meta}>
          <strong>{report.requester?.fullName ?? 'Unknown user'}</strong>{' '}
          posted{' '}
          <time dateTime={report.createdAt} title={formatDateTime(report.createdAt)}>
            {timeAgo(report.createdAt)}
          </time>
          {report.tags.length > 0 && (
            <>
              {' '}
              in <span className={styles.tags}>{report.tags.join(', ')}</span>
            </>
          )}
        </p>
        <span className={styles.status}>{statusLabel}</span>
      </header>

      <div className={styles.body}>
        <div className={styles.text}>
          <h2 className={styles.title}>
            <Link to={`/reports/${report.id}`} className={styles.titleLink}>
              {title}
            </Link>
          </h2>
          <p className={styles.description}>{report.description}</p>
        </div>
        {report.photoCount > 0 && (
          <ImagePlaceholder
            label={`${report.photoCount} photo${report.photoCount === 1 ? '' : 's'} attached`}
          />
        )}
      </div>

      <footer className={styles.bottom}>
        <span className={styles.location}>
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path
              d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          <span className="visually-hidden">Location:</span>
          {formatLocation(report.location)}
        </span>
        <AssignedTechnicians technicians={report.technicians} />
      </footer>
    </article>
  )
}
