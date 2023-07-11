import Logo from "../../common/Logo";
import unibe from '@/public/img/unibe.png';
import Image from 'next/image';


const Footer: React.FC = () => {
  return (
    <>
      <footer className="absolute max-w-screen-2xl px-6 sm:px-8 lg:px-16 footer p-6 bg-neutral text-white items-center">
        <div className="justify-center">
          <Logo className="w-52" />
        </div>
        <div className="justify-center">
          <Image src={unibe} width={200} alt="logo" priority />
        </div>
        <div className="max-w-sm">
          <p>DEVELOPERS:<br />Victor Bayas, Jhon Guacho <br />VOTARIX - Voto Electrónico , versión 1.0 <br />
            Todos los derechos reservados ©2023</p>
        </div>
      </footer>
    </>
  )
};

export default Footer;