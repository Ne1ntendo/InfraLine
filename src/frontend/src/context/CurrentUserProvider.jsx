import { useMemo, useState } from 'react'
import { ROLES } from '../constants/domain'
import { findUserById, MOCK_CURRENT_USER_ID_BY_ROLE } from '../mocks/users'
import { CurrentUserContext } from './currentUserContext'

// Mock "logged-in user" so S01 can be built and demoed for all three roles.
// TODO: replace with the real session from the login page (separate task);
// pages only depend on useCurrentUser(), so they will not need to change.
export function CurrentUserProvider({ children }) {
  const [role, setRole] = useState(ROLES.REQUESTER)

  const value = useMemo(
    () => ({ user: findUserById(MOCK_CURRENT_USER_ID_BY_ROLE[role]), setRole }),
    [role],
  )

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}
