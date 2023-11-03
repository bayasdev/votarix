import { Suspense } from 'react';

import { dashboardConfig } from '@/config/dashboard';
import { getCurrentUser } from '@/lib/session';
import { MainNav } from '@/components/layout/main-nav';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { UserAccountNav } from '@/components/layout/user-account-nav';
import NavSkeleton from '@/components/shared/nav-skeleton';
import DashboardNavSkeleton from '@/components/dashboard/dashboard-nav-skeleton';
import MobileMenuProvider from '@/providers/mobile-menu-provider';

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
            <NavSkeleton className="container flex h-16 items-center justify-between py-4" />
          }
        >
          <div className="container flex h-16 items-center justify-between py-4">
            <MobileMenuProvider>
              <MainNav items={dashboardConfig.mainNav}>
                <DashboardNav items={dashboardConfig.sidebarNav} />
              </MainNav>
            </MobileMenuProvider>
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
