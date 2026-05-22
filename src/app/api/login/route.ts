import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { comparePassword, signToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const result = await query('SELECT id, username, email, password_hash FROM users WHERE username = ?', [username]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const user = result.rows[0] as { id: number; username: string; email: string; password_hash: string };
    if (!comparePassword(password, user.password_hash)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ userId: user.id, username: user.username });
    const response = NextResponse.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    response.cookies.set('auth', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
    return response;
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Internal server error';
    console.error('Login error:', error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Login API is alive' });
}
