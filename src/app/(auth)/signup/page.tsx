import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { SignupForm } from '@/components/auth/signup-form';
import { siteConfig } from '@/config/site';
import Heading from '@/components/heading';

export const metadata = {
  title: 'Crear cuenta',
};

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
      >
        Iniciar Sesión
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {siteConfig.signupAllowed ? (
            <>
              <div className="flex flex-col space-y-2 text-center">
                <Icons.logo className="mx-auto h-6 w-6" />
                <h1 className="text-2xl font-semibold tracking-tight">
                  Empezemos
                </h1>
                <p className="text-sm text-muted-foreground">
                  Crea una cuenta para continuar
                </p>
              </div>
              <SignupForm />
            </>
          ) : (
            <div className="flex h-[60vh] flex-col items-center justify-center gap-6">
              <Icons.warning className="h-12 w-12" />
              <Heading
                title="Opción deshabilitada"
                subtitle="Contacte con un administrador"
                center
              />
            </div>
          )}
          {/* <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p> */}
        </div>
      </div>
    </div>
  );
}
