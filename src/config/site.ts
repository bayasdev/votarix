import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Votarix',
  description: 'Votarix E-Voting System',
  url: 'https://tx.shadcn.com',
  ogImage: 'https://tx.shadcn.com/og.jpg',
  organizationName: 'Universidad Iberoamericana del Ecuador',
  organizationAbbreviation: 'UNIB.E',
  organizationUrl: 'https://unibe.edu.ec',
  organizationAddress: 'José Queri y Av. Eloy Alfaro, Quito, Ecuador',
  organizationEmail: 'info@unibe.edu.ec',
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
