import { NextRequest, NextResponse } from 'next/server';
import {
  COOKIE_NAME,
  SESSION_DAYS,
  createSessionToken,
  getAdminPassword,
} from '@/lib/auth';
import { jsonError, parseBody } from '@/lib/admin-api';

export async function POST(request: NextRequest) {
  const body = await parseBody<{ password?: string }>(request);
  if (!body?.password) return jsonError('Password is required');

  if (body.password !== getAdminPassword()) {
    return jsonError('Invalid password', 401);
  }

  const token = createSessionToken();
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
  return response;
}
