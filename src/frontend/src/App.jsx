import { Navigate, Route, Routes } from 'react-router-dom'
import { AppHeader } from './components/layout/AppHeader'
import { DevRoleSwitcher } from './components/layout/DevRoleSwitcher'
import { useCurrentUser } from './hooks/useCurrentUser'
import { ForumPage } from './pages/forum/ForumPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import './App.css'

// Routes for the screens in the screen flow (Screen-flows-updated.pdf).
// Screens that are not built yet use PlaceholderPage; replace the element
// of the matching <Route> when the real screen is ready.
// Login and role guards belong to the login task and are not added here.
function App() {
  const { user } = useCurrentUser()

  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/forum" replace />} />
          {/* key resets the filters when the previewed role changes */}
          <Route path="/forum" element={<ForumPage key={user.role} />} />
          <Route path="/reports/new" element={<PlaceholderPage title="S02 – Create report" />} />
          <Route path="/reports/:id" element={<PlaceholderPage title="S03 – Report detail" />} />
          <Route path="/history" element={<PlaceholderPage title="S05 – Work order history" />} />
          <Route path="/review" element={<PlaceholderPage title="S06 – Report moderation" />} />
          <Route path="/checklist" element={<PlaceholderPage title="S08 – Maintenance checklist" />} />
          <Route path="/login" element={<PlaceholderPage title="Log in" />} />
          <Route path="*" element={<PlaceholderPage title="Page not found" />} />
        </Routes>
      </main>
      {import.meta.env.DEV && <DevRoleSwitcher />}
    </div>
  )
}

export default App
