import { FormElement } from "components/FormElement";
import { useState } from "react";
import { Button } from "components/Button";
import { getCookie } from "cookies-next";
import uploadObject from "services/uploadObject";
import { useRouter } from "next/router";
import { useModal } from "hooks/useModal";
import Head from "next/head";
import { ButtonBack } from "components/ButtonBack";
import { Modal } from "components/Modal";

export default function CreateTable () {
    const router = useRouter();
    const [number, setNumber] = useState(null);
    const [loading, setLoading] = useState(false);
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
    const [errors, setErrors] = useState({});
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const token = getCookie('auth_token');
        uploadObject('table', { number }, token)
        .then( ({response, message, error_list}) => {
            setErrors(error_list);
            setSuccessModal(response);
            setTextModal(message);
            setModal(true);
            setLoading(false);
            (response) && setRoute('/tables');
        })
    }

    const changeNumber = (e) => {
        setNumber(e.target.value);
    }

    return (
        <>
            <Head>
                <title>Puro gourmet | Crear mesa</title>
            </Head>
            <ButtonBack/>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center" method="post">
                <FormElement handleChange={changeNumber} label="Número de mesa" id="number" type="number" min={1} errors={errors && errors.number}/>
                <Button loading={loading}>Crear</Button>
            </form>
            {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
        </>
    )
}

