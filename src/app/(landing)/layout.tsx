import { Suspense } from 'react';
import Link from 'next/link';

import getCurrentUser from '@/actions/getCurrentUser';
import { landingConfig } from '@/config/landing';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { MainNav } from '@/components/main-nav';
import { SiteFooter } from '@/components/site-footer';
import { UserAccountNav } from '@/components/user-account-nav';
import NavSkeleton from '@/components/nav-skeleton';
import MobileMenuProvider from '@/providers/mobile-menu-provider';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default async function LandingLayout({ children }: LandingLayoutProps) {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <Suspense
          fallback={
            <NavSkeleton className="flex h-20 items-center justify-between py-6" />
          }
        >
          <div className="flex h-20 items-center justify-between py-6">
            <MobileMenuProvider>
              <MainNav
                currentUser={currentUser}
                items={landingConfig.mainNav}
              />
            </MobileMenuProvider>
            <nav>
              {!currentUser ? (
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'sm' }),
                    'px-4',
                  )}
                >
                  Iniciar sesión
                </Link>
              ) : (
                <UserAccountNav currentUser={currentUser} />
              )}
            </nav>
          </div>
        </Suspense>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
