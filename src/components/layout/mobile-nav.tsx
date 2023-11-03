import * as React from 'react';
import { User } from 'next-auth';
import Link from 'next/link';

import { MainNavItem } from '@/types';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useLockBody } from '@/hooks/use-lock-body';
import { Icons } from '@/components/shared/icons';
import { useMobileMenu } from '@/hooks/use-mobile-menu';

interface MobileNavProps {
  currentUser?: User | undefined;
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ currentUser, items, children }: MobileNavProps) {
  useLockBody();
  const { setShowMobileMenu } = useMobileMenu();

  return (
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden',
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link
          onClick={() => setShowMobileMenu(false)}
          href="/"
          className="flex items-center space-x-2"
        >
          <Icons.logo />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              onClick={() => setShowMobileMenu(false)}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                item.disabled && 'cursor-not-allowed opacity-60',
                item?.role && item.role !== currentUser?.role && 'hidden',
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
