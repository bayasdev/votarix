import Link from 'next/link';
import Image from 'next/image';

import { siteConfig } from '@/config/site';
import { Icons } from '@/components/shared/icons';

export function SiteFooter() {
  return (
    <footer className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <Icons.logo />
        <p className="text-center text-sm leading-loose md:text-left">
          Sistema {siteConfig.name} ({siteConfig.organizationAbbreviation})
        </p>
      </div>
      <div className="flex flex-col items-center gap-1 md:items-start">
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
