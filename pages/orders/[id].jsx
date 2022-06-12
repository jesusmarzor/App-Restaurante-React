import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Head from "next/head";
import deleteObject from "services/deleteObject";
import showObject from "services/showObject";
import { AuthConsumer } from "contexts/AuthContext";
import { useModal } from "hooks/useModal";
import { Modal } from "components/Modal";
import { ButtonBack } from "components/ButtonBack";
import { Button } from "components/Button";
import putObject from "services/putObject";
import { useState } from "react";

export default function CreateOrder({order, response, message}){
    const {user: authUser} = AuthConsumer();
    const router = useRouter();
    const menu = order.menu;
    const reservation = order.reservation;
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
    
    useEffect( () => {
        if(!order){
            setModal(true);
            setTextModal(message);
            setSuccessModal(response);
            setRoute("/");
        }  
    },[])

    const changeTracking = (tracking) => {
        const token = getCookie('auth_token');
        putObject('order', order.id, {tracking}, token)
        .then( ({response, message}) => {
            setModal(true);
            setSuccessModal(response)
            setTextModal(message);
            (response) && setRoute("/orders");
        })
    }

    const deleteOrder = (id) => {
        const token = getCookie('auth_token');
        deleteObject('order', id, token)
        .then( ({response, message}) => {
            setModal(true);
            setSuccessModal(response)
            setTextModal(message);
            (response) && setRoute("/orders");
        })
    }

    return(
        <>
            <Head><title>Puro gourmet | Ver pedido</title></Head>
            {(order) &&
                <>
                    <ButtonBack/>
                    <h1 className="text-center font-bold text-2xl">ver pedido</h1>
                    <h2 className="py-2 my-2 border-b-2 border-slate-100 font-bold text-xl">Pedido</h2>
                    <p className="text-center">{menu.name} x {order.number}</p>
                    {
                        (order.note) &&
                        <>
                            <h2 className="py-2 my-2 border-b-2 border-slate-100 font-bold text-xl">Nota</h2>
                            <p className="text-center">{order.note}</p>
                        </>

                    }
                    <h2 className="py-2 my-2 border-b-2 border-slate-100 font-bold text-xl">Mesa</h2>
                    <p className="text-center">
                    {
                        reservation.tables.map( ( table, index ) => {
                            return (index === reservation.tables.length-1) ? table.number : table.number + ', ';
                        })
                    }
                    </p>
                    <h2 className="py-2 my-2 border-b-2 border-slate-100 font-bold text-xl">Estado</h2>
                    <p className="text-center">{order.tracking}</p>
                    <h2 className="py-2 my-2 border-b-2 border-slate-100 font-bold text-xl">Pago</h2>
                    <p className="text-center">{(order.paid) ? "Pagado" : "Pendiente de pago"}</p>
                    <div className="flex items-center justify-around w-full mt-5">
                        {
                        (authUser && authUser.role !== 'camarero') &&
                            <>
                            <Button onclick={() => changeTracking('Preparando')} width="w-30" backgroundColor="bg-cyan-500">Preparando</Button>
                            <Button onclick={() => changeTracking('Sirviendo')} width="w-30" backgroundColor="bg-cyan-500">Sirviendo</Button>
                            </>
                        }
                        {
                        (authUser && authUser.role !== 'cocinero') &&
                            <Button onclick={() => changeTracking('Completado')} width="w-30" backgroundColor="bg-cyan-500">Completado</Button>
                        }
                    </div>
                    {
                        (authUser) &&
                        <div className="flex items-center justify-around w-full mt-5">
                            <Button onclick={() => deleteOrder(order.id)} backgroundColor="bg-red-500">Borrar</Button>
                        </div>
                    }
                </>
            }
            {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
        </>
    )
}


export async function getServerSideProps({req, params}){
    const token = req.cookies.auth_token;
    let data = await showObject('order', params.id, token);
    return {
        props: data
    }
}