import { useRouter } from "next/router";
import { useState } from "react";
import { getCookie } from "cookies-next";
import Head from "next/head";
import createObjectWithImage from "services/createObjectWithImage";
import { useModal } from "hooks/useModal";
import {Modal} from "components/Modal";
import { ButtonBack } from "components/ButtonBack";
import { FormUser } from "components/FormUser";

export default function Register(){
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(null);
    const [role, setRole] = useState('camarero');
    const [image, setImage] = useState(null);
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
        const token = getCookie('auth_token');
        createObjectWithImage('users', image, 'register', {name, email, password, role}, token)
        .then( ({response, message, error_list}) => {
            setErrors(error_list);
            setSuccessModal(response);
            setTextModal(message);
            setModal(true);
            setLoading(false);
            (response) && setRoute('/users');
        })
    }
    
    return(
        <>
            <Head>
                <title>Puro gourmet | Crear usuario</title>
            </Head>
            <ButtonBack/>
            <FormUser action="crear" handleSubmit={handleSubmit} setName={setName}  setEmail={setEmail} setPassword={setPassword} setRole={setRole} setImage={setImage} errors={errors} loading={loading}/>
            {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
        </>
    )
}