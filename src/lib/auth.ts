import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function signToken(payload: { userId: number; username: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) return authHeader.slice(7);

  const cookie = request.cookies.get('auth')?.value;
  return cookie || null;
}

export async function authenticate(request: NextRequest): Promise<{ userId: number } | null> {
  const token = getTokenFromRequest(request);
  if (!token) return null;

  try {
    const decoded = verifyToken(token);
    return { userId: decoded.userId };
  } catch {
    return null;
  }
}
