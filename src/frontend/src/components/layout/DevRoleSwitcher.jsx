import { ROLE_LABELS, ROLES } from '../../constants/domain'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import styles from './DevRoleSwitcher.module.css'

// Development-only helper to preview each role's version of a screen.
// Rendered only when import.meta.env.DEV is true (see App.jsx), so it never
// ships in a production build.
export function DevRoleSwitcher() {
  const { user, setRole } = useCurrentUser()

  return (
    <div className={styles.switcher}>
      <label htmlFor="dev-role">Preview as (dev)</label>
      <select id="dev-role" value={user.role} onChange={(e) => setRole(e.target.value)}>
        {Object.values(ROLES).map((role) => (
          <option key={role} value={role}>
            {ROLE_LABELS[role]}
          </option>
        ))}
      </select>
    </div>
  )
}
