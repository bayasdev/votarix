/* eslint-disable no-unused-vars */

import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import { Role } from '@prisma/client';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    document?: string;
    role?: Role;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    document?: string;
    role?: Role;
  }
}
