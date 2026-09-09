import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '12h'

if (!JWT_SECRET) {
  console.error('JWT_SECRET is not set. Generate one and add it to your environment variables before starting the server.')
}

export async function hashPassword(plainText) {
  const salt = await bcrypt.genSalt(12)
  return bcrypt.hash(plainText, salt)
}

export async function verifyPassword(plainText, hash) {
  if (!hash) return false
  return bcrypt.compare(plainText, hash)
}

export function signToken(employee) {
  // Keep the token payload minimal — id + the role they logged in as.
  // Everything else (name, title, etc.) gets looked up fresh from the
  // database on each request, so a name change takes effect immediately
  // rather than waiting for the old token to expire.
  return jwt.sign({ sub: employee.id, loginRole: employee.login_role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'Missing or invalid Authorization header.' })

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.auth = { employeeId: payload.sub, loginRole: payload.loginRole }
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session. Please sign in again.' })
  }
}

// Usage: requireRole('hr', 'management') — only these login roles may
// proceed. Must run after requireAuth.
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.auth) return res.status(401).json({ error: 'Not authenticated.' })
    if (!allowedRoles.includes(req.auth.loginRole)) {
      return res.status(403).json({ error: 'You do not have permission to do that.' })
    }
    next()
  }
}
