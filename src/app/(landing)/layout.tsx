import Link from 'next/link';

import getCurrentUser from '@/actions/getCurrentUser';
import { landingConfig } from '@/config/landing';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { MainNav } from '@/components/main-nav';
import { SiteFooter } from '@/components/site-footer';
import { UserAccountNav } from '@/components/user-account-nav';
import ClientOnly from '@/components/client-only';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default async function LandingLayout({ children }: LandingLayoutProps) {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <ClientOnly>
        <header className="container z-40 bg-background">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNav currentUser={currentUser} items={landingConfig.mainNav} />
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
        </header>
      </ClientOnly>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
