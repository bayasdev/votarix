import Image from 'next/image';
import logo from '@/public/img/logo.svg';
import voting from '@/public/img/voting.svg';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="grid min-h-screen grid-cols-3">
      {/* left */}
      <div className="order-last col-span-3 flex flex-col items-center justify-center gap-8 bg-neutral-content px-10 py-20 text-center lg:order-first lg:col-span-2 lg:py-10">
        <Image src={voting} alt="voting" className="w-3/6 lg:w-2/6" priority />
        <p className="w-full text-xl leading-relaxed text-neutral-800 lg:w-3/6">
          El sistema de votación electrónica que garantiza{' '}
          <b>resultados rápidos y confiables</b> en sus procesos electorales.
        </p>
      </div>
      {/* right */}
      <div className="col-span-3 flex flex-col justify-center gap-8 border-r-0 bg-base-100 px-10 py-20 shadow-lg lg:col-span-1 lg:border-r-2 lg:py-10 lg:shadow-none xl:px-20">
        <Image src={logo} width={120} alt="logo" priority />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
