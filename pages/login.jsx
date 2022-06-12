import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import { setCookies } from "cookies-next";
import { AuthConsumer } from "contexts/AuthContext";
import loginUser from "services/loginUser";
import getUserAuth from "services/getUserAuth";
import { useModal } from "hooks/useModal";
import { Modal } from "components/Modal";
import { FormElement } from "components/FormElement"
import { Spinner } from "components/Spinner";
import { ButtonBack } from "components/ButtonBack";
import { Button } from "components/Button";

export default function Login(){
    const router = useRouter();
    const {loginAuth} = AuthConsumer();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(null);
    const {modal, textModal, successModal, setModal, setTextModal, setSuccessModal, route, setRoute} = useModal();
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
        loginUser({email, password})
        .then( async ({response, message, token}) => {
            if(response === true){
                setCookies('auth_token', token,{path:'/', maxAge: 60 * 60 * 24 });
                const user = await getUserAuth(token);
                loginAuth(user);
                setRoute("/");
            }
            setModal(true);
            setTextModal(message);
            setSuccessModal(response);
            setLoading(false);
        })
    }
    const changeEmail = (e) => {
        setEmail(e.target.value);
    }
    const changePassword = (e) => {
        setPassword(e.target.value);
    }
    return(
        <>
            <Head>
                <title>CRUD | Login</title>
            </Head>
            <ButtonBack/>
            <h1 className="text-center text-2xl font-bold">Iniciar sesión</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center mt-5" method="post" encType="multipart/form-data">
                <FormElement label="Email" id="email" type="email" handleChange={changeEmail}/>
                <FormElement label="Contraseña" id="password" type="password" handleChange={changePassword}/>
                <Button loading={loading} type="submit" >Entrar</Button>
                {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
            </form>
        </>
    )
}