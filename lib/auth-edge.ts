const COOKIE_NAME = 'ag_luxe_admin';

function getSecret(): string {
  return process.env.ADMIN_SECRET || 'ag-luxe-change-this-secret-in-production';
}

async function hmacSha256(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifySessionTokenEdge(token: string): Promise<boolean> {
  try {
    const decoded = atob(token.replace(/-/g, '+').replace(/_/g, '/'));
    const lastColon = decoded.lastIndexOf(':');
    if (lastColon === -1) return false;
    const payload = decoded.slice(0, lastColon);
    const sig = decoded.slice(lastColon + 1);
    const expected = await hmacSha256(payload, getSecret());
    if (sig !== expected) return false;
    const exp = parseInt(payload.split(':')[1] ?? '0', 10);
    return Date.now() < exp;
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
