'use client';

import { useCallback, useState, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MdOutlineHowToVote,
  MdOutlineHome,
  MdOutlineFace,
  MdOutlinePeople,
  MdOutlineGroups,
  MdOutlineSettings,
  MdOutlineClose,
} from 'react-icons/md';

import logo from '@/public/img/logo.svg';
import { SafeUser } from '../../types';
import Navbar from '../navbar/Navbar';
import DrawerMenuItem from './DrawerMenuItem';
import DrawerMenuTitle from './DrawerMenuTitle';

interface DrawerProps {
  currentUser: SafeUser | null;
  children: React.ReactNode;
}

const menuItems = [
  {
    children: [
      {
        icon: MdOutlineHome,
        label: 'Inicio',
        path: '/dashboard',
      },
    ],
  },
  {
    title: 'Elecciones',
    children: [
      {
        icon: MdOutlineHowToVote,
        label: 'Procesos Electorales',
        path: '/dashboard/elections',
      },
      {
        icon: MdOutlineGroups,
        label: 'Partidos Políticos',
        path: '/dashboard/parties',
      },
      {
        icon: MdOutlineFace,
        label: 'Candidatos',
        path: '/dashboard/candidates',
      },
    ],
  },
  {
    title: 'Administración',
    children: [
      {
        icon: MdOutlinePeople,
        label: 'Usuarios',
        path: '/dashboard/users',
      },
      {
        icon: MdOutlineSettings,
        label: 'Configuración',
        path: '/dashboard/settings',
      },
    ],
  },
];

const Drawer: React.FC<DrawerProps> = ({ currentUser, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="drawer min-h-screen lg:drawer-open">
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        readOnly
      />
      {/* content */}
      <div className="drawer-content overflow-x-auto bg-base-200">
        <Navbar currentUser={currentUser} onToggle={handleToggle} />
        <div className="px-4 py-8 lg:px-8">{children}</div>
      </div>
      {/* sidebar */}
      <div className="drawer-side">
        <label className="drawer-overlay" onClick={handleToggle}></label>
        <ul className="menu min-h-full w-80 gap-2 bg-base-100 px-4">
          {/* logo */}
          <div className="mb-4 flex justify-between">
            <Link href="/dashboard" className="btn-ghost btn">
              <Image src={logo} className="w-28" alt="logo" priority />
            </Link>
            <a
              className="btn-ghost btn-circle btn lg:hidden"
              onClick={handleToggle}
            >
              <MdOutlineClose size={24} />
            </a>
          </div>
          {/* links */}
          {menuItems.map((menuItem, index) => (
            <Fragment key={index}>
              {menuItem.title && <DrawerMenuTitle label={menuItem.title} />}
              {menuItem.children.map((link, index) => (
                <DrawerMenuItem
                  key={index}
                  icon={link.icon}
                  label={link.label}
                  path={link.path}
                />
              ))}
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
