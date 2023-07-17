'use client';

import { useCallback, useState, Fragment } from 'react';
import Link from 'next/link';
import {
  MdOutlineHowToVote,
  MdOutlineHome,
  MdOutlineFace,
  MdOutlinePeople,
  MdOutlineGroups,
  MdOutlineSettings,
  MdOutlineClose,
} from 'react-icons/md';
import { PiIdentificationBadgeBold } from 'react-icons/pi';

import { SafeUser } from '../../../types';
import Navbar from './Navbar';
import MenuItem from './MenuItem';
import MenuTitle from './MenuTitle';
import Logo from '../../common/Logo';

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
    title: 'Procesos Electorales',
    children: [
      {
        icon: MdOutlineHowToVote,
        label: 'Elecciones',
        path: '/dashboard/elections',
      },
      {
        icon: PiIdentificationBadgeBold,
        label: 'Puestos Electivos',
        path: '/dashboard/positions',
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
      <div className="drawer-content min-w-0 bg-base-200">
        <Navbar currentUser={currentUser} onToggle={handleToggle} />
        <div className="px-4 py-8 lg:px-8">{children}</div>
      </div>
      <div className="drawer-side z-20">
        <label className="drawer-overlay" onClick={handleToggle}></label>
        <ul className="menu min-h-full w-80 gap-2 bg-base-100 px-4">
          <div className="mb-4 flex justify-between">
            <Link href="/dashboard" className="btn-ghost btn">
              <Logo className="w-28" />
            </Link>
            <a
              className="btn-ghost btn-circle btn lg:hidden"
              onClick={handleToggle}
            >
              <MdOutlineClose size={24} />
            </a>
          </div>
          {menuItems.map((menuItem, index) => (
            <Fragment key={index}>
              {menuItem.title && <MenuTitle label={menuItem.title} />}
              {menuItem.children.map((link, index) => (
                <MenuItem
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
