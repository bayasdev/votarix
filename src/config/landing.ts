import { LandingConfig } from '@/types';

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
  ],
};
