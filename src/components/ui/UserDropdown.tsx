import { signOut } from 'next-auth/react';
import { TbUserCircle } from 'react-icons/tb';
import { IoMdLogOut } from 'react-icons/io';

import { SafeUser } from '@/src/types';

interface UserDropdownProps {
  currentUser: SafeUser | null;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ currentUser }) => {
  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="placeholder btn-circle avatar btn">
        <div className="w-full rounded-full bg-accent text-accent-content">
          <span className="text-xl font-semibold">{currentUser?.name[0]}</span>
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box mt-2 w-52 bg-base-100 p-4 shadow"
      >
        <div className="text-md font-bold">{currentUser?.name}</div>
        <div className="font-light text-neutral-500">{currentUser?.email}</div>
        <div className="badge badge-ghost mt-2">
          {currentUser?.role.toLowerCase()}
        </div>
        <li className="mt-4">
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

export default UserDropdown;
