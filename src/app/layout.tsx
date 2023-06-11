import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from '../providers/ToasterProvider';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Votarix',
  description: 'Votarix E-Voting',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
