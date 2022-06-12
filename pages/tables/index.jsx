import { Button } from "components/Button";
import { ButtonBack } from "components/ButtonBack"
import  getObjects from "services/getObjects"
import Head from "next/head";
import { getCookie } from "cookies-next";
import { Modal } from "components/Modal";
import { useModal } from "hooks/useModal";
import putObject from "services/putObject";
import { useRouter } from "next/router";
import { AuthConsumer } from "contexts/AuthContext";
import deleteObject from "services/deleteObject";

export default function TablesList({tables}){
    const {user: authUser} = AuthConsumer();
    const router = useRouter();
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();

    const removeTable = (id) => {
        const token = getCookie('auth_token');
        deleteObject('table', id, token)
        .then( ({response, message}) => {
            setModal(true);
            setSuccessModal(response)
            setTextModal(message);
            (response) && setRoute("/tables");
        })
    }

    const handleClick = (id) => {
        const token = getCookie('auth_token');
        putObject('table', id, { reservation_id: null }, token)
        .then( ({response, message, error_list, reservation}) => {
            setSuccessModal(response);
            setTextModal(message);
            setModal(true);
            (response) && setRoute('/tables');
        })
    }

    return (
        <>
        <Head>
            <title>Puro gourmet | Mesas</title>
        </Head>
        <ButtonBack/>
        <h1 className="font-cookie text-center text-5xl font-bold my-2">Mesas</h1>
        {
            (tables.length > 0)
            ?
            <ul className="flex justify-around items-center flex-wrap">
            {
                tables.map( ({id, number, reservation_id}) => {
                    return (
                        <li className="flex flex-col" key={number}>
                            <button onClick={() => handleClick(id)} className={`relative text-center ${(reservation_id === null) ? 'pointer-events-none' : 'cursor-pointer hover:bg-slate-200'} p-5 rounded-xl m-5`}>
                                {
                                    (reservation_id !== null) &&
                                    <p className="absolute -rotate-[20deg] text-xl text-white font-bold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 p-2 rounded-xl">Ocupada</p>
                                }
                                <svg width="64pt" height="64pt" viewBox="0 0 22.577778 22.577778">
                                    <g transform="translate(0,-274.42223)">
                                        <path d="m 20.260725,277.95876 c -0.04244,-0.13951 -0.170751,-0.23514 -0.316569,-0.23596 H 2.6355978 c -0.1458182,6.7e-4 -0.2741234,0.0965 -0.3165678,0.23596 l -1.33810361,4.37119 c -0.0170408,3.5679 -0.008793,7.1359 -0.008793,10.70385 l 5.648e-5,1e-5 c -9.94e-6,0.36369 0.30259263,0.66552 0.66628763,0.66563 h 1.0244614 c 0.3639114,1e-4 0.6640745,-0.30433 0.6630395,-0.66824 l -0.016907,-5.86919 1.3241254,-1.51394 v 2.39345 c 0,0.36368 0.3019604,0.66563 0.6656388,0.66563 h 0.9978085 c 0.3636778,0 0.6656385,-0.30195 0.6656388,-0.66563 v -3.32885 h 8.6552551 v 3.32885 c 0,0.36368 0.300009,0.66563 0.663688,0.66563 h 0.999759 c 0.363679,0 0.665638,-0.30195 0.665638,-0.66563 v -2.33624 l 1.304626,1.43723 v 5.8913 c -9e-6,0.36369 0.30194,0.66553 0.665639,0.66563 h 1.024459 c 0.363911,1e-4 0.667326,-0.30433 0.66629,-0.66824 -0.0034,-3.54924 -0.02073,-7.09843 -0.0094,-10.70353 z M 2.8813582,278.38845 H 19.698488 l 1.125216,3.66101 H 1.7561424 Z M 1.6384841,282.7151 H 20.941361 v 1.33128 H 1.6384841 Z m 0,10.31871 v -8.32114 h 0.9971602 c 0.0039,2.77372 0.01531,6.93298 0.020003,8.31984 z m 1.663448,-8.32114 h 1.2649734 l -1.2610728,1.43918 z m 2.149025,0 h 0.8457 v 3.32885 H 5.2988486 v -3.15464 z m 10.8302819,0 h 0.764445 l 0.235314,0.25937 v 3.06948 h -0.999759 z m 1.665398,0 h 1.304626 v 1.43918 l -1.304626,-1.43398 z m 1.997565,0 h 0.973107 l 0.02405,8.32114 H 19.9169 c 0.0038,-2.77375 0.01145,-5.54745 0.0273,-8.32114 z" id="path417"/>
                                    </g>
                                </svg>
                                <p className="font-bold text-xl">{number}</p>
                            </button>
                            {
                                (authUser && authUser.role === 'admin') && <button className="text-red-500" onClick={() => removeTable(id)}>Eliminar</button>
                            }
                        </li>
                    )
                })
            }
        </ul>
            :
                <p className="text-center my-5">No hay mesas registradas</p>
        }
        <div className="my-5 flex justify-center items-center">
            <Button href="tables/create">Crear</Button>
        </div>
        {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
        </>
    )
}

export async function getServerSideProps ({req}) {
    const token = req.cookies.auth_token;
    const tables = await getObjects('table', token);
    return {
        props: {
            tables
        }
    }
}