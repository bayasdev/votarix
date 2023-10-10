'use client';

import { signOut } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const LogoutButtonNav = () => {
  return (
    <button
      className={cn(
        buttonVariants({ variant: 'secondary', size: 'sm' }),
        'px-4',
      )}
      onClick={() => {
        signOut({
          callbackUrl: `${window.location.origin}/`,
        });
      }}
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButtonNav;
