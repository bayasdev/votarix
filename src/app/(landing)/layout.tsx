import { Suspense } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { getCurrentUser } from '@/lib/session';
import { landingConfig } from '@/config/landing';
import { MainNav } from '@/components/layout/main-nav';
import { MainNavSkeleton } from '@/components/layout/main-nav-skeleton';
import { UserAccountNav } from '@/components/layout/user-account-nav';
import { UserAccountNavSkeleton } from '@/components/layout/user-account-nav-skeleton';
import { buttonVariants } from '@/components/ui/button';
import { SiteFooter } from '@/components/layout/site-footer';

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
            <div className="flex h-16 items-center justify-between py-6">
              <MainNavSkeleton />
              <UserAccountNavSkeleton />
            </div>
          }
        >
          <div className="flex h-16 items-center justify-between py-6">
            <MainNav currentUser={currentUser} items={landingConfig.mainNav} />
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
          </div>
        </Suspense>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
