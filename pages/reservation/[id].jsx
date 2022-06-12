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
import { FormReservation } from "components/FormReservation";
import { dateObject, hourObject } from "utils/functions";
import updateKeyObject from "services/updateKeyObject";

export default function CreateReservation({reservation, response, message}){
    const {user: authUser} = AuthConsumer();
    const router = useRouter();
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
    useEffect( () => {
        if(!reservation){
            setModal(true);
            setTextModal(message);
            setSuccessModal(response);
            setRoute("/reservation");
        }  
    },[])

    const deleteReservation = (id) => {
        const token = getCookie('auth_token');
        deleteObject('reservation', id, token)
        .then( ({response, message}) => {
            setModal(true);
            setSuccessModal(response)
            setTextModal(message);
            (response) && setRoute("/reservation");
        })
    }

    return(
        <>
            <Head><title>Puro gourmet | Ver reserva </title></Head>
            {(reservation) &&
                <>
                    <ButtonBack/>
                    <FormReservation action="ver" reservation={reservation} deleteReservation={deleteReservation}/>
                </>
            }
            {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
        </>
    )
}


export async function getServerSideProps({req, params}){
    const token = req.cookies.auth_token;
    let {reservation, response, message} = await showObject('reservation', params.id, token);
    
    reservation.hour = hourObject(reservation.date.substring(11, 13) + ':' + reservation.date.substring(14, 16));
    reservation.date = dateObject( new Date(reservation.date.substring(0, 4) + '-' + reservation.date.substring(5, 7) + '-' + reservation.date.substring(8, 10)));

    return {
        props: {reservation, response, message}
    }
}