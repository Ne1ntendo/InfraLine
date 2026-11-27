import styles from './SearchSortBar.module.css'

export function SearchSortBar({ search, onSearchChange, sort, onSortChange }) {
  return (
    <div className={styles.bar}>
      <label htmlFor="forum-search" className="visually-hidden">
        Search reports
      </label>
      <input
        id="forum-search"
        type="search"
        className={styles.search}
        placeholder="Search reports"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <label htmlFor="forum-sort" className={styles.sortLabel}>
        Sort by
      </label>
      <select
        id="forum-sort"
        className={styles.sort}
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  )
}
