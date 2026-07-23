import { readFileSync } from 'fs';
import { join } from 'path';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const ADMIN_FILE = join(process.cwd(), 'src', 'data', 'admin.json');
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'sweetcake-secret-key-change-in-production');

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const admin = JSON.parse(readFileSync(ADMIN_FILE, 'utf-8'));

    if (username !== admin.username) {
      return Response.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return Response.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    const token = await new SignJWT({ username: admin.username, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    const res = Response.json({ success: true });
    res.headers.set('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`);
    return res;
  } catch {
    return Response.json({ error: 'Terjadi kesalahan' }, { status: 500 });
  }
}
