import { useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Head from "next/head";
import deleteObjectWithImage from "services/deleteObjectWithImage";
import showObject from "services/showObject";
import { AuthConsumer } from "contexts/AuthContext";
import { useModal } from "hooks/useModal";
import { Modal } from "components/Modal";
import { ButtonBack } from "components/ButtonBack";
import { FormUser } from "components/FormUser";

export default function CreateUser({user, response, message}){
    const {user: authUser} = AuthConsumer();
    const router = useRouter();
    const {modal, setModal, textModal, route, setTextModal, successModal, setSuccessModal, setRoute} = useModal();
    
    useEffect( () => {
        if(!user){
            setModal(true);
            setTextModal(message);
            setSuccessModal(response);
            setRoute("/");
        }  
    },[])

    const deleteUser = (id) => {
        if( authUser.id !== id){
          const token = getCookie('auth_token');
          deleteObjectWithImage('user', id, token)
          .then( ({response, message}) => {
            setModal(true);
            setSuccessModal(response)
            setTextModal(message);
            (response) && setRoute("/users");
          })
        }else{
          setModal(true);
          setSuccessModal(false);
          setTextModal("¿Por qué querrías autodestruirte?");
        }
      }

    return(
        <>
            <Head><title>Puro gourmet | Ver usuario</title></Head>
            {(user) &&
                <>
                    <ButtonBack/>
                    <FormUser action="ver" user={user} deleteUser={deleteUser}/>
                </>
            }
            {modal && <Modal success={successModal} text={textModal} setModal={setModal} router={router} route={route}/>}
        </>
    )
}


export async function getServerSideProps({req, params}){
    const token = req.cookies.auth_token;
    let data = await showObject('user', params.id, token);
    return {
        props: data
    }
}