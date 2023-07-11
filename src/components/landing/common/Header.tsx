"use client"

import Link from "next/link";
import Logo from "../../common/Logo";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/* const router = useRouter(); */
const Header: React.FC<any> = () => {


    const [scrollActive, setScrollActive] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScrollActive(window.scrollY > 20);
        });
    }, []);

    return (
        <>
            <header
                className={"top-0 sticky z-30 w-full bg-white transition-all" +
                    (scrollActive ? "shadow-md border-b pt-0" : " pt-2")
                }
            >
                <nav className="max-w-screen-2xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
                    <div className="col-start-1 col-end-2 flex items-center">
                        <Logo className="w-28" />
                    </div>
                    {/* <ul className="hidden lg:flex col-start-4 col-end-8 text-black-500  items-center">
                    <Link href="/" className="hover:text-primary hover:font-semibold px-4">
                            Inicio
                        </Link>
                        <li className={"/candidates" == "/candidates" ? "text-primary" : ""}>
                            <Link href="/candidates">Candidatos</Link>
                        </li>
                    </ul> */}
                    <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
                        <ul className="col-start-8 col-end-8 text-black-500 items-center px-4">
                            <Link href="/" className="hover:text-primary hover:font-semibold px-4">
                                Inicio
                            </Link>
                            <Link href="/candidates" className="hover:text-primary hover:font-semibold px-4">
                                Candidatos
                            </Link>
                            <Link href="/results" className="hover:text-primary hover:font-semibold px-4">
                                Resultados
                            </Link>
                        </ul>
                        {/* <Link href="/">
                            Sign In
                            {/* <a className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">
                            </a> 
                        </Link> */}
                        {/* <ButtonOutline>Sign Up</ButtonOutline> */}
                    </div>
                </nav>
            </header>
            {/* <header className="fixed top-0 w-full  z-30 bg-gray-200 transition-all">
                <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
                    <Link href="/" className="col-start-1 col-end-2 flex items-center">
                        <Logo className="w-28" />
                    </Link>
                    <ul className="col-start-8 col-end-8 text-black-500 items-center px-4">
                        <Link href="/candidates" className="hover:text-primary hover:font-semibold px-4">
                            Inicio
                        </Link>
                        <Link href="/candidates" className="hover:text-primary hover:font-semibold px-4">
                            Candidatos
                        </Link>
                        <Link href="/candidates" className="hover:text-primary hover:font-semibold px-4">
                            Resultados
                        </Link>
                    </ul>
                    <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
                        
                    </div>
                </nav>
            </header> */}
        </>

    );
};

export default Header;