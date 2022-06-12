import { Button } from "components/Button";
import { ButtonBack } from "components/ButtonBack"
import { FormElement } from "components/FormElement";
import { FormReservation } from "components/FormReservation";
import { Modal } from "components/Modal";
import { useModal } from "hooks/useModal";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import uploadObject from "services/uploadObject";
import { dateObject } from "utils/functions";
export default function CreateReservation(){
    const router = useRouter();
    const [date, setDate] = useState(dateObject(new Date()));
    const [hour, setHour] = useState({h:12, m:0});
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [diners, setDiners] = useState(1);
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { 
            date: new Date(Date.UTC( date.year, date.month - 1, date.day, hour.h, hour.m)),
            name,
            number,
            diners
        };
        uploadObject('reservation', data)
        .then( ({response, message, error_list}) => {
            setErrors(error_list);
            setSuccessModal(response);
            setTextModal(message);
            setModal(true);
            setLoading(false);
            (response) && setRoute('/');
        })
    }
    return (
        <>
            <Head>
                <title>Puro gourmet | Reservar</title>
            </Head>
            <ButtonBack/>
            <FormReservation action="crear" handleSubmit={handleSubmit} date={date} setDate={setDate} setHour={setHour} setName={setName} setNumber={setNumber}  diners={diners} setDiners={setDiners} errors={errors} loading={loading}/>
            {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
        </>
    )
}