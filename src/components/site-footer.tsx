import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/shared/icons';
import { siteConfig } from '@/config/site';

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn(
        'container flex flex-col items-center justify-between gap-4 py-6 md:flex-row',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <Icons.logo />
        <p className="text-center text-sm md:text-left">
          {siteConfig.name} E-Voting System
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Developed by</span>
        <Link href="https://codestrats.com" target="_blank">
          <Image
            src="/codestrats.svg"
            width={100}
            height={0}
            alt="Codestrats"
          />
        </Link>
      </div>
    </footer>
  );
}
