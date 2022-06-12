import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getCookie } from "cookies-next";
import showObject from "services/showObject";
import putObject from "services/putObject";
import { AuthConsumer } from "contexts/AuthContext";
import { useModal } from "hooks/useModal";
import { Modal } from "components/Modal";
import { ButtonBack } from "components/ButtonBack";
import { FormReservation } from "components/FormReservation";
import { dateObject, hourObject } from "utils/functions";

export default function EditReservation({reservation, response, message}){
    const {user: authUser, loginAuth} = AuthConsumer();
    const router = useRouter();
    const [newDate, setNewDate] = useState((reservation) && reservation.date);
    const [newHour, setNewHour] = useState((reservation) && reservation.hour);
    const [newName, setNewName] = useState((reservation) && reservation.name);
    const [newNumber, setNewNumber] = useState((reservation && reservation.number));
    const [newDiners, setNewDiners] = useState((reservation) && reservation.diners);
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);    

    useEffect( () => {
        if(!reservation){
            setModal(true);
            setTextModal(message);
            setSuccessModal(response);
            setRoute("/reservation");
        }  
    },[])


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        let data = {
            date: new Date(Date.UTC( newDate.year, newDate.month - 1, newDate.day, newHour.h, newHour.m)),
            name: newName,
            number: newNumber,
            diners: newDiners
        };
        const token = getCookie('auth_token');
        await putObject('reservation', reservation.id, data, token)
        .then( async ({response, message, error_list}) => {
            setErrors(error_list);
            setSuccessModal(response);
            setTextModal(message);
            setModal(true);
            setLoading(false);
            (response) && setRoute(`/reservation/${reservation.id}`);
        })
        
    }
    return(
        <>
            <Head><title>Puro gourmet | Editar Reseva</title></Head>
            {(reservation) &&
                <>
                    <ButtonBack/>
                    <FormReservation action="editar" reservation={{id: reservation.id, date: newDate, hour: newHour, name: newName, number: newNumber, diners: newDiners}} handleSubmit={handleSubmit} setName={setNewName}  setDate={setNewDate} setHour={setNewHour} setNumber={setNewNumber} setDiners={setNewDiners} errors={errors} loading={loading}/>
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