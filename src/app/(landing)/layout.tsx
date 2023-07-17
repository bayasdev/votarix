import Header from '@/src/components/landing/common/Header';
import Footer from '@/src/components/landing/common/Footer';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = async ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
