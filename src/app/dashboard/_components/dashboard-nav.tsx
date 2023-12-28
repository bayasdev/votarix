'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { SidebarNavItem } from '@/types';
import { Icons } from '@/components/shared/icons';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export const DashboardNav = ({ items }: DashboardNavProps) => {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || 'arrowRight'];
        return (
          item.href && (
            <Link key={index} href={item.disabled ? '/' : item.href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  path === item.href ? 'bg-accent' : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80',
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
};

export const DashboardNavSkeleton = () => {
  return (
    <aside className="hidden w-[200px] flex-col md:flex">
      <nav className="grid items-start gap-2">
        <Skeleton className="h-9 rounded-md px-3 py-2" />
        <Skeleton className="h-9 rounded-md px-3 py-2" />
        <Skeleton className="h-9 rounded-md px-3 py-2" />
        <Skeleton className="h-9 rounded-md px-3 py-2" />
        <Skeleton className="h-9 rounded-md px-3 py-2" />
        <Skeleton className="h-9 rounded-md px-3 py-2" />
        <Skeleton className="h-9 rounded-md px-3 py-2" />
      </nav>
    </aside>
  );
};
