import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'sweetcake-secret-key-change-in-production');

export async function GET(req) {
  const token = req.cookies.get('token')?.value;
  if (!token) return Response.json({ authenticated: false }, { status: 401 });

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return Response.json({ authenticated: true, user: { username: payload.username } });
  } catch {
    return Response.json({ authenticated: false }, { status: 401 });
  }
}
