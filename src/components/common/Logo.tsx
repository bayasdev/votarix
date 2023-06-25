import clsx from 'clsx';
import Image from 'next/image';

import logo from '@/public/img/logo.svg';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const logoClasses = clsx(className);

  return <Image src={logo} className={logoClasses} alt="logo" priority />;
};

export default Logo;
