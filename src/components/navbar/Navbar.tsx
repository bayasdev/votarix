import { BiMenuAltLeft } from 'react-icons/bi';

import { SafeUser } from '../../types';
import NavbarUserDropdown from './NavbarUserDropdown';

interface NavbarProps {
  currentUser: SafeUser | null;
  toggleDrawer?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, toggleDrawer }) => {
  return (
    <div className="navbar bg-base-100 px-4">
      <div className="flex-1">
        {toggleDrawer && (
          <a className="btn-ghost btn-circle btn lg:hidden">
            <BiMenuAltLeft size={30} onClick={toggleDrawer} />
          </a>
        )}
      </div>
      <div className="flex-none">
        {currentUser && <NavbarUserDropdown currentUser={currentUser} />}
      </div>
    </div>
  );
};

export default Navbar;
