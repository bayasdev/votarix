'use client';

import { IoMdLogOut } from 'react-icons/io';
import { BiMenuAltLeft } from 'react-icons/bi';
import { TbUserCircle } from 'react-icons/tb';
import { signOut } from 'next-auth/react';

import logo from '@/public/img/logo.svg';
import { SafeUser } from '../types';

interface NavbarProps {
  currentUser: SafeUser | null;
  toggleDrawer?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, toggleDrawer }) => {
  return (
    <div className="navbar px-4">
      <div className="flex-1 gap-2">
        {toggleDrawer && (
          <a className="btn-ghost btn lg:hidden">
            <BiMenuAltLeft size={30} onClick={toggleDrawer} />
          </a>
        )}
        {/* <Image src={logo} width={100} alt="logo" priority /> */}
      </div>
      <div className="flex-none">
        {currentUser && (
          <div className="flex items-center gap-2">
            <span className="hidden text-neutral-800 md:block"></span>
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="placeholder btn-circle avatar btn">
                <div className="w-10 rounded-full bg-accent text-accent-content">
                  <span className="text-xl font-semibold">
                    {currentUser.name[0]}
                  </span>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box mt-2 w-52 gap-2 bg-base-100 p-4 shadow"
              >
                <div className="px-4">
                  <div className="text-md font-bold">{currentUser.name}</div>
                  <div className="font-light text-neutral-500">
                    {currentUser.email}
                  </div>
                </div>
                <li>
                  <a>
                    <TbUserCircle size={20} />
                    Mi Cuenta
                  </a>
                </li>
                <li>
                  <a onClick={() => signOut()}>
                    <IoMdLogOut size={20} />
                    Cerrar sesión
                  </a>
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
