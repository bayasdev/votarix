'use client';

import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import logo from '@/public/img/logo.svg';
import useLoginModal from '../hooks/useLoginModal';
import useRegisterModal from '../hooks/useRegisterModal';

const Navbar = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn-ghost btn">
          <Image src={logo} width={120} alt="logo" priority />
        </a>
      </div>
      <div className="flex-none px-1">
        <ul className="menu menu-horizontal">
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="bg-base-100 p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a onClick={() => loginModal.onOpen()}>Login</a>
          </li>
          <li>
            <a onClick={() => registerModal.onOpen()}>Register</a>
          </li>
        </ul>
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <FaUserCircle size={30} className="text-slate-600" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
