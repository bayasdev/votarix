'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarNavItem } from '@/types';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/shared/icons';
import { useMobileMenuStore } from '@/store/mobile-menu';

interface DashboardNavProps {
  items: SidebarNavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();
  const { toggleMobileMenu } = useMobileMenuStore();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || 'arrowRight'];
        return (
          item.href && (
            <Link
              key={index}
              onClick={toggleMobileMenu}
              href={item.disabled ? '/' : item.href}
            >
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
}