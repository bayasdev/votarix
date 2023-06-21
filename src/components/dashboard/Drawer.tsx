'use client';

import { useCallback, useState } from 'react';
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

import Navbar from './Navbar';
import { SafeUser } from '../../types';
import logo from '@/public/img/logo.svg';

interface DrawerProps {
  currentUser: SafeUser | null;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ currentUser, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
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
      <div className="drawer-content flex flex-col bg-gray-100">
        <Navbar currentUser={currentUser} toggleDrawer={toggleOpen} />
        <div className="p-8">{children}</div>
      </div>
      {/* sidebar */}
      <div className="drawer-side">
        <label className="drawer-overlay" onClick={toggleOpen}></label>
        <ul className="menu min-h-full w-80 gap-2 bg-base-100 p-4 lg:p-6">
          {/* logo */}
          <div className="mb-4 flex justify-between">
            <Image src={logo} width={100} alt="logo" priority />
            <a className="btn-circle btn lg:hidden" onClick={toggleOpen}>
              <MdOutlineClose size={20} />
            </a>
          </div>
          {/* links */}
          <li>
            <a className="active">
              <MdOutlineHome size={20} />
              Inicio
            </a>
          </li>
          <li className="menu-title">Elecciones</li>
          <li>
            <a>
              <MdOutlineHowToVote size={20} />
              Procesos Electorales
            </a>
          </li>
          <li>
            <a>
              <MdOutlineGroups size={20} />
              Partidos Políticos
            </a>
          </li>
          <li>
            <a>
              <MdOutlineFace size={20} />
              Candidatos
            </a>
          </li>
          <li className="menu-title">Administración</li>
          <li>
            <a>
              <MdOutlinePeople size={20} />
              Usuarios
            </a>
          </li>
          <li>
            <a>
              <MdOutlineSettings size={20} />
              Configuración
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
