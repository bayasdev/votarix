'use client';

import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import { BiMenuAltLeft } from 'react-icons/bi';
import { signOut } from 'next-auth/react';

import logo from '@/public/img/logo.svg';
import { SafeUser } from '../types';

interface NavbarProps {
  currentUser: SafeUser | null;
  toggleDrawer?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, toggleDrawer }) => {
  return (
    <div className="navbar bg-base-100 px-4 shadow">
      <div className="flex-1 gap-2">
        {toggleDrawer && (
          <a className="btn-ghost btn lg:hidden">
            <BiMenuAltLeft size={30} onClick={toggleDrawer} />
          </a>
        )}
        <Image src={logo} width={100} alt="logo" priority />
      </div>
      <div className="flex-none">
        {currentUser && (
          <div className="flex items-center gap-2">
            <div className="hidden normal-case text-neutral-500 md:block">
              Hola,{' '}
              <span className="font-semibold text-neutral-800">
                {currentUser.name}
              </span>
            </div>
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-ghost btn-circle btn">
                <FaUserCircle size={30} />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-sm mt-3 w-52 bg-base-100 p-2 shadow"
              >
                <li>
                  <a>Mi Cuenta</a>
                </li>
                <li>
                  <a onClick={() => signOut()}>Cerrar sesión</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
