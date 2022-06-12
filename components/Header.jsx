import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { removeCookies } from "cookies-next";
import logoutUser from "services/logoutUser";
import { AuthConsumer } from "contexts/AuthContext";
import { useModal } from "hooks/useModal";
import { Modal } from "components/Modal";

export function Header(){
    const {user, exitAuth} = AuthConsumer();
    const router = useRouter();
    const refMenu = useRef(null);
    const {modal, textModal, successModal, route, setModal, setTextModal, setSuccessModal, setRoute} = useModal();
    const clickMenu = () => {
        refMenu.current.classList.toggle('hidden');
    }
    const clickLogout = () => {
        logoutUser(user)
        .then( ({response, message}) => {
            if(response){
                removeCookies('auth_token');
                exitAuth();
                setModal(true);
                setTextModal(message);
                setSuccessModal(response);
                setRoute("/");
            }
        } )
    }
    return(
        <header className="bg-gray-100 h-16 flex align-center">
            <div className="flex justify-center items-center w-full max-w-xl mx-auto px-4">
                <Link href="/"><a className="font-bold text-3xl">Marzor</a></Link>
                <Link href="/cart">
                    <a className="ml-auto">
                        <svg width={30} viewBox="0 0 299.915 299.915">
                        <g>
                            <path d="M293.494,53.616H55.701c-0.463,0-0.88,0.174-1.318,0.27l-9.672-32.115c-0.109-0.347-0.341-0.604-0.495-0.925   c-0.264-3.303-2.956-5.919-6.324-5.919c-0.006,0-0.019,0-0.026,0L6.401,15.061C2.847,15.081-0.013,17.973,0,21.52   c0.013,3.541,2.886,6.401,6.427,6.401c0.006,0,0.019,0,0.026,0l26.652-0.116l61.524,204.187   c-6.112,5.585-10.013,13.541-10.013,22.468c0,16.858,13.663,30.527,30.527,30.527c16.858,0,30.527-13.67,30.527-30.527   c0-4.396-0.964-8.548-2.635-12.32h88.819c-1.671,3.773-2.635,7.924-2.635,12.32c0,16.858,13.663,30.527,30.527,30.527   c16.858,0,30.527-13.67,30.527-30.527s-13.67-30.527-30.527-30.527c-6.401,0-12.333,1.986-17.243,5.354H132.38   c-4.91-3.368-10.836-5.354-17.237-5.354c-3.181,0-6.189,0.623-9.075,1.523l-9.178-30.45l161.918-0.129   c2.834,0,5.167-1.87,6.016-4.422c0.219-0.405,0.456-0.797,0.585-1.26l34.274-126.39c0.219-0.803,0.244-1.607,0.154-2.384   c0.006-0.135,0.077-0.244,0.077-0.373C299.921,56.495,297.042,53.616,293.494,53.616z M259.753,236.781   c9.749,0,17.674,7.924,17.674,17.674c0,9.749-7.924,17.674-17.674,17.674c-9.75,0-17.674-7.924-17.674-17.674   C242.08,244.705,250.004,236.781,259.753,236.781z M115.15,236.781c9.75,0,17.674,7.924,17.674,17.674   c0,9.749-7.924,17.674-17.674,17.674s-17.674-7.924-17.674-17.674C97.476,244.705,105.4,236.781,115.15,236.781z M254.04,182.03   l-161.011,0.129L58.176,66.476h227.201L254.04,182.03z"/>
                        </g>
                    </svg>
                    </a>
                </Link>
                {
                    user && 
                    <div className="relative group" onClick={clickMenu}>
                    <div className="cursor-pointer ml-3 space-y-1">
                        <div className="w-6 h-1 bg-black"></div>
                        <div className="w-6 h-1 bg-black"></div>
                        <div className="w-6 h-1 bg-black"></div>
                    </div>
                    <div ref={refMenu} className="hidden absolute w-44 bg-gray-100 right-0 text-center top-14 p-2 z-10 rounded-md">
                        <h2 className="border-b-2 p-1 border-black font-bold text-xl">{user.name}</h2>
                        <ul className="p-2">
                            {
                                (user.role === "admin")
                                ?
                                <>
                                    <li className="py-1"><Link href="/users"><a>Lista de usuarios</a></Link></li>
                                    <li className="py-1"><Link href="/"><a>Añadir plato</a></Link></li>
                                </>
                                :
                                <>
                                    <li className="py-1"><Link href={`/users/edit/${user.id}`}><a>Perfil</a></Link></li>
                                </>
                            }
                            <li className="py-1"><button className="py-2 px-3 bg-red-500 text-white rounded-3xl" onClick={clickLogout}>Cerrar Sesión</button></li>
                        </ul>
                    </div>
                    </div>
                    
                }
                {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
            </div>
        </header>
    )
}