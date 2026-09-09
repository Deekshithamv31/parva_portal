// Loads the 35-person roster (extracted from the frontend's mockData.ts)
// into Postgres, hashing each person's initial password and computing who
// is allowed to log in as which portal role — the same eligibility rules
// that used to live in the frontend's Login.tsx (PICKER_JOB_TITLE /
// LOGIN_ONLY_IDS / LOGIN_EXCLUDE_IDS), now enforced server-side instead.
//
// Run once against a fresh database: `npm run seed` (after `npm run
// migrate` to apply schema.sql). Safe to re-run — it upserts on id.

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import 'dotenv/config'
import { pool } from './src/db.js'
import { hashPassword } from './src/auth.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const employees = JSON.parse(readFileSync(join(__dirname, 'employees.seed.json'), 'utf8'))

// Mirrors PICKER_JOB_TITLE from the old Login.tsx: which job_title bucket
// feeds each portal role.
const ROLE_JOB_TITLE = {
  crm: 'agent',
  manager: 'manager',
  hr: 'hr',
  management: 'admin',
  finance: 'finance',
}

// Mirrors LOGIN_ONLY_IDS: Finance Manager stays a single fixed account.
const LOGIN_ONLY_IDS = {
  finance: ['DF230003'], // Ravishankar
}

// Mirrors LOGIN_EXCLUDE_IDS: Thejavathi J N is Operations Head, not meant
// to sign in as Line Manager.
const LOGIN_EXCLUDE_IDS = {
  manager: ['DF230006'],
}

function computeLoginRole(employee) {
  for (const [role, jobTitle] of Object.entries(ROLE_JOB_TITLE)) {
    if (employee.role !== jobTitle) continue
    const onlyIds = LOGIN_ONLY_IDS[role]
    if (onlyIds && !onlyIds.includes(employee.id)) continue
    const excludeIds = LOGIN_EXCLUDE_IDS[role]
    if (excludeIds && excludeIds.includes(employee.id)) continue
    return role
  }
  return null
}

async function main() {
  const demoPassword = process.env.SEED_DEMO_PASSWORD || 'Welcome@123'
  const passwordHash = await hashPassword(demoPassword)

  let seeded = 0
  for (const e of employees) {
    const loginRole = computeLoginRole(e)
    await pool.query(
      `INSERT INTO employees (
         id, name, job_title, title, email, phone, team, manager_id, join_date,
         status, department, leads_assigned, conversions, base_salary,
         response_time, location, photo_url, company, password_hash, login_role
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name, job_title = EXCLUDED.job_title, title = EXCLUDED.title,
         email = EXCLUDED.email, phone = EXCLUDED.phone, team = EXCLUDED.team,
         manager_id = EXCLUDED.manager_id, join_date = EXCLUDED.join_date,
         status = EXCLUDED.status, department = EXCLUDED.department,
         leads_assigned = EXCLUDED.leads_assigned, conversions = EXCLUDED.conversions,
         base_salary = EXCLUDED.base_salary, response_time = EXCLUDED.response_time,
         location = EXCLUDED.location, photo_url = EXCLUDED.photo_url,
         company = EXCLUDED.company, login_role = EXCLUDED.login_role,
         updated_at = now()`,
      [
        e.id, e.name, e.role, e.title || null, e.email, e.phone || '', e.team || '',
        e.managerId || null, e.joinDate || '', e.status || 'active', e.department || '',
        e.leadsAssigned || 0, e.conversions || 0, e.baseSalary || 0, e.responseTime || 'N/A',
        e.location || '', e.photoUrl || null, e.company || '', passwordHash, loginRole,
      ],
    )
    seeded++
  }

  console.log(`Seeded ${seeded} employees.`)
  const loginable = employees.filter(computeLoginRole).length
  console.log(`${loginable} of them can sign in to a portal; everyone's initial password is "${demoPassword}".`)
  await pool.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
