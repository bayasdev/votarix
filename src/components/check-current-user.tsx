'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

import { getCurrentUser } from '@/lib/session';

export const CheckCurrentUser = async () => {
  const currentUser = await getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      signOut({
        callbackUrl: '/',
      });
    }
  }, [currentUser]);

  return null;
};
