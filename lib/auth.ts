import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'ag_luxe_admin';
const SESSION_DAYS = 7;

function getSecret() {
  return process.env.ADMIN_SECRET || 'ag-luxe-change-this-secret-in-production';
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || 'agluxe2025';
}

export function createSessionToken(): string {
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = `admin:${exp}`;
  const sig = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
  return Buffer.from(`${payload}:${sig}`).toString('base64url');
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const lastColon = decoded.lastIndexOf(':');
    if (lastColon === -1) return false;
    const payload = decoded.slice(0, lastColon);
    const sig = decoded.slice(lastColon + 1);
    const expected = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
    if (sig !== expected) return false;
    const exp = parseInt(payload.split(':')[1] ?? '0', 10);
    return Date.now() < exp;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export { COOKIE_NAME, SESSION_DAYS };
