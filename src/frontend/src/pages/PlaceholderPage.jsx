import { Link } from 'react-router-dom'
import styles from './PlaceholderPage.module.css'

// Temporary page for screens that are not built yet, so links from S01
// (Create Report, report cards, header menu) do not lead to a blank page.
// Replace the matching <Route> in App.jsx when the real screen is ready.
export function PlaceholderPage({ title }) {
  return (
    <section className={styles.page}>
      <h1>{title}</h1>
      <p>This screen is not built yet.</p>
      <Link to="/forum">← Back to forum</Link>
    </section>
  )
}
