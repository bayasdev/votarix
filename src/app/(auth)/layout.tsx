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
      <div className="order-last col-span-3 flex flex-col items-center justify-center gap-10 bg-neutral-content p-10 text-center lg:order-first lg:col-span-2">
        <Image src={voting} alt="voting" className="w-3/6 lg:w-2/6" priority />
        <p className="w-full text-xl leading-relaxed text-neutral-800 lg:w-3/6">
          El sistema de votación electrónica que garantiza{' '}
          <b>resultados rápidos y confiables</b> en sus procesos electorales.
        </p>
      </div>
      {/* right */}
      <div className="col-span-3 flex flex-col justify-center border-b border-r-0 bg-base-100 p-10 lg:col-span-1 lg:border-b-0 lg:border-r xl:px-20">
        <Image src={logo} width={120} alt="logo" className="mb-8" priority />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
