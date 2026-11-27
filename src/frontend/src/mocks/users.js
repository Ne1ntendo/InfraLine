// Mock users until the accounts API exists. Shape follows the Users table
// (PA3 §5.2): id, username, full_name, role.
import { ROLES } from '../constants/domain'

export const MOCK_USERS = [
  { id: 1, username: 'requester', fullName: 'Nguyen Van An', role: ROLES.REQUESTER },
  { id: 2, username: 'binh.tran', fullName: 'Tran Thi Binh', role: ROLES.REQUESTER },
  { id: 3, username: 'cuong.le', fullName: 'Le Hoang Cuong', role: ROLES.REQUESTER },
  { id: 4, username: 'mai.pham', fullName: 'Pham Ngoc Mai', role: ROLES.REQUESTER },
  { id: 10, username: 'technician', fullName: 'Pham Minh Duc', role: ROLES.TECHNICIAN },
  { id: 11, username: 'hai.vo', fullName: 'Vo Thanh Hai', role: ROLES.TECHNICIAN },
  { id: 12, username: 'khanh.dang', fullName: 'Dang Quoc Khanh', role: ROLES.TECHNICIAN },
  { id: 20, username: 'admin', fullName: 'Hoang Thu Lan', role: ROLES.ADMINISTRATOR },
]

// The "logged-in" user for each role, used by the dev role switcher.
// Replace with the real session once the login page (separate task) is merged.
export const MOCK_CURRENT_USER_ID_BY_ROLE = {
  [ROLES.REQUESTER]: 1,
  [ROLES.TECHNICIAN]: 10,
  [ROLES.ADMINISTRATOR]: 20,
}

// Unread in-app notifications per user (bell badge in the header).
export const MOCK_UNREAD_NOTIFICATIONS = {
  1: 2,
  10: 3,
}

export function findUserById(id) {
  return MOCK_USERS.find((user) => user.id === id) ?? null
}
