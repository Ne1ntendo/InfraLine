import styles from './Pagination.module.css'

export function Pagination({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) return null
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

  return (
    <nav className={styles.pagination} aria-label="Forum pages">
      <button
        type="button"
        className={styles.button}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>

      {pages.map((n) => (
        <button
          key={n}
          type="button"
          className={n === page ? `${styles.button} ${styles.current}` : styles.button}
          aria-current={n === page ? 'page' : undefined}
          aria-label={`Page ${n}`}
          onClick={() => onPageChange(n)}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        className={styles.button}
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </nav>
  )
}
