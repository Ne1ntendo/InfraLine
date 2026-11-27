import { initials } from '../../utils/format'
import styles from './Avatar.module.css'

// Round avatar with the user's initials (no profile photos in the data design).
export function Avatar({ user, size = 28, decorative = true }) {
  return (
    <span
      className={styles.avatar}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
      aria-hidden={decorative || undefined}
      title={decorative ? undefined : user?.fullName}
    >
      {initials(user?.fullName)}
    </span>
  )
}
