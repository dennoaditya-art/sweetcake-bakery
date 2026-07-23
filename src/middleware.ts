import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'sweetcake-secret-key-change-in-production'
);

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith('/admin')) return;
  if (pathname === '/admin/login') return;

  const token = req.cookies.get('token')?.value;
  if (!token) {
    return Response.redirect(new URL('/admin/login', req.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
  } catch {
    return Response.redirect(new URL('/admin/login', req.url));
  }
}

export const config = {
  matcher: '/admin/:path*',
};
