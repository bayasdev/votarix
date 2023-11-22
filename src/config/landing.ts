import { LandingConfig } from '@/types';
import { siteConfig } from '@/config/site';

export const landingConfig: LandingConfig = {
  mainNav: [
    {
      title: 'Votar',
      href: '/vote',
    },
    {
      title: 'Conoce al candidato',
      href: '/candidates',
    },
    {
      title: 'Resultados',
      href: '/results',
    },
    {
      title: 'Mis certificados',
      href: '/certificates',
      role: 'VOTER',
    },
    {
      title: 'Política de privacidad',
      href: '/privacy',
    },
    {
      title: siteConfig.organizationAbbreviation,
      href: siteConfig.organizationUrl,
    },
  ],
};
