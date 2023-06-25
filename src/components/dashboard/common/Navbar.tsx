import Link from 'next/link';
import { BiMenuAltLeft } from 'react-icons/bi';

import { SafeUser } from '../../../types';
import UserDropdown from '../../common/UserDropdown';
import Button from '../../common/Button';
import Logo from '../../common/Logo';

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
          <Logo className="w-28" />
        </Link>
      </div>
      <div className="flex-none">
        {currentUser && <UserDropdown initial={currentUser?.name?.[0] || ''} />}
      </div>
    </div>
  );
};

export default Navbar;
