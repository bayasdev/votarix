import { DashboardConfig } from '@/types';
import { siteConfig } from '@/config/site';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: siteConfig.organizationAbbreviation,
      href: siteConfig.organizationUrl,
    },
  ],
  sidebarNav: [
    {
      title: 'Inicio',
      href: '/dashboard',
      icon: 'home',
    },
    {
      title: 'Elecciones',
      href: '/dashboard/elections',
      icon: 'vote',
    },
    {
      title: 'Dignidades',
      href: '/dashboard/positions',
      icon: 'squareSlash',
    },
    {
      title: 'Partidos Políticos',
      href: '/dashboard/parties',
      icon: 'flag',
    },
    {
      title: 'Candidatos',
      href: '/dashboard/candidates',
      icon: 'userSquare',
    },
    {
      title: 'Usuarios',
      href: '/dashboard/users',
      icon: 'users',
    },
    {
      title: 'Configuración',
      href: '/dashboard/settings',
      icon: 'settings',
    },
  ],
};
