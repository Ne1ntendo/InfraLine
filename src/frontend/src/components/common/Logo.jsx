// InfraLine mark: a building outline drawn as one continuous line on a
// baseline ("Infra" = infrastructure, "Line" = the single stroke), with a
// window/door detail. Greyscale to match the wireframes and PA3 §6.3 colours.
export function Logo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="6" fill="#333333" />
      <path
        d="M6 25 V14 L16 7 L26 14 V25"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 25 H28" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M13 25 V18 H19 V25"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
