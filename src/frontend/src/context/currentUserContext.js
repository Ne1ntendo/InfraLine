import { createContext } from 'react'

// Holds { user, setRole }. Provided by CurrentUserProvider.
export const CurrentUserContext = createContext(null)
