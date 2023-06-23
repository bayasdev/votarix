import { signOut } from 'next-auth/react';
import { TbUserCircle } from 'react-icons/tb';
import { IoMdLogOut } from 'react-icons/io';

interface NavbarUserDropdownProps {
  initial: string;
}

const NavbarUserDropdown: React.FC<NavbarUserDropdownProps> = ({ initial }) => {
  return (
    <div className="dropdown-end dropdown">
      <label
        tabIndex={0}
        className="placeholder btn-ghost btn-circle avatar btn"
      >
        <div className="w-10 rounded-full bg-accent text-xl font-semibold text-accent-content">
          {initial}
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <a>
            <TbUserCircle size={20} />
            Mi Cuenta
          </a>
        </li>
        <li className="mt-2">
          <a onClick={() => signOut()}>
            <IoMdLogOut size={20} />
            Cerrar Sesión
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavbarUserDropdown;
