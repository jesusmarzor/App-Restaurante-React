import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { removeCookies } from "cookies-next";
import { AuthConsumer } from "contexts/AuthContext";
import { Button } from "components/Button";
import logoutUser from "services/logoutUser";
import { useModal } from "hooks/useModal";
import { Modal } from "components/Modal";

export function Menu(){
    const {user:authUser, exitAuth} = AuthConsumer();
    const router = useRouter();
    const refMenu = useRef(null);
    const [loading, setLoading] = useState(false);
    const {modal, textModal, successModal, route, setModal, setTextModal, setSuccessModal, setRoute} = useModal();
    const clickLogout = () => {
        setLoading(true);
        logoutUser(authUser)
        .then( ({response, message}) => {
            if(response){
                removeCookies('auth_token');
                exitAuth();
                setModal(true);
                setTextModal(message);
                setSuccessModal(response);
                setRoute("/");
                setLoading(false);
            }
        } )
    }
    return (
        <>
        <nav className="fixed z-20 bottom-0 left-0 w-full h-16 bg-cyan-700">
            <ul className="max-w-xl mx-auto h-full flex justify-center ">
                {
                    (!authUser)
                    ?
                    <>
                        <li className={`flex justify-center w-4/12 h-full ${(router.pathname === '/') && 'bg-cyan-800'}`}>
                            <Link href="/">
                                <a className="w-full flex flex-col justify-center items-center">
                                    <svg className="mx-auto fill-white" width="24" height="24" viewBox="0 0 460.298 460.297">
                                        <g>
                                            <path d="M230.149,120.939L65.986,256.274c0,0.191-0.048,0.472-0.144,0.855c-0.094,0.38-0.144,0.656-0.144,0.852v137.041    c0,4.948,1.809,9.236,5.426,12.847c3.616,3.613,7.898,5.431,12.847,5.431h109.63V303.664h73.097v109.64h109.629    c4.948,0,9.236-1.814,12.847-5.435c3.617-3.607,5.432-7.898,5.432-12.847V257.981c0-0.76-0.104-1.334-0.288-1.707L230.149,120.939    z"/>
                                            <path d="M457.122,225.438L394.6,173.476V56.989c0-2.663-0.856-4.853-2.574-6.567c-1.704-1.712-3.894-2.568-6.563-2.568h-54.816    c-2.666,0-4.855,0.856-6.57,2.568c-1.711,1.714-2.566,3.905-2.566,6.567v55.673l-69.662-58.245    c-6.084-4.949-13.318-7.423-21.694-7.423c-8.375,0-15.608,2.474-21.698,7.423L3.172,225.438c-1.903,1.52-2.946,3.566-3.14,6.136    c-0.193,2.568,0.472,4.811,1.997,6.713l17.701,21.128c1.525,1.712,3.521,2.759,5.996,3.142c2.285,0.192,4.57-0.476,6.855-1.998    L230.149,95.817l197.57,164.741c1.526,1.328,3.521,1.991,5.996,1.991h0.858c2.471-0.376,4.463-1.43,5.996-3.138l17.703-21.125    c1.522-1.906,2.189-4.145,1.991-6.716C460.068,229.007,459.021,226.961,457.122,225.438z"/>
                                        </g>
                                    </svg>
                                    <span className="font-cookie text-white text-lg text-center">Inicio</span>
                                </a>
                            </Link>
                        </li>
                        <li className={`flex justify-center w-4/12 h-full mr-10 ${(router.pathname.substring(0,5) === '/menu') && 'bg-cyan-800'}`}>
                            <Link href="/menu">
                                <a className="w-full flex flex-col justify-center items-center">
                                    <svg className="mx-auto fill-white" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                                    </svg>
                                    <span className="font-cookie text-white text-lg">Carta</span>
                                </a>
                            </Link>
                        </li>
                        <li className="absolute w-20 h-20 rounded-full bg-white bottom-6 border-4 border-white flex justify-center group">
                            <Link href="/cart">
                                <a className={`w-full bg-lime-600 rounded-full flex flex-col justify-center items-center ${(router.pathname.substring(0,5) === '/cart') && 'bg-lime-700'}  focus:animate-menu`}>
                                    <svg className="mx-auto fill-white" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                                    </svg>
                                    <span className="font-cookie text-white text-lg">Carrito</span>
                                </a>
                            </Link>
                        </li>
                        <li className={`flex justify-center w-4/12 ml-10 h-full ${(router.pathname.substring(0,7) === '/orders') && 'bg-cyan-800'}`}>
                            <Link href="/orders">
                                <a className="w-full flex flex-col justify-center items-center">
                                <svg  className="mx-auto fill-white" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M6 3C3.79 3 2 4.79 2 7S3.79 11 6 11 10 9.21 10 7 8.21 3 6 3M6 9C4.9 9 4 8.1 4 7S4.9 5 6 5 8 5.9 8 7 7.1 9 6 9M6 13C3.79 13 2 14.79 2 17S3.79 21 6 21 10 19.21 10 17 8.21 13 6 13M12 5H22V7H12V5M12 19V17H22V19H12M12 11H22V13H12V11Z"/>
                                </svg>
                                    <span className="font-cookie text-white text-lg">Pedidos</span>
                                </a>
                            </Link>
                        </li>
                        <li className={`flex justify-center w-4/12 h-full ${(router.pathname.substring(0,12) === '/reservation') && 'bg-cyan-800'}`}>
                            <Link href="/reservation/create">
                                <a className="w-full flex flex-col justify-center items-center">
                                    <svg className="mx-auto fill-white" width="24" height="24" viewBox="0 0 485.213 485.212">
                                        <g>
                                            <path d="M60.652,75.816V15.163C60.652,6.781,67.433,0,75.817,0c8.38,0,15.161,6.781,15.161,15.163v60.653   c0,8.38-6.781,15.161-15.161,15.161C67.433,90.978,60.652,84.196,60.652,75.816z M318.424,90.978   c8.378,0,15.163-6.781,15.163-15.161V15.163C333.587,6.781,326.802,0,318.424,0c-8.382,0-15.168,6.781-15.168,15.163v60.653   C303.256,84.196,310.042,90.978,318.424,90.978z M485.212,363.906c0,66.996-54.312,121.307-121.303,121.307   c-66.986,0-121.302-54.311-121.302-121.307c0-66.986,54.315-121.3,121.302-121.3C430.9,242.606,485.212,296.919,485.212,363.906z    M454.89,363.906c0-50.161-40.81-90.976-90.98-90.976c-50.166,0-90.976,40.814-90.976,90.976c0,50.171,40.81,90.98,90.976,90.98   C414.08,454.886,454.89,414.077,454.89,363.906z M121.305,181.955H60.652v60.651h60.653V181.955z M60.652,333.584h60.653V272.93   H60.652V333.584z M151.629,242.606h60.654v-60.651h-60.654V242.606z M151.629,333.584h60.654V272.93h-60.654V333.584z    M30.328,360.891V151.628h333.582v60.653h30.327V94c0-18.421-14.692-33.349-32.843-33.349h-12.647v15.166   c0,16.701-13.596,30.325-30.322,30.325c-16.731,0-30.326-13.624-30.326-30.325V60.651H106.14v15.166   c0,16.701-13.593,30.325-30.322,30.325c-16.733,0-30.327-13.624-30.327-30.325V60.651H32.859C14.707,60.651,0.001,75.579,0.001,94   v266.892c0,18.36,14.706,33.346,32.858,33.346h179.424v-30.331H32.859C31.485,363.906,30.328,362.487,30.328,360.891z    M303.256,242.606v-60.651h-60.648v60.651H303.256z M409.399,363.906h-45.49v-45.49c0-8.377-6.781-15.158-15.163-15.158   s-15.159,6.781-15.159,15.158v60.658c0,8.378,6.777,15.163,15.159,15.163h60.653c8.382,0,15.163-6.785,15.163-15.163   C424.562,370.692,417.781,363.906,409.399,363.906z"/>
                                        </g>
                                    </svg>
                                    <span className="font-cookie text-white text-lg text-center">Reservar</span>
                                </a>
                            </Link>
                        </li>

                    </>
                    :
                    <>
                        <li className={`flex justify-center w-4/12 h-full ${(router.pathname.substring(0,6) === '/users' && router.query.id === authUser.id + "") && 'bg-cyan-800'}`}>
                            
                                    <Link href={`/users/${authUser.id}`}>
                                        <a className="w-full flex flex-col justify-center items-center">
                                            <div className="w-7 h-7 rounded-full overflow-hidden">
                                                <Image src={process.env.NEXT_PUBLIC_URL + authUser.image} alt={`Imagen de ${authUser.name}`} width={50} height={50} objectFit="cover"/>
                                            </div>
                                            <span className="font-cookie text-white text-lg">Perfil</span>
                                        </a>
                                    </Link>
                                
                        </li>
                        <li className={`flex justify-center w-4/12 h-full ${(router.pathname.substring(0,5) === '/menu') && 'bg-cyan-800'}`}>
                            <Link href="/menu">
                                <a className="w-full flex flex-col justify-center items-center">
                                    <svg className="mx-auto fill-white" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                                    </svg>
                                    <span className="font-cookie text-white text-lg">Carta</span>
                                </a>
                            </Link>
                        </li>
                        {
                            (authUser.role === "admin")
                            &&
                            <li className={`flex justify-center w-4/12 h-full ${(router.pathname.substring(0,6) === '/users' && router.query.id !== authUser.id + "") && 'bg-cyan-800'}`}>
                                <Link href={`/users`}>
                                    <a className="w-full flex flex-col justify-center items-center">
                                        <svg className="mx-auto fill-white" width="24" height="24" viewBox="0 0 548.169 548.169">
                                            <g>
                                                <path d="M109.634,164.452c20.179,0,37.402-7.135,51.674-21.411c14.277-14.275,21.416-31.503,21.416-51.678    c0-20.173-7.139-37.401-21.416-51.678c-14.272-14.275-31.496-21.414-51.674-21.414c-20.177,0-37.401,7.139-51.676,21.414    C43.684,53.962,36.545,71.186,36.545,91.363c0,20.179,7.139,37.403,21.413,51.678C72.233,157.313,89.457,164.452,109.634,164.452z    "/>
                                                <path d="M196.569,278.519c21.413,21.406,47.248,32.114,77.516,32.114c30.269,0,56.103-10.708,77.515-32.114    c21.409-21.42,32.117-47.258,32.117-77.52c0-30.264-10.708-56.101-32.117-77.515c-21.412-21.414-47.246-32.121-77.515-32.121    c-30.268,0-56.105,10.709-77.516,32.121c-21.411,21.411-32.12,47.248-32.12,77.515S175.158,257.102,196.569,278.519z"/>
                                                <path d="M438.543,164.452c20.17,0,37.397-7.135,51.671-21.411c14.274-14.275,21.409-31.503,21.409-51.678    c0-20.173-7.135-37.401-21.409-51.678c-14.273-14.275-31.501-21.414-51.671-21.414c-20.184,0-37.407,7.139-51.682,21.414    c-14.271,14.277-21.409,31.501-21.409,51.678c0,20.179,7.139,37.403,21.409,51.678    C401.136,157.313,418.359,164.452,438.543,164.452z"/>
                                                <path d="M512.763,164.456c-1.136,0-5.276,1.999-12.415,5.996c-7.132,3.999-16.416,8.044-27.833,12.137    c-11.416,4.089-22.747,6.136-33.972,6.136c-12.758,0-25.406-2.187-37.973-6.567c0.945,7.039,1.424,13.322,1.424,18.842    c0,26.457-7.71,50.819-23.134,73.089c30.841,0.955,56.056,13.134,75.668,36.552h38.256c15.605,0,28.739-3.863,39.396-11.57    c10.657-7.703,15.989-18.986,15.989-33.83C548.172,198.047,536.376,164.452,512.763,164.456z"/>
                                                <path d="M470.096,395.284c-1.999-11.136-4.524-21.464-7.57-30.978c-3.046-9.521-7.139-18.794-12.271-27.836    c-5.141-9.034-11.044-16.748-17.706-23.127c-6.667-6.379-14.805-11.464-24.414-15.276c-9.609-3.806-20.225-5.708-31.833-5.708    c-1.906,0-5.996,2.047-12.278,6.14c-6.283,4.089-13.224,8.665-20.841,13.702c-7.615,5.037-17.789,9.609-30.55,13.702    c-12.762,4.093-25.608,6.14-38.544,6.14c-12.941,0-25.791-2.047-38.544-6.14c-12.756-4.093-22.936-8.665-30.55-13.702    c-7.616-5.037-14.561-9.613-20.841-13.702c-6.283-4.093-10.373-6.14-12.279-6.14c-11.609,0-22.22,1.902-31.833,5.708    c-9.613,3.812-17.749,8.897-24.41,15.276c-6.667,6.372-12.562,14.093-17.705,23.127c-5.137,9.042-9.229,18.315-12.275,27.836    c-3.045,9.514-5.564,19.842-7.566,30.978c-2,11.136-3.331,21.505-3.997,31.121c-0.667,9.613-0.999,19.466-0.999,29.554    c0,22.836,6.945,40.874,20.839,54.098c13.899,13.223,32.363,19.842,55.389,19.842h249.535c23.028,0,41.49-6.619,55.392-19.842    c13.894-13.224,20.841-31.262,20.841-54.098c0-10.088-0.335-19.938-0.992-29.554C473.418,416.789,472.087,406.419,470.096,395.284    z"/>
                                                <path d="M169.303,274.088c-15.418-22.27-23.125-46.632-23.122-73.089c0-5.52,0.477-11.799,1.427-18.842    c-12.564,4.377-25.221,6.567-37.974,6.567c-11.23,0-22.552-2.046-33.974-6.136c-11.417-4.093-20.699-8.138-27.834-12.137    c-7.138-3.997-11.281-5.996-12.422-5.996C11.801,164.456,0,198.051,0,265.24c0,14.844,5.33,26.127,15.987,33.83    c10.66,7.707,23.794,11.563,39.397,11.563h38.26C113.251,287.222,138.467,275.042,169.303,274.088z"/>
                                            </g>
                                        </svg>
                                        <span className="font-cookie text-white text-lg">Usuarios</span>
                                    </a>
                                </Link>
                            </li>
                        }
                        <li className={`flex justify-center w-4/12 h-full ${(router.pathname.substring(0,12) === '/reservation') && 'bg-cyan-800'}`}>
                            <Link href="/reservation">
                                <a className="w-full flex flex-col justify-center items-center">
                                    <svg className="mx-auto fill-white" width="24" height="24" viewBox="0 0 485.213 485.212">
                                        <g>
                                            <path d="M60.652,75.816V15.163C60.652,6.781,67.433,0,75.817,0c8.38,0,15.161,6.781,15.161,15.163v60.653   c0,8.38-6.781,15.161-15.161,15.161C67.433,90.978,60.652,84.196,60.652,75.816z M318.424,90.978   c8.378,0,15.163-6.781,15.163-15.161V15.163C333.587,6.781,326.802,0,318.424,0c-8.382,0-15.168,6.781-15.168,15.163v60.653   C303.256,84.196,310.042,90.978,318.424,90.978z M485.212,363.906c0,66.996-54.312,121.307-121.303,121.307   c-66.986,0-121.302-54.311-121.302-121.307c0-66.986,54.315-121.3,121.302-121.3C430.9,242.606,485.212,296.919,485.212,363.906z    M454.89,363.906c0-50.161-40.81-90.976-90.98-90.976c-50.166,0-90.976,40.814-90.976,90.976c0,50.171,40.81,90.98,90.976,90.98   C414.08,454.886,454.89,414.077,454.89,363.906z M121.305,181.955H60.652v60.651h60.653V181.955z M60.652,333.584h60.653V272.93   H60.652V333.584z M151.629,242.606h60.654v-60.651h-60.654V242.606z M151.629,333.584h60.654V272.93h-60.654V333.584z    M30.328,360.891V151.628h333.582v60.653h30.327V94c0-18.421-14.692-33.349-32.843-33.349h-12.647v15.166   c0,16.701-13.596,30.325-30.322,30.325c-16.731,0-30.326-13.624-30.326-30.325V60.651H106.14v15.166   c0,16.701-13.593,30.325-30.322,30.325c-16.733,0-30.327-13.624-30.327-30.325V60.651H32.859C14.707,60.651,0.001,75.579,0.001,94   v266.892c0,18.36,14.706,33.346,32.858,33.346h179.424v-30.331H32.859C31.485,363.906,30.328,362.487,30.328,360.891z    M303.256,242.606v-60.651h-60.648v60.651H303.256z M409.399,363.906h-45.49v-45.49c0-8.377-6.781-15.158-15.163-15.158   s-15.159,6.781-15.159,15.158v60.658c0,8.378,6.777,15.163,15.159,15.163h60.653c8.382,0,15.163-6.785,15.163-15.163   C424.562,370.692,417.781,363.906,409.399,363.906z"/>
                                        </g>
                                    </svg>
                                    <span className="font-cookie text-white text-lg text-center">Reservas</span>
                                </a>
                            </Link>
                        </li>
                        <li className={`flex justify-center w-4/12 h-full ${(router.pathname.substring(0,7) === '/orders') && 'bg-cyan-800'}`}>
                            <Link href="/orders">
                                <a className="w-full flex flex-col justify-center items-center">
                                <svg  className="mx-auto fill-white" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M6 3C3.79 3 2 4.79 2 7S3.79 11 6 11 10 9.21 10 7 8.21 3 6 3M6 9C4.9 9 4 8.1 4 7S4.9 5 6 5 8 5.9 8 7 7.1 9 6 9M6 13C3.79 13 2 14.79 2 17S3.79 21 6 21 10 19.21 10 17 8.21 13 6 13M12 5H22V7H12V5M12 19V17H22V19H12M12 11H22V13H12V11Z"/>
                                </svg>
                                    <span className="font-cookie text-white text-lg">Pedidos</span>
                                </a>
                            </Link>
                        </li>
                        {
                            (authUser.role !== 'cocinero')
                            &&
                            <li className={`flex justify-center w-4/12 h-full ${(router.pathname.substring(0,7) === '/tables') && 'bg-cyan-800'}`}>
                                <Link href="/tables">
                                    <a className="w-full flex flex-col justify-center items-center">
                                        <svg className="mx-auto fill-white" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M12 22H6A2 2 0 0 1 8 20V8H2V5H16V8H10V20A2 2 0 0 1 12 22M22 2V22H20V15H15V22H13V14A2 2 0 0 1 15 12H20V2Z"/>
                                        </svg>
                                        <span className="font-cookie text-white text-lg">Mesas</span>
                                    </a>
                                </Link>
                            </li>
                        }
                        
                        <li className="flex justify-center w-4/12 h-full">
                            <button onClick={clickLogout} className="w-full flex flex-col justify-center items-center">
                                <svg className="mx-auto fill-white" width="24" height="24" viewBox="0 0 533.333 533.333">
                                    <g>
                                        <path d="M416.667,333.333v-66.666H250V200h166.667v-66.667l100,100L416.667,333.333z M383.333,300v133.333H216.667v100l-200-100V0   h366.667v166.667H350V33.333H83.333L216.667,100v300H350V300H383.333z"/>
                                    </g>
                                </svg>
                                <span className="font-cookie text-white text-lg">Salir</span>
                            </button>
                        </li>
                    </>
                }
            </ul>
        </nav>
        {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
    </>
    )
}