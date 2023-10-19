import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/signup');
    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');

    if (isAuthenticated) {
      if (isAuthPage) {
        // If authenticated, avoid showing login and signup pages
        if (token.role === 'ADMIN') {
          return NextResponse.redirect(new URL('/dashboard', req.url));
        } else {
          return NextResponse.redirect(new URL('/', req.url));
        }
      } else if (isDashboardPage && token.role !== 'ADMIN') {
        // If authenticated, avoid showing dashboard page to non-admins
        return NextResponse.redirect(new URL('/', req.url));
      }
    } else if (!isAuthPage) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      if (!isDashboardPage) {
        // If not authenticated, redirect to login page passing the current path as from
        return NextResponse.redirect(
          new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
        );
      } else {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return null;
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  },
);

// Protected routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/vote/:path*',
    '/certificates/:path*',
    '/login',
    '/signup',
  ],
};
