import { Role } from '@prisma/client';
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;

      // Check if the middleware is processing the
      // route which requires a specific role
      if (path.startsWith('/dashboard')) {
        return token?.role === Role.ADMIN;
      }

      // By default return true only if the token is not null
      // (this forces the users to be signed in to access the page)
      return token !== null;
    },
  },
});

// Define paths for which the middleware will run
export const config = {
  matcher: ['/dashboard/:path*', '/vote/:path'],
};
