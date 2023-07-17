import { redirect } from 'next/navigation';

import getCurrentUser from '../actions/getCurrentUser';
import Hero from '@/src/components/landing/common/Hero';
import Footer from '@/src/components/landing/common/Footer';
import Header from '@/src/components/landing/common/Header';
import Container from '@/src/components/common/Container';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = async ({ children }) => {
  const currentUser = await getCurrentUser();
  // if (currentUser) return redirect('/');

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
