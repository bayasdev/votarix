'use client';

import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { TbHome2 } from 'react-icons/tb';
import Image from 'next/image';

import logo from '@/public/img/logo.svg';
import Navbar from './Navbar';
import { SafeUser } from '../types';

interface DrawerProps {
  currentUser: SafeUser | null;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ currentUser, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        readOnly
      />
      <div className="drawer-content flex flex-col">
        <Navbar currentUser={currentUser} toggleDrawer={toggleOpen} />
        <div className="h-full bg-slate-200 p-4">{children}</div>
      </div>
      <div className="drawer-side">
        <label className="drawer-overlay" onClick={toggleOpen}></label>
        <ul className="menu h-full w-80 gap-4 bg-base-100 py-4">
          <a
            className="btn-ghost btn-circle btn ml-auto lg:hidden"
            onClick={toggleOpen}
          >
            <IoMdClose size={20} />
          </a>
          <li>
            <a>
              <TbHome2 size={20} />
              Inicio
            </a>
          </li>
          <li>
            <h2 className="menu-title">Inicio</h2>
            <ul>
              <li>
                <a>
                  <TbHome2 size={20} />
                  Item 1
                </a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </li>
          <li>
            <details open>
              <summary>Parent</summary>
              <ul>
                <li>
                  <a>level 2 item 1</a>
                </li>
                <li>
                  <a>level 2 item 2</a>
                </li>
                <li>
                  <details open>
                    <summary>Parent</summary>
                    <ul>
                      <li>
                        <a>level 3 item 1</a>
                      </li>
                      <li>
                        <a>level 3 item 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
