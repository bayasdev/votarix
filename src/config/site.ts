import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Votarix',
  description: 'Votarix E-Voting System',
  version: '1.0.0',
  url: 'https://tx.shadcn.com',
  ogImage: 'https://tx.shadcn.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/victorbayas',
    github: 'https://github.com/bayasdev/votarix',
  },
  signupAllowed: false,
  tribunal: [
    {
      name: 'Mgst. Myriam Álvarez',
      title: 'Presidente',
    },
    {
      name: 'Mgst. Ana Quintana',
      title: 'Vocal (Representante de los docentes)',
    },
    {
      name: 'Verónica Quito',
      title: 'Vocal (Representante de los trabajadores)',
    },
    {
      name: 'Sr. Emiliano Zapata',
      title: 'Vocal (Representante de los estudiantes)',
    },
    {
      name: 'Dr. Thelman Cabrera',
      title: 'Secretario',
    },
  ],
};
