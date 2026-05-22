import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 });
  }

  const existing = await query('SELECT id FROM users WHERE username = $1 OR email = $2', [username, email]);
  if (existing.rows.length > 0) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  const hash = hashPassword(password);
  const result = await query(
    'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username',
    [username, email, hash]
  );

  const user = result.rows[0] as any;
  const token = signToken({ userId: user.id, username: user.username });

  const response = NextResponse.json({ token, user: { id: user.id, username: user.username, email } });
  response.cookies.set('auth', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
  return response;
}
