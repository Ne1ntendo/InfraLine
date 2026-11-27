// Values mirror the backend / data design (PA3 §5.2) so they can be swapped
// for real API data without renaming anything.

// apps/accounts/models.py -> UserRole
export const ROLES = {
  REQUESTER: 'REQUESTER',
  TECHNICIAN: 'TECHNICIAN',
  ADMINISTRATOR: 'ADMINISTRATOR',
}

export const ROLE_LABELS = {
  [ROLES.REQUESTER]: 'Requester',
  [ROLES.TECHNICIAN]: 'Technician',
  [ROLES.ADMINISTRATOR]: 'Administrator',
}

// Reports.status (PA3 §5.2)
export const REPORT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ARCHIVED: 'archived',
  CLOSED: 'closed',
}

// Work_Orders.status (PA3 §5.2). Only ASSIGNED and IN_PROGRESS show on the forum.
export const WORK_ORDER_STATUS = {
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  CLOSED: 'closed',
  HALTED: 'halted',
  ARCHIVED: 'archived',
}

export const WORK_ORDER_STATUS_LABELS = {
  [WORK_ORDER_STATUS.ASSIGNED]: 'Assigned',
  [WORK_ORDER_STATUS.IN_PROGRESS]: 'In progress',
  [WORK_ORDER_STATUS.CLOSED]: 'Closed',
  [WORK_ORDER_STATUS.HALTED]: 'Halted',
  [WORK_ORDER_STATUS.ARCHIVED]: 'Archived',
}

// Tags shown as CATEGORIES in the S01 sidebar and as tag buttons in S02/S04.
export const CATEGORIES = [
  'Electrical',
  'Mechanical',
  'Plumbing',
  'IT / Network',
  'Furniture',
  'Other',
]
