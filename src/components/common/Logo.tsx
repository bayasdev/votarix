import Image from 'next/image';

import logo from '@/public/img/logo.svg';
import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const logoClasses = cn(className);

  return <Image src={logo} className={logoClasses} alt="logo" priority />;
};

export default Logo;
