const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

function plural(value, unit) {
  return `${value} ${unit}${value === 1 ? '' : 's'} ago`
}

/** "[time ago]" text used across the wireframes, e.g. "5 hours ago". */
export function timeAgo(isoDate, now = Date.now()) {
  const seconds = Math.max(0, Math.floor((now - new Date(isoDate).getTime()) / 1000))
  if (seconds < MINUTE) return 'just now'
  if (seconds < HOUR) return plural(Math.floor(seconds / MINUTE), 'minute')
  if (seconds < DAY) return plural(Math.floor(seconds / HOUR), 'hour')
  if (seconds < 30 * DAY) return plural(Math.floor(seconds / DAY), 'day')
  return formatDateTime(isoDate)
}

/** dd/mm/yyyy hh:mm, the format used in the wireframes. */
export function formatDateTime(isoDate) {
  const date = new Date(isoDate)
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`
}

/** Campus › Block › Floor › Room, skipping levels that were not chosen. */
export function formatLocation(location) {
  return [location.campus, location.block, location.floor, location.room]
    .filter(Boolean)
    .join(' › ')
}

export function initials(fullName = '') {
  const parts = fullName.trim().split(/\s+/)
  const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0]?.[0]
  return (letters ?? '?').toUpperCase()
}
