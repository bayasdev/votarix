import { dashboardConfig } from '@/config/dashboard';
import getCurrentUser from '@/actions/getCurrentUser';
import { MainNav } from '@/components/main-nav';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { SiteFooter } from '@/components/site-footer';
import { UserAccountNav } from '@/components/user-account-nav';
import ClientOnly from '@/components/client-only';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <ClientOnly>
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav items={dashboardConfig.mainNav}>
              <DashboardNav items={dashboardConfig.sidebarNav} />
            </MainNav>
            <UserAccountNav currentUser={currentUser} />
          </div>
        </header>
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNav items={dashboardConfig.sidebarNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden px-1">
            {children}
          </main>
        </div>
        <SiteFooter className="border-t" />
      </ClientOnly>
    </div>
  );
}
