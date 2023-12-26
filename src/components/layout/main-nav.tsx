'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { User } from 'next-auth';

import { MainNavItem } from '@/types';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/shared/icons';
import { MobileNav } from '@/components/layout/mobile-nav';

interface MainNavProps {
  currentUser?: User | undefined;
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ currentUser, items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                item.href.startsWith(`/${segment}`)
                  ? 'text-foreground'
                  : 'text-foreground/60',
                item.disabled && 'cursor-not-allowed opacity-80',
                item?.role && item.role !== currentUser?.role && 'hidden',
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
      >
        {isMobileNavOpen ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {isMobileNavOpen && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
