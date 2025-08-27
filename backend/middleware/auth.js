import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export function authRequired(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing token' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.id, name: payload.name };
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
