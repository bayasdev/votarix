'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IoMdClose, IoMdHome } from 'react-icons/io';
import { FaUsers, FaUsersCog } from 'react-icons/fa';
import { MdHowToVote, MdPerson } from 'react-icons/md';
import { BsFilePerson, BsGearFill } from 'react-icons/bs';

import Navbar from './Navbar';
import { SafeUser } from '../types';
import logo from '@/public/img/logo.svg';

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
      {/* content */}
      <div className="drawer-content flex min-h-screen flex-col bg-gray-100">
        <Navbar currentUser={currentUser} toggleDrawer={toggleOpen} />
        <div className="p-8">{children}</div>
      </div>
      {/* sidebar */}
      <div className="drawer-side">
        <label className="drawer-overlay" onClick={toggleOpen}></label>
        <ul className="menu h-full w-80 gap-4 bg-base-100 p-4">
          {/* logo */}
          <div className="mb-4 flex justify-between">
            <Image src={logo} width={100} alt="logo" priority />
            <a
              className="btn-ghost btn-circle btn lg:hidden"
              onClick={toggleOpen}
            >
              <IoMdClose size={20} />
            </a>
          </div>
          {/* links */}
          <li>
            <a className="active">
              <IoMdHome size={20} />
              Inicio
            </a>
          </li>
          <li>
            <h2 className="menu-title">Elecciones</h2>
            <ul>
              <li>
                <a>
                  <MdHowToVote size={20} />
                  Procesos Electorales
                </a>
              </li>
              <li>
                <a>
                  <FaUsers size={20} />
                  Partidos Políticos
                </a>
              </li>
              <li>
                <a>
                  <BsFilePerson size={20} />
                  Candidatos
                </a>
              </li>
              <li>
                <a>
                  <MdPerson size={20} />
                  Votantes
                </a>
              </li>
            </ul>
          </li>
          <li>
            <h2 className="menu-title">Administración</h2>
            <ul>
              <li>
                <a>
                  <FaUsersCog size={20} />
                  Usuarios
                </a>
              </li>
              <li>
                <a>
                  <BsGearFill size={20} />
                  Configuración
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
