'use client';

import { signOut } from 'next-auth/react';
import { IoMdLogOut } from 'react-icons/io';

import { SafeUser } from '@/src/types';

interface UserDropdownProps {
  currentUser?: SafeUser | null;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ currentUser }) => {
  return (
    <div className="dropdown-end dropdown">
      <label
        tabIndex={0}
        className="avatar placeholder btn btn-circle btn-ghost"
      >
        <div className="w-10 rounded-full bg-accent text-lg font-semibold text-accent-content">
          {currentUser?.name?.[0] || ''}
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box mt-3 w-52 bg-base-100 p-4 shadow"
      >
        <div className="mb-4">
          <div className="font-bold">{currentUser?.name}</div>
          <div className="mb-2 text-sm">{currentUser?.email}</div>
          <div className="badge badge-ghost">
            {currentUser?.role.toLowerCase()}
          </div>
        </div>
        <li>
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
