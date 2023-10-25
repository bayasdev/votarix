import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import '@uploadthing/react/styles.css';
import '@/styles/globals.css';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import ClientOnly from '@/components/client-only';
import { Toaster } from '@/components/ui/toaster';
import { TailwindIndicator } from '@/components/tailwind-indicator';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontHeading = localFont({
  src: './Roundo-Variable.ttf',
  variable: '--font-heading',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <ClientOnly>
          {children}
          <Toaster />
          <TailwindIndicator />
        </ClientOnly>
      </body>
    </html>
  );
}
