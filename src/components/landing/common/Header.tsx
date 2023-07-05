import Link from "next/link";
import Logo from "../../common/Logo";

const Header: React.FC<any> = () => {
    //const router = useRouter();
    return (
        <div>
            <header className="fixed top-0 w-full  z-30 bg-gray-200 transition-all">
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
                        <Link href="/">
                            Sign In
                            {/* <a className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">
                                    Sign In
                                </a> */}
                        </Link>
                        {/* <ButtonOutline>Sign Up</ButtonOutline> */}
                    </div>
                </nav>
            </header>

            <div className="navbar bg-base-100 px-20">
                <div className="navbar-start">

                    {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
                    <Link href="/">
                        <Logo className="w-28" />
                    </Link>
                    <div className="dropdown">
                        {/* <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label> */}
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>

                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Item 1</a></li>
                        <li tabIndex={0}>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>

    );
};

export default Header;