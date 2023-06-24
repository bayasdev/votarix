import Link from 'next/link';
import Image from 'next/image';
import { BiMenuAltLeft } from 'react-icons/bi';

import logo from '@/public/img/logo.svg';
import { SafeUser } from '../../types';
import NavbarUserDropdown from './NavbarUserDropdown';
import Button from '../ui/Button';

interface NavbarProps {
  currentUser?: SafeUser | null;
  onToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, onToggle }) => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        {onToggle && (
          <Button
            onClick={onToggle}
            color="ghost"
            circle
            icon={BiMenuAltLeft}
            iconSize={30}
            className="lg:hidden"
          />
        )}
        <Link href="/dashboard" className="btn-ghost btn lg:hidden">
          <Image src={logo} className="w-28" alt="logo" priority />
        </Link>
      </div>
      <div className="flex-none">
        {currentUser && (
          <NavbarUserDropdown initial={currentUser?.name?.[0] || ''} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
