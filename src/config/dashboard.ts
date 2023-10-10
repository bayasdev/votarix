import { DashboardConfig } from '@/types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentación',
      href: '/docs',
    },
    {
      title: 'Soporte',
      href: '/support',
      disabled: true,
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
