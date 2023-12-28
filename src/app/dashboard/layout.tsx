import { Suspense } from 'react';

import { dashboardConfig } from '@/config/dashboard';
import { getCurrentUser } from '@/lib/session';
import { MainNav, MainNavSkeleton } from '@/components/main-nav';
import {
  UserAccountNav,
  UserAccountNavSkeleton,
} from '@/components/user-account-nav';
import {
  DashboardNav,
  DashboardNavSkeleton,
} from '@/app/dashboard/_components/dashboard-nav';
import { SiteFooter } from '@/components/site-footer';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <Suspense
          fallback={
            <div className="container flex h-16 items-center justify-between py-4">
              <MainNavSkeleton />
              <UserAccountNavSkeleton />
            </div>
          }
        >
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav items={dashboardConfig.mainNav}>
              <DashboardNav items={dashboardConfig.sidebarNav} />
            </MainNav>
            <UserAccountNav currentUser={currentUser} />
          </div>
        </Suspense>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <Suspense fallback={<DashboardNavSkeleton />}>
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav items={dashboardConfig.sidebarNav} />
          </aside>
        </Suspense>
        <main className="flex w-full flex-1 flex-col overflow-hidden px-1">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}
