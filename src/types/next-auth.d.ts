import 'next-auth';

import { Role } from '@prisma/client';

declare module 'next-auth' {
  interface User {
    role?: Role;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role;
  }
}
