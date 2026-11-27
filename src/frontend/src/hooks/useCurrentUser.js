import { useContext } from 'react'
import { CurrentUserContext } from '../context/currentUserContext'

export function useCurrentUser() {
  const context = useContext(CurrentUserContext)
  if (!context) {
    throw new Error('useCurrentUser must be used inside <CurrentUserProvider>')
  }
  return context
}
