// The trusted source of "who is allowed to sign in as what, and what's
// their real registered email" for the password-reset flow — read
// server-side from employees.seed.json rather than trusting anything the
// client sends, so a reset link can only ever be emailed to the address
// actually on file for that person.
//
// Mirrors the exact same eligibility rules as the frontend's Login.tsx
// (ELIGIBLE_JOB_TITLE / LOGIN_ONLY_IDS / LOGIN_EXCLUDE_IDS /
// LOGIN_EXTRA_IDS) and server/seed.js's computeLoginRole — keep all three
// in sync if the roster's login rules ever change.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const employees = JSON.parse(readFileSync(join(__dirname, '../../employees.seed.json'), 'utf8'))

const ELIGIBLE_JOB_TITLE = {
  crm: 'agent',
  manager: 'manager',
  hr: 'hr',
  management: 'admin',
  finance: 'finance',
}

const LOGIN_ONLY_IDS = {
  finance: ['DF230003'],
}

const LOGIN_EXCLUDE_IDS = {
  manager: ['DF230006'],
}

const LOGIN_EXTRA_IDS = {
  manager: ['PA230045'],
}

export function findEmployeeById(employeeId) {
  return employees.find((e) => e.id === employeeId) || null
}

// True if `employee` is allowed to sign in as `role` — same logic as the
// frontend's eligibleFor(), just checking one person instead of filtering
// the whole roster.
export function isEligibleForRole(employee, role) {
  if (!employee) return false
  const jobTitle = ELIGIBLE_JOB_TITLE[role]
  if (!jobTitle) return false
  const extraIds = LOGIN_EXTRA_IDS[role] || []
  const matchesJobTitle = employee.role === jobTitle || extraIds.includes(employee.id)
  if (!matchesJobTitle) return false

  const onlyIds = LOGIN_ONLY_IDS[role]
  if (onlyIds && !onlyIds.includes(employee.id) && !extraIds.includes(employee.id)) return false

  const excludeIds = LOGIN_EXCLUDE_IDS[role]
  if (excludeIds && excludeIds.includes(employee.id)) return false

  return true
}
