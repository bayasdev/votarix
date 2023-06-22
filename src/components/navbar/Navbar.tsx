import Link from 'next/link';
import Image from 'next/image';
import { BiMenuAltLeft } from 'react-icons/bi';

import logo from '@/public/img/logo.svg';
import { SafeUser } from '../../types';
import NavbarUserDropdown from './NavbarUserDropdown';

interface NavbarProps {
  currentUser?: SafeUser | null;
  toggleDrawer?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, toggleDrawer }) => {
  return (
    <div className="navbar sticky top-0 z-10 bg-base-100 bg-opacity-90 shadow-sm backdrop-blur transition-all duration-100">
      <div className="flex-1 gap-1">
        {toggleDrawer && (
          <a
            className="btn-ghost btn-circle btn lg:hidden"
            onClick={toggleDrawer}
          >
            <BiMenuAltLeft size={24} />
          </a>
        )}
        <Link href="/dashboard" className="btn-ghost btn lg:hidden">
          <Image src={logo} className="w-28" alt="logo" priority />
        </Link>
      </div>
      <div className="flex-none gap-1">
        {currentUser && (
          <NavbarUserDropdown initial={currentUser?.name?.[0] || ''} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
