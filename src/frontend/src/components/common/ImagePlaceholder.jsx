import styles from './ImagePlaceholder.module.css'

// Wireframe-style photo placeholder (box with a cross) until attachments are
// served from Supabase Storage.
export function ImagePlaceholder({ width = 116, height = 76, label }) {
  return (
    <span
      className={styles.placeholder}
      style={{ width, height }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="0" x2="100" y2="100" />
        <line x1="100" y1="0" x2="0" y2="100" />
      </svg>
    </span>
  )
}
