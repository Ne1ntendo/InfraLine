import { Link } from 'react-router-dom'
import { CATEGORIES, ROLES, WORK_ORDER_STATUS, WORK_ORDER_STATUS_LABELS } from '../../../constants/domain'
import styles from './ForumSidebar.module.css'

// The personal entry under "All reports" depends on the role:
// requesters see their own reports, technicians the ones assigned to them,
// administrators have none (Wireframes-updated.pdf p.1–3).
function getScopeItems(role) {
  if (role === ROLES.REQUESTER) return [{ view: 'mine', label: 'My reports', countKey: 'mine' }]
  if (role === ROLES.TECHNICIAN) {
    return [{ view: 'assigned', label: 'Assigned to me', countKey: 'assigned' }]
  }
  return []
}

function SidebarItem({ selected, onSelect, label, count }) {
  return (
    <li>
      <button
        type="button"
        className={selected ? `${styles.item} ${styles.itemSelected}` : styles.item}
        aria-pressed={selected}
        onClick={onSelect}
      >
        <span>{label}</span>
        {count !== undefined && (
          <span className={styles.count} aria-label={`${count} reports`}>
            {count}
          </span>
        )}
      </button>
    </li>
  )
}

export function ForumSidebar({
  role,
  view,
  onViewChange,
  counts,
  status,
  onStatusChange,
  campus,
  onCampusChange,
  campuses,
}) {
  return (
    <aside className={styles.sidebar} aria-label="Forum filters">
      {role === ROLES.REQUESTER && (
        <Link to="/reports/new" className={styles.createButton}>
          + Create Report
        </Link>
      )}

      <ul className={styles.list}>
        <SidebarItem
          label="All reports"
          selected={view === 'all'}
          onSelect={() => onViewChange('all')}
        />
        {getScopeItems(role).map((item) => (
          <SidebarItem
            key={item.view}
            label={item.label}
            count={counts?.[item.countKey]}
            selected={view === item.view}
            onSelect={() => onViewChange(item.view)}
          />
        ))}
      </ul>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle} id="categories-title">
          Categories
        </h2>
        <ul className={styles.list} aria-labelledby="categories-title">
          {CATEGORIES.map((name) => {
            const categoryView = `category:${name}`
            return (
              <SidebarItem
                key={name}
                label={name}
                count={counts?.categories?.[name]}
                selected={view === categoryView}
                onSelect={() => onViewChange(categoryView)}
              />
            )
          })}
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Filter</h2>

        <label className={styles.label} htmlFor="forum-status">
          Status
        </label>
        <select
          id="forum-status"
          className={styles.select}
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value={WORK_ORDER_STATUS.ASSIGNED}>
            {WORK_ORDER_STATUS_LABELS[WORK_ORDER_STATUS.ASSIGNED]}
          </option>
          <option value={WORK_ORDER_STATUS.IN_PROGRESS}>
            {WORK_ORDER_STATUS_LABELS[WORK_ORDER_STATUS.IN_PROGRESS]}
          </option>
        </select>

        <label className={styles.label} htmlFor="forum-location">
          Location
        </label>
        <select
          id="forum-location"
          className={styles.select}
          value={campus}
          onChange={(e) => onCampusChange(e.target.value)}
        >
          <option value="all">All</option>
          {campuses.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </aside>
  )
}
