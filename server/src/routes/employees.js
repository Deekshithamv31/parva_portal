import { Router } from 'express'
import { pool } from '../db.js'
import { requireAuth } from '../auth.js'
import { toCamel } from '../lib/case.js'
import { asyncHandler } from '../lib/async-handler.js'

const router = Router()

// Columns safe to return to any signed-in user — password_hash and
// login_role are deliberately excluded from list/detail responses.
const PUBLIC_COLUMNS = `
  id, name, job_title, title, email, phone, team, manager_id, join_date,
  status, department, leads_assigned, conversions, base_salary,
  response_time, location, photo_url, company
`

router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const { rows } = await pool.query(`SELECT ${PUBLIC_COLUMNS} FROM employees ORDER BY name`)
  res.json({ employees: rows.map(toCamel) })
}))

router.get('/:id', requireAuth, asyncHandler(async (req, res) => {
  const { rows } = await pool.query(`SELECT ${PUBLIC_COLUMNS} FROM employees WHERE id = $1`, [req.params.id])
  if (!rows[0]) return res.status(404).json({ error: 'Employee not found.' })
  res.json({ employee: toCamel(rows[0]) })
}))

export default router
