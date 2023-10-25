import { LandingConfig } from '@/types';

export const landingConfig: LandingConfig = {
  mainNav: [
    {
      title: 'Votar',
      href: '/vote',
      role: 'VOTER',
    },
    {
      title: 'Conoce al candidato',
      href: '/candidates',
      role: 'VOTER',
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
