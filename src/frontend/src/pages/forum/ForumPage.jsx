import { useCallback, useEffect, useState } from 'react'
import { getForumLocationOptions, getForumReports, getForumSidebarCounts } from '../../api/reports'
import { useAsyncData } from '../../hooks/useAsyncData'
import { useCurrentUser } from '../../hooks/useCurrentUser'
import { ForumSidebar } from './components/ForumSidebar'
import { Pagination } from './components/Pagination'
import { ReportCard } from './components/ReportCard'
import { SearchSortBar } from './components/SearchSortBar'
import styles from './ForumPage.module.css'

// S01 – Forum (Wireframes-updated.pdf p.1–3, PA3 §6.1).
// Feed of approved reports with their status, location and assigned
// technicians, with search and filters. Each role has its own version.

const PAGE_SIZE = 3
const SEARCH_DEBOUNCE_MS = 300

// The sidebar list is a single selection, like the wireframe:
// 'all' | 'mine' | 'assigned' | 'category:<name>'
const CATEGORY_PREFIX = 'category:'

function viewToQuery(view) {
  if (view === 'mine' || view === 'assigned') return { scope: view, category: null }
  if (view.startsWith(CATEGORY_PREFIX)) {
    return { scope: 'all', category: view.slice(CATEGORY_PREFIX.length) }
  }
  return { scope: 'all', category: null }
}

export function ForumPage() {
  const { user } = useCurrentUser()

  const [view, setView] = useState('all')
  const [status, setStatus] = useState('all')
  const [campus, setCampus] = useState('all')
  const [sort, setSort] = useState('newest')
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')

  // Wait until the user stops typing before searching.
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput.trim()), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [searchInput])

  // Any change to the filters, search or sort goes back to page 1.
  const filtersKey = [view, status, campus, sort, search].join('|')
  const [pageState, setPageState] = useState({ filtersKey, page: 1 })
  const page = pageState.filtersKey === filtersKey ? pageState.page : 1

  const fetchReports = useCallback(
    () =>
      getForumReports(
        { ...viewToQuery(view), status, campus, search, sort, page, pageSize: PAGE_SIZE },
        user,
      ),
    [view, status, campus, search, sort, page, user],
  )
  const fetchCounts = useCallback(() => getForumSidebarCounts(user), [user])

  const reports = useAsyncData(fetchReports)
  const counts = useAsyncData(fetchCounts)
  const locations = useAsyncData(getForumLocationOptions)

  const handlePageChange = (nextPage) => {
    setPageState({ filtersKey, page: nextPage })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const result = reports.data

  return (
    <div className={styles.layout}>
      <ForumSidebar
        role={user.role}
        view={view}
        onViewChange={setView}
        counts={counts.data}
        status={status}
        onStatusChange={setStatus}
        campus={campus}
        onCampusChange={setCampus}
        campuses={locations.data ?? []}
      />

      <section className={styles.content} aria-labelledby="forum-title">
        <header className={styles.heading}>
          <h1 id="forum-title">Forum</h1>
          <p>Broken infrastructure reported around the facility. Closed reports move to History.</p>
        </header>

        <SearchSortBar
          search={searchInput}
          onSearchChange={setSearchInput}
          sort={sort}
          onSortChange={setSort}
        />

        <p className="visually-hidden" role="status">
          {reports.loading
            ? 'Loading reports'
            : result
              ? `${result.total} report${result.total === 1 ? '' : 's'} found`
              : ''}
        </p>

        {reports.error ? (
          <div className={styles.message} role="alert">
            <p>The reports could not be loaded. Please try again.</p>
            <button type="button" className={styles.retry} onClick={reports.reload}>
              Try again
            </button>
          </div>
        ) : !result ? (
          <p className={styles.message}>Loading reports…</p>
        ) : result.items.length === 0 ? (
          <p className={styles.message}>No reports match your filters.</p>
        ) : (
          <>
            <ul
              className={styles.list}
              aria-busy={reports.loading}
              data-loading={reports.loading || undefined}
            >
              {result.items.map((report) => (
                <li key={report.id}>
                  <ReportCard report={report} />
                </li>
              ))}
            </ul>

            <Pagination
              page={result.page}
              pageCount={result.pageCount}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </div>
  )
}
