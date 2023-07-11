import Image from 'next/image';
import logo from '@/public/img/vote.png';

const Hero: React.FC = () => (
    <>
        <div className="max-w-screen-2xl bg-gray-200 px-8 xl:px-16 mx-auto">

            <div
                className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
            >
                <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
                    <h1 className="text-3xl lg:text-3xl font-medium text-black-600 leading-normal">
                        ELECCIONES REPRESENTANTES ESTUDIANTILES AL ORGANISMO DE COGOBIERNO 2022-2023.
                    </h1>
                    {/* <p className="text-black-500 mt-4 mb-6">
                        Provide a network for all your needs with ease and fun using
                        LaslesVPN discover interesting features from us.
                    </p> */}
                    <button className="btn btn-primary mt-4 text-lg">
                        INGRESAR A VOTAR
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </button>
                </div>
                <div className="flex w-full">
                    <div className="h-full w-full" >
                        <img src="https://unsm.edu.pe/wp-content/uploads/2021/11/elecciones-univer-unsm-24-11-2021.png" alt="" />
                        {/*  <Image
                            src="https://unsm.edu.pe/wp-content/uploads/2021/11/elecciones-univer-unsm-24-11-2021.png"
                            alt="VPN Illustrasi"
                            quality={100}
                            width={612}
                            height={383}
                            layout="responsive"
                        /> */}
                    </div>
                </div>
            </div>
            {/*  <div className="relative pt-32 pb-28 px-4 sm:pt-20 sm:pb-48 sm:px-16 overflow-hidden bg-primary dark:bg-gray-900 dark">


                <img className="absolute inset-0 opacity-10 pointer-events-none" src="https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg" alt="" />

                <div className="z-10 relative flex flex-col items-center">
                    {/* <h2 className="text-xl font-semibold">HELP CENTER</h2> 
                    <div className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-center">
                        {/* Votación Rápida, Eficiente y Segura. 
                        ELECCIONES REPRESENTANTES ESTUDIANTILES AL ORGANISMO DE COGOBIERNO 2022-2023
                    </div>
                </div>
            </div>
            <div className="card card-side bg-base-100 shadow-xl mx-64 -mt-16 sm:-mt-24">
                <div className="card-body">
                    <h2 className="card-title">New movie is released!</h2>
                    <p>Consulte e imprima la participación
                        electoral en formato PDF.</p>
                    <div className="card-actions  justify-center">
                        <button className="btn w-full font-bold btn-primary">Ver participación</button>
                    </div>
                </div>
                <div className="card-body">
                    <h2 className="card-title">New movie is released!</h2>
                    <p>Consulte e imprima los resultados electorales en formato PDF.</p>
                    <div className="card-actions  justify-center">
                        <button className="btn w-full font-bold btn-primary">Ver resultados</button>
                    </div>
                </div>
                <div className="card-body">
                    <h2 className="card-title">Finaliza el: 05/07/2023</h2>

                    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span >10</span>
                            </span>
                            hours
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span >24</span>
                            </span>
                            min
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span>12</span>
                            </span>
                            sec
                        </div>
                    </div>
                    {<p>Click the button to watch on Jetflix app.</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Watch</button>
                </div> 
                </div> 
            </div>
                */}
        </div>
    </>
);
export default Hero;