// Forum data access. Every function returns a Promise so the pages already
// behave like they would with the real backend (loading / error states).
// TODO: replace the mock bodies with request() from ./client.js once the
// forum endpoints exist in the backend.
import { CATEGORIES, REPORT_STATUS, ROLES, WORK_ORDER_STATUS } from '../constants/domain'
import { MOCK_REPORTS } from '../mocks/reports'
import { findUserById, MOCK_UNREAD_NOTIFICATIONS } from '../mocks/users'

const MOCK_DELAY_MS = 250

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), MOCK_DELAY_MS))
}

// The forum shows approved reports whose work order is still open.
// Closed reports move to History (S05); pending/rejected/archived never show.
function isOnForum(report) {
  return (
    report.status === REPORT_STATUS.APPROVED &&
    (report.workOrderStatus === WORK_ORDER_STATUS.ASSIGNED ||
      report.workOrderStatus === WORK_ORDER_STATUS.IN_PROGRESS)
  )
}

function toForumItem(report) {
  return {
    id: report.id,
    title: report.title,
    description: report.description,
    requester: findUserById(report.requesterId),
    tags: report.tags,
    location: report.location,
    createdAt: report.createdAt,
    isUpdated: report.isUpdated,
    workOrderStatus: report.workOrderStatus,
    technicians: report.technicianIds.map(findUserById).filter(Boolean),
    photoCount: report.photoCount,
  }
}

function matchesScope(report, scope, currentUser) {
  if (scope === 'mine') return report.requesterId === currentUser?.id
  if (scope === 'assigned') return report.technicianIds.includes(currentUser?.id)
  return true
}

function matchesSearch(report, search) {
  if (!search) return true
  const needle = search.toLowerCase()
  return (
    report.title.toLowerCase().includes(needle) ||
    report.description.toLowerCase().includes(needle)
  )
}

/**
 * @param {object} query
 * @param {'all'|'mine'|'assigned'} query.scope
 * @param {string|null} query.category  one of CATEGORIES, or null for all
 * @param {'all'|'assigned'|'in_progress'} query.status
 * @param {string} query.campus  campus name, or 'all'
 * @param {string} query.search
 * @param {'newest'|'oldest'} query.sort
 * @param {number} query.page  1-based
 * @param {number} query.pageSize
 * @param {object} currentUser
 * @returns {Promise<{items: object[], total: number, page: number, pageCount: number}>}
 */
export function getForumReports(query, currentUser) {
  const {
    scope = 'all',
    category = null,
    status = 'all',
    campus = 'all',
    search = '',
    sort = 'newest',
    page = 1,
    pageSize = 3,
  } = query

  const filtered = MOCK_REPORTS.filter(isOnForum)
    .filter((report) => matchesScope(report, scope, currentUser))
    .filter((report) => !category || report.tags.includes(category))
    .filter((report) => status === 'all' || report.workOrderStatus === status)
    .filter((report) => campus === 'all' || report.location.campus === campus)
    .filter((report) => matchesSearch(report, search))
    .sort((a, b) => {
      const diff = new Date(b.createdAt) - new Date(a.createdAt)
      return sort === 'oldest' ? -diff : diff
    })

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(Math.max(1, page), pageCount)
  const start = (safePage - 1) * pageSize

  return delay({
    items: filtered.slice(start, start + pageSize).map(toForumItem),
    total: filtered.length,
    page: safePage,
    pageCount,
  })
}

/** Counts shown next to the sidebar entries ([N] in the wireframe). */
export function getForumSidebarCounts(currentUser) {
  const forumReports = MOCK_REPORTS.filter(isOnForum)
  const categories = Object.fromEntries(
    CATEGORIES.map((name) => [name, forumReports.filter((r) => r.tags.includes(name)).length]),
  )

  return delay({
    mine: forumReports.filter((r) => matchesScope(r, 'mine', currentUser)).length,
    assigned: forumReports.filter((r) => matchesScope(r, 'assigned', currentUser)).length,
    categories,
  })
}

/** Options for the Location filter. */
export function getForumLocationOptions() {
  const campuses = [...new Set(MOCK_REPORTS.filter(isOnForum).map((r) => r.location.campus))]
  return delay(campuses.sort())
}

/** Badge numbers in the header: unread notifications and pending reviews. */
export function getHeaderCounts(currentUser) {
  return delay({
    unreadNotifications: MOCK_UNREAD_NOTIFICATIONS[currentUser?.id] ?? 0,
    pendingReviews:
      currentUser?.role === ROLES.ADMINISTRATOR
        ? MOCK_REPORTS.filter((r) => r.status === REPORT_STATUS.PENDING).length
        : 0,
  })
}
