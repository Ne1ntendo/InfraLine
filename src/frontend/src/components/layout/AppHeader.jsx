import { useCallback } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getHeaderCounts } from '../../api/reports'
import { ROLE_LABELS, ROLES } from '../../constants/domain'
import { useAsyncData } from '../../hooks/useAsyncData'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { Avatar } from '../common/Avatar'
import { Logo } from '../common/Logo'
import styles from './AppHeader.module.css'

// Header menu from the screen flows: each role sees its own links
// (Wireframes-updated.pdf p.1–3).
function getNavItems(role, pendingReviews) {
  switch (role) {
    case ROLES.ADMINISTRATOR:
      return [
        { to: '/review', label: `Review Reports (${pendingReviews ?? '…'})` },
        { to: '/checklist', label: 'Maintenance Checklist' },
        { to: '/forum', label: 'Forum' },
        { to: '/history', label: 'History' },
      ]
    case ROLES.TECHNICIAN:
      return [
        { to: '/checklist', label: 'Maintenance Checklist' },
        { to: '/forum', label: 'Forum' },
        { to: '/history', label: 'History' },
      ]
    default:
      return [
        { to: '/forum', label: 'Forum' },
        { to: '/history', label: 'History' },
      ]
  }
}

export function AppHeader() {
  const { user } = useCurrentUser()
  const navigate = useNavigate()
  const isAdmin = user.role === ROLES.ADMINISTRATOR

  const fetchCounts = useCallback(() => getHeaderCounts(user), [user])
  const { data: counts } = useAsyncData(fetchCounts)

  const navItems = getNavItems(user.role, counts?.pendingReviews)
  const unread = counts?.unreadNotifications ?? 0

  // TODO: call the real logout once the login page/auth is merged.
  const handleLogout = () => navigate('/login')

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/forum" className={styles.brand}>
          <Logo />
          <span>InfraLine{isAdmin ? ' · Admin' : ''}</span>
        </Link>

        <nav aria-label="Main">
          <ul className={styles.nav}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.right}>
        {/* Administrators have no notification bell in the wireframes. */}
        {!isAdmin && (
          <button
            type="button"
            className={styles.bell}
            aria-label={`Notifications, ${unread} unread`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Zm4 3.5a2 2 0 0 0 4 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            {unread > 0 && <span className={styles.badge}>{unread}</span>}
          </button>
        )}

        <span className={styles.user}>
          <Avatar user={user} size={34} />
          <span>
            {user.fullName} · {ROLE_LABELS[user.role]}
          </span>
        </span>

        <button type="button" className={styles.logout} onClick={handleLogout}>
          Log out
        </button>
      </div>
    </header>
  )
}
